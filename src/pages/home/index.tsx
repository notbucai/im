/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-12 15:36:49
 * @Description: 
 */
import Taro, { useReady } from '@tarojs/taro';
import React, { useEffect, useState, useCallback, CompositionEvent } from 'react';
import { View } from '@tarojs/components';
import { useDispatch } from 'react-redux';

import MessageItem from '../../components/message-item';

import { tim } from '../../global';
import { EVENT, TimEvent } from '../../tim';
import { getUserAction } from '../../store/actions/user';
import { ConversationToNotifyItem } from '../../utils/business';
import { PageInit } from '../../common/page';

const Home = () => {

  const [messageList, setMessageList] = useState<LocalNotifyItem[]>([]);
  const dispatch = useDispatch()

  useReady(async () => {
    console.log(123);
    
    const resData: TimEvent<{ conversationList: Conversation[] }> = await tim.getConversationList();
    if (!resData) return;
    const { conversationList } = resData.data || {};

    const list: LocalNotifyItem[] | undefined = conversationList?.map(ConversationToNotifyItem);

    setMessageList(list || []);

  });

  const goPath = (item: LocalNotifyItem) => {
    console.log(item);

    Taro.navigateTo({
      url: '/pages/chat/index?id=' + item.id + '&name=' + item.name + '&type=' + item.type
    });

  }

  function onConversationListUpdated (event: TimEvent<Conversation[]>) {
    // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
    // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
    // event.data - 存储 Conversation 对象的数组 - [Conversation]
    console.log('CONVERSATION_LIST_UPDATED', event);

    const data = event.data;
    const _messageList = data?.map(ConversationToNotifyItem)

    setMessageList(_messageList || []);
  }
  const onConversationListUpdatedCallback = useCallback(onConversationListUpdated, [messageList])

  useEffect(() => {
    tim.on(EVENT.CONVERSATION_LIST_UPDATED, onConversationListUpdatedCallback);
    dispatch(getUserAction());

    return () => {
      tim.off(EVENT.CONVERSATION_LIST_UPDATED, onConversationListUpdatedCallback);
    };
  }, [onConversationListUpdatedCallback, dispatch]);

  return (
    <View>

      {
        messageList.map((item, index) => {
          return <MessageItem key={index} {...item} onClick={() => { goPath(item) }} />;
        })
      }

    </View>
  );
};


export default Home;
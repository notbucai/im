/*
 * @Author: bucai
 * @Date: 2020-07-15 22:27:49
 * @LastEditors: bucai
 * @LastEditTime: 2020-08-11 13:40:43
 * @Description: 
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Input, BaseEventOrig } from '@tarojs/components';
import Taro, { useRouter, useReady, usePullDownRefresh } from '@tarojs/taro';
import { InputProps } from '@tarojs/components/types/Input';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import ChatItem, { ChatItemProps } from '../../components/chat-item';
import MessageSystemItem, { MessageSystemProps } from '../../components/message-system';
import MessageTpiItem, { MessageTipProps } from '../../components/message-tip';

import { tim } from '../../global';
import { TYPES, EVENT, TimEvent } from '../../tim';

import './index.scss';
import useChatList, { ChatActionType } from './hooks/useChatList';
import { MessageToLocalMessageItem } from '../../utils/business';


export default () => {
  const [focus, setFocus] = useState<boolean>();
  const [input, setInput] = useState('');
  const route = useRouter();
  const nextId = useRef<string | undefined>(undefined);
  const isCompleted = useRef<boolean | undefined>(false);
  const { userinfo } = useSelector<{ user: { userinfo: UserInfo } }, { userinfo: UserInfo }>(state => state.user);

  const { state: list, dispatch } = useChatList<LocalMessageItem>();

  const getMessageList = async (id: string) => {
    const query: { conversationID: string, nextReqMessageID?: string } = {
      conversationID: id,
    };
    if (nextId.current) {
      query.nextReqMessageID = nextId.current;
    }
    const imResponse = await tim.getMessageList(query);
    if (!imResponse) return;

    const messageList: Message<any>[] = imResponse.data.messageList; // 消息列表。
    const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
    const _isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
    isCompleted.current = _isCompleted;
    nextId.current = nextReqMessageID;
    console.log('messageList', messageList);

    const messageListDeal = messageList.map(item => {
      return MessageToLocalMessageItem(item);
    });

    dispatch({ type: ChatActionType.INIT, payload: [...messageListDeal, ...list] });
  }

  let onMessageReceived = useCallback((event: TimEvent<Message<any>[]>) => {
    // event.data - 存储 Message 对象的数组 - [Message]
    const messageList: Message<any>[] = event.data || [];

    const { id } = route.params;

    console.log('messageList', messageList);


    messageList.forEach(item => {
      console.log('item', item);

      if (id != item.conversationID) {
        return;
      }

      const message = MessageToLocalMessageItem(item);

      dispatch({
        type: ChatActionType.ADD,
        payload: message
      });
    });
    goBottom();
  }, [dispatch, route]);

  const handleLoadData = async () => {
    const { name, id } = route.params;
    Taro.setNavigationBarTitle({
      title: name
    });

    tim.on(EVENT.MESSAGE_RECEIVED, onMessageReceived);

    await getMessageList(id);
    tim.setMessageRead({
      conversationID: id,
    });

    // const s = await tim.getConversationProfile(id);
  };

  useReady(async () => {
    await handleLoadData();
    goBottom();
  });

  usePullDownRefresh(async () => {
    try {
      handleLoadData();
    } catch (error) {
      console.log('error', error);
    } finally {
      Taro.stopPullDownRefresh()
    }
  });

  useEffect(() => {
    return () => {
      tim.off(EVENT.MESSAGE_RECEIVED, onMessageReceived);
    };
  }, [onMessageReceived]);


  // useEffect(() => {
  //   if (data) {
  //     dispatch({ type: ChatActionType.INIT, payload: data });
  //   }
  //   return () => {
  //   };
  // }, [data, dispatch]);

  // useEffect(() => {
  //   const t = setTimeout(() => {

  //   }, 100);
  //   return () => {
  //     clearTimeout(t);
  //   };
  // }, [list]);
  const handleSubmit = async () => {

    const { id, type } = route.params;
    const typeRx = new RegExp('^' + type);
    const message = tim.createTextMessage({
      to: id.replace(typeRx, ''),
      conversationType: TYPES['CONV_' + type],
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: input
      }
    });

    await tim.sendMessage(message);
    const _item: ChatItemProps = {
      id: Math.random().toFixed(4),
      name: userinfo?.name || '',
      userID: userinfo.id,
      isMe: true,
      content: input,
      avatar: userinfo.avatar
    };

    dispatch({
      type: ChatActionType.ADD,
      payload: _item
    });
    setInput('');
    goBottom();
  }
  const timer = useRef<any>();
  const goBottom = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      Taro.pageScrollTo({
        scrollTop: 9999999999,
        duration: 0,
      });
    }, 100);

  }
  const onFocus = () => {
    setFocus(true);
    goBottom();
  }
  const onBlur = () => {
    setFocus(false);
  }
  const onInput = (event: BaseEventOrig<InputProps.inputEventDetail>) => {
    setInput(event.detail.value);
  }
  const onConfirm = () => {
    if (input.length == 0) {
      return;
    }
    handleSubmit();
  }

  const onClickAvatar = (item: LocalMessageItem) => {

    Taro.navigateTo({
      url: '/pages/user/index?id=' + item.userID
    });
  }
  const goChatInfo = () => {
    const { id, type } = route.params;

    if (type === 'C2C') {
      const username = id.replace(/^C2C/, '');
      Taro.navigateTo({
        url: '/pages/user/index?id=' + username
      });
    } else if (type === 'GROUP') {
      const username = id.replace(/^GROUP/, '');

      Taro.navigateTo({
        url: '/pages/chatinfo/index?id=' + username
      });
    }

  }

  return (
    <View className='chat-box'>
      {
        route.params.type !== '@TIM#SYSTEM'
          ?
          <View className='chat-toolbar' onClick={goChatInfo} >
            <View className='at-icon at-icon-bullet-list'></View>
          </View>
          :
          null
      }
      <View className='chat-list'>
        {
          list?.map(item => {
            let Component: (props: any) => JSX.Element = ChatItem;

            switch (item.type) {
              case 'normal':
                Component = ChatItem;
                break;
              case 'system':
                Component = MessageSystemItem;
                break;
              case 'tip':
                Component = MessageTpiItem;
                break;
            }

            return <Component onClickAvatar={() => onClickAvatar(item)} {...item} key={item.id} />;
          })
        }
      </View>

      {
        route.params.type !== '@TIM#SYSTEM'
          ?
          <View className='footer' >
            <View className='footer-main'>
              <Input
                className={classNames('footer-input', { keyup: focus })}
                onBlur={onBlur}
                onFocus={onFocus}
                onInput={onInput}
                value={input}
                onConfirm={onConfirm}

                placeholder='请输入'
              />
            </View>
          </View>
          :
          null
      }

    </View>
  );
};

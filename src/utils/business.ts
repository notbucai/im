/**
 * 业务处理类
 */

import { format } from "./date";

import notifyImg from '../assets/images/notify.png'
import { TYPES } from "../tim/tim-wx";

export const ProfileToUserInfo: (profile: Profile) => UserInfo = (profile: Profile) => {
  const userinfo: UserInfo = {
    id: profile.userID,
    name: profile.nick || profile.userID,
    info: profile.selfSignature,
    avatar: profile.avatar,
    time: format(profile.lastUpdatedTime * 1000)
  };

  return userinfo;
}

function parseGroupTipContent (payload: any) {
  switch (payload.operationType) {
    case TYPES.GRP_TIP_MBR_JOIN:
      return `群成员：${payload.userIDList.join(',')}，加入群组`
    case TYPES.GRP_TIP_MBR_QUIT:
      return `群成员：${payload.userIDList.join(',')}，退出群组`
    case TYPES.GRP_TIP_MBR_KICKED_OUT:
      return `群成员：${payload.userIDList.join(',')}，被${payload.operatorID}踢出群组`
    case TYPES.GRP_TIP_MBR_SET_ADMIN:
      return `群成员：${payload.userIDList.join(',')}，成为管理员`
    case TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
      return `群成员：${payload.userIDList.join(',')}，被撤销管理员`
    default:
      return '[群提示消息]'
  }
}

function parseGroupSystemNotice (payload: any): string {

  const groupName = payload.groupProfile.groupName || payload.groupProfile.name || payload.groupProfile.groupID
  switch (payload.operationType) {
    case 1:
      return `${payload.operatorID} 申请加入群组：${groupName}`
    case 2:
      return `成功加入群组：${groupName}`
    case 3:
      return `申请加入群组：${groupName}被拒绝`
    case 4:
      return `被管理员${payload.operatorID}踢出群组：${groupName}`
    case 5:
      return `群：${groupName} 已被${payload.operatorID}解散`
    case 6:
      return `${payload.operatorID}创建群：${groupName}`
    case 7:
      return `${payload.operatorID}邀请你加群：${groupName}`
    case 8:
      return `你退出群组：${groupName}`
    case 9:
      return `你被${payload.operatorID}设置为群：${groupName}的管理员`
    case 10:
      return `你被${payload.operatorID}撤销群：${groupName}的管理员身份`
    case 255:
      return '自定义群系统通知'
  }
  return '';
}

export const C2CConversationToNotifyItem: (conversation: Conversation) => LocalNotifyItem = (conversation: Conversation) => {
  const { type, conversationID, userProfile, unreadCount, lastMessage } = conversation;

  return {
    name: userProfile.nick || userProfile.userID,
    avatar: userProfile.avatar,
    count: unreadCount,
    message: lastMessage.messageForShow,
    id: conversationID,
    time: new Date(lastMessage.lastTime * 1000).toLocaleString(),
    type
  }
}


export const GROUPConversationToNotifyItem: (conversation: Conversation) => LocalNotifyItem = (conversation: Conversation) => {
  const { type, conversationID, groupProfile, unreadCount, lastMessage } = conversation;

  return {
    name: groupProfile.name,
    avatar: groupProfile.avatar,
    count: unreadCount,
    message: lastMessage.messageForShow,
    id: conversationID,
    time: new Date(lastMessage.lastTime * 1000).toLocaleString(),
    type
  }
}

export const SYSTEMConversationToNotifyItem: (conversation: Conversation) => LocalNotifyItem = (conversation: Conversation) => {
  const { type, conversationID, unreadCount, lastMessage } = conversation;

  return {
    name: '系统消息',
    avatar: notifyImg,
    count: unreadCount,
    message: parseGroupSystemNotice(lastMessage.payload),
    id: conversationID,
    time: new Date(lastMessage.lastTime * 1000).toLocaleString(),
    type
  }
}

/**
 * 会话转本地通知
 * @param conversation 会话
 */
export const ConversationToNotifyItem: (conversation: Conversation) => LocalNotifyItem = (conversation: Conversation) => {
  const type = conversation.type;

  const typeFunMap = {
    'C2C': C2CConversationToNotifyItem,
    'GROUP': GROUPConversationToNotifyItem,
    '@TIM#SYSTEM': SYSTEMConversationToNotifyItem,
  };

  return typeFunMap[type] ? typeFunMap[type](conversation) : null;
}


// -------------------------

export const C2CMessageToLocalMessageItem: (message: Message<TextPayload>) => LocalMessageItem = (message: Message<TextPayload>) => {

  return {
    id: message.ID,
    userID: message.from,
    isMe: message.flow === 'out',
    avatar: message.avatar,
    name: message.nick || message.from,
    content: message.payload.text,
    type: 'normal',
    date: format(message.time * 1000),
  }
}

export const GROUPMessageToLocalMessageItem: (message: Message<any>) => LocalMessageItem = (message: Message<any>) => {
  let text = message.payload.text;
  let type: "normal" | "tip" | "system" = 'normal';

  if (message.type === 'TIMCustomElem') {
    text = message.payload.extension;
  } else if (message.type === 'TIMGroupTipElem') {
    const payload = message.payload as GroupTipPayload;
    text = parseGroupTipContent(payload);
    type = 'tip';
  }

  return {
    id: message.ID,
    userID: message.from,
    isMe: message.flow === 'out',
    avatar: message.avatar,
    name: message.nick || message.from,
    content: text,
    type,
    date: format(message.time * 1000)
  }

}


export const SYSTEMMessageToLocalMessageItem: (message: Message<GroupSystemNoticePayload>) => LocalSystemMessageItem = (message: Message<GroupSystemNoticePayload>) => {

  return {
    id: message.ID,
    userID: message.from,
    isMe: message.flow === 'out',
    avatar: message.avatar,
    name: message.nick || message.from,
    content: parseGroupSystemNotice(message.payload),
    type: 'system',
    date: format(message.time * 1000),
    message: message
  }
}

/**
 * 单条消息转本地消息
 * @param message 消息
 */
export const MessageToLocalMessageItem: (message: Message<TextPayload>) => LocalMessageItem = (message: Message<TextPayload>) => {
  const { conversationType } = message;
  const typeFunMap = {
    'C2C': C2CMessageToLocalMessageItem,
    'GROUP': GROUPMessageToLocalMessageItem,
    '@TIM#SYSTEM': SYSTEMMessageToLocalMessageItem,
  };

  typeFunMap[conversationType](message);

  return typeFunMap[conversationType](message);
}
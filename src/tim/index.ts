import COS from "cos-wx-sdk-v5";
import TIM from './tim-wx';
import config from '../config/common.config';

let options = {
  SDKAppID: config.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
const tim = TIM.create(options); // SDK 实例通常用 tim 表示

// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

// 注册 COS SDK 插件
tim.registerPlugin({ 'cos-wx-sdk': COS });

export interface TimEvent<T extends any> {
  name: string;
  data?: T;
}

export const TYPES = TIM.TYPES;
export const EVENT = TIM.EVENT;

export default (store) => {
  // 监听事件，例如：
  tim.on(TIM.EVENT.SDK_READY, function (event: TimEvent<any>) {
    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
    // event.name - TIM.EVENT.SDK_READY
    console.log('SDK_READY',event);
  });

  tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event: TimEvent<any>) {
    // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
    // event.name - TIM.EVENT.MESSAGE_RECEIVED
    // event.data - 存储 Message 对象的数组 - [Message]
    console.log('MESSAGE_RECEIVED',event);

  });

  tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event: TimEvent<any>) {
    // 收到消息被撤回的通知
    // event.name - TIM.EVENT.MESSAGE_REVOKED
    // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
    console.log('MESSAGE_REVOKED',event);

  });

  tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (event: TimEvent<any>) {
    // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
    // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
    // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
    console.log('MESSAGE_READ_BY_PEER',event);

  });

  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event: TimEvent<any>) {
    // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
    // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
    // event.data - 存储 Conversation 对象的数组 - [Conversation]
    console.log('CONVERSATION_LIST_UPDATED',event);

  });

  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event: TimEvent<any>) {
    // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
    // event.name - TIM.EVENT.GROUP_LIST_UPDATED
    // event.data - 存储 Group 对象的数组 - [Group]
    console.log('GROUP_LIST_UPDATED',event);

  });

  tim.on(TIM.EVENT.PROFILE_UPDATED, function (event: TimEvent<any>) {
    // 收到自己或好友的资料变更通知
    // event.name - TIM.EVENT.PROFILE_UPDATED
    // event.data - 存储 Profile 对象的数组 - [Profile]
    console.log('PROFILE_UPDATED',event);

  });

  tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (event: TimEvent<any>) {
    // 收到黑名单列表更新通知
    // event.name - TIM.EVENT.BLACKLIST_UPDATED
    // event.data - 存储 userID 的数组 - [userID]
    console.log('BLACKLIST_UPDATED',event);

  });

  tim.on(TIM.EVENT.ERROR, function (event: TimEvent<any>) {
    // 收到 SDK 发生错误通知，可以获取错误码和错误信息
    // event.name - TIM.EVENT.ERROR
    // event.data.code - 错误码
    // event.data.message - 错误信息
    console.log('ERROR',event);

  });

  tim.on(TIM.EVENT.SDK_NOT_READY, function (event: TimEvent<any>) {
    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
    // event.name - TIM.EVENT.SDK_NOT_READY
    console.log('SDK_NOT_READY',event);

  });

  tim.on(TIM.EVENT.KICKED_OUT, function (event: TimEvent<any>) {
    // 收到被踢下线通知
    // event.name - TIM.EVENT.KICKED_OUT
    // event.data.type - 被踢下线的原因，例如:
    //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
    //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
    //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。 
    console.log('KICKED_OUT',event);

  });

  tim.on(TIM.EVENT.NET_STATE_CHANGE, function (event: TimEvent<any>) {
    //  网络状态发生改变（v2.5.0 起支持）。 
    // event.name - TIM.EVENT.NET_STATE_CHANGE 
    // event.data.state 当前网络状态，枚举值及说明如下： 
    //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络 
    //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中” 
    //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息  
    console.log('NET_STATE_CHANGE',event);
  });
  return tim;
};


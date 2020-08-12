/**
 * @interface Conversation
 * @description 会话对象，用于描述会话具有的属性，如类型、消息未读计数、最新消息等。
 */
declare interface Conversation {
  conversationID: string; // 会话ID。会话ID组成方式：C2C+userID（单聊）GROUP+groupID（群聊）@TIM#SYSTEM（系统通知会话）
  /**
   * 会话类型，具体如下：
   * TIM.TYPES.CONV_C2CC2C（ClienttoClient,端到端）会话
   * TIM.TYPES.CONV_GROUPGROUP（群组）会话
   * TIM.TYPES.CONV_SYSTEMSYSTEM（系统）会话。该会话只能接收来自系统的通知消息，不能发送消息。
   */
  type: string;
  /**
   * 群组会话的群组类型，具体如下：
   * TIM.TYPES.GRP_WORK 好友工作群
   * TIM.TYPES.GRP_PUBLIC 陌生人社交群
   * TIM.TYPES.GRP_MEETING 临时会议群
   * TIM.TYPES.GRP_AVCHATROOM 直播群
   */
  subType: string;
  unreadCount: number; // 未读计数。TIM.TYPES.GRP_MEETING/TIM.TYPES.GRP_AVCHATROOM类型的群组会话不记录未读计数，该字段值为0
  /**
   * 会话最新的消息
   * lastTime Number当前会话最新消息的时间戳，单位：秒
   * lastSequence Number当前会话的最新消息的
   * SequencefromAccount String最新消息来源用户的
   * userIDmessageForShow String最新消息的内容，用于展示。可能值：文本消息内容、"[图片]"、"[语音]"、"[位置]"、"[表情]"、"[文件]"、"[自定义消息]"。若该字段不满足您的需求，您可以使用payload来自定义渲染。typeString消息类型，具体如下：类型含义TIM.TYPES.MSG_TEXT文本消息TIM.TYPES.MSG_IMAGE图片消息TIM.TYPES.MSG_SOUND音频消息（已废弃，请使用TIM.TYPES.MSG_AUDIO）TIM.TYPES.MSG_AUDIO音频消息TIM.TYPES.MSG_FILE文件消息TIM.TYPES.MSG_GRP_TIP群提示消息TIM.TYPES.MSG_GRP_SYS_NOTICE群系统通知消息payloadObject消息的内容，具体如下：文本图片音频文件自定义群提示消息群系统通知注意：收到的音频/文件消息的payload中没有url字段。
   */
  lastMessage: LastMessageType;
  userProfile: Profile; // C2C会话的用户资料
  groupProfile: GroupProfile; // 群组会话的群组资料
}
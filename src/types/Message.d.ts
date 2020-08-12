/**
 * @interface Payload
 * @description 消息内容
 */
declare interface Payload { }

/**
 * @interface ImageInfo
 * @description 图片信息
 */
declare interface ImageInfo {
  width: number;	 // 宽度  
  height: number;	 // 高度  
  url: string;	 // 图片地址，可用于渲染  
  size: number;	 // 图片大小，单位：Byte  
  sizeType: number; // 图片大小类型。值为 1 时表示原图，数值越大表示压缩比率越高。
}

/**
 * @interface TextPayload
 * @description 文本消息
 */
declare interface TextPayload extends Payload {
  text: string; // 文本消息内容
}
/**
 * @interface ImagePayload
 * @description 图片消息
 */
declare interface ImagePayload extends Payload {
  uuid: string; // 图片唯一标识
  imageFormat: string; //图片格式类型 
  imageInfoArray: ImageInfo[]; // 图片信息
}

/**
 * @interface AudioPayload
 * @description 音频消息
 */
declare interface AudioPayload extends Payload {
  uuid: string;	 // 唯一标识
  url: string;	 // 音频地址，可用于播放
  size: number;	 // 文件大小，单位：Byte
  second: number;	 // 音频时长，单位：秒
}

/**
 * @interface VideoPayload
 * @description 视频消息
 */
declare interface VideoPayload extends Payload {
  videoFormat: string;	 // 视频文件的格式
  videoSecond: number;	 // 视频文件的时长，单位秒，整型
  videoSize: number;	 // 视频文件大小，单位：Byte
  videoUrl: string;	 // 视频文件的地址，可用于播放
  videoUUID: string;	 // video 唯一标识
  thumbUUID: string;	 // thumb 唯一标识
  thumbSize: number;	 // 缩略图大小，单位：Byte
  thumbWidth: number;	 // 缩略图宽度
  thumbHeight: number;	 // 缩略图高度
  thumbUrl: string;	 //  缩略图地址，可用于渲染
}

/**
 * @interface FilePayload
 * @description 文件消息 结构
 */
declare interface FilePayload extends Payload {
  uuid: string	// 唯一标识
  fileName: string	// 文件名
  fileUrl: string	// 文件地址
  fileSize: number	// 文件大小，单位：Byte
}

/**
 * @interface CustomPayload
 * @description 自定义消息 结构
 */
declare interface CustomPayload extends Payload {
  data: string	// 自定义消息的 data 字段
  description: string	// 自定义消息的 description 字段
  extension: string	// 自定义消息的 extension 字段
}

/**
 * @interface GeoPayload
 * @description 位置消息 结构
 */
declare interface GeoPayload extends Payload {
  description: string	 //相关描述信息
  latitude: number	 //纬度
  longitude: number	 //经度
}

/**
 * @interface GroupTipPayload
 * @description 群提示消息的 payload 结构。系统会在恰当的时机，向全体群成员发出群提示消息。例如：有群成员退群/进群，系统会给所有群成员发对应的群提示消息。
 */
declare interface GroupTipPayload extends Payload {
  operatorID: string;  // 执行该操作的用户 ID
  /**
   * 操作类型，具体如下：
   * TIM.TYPES.GRP_TIP_MBR_JOIN	1	有成员加群
   * TIM.TYPES.GRP_TIP_MBR_QUIT	2	有群成员退群
   * TIM.TYPES.GRP_TIP_MBR_KICKED_OUT	3	有群成员被踢出群
   * TIM.TYPES.GRP_TIP_MBR_SET_ADMIN	4	有群成员被设为管理员
   * TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN	5	有群成员被撤销管理员
   * TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED	6	群组资料变更
   * TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED	7	群成员资料变更，例如：群成员被禁言
   */
  operationType: number;
  groupProfile: object;  // 相关的群组资料
  userDefinedField: string;  // 用户自定义字段。使用 RestAPI 发送自定义通知时，可在该属性值中拿到自定义通知的内容。
  handleMessage: object;  // 处理的附言。例如：user1 申请加入 group1 时，若进群需要验证，且 user1 填写了申请加群的附言。则 group1 的管理员会在相应群系统通知中看到该字段。
}

/**
 * @interface GroupSystemNoticePayload
 * @description 群系统通知的 payload 结构。系统会在恰当的时机，向特定用户发出群系统通知。例如：user1 被踢出群组，系统会给 user1 发送对应的群系统消息。
 */
declare interface GroupSystemNoticePayload extends Payload {
  operatorID: string;	 // 执行该操作的用户 ID
  /**
   * 操作类型，具体如下：
   * 值	描述	接收对象
   * 1	有用户申请加群	群管理员/群主接收
   * 2	申请加群被同意	申请加群的用户接收
   * 3	申请加群被拒绝	申请加群的用户接收
   * 4	被踢出群组	被踢出的用户接收
   * 5	群组被解散	全体群成员接收
   * 6	创建群组	创建者接收
   * 7	邀请加群	被邀请者接收
   * 8	退群	退群者接收
   * 9	设置管理员	被设置方接收
   * 10	取消管理员	被取消方接收
   * 255	用户自定义通知	默认全员接收
   */
  operationType: number;
  groupProfile: object;	 // 相关的群组资料
  userDefinedField: string;	 // 用户自定义字段。使用 RestAPI 发送自定义通知时，可在该属性值中拿到自定义通知的内容。
  handleMessage: object;	 // 处理的附言。例如：user1 申请加入 group1 时，若进群需要验证，且 user1 填写了申请加群的附言。则 group1 的管理员会在相应群系统通知中看到该字段。
}

/**
 * @interface Message
 * @description 会话对象，用于描述会话具有的属性，如类型、消息未读计数、最新消息等。
 */
declare interface Message<T extends Payload> {
  ID: string; // 消息ID
  type: string; // 消息类型，具体如下：类型含义TIM.TYPES.MSG_TEXT文本消息TIM.TYPES.MSG_IMAGE图片消息TIM.TYPES.MSG_SOUND音频消息（已废弃，请使用TIM.TYPES.MSG_AUDIO）TIM.TYPES.MSG_AUDIO音频消息TIM.TYPES.MSG_VIDEO视频消息TIM.TYPES.MSG_FILE文件消息TIM.TYPES.MSG_CUSTOM自定义消息TIM.TYPES.MSG_GEO位置消息TIM.TYPES.MSG_GRP_TIP群提示消息TIM.TYPES.MSG_GRP_SYS_NOTICE群系统通知消息
  payload: T; // 消息的内容，具体如下：文本图片音频视频文件自定义位置群提示消息群系统通知
  conversationID: string; // 消息所属的会话ID
  conversationType: string; // 消息所属会话的类型，具体如下：类型含义TIM.TYPES.CONV_C2CC2C(ClienttoClient;端到端)会话TIM.TYPES.CONV_GROUPGROUP(群组)会话TIM.TYPES.CONV_SYSTEMSYSTEM(系统)会话
  to: string; // 接收方的userID
  from: string; // 发送方的userID，在消息发送时，会默认设置为当前登录的用户
  flow: string; // 消息的流向in为收到的消息out为发出的消息
  time: number; // 消息时间戳。单位：秒
  status: string; // 消息状态。unSend(未发送)success(发送成功)fail(发送失败)
  isRevoked: boolean; // 是否被撤回的消息，true标识被撤回的消息（v2.4.0起支持）
  priority: string; // 消息优先级，用于群聊（v2.4.2起支持）
  nick: string; // 消息发送者的昵称（v2.6.0起，在AVChatRoom内支持，需提前调用updateMyProfile设置）
  avatar: string; // 消息发送者的头像地址（v2.6.0起，在AVChatRoom内支持，需提前调用updateMyProfile设置）
  isPeerRead: boolean; // C2C消息对端是否已读，true标识对端已读（v2.7.0起支持）
}

/**
 * @interface LastMessageType
 * @description 会话最新的消息
 */
declare interface LastMessageType {
  lastTime: number;	 // 当前会话最新消息的时间戳，单位：秒
  lastSequence: number;	 // 当前会话的最新消息的 Sequence
  fromAccount: string;	 // 最新消息来源用户的 userID
  messageForShow: string;	 // 最新消息的内容，用于展示。可能值：文本消息内容、"[图片]"、"[语音]"、"[位置]"、"[表情]"、"[文件]"、"[自定义消息]"。 若该字段不满足您的需求，您可以使用 payload 来自定义渲染。
  /**
  * 消息类型，具体如下：
  * 类型	含义
  * TIM.TYPES.MSG_TEXT	文本消息
  * TIM.TYPES.MSG_IMAGE	图片消息
  * TIM.TYPES.MSG_SOUND	音频消息（已废弃，请使用 TIM.TYPES.MSG_AUDIO ）
  * TIM.TYPES.MSG_AUDIO	音频消息
  * TIM.TYPES.MSG_FILE	文件消息
  * TIM.TYPES.MSG_GRP_TIP	群提示消息
  * TIM.TYPES.MSG_GRP_SYS_NOTICE	群系统通知消息
  */
  type: string;
  payload: Payload;	 // 消息的内容
}

/**
 * @interface LocalNotifyItem
 * @description 本地单条通知
 */
declare interface LocalNotifyItem {
  id: string | number;
  avatar: string;
  name: string;
  time: Date | number | string;
  message: string;
  count: number;
  type: string;
}

/**
 * @interface LocalMessageItem
 * @description 本地单条消息
 */
declare interface LocalMessageItem {
  id: string | number;
  userID: string;
  isMe: boolean;
  avatar: string;
  name: string;
  content: string;
  type: 'normal' | 'tip' | 'system';
  date: string,
  message?: Message<any>
}
/**
 * @interface LocalMessageItem
 * @description 本地系统消息
 */
declare interface LocalSystemMessageItem extends LocalMessageItem {
  message: Message<GroupSystemNoticePayload>
}
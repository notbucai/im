/**
 * @interface SelfInfo
 * @description 当前用户在群组中的信息
 */
declare interface SelfInfo {
  role: string;	// 角色
  /**
   * 消息接收选项
   * TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE - SDK 接收消息并通知接入侧（抛出 收到消息事件），接入侧做提示
   * TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE - SDK 接收消息并通知接入侧（抛出 收到消息事件），接入侧不做提示
   * TIM.TYPES.MSG_REMIND_DISCARD - SDK 拒收消息
   */
  messageRemindType: string;
  joinTime: number; //入群时间
  nameCard: string; //群名片
}
// /**
//  * @interface LastMessage
//  * @description 群组最后一条消息。注意：若会话列表中没有该群组，则该对象只有 lastTime 有值，其他值为空。
//  */
// declare interface LastMessage {
//   lastTime: number;	//群组最后一条消息的时间戳，单位：秒
//   lastSequence: number;	//当前群组类型会话的最新消息的 Seq
//   fromAccount: number;	//群组最后一条消息的来源用户
//   messageForShow: number;	//用于展示的群组最后一条消息的简要内容，文本则展示原内容，图片则展示“[图片]”。
// }

/**
 * @interface GroupProfile
 * @description 会话对象，用于描述会话具有的属性，如类型、消息未读计数、最新消息等。
 */
declare interface GroupProfile {
  groupID: string; // 群组的唯一标识，群组ID，App内保证唯一，其格式前缀为@TGS#。另外，App亦可自定义群组ID
  name: string; // 群组名称，最长30字节，不可调整
  avatar: string; // 群组头像URL，最长100字节，不可调整
  type: string; // 群组类型，当前SDK支持的类型如下：类型含义TIM.TYPES.GRP_WORK好友工作群TIM.TYPES.GRP_PUBLIC陌生人社交群TIM.TYPES.GRP_MEETING临时会议群TIM.TYPES.GRP_AVCHATROOM直播群
  introduction: string; // 群组简介，最长120字节，不可调整
  notification: string; // 群组公告，最长150字节，不可调整
  ownerID: string; // 群主ID
  createTime: number; // 群组的创建时间
  infoSequence: number; // 群资料的每次变都会增加该值
  lastInfoTime: number; // 群组最后一次信息变更时间
  selfInfo: SelfInfo; // 当前用户在群组中的信息PropertiesNameTypeDescriptionroleString角色messageRemindTypeString消息接收选项TIM.TYPES.MSG_REMIND_ACPT_AND_NOTE-SDK接收消息并通知接入侧（抛出收到消息事件），接入侧做提示TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE-SDK接收消息并通知接入侧（抛出收到消息事件），接入侧不做提示TIM.TYPES.MSG_REMIND_DISCARD-SDK拒收消息joinTimeNumber入群时间nameCardString群名片
  lastMessage: LastMessageType; // 群组最后一条消息。注意：若会话列表中没有该群组，则该对象只有lastTime有值，其他值为空。PropertiesNameTypeDescriptionlastTimeNumber群组最后一条消息的时间戳，单位：秒lastSequenceNumber当前群组类型会话的最新消息的SeqfromAccountNumber群组最后一条消息的来源用户messageForShowNumber用于展示的群组最后一条消息的简要内容，文本则展示原内容，图片则展示“[图片]”。
  nextMessageSeq: number; // 群内下一条消息的Seq，群组内每一条消息都有一条唯一的消息Seq，且该Seq是按照发消息顺序而连续的。从1开始，群内每增加一条消息，nextMessageSeq就会增加1
  memberNum: number; // 当前成员数量
  maxMemberNum: number; // 最大成员数量
  muteAllMembers: boolean; // 设置全体禁言，true表示全体禁言，false表示取消全体禁言，v2.6.2起支持
  joinOption: string; // 申请加群选项。TIM.TYPES.JOIN_OPTIONS_FREE_ACCESS（自由加入，直播群固定为该值）TIM.TYPES.JOIN_OPTIONS_NEED_PERMISSION（需要验证）TIM.TYPES.JOIN_OPTIONS_DISABLE_APPLY（禁止加群，好友工作群固定为该值）
  groupCustomField: Propertie[]; // 群组自定义字段。默认情况是没有的。开通群组维度的自定义字段详情请参见自定义字段PropertiesNameTypeDescriptionkeyString群组自定义字段的KeyvalueString群组自定义字段的Value
}
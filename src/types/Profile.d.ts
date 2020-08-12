/**
 * @interface Profile
 * @description 用户资料对象，用于描述用户具有的属性，如昵称、头像地址、个性签名、性别等，包含标配资料和自定义资料。
 */
declare interface Profile {
  userID: string; // 用户账号
  nick: string; // 昵称，长度不得超过500个字节
  gender: string; // 性别TIM.TYPES.GENDER_UNKNOWN（未设置性别）TIM.TYPES.GENDER_FEMALE（女）TIM.TYPES.GENDER_MALE（男）
  birthday: number; // 生日uint32推荐用法：20000101
  location: string; // 所在地长度不得超过16个字节，推荐用法如下：App本地定义一套数字到地名的映射关系后台实际保存的是4个uint32_t类型的数字：第一个uint32_t表示国家第二个uint32_t用于表示省份第三个uint32_t用于表示城市第四个uint32_t用于表示区县
  selfSignature: string; // 个性签名长度不得超过500个字节
  allowType: string; // 加好友验证方式TIM.TYPES.ALLOW_TYPE_ALLOW_ANY（允许任何人添加自己为好友）TIM.TYPES.ALLOW_TYPE_NEED_CONFIRM（需要经过自己确认才能添加自己为好友）TIM.TYPES.ALLOW_TYPE_DENY_ANY（不允许任何人添加自己为好友）
  language: number; // 语言uint32
  avatar: string; // 头像URL，长度不得超过500个字节
  messageSettings: number; // 消息设置uint32标志位：Bit0：置0表示接收消息，置1则不接收消息
  adminForbidType: string; // 管理员禁止加好友标识TIM.TYPES.FORBID_TYPE_NONE（默认值，允许加好友）TIM.TYPES.FORBID_TYPE_SEND_OUT（禁止该用户发起加好友请求）
  level: number; // 等级uint32建议拆分以保存多种角色的等级信息
  role: number; // 角色uint32建议拆分以保存多种角色信息
  lastUpdatedTime: number; // 上次更新时间，用户本地时间
  profileCustomField: Propertie[]; // 自定义资料键值对集合，可根据业务侧需要使用，详细请参考:https://cloud.tencent.com/document/product/269/1500#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.B5.84.E6.96.99.E5.AD.97.E6.AE.B5
}
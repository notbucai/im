/**
 * @interface CreateGroupOption
 * @description 创建群组参数
 */
declare interface CreateGroupOption {
  name: string;			 // 必填，群组名称，最长30字节
  type: string;		 // 群组类型
  groupID?: string;	 // 群组ID。不填该字段时，会自动为群组创建一个唯一的群 ID
  introduction?: string;	 // 群简介，最长240字节
  notification?: string;	 // 群公告，最长300字节
  avatar?: string;	 // 群头像 URL，最长100字节
  maxMemberNum?: number;	 // 最大群成员数量，缺省时的默认值：好友工作群是200，陌生人社交群是2000，临时会议群是10000，直播群无限制
  joinOption?: string;	// 申请加群处理方式。
  memberList?: GroupMemberOption[];//  初始群成员列表，最多500个。创建直播群时不能添加成员
  groupCustomField?: any[];
}


declare interface GroupMemberOption {
  userID: string;		 //必填，群成员的 userID
  /**
    TIM.TYPES.GRP_MBR_ROLE_OWNER（群主）
    TIM.TYPES.GRP_MBR_ROLE_ADMIN（群管理员）
    TIM.TYPES.GRP_MBR_ROLE_MEMBER（群普通成员）
   */
  role: string;//成员身份，可选值只有Admin，表示添加该成员并设其为管理员
  memberCustomField?: any[];//群成员维度的自定义字段，默认情况是没有的，需要
}

/**
 * @interface GroupMember
 * @description 群组成员
 */
declare interface GroupMember {
  userID: string;		 //必填，群成员的 userID
  /**
    TIM.TYPES.GRP_MBR_ROLE_OWNER（群主）
    TIM.TYPES.GRP_MBR_ROLE_ADMIN（群管理员）
    TIM.TYPES.GRP_MBR_ROLE_MEMBER（群普通成员）
   */
  role: string;//成员身份，可选值只有Admin，表示添加该成员并设其为管理员
  avatar: string;	//群成员头像 URL
  nick: string // 群成员昵称
  joinTime: number // 入群时间
  nameCard: string // 群名片
  muteUntil: number; // 禁言截止时间戳，单位: 秒
  memberCustomField?: any[];//群成员维度的自定义字段，默认情况是没有的，需要

}

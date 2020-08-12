
/**
 * @interface UserInfo
 * @description 本地用户资料映射
 */
declare interface UserInfo {
  id: string | number, // id 一般唯一标示即可
  name: string, // 昵称 一般为昵称或id
  info: string, // 用户描述
  avatar: string, // 用户头像
  time: string, // 加入时间 or 最后登录时间
}
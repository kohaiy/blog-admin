/**
 * title     : 获取用户信息
 * path      : /user/info
 * created at: 2021/4/4 下午10:16:04
 * updated at: 2021/4/4 下午10:17:38
 */
import ApiClient from '../../api-client';

export interface GetUserInfoResp {
    id: number;
    name: string;
    email: string;
}

export default function () {
  return ApiClient.httpGet<GetUserInfoResp>('/user/info', { });
}

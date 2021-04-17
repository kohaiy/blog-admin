/**
 * title     : 用户登录
 * path      : /auth/login
 * created at: 2021/2/27 下午10:28:43
 * updated at: 2021/4/3 下午5:47:56
 */
import ApiClient from '../../api-client';

export interface PostAuthLoginBody {
    loginName: string;
    password: string;
}
export interface PostAuthLoginResp {
    token: string;
    userId: number;
}

export default function (body: PostAuthLoginBody) {
  return ApiClient.httpPost<PostAuthLoginResp>('/auth/login', { body });
}

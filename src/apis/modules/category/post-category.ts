/**
 * title     : 创建分类
 * path      : /category
 * created at: 2021/2/27 下午10:32:29
 * updated at: 2021/3/28 下午4:06:42
 */
import ApiClient from '../../api-client';

export interface PostCategoryBody {
    name: string;
    pid?: number;
    icon?: string;
    description?: string;
}
export interface PostCategoryResp {
    id: number;
}

export default function (body: PostCategoryBody) {
  return ApiClient.httpPost<PostCategoryResp>('/category', { body });
}

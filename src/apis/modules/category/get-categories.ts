/**
 * title     : 获取分类列表
 * path      : /categories
 * created at: 2021/2/27 下午10:36:35
 * updated at: 2021/3/28 下午4:41:44
 */
import ApiClient from '../../api-client';

export interface GetCategoriesResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}

export default function () {
  return ApiClient.httpGet<GetCategoriesResp[]>('/categories', { });
}

/**
 * title     : 通过pid获取分类列表
 * path      : /categories/opts
 * created at: 2021/3/25 下午10:53:11
 * updated at: 2021/3/28 下午5:00:55
 */
import ApiClient from '../../api-client';

export interface GetCategoriesOptsResp {
    id: number;
    name: string;
    icon?: string;
    pid?: number;
    description?: string;
}

export default function (pid?: number) {
  return ApiClient.httpGet<GetCategoriesOptsResp[]>('/categories/opts', { query: { pid } });
}

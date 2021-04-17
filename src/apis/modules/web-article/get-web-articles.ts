/**
 * title     : 获取文章列表
 * path      : /web/articles
 * created at: 2021/4/4 下午10:41:06
 * updated at: 2021/4/6 下午9:49:41
 */
import ApiClient from '../../api-client';

export interface GetWebArticlesQuery {
    page: number;
    size: number;
}
export interface GetWebArticlesRespList {
    id: number;
    name: string;
    content: string;
    tags: string[];
    categoryId: number;
    categoryName: string;
}
export interface GetWebArticlesResp {
    list: GetWebArticlesRespList[];
    total: number;
}

export default function (query?: GetWebArticlesQuery) {
  return ApiClient.httpGet<GetWebArticlesResp>('/web/articles', { query });
}

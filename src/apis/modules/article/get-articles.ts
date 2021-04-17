/**
 * title     : 获取文章列表
 * path      : /articles
 * created at: 2021/2/15 下午8:34:43
 * updated at: 2021/4/11 下午8:37:36
 */
import ApiClient from '../../api-client';

export interface GetArticlesQuery {
    page?: number;
    size?: number;
}
export interface GetArticlesRespList {
    id: number;
    name: string;
    content: string;
    introduction: string;
    tags: string[];
    categoryId: number;
    categoryIds: number[];
    categoryName: string;
    isActive: boolean;
}
export interface GetArticlesResp {
    list: GetArticlesRespList[];
    total: number;
}

export default function (query?: GetArticlesQuery) {
  return ApiClient.httpGet<GetArticlesResp>('/articles', { query });
}

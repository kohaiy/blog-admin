/**
 * title     : 获取文章详情
 * path      : /article/{id}
 * created at: 2021/2/15 下午8:44:53
 * updated at: 2021/4/3 下午5:04:13
 */
import ApiClient from '../../api-client';

export interface GetArticleByIdResp {
    id: number;
    categoryId: number;
    name: string;
    content: string;
    tags: string[];
}

export default function (id: number) {
  return ApiClient.httpGet<GetArticleByIdResp>('/article/{id}', { params: { id } });
}

/**
 * title     : 获取文章详情
 * path      : /web/article/{id}
 * created at: 2021/4/4 下午10:42:27
 * updated at: 2021/4/4 下午11:54:59
 */
import ApiClient from '../../api-client';

export interface GetWebArticleByIdResp {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    content: string;
    tags: string[];
    updatedAt: Date;
    author: string;
    likeTotal: number;
    viewTotal: number;
}

export default function (id: number) {
  return ApiClient.httpGet<GetWebArticleByIdResp>('/web/article/{id}', { params: { id } });
}

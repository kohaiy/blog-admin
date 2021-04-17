/**
 * title     : 新增文章
 * path      : /article
 * created at: 2021/4/3 下午3:30:12
 * updated at: 2021/4/11 下午8:37:50
 */
import ApiClient from '../../api-client';

export interface PostArticleBody {
    name: string; // 文章标题
    introduction: string;
    content: string; // 文章内容
    tags: string[]; // 标签
    categoryId: number; // 分类id
}
export interface PostArticleResp {
    id: number; // 新增的文章id
}

export default function (body: PostArticleBody) {
  return ApiClient.httpPost<PostArticleResp>('/article', { body });
}

/**
 * title     : 编辑文章
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:34:57
 * updated at: 2021/4/11 下午8:38:02
 */
import ApiClient from '../../api-client';

export interface PutArticleByIdBody {
    name: string; // 文章标题
    introduction: string;
    content: string; // 文章内容
    tags: string[]; // 标签
    categoryId: number; // 分类id
}

export default function (id: number, body: PutArticleByIdBody) {
  return ApiClient.httpPut<boolean>('/article/{id}', { params: { id }, body });
}

/**
 * title     : 更新文章状态
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:41:50
 * updated at: 2021/4/3 下午4:32:17
 */
import ApiClient from '../../api-client';

export interface PatchArticleByIdBody {
    isActive: boolean; // 是否启用
}

export default function (id: number, body: PatchArticleByIdBody) {
  return ApiClient.httpPatch<boolean>('/article/{id}', { params: { id }, body });
}

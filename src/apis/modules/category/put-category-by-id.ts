/**
 * title     : 修改分类
 * path      : /category/{id}
 * created at: 2021/3/28 下午5:01:55
 * updated at: 2021/3/28 下午5:16:58
 */
import ApiClient from '../../api-client';

export interface PutCategoryByIdBody {
    pid?: number;
    name: string;
    icon?: string;
    description?: string;
}

export default function (id: number, body: PutCategoryByIdBody) {
  return ApiClient.httpPut<boolean>('/category/{id}', { params: { id }, body });
}

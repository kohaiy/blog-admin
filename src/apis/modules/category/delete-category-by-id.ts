/**
 * title     : 删除分类
 * path      : /category/{id}
 * created at: 2021/3/25 下午11:33:12
 * updated at: 2021/3/28 下午4:15:08
 */
import ApiClient from '../../api-client';

export default function (id: number) {
  return ApiClient.httpDelete<boolean>('/category/{id}', { params: { id } });
}

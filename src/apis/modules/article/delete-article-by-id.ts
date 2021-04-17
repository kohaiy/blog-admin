/**
 * title     : 删除文章
 * path      : /article/{id}
 * created at: 2021/4/3 下午3:39:38
 * updated at: 2021/4/3 下午4:18:42
 */
import ApiClient from '../../api-client';

export default function (id: number) {
  return ApiClient.httpDelete<boolean>('/article/{id}', { params: { id } });
}

<template>
  <k-container class="article">
    <el-card>
      <div>
        <el-button type="primary" @click="handleAddArticle" size="mini"
          >新建文章</el-button
        >
      </div>
      <el-table style="" :data="articles">
        <el-table-column prop="id" width="50px" label="id" />
        <el-table-column prop="name" label="标题" />
        <el-table-column
          prop="introduction"
          :formatter="contentFormatter"
          label="简介"
        />
        <el-table-column prop="tags" label="标签">
          <template v-slot="{ row }">{{ row.tags.join(', ') }}</template>
        </el-table-column>
        <el-table-column prop="categoryName" label="分类" />
        <el-table-column prop="isActive" width="100px" label="状态">
          <template v-slot="{ row }">
            <el-switch
              :model-value="row.isActive"
              @update:model-value="handleArticleStatusChange(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="action" width="150px" label="操作">
          <template v-slot="{ row }">
            <el-button @click="handleEditArticle(row)" size="mini"
              >编辑</el-button
            >
            <el-button
              @click="handleRemoveArticle(row)"
              type="danger"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :current-page="pagination.page"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <article-form-drawer
      v-model:visible="formDrawerVisible"
      :detail="selectedArticle"
      @refresh="loadList"
    />
  </k-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  getArticles,
  deleteArticleById,
  patchArticleById,
} from '@/apis/modules/article';
import { GetArticlesRespList } from '@/apis/modules/article/get-articles';
import { ElMessage, ElMessageBox } from 'element-plus';
import ArticleFormDrawer from './article-form-drawer.vue';

export default defineComponent({
  components: { ArticleFormDrawer },
  setup() {
    const articles = ref<GetArticlesRespList[]>([]);
    const pagination = ref({
      total: 0,
      page: 1,
      size: 10,
    });
    const selectedArticle = ref<GetArticlesRespList | null>(null);

    const loadList = async () => {
      const { data } = await getArticles({
        page: pagination.value.page,
        size: pagination.value.size,
      });
      if (data) {
        articles.value = data.list;
        pagination.value.total = data.total;
      }
    };
    loadList();
    const handlePageChange = (page: number) => {
      pagination.value.page = page;
      loadList();
    };

    const formDrawerVisible = ref(false);
    const handleAddArticle = () => {
      selectedArticle.value = null;
      formDrawerVisible.value = true;
    };

    const handleEditArticle = (row: GetArticlesRespList) => {
      selectedArticle.value = row;
      formDrawerVisible.value = true;
    };

    const handleArticleStatusChange = async (row: GetArticlesRespList) => {
      const { data } = await patchArticleById(row.id, {
        isActive: !row.isActive,
      });
      if (data) {
        row.isActive = !row.isActive;
      }
    };

    const handleRemoveArticle = async (row: GetArticlesRespList) => {
      try {
        await ElMessageBox.confirm(`确认要删除文章“${row.name}”吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        const { data } = await deleteArticleById(row.id);
        if (data) {
          ElMessage({
            type: 'success',
            message: '删除成功!',
          });
          loadList();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const contentFormatter = (val: GetArticlesRespList) => `${val.introduction.substr(0, 50)}${val.introduction.length > 50 ? '...' : ''}`;

    return {
      articles,
      pagination,
      selectedArticle,
      formDrawerVisible,
      handleAddArticle,
      contentFormatter,
      loadList,
      handlePageChange,
      handleEditArticle,
      handleArticleStatusChange,
      handleRemoveArticle,
    };
  },
});
</script>

<style lang="scss">
.article {
  .pagination {
    margin-top: 8px;
    text-align: right;
  }
}
</style>

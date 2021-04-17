<template>
  <k-container class="category">
    <el-card>
      <div>
        <el-button type="primary" @click="handleAddCategory" size="mini"
          >新建分类</el-button
        >
      </div>
      <el-table style="" :data="categories">
        <el-table-column prop="id" label="id" />
        <el-table-column
          prop="pid"
          label="父级id"
          :formatter="(val) => val.pid || '/'"
        />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="action" label="操作">
          <template v-slot="{ row }">
            <el-button @click="handleEditCategory(row)" size="mini"
              >编辑</el-button
            >
            <el-button
              @click="handleRemoveCategory(row)"
              type="danger"
              size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <category-form-drawer
      v-model:visible="formDrawerVisible"
      :detail="selectedCategory"
      @refresh="loadCategories"
    />
  </k-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getCategories, deleteCategoryById } from '@/apis/modules/category';
import { GetCategoriesResp } from '@/apis/modules/category/get-categories';
import CategoryFormDrawer from './category-form-drawer.vue';

export default defineComponent({
  components: { CategoryFormDrawer },
  name: 'Category',
  setup() {
    const formDrawerVisible = ref(false);
    const categories = ref<GetCategoriesResp[]>([]);
    const selectedCategory = ref<GetCategoriesResp | null>(null);

    const loadCategories = async () => {
      const { data } = await getCategories();
      if (data) {
        categories.value = data;
      }
    };
    loadCategories();

    const handleAddCategory = () => {
      selectedCategory.value = null;
      formDrawerVisible.value = true;
    };
    const handleEditCategory = (row: GetCategoriesResp) => {
      selectedCategory.value = row;
      formDrawerVisible.value = true;
    };
    const handleRemoveCategory = async (row: GetCategoriesResp) => {
      try {
        await ElMessageBox.confirm(`确认要删除分类“${row.name}”吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        const { data } = await deleteCategoryById(row.id);
        if (data) {
          ElMessage({
            type: 'success',
            message: '删除成功!',
          });
          loadCategories();
        }
      } catch (error) {
        console.log(error);
      }
    };
    return {
      categories,
      selectedCategory,
      formDrawerVisible,
      loadCategories,
      handleAddCategory,
      handleEditCategory,
      handleRemoveCategory,
    };
  },
});
</script>

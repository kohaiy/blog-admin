<template>
  <el-drawer
    title="新建分类"
    :model-value="visible"
    :size="400"
    @update:model-value="$emit('update:visible', $event)"
    destroy-on-close
  >
    <div class="category-form-drawer">
      <el-form :model="form" label-suffix="：" label-width="100px">
        <el-form-item prop="pid" label="父级分类">
          <el-select size="mini" v-model="form.pid" clearable>
            <el-option
              v-for="it in categoryOpts"
              :key="it.id"
              :label="it.name"
              :value="it.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="分类名称">
          <el-input
            v-model="form.name"
            size="mini"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="icon" label="分类图标">
          <el-input
            v-model="form.icon"
            size="mini"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="description" label="描述信息">
          <el-input
            v-model="form.description"
            type="textarea"
            size="mini"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <div class="action-btn">
          <el-button type="primary" @click="handleSave" size="mini"
            >保存</el-button
          >
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch, PropType,
} from 'vue';
import { ElMessage } from 'element-plus';
import {
  getCategoriesOpts,
  postCategory,
  putCategoryById,
} from '@/apis/modules/category';
import { PostCategoryBody } from '@/apis/modules/category/post-category';
import { GetCategoriesOptsResp } from '@/apis/modules/category/get-categories-opts';
import { GetCategoriesResp } from '@/apis/modules/category/get-categories';

export default defineComponent({
  name: 'CategoryFormDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object as PropType<GetCategoriesResp | null>,
    },
  },
  emits: ['refresh', 'update:visible'],
  setup(props, { emit }) {
    const form = ref<PostCategoryBody>({
      pid: undefined,
      name: '',
      icon: '',
      description: '',
    });
    const categoryOpts = ref<GetCategoriesOptsResp[]>([]);

    const loadCategoryOpts = async () => {
      const { data } = await getCategoriesOpts();
      if (data) {
        categoryOpts.value = data;
      }
    };
    loadCategoryOpts();

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          loadCategoryOpts();
          if (props.detail) {
            form.value.pid = props.detail.pid;
            form.value.name = props.detail.name;
            form.value.icon = props.detail.icon;
            form.value.description = props.detail.description;
          } else {
            form.value.pid = undefined;
            form.value.name = '';
            form.value.icon = '';
            form.value.description = '';
          }
        }
      },
    );

    const handleSave = async () => {
      if (props.detail) {
        const { data } = await putCategoryById(props.detail.id, {
          pid: form.value.pid || undefined,
          name: form.value.name,
          icon: form.value.icon,
          description: form.value.description,
        });
        if (data) {
          ElMessage.success('保存成功');
          emit('update:visible', false);
          emit('refresh');
        }
        return;
      }
      const { data } = await postCategory({
        pid: form.value.pid || undefined,
        name: form.value.name,
        icon: form.value.icon,
        description: form.value.description,
      });
      if (data) {
        ElMessage.success('新增成功');
        emit('update:visible', false);
        emit('refresh');
      }
    };

    return {
      form,
      categoryOpts,
      handleSave,
    };
  },
});
</script>

<style lang="scss">
.category-form-drawer {
  height: 100%;
  padding: 20px;
  overflow: auto;
  .action-btn {
    text-align: right;
  }
}
</style>

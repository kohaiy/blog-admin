<template>
  <el-drawer
    title="新建文章"
    :model-value="visible"
    :size="800"
    @update:model-value="$emit('update:visible', $event)"
    destroy-on-close
  >
    <div class="article-form-drawer">
      <el-form :model="form" label-suffix="：" label-width="100px">
        <el-form-item prop="categoryIds" label="分类">
          <el-cascader
            :props="categoryProps"
            v-model="form.categoryIds"
            size="mini"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="name" label="文章标题">
          <el-input
            v-model="form.name"
            size="mini"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content" label="文章内容">
          <k-md-editor v-model="form.content" />
        </el-form-item>
        <el-form-item prop="introduction" label="文章简介">
          <el-input
            type="textarea"
            v-model="form.introduction"
            size="mini"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tags" label="添加标签">
          <div class="tags-wrapper">
            <el-tag
              v-for="(tag, i) in form.tags"
              :key="tag"
              @close="handleRemoveTag(i)"
              size="mini"
              closable
            >
              {{ tag }}
            </el-tag>
          </div>
          <el-input
            v-model="tags"
            @keydown.enter="handleTagsEnter"
            size="mini"
            placeholder="请输入(回车添加)"
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
import { postArticle, putArticleById } from '@/apis/modules/article';
import { getCategoriesOpts } from '@/apis/modules/category';
import { PostArticleBody } from '@/apis/modules/article/post-article';
import { GetArticlesRespList } from '@/apis/modules/article/get-articles';
import { GetCategoriesOptsResp } from '@/apis/modules/category/get-categories-opts';
import KMdEditor from '@/components/k-md-editor/index.vue';

export default defineComponent({
  name: 'ArticleFormDrawer',
  components: { KMdEditor },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object as PropType<GetArticlesRespList | null>,
    },
  },
  emits: ['refresh', 'update:visible'],
  setup(props, { emit }) {
    const form = ref<PostArticleBody & { categoryIds: number[] }>({
      name: '',
      introduction: '',
      content: '',
      categoryId: 0,
      categoryIds: [],
      tags: [],
    });
    const tags = ref('');
    const categoryOpts = ref<GetCategoriesOptsResp[]>([]);

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          if (props.detail) {
            form.value.name = props.detail.name;
            form.value.introduction = props.detail.introduction;
            form.value.content = props.detail.content;
            form.value.categoryId = props.detail.categoryId;
            form.value.categoryIds = props.detail.categoryIds;
            form.value.tags = props.detail.tags;
            tags.value = '';
          } else {
            form.value.name = '';
            form.value.introduction = '';
            form.value.content = '';
            form.value.categoryId = 0;
            form.value.categoryIds = [];
            form.value.tags = [];
            tags.value = '';
          }
        }
      },
    );

    const loadCategoryOpts = async () => {
      const { data } = await getCategoriesOpts();
      if (data) {
        categoryOpts.value = data;
      }
    };
    loadCategoryOpts();

    const handleSave = async () => {
      if (props.detail) {
        const { data } = await putArticleById(props.detail.id, {
          name: form.value.name,
          introduction: form.value.introduction,
          content: form.value.content,
          categoryId: form.value.categoryIds[1],
          tags: form.value.tags,
        });
        if (data) {
          ElMessage.success('保存成功');
          emit('update:visible', false);
          emit('refresh');
        }
        return;
      }
      const { data } = await postArticle({
        name: form.value.name,
        introduction: form.value.introduction,
        content: form.value.content,
        categoryId: form.value.categoryIds[1],
        tags: form.value.tags,
      });
      if (data) {
        ElMessage.success('新增成功');
        emit('update:visible', false);
        emit('refresh');
      }
    };

    const handleTagsEnter = () => {
      form.value.tags.push(...tags.value.split(/[\s]+/));
      form.value.tags = [
        ...new Set(form.value.tags.filter((t: string) => t && t.trim())),
      ];
      tags.value = '';
    };
    const handleRemoveTag = (index: number) => {
      form.value.tags.splice(index, 1);
    };

    const categoryProps = ref({
      lazy: true,
      async lazyLoad(node: any, resolve: any) {
        const { data } = await getCategoriesOpts(node.data?.value);
        if (data) {
          resolve(
            data.map(({ id, name }) => ({
              value: id,
              label: name,
              leaf: node.level >= 1,
            })),
          );
        }
        resolve([]);
      },
    });

    return {
      form,
      tags,
      categoryProps,
      categoryOpts,
      handleSave,
      handleTagsEnter,
      handleRemoveTag,
    };
  },
});
</script>

<style lang="scss">
.article-form-drawer {
  height: 100%;
  padding: 20px;
  overflow: auto;
  .tags-wrapper {
    margin: -4px;
    .el-tag {
      margin: 4px;
    }
  }

  .action-btn {
    text-align: right;
  }
}
</style>

<template>
  <div class="k-md-editor">
    <div>
      <el-radio-group
        v-model="viewMode"
        @change="handleViewModeChange"
        size="mini"
      >
        <el-radio-button :label="VIEW_MODE.EDITTING">编辑</el-radio-button>
        <el-radio-button :label="VIEW_MODE.PERVIEW">预览</el-radio-button>
      </el-radio-group>
    </div>
    <div v-html="contentHTML" v-show="viewMode === VIEW_MODE.PERVIEW"></div>
    <div v-show="viewMode === VIEW_MODE.EDITTING">
      <el-input
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value', $event)"
        type="textarea"
        size="mini"
        rows="20"
        placeholder="请输入"
      ></el-input>
    </div>
    <div id="editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import marked from 'marked';
// import jquery from 'jquery';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// window.jQuery = jquery;

// eslint-disable-next-line
// const editormd = require('editor.md/src/editormd') as any;
// const testEditor = editormd('editor', {
//   width: '90%',
//   height: 640,
//   syncScrolling: 'single',
//   path: '~editor.md/lib/',
// });
// console.log(testEditor());

export default defineComponent({
  name: 'KMdEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const VIEW_MODE = {
      EDITTING: 0,
      PERVIEW: 1,
    };
    const viewMode = ref<number>(VIEW_MODE.EDITTING);
    const contentHTML = ref<string>('');
    const handleViewModeChange = (mode: number) => {
      if (mode === VIEW_MODE.PERVIEW) {
        contentHTML.value = marked(props.modelValue);
      }
    };
    return {
      VIEW_MODE,
      viewMode,
      contentHTML,
      handleViewModeChange,
    };
  },
});
</script>

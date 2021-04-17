<template>
  <div class="k-main">
    <k-side/>
    <div class="k-main--right-block">
      <k-header/>
      <div class="k-main--container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KHeader from './k-header.vue';
import KSide from './k-side.vue';

export default defineComponent({
  components: { KHeader, KSide },
  setup() {
    return {};
  },
});
</script>

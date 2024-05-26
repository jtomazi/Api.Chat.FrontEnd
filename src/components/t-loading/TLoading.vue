<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-spinner v-if="loading" color="primary" size="3em" :thickness="10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";

const props = defineProps<{
  loading: boolean;
}>();

const loading = toRef(props, "loading");
</script>

<template>
  <q-skeleton :style="`width: ${width}px`" :type="type" />
</template>

<script setup lang="ts">
import { toRef } from "vue";

const props = defineProps<{
  type:
    | "text"
    | "rect"
    | "circle"
    | "QBtn"
    | "QBadge"
    | "QChip"
    | "QToolbar"
    | "QCheckbox"
    | "QRadio"
    | "QToggle"
    | "QSlider"
    | "QRange"
    | "QInput"
    | "QAvatar";
  width: number;
}>();

const type = toRef(props, "type");
const width = toRef(props, "width");
</script>

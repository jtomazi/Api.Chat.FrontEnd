/* eslint-disable */
<template>
  <div class="chat-component">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <div
          style="width: 100%"
          v-for="(message, index) in messages"
          :key="index"
        >
          <q-chat-message
            v-if="message.name == userActual"
            sent
            :text="[message.body]"
            :name="message.name"
            :stamp="message.date"
          />
          <q-chat-message
            v-else
            :text="[message.body]"
            :name="message.name"
            :stamp="message.date"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, watch } from "vue";

const props = defineProps<{
  userActual: string;
  messages: Array<any>;
}>();

const messages = toRef(props, "messages");
const userActual = toRef(props, "userActual");
</script>

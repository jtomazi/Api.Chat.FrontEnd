<template>
  <div class="home">
    <q-layout style="height: auto; min-height: max-content">
      <q-page-container v-if="loading">
        <TSkeleton :width="381" type="QRange" />
        <div
          style="
            display: flex;
            align-items: stretch;
            gap: 10px;
            margin-top: 25px;
          "
        >
          <TSkeleton :width="250" type="QRange" />
          <TSkeleton :width="121" type="QRange" />
        </div>
      </q-page-container>
      <q-page-container v-else>
        <div v-if="connected">
          <q-input
            style="width: 381px"
            outlined
            placeholder="Informe seu nome"
            v-model="message.name"
            dense
          />
          <ChatComponent :messages="messages" :user-actual="message.name" />
          <div style="display: flex; align-items: stretch; gap: 10px">
            <q-input
              style="width: 250px"
              outlined
              @keyup.enter="send"
              placeholder="Digite uma mensagem"
              v-model="message.body"
              dense
            >
            </q-input>
            <q-btn
              style="width: 121px"
              @click="send"
              color="green"
              icon-right="send"
              label="Enviar"
            />
          </div>
        </div>
        <q-banner
          v-else
          :rounded="true"
          dense
          inline-actions
          class="text-white bg-red"
        >
          Não foi possível conectar-se com o servidor.
          <span v-if="connectionError"
            ><br />Mensagem original do erro: {{ connectionError }}</span
          >
          <template v-slot:action>
            <q-icon
              @click="reload"
              style="cursor: pointer"
              name="refresh"
              size="1.5em"
            />
          </template>
        </q-banner>
      </q-page-container>
    </q-layout>
  </div>
</template>
<style scoped lang="less"></style>

<script setup lang="ts">
import ChatComponent from "@/components/chat-component/ChatComponent.vue";
import TSkeleton from "@/components/t-skeleton/TSkeleton.vue";
import Hub from "../features/hub/Hub";
import { onMounted, reactive, ref } from "vue";

const connectionError = ref("");
const connected = ref(false);
const loading = ref(false);
const messages = ref<any[]>([]);
const message = reactive({
  name: "",
  body: "",
});

const _hub = new Hub();

onMounted(() => {
  loading.value = true;
  connectionError.value = "";

  //setTimeout pra ter um loading legalzinho :)
  setTimeout(() => {
    _hub.connection
      .start()
      .then(() => {
        connected.value = true;
        connectionError.value = "";
        console.log("Hub connected!");

        _hub.connection.on("ReceivedMessageAsync", (msg) => {
          console.log(`Message: `, msg);
          messages.value.push(msg);
        });
      })
      .catch((err) => {
        console.error("Hub connection failed", err);
        connectionError.value = err;
        connected.value = false;
      })
      .finally(() => (loading.value = false));
  }, 1500);
});

const reload = () => location.reload();

const send = () => {
  if (!message.body) return;

  _hub.connection.invoke("SendMessageAsync", message);
  message.body = "";
};
</script>

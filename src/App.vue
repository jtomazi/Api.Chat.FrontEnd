<template>
  <main class="main">
    <router-view />
  </main>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
  height: 100vh;
}
</style>

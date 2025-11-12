<script setup lang="ts">
import { RouterView } from 'vue-router';

// Keep Electron API functionality
window.electronAPI.sendMessage('Electron + Vue + Vuetify app loaded!');
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>
</style>

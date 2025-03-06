<template>
  <div class="flex h-screen max-h-screen flex-col overflow-hidden">
    <NavBar class="relative top-0 right-0 left-0 w-full" />
    <div
      class="from-primary-600 to-primary-800 text-primary-1000 dark:text-primary-0 flex grow flex-col overflow-hidden bg-gradient-to-br p-5"
    >
      <ContainerComponent
        class="bg-primary-0 dark:bg-primary-975 box-border grow overflow-auto p-5"
      >
        <RouterView />
      </ContainerComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import ContainerComponent from './components/ContainerComponent.vue'
</script>

<template>
  <div
    class="flex h-screen max-h-screen flex-col overflow-hidden"
    :data-theme="dark ? 'dark' : 'light'"
  >
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
import { provide, ref } from 'vue'
import type { Comment } from './model'
import { store } from './stores'
import { repositoryName } from './model/Parsing'

const dark = ref(false)
provide('dark', dark)
/*if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
  dark.value = true
}*/

fetch(`/${repositoryName}/data.json`)
  .then((response) => response.json())
  .then((data) => {
    const comments = data as Comment[]
    comments.forEach((comment) => {
      store().comments.push(comment)
    })
    store().comments.sort((a, b) => a.id - b.id)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
</script>

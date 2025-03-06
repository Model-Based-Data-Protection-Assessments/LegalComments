<template>
  <header
    class="text-primary-1000 dark:text-primary-0 bg-primary-0 dark:bg-primary-975 space-x-5 px-3 py-1 text-xl"
  >
    <RouterLink v-for="link in routes" :key="link.name" :to="link">{{ link.name }}</RouterLink>
  </header>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { RouterLink } from 'vue-router'

const linkNames = ['Home', 'Table', 'Dev', 'New']
const routes = linkNames.map((name) => router.getRoutes().find((route) => route.name === name)!)
</script>

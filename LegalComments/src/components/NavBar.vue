<template>
  <header
    class="text-primary-1000 dark:text-primary-0 bg-primary-0 dark:bg-primary-975 space-x-5 px-3 py-1 text-xl"
  >
    <RouterLink
      v-for="link in routes"
      :key="link.name"
      :class="{ 'font-bold': currentRoute === link.name }"
      :to="link"
      >{{ link.name }}</RouterLink
    >

    <ThemeSwitch class="absolute top-1 right-5 h-full" />
  </header>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeSwitch from './ThemeSwitch.vue'

const linkNames = ['Home', 'Table', 'New', 'Dev']
const routes = linkNames.map((name) => router.getRoutes().find((route) => route.name === name)!)

const currentRoute = computed(() => router.currentRoute.value.name)
</script>

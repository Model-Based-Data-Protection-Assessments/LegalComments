<template>
  <div class="flex h-fit w-full items-center rounded border border-black/50 dark:bg-gray-800">
    <FontAwesomeIcon :icon="faSearch" class="mx-2 text-gray-400" />
    <input
      v-model="store().searchString"
      type="search"
      placeholder="Search/Filter"
      class="h-8 grow rounded bg-transparent outline-none placeholder:text-gray-400"
    />
  </div>
</template>

<script setup lang="ts">
import { store } from '@/stores'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

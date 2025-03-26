<template>
  <div class="flex justify-center align-middle">
    <label class="relative inline-block h-6 w-12">
      <input v-model="dark" type="checkbox" class="h-0 w-0 opacity-0" />
      <span
        class="bg-primary-50 dark:bg-primary-700 absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-full border border-black/10 transition-all duration-300 ease-in-out"
        :class="{
          'before:translate-x-[1.375rem]': dark
        }"
      >
        <span
          class="bg-primary-800 absolute bottom-[calc(0.125rem-1px)] left-[calc(0.125rem-1px)] z-50 flex h-5 w-5 items-center justify-center rounded-full text-center text-sm text-white duration-300"
          :class="{
            'translate-x-[1.5rem]': dark
          }"
        >
          <FontAwesomeIcon v-if="!dark" :icon="faSun" />
          <FontAwesomeIcon v-else :icon="faMoon" />
        </span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { inject, type Ref } from 'vue'

const dark = inject('dark') as Ref<boolean>
</script>

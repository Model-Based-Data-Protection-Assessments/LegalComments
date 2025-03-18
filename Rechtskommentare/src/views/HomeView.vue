<template>
  <div class="flex h-full flex-col items-center justify-center gap-4 align-middle">
    <h1 class="text-3xl font-bold">Legal Comments</h1>
    <p>Description text</p>
    <RouterLink to="/table/">
      <ButtonLikeComponent>Navigate to Table</ButtonLikeComponent>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import ButtonLikeComponent from '@/components/ButtonLikeComponent.vue'
</script>

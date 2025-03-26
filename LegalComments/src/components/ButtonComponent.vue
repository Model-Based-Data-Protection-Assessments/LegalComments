<!-- Stylized object for everything clickable -->
<template>
  <button>
    <ButtonLikeComponent :disabled="disabled">
      <slot></slot>
    </ButtonLikeComponent>
  </button>
</template>

<script setup lang="ts">
import ButtonLikeComponent from './ButtonLikeComponent.vue'

defineProps({
  /** Whether to display the disabled style */
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

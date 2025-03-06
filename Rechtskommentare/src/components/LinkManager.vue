<template>
  <div class="space-y-1">
    <div v-for="[idx, link] of value.entries()" :key="idx" class="flex gap-x-2">
      <input v-model="link.text" type="text" placeholder="Display Text" @input="change()" />
      <input v-model="link.to" type="text" placeholder="Link" class="w-96" @input="change()" />
      <button v-if="link.text != '' || link.to != ''" @click="value.splice(idx, 1); change()">
        <FontAwesomeIcon :icon="faTrash" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '@/model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array<Link>,
    default: () => [{
      text: '',
      to: ''
    }]
  }
})

const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const value = ref<Link[]>(props.modelValue)
if (value.value.length == 0) {
  value.value.push({
    text: '',
    to: ''
  })
} else if (value.value[value.value.length - 1].text != '' || value.value[value.value.length - 1].to != '') {
  value.value.push({
    text: '',
    to: ''
  })
}

function change() {
  const last = value.value[value.value.length-1]
  if (last.text != '' || last.to != '') {
    value.value.push({
      text: '',
      to: ''
    })
  }

  const copy = value.value.filter(l => l.text != '')
  emit('update:modelValue', copy)
}

watch(() => props.modelValue, (val) => {
  value.value = val
  if (value.value.length == 0) {
    value.value.push({
      text: '',
      to: ''
    })
  } else if (value.value[value.value.length - 1].text != '' || value.value[value.value.length - 1].to != '') {
    value.value.push({
      text: '',
      to: ''
    })
  }
})
</script>

<style scoped>
@reference "../main.css";

input {
  @apply rounded border border-black/50 dark:bg-gray-800 outline-none px-1;
}
</style>
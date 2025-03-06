<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">Temporary Developer Functionality</h1>
    <ButtonComponent @click="uploadComments()">Upload Comments</ButtonComponent>
    <ButtonComponent @click="downloadComments()">Download Comments</ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import { store } from '@/stores'
import { type Comment } from '@/model'

function downloadComments() {
  const content = JSON.stringify(store().comments)
  const link = document.createElement('a')
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
  link.download = 'comments.json'
  link.click()
}

function uploadComments() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      const newComments = JSON.parse(content) as Comment[]
      newComments.forEach((comment) => store().comments.push(comment))
    }
    reader.readAsText(file)
  }
  input.click()
}
</script>

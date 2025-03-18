<template>
  <div>
    <div class="table w-full">
      <!-- Header -->
      <div class="table-row">
        <div
          v-for="col in columnOrder"
          :key="col"
          class="table-cell max-h-fit border-b border-gray-400 text-center"
        >
          {{ columnNames[col] }}
        </div>
      </div>

      <!-- Content Row -->
      <RouterLink
        v-for="[index, comment] in comments.entries()"
        :key="comment.id"
        :class="{ 'bg-black/10 dark:bg-black/30': index % 2 == 1 }"
        :to="{
          name: 'Comment',
          params: { id: comment.id.toString() }
        }"
        class="table-row"
      >
        <div
          v-for="col in columnOrder"
          :key="col"
          :class="{ 'text-center': col != 'id' }"
          class="table-cell"
        >
          {{ getDisplayValue(comment, col) }}
        </div>
      </RouterLink>
    </div>

    <div v-if="comments.length == 0" class="w-full pt-2 text-center font-bold">
      No comments fit search
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CommentKeys, Comment } from '@/model'

defineProps({
  comments: {
    type: Array<Comment>,
    required: true
  }
})

const columnOrder: CommentKeys[] = [
  'id',
  'legalTerm',
  'usedIn',
  'relatedComments',
  'basedOn',
  'references'
]
const columnNames: Partial<Record<CommentKeys, string>> = {
  id: 'ID',
  legalTerm: 'Name',
  usedIn: 'Used in',
  relatedComments: 'Related Comments',
  basedOn: 'Based on',
  references: 'References'
}

function getDisplayValue(comment: Comment, key: CommentKeys): string {
  if (key == 'id') {
    return comment.id.toString()
  } else if (key == 'legalTerm') {
    return comment.legalTerm
  } else if (key == 'usedIn' || key == 'basedOn' || key == 'references') {
    return comment[key].map((l) => l.text).join(', ')
  } else if (key == 'relatedComments') {
    return comment[key].map((r) => `#${r}`).join(', ')
  }
  return comment[key].toString()
}
</script>

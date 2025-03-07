<template>
  <div>
    <div class="flex">
      <SearchBar class="w-1/2 max-w-3/4 min-w-96" />
      <div class="flex-1"><!-- Placeholder --></div>
      <RouterLink to="/new">
        <ButtonLikeComponent>
          <div class="flex items-center gap-1">
            <FontAwesomeIcon :icon="faPlus" />
            <span>New Comment</span>
          </div>
        </ButtonLikeComponent>
      </RouterLink>
    </div>
    <CommentTable :comments="comments" />
  </div>
</template>

<script setup lang="ts">
import ButtonLikeComponent from '@/components/ButtonLikeComponent.vue'
import CommentTable from '@/components/CommentTable.vue'
import SearchBar from '@/components/SearchBar.vue'
import { store } from '@/stores'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'

const searchParts = computed(() => {
  return store().searchString.toLowerCase().split(' ')
})

const comments = computed(() => {
  return store().comments.filter((comment) => {
    if (searchMatches(comment.id.toString())) {
      return true
    }
    if (searchMatches(comment.name.toLowerCase())) {
      return true
    }

    for (const norm of comment.legalNorm) {
      if (searchMatches(norm.text.toLowerCase())) {
        return true
      }
      if (searchMatches(norm.to.toLowerCase())) {
        return true
      }
    }
    for (const reference of comment.references) {
      if (searchMatches(reference.text.toLowerCase())) {
        return true
      }
      if (searchMatches(reference.to.toLowerCase())) {
        return true
      }
    }
  })
})

function searchMatches(value: string) {
  return searchParts.value.some((part) => value.includes(part))
}
</script>

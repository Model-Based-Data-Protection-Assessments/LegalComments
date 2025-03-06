<template>
  <div>
    <div class="flex">
      <SearchBar class="max-w-3/4 min-w-96 w-1/2" />
      <div class="flex-1"><!-- Placeholder --></div>
      <RouterLink
        to="/new"
      >
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
import ButtonLikeComponent from '@/components/ButtonLikeComponent.vue';
import CommentTable from '@/components/CommentTable.vue';
import SearchBar from '@/components/SearchBar.vue';
import { store } from '@/stores';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';

const comments = computed(() => {
  return store().comments
})
</script>

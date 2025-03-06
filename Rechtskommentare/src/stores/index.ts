import { defineStore } from 'pinia'
import { type Comment } from '@/model'

export const store = defineStore('store', {
  state: () =>
    ({
      comments: [],
      searchString: ''
    }) as State,
  getters: {},
  actions: {}
})

interface State {
  comments: Comment[]
  searchString: string
}

import { defineStore } from 'pinia'

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

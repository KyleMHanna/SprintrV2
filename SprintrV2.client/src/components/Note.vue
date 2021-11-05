<template>
  <div class="card col-11 px-2 pt-2 mb-1">
    <div class="row">
      <div class="col d-flex align-items-center">
        <img :src="note.creator.picture" alt="" />
        <h6 class="ms-2">
          {{ note.creator.name }}
        </h6>
      </div>
    </div>
    <div class="row">
      <p>{{ note.body }}</p>
    </div>
  </div>
  <div
    class="col-1 d-flex justify-content-center"
    v-if="account.id === note.creatorId"
  >
    <i class="mdi mdi-delete f-20" @click="deleteNote(note.id)"></i>
  </div>
</template>

<script>
import {computed} from '@vue/reactivity'
import {useRoute, useRouter} from 'vue-router'
import {Notes} from '../models/Notes.js'
import {AppState} from '../AppState.js'
import Pop from '../utils/Pop.js'
import {notesService} from '../services/NotesService.js'
export default {
  props: {
    note: {
      type: Notes,
      required: true
    }
  },

  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteNote(noteId) {
        try {
          await notesService.deleteNote(route.params.projectId, noteId)

        } catch (error) {
          Pop.toast(error.message)
        }
      }
    }

  }
}
</script>

<style>
</style>
<template>
  <div class="card col-11 px-2 pt-2 m-3 sticky">
    <div class="row">
      <div class="col d-flex align-items-center">
        <img :src="note.creator.picture" alt="" style="width: 45px" />
        <p class="ms-2">
          {{ note.creator.name }}
        </p>
      </div>
    </div>
    <div class="row">
      <h1>{{ note.body }}</h1>
      <div
        class="d-flex justify-content-center"
        v-if="account.id === note.creatorId"
      >
        <i
          class="mdi mdi-delete text-danger f-20"
          @click="deleteNote(note.id)"
        ></i>
      </div>
    </div>
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

<style scoped lang ="css">
@import url(https://fonts.googleapis.com/css?family=Permanent+Marker);

.sticky {
  background: linear-gradient(#fefcaf, #fffeda);
  padding: 5px 20px 10px 20px;

  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);

  font: 13px "Lucida Grande", Serif;
}

/* .sticky h1 {
  font-family: "Permanent Marker", cursive;
  color: #eb2626;
} */

.sticky:before,
.sticky:after {
  content: "";
  z-index: -1;
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 70%;
  max-width: 300px;
  max-height: 100px;
  height: 55%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: skew(-15deg) rotate(-6deg);
}

.sticky:after {
  left: auto;
  right: 20px;
  transform: skew(15deg) rotate(6deg);
}
</style>
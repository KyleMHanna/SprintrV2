<template>
  <div class="component">
    <div class="mb-3">
      <form @submit.prevent="createNote()">
        <div class="form-group">
          <label class="pr-2" for="note-body">Note body</label>
          <label for="title">Note</label>
          <input
            type="text"
            class="form-control bg-light"
            placeholder="Note"
            v-model="editable.body"
            required
          />
        </div>
        <div class="form-group">
          <div class="form-group">
            <button type="submit" class="btn btn-success mt-2">Create</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from '@vue/reactivity'
import Pop from '../utils/Pop'
import {Modal} from 'bootstrap'
import {logger} from '../utils/Logger'
import {notesService} from '../services/NotesService'
import {useRoute} from 'vue-router'

export default {
  props: {
    backlog: {type: Object, required: true}
  },
  setup(props) {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      route,
      async createNote() {
        try {
          editable.value.backlogItemId = props.backlog.id
          editable.value.projectId = route.params.id
          await notesService.addNote(route.params.projectId, editable.value)
          editable.value = {}
          Pop.toast('Note Created!', 'success')
          // const modal = Modal.getInstance(document.getElementById('note-form'))
          // modal.hide()
          logger.log(props, editable)
        } catch (error) {
          logger.log(error)
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <form @submit.prevent="createBacklogItem()">
    <div class="form-group">
      <label for="title">Name</label>
      <input
        type="text"
        class="form-control bg-light"
        name="title"
        placeholder="Backlog Item Name"
        v-model="editable.name"
        required
      />
    </div>
    <div class="form-group">
      <label for="body">Description</label>
      <input
        type="text"
        class="form-control bg-light"
        name="body"
        placeholder="Backlog Item Description"
        v-model="editable.description"
        required
      />
      <div class="form-group">
        <label for="body">Status</label>
        <select
          class="form-control bg-light"
          name="status"
          placeholder="Backlog Item Description"
          v-model="editable.status"
          required
        >
          <option disabled selected value="">Status</option>
          <option>pending</option>
          <option>in-progress</option>
          <option>review</option>
          <option>done</option>
        </select>
        <div class="form-group">
          <button type="submit" class="btn btn-success mt-2">Create</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {ref} from '@vue/reactivity'
import {useRoute} from 'vue-router'
import {backlogService} from '../services/BacklogService.js'
import Pop from '../utils/Pop.js'
import {Modal} from 'bootstrap'
import {logger} from '../utils/Logger.js'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      route,
      async createBacklogItem() {
        try {
          await backlogService.createBacklogItem(route.params.projectId, editable.value)
          editable.value = {}
          Pop.toast('Backlog Item created successfully', 'success')
          const modal = Modal.getInstance(document.getElementById('backlogItem-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      }
    }
  }
}
</script>

<style>
</style>
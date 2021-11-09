<template>
  <div class="container-fluid w-100">
    <!-- <div v-if="currentBacklog.edit"> -->
    <div>
      <form @submit.prevent="editDetails()">
        <div class="my-2">
          <label class="form-label" for="name">Update Backlog Item Name</label>
          <div class="form-group">
            <label for="name"></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              placeholder="Backlog Item Name"
              v-model="editable.name"
              required
            />
          </div>
        </div>
        <label for="sprintId">Assign to Sprint: </label>
        <select v-model="editable.sprintId" id="sprintId" name="sprintId">
          <option v-for="s in sprints" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>

        <div class="row">
          <input
            v-model="editable.status"
            type="radio"
            id="pending"
            name="status"
            value="pending"
          />
          <label for="pending">Pending</label>
          <input
            v-model="editable.status"
            type="radio"
            id="in-progress"
            name="status"
            value="in-progress"
          />
          <label for="in-progress">In-Progress</label>
          <input
            v-model="editable.status"
            type="radio"
            id="review"
            name="status"
            value="review"
          />
          <label for="review">Review</label>
          <input
            v-model="editable.status"
            type="radio"
            id="done"
            name="status"
            value="done"
          />
          <label for="done">Done</label>
        </div>
        <div class="btn-group">
          <button type="submit" class="btn btn-success">Save</button>
          <button type="reset" class="btn btn-muted">Cancel</button>
        </div>
      </form>
    </div>
  </div>
  <!-- <div v-else>
      <div class="row">
        <h6>Assigned to:</h6>
        <h5>Sprint 1</h5>
      </div>
      <div class="row">
        <h3 class="mb-3">Status</h3>
        <div class="status">Pending</div>
        <div class="status">In-Progress</div>
        <div class="status">Review</div>
        <div class="status">Done</div>
      </div>
    </div>
  </div> -->
</template>

<script>
import {computed, ref} from '@vue/reactivity'
import {useRoute} from 'vue-router'
import {watchEffect} from '@vue/runtime-core'
import {AppState} from '../AppState.js'
import {backlogService} from '../services/BacklogService.js'
import Pop from '../utils/Pop.js'
import {Backlog} from '../models/Backlog.js'
export default {
  props: {
    backlog: {type: Backlog, default: () => new Backlog()}
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = {...props.backlog}
    })
    return {
      currentBacklog: computed(() => AppState.currentBacklog),
      sprints: computed(() => AppState.sprints.filter(s => s.projectId === AppState.currentProject.id)),
      notes: computed(() => AppState.notes.filter(n => n.backlogItemId === AppState.currentBacklog.id)),
      editable,
      async editDetails() {
        try {
          await backlogService.editBacklogItem(route.params.projectId, AppState.currentBacklog.id, editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>
</style>
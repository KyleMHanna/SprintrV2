<template>
  <!-- <h1>{{backlogs.name}}</h1> -->
  <div class="row">
    <div class="col-md-3">
      <h1>{{ backlog.name }}</h1>
    </div>
    <div class="col-md-3">
      <p>Details: {{ backlog.description }}</p>
      <h5>status:{{ backlog.status }}</h5>
    </div>
    <div class="col-1">
      <!-- this makes the data-bs target dynamically add the backlog id to the target based on which backlog is used to pop the modal -->
      <button
        data-bs-toggle="modal"
        :data-bs-target="'#task-form-'+ backlog.id"
        class="modal-btn mx-1 my-1"
      >
        <i class="mdi mdi-plus-thick text-danger">Task </i>
      </button>
    </div>
    <div class="col-1" @click="deleteBacklog()">
      <i class="mdi mdi-trash-thick text-danger"> delete</i>
    </div>
  </div>
  <div >
    <div >
    <Task v-for="t in task" :key="t.id" :task="t"  />

    </div>
  </div>
  <footer>
  <!-- this makes the modal id match what the data target is looking for -->
    <Modal :id="'task-form-' + backlog.id " :backlog="backlog" >
      <template #modal-title>
        <h4>Create task</h4>
      </template>
      <template #modal-body>
        <TaskForm :backlog="backlog" />
      </template>
    </Modal>
  </footer>
</template>

<script>
import {computed} from '@vue/reactivity'
import {AppState} from '../AppState.js'
import {Backlog} from '../models/Backlog.js'
import { backlogService } from "../services/BacklogService.js"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop.js"

export default {
  props: {
    backlog: {type: Backlog, required: true}
  },
  setup(props) {
    const route = useRoute()
    return {
      async deleteBacklog(){
        try {
          await backlogService.deleteBacklogItem(route.params.projectId, props.backlog.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      account: computed(() => AppState.account),
      // tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === AppState.backlogs.id)),
      task: computed(() => AppState.tasks),
      backlogs: computed(() => AppState.backlogs)


    }
  }
}
</script>

<style>
</style>
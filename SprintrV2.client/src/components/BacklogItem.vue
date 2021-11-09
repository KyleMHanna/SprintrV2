<template>
<div class="row bg bg-secondary">
  <!-- <SprintAccordian  /> -->

    <div class="col-md-3 ">
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
        :data-bs-target="'#task-form-' + backlog.id"
        class="modal-btn mx-1 my-1"
      >
        <i class="mdi mdi-plus-thick text-danger">Task </i>
      </button>
      <button
        data-bs-toggle="modal"
        :data-bs-target="'#note-form-' + backlog.id"
        class="modal-btn mx-1 my-1"
      >
        <i class="mdi mdi-plus-thick text-danger">Note </i>
      </button>
    </div>
    <div class="col-1" @click="deleteBacklog()">
      <i class="mdi mdi-delete text-danger"> delete</i>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <Task v-for="t in task" :key="t.id" :task="t" />
      </div>
      <div class="col-md-6">
        <Note v-for="n in note" :key="n.id" :note="n" />
      </div>
    </div>
  </div>

  <footer>
    <!-- this makes the modal id match what the data target is looking for -->
    <Modal :id="'task-form-' + backlog.id" :backlog="backlog">
      <template #modal-title>
        <h4>Create task</h4>
      </template>
      <template #modal-body>
        <TaskForm :backlog="backlog" />
      </template>
    </Modal>
    <!-- Note Modal with ID attach -->
    <Modal :id="'note-form-' + backlog.id" :backlog="backlog">
      <template #modal-title>
        <h4>Create note</h4>
      </template>
      <template #modal-body>
        <NoteForm :backlog="backlog" />
      </template>
    </Modal>
  </footer>
</template>

<script>
import {computed} from '@vue/reactivity'
import {AppState} from '../AppState.js'
import {Backlog} from '../models/Backlog.js'
import {backlogService} from "../services/BacklogService.js"
import {useRoute} from "vue-router"
import Pop from "../utils/Pop.js"
import { Sprint } from "../models/Sprint.js"
import { onMounted } from "@vue/runtime-core"
import { sprintsService } from "../services/SprintsService.js"

export default {
  props: {
    backlog: {type: Backlog, required: true},
    // sprint:{type: Sprint , required: true}
  },
  setup(props) {
    onMounted(async () =>{
      try {
        await sprintsService.getSprints(route.params.projectId)
      } catch (error) {
        
      }
    })
    const route = useRoute()
    return {
      async deleteBacklog() {
        try {
          await backlogService.deleteBacklogItem(route.params.projectId, props.backlog.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
       async moveBacklogToSprint(backlogId){
        try {
          debugger
          await sprintsService.moveBacklogToSprint(route.params.projectId, props.sprint.id, backlogId )
          
        } catch (error) {
          Pop.toast(error, "Failed to move backlog")
        }
      },
      account: computed(() => AppState.account),
      task: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.backlog.id)),
      // task: computed(() => AppState.tasks),
      backlog: computed(() => AppState.backlogs),
      note: computed(() => AppState.notes.filter(note => note.backlogItemId === props.backlog.id)),
      sprint: computed(() => AppState.sprints)
    }
  }
}
</script>

<style>
</style>
<template>
  <div
    class="row  m-auto"
    :class="{ 'bg-danger': (backlog.weightTotal > 15) },
     { 'bg-warning':(backlog.weightTotal <= 15 && backlog.weightTotal >5 ) },
     { 'bg-success': (backlog.weightTotal <=5)},
     { 'bg-dark text-white': (backlog.weightTotal == 0)}"
  >
    <div class="col-md-1">
      <span class="px-2" :class="{'text-light': (backlog.weightTotal == 0)}">
        {{ backlog.weightTotal }}<i class="mdi mdi-weight f-20 px-2"></i
      ></span>
    </div>
    <div class="col-md-3">
      <h1 :class="{'text-light': (backlog.weightTotal == 0)}">{{ backlog.name }}</h1>
    </div>
    <div class="col-md-3">
      <p  :class="{'text-light': (backlog.weightTotal == 0)}">Details: {{ backlog.description }}</p>
      <h5 :class="{'text-light': (backlog.weightTotal == 0)}">status:{{ backlog.status }}</h5>
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
        data-bs-target="#assign-backlog-modal"
        @click="getCurrentBacklogId(backlog.id)"
      >
        <i class="mdi mdi-plus-thick text-primary">Assign Sprint </i>
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
      <i class="mdi mdi-delete text-danger selectable"></i>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <Task v-for="t in tasks" :key="t.id" :task="t" />
      </div>
      <div class="col-md-6">
        <Note v-for="n in notes" :key="n.id" :note="n" />
      </div>
    </div>
  </div>

  <footer>
    <!-- modal for adding task to  backlog  -->
    <Modal :id="'add-to-sprint-' + backlog.id" :backlog="backlog">
      <template #modal-title>
        <h4>Create task</h4>
      </template>
      <template #modal-body>
        <TaskForm :backlog="backlog" />
      </template>
    </Modal>
    <!-- modal for assigning backlog to sprint -->
    <Modal id="assign-backlog-modal">
      <template #modal-title>
        <h4>{{ backlog.name }}</h4>
      </template>
      <template #modal-body>
        <BacklogDetails />
      </template>
    </Modal>
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

export default {
  props: {
    backlog: {type: Backlog, required: true}
  },
  setup(props) {
    const route = useRoute()
    return {
      async deleteBacklog() {
        try {
          await backlogService.deleteBacklogItem(route.params.projectId, props.backlog.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async getCurrentBacklogId(backlogId) {
        try {
          await backlogService.setBacklogItem(backlogId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.backlog.id)),
      // task: computed(() => AppState.tasks),
      backlogs: computed(() => AppState.backlogs),
      notes: computed(() => AppState.notes.filter(note => note.backlogItemId === props.backlog.id))
    }
  }
}
</script>

<style lang="css" scoped>
.colorred{
  background-color:orangered
}
</style>
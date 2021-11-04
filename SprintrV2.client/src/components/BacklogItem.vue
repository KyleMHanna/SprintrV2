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
      <button
        data-bs-toggle="modal"
        :data-bs-target="'#task-form-'+ backlog.id"
        class="modal-btn mx-1 my-1"
      >
        <i class="mdi mdi-plus-thick text-danger">Task </i>
      </button>
    </div>
  </div>
  <div >
    <Task v-for="t in tasks" :key="t.id" :task="t"  />
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
export default {
  props: {
    backlog: {type: Backlog, required: true}
  },
  setup(props) {
    return {
   
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks.filter(t => t.backlogItemId === AppState.backlogs.id)),
      // tasks: computed(() => AppState.tasks)
    }
  }
}
</script>

<style>
</style>
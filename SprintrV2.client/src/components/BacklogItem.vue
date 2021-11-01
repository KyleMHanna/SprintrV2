<template>
  <!-- <h1>{{backlogs.name}}</h1> -->
  <div class="row">
    <div class="col-1">
      <button data-bs-toggle="modal" data-bs-target="#task-form" class="modal-btn mx-1 my-1">
          <i class="mdi mdi-plus-thick text-dager">Task </i>
       make task </button>
    </div>
  </div>
  <Task v-for="t in tasks" :key="t.id" :task="t" />
  <footer>
     <Modal id="task-form">
    <template #modal-title>
      <h4>Create task</h4>
    </template>
    <template #modal-body>
      <TaskForm :backlog-item="backlogItem" />
    </template>
  </Modal>
  </footer>
</template>

<script>
export default {
  props: {
    backlogItem: {type:Object, required: true}
  },
  setup(props) {
    return {
      tasks: computed(() => AppState.tasks),
      task: computed(() => AppState.tasks.filter(t => t.backlogItemId === props.backlogItem.id)),
    }
  }
}
</script>

<style>
</style>
<template>
  <form @submit.prevent="createTask()">
    <div class="form-group">
      <label for="title">Name</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder="Name"
             v-model="editable.name"
             required
      >
    </div>
    <div class="form-group">
      <label for="body">weight</label>
      <input type="Number"
             class="form-control bg-light"
             name="body"
             placeholder="Weight"
             v-model="editable.weight"
             required
      >

      <div class="form-group">
        <button type="submit" class="btn btn-success mt-2">
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { taskService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"


export default {
  props: {
    backlogItem:{type: Object, required: true}
  },
  setup(props){
    
    const editable = ref({})
    const route = useRoute()
    return{
      editable,
      route,
      async createTask(){
        try {
          logger.log(props.backlogItem)
          await taskService.createTask(route.params.projectId, props.backlogItem.id, editable.value)
          editable.value= {}
          Pop.toast('task made', success)
          const modal = Modal.getInstance(document.getElementById('task-form')
          )
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log('error')
        }
      }

    }
  }
}
</script>

<style>

</style>
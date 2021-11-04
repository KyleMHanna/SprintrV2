<template>
  <div class="card bg-secondary">
    {{ task.name }}
    {{ task.weight }}
    <button  class="btn btn-danger" @click="deleteTask(task.id)">DELETE</button>
  </div>
  <!-- <div class="col-1">
  </div> -->
</template>

<script>
import {computed} from "@vue/reactivity"
import {useRoute} from "vue-router"
import {AppState} from "../AppState"
import {router} from "../router"
import {taskService} from "../services/TasksService"
import Pop from "../utils/Pop"
import {Task} from '../models/Task.js'



export default {
  props: {
    // project: {type: Object, required: true},
    task: {type: Task, required: true}
  },
  setup(props) {
    const route = useRoute()
    //  const editable = ref({}),
    return {
      async deleteTask(taskId) {
        const yes = await Pop.confirm('are you positive you want to delete this?')
        if (!yes) {return }
        await taskService.deleteTask(route.params.projectId, taskId)
        Pop.toast('Deleted', 'success')
      },
      catch(error) {
        Pop.toast(error, 'error')
      },
      account: computed(()=> AppState.account),
      tasks: computed(() => AppState.tasks)
    }



  }
}
</script>

<style>
</style>
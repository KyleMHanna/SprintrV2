<template>
  <div class="card justify-content-between m-3">
    <div class="card-header bg-secondary text-center">
      <button
        class="btn"
        v-if="task.creatorId === account.id"
        @click="deleteTask(task.id)"
      >
        <i class="mdi mdi-delete text-danger selectable"></i>
      </button>
      {{ task.name }}
    </div>
    <div class="card-body">Weight: {{ task.weight }}</div>
    <div class="card-body">
      <input
        @change="checked()"
        v-model="editable.isComplete"
        true-value="true"
        false-value="false"
        type="checkbox"
      />
    </div>
  </div>
</template>

<script>
import {computed, ref} from "@vue/reactivity"
import {useRoute} from "vue-router"
import {AppState} from "../AppState"
import {router} from "../router"
import {taskService} from "../services/TasksService"
import Pop from "../utils/Pop"
import {Task} from '../models/Task.js'
import {watchEffect} from '@vue/runtime-core'



export default {
  props: {
    task: {type: Task, required: true}
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    watchEffect(() => {
      editable.value = props.task
    })
    return {
      editable,
      route,
      async deleteTask(taskId) {
        const yes = await Pop.confirm('are you positive you want to delete this?')
        if (!yes) {return }
        await taskService.deleteTask(route.params.projectId, taskId)
        Pop.toast('Deleted', 'success')
      },

      async checked() {
        try {
          await taskService.checkTask(route.params.projectId, props.task.id, editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log('checked', error.message)
        }
      },
      account: computed(() => AppState.account),
      tasks: computed(() => AppState.tasks)
    }



  }
}
</script>

<style>
</style>
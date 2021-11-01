<template>
<div class="row">

<div class="col-4">
  <div class="card">
    
    {{task.name}}
    {{task.weight}}
  </div>
  <div class="col-1">
    <button class="btn btn-danger" @click="deleteTask()">
      DELETE
    </button>
  </div>
</div>

</div>
  
</template>

<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { router } from "../router"
import { taskService } from "../services/TasksService"
import Pop from "../utils/Pop"



export default {
  props: { 
    project: {type: Object, required: true},
    task: {type: Object, required: true}
  },
 setup(props){
 const route = useRoute()
//  const editable = ref({}),
return{
  tasks: computed(()=> AppState.tasks),
  async deleteTask(taskId){
    const yes = await Pop.confirm('are you poitive you want to delete this?')
          if (!yes) { return }
          await taskService.deleteTask(route.params.projectId,taskId)
          Pop.toast('Deleted', 'success') }, 
 catch (error) {
          Pop.toast(error, 'error')
        }
        }
    
  

}
}
</script>

<style>

</style>
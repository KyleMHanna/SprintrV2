<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
          <!-- <button @click="moveBacklogToSprint()">Add Backlog to Sprint</button> -->
      <h3>{{ sprint.name }}</h3>
      <p>
        <small
          >{{ new Date(sprint.endDate).toLocaleDateString() }} -
          {{ new Date(sprint.startDate).toLocaleDateString() }}</small
        >
      </p>
      <p v-if="sprint.isOpen == true">
        <i class="mdi mdi-circle text-success"></i>
      </p>
      <p v-else><i class="mdi mdi-circle text-danger"></i></p>
    </div>
    <h1>PROJECT BACKLOGS</h1>

    <div>
     
  
    </div>
  </div>
</template>

<script>
import {computed} from '@vue/reactivity'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState.js'
import {Sprint} from '../models/Sprint.js'
import { Backlog } from "../models/Backlog.js"
import Pop from "../utils/Pop.js"
import { sprintsService } from "../services/SprintsService.js"

export default {
  props: {
   sprint: {type: Sprint, required: true}
    
  },
  setup(props) {
    const route = useRoute()
    return {
      async moveBacklogToSprint(backlogId){
        try {
          debugger
          await sprintsService.moveBacklogToSprint(route.params.projectId, props.sprint.id, backlogId )
          
        } catch (error) {
          Pop.toast(error, "Failed to move backlog")
        }
      },
      account: computed(() => AppState.account),
      currentProject: computed(() => AppState.currentProject),
      sprintbacklogs: computed(() => AppState.backlogs.filter(b => b.sprintId === props.sprint.id)),
      backlogs: computed(() => AppState.backlogs.filter(b => b.backlogItemId === route.params.projectId)),
      currentsprint: computed(() => AppState.currentSprint),
      sprint: computed(() => AppState.sprints)
    }
  }

}
</script>

<style>
</style>
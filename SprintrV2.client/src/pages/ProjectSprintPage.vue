<template>
  <h1 class="text-center text-danger">project_sprint_page</h1>
  <div class="container-fluid text-center">
    <!-- <button @click="moveBacklogToSprint()">Add Backlog to Sprint</button> -->
    <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
  </div>
</template>

<script>
import {computed, onMounted} from '@vue/runtime-core'
import {useRoute} from 'vue-router'
import {sprintsService} from '../services/SprintsService.js'
import {AppState} from '../AppState.js'
import {projectsService} from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'
import { Sprint } from "../models/Sprint.js"
import { Backlog } from "../models/Backlog.js"

export default {
  name: 'ProjectSprintPage',
  
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        
        await sprintsService.getSprints(route.params.projectId)
        await projectsService.getProjectById(route.params.projectId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      // async moveBacklogToSprint(){
      //   try {
      //     await sprintsService.moveBacklogToSprint(route.params.projectId, props.sprint.id, props.backlog.id )
          
      //   } catch (error) {
          
      //   }
      // },
      route,
      sprint: computed(() => AppState.currentSprint),
      sprints: computed(() => AppState.sprints),
      currentProject: computed(() => AppState.currentProject),
      backlog: computed(() => AppState.backlogs)

    }
  }
}

</script>

<style>
</style>
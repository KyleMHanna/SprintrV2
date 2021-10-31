<template>
  <h1>hello from project_sprint_page</h1>
  <div class="container-fluid">
    <Sprint v-if="sprint.id" :sprint="sprint" />
  </div>
</template>

<script>
import {computed, onMounted} from '@vue/runtime-core'
import {useRoute} from 'vue-router'
import {sprintsService} from '../services/SprintsService.js'
import {AppState} from '../AppState.js'
import {projectsService} from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'

export default {
  name: 'ProjectSprintPage',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await sprintsService.getSprints(route.params.id)
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      route,
      sprint: computed(() => AppState.currentSprint),
      sprints: computed(() => AppState.sprints),
      currentProject: computed(() => AppState.currentProject)

    }
  }
}

</script>

<style>
</style>
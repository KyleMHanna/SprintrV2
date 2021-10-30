<template>
  <h1>hello from ProjectPage</h1>
  <b>
    {{ currentProject.name }}
  </b>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { projectsService } from '../services/ProjectsService.js'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
export default {
  name: 'ProjectPage',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.project),
      currentProject: computed(() => AppState.currentProject),
    }
  }
}
</script>

<style>
</style>
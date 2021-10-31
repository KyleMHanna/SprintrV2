<template>
  <h1>hello from ProjectPage</h1>
  <b>
    {{ currentProject.name }}
  </b>
  <router-link :to="{ name: 'Project.Backlog' }">
    <li class="nav-link">Backlog</li>
  </router-link>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { projectsService } from '../services/ProjectsService.js'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  name: 'ProjectPage',
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getProjectById(route.params.projectId)
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
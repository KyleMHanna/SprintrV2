<template>
  <div class="container-fluid">
    <!-- <div class="row"> -->
    <BacklogItem v-for="b in backlogs" :key="b.id" :backlog="b" />
    <!-- </div> -->
  </div>
</template>

<script>
import {computed, onMounted} from "@vue/runtime-core"
import {useRoute} from "vue-router"
import {backlogService} from "../services/BacklogService"
import {notesService} from "../services/NotesService"
import {projectsService} from "../services/ProjectsService"
import {sprintsService} from "../services/SprintsService"
import {taskService} from "../services/TasksService"
import Pop from "../utils/Pop"
import {AppState} from "../AppState"

export default {

  name: 'ProjectBacklogPage',
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await backlogService.getBacklogs(route.params.projectId)
        await projectsService.getProjectById(route.params.projectId)
        await taskService.getTasks(route.params.projectId)
        await notesService.getNotes(route.params.projectId)
        await sprintsService.getSprints(route.params.projectId)
      } catch (error) {
        Pop.toast(error.message, 'error', 'from project backlogpage')
      }
    })
    return {
      backlog: computed(() => AppState.currentBacklog),
      backlogs: computed(() => AppState.backlogs),
      currentProject: computed(() => AppState.currentProject)
      // note: computed(() => AppState.notes)
    }
  }
}
</script>

<style>
</style>
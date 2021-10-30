<template>
<div class="row">
  <div class="col-md-4">
      <router-link :to="{name:'Project', params: {projectId: project.id}}" class="selectable">
            {{ project.name }}
      </router-link>
  </div>
  <div class="col-md-4" v-if="project.creator">
<img :src="project.creator.picture" class="rounded-circle" height="30">
  </div>
  <div class="col-md-4">
<p>{{ new Date(project.createdAt).toDateString() }}</p>
  </div>
</div>
</template>

<script>
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'

export default {
  props: {
    project: { type: Project, required: true }
  },
  setup(props) {
    return {
    projects: computed(() => AppState.projects),
    account: computed(() => AppState.account),
    async deleteProject(projectId){
      try {
        const yes = await Pop.confirm('Are you sure you')
        if(!yes) {return}
        await projectsService.deleteProject(props.project.id)
      } catch (error) {
        Pop.toast(error.message,'error')
      }
    }
    }
  }
}
</script>

<style>

</style>
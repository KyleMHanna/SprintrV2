<template>
  <div class="row text-center card-header">
    <div class="col-md-3 m-3">
      <router-link
        :to="{ name: 'Project', params: { projectId: project.id } }"
        class="selectable"
      >
        <h1 v-if="project.creator">
          <img
            :src="project.creator.picture"
            class="rounded-circle"
            height="30"
          />
          {{ project.name }}
        </h1>
      </router-link>
    </div>
    <div class="col-md-3 card-body m-3">
      <h3>
        {{ project.description }}
      </h3>
    </div>
    <div class="col-md-3 m-3">
      <div
        class="on-hover text-end"
        style="right: 1rem; top: 1rem"
        v-if="account.id == project.creatorId"
      >
        <i
          class="mdi mdi-delete text-danger f-20 selectable"
          @click="deleteProject()"
        ></i>
      </div>
      <p>{{ new Date(project.createdAt).toDateString() }}</p>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js'
import { projectsService } from '../services/ProjectsService.js'
import { Project } from '../models/Project.js'
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'

export default {
  props: {
    project: { type: Object, required: true }
  },
  setup(props) {
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      async deleteProject(projectId) {
        try {
          const yes = await Pop.confirm('Are you sure you')
          if (!yes) { return }
          await projectsService.deleteProject(props.project.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style>
</style>
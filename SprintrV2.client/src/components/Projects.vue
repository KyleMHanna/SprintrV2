<template>
  <div class="container-fluid">
    <div class="row text-center card-header">
      <div class="col-md-3 m-3">
        <p v-if="project.creator">
          Project lead:
          <img
            :src="project.creator.picture"
            class="rounded-circle"
            height="30"
          />
          {{ project.creator.name }}
        </p>
        <router-link
          :to="{ name: 'Project', params: { projectId: project.id } }"
          class="selectable"
        >
          <h1>
            {{ project.name }}
          </h1>
        </router-link>
      </div>
      <div class="col-md-3 card-content m-3">
        <p>
          {{ project.description }}
        </p>
      </div>
      <div class="col-md-3 m-3">
        <p>{{ new Date(project.createdAt).toDateString() }}</p>
      </div>
      <div class="col-md-1">
        <div
          class=""
          style="right: 1rem; top: 1rem"
          v-if="account.id == project.creatorId"
        >
          <i
            class="mdi mdi-delete text-danger f-20 selectable"
            @click="deleteProject()"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js'
import {projectsService} from '../services/ProjectsService.js'
import {Project} from '../models/Project.js'
import {computed} from '@vue/reactivity'
import {AppState} from '../AppState.js'

export default {
  props: {
    project: {type: Object, required: true}
  },
  setup(props) {
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      async deleteProject(projectId) {
        try {
          const yes = await Pop.confirm('Are you sure you')
          if (!yes) {return }
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
<template>
  <h1 class="text-center">hello from ProjectPage</h1>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-md-10 card">
        <div class="card-header">
          <p v-if="currentProject.creator">
            Project lead:
            <img
              :src="currentProject.creator.picture"
              class="rounded-circle"
              height="30"
            />
            {{ currentProject.creator.name }}
          </p>
          <h3>{{ currentProject.name }}</h3>
        </div>
        <div class="card-body">
          {{ currentProject.description }}
          <p>{{ new Date(currentProject.createdAt).toDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1">
        <button
          class="btn create-button text-primary"
          data-bs-toggle="modal"
          data-bs-target="#Sprint-modal"
        >
          <i
            class="mdi mdi-plus-box-multiple-outline mdi-24px text-primary"
          ></i>
          Sprint
        </button>
      </div>

      <!-- <div v-for="s in sprints" :key="s.id" :sprint="s"> -->
      <router-link :to="{ name: 'Project.Sprint' }" class="text-center">
        <li class="nav-link">Sprints</li>
      </router-link>
      <!-- </div> -->
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <router-link :to="{ name: 'Project.Backlog' }" class="text-center">
        <li class="nav-link">Backlog</li>
      </router-link>
    </div>
  </div>
  <Modal id="Sprint-modal">
    <template #modal-title> Add Sprint </template>
    <template #modal-body>
      <SprintForm />
    </template>
  </Modal>
  <router-view />
</template>

<script>
import {computed, onMounted} from '@vue/runtime-core'
import {AppState} from '../AppState.js'
import {projectsService} from '../services/ProjectsService.js'
import {useRoute} from 'vue-router'
import Pop from '../utils/Pop.js'
import {sprintsService} from '../services/SprintsService.js'
export default {

  name: 'ProjectPage',
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
      account: computed(() => AppState.account),
      project: computed(() => AppState.project),
      sprints: computed(() => AppState.sprints),
      backlog: computed(() => AppState.backlogs),
      currentProject: computed(() => AppState.currentProject),
    }
  }
}
</script>

<style>
</style>
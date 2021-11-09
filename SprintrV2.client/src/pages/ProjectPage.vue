<template>
  <h1 class="text-center">hello from ProjectPage</h1>
  <div class="container text-center">
    <div class="row justify-content-center">
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
        <button
          data-bs-toggle="modal"
          data-bs-target="#backlogItem-form"
          class="btn create-button text-primary"
        >
          <i class="mdi mdi-plus-box-multiple-outline mdi-24px text-primary">
            Backlog</i
          >
        </button>
      </div>
      <div class="col-md-10 card">
        <div class="card-header bg bg-secondary">
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
      <div class="col-md-1">
        <router-link :to="{ name: 'Project.Sprint' }" class="text-center">
          <li class="nav-link">Sprints</li>
        </router-link>
        <router-link :to="{ name: 'Project.Backlog' }" class="text-center">
          <li class="nav-link">Backlog</li>
        </router-link>
      </div>
    </div>
  </div>
  <Modal id="backlogItem-form">
    <template #modal-title>
      <h4>Create Backlog Item</h4>
    </template>
    <template #modal-body>
      <BacklogItemForm />
    </template>
  </Modal>
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
import {backlogService} from '../services/BacklogService.js'
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
      project: computed(() => AppState.projects),
      backlog: computed(() => AppState.backlogs),
      sprints: computed(() => AppState.sprints.filter(s => s.projectId === AppState.currentProject.id)),
      currentProject: computed(() => AppState.currentProject),
      // async getCurrentBacklogId(backlogId) {
      //   try {
      //     await backlogService.setBacklogItem(backlogId)
      //   } catch (error) {
      //     Pop.toast(error.message, 'error')
      //   }
      // }
    }
  }
}
</script>

<style>
</style>
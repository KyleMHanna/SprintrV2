<template>
  <div class="container-fluid">
    <div class="row justify-content-around">
      <h1 class="text-center mb-4">
        Projects
        <button
          class="btn projectButton"
          data-bs-toggle="modal"
          data-bs-target="#createProject-modal"
        >
          <i class="mdi mdi-plus-circle mdi-48px text-success"></i>
        </button>
      </h1>
    </div>
    <Projects v-for="p in projects" :key="p.id" :project="p" />
  </div>
  <footer>
    <Modal id="createProject-modal">
      <template #modal-title> Create Project </template>
      <template #modal-body>
        <ProjectForm />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { projectsService } from '../services/ProjectsService.js'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { AppState } from '../AppState.js'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log('getProjects onMounted', error.message)
      }
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

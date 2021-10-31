<template>
  <form @submit.prevent="submitProjectForm">
    <div class="form-group text-center">
      <label for="name" class="">Name</label>
      <input
        type="text"
        class="form-control bg-white text-center"
        name="name"
        id="name"
        placeholder="Name"
        v-model="editable.name"
        required
      />
    </div>

    <div class="form-group mt-4 text-center">
      <label for="description" class="">Description</label>
      <input
        type="text"
        class="form-control description bg-white text-center"
        name="description"
        id="description"
        placeholder="Description"
        v-model="editable.description"
        required
      />
    </div>

    <div class="button-group my-3 text-center">
      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
        Create
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'
import { AppState } from '../AppState'
import { router } from '../router'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    watchEffect(() => {
      editable.value = {}
    })
    return {
      account: computed(() => AppState.account),
      project: computed(() => AppState.projects),
      editable,
      async submitProjectForm() {
        try {
          const project = await projectsService.createProject(editable.value)
          router.push({ name: 'Project', params: { projectId: project } })
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log('submit project form ', error)
        }
      }
    }
  }
}
</script>

  <style scoped lang="scss">
.description {
  height: 4rem;
}
</style>

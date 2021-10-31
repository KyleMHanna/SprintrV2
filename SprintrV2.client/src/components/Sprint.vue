<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h3>{{ sprint.name }}</h3>
      <p>
        <small
          >{{ new Date(sprint.endDate).toLocaleDateString() }} -
          {{ new Date(sprint.startDate).toLocaleDateString() }}</small
        >
      </p>
      <p v-if="sprint.isOpen == true">
        <i class="mdi mdi-circle text-success"></i>
      </p>
      <p v-else><i class="mdi mdi-circle text-danger"></i></p>
    </div>
    <BacklogItem v-for="b in backlogs" :key="b.id" :backlog="b" />
  </div>
</template>

<script>
import {computed} from '@vue/reactivity'
import {useRoute} from 'vue-router'
import {AppState} from '../AppState.js'
import {Sprint} from '../models/Sprint.js'
export default {
  props: {
    sprint: {type: Sprint, required: true}
  },
  setup() {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      currentProject: computed(() => AppState.currentProject),
      backlogs: computed(() => AppState.backlogs.filter(b => b.sprintId === AppState.currentSprint.id)),
    }
  }

}
</script>

<style>
</style>
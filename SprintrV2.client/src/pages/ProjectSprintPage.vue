<template>
  <h1>hello from project_sprint_page</h1>
  <div class="container-fluid">
    <Sprint v-if="sprint.id" :sprint="sprint" />
  </div>
</template>

<script>

export default {
  name: 'ProjectSprintPage',
  setup() {
    return {

    }
  }
}

</script>

<style>
</style>
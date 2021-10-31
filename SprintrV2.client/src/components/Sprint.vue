<template>
  <div class="row">
    <div class="col-md-8">
      <h3>{{ sprint.name }}</h3>
      <p>
        <small
          >{{ new Date(sprint.endDate).toLocaleDateString() }} -
          {{ new Date(sprint.startDate).toLocaleDateString() }}</small
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

    return {

    }
  }

}
</script>

<style>
</style>
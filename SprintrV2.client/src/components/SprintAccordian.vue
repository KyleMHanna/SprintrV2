<template>
   <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#flush-collapseOne-'" aria-expanded="false" aria-controls="flush-collapseOne">Sprint
      </button>
    </h2>
    <div id="'#flush-collapseOne-' "  class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
       <!-- <AccordianSprint v-for="s in sprints" :key="s.id" :sprints="s"/> -->

      </div>
    </div>
  </div>
  
</div>
</template>

<script>
import { AppState } from "../AppState"
import { Sprint } from "../models/Sprint"

export default {
props:{
  // sprint: {type: Sprint , required: true}
},
  setup(props){
    return{
      
      sprints: computed(() => AppState.sprints),
    }
  }
}
</script>

<style>

</style>
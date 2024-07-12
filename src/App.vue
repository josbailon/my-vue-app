<template>
  <div id="app">
    <div class="dashboard">
      <div class="card" v-for="(link, index) in links" :key="index">
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      links: [
    
      ]
    }
  }
});
</script>


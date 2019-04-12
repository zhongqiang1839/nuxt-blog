<template>
  <div class="app-container">
    <nuxt/>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {
    },
    mounted() {
      let body = document.getElementsByTagName("body")[0];
      let theme = localStorage.getItem('theme');
      body.setAttribute("class", theme || `theme0`)
    }
  }
</script>

<style>

</style>

<template>
<div id="app">
  <bbqnav></bbqnav>
  <router-view/>
</div>
</template>

<script>
import router from './router'
export default {
  name: 'app',
  mounted() {
    if (!localStorage.id_token) {
      router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #343a40;
  /*margin-top: 60px;*/
}
</style>

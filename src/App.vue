<template>
  <div id="app">
    <Base/>
  </div>
</template>
<script>

import Base from './components/Base'
import M from 'materialize-css'

export default {
  components:{Base},
  mounted () {
    M.AutoInit();
    this.$axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.getters.token;
  },

}
</script>
<style>


</style>

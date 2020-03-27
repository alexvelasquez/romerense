<template>
  <div>
    <Header v-show="loggedIn"/>
    <div v-show="loggedIn" class="row">
      <div  class="col s12 m12 l12" style="background-color:#bdbdbd ">
        <div class="col cs1 m6 l6 col-parallax">
          <h5  style="float: center;color:#fff;font-size: 29px;font-family: 'Passion One', cursive;">{{titleRoute}}</h5>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style="height:auto">
        <!-- <div class="s12 l12 m12">
        <div id="breadcrumbs-wrapper">
            <div class="container">
              <div class="row">
                <div class="col s12 m12 l12">
                  <h5 class="breadcrumbs-title">Forms</h5>
                  <ol class="breadcrumbs">
                    <li><a href="index.html">Dashboard</a>
                    </li>
                    <li><a href="#">Forms</a>
                    </li>
                    <li class="active">Forms Elements</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <div class="col s12 l2 m2">
          <Sidevar v-on:edit="editar()" v-show="loggedIn"/>
        </div>
        <div
          class="col "
          :class="!loggedIn ? 's12 m12 l12' : 's12 l10 m10 body-container'"
          style="margin-top: 10%;"
        >
          <router-view @current-route="title=$event" :key="this.$route.fullPath"></router-view>
        </div>


      </div>

    </div>
  </div>
</template>
<script>

import Header from "./modules/Header";
import Sidevar from "./modules/Sidevar";
export default {
  components: { Header, Sidevar},
  data() {
    return {
      title:''
    }
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    titleRoute(){
      return this.title
    }
  },

};
</script>
<style scoped>
.body-vue {
  padding-top: 34px !important;
  padding-right: 60px !important;
  padding-bottom: 20px !important;
  padding-left: 24px;
}
.fondo-container {
    position: fixed;
    overflow: hidden;
    height: 203px;
    width: 101%;
}

#breadcrumbs-wrapper {
    background: #f3f3f3;
}

.header-search-wrapper {
    width: 100%;
    margin: 0 auto;
    height: 40px;
    display: inline-block;
    position: relative;
}

.breadcrumbs-title {
    font-size: 1.5rem;
    line-height: 1.804rem;
    margin-top: 18px;
}
.container{
  padding: 0 0.5rem;
    margin: 0 auto;
    max-width: 100% !important;
}

.breadcrumbs {
    padding: 0;
margin-top: 15px;
    margin-right: 0px;
    margin-bottom: 15px;
    margin-left: 0px;
    list-style-position: initial;
      list-style-image: initial;
      list-style-type: none;
}
.breadcrumbs>li {
    display: inline-block;
}
.breadcrumbs>li+li:before {
    padding: 0 5px;
    color: #ccc;
    content: "/\00a0";
}

</style>

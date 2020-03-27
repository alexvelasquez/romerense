<template>
  <div class="container">
    <div
      class="z-depth-3 y-depth-3 x-depth-3 grey green-text lighten-4 row"
      style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px; margin-top: 100px; solid #EEE;"
    >
      <div class="section"><i class="mdi-alert-error red-text"></i></div>
      <form action="#" @submit.prevent="login">
      <div class="row">
        <div class="input-field col s12">
          <input
            class="validate"
            type="text"
            name="username"
            id="email"
            required
            v-model="username"
          />
          <label for="email">Usuario</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col m12">
          <input
            class="validate"
            type="password"
            name="password"
            id="password"
            required
            v-model="password"
          />
          <label for="password">Contraseña</label>
        </div>
        <label style="float: right;">
          <a><b style="color: #F5F5F5;">Olvidaste la contraseña?</b></a>
        </label>
      </div>
      <br />
      <center>
        <div class="row">
          <button
            type="submit"
            name="btn_login"
            class="waves-effect red darken-2 btn"
          >
            Iniciar Sesión
          </button>
        </div>
      </center>
      </form>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods: {
    login(){
      this.$store.dispatch('retriveToken',{
        username:this.username,
        password:this.password
      })
      .then((response)=>{
        this.$axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
        this.$router.push('/')
      })
    }
  },
};
</script>

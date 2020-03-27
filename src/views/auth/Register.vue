<template>
  <div class="container">
    <div
      class="z-depth-3 y-depth-3 x-depth-3 grey green-text lighten-4 row"
      style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px; margin-top: 50px; solid #EEE;"
    >
      <div class="section"></div>
      <div class="section"><i class="mdi-alert-error red-text"></i></div>

      <div class="row">
        <div class="input-field col s12">
          <input
            class="validate"
            type="text"
            name="username"
            id="username"
            required
          />
          <label for="username">Usuario</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input
            class="validate"
            type="email"
            name="email"
            id="email"
            required
          />
          <label for="email">Email</label>
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
            style="margin-left:25%;"
            type="submit"
            name="btn_login"
            class="col s6 btn btn-small white black-text  waves-effect z-depth-1 y-depth-1"
          >
            Registrar
          </button>
        </div>
      </center>
    </div>
  </div>
</template>
<script>
export default {};
</script>

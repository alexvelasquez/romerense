<template>
  <div>
    <header>
      <nav class="sidenav-trigger">
        <div class="nav-wrapper blue-grey darken-4">
          <router-link to="/">
            <img
              class="logo"
              src="../../assets/img/logo.png"
              alt=""
            />
          </router-link>
          <h5 class="title-logo" style="font-family: 'Passion One', cursive;">ROMERENSE</h5>
          <ul id="nav-mobile" class="right hide-on-med-and-down logout">
            <router-link to="/logout" style="text-decoration:none">Cerrar Sesión</router-link>
          </ul>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger logo-menu"><i class="material-icons">menu</i></a>
          <ul class="sidenav" id="mobile-demo">
            <li>
            <div class="user-view">
              <div class="background red lighten-1"></div>
              <a href="#user"
                ><img
                  class="circle"
                  src="../../assets/img/perfil.png"
                  style="margin-left: 34%;"
              /></a>
              <a href="#name"><span class="white-text name">John Doe</span></a>
            </div>
          </li>
          <li><router-link to="/players">Listado de jugadores</router-link></li>
          <li><router-link to="/player/new">Agregar jugador</router-link></li>
        </ul>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
export default {
};
</script>
<style scope>
.sidenav {
  width: 249px !important;
}

.sidenav li > a:hover {
  background-color: #ef5350 !important;
  color: #fff !important;
}
</style>

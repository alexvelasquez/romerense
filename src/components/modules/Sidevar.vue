<template>
  <div>
      
    <!-- LEFT SIDEBAR	 -->
    <ul
      id="sidenav-1"
      class="sidenav sidenav-fixed grey darken-2"
      style="margin-top: 64px; position: absolute !important;"
    >
      <li>
        <div class="user-view">
          <div class="background red lighten-1"></div>
          <a href="#user"
            ><img
              class="circle"
              src="../../assets/img/perfil.png"
              style="margin-left: 34%;"
          /></a>
          <a class="white-text name" @click="editProfile()" style="cursor: pointer;">John Doe</a>
        </div>
      </li>
      <li><a class="subheader" style="color:#fff">Perfil: Administrador</a></li>
      <li><div class="divider"></div></li>
      <li>
        <a
          class="waves-effect dropdown-trigger"
          data-target="dropdown1"
          style="font-size: 15px;color: #fff; text-decoration:none"
          ><i class="material-icons md-18" style="margin-right: -44px;"
            >supervisor_account</i
          >Jugadores</a
        >
      </li>
      <li>
          <router-link to="/cuotas" style="font-size: 15px;color: #fff;text-decoration:none">
            <i class="material-icons md-18" style="margin-right: -44px;"
                  >date_range
            </i>Cuotas
        </router-link>
      </li>
    </ul>
    <ul id="dropdown1" class="dropdown-content">
      <li><router-link :to="{name:'Players'}"  style="text-decoration:none">Listado de jugadores</router-link></li>
      <li><router-link :to="{name:'NewPlayer'}" style="text-decoration:none">Agregar jugador</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
}
</script>

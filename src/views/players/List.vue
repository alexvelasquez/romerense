<template>
<div>
        <div class="row">
          <div class="col s12 m4 l4 offset-l8">
                  <md-field>
                <label for="category">Categoria</label>
                <md-select v-model="category" name="category" id="category">
                  <md-option v-for="item in categories" v-bind:key="item.category_id" v-model="item.description">{{item.description}}</md-option>
                </md-select>
              </md-field>
          </div>
        </div>
        <div class="row">
                <div class="input-field col s12 l12 m12 " style="margin-button:3%">
                        <input id="names" type="text" v-model="search" @input="searchOnTable" class="validate" />
                        <label for="names" class="">Buscar</label>
                        
                        <i class="material-icons prefix">search</i>
                </div>
                <div class="col s12 m12 l12">
                  <table class="table ">
                  <thead>
                    <tr>
                        <th class="center" data-field="id">Nombre y Apellido</th>
                        <th class="center" data-field="price">Fecha de Nacimiento</th>
                        <th class="center" data-field="total">Telefono</th>
                        <th class="right" data-field="status">Acciones</th>
                    </tr>
                  </thead>
                    <tbody>
                    <tr v-for="(player) in searched" :key="player.player_id" >
                      <td class="center only-response">{{player.last_name}}  {{player.name}} </td>
                      <td class="center only-response">{{player.birth_date | date}}</td>
                      <td class="center only-response">{{player.phone}}</td>
                      <td class="right only-response">
                        <ul class="actions-players">
                          <li class="btn-floating red lighten-1"><router-link :to="{name:'EditPlayer',params:{id:player.player_id}}"><i class="material-icons">edit</i></router-link></li>
                          <li class="btn-floating red lighten-1"><router-link to="/"><i class="material-icons">delete</i></router-link></li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
              </div>
</template>
<script>
import {searchByName} from '../../main';
export default {


    data: () => ({
                search: null,
                searched: [],
                category:null,
                categories:null,
                players:[],
                
    }),

    mounted() {
          this.$emit('current-route','Listado Jugadores')
          this.$axios.get('api/category')
          .then(response => {
              this.categories = response.data.data;
              if(this.categories.length > 0){
                this.category = this.categories[0].description;
              }
          })
          .catch(error => {
              if(error.response){
                this.$store.dispatch('tokenExpired',error.response)
                .then((response)=>{
                    if(response){
                        this.$router.push('/login')
                        this.$alertify.error('La sesión ha expirado');
                    }
                    else{
                      this.$alertify.error('Ha ocurrido un error, al recuperar los datos');
                    }
                })
              }
              else{
                this.$alertify.error('Ha ocurrido un error');
              }
        
          })
    },
    methods: {
      searchOnTable () {
        this.searched = searchByName(this.players, this.search)
      }
    },
    watch: {
      category(){
        this.$axios.get('api/players/category/'+this.category)
          .then(response => {
              this.players = response.data.data;
              this.searched = this.players;
          })
           .catch(error => {
              this.$store.dispatch('tokenExpired',error.response)
              .then((response)=>{
                  if(response){
                    this.$router.push('/login')
                    this.$alertify.error('La sesión ha expirado');
                  }
              })
           })
      }
    },

}
</script>
<style>


th{
  font-size: 19px;
}
table{
  font-family: 'Roboto', sans-serif;
}
.actions-players li a i{
  padding-left: 9px;
}

@media only screen and (min-width: 601px) {

  .only-response {
        padding-top: 30px !important;
  }

}


</style>
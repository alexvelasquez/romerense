<template>
<div>
<div class="row">
  <div class="input-field col s12 m6 l6" style="width: 43%;">
          <input id="names" type="text" v-model="search" @input="searchOnTable" class="validate" />
          <label for="names" class="">Buscar</label>
          
          <i class="material-icons prefix">search</i>
  </div>
    <div class="col s12 m6 l6 right">
        <md-field>
        <label for="category">Categoria</label>
        <md-select v-model="category" name="category" id="category">
          <md-option v-for="item in categories" v-bind:key="item.category_id" v-model="item.description">{{item.description}}</md-option>
        </md-select>
      </md-field>
  </div>
</div>
<div class="row">
    <md-tabs class="red lighten-1" md-alignment="centered">
      <md-tab  id="tab-pages" md-label="Pagaron" md-active-tab @click="players('pagados')" :class="tipo == 'pagados' ? 'zoom' : ''"></md-tab>
      <md-tab  id="tab-posts" md-label="Adeudan" @click="players('adeudados')" :class="tipo == 'adeudados' ? 'zoom' : ''"></md-tab>
    </md-tabs>
    <div class="row">
      <div class="col s12 m12 l12">
        <table class="table ">
        <thead>
          <tr>
              <th  class="center" data-field="id">Nombre y Apellido</th>
              <th v-if="tipo=='pagados'" class="center" data-field="price">Estado</th>
              <th v-if="tipo=='adeudados'" class="center" data-field="price">Dni</th>

              <th v-if="tipo=='pagados'" class="center" data-field="total">Valor</th>
              <th v-if="tipo=='adeudados'" class="center" data-field="price">Telefono</th>
              <th class="right" data-field="status">Acciones</th>
          </tr>
        </thead>
          <tbody>
          <tr v-for="(value) in searched" :key="value.player_id" >
            <td v-if="tipo=='pagados'" class="center only-response">{{value.player.last_name}}  {{value.player.name}} </td>
            <td v-if="tipo=='adeudados'" class="center only-response">{{value.last_name}}  {{value.name}} </td>

            <td v-if="tipo=='pagados'" class="center only-response"><div><md-chip>{{value.state.description}}</md-chip></div></td>
             <td v-if="tipo=='adeudados'" class="center only-response">{{value.dni}}</td>

             
            <td v-if="tipo=='pagados'" class="center only-response">{{value.value}}</td>
            <td v-if="tipo=='adeudados'" class="center only-response">{{value.phone}}</td>
            <td class="right only-response">
              <ul class="actions-players">
                <li v-if="tipo=='pagados'" class="btn-floating red lighten-1"><router-link to="/"><i class="material-icons" style="margin-left:8px">delete</i></router-link></li>
                 <li v-if="tipo=='adeudados'" class="btn-floating red lighten-1"><router-link to="/"><i class="material-icons" style="margin-left:8px">attach_money</i></router-link></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
</div> 
</div>
</template>
<script>
import {searchByName} from '../../main'
export default {
  data() {
    return {
      search: null,
      searched: [],
      playersCuotas:[],
      categories:[],
      category:null,
      cuotaId:null,
      tipo:'',
    }
  },
    mounted() {
        this.cuotaId = this.$route.params.id;
        //load all categories 
        this.$axios.get('api/category')
        .then(response => {
            this.categories = response.data.data;
            this.tipo='pagados';
            this.category = this.categories[0].description;
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
        this.$emit('current-route','Detalle Cuota')
    },
    methods:{
        searchOnTable () {
        this.searched = searchByName(this.playersCuotas, this.search)
        },
        players(tipo){
          this.tipo=tipo
          let route = this.tipo == 'pagados' ? 'api/payments/cuota/' : 'api/payments/not/cuota/';
          this.$axios.get(route+this.cuotaId,{params:{category:this.category}})
            .then(response => {
                this.playersCuotas = response.data;
                this.searched = this.playersCuotas;
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
    watch: {
      category(){
        this.players(this.tipo);
      },

},
}
</script>
<style >
   .md-button{
     color:#fff !important;
   }
    .md-button:focus{
           background: #A93226  !important;
      /** background: transparent !important; */
   }
    .md-active{
           background:#A93226  !important;
           transition: box-shadow .25s !important;
    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;
      /** background: transparent !important; */
   }

   .md-tabs-navigation .md-button{
     width: 200% !important;
     max-width: none !important;
     min-width: none !important;
   }

   .md-chip{
     background-color: #263238 !important;
    color: #fff !important;
    width: 50% !important;
   }
</style>
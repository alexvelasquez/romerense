<template>
<div>
      <div class="row">
      <div class="col s8 m12 l12">
        <div class="row">
          <div class="input-field col s12 l6 m12 ">
            <i class="material-icons prefix">people_alt</i>
            <input id="names" v-model="player.name" type="text" class="validate" />
            <label for="names" class="active">Nombres(*)</label>
            <span class="red-text" v-show="errors.name">{{errors.name}}</span>
          </div>
          <div class="input-field col s12 l6 m12 caca">
            <i class="material-icons prefix">people_alt</i>
            <input id="last_names" v-model="player.last_name" type="text" class="validate" />
            <label for="last_names" class="active">Apellidos(*)</label>
            <span  class="red-text" v-show="errors.lastName"> {{errors.lastName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 l6 m12 ">
            <i class="material-icons prefix">account_circle</i>
            <input id="dni" v-model="player.dni" type="text" pattern="\d*" maxlength="8"/>
            <label for="dni" class="active">Número de documento</label>
          </div>
          <div  class="col s12 l6 m12" style="margin-top: 14px;">
            <md-datepicker id="date" v-model="player.birth_date" :md-model-type="String" class="md-focused">
            <label for="date" :class="'active'">Fecha de Nacimiento</label>
          </md-datepicker>
          </div>
        </div>
        <div class="row"> 
          <div class="col s112 l6 m12">         
            <!-- <input ref="category" id="category" v-model="category"  type="text" class="validate" @input="searchOnTable"/>
            <label for="category" :class="category != '' ? 'active' :''" @click=" view = true">Categoria(*)</label>
            
            <md-list v-show="view" class="col s12 l12 m12 offset-l2" style="margin-left: 23px;padding-left: 15px;background-color: #616161;">
            <md-list-item v-for="item in searched"  @click="selectedItem(item)" v-bind:key="item.category_id">{{item.description}}</md-list-item>
            </md-list> -->
            <ul style="padding-right: 2px;margin-right: 8px;">
              <li class="icon-category" style="float: left;margin-top: 5px; margin-left: 8px; padding-left: 3px;"><i class="material-icons prefix" style="font-size: 29px;margin-right: 18px;">sports_soccer</i></li>
              <li class="category" style="float:left;width: 87%;">
                <md-autocomplete  id="cate" v-model="category" :md-options="categories" class="md-focused">
                  <label class="active" for="cate">Categoria(*)</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term" v-model="category">{{ item.description }}</md-highlight-text>
                  </template>
                  <template slot="md-autocomplete-empty" slot-scope="{ term }">
                    No se encontro {{term}}! <a class="notfound" @click="addCategory(category)" style="cursor: pointer; text-decoration:none; font-size: 19px;font-family: 'Passion One', cursive;"><h6   >Crear una nueva</h6></a>
                  </template>
                </md-autocomplete>
                  <span  class="red-text" v-show="errors.category">{{errors.category}}</span>
              </li>
                
            </ul>
          </div>
          <div class="phone-responsive input-field col s12 l6 m12" >
            <i class="material-icons prefix">phone_local</i>
            <input id="phone" v-model="player.phone" type="text"/>
            <label for="phone" class="active">Telefono</label>
          </div>
        </div>
        <div class="row">
            <button class="btn col s12 m12 l12 red lighten-1" @click="addPlayer()">Agregar
                <i class="material-icons right">how_to_reg</i>
            </button>
        </div>
      </div>
    </div>

</div>


</template>
<script>
export default {
  data: () => ({
    route:'',
    player:{},
    categories:[],
    category:'',
    errors:{name:"",lastName:"",category:""}
        
  }),
  mounted() {

    this.route= this.$route.name
    //load all categories 
    this.$axios.get('api/category')
    .then(response => {
        this.categories = response.data.data;
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

    //if route is edit, search player
    if(this.route == 'EditPlayer'){
        let playerId = this.$route.params.id;
        this.$axios.get('api/players/'+playerId)
        .then(response => {
            this.player = response.data.data;

            //tengo que hacer esta negrada porque el select2 me devuelve lo que se le canta
            this.category = this.player.category.description
            this.player.category = this.category;
             this.$emit('current-route','Editar a '+this.player.name+' '+this.player.last_name)
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
        this.$emit('current-route','Editar a '+this.player.name+' '+this.player.last_name)
    }
    else{
      this.$emit('current-route','Nuevo Jugador')
    }  

  },
  methods: {
    addCategory(){
      this.$axios.post('api/category/add',{description:this.category})
      .then(()=>{
        this.$axios.get('api/category')
        .then(response => {
            this.categories = response.data.data;
        })
        this.$alertify.success('Categoria agregada')

      })
      .catch({
      })
    },
    addPlayer(){
      this.errors={name:"",lastName:"",category:""}
      if(this.validate()){

        //SI LA RUTA ES EL ALTA DEL JUGAOR
        if(this.route == 'NewPlayer'){
            this.$axios.post('api/players/add',this.player)
            .then({
            })
            .catch({
            })
        }
        //SINO ES EL EDITAR
        else{
            this.$axios.put('api/players/'+this.player.player_id,this.player)
            .then({
            })
            .catch({
               
            })
        }
      }
    },
    validate(){
      let ok = true;
      if(this.player.name == null || this.player.name == ''){
          this.errors.name = 'Este campo es requerido'
          ok = false;
      }
      if(this.player.last_name == null || this.player.last_name == ''){
          this.errors.lastName = 'Este campo es requerido'
          ok = false;
      }
      if(this.player.category == null || this.player.category == ''){
          this.errors.category = 'Este campo es requerido'
          ok =false
      }
      return ok
    },

  },
  watch: {
    category(){
      if(this.category.description){
        this.player.category = this.category.description;
        this.category = this.player.category;
      }
      else if(this.category.length == 0 || this.category == null){
        this.player.category = this.category
      }
    }
  }
}
</script>
<style>

.notfound:hover{
  color: #1C2833;
}
</style>

<template>
<div class="">
    <!-- PRIMERA VEZ -->
    <md-empty-state v-show="false"
      md-icon="devices_other"
      md-label="Crea tu primera cuota"
      md-description="Creando una cuota, podras registrar los jugadores que la pagaron.">
      <md-button class="btn btn-large red lighten-1">Crear Cuota</md-button>
    </md-empty-state>

    <!-- DATEPICKER -->
    <div  class="row" style="margin-bottom:10%">

        <div class="col s12 m6 l7" >
          <div class="col s12 m12 l12 right" style="margin-right: -178px;">
  <label for="year" class="active">Año</label>
            <date-picker id="year" v-model="year" type="year"  style="margin-right: -28px;"></date-picker>
          </div>
        </div>
        <div class="col s12 m6 l5">
           <button class="btn right red lighten-1" @click="newCuota()"> Nueva cuota</button>
        </div>
    </div>
        
        <!-- CARDS -->
      <div  id="card-stats">
        <div class="row">
          <div v-for="cuota in cuotas" v-bind:key="cuota.cuota_id" class="col s12 m4 l4">
            <div class="card">
              <div class="card-content  blue-grey darken-4 white-text">
                <p class="card-stats-title">
                <i class="mdi-social-group-add"></i> {{cuota | mounth}}
                </p>
                <h4 class="card-stats-number">${{ cuota | monto}}</h4>
                <p class="card-stats-compare">
                  <i class="mdi-hardware-keyboard-arrow-up"></i>
                  <span class="green-text text-lighten-5"
                    >monto recaudado</span
                  >
                </p>
              </div>
              <div class="card-action  blue-grey darken-2">
                <router-link :to="{name:'CuotasDetail',params:{id:cuota.cuota_id}}" style="cursor: pointer;">
                <div id="clients-bar" class="center-align">
                  <span
                    width="227"
                    height="25"
                    style="display: inline-block; width: 227px; height: 25px; vertical-align: top; color:#fff"
                  >Gestionar</span>
                </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL CUOTA -->
      <modal name="modal-cuota" >
        <div class="modal-content">
          <div class="row grey lighten-1">
        <h5 class="left" style="margin-left:25px; color:#fff"> Nueva cuota</h5>
          </div>

        <div class="row">
          <div class="col s12 m12 l12 center" style="    margin-bottom: 37px;">
            <label for="cuota" class="active">Mes</label>
               <date-picker id="cuota" v-model="month" type="month" lang="es" :format="momentFormat" style="    margin-left: 13px;"></date-picker>
          </div>
          <div class="col s12 m12 l12">
             <a href="#!" class=" btn  red lighten-1 right" style="
    margin-bottom: -13px;
    margin-right: 4px; text-decoration:none" @click="addCuota()">Aceptar</a>           
          </div>
        </div>
        </div>
      </modal>
    </div>
</template>
<script>
//import Modal from '../../components/modules/Modal.vue';
export default {
    data() {
        return {
            year:'',
            month:'',
            cuotas:[],
            momentFormat: {
              // Date to String
              stringify: (date) => {
                return date ? this.$moment(date).format('MMMM').toUpperCase() : ''
              },
              // String to Date
              parse: (value) => {
                return value ? this.$moment(value, 'MMMM').toDate() : null
              }
            }
        }
    },
    mounted() {
        this.year = this.$moment(this.$moment().format('YYYY-MM-DD')).toDate(); //seteo la fecha actual
        this.$emit('current-route','Cuotas')
    },
    methods: {
      newCuota(){
        this.$modal.show("modal-cuota")
      },

      cuotasByYear(){
        this.$axios.get('api/cuotas/year/'+this.$moment(this.year).format('YYYY'))
        .then(response => {
            response.data.data.sort(this.order);
            this.cuotas = response.data.data
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
      addCuota(){
        this.$axios.post('api/cuotas/add',{date:this.$moment(this.month).format('YYYY-MM-DD')})
        .then(()=>{
          this.year = this.month;
          this.$alertify.success('Cuota agregada')
          this.$modal.hide("modal-cuota");
        })
        .catch({
        })
      },
      order( a, b ) {
          if (Array.isArray(a) && (Array.isArray(b))){
            if ( a[0].date < b[0].date ){
              return -1;
            }
          }
          else if(!Array.isArray(a) && (Array.isArray(b))){
            if ( a.date < b[0].date ){
              return -1;
            }
          }
          else if(Array.isArray(a) && (!Array.isArray(b))){
            if ( a[0].date < b.date ){
              return -1;
            }
          }
          else if(!Array.isArray(a) && (!Array.isArray(b))){
            if ( a.date > b.date ){
              return 1;
            }
          }
          return 0;
      }
    },
    watch: {
      year(){
        this.cuotasByYear();
      }
    },
}
</script>
<style >
.mx-input{
    text-align: center !important; 
    font-size:30px !important
}
 .touchable{
  background-color: #263238 !important;
}


.v--modal-box{
  height: auto !important;
}
.mx-input-wrapper input{
      margin-left: -37px !important;
} 

</style>
<template>
  <div class="">
      <div id="card-stats">
        <div class="row">
          <div class="col s12 m12 l6">
            <div class="card">
              <div class="card-content  red lighten-1 white-text">
                <p class="card-stats-title">
                  <i class="mdi-social-group-add"></i> JUGADORES ACTIVOS
                </p>
                <h4 class="card-stats-number">1806</h4>
                <p class="card-stats-compare">
                  <i class="mdi-hardware-keyboard-arrow-up"></i>
                  <span class="green-text text-lighten-5"
                    >jugadores de todas las categorias</span
                  >
                </p>
              </div>
              <div class="card-action  red lighten-1 darken-2">
                <div id="clients-bar" class="center-align">
                  <canvas
                    width="227"
                    height="25"
                    style="display: inline-block; width: 227px; height: 25px; vertical-align: top;"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m12 l6">
            <div class="card">
              <div class="card-content red lighten-1 white-text">
                <p class="card-stats-title">
                  <i class="mdi-editor-insert-drive-file"></i> JUGADORES HABILITADOS
                </p>
                <h4 class="card-stats-number">560</h4>
                <p class="card-stats-compare">
                  <i class="mdi-hardware-keyboard-arrow-down"></i>
                  <span class="deep-purple-text text-lighten-5"
                    >jugadores al dia</span
                  >
                </p>
              </div>
              <div class="card-action  red lighten-1 darken-2">
                <div id="invoice-line" class="center-align">
                  <canvas
                    width="300"
                    height="25"
                    style="display: inline-block; width: 300px; height: 25px; vertical-align: top;"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m12 l6">
            <div class="card">
              <div class="card-content red lighten-1 white-text">
                <p class="card-stats-title">
                  <i class="mdi-action-trending-up"></i> JUGADORES INHABILITADOS
                </p>
                <h4 class="card-stats-number">1300</h4>
                <p class="card-stats-compare">
                  <i class="mdi-hardware-keyboard-arrow-up"></i>
                  <span class="red lighten-1-text text-lighten-5"
                    >jugadores con deudas</span
                  >
                </p>
              </div>
              <div class="card-action red lighten-1 darken-2">
                <div id="profit-tristate" class="center-align">
                  <canvas
                    width="227"
                    height="25"
                    style="display: inline-block; width: 227px; height: 25px; vertical-align: top;"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m12 l6">
            <div class="card">
              <div class="card-content red lighten-1 white-text">
                <p class="card-stats-title">
                  <i class="mdi-editor-attach-money"></i>MONTO TOTAL COBRADO
                </p>
                <h4 class="card-stats-number">$5300.63</h4>
                <p class="card-stats-compare">
                  <i class="mdi-hardware-keyboard-arrow-up"></i>
                  <span class="red lighten-1 text-lighten-5"
                    >Monto cobrado a la fecha</span
                  >
                </p>
              </div>
              <div class="card-action red lighten-1 darken-2">
                <div id="sales-compositebar" class="center-align">
                  <canvas
                    width="214"
                    height="25"
                    style="display: inline-block; width: 214px; height: 25px; vertical-align: top;"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  mounted() {
     this.$emit('current-route','Inicio')
  },
};
</script>

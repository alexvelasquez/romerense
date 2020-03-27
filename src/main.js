import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import vSelect from "vue-select";
import moment from 'moment'
import VueAlertify from 'vue-alertify';
import VModal from 'vue-js-modal';
import DatePicker from 'vue2-datepicker';

import axios from 'axios'
import 'vue-material/dist/vue-material.min.css'
import 'vue2-datepicker/index.css';
import './assets/css/custom.css'
import "vue-select/dist/vue-select.css";
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.min'
import 'vue2-datepicker/locale/es';


Vue.use(VueMaterial);
Vue.use(VModal)
Vue.use(VueAlertify, {
    notifier: {
        delay: 5,
        position: 'top-right',
        closeButton: false,
    },
});
Vue.use(axios)
Vue.component("v-select", vSelect);
Vue.component("date-picker", DatePicker);

moment.locale('es')
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios;


window.$ = window.jQuery = require('jquery');
Vue.config.productionTip = false

new Vue({ router, store, axios, render: h => h(App) }).$mount('#app')

Vue.filter('date', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
})

Vue.filter('mounth', function(value) {
    if (Array.isArray(value)) {
        return moment(value[0].date).format('MMMM').toUpperCase();
    } else {
        return moment(value.date).format('MMMM').toUpperCase();
    }
})
Vue.filter('monto', function(value) {
    if (!Array.isArray(value)) {
        return value.total
    } else {
        return 0
    }
})

export const toLower = text => {
    return text.toString().toLowerCase()
}

export const searchByName = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.last_name + ' ' + item.name).includes(toLower(term)))
    }
    return items
}
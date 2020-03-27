import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import { api } from '../config'
import User from '../entities/User'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.$cookies.config('7d')
axios.defaults.baseURL = api;
var jwtDecode = require('jwt-decode');


export default new Vuex.Store({
    state: {
        token: Vue.$cookies.isKey('token') ? Vue.$cookies.get('token') : null,
        user: null
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        },
    },
    mutations: {
        retriveToken(state, token) {
            //seteo el token 
            state.token = token;
            //seteo el user logueado
            let decode = jwtDecode(token);
            state.user = new User(decode.username, decode.roles);

        },
        destroyToken(state) {
            state.token = null;
        },


    },
    actions: {
        retriveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('api/login_check', {
                        _username: credentials.username,
                        _password: credentials.password
                    })
                    .then(response => {
                        const token = response.data.token;
                        Vue.$cookies.set('token', token)
                            //seteo los hedears del axios
                        context.commit('retriveToken', token);
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context) {
            if (context.getters.loggedIn) {
                Vue.$cookies.remove('token')
                context.commit('destroyToken');
            }
        },
        tokenExpired(context, error) {
            // if (error.data.code == '401' && error.data.message == "Expired JWT Token") {
            //     Vue.$cookies.remove('token')
            //     context.commit('destroyToken');
            // }

            return new Promise((resolve, reject) => {
                if (error.data.code == '401' && error.data.message == "Expired JWT Token") {
                    Vue.$cookies.remove('token')
                    context.commit('destroyToken');
                    resolve(true)
                } else {
                    reject(false)
                }
            })
        }
    },
    modules: {}
})
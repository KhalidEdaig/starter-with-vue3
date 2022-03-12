const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null }

import authService from '/src/services/api/auth.service'
import router from '/src/router'

export const auth = {
    namespaced: true,
    state: () => ({
        ...initialState,
        error: false,
    }),

    getters: {
        //
    },
    actions: {
        LOGIN({ commit }, payload) {
            return authService
                .login(payload)
                .then((response) => {
                    commit('LOGIN_SUCCESS', response)
                    router.push({ name: 'dashboard' })
                })
                .catch(() => commit('LOGIN_FAILURE'))
        },
        LOGOUT({ commit }) {
            return authService.logout().then(() => {
                commit('LOGOUT')
                router.push('/login')
            })
        },
    },
    mutations: {
        LOGIN_SUCCESS(state, user) {
            state.status = { loggedIn: true }
            state.user = user
            state.error = false
        },
        LOGIN_FAILURE(state) {
            state.status = {}
            state.user = null
            state.error = true
        },
        LOGOUT(state) {
            state.status = {}
            state.user = null
        },
    },
}

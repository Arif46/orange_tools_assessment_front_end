export default {
    setAccessToken ({ commit }, payload) {
        commit('setAccessToken', payload)
    },
    updateAuthUser ({ commit }, payload) {
        commit('updateAuthUser', payload)
    }
}

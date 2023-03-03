export const mutations = {
    setAccessToken (state, payload) {
        state.accessToken = payload
    },
    updateAuthUser (state, payload) {
        state.authUser = Object.assign({}, state.authUser, payload)
    }
}

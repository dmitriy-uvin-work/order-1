export default {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    passwordResetKey: state => state.passwordResetKey
}
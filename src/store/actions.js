import { api } from "../api";

const onTokenError = (err, commit) => {
  commit("auth_error", err);
  localStorage.removeItem("ravyynToken");
  delete api.defaults.headers.common["Authorization"];
  return err;
}

const onTokenSuccess = (response, commit) => {
  console.log({response});
  const { token, expires, userId } = response.data;
  localStorage.setItem("ravyynToken", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  commit("auth_success", token, userId);
  return response;
}

const login = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    commit("auth_request");
    api
      .post("/user/login/email", data)
      .then(res => resolve(onTokenSuccess(res, commit)))
      .catch(err => reject(onTokenError(err, commit)));
  })
}

const socialLogin = ({commit}, { token, userId }) => {
  localStorage.setItem("ravyynToken", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  commit("auth_success", token, userId);
}

const register = ({ commit }, data) => {
  return new Promise((resolve) => {
    commit("auth_request");
    api
      .post("/user/signup/email", data)
      .then(res => resolve(onTokenSuccess(res, commit)))
  })
}

const refreshToken = ({ commit }) => {
  return new Promise((resolve) => {
    commit("auth_request");
    api.get("/token/refresh")
      .then(res => resolve(onTokenSuccess(res, commit)))
  })
}

const logout = ({ commit }) => {
  return new Promise((resolve) => {
    commit("logout");
    localStorage.removeItem("ravyynToken");
    delete api.defaults.headers.common["Authorization"];
    resolve();
  })
}

const forgotPassword = ({ commit }, email) => {
  return new Promise((resolve) => {
    api.post('/user/password/forgot', { email })
      .then(res => {
        commit('passwordResetKey', res.data.key);
        resolve(res);
      })
  })
}

const resetPassword = ({ commit }, data) => {
  return new Promise((resolve) => {
    api.post('/user/password/reset', data)
      .then(res => {
        commit('passwordResetKey', null);
        resolve(res);
      })
  })
}

export default {
  login,
  socialLogin,
  register,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword
};

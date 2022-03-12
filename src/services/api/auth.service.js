import axios from "axios";

export default {
  login(payload) {
    return axios
      .post("auth/login", { email: payload.email, password: payload.password })
      .then((response) => {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      });
  },
  logout() {
    return axios
      .post("auth/logout")
      .then(() => localStorage.removeItem("user"))
      .catch((error) => error);
  },
};

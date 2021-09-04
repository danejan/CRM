import client from "axios";

class AuthService {
  login(loginQuery) {
    return client
      .post(
        process.env.VUE_APP_API_URL +
          process.env.VUE_APP_API_NAME +
          "/user/login",
        loginQuery
      )
      .then((response) => {
        if (response.data.Success) {
          this.addToken(response.data.Payload);
        }
        return response.data;
      });
  }

  logout() {
    this.clearTokens();
  }

  getNewToken() {
    let refreshQuery = {
      grantType: "refresh_token",
      refreshToken: sessionStorage.getItem("user.refreshToken"),
      clientId: "2BissWeb",
      identityNo: "",
      password: "",
    };

    return client.post(
      process.env.VUE_APP_API_URL +
        process.env.VUE_APP_API_NAME +
        "/client/user/login",
      refreshQuery
    );
  }

  addToken(payload) {
    sessionStorage.setItem("user.name", payload.Name);
    sessionStorage.setItem("user.accessToken", payload.AccessToken);
    sessionStorage.setItem("user.refreshToken", payload.RefreshToken);
  }

  getName() {
    return sessionStorage.getItem("user.name");
  }

  getToken() {
    return sessionStorage.getItem("user.accessToken");
  }

  isLoggedIn() {
    return !!(this.getToken() || "");
  }

  clearTokens() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user.accessToken");
    sessionStorage.removeItem("user.refreshToken");
  }
}

export default new AuthService();

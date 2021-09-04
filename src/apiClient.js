import axios from "axios";
import router from "@/router";
import authService from "@/services/AuthService";

export default (apiName = "") => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  };

  let accessToken = sessionStorage.getItem("user.accessToken") || "";

  if (accessToken && accessToken !== "") {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const instance = axios.create({
    baseURL:
      apiName === ""
        ? process.env.VUE_APP_API_URL + process.env.VUE_APP_API_NAME
        : process.env.VUE_APP_API_URL + apiName,
    withCredentials: false,
    headers: headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401) {
        console.log(error, " Error response not 401 error ");
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Logout user if token refresh didn't work or user is disabled
      if (error.config.url === "/admin/user/login" && !error.response.Success) {
        console.log(" Refresh operation error ");
        authService.clearTokens();
        router.push({ name: "Login" });

        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Try request again with new token
      return authService
        .getNewToken()
        .then((response) => {
          if (!response.data.Success) {
            Promise.reject(response);
          }

          authService.addToken(response.data.Payload);

          // New request with new token
          const config = error.config;
          config.headers["Authorization"] = `Bearer ${authService.getToken()}`;

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          Promise.reject(error);
        });
    }
  );
  return instance;
};

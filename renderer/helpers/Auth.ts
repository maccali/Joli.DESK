const Auth = {
  isAuth: () => {
    try {
      var token = localStorage.getItem("token");
      var end_date = localStorage.getItem("end_date");

      if (Date.now() / 1000 > Number(end_date)) {
        Auth.resetToken();
        return false;
      }

      return token;
    } catch (err) {
      Auth.resetToken();
      return false;
    }
  },

  saveToken: (token: string, expires_in: string, user: string) => {
    var end_date = Date.now() / 1000 + Number(expires_in);

    localStorage.setItem("token", token);
    localStorage.setItem("expires_in", expires_in);
    localStorage.setItem("user", user);
    localStorage.setItem("end_date", String(end_date));
  },

  resetToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("user");
    localStorage.removeItem("end_date");
  },

  getToken: () => {
    if (typeof localStorage === "undefined") {
      return false;
    }
    return {
      token: localStorage.getItem("token"),
      expires_in: localStorage.getItem("expires_in"),
      user: localStorage.getItem("user"),
      end_date: localStorage.getItem("end_date"),
    };
  },

  isAllow: (sociedade: string) => {
    const user = localStorage.getItem("user");
    const userJson = JSON.parse(user);
    return userJson.sociedade.includes(sociedade);
  },
};

export default Auth;

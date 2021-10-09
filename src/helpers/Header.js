const auth_key = process.env.VUE_APP_AUTH_KEY;

export default {
  getHeaders(object) {
    let header = { headers: {} };
    let auth = JSON.parse(localStorage.getItem(auth_key));
    if (auth) {
      if (auth.access_token !== "")
        header.headers["Authorization"] = `Bearer ${auth.access_token}`;
    }
    if (object) {
      Object.keys(object).forEach((key) => {
        header.headers[key] = object[key];
      });
    }
    return header;
  },
};

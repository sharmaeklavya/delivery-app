import baseApi from "../apis/baseApi";

export const Auth = {
  getToken: async () => {
    try {
      const res = await baseApi.post("api/auth/refreshtoken", {});
      return await res.data;
    } catch (err) {
      console.log(err.response.data);
    }
  },
};

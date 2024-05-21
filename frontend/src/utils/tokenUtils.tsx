import { jwtDecode } from "jwt-decode";

export const getToken =  () => {
  return sessionStorage.getItem('token');
};

export const setToken =  (token: string) => {
  sessionStorage.setItem('token', token);
}

export const isUserLogged =  () => {
  const token =  getToken();
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }
  return false;
}
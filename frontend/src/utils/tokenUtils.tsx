import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
}

export const isUserLogged = () => {
  const token = getToken();
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }
  return false;
}
export const getToken = () => localStorage.getItem("token");

export const getUser = () =>
  JSON.parse(localStorage.getItem("user"));

export const isAdmin = () => {
  const user = getUser();
  return user?.isAdmin;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
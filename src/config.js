export const BASE_URL = "https://42d4-119-252-201-153.ngrok-free.app/"
export const NEWS_API_KEY = "d3f20145ae554a0aa1fe4d61c3ba0545"
// const user_data = localStorage.getItem('login_user');
// const current_user = JSON.parse(user_data);



export const getCurrentUser = () => {
  const userData = localStorage.getItem('login_user');
  return userData ? JSON.parse(userData) : null;
};
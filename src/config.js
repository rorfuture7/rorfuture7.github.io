export const BASE_URL = "https://42d4-119-252-201-153.ngrok-free.app/"
// const user_data = localStorage.getItem('login_user');
// const current_user = JSON.parse(user_data);



export const getCurrentUser = () => {
  const userData = localStorage.getItem('login_user');
  return userData ? JSON.parse(userData) : null;
};
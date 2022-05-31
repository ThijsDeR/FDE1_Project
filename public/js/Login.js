import UserData from "./UserData.js";
const userData = new UserData();
const urlParams = new URLSearchParams(window.location.search);
userData.setToken(urlParams.get('token'));
window.location.href = '/';

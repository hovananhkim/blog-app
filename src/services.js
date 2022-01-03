import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const API = 'https://api-blog-dev.herokuapp.com';
const API_AUTH = API + '/auth';
const API_BLOGS = API + '/blogs';
export async function loginService(email, password) {
  return await axios.post(API_AUTH + '/login', {
    email: email,
    password: password,
  });
}
export async function getAccessToken() {
  return AsyncStorage.getItem('accessToken');
}

export async function removeAccessToken() {
  await AsyncStorage.removeItem('accessToken');
}

export async function getAuthHeader() {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  return headers;
}

export async function checkLogin() {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function registerService(email, password, name) {
  return axios
    .post(API_AUTH + '/register', {
      email: email,
      password: password,
      name: name,
    })
   
}

export async function getAllBlog() {
  return axios.get(API_BLOGS);
}

export async function getAllMyBlog() {
  const headers = await getAuthHeader();
  return axios.get(API_BLOGS + '/myblog', {headers: headers});
}

export async function createBlog(title, description, image) {
  const headers = await getAuthHeader();
  return axios.post(
    API_BLOGS,
    {title: title, description: description, image: image},
    {headers: headers},
  );
}

export async function editBlog(id, title, description, image) {
  const headers = await getAuthHeader();
  return axios.patch(
    API_BLOGS + `/${id}`,
    {title: title, description: description, image: image},
    {headers: headers},
  );
}

export async function deleteBlog(id) {
  const headers = await getAuthHeader();
  return axios.delete(API_BLOGS + `/${id}`, {headers: headers});
}

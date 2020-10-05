import axios from 'axios';

export const API = axios.create({
  baseURL: `https://ex-registration-laravel.herokuapp.com//api`
})

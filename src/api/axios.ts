import axios from 'axios';
import axiosTauriApiAdapter from 'axios-tauri-api-adapter';

const awClient = axios.create({
  baseURL: 'http://localhost:5600/api',
  timeout: 1000,
  adapter: axiosTauriApiAdapter,
});

export default awClient;

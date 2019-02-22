import Axios from 'axios';

const service = Axios.create({
  // 测试环境
  baseURL: 'https://dappswin.io/api/',
  timeout: 10000
});

export const tripartite = Axios.create({
  // 测试环境
  baseURL: 'https://proxy.eosnode.tools/v1/',
  timeout: 10000
});

export default service;
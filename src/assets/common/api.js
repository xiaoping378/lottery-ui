import service, {tripartite} from './axios';

export const MyBet = (data) => (
  service({
    url: 'tx/page_tx',
    method: 'post',
    data
  }));
export const Lottery = (data) => (
  // 清算服务
  service({
    url: 'game/page_lottery',
    method: 'post',
    data
  }));
export const PrizePool = (data) => (
  // 清算服务
  tripartite({
    url: 'chain/get_currency_balance',
    method: 'post',
    data
  }));

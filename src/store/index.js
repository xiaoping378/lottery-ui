import Vue from 'vue'
import Vuex from 'vuex';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import {Message} from "element-ui";
import {formatDate} from './../assets/common'
import {PrizePool, Lottery} from './../assets/common/api'

ScatterJS.plugins(new ScatterEOS());
const network = {
  blockchain: 'eos',
  protocol: "https",
  host: 'proxy.eosnode.tools',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
};
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    coin: 'eos',
    issue: '1812240805',
    bonus: '185,758',
    highOptions: false,
    size: [],
    plural: [],
    number: [''],
    memo: '',
    BetAmount: '1.0000',
    star: '1',
    isGameInfo: false,
    LotteryRecord: [],
    prizePool: '',
    user: null
  },
  getters: {limit: state => parseInt(state.prizePool * 0.2),},
  mutations: {
    SET_USER: (state, data) => state.user = data,
    SET_PRIZE_POOL: (state, data) => state.prizePool = data,
    SET_SIZE: (state, data) => state.size = data,
    SET_PLURAL: (state, data) => state.plural = data,
    SET_NUMBER(state, {num, item}) {
      if (state.number[item] && state.number[item].indexOf(num) >= 0) {
        let index = state.number[item].indexOf(num);
        let array = (state.number[item]).split('');
        array.splice(index, 1);
        state.number[item] = array.join('')
      } else {
        if (state.number[item]) {
          let array = (state.number[item]).split('');
          array[array.length] = num;
          state.number[item] = array.sort((a, b) => a - b).join('')
        } else {
          state.number[item] = num
        }
      }
    },
    /**
     * @return {boolean}
     */
    SET_NUMBER_ALL(state, item) {
      if (state.number[item]) {
        if (state.number[item].length < 10) {
          state.number[item] = '0123456789';
          return false
        }
        if (state.number[item].length === 10) {
          state.number[item] = '';
          return false
        }
      } else {
        state.number[item] = '0123456789';
      }
    },
    SET_RESET: (state, item) => state.number.splice(item),
    SET_IDENTITY: (state, data) => state.identity = data,
    SET_STAR: (state, data) => state.star = data,
    SET_GAME_INFO: (state, data) => state.isGameInfo = data,
    SET_COIN: (state, data) => state.coin = data,
    SET_ISSUES: (state, data) => state.issue = data,
    SET_BONUS: (state, data) => state.bonus = data,
    SET_HIGHOPTIONS: (state) => {
      if (state.highOptions) {
        state.star = '1'
      } else {
        state.star = '6'
      }
      state.highOptions = !state.highOptions;
    },
    SET_MEMO: (state, data) => state.memo = data,
    SET_BETAMOUNT: (state, data) => state.BetAmount = data,
    SET_LOTTERY_RECORD: (state, data) => state.LotteryRecord = data,
    LOTTERY_RECORD_UNSHIFT(state, data) {
      state.LotteryRecord.unshift(data);
      state.LotteryRecord.splice(12, state.LotteryRecord.length)
    }
  },
  actions: {
    LOGIN({commit, state}) {
      ScatterJS.scatter.connect('My-App').then(connected => {
        if (!connected) return Message({
          showClose: true,
          message: '请下载Scatter插件！'
        });
        const scatter = ScatterJS.scatter;
        const requiredFields = {accounts: [network]};
        if (state.user) return Message({
          type: 'error',
          message: '账户已登陆'
        });
        scatter.getIdentity(requiredFields).then(() => {
          const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
          commit('SET_USER', account.name)
        }).catch(error => {
          console.log(error);
        });
      });
    },
    SUBMIT({commit, state}, data) {
      ScatterJS.scatter.connect('My-App').then(connected => {
        if (!connected) return Message({
          showClose: true,
          message: '请下载Scatter插件！'
        });
        const scatter = ScatterJS.scatter;
        const requiredFields = {accounts: [network]};
        scatter.getIdentity(requiredFields).then(() => {
          const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
          if (!state.user) commit('SET_USER', account.name);
          const eosOptions = {expireInSeconds: 60};
          const eos = scatter.eos(network, Eos, eosOptions);
          const transactionOptions = {authorization: [`${account.name}@${account.authority}`]};
          if (!data) return Message.error('投注不能为空');
          if (!parseFloat(state.BetAmount)) return Message.error('投注金额不能为空');
          if (state.coin === 'eos') {
            eos.transfer(account.name, 'cryptogame12', `${state.BetAmount} ${(state.coin).toLocaleUpperCase()}`, data, transactionOptions).then(trx => {
              Message.success('投注成功');
              console.log(`Transaction ID: ${trx.transaction_id}`);
            }).catch(error => {
              Message.error('投注失败，请稍后重试');
              console.log(error);
            });
          } else {
            eos.contract('cryptogame12', {requiredFields}).then(contract => {
              contract.transfer(account.name, 'cryptogame12', `${state.BetAmount} ${(state.coin).toLocaleUpperCase()}`, data, transactionOptions).then(trx => {
                Message.success('投注成功');
                console.log("2.获取签名后的交易，前端需要将此数据传入后台", trx);
              }).catch(e => {
                Message.error('投注失败，请稍后重试');
                console.log("error", e);
                if (e.toString().includes("overdrawn balance")) {
                  alert("No money, go back to Getting Started and refill")
                }
              })
            });
          }
        }).catch(error => {
          console.log(error);
        });
      });
    },
    LOTTERY_RECORD({commit}) {
      return new Promise((resolve, reject) => {
        Lottery({page_index: 1, page_size: 12}).then(res => {
          if (res.status === 200 && res.data.code === '200') {
            commit('SET_LOTTERY_RECORD', (res.data.data.data).map(x => ({
              time: x.timestamp,
              issue: x.game_mintue,
              result: x.result,
            })));
            resolve();
          }
        }).catch(err => reject(err))
      })
    },
    PRIZE_POOL({commit}, data) {
      return new Promise((resolve, reject) => {
        PrizePool(data).then(res => commit('SET_PRIZE_POOL', parseInt(res.data[0])))
      })
    }
  }
});
export default store;
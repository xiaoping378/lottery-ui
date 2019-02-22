<template>
    <div id="Betting">
        <template v-if="innerWidth">
            <div class="mobileBet">
                <Currency></Currency>
                <Issue></Issue>
                <BetLimit :update="update"></BetLimit>
                <SelectSize :innerWidth="innerWidth" v-if="!highOptions"></SelectSize>
                <SelectNumber :forceUpdate="forceUpdate" :update="update" :innerWidth="innerWidth"></SelectNumber>
                <BetSwitch :innerWidth="innerWidth"></BetSwitch>
            </div>
            <div class="mobileBet">
                <BetOption :update="update" :innerWidth="innerWidth"></BetOption>
                <Submit></Submit>
            </div>
        </template>
        <template v-else>
            <div class="betting-box">
                <div class="bet-top">
                    <div class="currency-box">
                        <Currency></Currency>
                    </div>
                    <Issue></Issue>
                    <Time></Time>
                </div>
                <div class="bet-center">
                    <div class="bet-select">
                        <div class="select-top">
                            <PrizePool></PrizePool>
                            <BetLimit :update="update"></BetLimit>
                            <p class="betShow">{{$t('lang.betCombination')}}</p>
                        </div>
                        <SelectSize v-if="!highOptions"></SelectSize>
                        <SelectNumber :forceUpdate="forceUpdate" :update="update"></SelectNumber>
                    </div>
                    <BetOption :update="update"></BetOption>
                </div>
                <Submit></Submit>
            </div>
        </template>
    </div>
</template>

<script>
  import Currency from './Currency'
  import Time from './Time'
  import PrizePool from './PrizePool'
  import BetLimit from './BetLimit'
  import SelectSize from './SelectSize'
  import SelectNumber from './SelectNumber'
  import BetShow from './BetShow'
  import BetOption from './BetOption'
  import Issue from './Issue'
  import BetSwitch from './BetSwitch'
  import Submit from './Submit'
  import {mapState} from 'vuex'

  export default {
    name: "Betting",
    data: () => ({value3: true, update: true}),
    computed: mapState(['highOptions']),
    components: {
      Currency,
      Time,
      PrizePool,
      BetLimit,
      SelectSize,
      SelectNumber,
      BetShow,
      BetOption,
      Issue,
      BetSwitch,
      Submit,
    },
    methods: {
      forceUpdate() {
        this.update = !this.update;
      }
    },
    props: ['innerWidth']
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    #Betting {
        position: relative;
        z-index: 1;
        height: 256px;

        .betting-box {
            position: absolute;
            top: -90px;
            padding: 90px 50px 0;
            width: 1090px;
            /*height: 390px;*/
            height: auto;
            background: url("./../../../../assets/betBg.png") no-repeat center/100% 100%;

            .bet-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }


            .bet-center {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .select-top {
                width: 677px;
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .betShow {
                    width: 150px;
                    padding: 0;
                    margin: 0;
                    color: #fff;
                    text-align: center;
                    line-height: 46px;
                    font-size: 16px;
                    font-weight: 400;
                }
            }

            .currency-box {
                width: 297px;
            }


        }

        @media (max-width: 800px) {
            height: auto;
            .mobileBet {
                margin-top: rem(20rem);
                background: rgba(31, 39, 71, 1);
                padding: rem(40rem) rem(30rem);
            }
        }
    }
</style>
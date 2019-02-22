<template>
    <div id="Main">
        <template v-if="innerWidth">
            <div class="mobile-limit">
                <PrizePool></PrizePool>
                <Time></Time>
            </div>
            <LotteryRecord/>
            <Betting :innerWidth="innerWidth"/>
            <LatestBlock :innerWidth="innerWidth"/>
            <LiveBroadcast :innerWidth="innerWidth"/>
            <MyBet/>
        </template>
        <template v-else>
            <div class="top">
                <LotteryRecord/>
                <LatestBlock/>
            </div>
            <Betting/>
            <div class="bottom">
                <LiveBroadcast/>
                <MyBet/>
            </div>
        </template>
    </div>
</template>

<script>
  import LotteryRecord from './components/LotteryRecord'
  import LatestBlock from './components/LatestBlock'
  import Betting from './components/Betting/index'
  import LiveBroadcast from './components/LiveBroadcast'
  import MyBet from './components/MyBet'
  import PrizePool from './components/Betting/PrizePool'
  import Time from './components/Betting/Time'
  import Currency from './components/Betting/Currency'
  import Issue from './components/Betting/Issue'
  import BetLimit from './components/Betting/BetLimit'

  export default {
    name: "Main",
    components: {
      LotteryRecord,
      LatestBlock,
      Betting,
      LiveBroadcast,
      MyBet,
      PrizePool,
      Time,
      Currency,
      Issue,
      BetLimit,
    },
    props: ['innerWidth']
  }
</script>

<style scoped lang="scss">
    @import "./../../assets/scss/variable";

    #Main {
        margin: 35px auto 0;
        padding-bottom: 110px;
        width: 1090px;

        .top {
            padding: 0 46px;
            display: flex;
            justify-content: space-between;
        }

        .bottom {
            padding: 0 46px;
            display: flex;
            justify-content: space-between;
        }

        @media (max-width: 800px) {
            margin: 0;
            padding: 0 0 rem(100rem) 0;
            width: rem(750rem);
            background: rgba(14, 18, 39, 1);
            .mobile-limit {
                padding: 0 rem(45rem);
                width: rem(748rem);
                height: rem(135rem);
                background: rgba(14, 18, 39, 1);
                box-shadow: 0px -1px 2px 0px rgba(77, 87, 131, 1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
</style>
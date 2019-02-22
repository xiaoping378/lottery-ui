<template>
    <div class="PrizePool"><span>{{$t('lang.PrizePool')}}</span> <span>{{prizePool}}</span></div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "PrizePool",
    computed: mapState(['prizePool']),
    mounted() {
      this.$store.dispatch('PRIZE_POOL', {
        "code": "eosio.token",
        "account": "cryptogame12",
        "symbol": "EOS"
      })
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .PrizePool {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        @media (max-width: 800px) {
            flex: none;
            width: rem(450rem);
        }

        span {
            &:last-of-type {
                width: 170px;
                font-size: 35px;
                color: rgba(55, 255, 187, 1);
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                @media (max-width: 800px) {
                    width: rem(380rem);
                }
            }
        }
    }
</style>
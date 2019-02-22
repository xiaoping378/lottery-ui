<template>
    <div id="Currency">
        <p :class="coin==='eos'&&'isActive'" @click="setRadio('eos')">
            <!--<img src="./../../../../assets/eos.png" alt="">-->
            EOS</p>
        <p :class="coin==='cgg'&&'isActive'" @click="setRadio('cgg')">
            <!--<img src="./../../../../assets/eos.png" alt="">-->
            CGG</p>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Currency",
    data: () => ({
      eos: {
        "code": "eosio.token",
        "account": "cryptogame12",
        "symbol": "EOS"
      },
      cgg: {
        "code": "cryptogame12",
        "account": "cryptogame12",
        "symbol": "CGG"
      },
    }),
    computed: mapState(['coin']),
    methods: {
      setRadio(radio) {
        this.$store.commit('SET_COIN', radio);
        this.$store.dispatch('PRIZE_POOL', this[radio])
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    #Currency {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            cursor: pointer;
            margin: 0;
            width: 132px;
            height: 50px;
            font-weight: 500;
            font-size: 22px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            color: #fff;
            background: rgba(17, 22, 45, 1);
            border-radius: 8px;

            &.isActive {
                background: rgba(55, 255, 187, 1);
                color: rgba(17, 22, 45, 1);
            }

            @media (max-width: 800px) {
                width: rem(320rem);
                height: rem(80rem);
                border-radius: rem(8rem);
            }
        }
    }
</style>
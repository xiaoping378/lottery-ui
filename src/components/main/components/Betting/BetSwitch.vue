<template>
    <div class="bet-switch-box">
        <template v-if="!innerWidth">
            {{$t('lang.options')}} <img
                :src="highOptions?require('./../../../../assets/switchTrue.png'):require('./../../../../assets/switchFalse.png')"
                alt="" @click="setOptions">
        </template>
        <template v-else>
            <div class="bet-switch">
                {{$t('lang.options')}} <img
                    :src="highOptions?require('./../../../../assets/switchTrue.png'):require('./../../../../assets/switchFalse.png')"
                    alt="" @click="setOptions">
            </div>
            <Star v-if="innerWidth && highOptions"></Star>
        </template>
    </div>
</template>

<script>
  import Star from './Star'
  import {mapState} from 'vuex'

  export default {
    name: "BetSwitch",
    computed: mapState(['highOptions']),
    components: {Star},
    methods: {
      setOptions() {
        this.$store.commit('SET_HIGHOPTIONS');
      },
    },
    props: ['innerWidth']
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .bet-switch-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 145px;
        height: 23px;
        font-size: 16px;
        font-weight: 400;
        color: #fff;

        img {
            margin-left: 16px;
            width: 55px;
            height: 25px;
        }

        @media (max-width: 800px) {
            width: auto;
            justify-content: space-between;
            .bet-switch{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: rem(28rem);
                width: rem(260rem);
                height: 23px;
                img{
                    margin-left: rem(30rem);
                }
            }
        }
    }

</style>
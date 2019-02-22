<template>
    <div class="star">
        <span>{{$t('lang.star')}}</span>
        <button v-for="x in ['1','2','3','4','5','6']" :key="x" :class="star === x && 'isActive'" @click="clickStar(x)">
            {{x}}
        </button>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Star",
    computed: mapState(['star']),
    methods: {
      clickStar(x) {
        this.$store.commit('SET_STAR', x);
        let data = ['1', '2', '3', '4', '5'];
        for (x; x < data.length; x++) {
          this.$store.commit('SET_RESET', x);
        }
        this.$forceUpdate();
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .star {
        margin-top: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        span {
            margin-right: 22px;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            color: #fff;
        }

        button {
            cursor: pointer;
            margin: 0 4px;
            width: 32px;
            height: 35px;
            background: rgba(17, 22, 45, 1);
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            color: #fff;
        }

        @media (max-width: 800px) {
            margin: 0;
            width: rem(400rem);
            span {
                width: rem(75rem);
                letter-spacing: 0;
                margin-right: rem(10rem);
                font-size: rem(28rem);
            }
            button {
                margin: 0 rem(6rem);
                width: rem(45rem);
                height: rem(55rem);
                border-radius: rem(4rem);
                font-size: rem(22rem);
            }
        }
    }
</style>
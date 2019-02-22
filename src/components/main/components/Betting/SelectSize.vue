<template>
    <div class="select-size">
        <div class="select-button">
            <button :class="size[0] === 'b'?'isActive':''" @click="clickSize('b')">{{$t('lang.size[0]')}}</button>
            <button :class="size[0] === 's'?'isActive':''" @click="clickSize('s')">{{$t('lang.size[1]')}}</button>
            <button :class="plural[0] === 'o'?'isActive':''" @click="clickPlural('o')">{{$t('lang.plural[0]')}}</button>
            <button :class="plural[0] === 'e'?'isActive':''" @click="clickPlural('e')">{{$t('lang.plural[1]')}}</button>
            <button @click="reset">{{$t('lang.reset')}}</button>
        </div>
        <div class="select-show" v-if="!innerWidth">
            <p>{{size[0]==='b'?$t('lang.size[0]'):size[0]==='s'?$t('lang.size[1]'):''}}
                {{plural[0]==='o'?$t('lang.plural[0]'):plural[0]==='e'?$t('lang.plural[1]'):''}}</p>
            <p class="slash"> / </p>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "SelectSize",
    computed: mapState(['size', 'plural']),
    methods: {
      clickSize(x) {
        x === this.size[0] ? this.$store.commit('SET_SIZE', []) : this.$store.commit('SET_SIZE', [x])
      },
      clickPlural(x) {
        x === this.plural[0] ? this.$store.commit('SET_PLURAL', []) : this.$store.commit('SET_PLURAL', [x])
      },
      reset() {
        this.$store.commit('SET_SIZE', []);
        this.$store.commit('SET_PLURAL', []);
      }
    },
    props: ['innerWidth']
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .select-size {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            margin: 0 3px;
            width: 67px;
            height: 50px;
            border: 0;
            line-height: 50px;
            background: rgba(17, 22, 45, 1);
            border-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            &:first-of-type {
                margin-left: 0;
            }

            &:nth-of-type(2) {
                margin-right: 40px;
            }

            &:nth-of-type(4) {
                margin-right: 50px;
            }

            &:last-of-type {
                float: right;
                width: 67px;
                margin-right: 0;
            }
        }

        .select-button {
            width: 472px;
        }

        .select-show {
            width: 150px;
            height: 50px;

            p {
                margin: 0;
                color: #fff;
                text-align: center;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                font-weight: 400;

                &.slash {
                    line-height: 1;
                    color: rgba(21, 240, 243, 1);
                }
            }
        }

        @media (max-width: 800px) {
            margin: rem(35rem) 0 rem(25rem);
            width: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button {
                padding: 0;
                margin: 0 !important;
                width: rem(107rem);
                height: rem(80rem);
                line-height: rem(80rem);
                background: rgba(14, 18, 39, 1);
                border-radius: rem(8rem);

                &:last-of-type {
                    width: rem(171rem);
                    height: rem(80rem);
                    background: rgba(14, 18, 39, 1);
                    border-radius: rem(8rem);
                }

            }
        }
    }
</style>
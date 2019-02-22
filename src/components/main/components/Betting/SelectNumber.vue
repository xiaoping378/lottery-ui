<template>
    <ul class="select-number">
        <li v-for="(x,item) in parseInt(star)" :key="item">
            <div class="select-button">
                <button :class="{isActive:(number[item]&&number[item].indexOf('0') >= 0)}"
                        @click="clickNumber('0',item)">0
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('1') >= 0)}"
                        @click="clickNumber('1',item)">1
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('2') >= 0)}"
                        @click="clickNumber('2',item)">2
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('3') >= 0)}"
                        @click="clickNumber('3',item)">3
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('4') >= 0)}"
                        @click="clickNumber('4',item)">4
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('5') >= 0)}"
                        @click="clickNumber('5',item)">5
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('6') >= 0)}"
                        @click="clickNumber('6',item)">6
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('7') >= 0)}"
                        @click="clickNumber('7',item)">7
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('8') >= 0)}"
                        @click="clickNumber('8',item)">8
                </button>
                <button :class="{isActive:(number[item]&&number[item].indexOf('9') >= 0)}"
                        @click="clickNumber('9',item)">9
                </button>
                <button @click="clickAll(item)">{{$t('lang.all')}}</button>
                <button @click="reset(item)">{{$t('lang.reset')}}</button>
                <span v-if="!innerWidth && highOptions">{{starArray[starArray.length-parseInt(star)+x-1]}}</span>
            </div>
            <div class="select-show" v-if="!innerWidth">
                <p>[ {{number[item]}} ]</p>
                <p v-if="parseInt(star) !== x" class="slash"> / </p>
            </div>
        </li>
    </ul>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "SelectNumber",
    data: () => ({
      starArray: ['十万', '万', '千', '百', '十', '个'],
    }),
    computed: mapState(['highOptions', 'star', 'number']),
    methods: {
      clickNumber(num, item) {
        this.$store.commit('SET_NUMBER', {num, item});
        this.forceUpdate();
      },
      clickAll(item) {
        this.$store.commit('SET_NUMBER_ALL', item);
        this.forceUpdate()
      },
      reset(item) {
        this.$store.commit('SET_RESET', item);
        this.forceUpdate()
      }
    },
    props: ['innerWidth', 'forceUpdate', 'update'],
    watch: {
      update() {
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .select-number {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .select-button {
                position: relative;
                padding: 10px 70px 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 540px;

                span {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    width: 50px;
                    text-align: left;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(76, 84, 132, 1);
                }
            }

            .select-show {
                width: 150px;
                height: 50px;

                p {
                    margin: 0;
                    color: #fff;
                    text-align: center;
                    line-height: 50px;
                    font-size: 16px;
                    font-weight: 400;

                    &.slash {
                        line-height: 1;
                        color: rgba(21, 240, 243, 1);
                    }
                }
            }
        }

        button {
            width: 32px;
            height: 40px;
            line-height: 40px;
            border: 0;
            background: rgba(17, 22, 45, 1);
            border-radius: 4px;
            font-size: 18px;
            font-weight: 400;
            color: #fff;

            &:last-of-type {
                width: 64px;
            }
        }

        @media (max-width: 800px) {
            margin: rem(20rem) 0;
            width: auto;
            height: auto;
            justify-content: flex-start;
            flex-wrap: wrap;
            li {
                padding: 0;

                .select-button {
                    width: auto;
                    padding: 0;
                }
            }
            button {
                margin: rem(10rem) 0 rem(10rem) rem(12rem);
                width: rem(45rem);
                height: rem(55rem);
                line-height: rem(55rem);
                background: rgba(14, 18, 39, 1);
                border-radius: rem(4rem);
                font-size: rem(20rem);

                &:first-of-type, &:nth-of-type(9) {
                    margin-left: 0;
                }

                &:last-of-type {
                    width: rem(100rem);
                }
            }
        }
    }
</style>
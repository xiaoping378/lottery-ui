<template>
    <div class="bet-option">
        <BetSwitch v-if="!innerWidth"></BetSwitch>
        <Star v-if="!innerWidth && highOptions"></Star>
        <div class="bet-amount">
            <p class="bet-amount-title">{{$t('lang.betAmount')}}</p>
            <div class="bet-amount-select">
                <img v-if="!innerWidth" src="./../../../../assets/eos.png" alt="">
                <div class="bet-input">
                    <input type="text" v-model="betInput">
                    <button @click="setInput('/')">1/2</button>
                    <button @click="setInput('X')">2X</button>
                    <button @click="setInput('M')">MAX</button>
                </div>
            </div>
            <div class="bet-amount-info">
                <p>{{$t('lang.newBet')}} <span>{{note()}}</span></p>
                <p>{{$t('lang.totalAmount')}} <span>{{betInput*10 * note()/10}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
  import BetSwitch from './BetSwitch'
  import Star from './Star'
  import {mapState, mapGetters} from 'vuex'

  let number;
  export default {
    name: "BetOption",
    data: () => ({
      betInput: 1,
      noteNumber: null,
    }),
    computed: {
      ...mapState(['highOptions', 'star', 'number', 'size', 'plural']),
      ...mapGetters(['limit'])
    },
    components: {BetSwitch, Star},
    methods: {
      setInput(i) {
        switch (i) {
          case '/':
            this.betInput = Math.floor(this.betInput * 0.5 * 10) / 10;
            break;
          case 'X':
            this.betInput = Math.floor(this.betInput * 2 * 10) / 10;
            break;
          case 'M':
            this.betInput = Math.floor(this.limit / this.note() / Math.pow(10, this.star) * 10) / 10;
            break;
          default:
            break
        }
      },
      note() {
        if (!this.highOptions) {
          this.noteNumber = this.number[0].length + this.size.length + this.plural.length;
          return this.number[0].length + this.size.length + this.plural.length
        }
        if (this.highOptions && this.star > 1) {
          let length = 1;
          this.number.forEach(x => {
            if (x) length = length * x.length
          });
          this.noteNumber = length;
          return length;
        } else if (this.number.length && this.number[0]) {
          this.noteNumber = this.number[0].length;
          return this.number[0].length
        } else {
          this.noteNumber = 0;
          return 0
        }
      }
    },
    props: ['innerWidth', 'update'],
    watch: {
      update() {
        this.$forceUpdate()
      },
      betInput: function () {
        if (!/^\d*\.?\d{0,1}$/.test(this.betInput)) {
          number ? this.betInput = number : this.betInput = 0;
        } else {
          if (this.betInput > Math.floor(this.limit / this.note() / Math.pow(10, this.star) * 10) / 10) {
            this.betInput = Math.floor(this.limit / this.note() / Math.pow(10, this.star) * 10) / 10;
          }
          number = this.betInput;
          this.$store.commit('SET_BETAMOUNT', (this.betInput * 10 * this.note() / 10).toFixed(4));
        }
      },
      noteNumber: function () {
        if (this.betInput > Math.floor(this.limit / this.note() / Math.pow(10, this.star) * 10) / 10) {
          this.betInput = Math.floor(this.limit / this.note() / Math.pow(10, this.star) * 10) / 10;
        }
        number = this.betInput;
        this.$store.commit('SET_BETAMOUNT', (this.betInput * 10 * this.note() / 10).toFixed(4));
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .bet-option {
        margin-top: 13px;

        .bet-amount {
            .bet-amount-title {
                margin: 33px 12px 14px 0;
                padding: 0;
                height: 16px;
                line-height: 1;
                text-align: right;
                font-size: 16px;
                font-weight: 400;
                color: #fff;
                @media (max-width: 800px) {
                    margin: 0 0 rem(30rem) 0;
                    text-align: left;
                }
            }

            .bet-amount-select {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 45px;

                img {
                    margin-right: 14px;
                    width: 24px;
                    height: 37px;
                }

                .bet-input {
                    width: 245px;
                    height: 45px;
                    border: 1px solid #fff;
                    border-radius: 6px;
                    overflow: hidden;

                    input {
                        outline: none;
                        width: 100px;
                        height: 100%;
                        border: 0;
                        background: #212747;
                        color: #fff;
                        font-size: 16px;
                        font-weight: 400;
                        text-indent: 22px;
                    }

                    button {
                        padding: 0;
                        width: 38px;
                        height: 36px;
                        text-align: center;
                        border: 0;
                        background: rgba(17, 22, 45, 1);
                        border-radius: 4px;
                        letter-spacing: -1px;
                        font-size: 16px;
                        font-weight: 400;
                        color: #fff;

                        &:last-of-type {
                            width: 40px;
                        }
                    }
                }
            }

            .bet-amount-info {
                margin: 15px 0 0 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 16px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 50px;

                span {
                    color: rgba(55, 255, 187, 1);
                }
            }

            @media (max-width: 800px) {
                .bet-amount-select {
                    width: auto;
                    height: rem(90rem);
                    background: rgba(14, 18, 39, 1);
                    border-radius: 6px;

                    .bet-input {
                        width: auto;
                        height: rem(90rem);
                        border: 0;
                        border-radius: rem(6rem);

                        input {
                            width: rem(400rem);
                            background: transparent;
                        }

                        button {
                            width: rem(65rem);
                            height: rem(55rem);
                            background: rgba(31, 39, 71, 1);
                            border-radius: rem(6rem);

                            &:last-of-type {
                                width: rem(65rem);
                            }
                        }
                    }
                }
                .bet-amount-info {
                    margin: rem(28rem) 0 rem(33rem);
                    font-size: rem(28rem);
                }
            }

        }
    }
</style>
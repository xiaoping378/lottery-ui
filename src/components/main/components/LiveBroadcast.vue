<template>
    <div id="LiveBroadcast">
        <h4><img v-if="!innerWidth" src="./../../../assets/LiveBroadcast.png" alt="">{{$t('lang.LiveBroadcast')}}</h4>
        <ul>
            <li v-for="(x,item) in data" :key="item">
                <template v-if="innerWidth">
                    <p class="live-title">{{x.name}}</p>
                    <p :class="x.type === '+' && 'add'">{{x.type === '+' ? '+':''}}{{x.money}}</p>
                    <p class="live-time">{{x.issue}} {{x.time}}</p>
                </template>
                <template v-else>
                    <p class="live-title">
                        {{x.name}}<span :class="x.type === '+' && 'add'">{{x.type === '+' ? '+':''}}{{x.money}}</span>
                    </p>
                    <p class="live-time">{{x.issue}} {{x.time}}</p>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
  import socket from './../../../socket'
  import {formatDateMonth} from './../../../assets/common'

  export default {
    name: "LiveBroadcast",
    data: () => ({data: []}),
    mounted() {
      socket.addEventListener("message", ev => {
        let message = ev.data.split('\n');
        message.forEach(x => {
          let data = JSON.parse(x)[0];
          switch (data.type) {
            case 101:
              this.data.unshift({
                type: '-',
                issue: parseInt(data.time / 60 / 1000),
                name: data.data.from,
                money: data.data.quantity,
                time: formatDateMonth(data.time),
              });
              this.data.splice(6, this.data.length);
              break;
            case 102:
              this.data.unshift({
                type: '+',
                issue: parseInt(data.time / 60 / 1000),
                name: data.data.to,
                money: data.data.amount,
                time: formatDateMonth(data.time),
              });
              this.data.splice(6, this.data.length);
              break;
            case 111:
              this.data.unshift({
                type: '-',
                issue: parseInt(data.time / 60 / 1000),
                name: data.data.from,
                money: data.data.quantity,
                time: formatDateMonth(data.time),
              });
              this.data.splice(6, this.data.length);
              break;
            case 112:
              this.data.unshift({
                type: '+',
                issue: parseInt(data.time / 60 / 1000),
                name: data.data.to,
                money: data.data.amount,
                time: formatDateMonth(data.time),
              });
              this.data.splice(6, this.data.length);
              break;
            default:
              break
          }
        })
      });
    },
    props: ['innerWidth'],
  }
</script>

<style scoped lang="scss">
    @import "./../../../assets/scss/variable";

    #LiveBroadcast {
        padding: 100px 35px 30px;
        width: 379px;
        background: rgba(14, 18, 39, 1);
        border-radius: 10px;

        h4 {
            margin: 0 0 56px 0;
            display: flex;
            justify-content: start;
            align-items: center;
            height: 30px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            img {
                margin-right: 10px;
                width: 30px;
                height: 30px;
            }
        }

        ul {
            padding: 0;
            margin: 0;
            height: 350px;
            overflow: hidden;
            list-style: none;

            li {
                padding: 5px 0;
                color: #fff;

                p {
                    padding: 0;
                    margin: 0;

                    &.live-title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 18px;
                        height: 34px;

                        span {
                            font-size: 16px;
                            color: #543d77;

                            &.add {
                                color: rgba(43, 191, 74, 1)

                            }
                        }
                    }

                    &.live-time {
                        height: 14px;
                        font-size: 14px;
                        color: rgba(89, 85, 107, 1);
                    }
                }
            }
        }

        @media (max-width: 800px) {
            margin: rem(20rem) 0 0 0;
            padding: 0;
            width: rem(750rem);
            height: auto;
            background: rgba(22, 28, 56, 1);
            h4 {
                margin: 0;
                width: auto;
                height: rem(80rem);
                text-indent: rem(48rem);
                line-height: rem(80rem);
                background: rgba(28, 36, 70, 1);
                font-size: rem(28rem);
                font-weight: 400;
                color: #fff;
            }
            ul {
                height: rem(270rem);
                overflow-y: auto;

                li {
                    padding: 0 rem(38rem) 0 rem(30rem);
                    height: rem(44rem);
                    line-height: rem(44rem);
                    border-bottom: 1px solid lighten(#161C38, 15%);
                    font-size: rem(20rem) !important;
                    font-weight: 400;
                    color: rgba(136, 144, 186, 1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    p {
                        font-size: rem(20rem) !important;
                        height: rem(44rem);
                        line-height: rem(44rem);

                        &:first-of-type {
                            color: rgba(136, 144, 186, 1);
                        }

                        &:nth-of-type(2) {
                            color: rgba(18, 199, 61, 1);
                        }

                        &:last-of-type {
                            color: rgba(101, 106, 135, 1);
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div id="LotteryRecord">
        <h4>{{$t('lang.LotteryRecord')}}</h4>
        <ul>
            <li v-for="(x,item) in LotteryRecord" :key="item"><p>{{x.issue}}</p>
                <p>[<span>{{x.result}}</span>]</p>
                <p>{{formatDateMill(x.time)}}</p></li>
        </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import socket from './../../../socket'
  import {formatDateMill} from './../../../assets/common'

  export default {
    name: "LotteryRecord",
    computed:mapState(['LotteryRecord']),
    mounted() {
      socket.addEventListener("message", ev => {
        let message = ev.data.split('\n');
        message.forEach(x => {
          let data = JSON.parse(x)[0];
          if (data.type === 3) this.$store.commit('LOTTERY_RECORD_UNSHIFT', {
            time: data.time,
            issue: data.data.gameid,
            result: data.data.result,
          });
        })
      });
    },
    methods: {
      formatDateMill(time) {
        return formatDateMill(time)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../assets/scss/variable";

    #LotteryRecord {
        padding: 0 40px 100px;
        width: 378px;
        height: 564px;
        background: rgba(14, 18, 39, 1);
        box-shadow: 0 8px 29px 0 rgba(47, 71, 201, 0.04);
        border-radius: 10px;

        h4 {
            margin: 0;
            height: 63px;
            line-height: 63px;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;

            li {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                color: rgba(255, 255, 255, 1);
                line-height: 35px;

                p {
                    margin: 0;
                    padding: 0;

                    &:nth-of-type(2) {
                        color: rgba(13, 130, 90, 1);

                        span {
                            margin: 0 10px;
                            color: rgba(55, 255, 187, 1);
                        }
                    }
                }

            }
        }

        @media (max-width: 800px) {
            padding: 0;
            width: rem(750rem);
            height: auto;
            background: rgba(22, 28, 56, 1);
            h4 {
                width: rem(750rem);
                height: rem(70rem);
                line-height: rem(74rem);
                text-indent: rem(30rem);
                background: rgba(28, 36, 70, 1);
                font-size: rem(28rem);
                color: #fff;
            }
            ul {
                height: rem(285rem);
                overflow-y: auto;

                li {
                    height: rem(50rem);
                    line-height: rem(50rem);
                    border-bottom: 1px solid lighten(#161C38, 15%);
                    padding: 0 rem(40rem) 0 rem(60rem);
                    font-size: rem(20rem);

                    p {
                        &:first-of-type {
                            color: rgba(136, 144, 186, 1)
                        }

                        &:last-of-type {
                            color: rgba(101, 106, 135, 1)
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="BetLimit">
        <span>{{$t('lang.BetLimit')}}</span>
        <div class="BetLimit-box">
            <span :style="{width:percen}"></span>
            <span>{{BetLimit}} / {{limit}}</span>
        </div>
        <span>{{percen}}</span>
    </div>
</template>

<script>
  import socket from './../../../../socket'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: "BetLimit",
    data: () => ({
      percen: '0%',
      BetLimit: 0,
    }),
    computed: {
      ...mapState(['coin', 'prizePool']),
      ...mapGetters(['limit'])
    },
    mounted() {
      socket.addEventListener("message", ev => {
        let message = ev.data.split('\n');
        message.forEach(x => {
          let data = JSON.parse(x)[0];
          switch (data.type) {
            case 121:
              if (this.coin === 'cgg') this.BetLimit = parseFloat(data.data.total_voted);
              break;
            case 122:
              if (this.coin === 'eos') this.BetLimit = parseFloat(data.data.total_voted);
              break;
            default:
              break
          }
        })
      });
    },
    watch: {
      BetLimit: function () {
        this.percen = `${parseInt(this.BetLimit / parseInt(this.prizePool * 0.2) * 100)}%`
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .BetLimit {
        width: 317px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        span {
            font-size: 16px;
            font-weight: 400;
            color: #fff;

            &:last-of-type {
                display: inline-block;
                width: 50px;
            }
        }

        .BetLimit-box {
            position: relative;
            margin: 0 10px;
            width: 170px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background: rgba(17, 22, 45, 1);
            border-radius: 4px;
            font-size: 16px;
            font-weight: 400;
            color: #fff;
            overflow: hidden;

            span {
                position: absolute;

                &:first-of-type {
                    top: 0;
                    left: 0;
                    width: 60%;
                    height: 100%;
                    background: rgba(87, 96, 139, 1);
                }

                &:last-of-type {
                    width: 50%;
                    left: 40%;
                }
            }
        }

        @media (max-width: 800px) {
            width: auto;
            justify-content: space-between;
            span {
                font-size: rem(28rem);
                line-height: 1;

                &:last-of-type {
                    display: inline-block;
                    width: 50px;
                    color: rgba(86, 90, 108, 1);
                }
            }
            .BetLimit-box {
                margin: 0;
                width: rem(470rem);
                height: rem(30rem);
                line-height: rem(30rem);
                background: rgba(17, 22, 45, 1);
                border-radius: rem(4rem);
                font-size: rem(24rem);
                color: rgba(86, 90, 108, 1);

                span {
                    position: absolute;

                    &:first-of-type {
                        top: 0;
                        left: 0;
                        width: 60%;
                        height: 100%;
                        background: rgba(87, 96, 139, 1);
                    }

                    &:last-of-type {
                        width: 50%;
                        left: 40%;
                    }
                }
            }
        }
    }

</style>
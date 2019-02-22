<template>
    <div id="MyBet">
        <div class="title">
            <h4 @click="clickTitle(true)" :class="titleActive?'isActive':''">{{$t('lang.LotteryRecord')}}</h4>
            <h4 @click="clickTitle(false)" :class="!titleActive?'isActive':''">{{$t('lang.MyBet')}}</h4>
        </div>
        <div v-if="titleActive" class="list-title">
            <p v-for="x in $t('lang.LotteryRecord_Title')" :key="x">{{x}}</p>
        </div>
        <div v-if="!titleActive" class="list-title my-list-title">
            <p v-for="x in $t('lang.MyBet_title')" :key="x">{{x}}</p>
        </div>
        <ul v-if="titleActive" class="list">
            <li v-for="(x,item) in lotteryData" :key="item">
                <p>{{formatDate(x.time)}}</p>
                <p>{{x.issue}}</p>
                <p>{{x.result}}</p>
                <p class="bet"><span :class="x.content[0] === 'b'?'isActive':''">{{$t('lang.size[0]')}}</span> <span
                        :class="x.content[0] === 's'?'isActive':''">{{$t('lang.size[1]')}}</span> |
                    <span :class="x.content[1] === 'o'?'isActive':''">{{$t('lang.plural[0]')}}</span> <span
                            :class="x.content[1] === 'e'?'isActive':''">{{$t('lang.plural[1]')}}</span></p>
            </li>
        </ul>
        <ul v-if="!titleActive" class="list my-list">
            <li v-for="(x,item) in myData" :key="item">
                <a target="_blank" :href="x.url">
                    <p>{{x.id}}</p>
                    <p>{{x.issue}}</p>
                    <p>
                        <nobr>{{x.content.map(x=>{switch (x) {
                            case 'b':
                            return '大';
                            case 's':
                            return '小';
                            case 'o':
                            return '单';
                            case 'e':
                            return '双';
                            default:
                            return x;
                            }
                            }).join(',')}}
                        </nobr>
                    </p>
                    <p>{{x.type}}</p>
                    <p>{{x.money}}</p>
                    <p>{{x.time}}</p>
                </a>
            </li>
        </ul>
        <el-pagination
                small
                v-if="titleActive"
                layout="prev, pager, next"
                :total="lottery_total"
                @current-change="lotteryChange">
        </el-pagination>
        <el-pagination
                small
                v-if="!titleActive"
                layout="prev, pager, next"
                :total="myBet_total"
                @current-change="myBetChange">
        </el-pagination>
    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {formatDate, formatDateYear} from './../../../assets/common'
  import {MyBet, Lottery} from './../../../assets/common/api'
  import socket from './../../../socket'
  import {myBet_URL} from './../../../assets/common/constant'

  export default {
    name: "MyBet",
    data: () => ({
      titleActive: true,
      myData: [],
      myBet_index: 1,
      myBet_total: null,
      lottery_index: 1,
      lottery_total: null,
      lotteryData: [],
    }),
    computed: mapState(['user']),
    mounted() {
      this.lotteryChange(this.lottery_index);
      socket.addEventListener("message", ev => {
        let message = ev.data.split('\n');
        message.forEach(x => {
          let data = JSON.parse(x)[0];
          if (data.type === 3 && this.lottery_index === 1) this.lotteryData.unshift({
            time: parseInt(data.time / 1000),
            issue: data.data.gameid,
            result: data.data.result,
            content: data.data.content.split('|'),
          });
          this.lotteryData.splice(10, this.lotteryData.length)
        })
      });
    },
    methods: {
      formatDate(x) {
        return formatDate(x)
      },
      clickTitle(is) {
        if (!is) {
          if (!this.user) return this.$message.error('请登录后查看');
          MyBet({page_index: this.myBet_index, page_size: 10, name: this.user}).then(res => {
            if (res.status === 200 && res.data.code === '200') {
              this.myBet_total = res.data.data.total_items;
              this.myData = (res.data.data.data).map(x => ({
                id: x.id,
                issue: x.time_mintue,
                content: x.memo.substr(8).split(','),
                type: x.to === 'cryptogame12' ? '投注' : '中奖',
                money: x.amount,
                time: formatDateYear(x.timestamp),
                url: `${myBet_URL}${x.hash}`
              }))
            }
          })
        }
        this.titleActive = is;
      },
      myBetChange(val) {
        MyBet({page_index: val, page_size: 10, name: this.user}).then(res => {
          if (res.status === 200 && res.data.code === '200') {
            this.myData = (res.data.data.data).map(x => ({
              id: x.id,
              issue: x.time_mintue,
              content: x.memo.substr(8).split(','),
              type: x.to === 'cryptogame12' ? '投注' : '中奖',
              money: x.amount,
              time: formatDateYear(x.timestamp),
            }))
          }
        })
      },
      lotteryChange(val) {
        Lottery({page_index: val, page_size: 10}).then(res => {
          if (res.status === 200 && res.data.code === '200') {
            this.lottery_total = res.data.data.total_items;
            this.lotteryData = (res.data.data.data).map(x => ({
              time: x.timestamp,
              issue: x.game_mintue,
              result: x.result,
              content: x.content.split('|'),
            }));
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../assets/scss/variable";

    #MyBet {
        position: relative;
        padding: 93px 0 30px;
        width: 597px;
        background: rgba(14, 18, 39, 1);
        border-radius: 10px;

        .title {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;

            h4 {
                cursor: pointer;
                height: 15px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(255, 255, 255, .3);

                &.isActive {
                    color: rgba(255, 255, 255, 1);
                }
            }
        }

        .list-title {
            padding: 0 35px;
            width: 596px;
            height: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: rgba(38, 53, 85, .3);

            p {
                font-size: 16px;
                font-weight: 400;
                color: #fff;

                &:nth-of-type(1) {
                    width: 92px;
                }

                &:nth-of-type(2) {
                    width: 74px;
                }

                &:nth-of-type(3) {
                    width: 65px;
                }

                &:nth-of-type(4) {
                    width: 94px;
                }
            }

            &.my-list-title {
                padding: 0;
                justify-content: space-between;

                p {
                    text-align: center;

                    &:nth-of-type(1) {
                        width: 85px;
                    }

                    &:nth-of-type(2) {
                        width: 95px;
                    }

                    &:nth-of-type(3) {
                        width: 105px;
                    }

                    &:nth-of-type(4) {
                        width: 45px;
                    }

                    &:nth-of-type(5) {
                        width: 75px;
                    }

                    &:nth-of-type(6) {
                        padding-right: 5px;
                        width: 180px;
                    }
                }
            }
        }

        .list {
            padding: 0;
            list-style: none;
            height: 350px;
            overflow: hidden;

            li {
                &:nth-of-type(odd) {
                    background: rgba(102, 154, 178, 0.05);
                }

                padding: 0 35px;
                height: 35px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;

                p {
                    &:nth-of-type(3) {
                        font-weight: 500;
                        letter-spacing: 2px;
                        color: rgba(55, 255, 187, 1);
                    }

                    span {
                        color: rgba(96, 93, 106, 1);

                        &.isActive {
                            color: rgba(25, 155, 254, 1);
                        }
                    }
                }
            }

            &.my-list {
                li {
                    padding: 0;

                    a {
                        text-decoration: none;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #fff;

                        p {
                            text-align: center;

                            &:nth-of-type(1) {
                                width: 85px;
                            }

                            &:nth-of-type(2) {
                                width: 95px;
                            }

                            &:nth-of-type(3) {
                                width: 105px;
                                letter-spacing: -1px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: normal;
                            }

                            &:nth-of-type(4) {
                                width: 45px;
                            }

                            &:nth-of-type(5) {
                                width: 75px;
                            }

                            &:nth-of-type(6) {
                                padding-right: 5px;
                                width: 180px;
                            }
                        }
                    }
                }
            }
        }

        @media (max-width: 800px) {
            margin-top: rem(20rem);
            padding: 0 0 rem(100rem);
            width: rem(750rem);
            height: auto;
            .title {
                width: auto;
                height: rem(80rem);
                background: rgba(28, 36, 70, 1);
                justify-content: flex-start;

                h4 {
                    outline: none;
                    cursor: pointer;
                    width: rem(206rem);
                    height: rem(80rem);
                    line-height: rem(80rem);
                    text-align: center;
                    font-size: rem(28rem);

                    &.isActive {
                        background: rgba(22, 28, 56, 1);
                        font-weight: 400;
                        color: rgba(55, 255, 187, 1);
                    }

                    color: #fff;
                }
            }
            .list-title {
                width: auto;
                padding: 0 rem(30rem);
                justify-content: space-between;
                background: rgba(22, 28, 56, 1);
                text-align: center;

                p {
                    margin: 0;
                    font-size: rem(20rem);
                    color: rgba(126, 135, 178, 1);

                    &:nth-of-type(1) {
                        width: rem(114rem);
                        text-align: left;
                    }

                    &:nth-of-type(2) {
                        width: rem(93rem);
                    }

                    &:nth-of-type(3) {
                        width: rem(100rem);
                    }

                    &:nth-of-type(4) {
                        width: rem(110rem);
                        text-align: right;
                    }
                }

                &.my-list-title {
                    padding: 0 rem(30rem);
                    justify-content: space-between;

                    p {
                        text-align: center;

                        &:nth-of-type(1) {
                            width: rem(100rem);
                            text-align: left;
                        }

                        &:nth-of-type(2) {
                            width: rem(100rem);
                        }

                        &:nth-of-type(3) {
                            width: rem(100rem);
                        }

                        &:nth-of-type(4) {
                            width: rem(50rem);
                            text-align: right;
                        }

                        &:nth-of-type(5) {
                            width: rem(53rem);
                            text-align: center;
                        }

                        &:nth-of-type(6) {
                            width: rem(210rem)
                        }
                    }
                }
            }
            .list {
                margin: 0;
                height: rem(268rem);
                overflow-y: auto;

                li {
                    padding: 0 rem(30rem);
                    height: rem(44rem);
                    background: rgba(22, 28, 56, 1) !important;
                    border-bottom: 1px solid lighten(#161C38, 15%);

                    p {
                        margin: 0;
                        font-size: rem(20rem);
                        color: rgba(136, 144, 186, 1) !important;
                    }
                }

                &.my-list {
                    li {
                        a {
                            padding: 0 rem(30rem);
                            width: rem(750rem);

                            p {
                                text-align: center;

                                &:nth-of-type(1) {
                                    width: rem(100rem);
                                }

                                &:nth-of-type(2) {
                                    width: rem(100rem);
                                }

                                &:nth-of-type(3) {
                                    width: rem(100rem);
                                }

                                &:nth-of-type(4) {
                                    width: rem(50rem);
                                    text-align: right;
                                }

                                &:nth-of-type(5) {
                                    width: rem(53rem);
                                    text-align: center;
                                }

                                &:nth-of-type(6) {
                                    letter-spacing: -1.5px;
                                    width: rem(210rem);
                                    text-align: right;
                                }

                            }
                        }
                    }
                }
            }
        }
    }
</style>
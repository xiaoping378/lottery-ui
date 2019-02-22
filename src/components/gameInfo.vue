<template>
    <div class="gameInfo-box">
        <div class="gameInfo">
            <h2>{{$t('lang.info.title[0]')}}</h2>
            <p>{{$t('lang.info.content[0]')}}</p>
            <h2>{{$t('lang.info.title[1]')}}</h2>
            <ul>
                <li>{{$t('lang.info.content[1]')}}</li>
                <li>{{$t('lang.info.content[2]')}}</li>
                <li>{{$t('lang.info.content[3]')}}</li>
                <li>{{$t('lang.info.content[4]')}}</li>
                <li>{{$t('lang.info.content[5]')}}</li>
                <li>{{$t('lang.info.content[6]')}}</li>
                <li>{{$t('lang.info.content[7]')}}</li>
                <li>{{$t('lang.info.content[8]')}}</li>
                <li>{{$t('lang.info.content[9]')}}</li>
            </ul>
            <h2>{{$t('lang.info.title[2]')}}</h2>
            <h4>{{$t('lang.info.subtitle[0]')}}</h4>
            <ul>
                <li>{{$t('lang.info.content[10]')}}</li>
                <li>{{$t('lang.info.content[11]')}}</li>
                <li>{{$t('lang.info.content[12]')}}</li>
            </ul>
            <h4>{{$t('lang.info.subtitle[1]')}}</h4>
            <ul>
                <li>{{$t('lang.info.content[13]')}}</li>
                <li>{{$t('lang.info.content[14]')}}</li>
                <li>{{$t('lang.info.content[15]')}}</li>
            </ul>
            <h4>{{$t('lang.info.subtitle[2]')}}</h4>
            <ul>
                <li>{{$t('lang.info.content[16]')}}</li>
                <li>{{$t('lang.info.content[17]')}}</li>
                <li>{{$t('lang.info.content[18]')}}</li>
            </ul>
            <h4>{{$t('lang.info.subtitle[3]')}}</h4>
            <ul>
                <li>{{$t('lang.info.content[19]')}}</li>
                <li>{{$t('lang.info.content[20]')}}</li>
            </ul>
            <h2>{{$t('lang.info.title[3]')}}</h2>
            <div class="table">
                <ul>
                    <li>{{$t('lang.info.content[21]')}}</li>
                    <li>{{$t('lang.info.content[22]')}}</li>
                    <li>{{$t('lang.info.content[23]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[24]')}}</li>
                    <li>{{$t('lang.info.content[25]')}}</li>
                    <li>{{$t('lang.info.content[26]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[27]')}}</li>
                    <li>{{$t('lang.info.content[28]')}}</li>
                    <li>{{$t('lang.info.content[29]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[30]')}}</li>
                    <li>{{$t('lang.info.content[31]')}}</li>
                    <li>{{$t('lang.info.content[32]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[33]')}}</li>
                    <li>{{$t('lang.info.content[34]')}}</li>
                    <li>{{$t('lang.info.content[35]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[36]')}}</li>
                    <li>{{$t('lang.info.content[37]')}}</li>
                    <li>{{$t('lang.info.content[38]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[39]')}}</li>
                    <li>{{$t('lang.info.content[40]')}}</li>
                    <li>{{$t('lang.info.content[41]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[42]')}}</li>
                    <li>{{$t('lang.info.content[43]')}}</li>
                    <li>{{$t('lang.info.content[44]')}}</li>
                </ul>
                <ul>
                    <li>{{$t('lang.info.content[45]')}}</li>
                    <li>{{$t('lang.info.content[46]')}}</li>
                    <li>{{$t('lang.info.content[47]')}}</li>
                </ul>
            </div>
            <h2>{{$t('lang.info.title[4]')}}</h2>
            <p>{{$t('lang.info.content[48]')}}</p>
            <span class="button" @click="returnFn">{{$t('lang.info.return')}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "gameInfo",
    methods: {
      returnFn() {
        this.$store.commit('SET_GAME_INFO', false)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "./../assets/scss/variable";

    .gameInfo-box {
        margin: 60px auto 0;
        padding-top: 93px;
        width: 850px;
        background: rgba(14, 18, 39, 1);
        border-radius: 10px;

        .gameInfo {
            position: relative;
            padding: 20px 80px 70px;
            border-radius: 0 0 10px 10px;
            background: rgba(228, 229, 236, 1);

            h2 {
                font-size: 22px;
                color: rgba(14, 18, 39, 1);
            }

            p {
                text-indent: 2em;
            }

            .table {
                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    &:nth-of-type(odd) {
                        background: rgba(102, 154, 178, 0.1);
                    }

                    &:first-of-type {
                        background: rgba(26, 32, 63, .3);

                        li:last-of-type {
                            text-indent: 100px;
                        }
                    }

                    li {
                        padding: 15px 0;
                        font-size: 14px;
                        line-height: 1.3em;
                        text-align: center;

                        &:nth-of-type(1) {
                            width: 80px;
                        }

                        &:nth-of-type(2) {
                            width: 100px;
                        }

                        &:nth-of-type(3) {
                            width: 430px;
                            text-align: left;
                        }
                    }
                }
            }

            .button {
                position: absolute;
                right: 94px;
                bottom: -29px;
                cursor: pointer;
                width: 311px;
                height: 70px;
                text-align: center;
                background: url("./../assets/submit.png") no-repeat center/100% 100%;
                font-size: 24px;
                color: rgba(33, 39, 71, 1);
                line-height: 80px;
            }
        }

        @media (max-width: 800px) {
            padding-top: 0;
            width: rem(750rem);
            .gameInfo {
                border-radius: 10px;
                padding: rem(20rem) rem(80rem) rem(70rem);

                h2 {
                    font-size: rem(30rem);
                }

                p {
                    font-size: rem(24rem);
                }

                ul > li {
                    font-size: rem(24rem);
                }

                h4 {
                    font-size: rem(26rem);
                }

                .button {
                    right: rem(30rem);
                    bottom: rem(-40rem);
                    width: rem(311rem);
                    height: rem(90rem);
                    font-size: rem(28rem);
                    line-height: rem(100rem);
                }
            }
        }
    }
</style>
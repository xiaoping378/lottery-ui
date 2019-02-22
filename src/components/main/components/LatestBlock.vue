<template>
    <div id="LatestBlock">
        <h4 v-if="innerWidth">{{$t('lang.LatestBlock')}}</h4>
        <div class="title">
            <h4 v-for="x in $t('lang.LatestBlock_titke')" :key="x">{{x}}</h4>
        </div>
        <ul>
            <li v-for="(x,item) in data" :key="item"><a target="_blank" :href="`https://bloks.io/block/${x.num}`">{{x.num}}
                <p>
                    <i>{{x.id}}<span>{{x.last_id}}</span></i>
                </p>
                <span>{{x.time}}</span></a></li>
        </ul>
    </div>
</template>

<script>
  import socket from './../../../socket'
  import {formatDateMill} from './../../../assets/common'

  export default {
    name: "LatestBlock",
    data: () => ({data: []}),
    mounted() {
      socket.addEventListener("message", ev => {
        let message = ev.data.split('\n');
        message.forEach(x => {
          let data = JSON.parse(x)[0];
          if (data.type === 0) {
            if (data.data.high_light) {
              let last_id = data.data.id.split(''), id = data.data.id.split('');
              this.data.unshift({
                num: data.data.num,
                id: id.splice(0, id.length - 1).join(''),
                time: formatDateMill(data.data.time),
                last_id: last_id[last_id.length - 1]
              });
            } else {
              this.data.unshift({
                num: data.data.num,
                id: data.data.id,
                time: formatDateMill(data.data.time),
                high_light: data.data.high_light
              });
            }
            this.data.splice(12, this.data.length);
          }
        })
      });
    },
    props: ['innerWidth']
  }
</script>

<style scoped lang="scss">
    @import "./../../../assets/scss/variable";

    #LatestBlock {
        padding: 0 35px 95px;
        width: 597px;
        height: 564px;
        background: rgba(14, 18, 39, 1);
        border-radius: 10px;

        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h4 {
                margin: 0;
                width: 76px;
                height: 55px;
                text-align: center;
                line-height: 55px;
                font-size: 16px;
                color: rgba(255, 255, 255, 1);
            }
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li > a {
                display: flex;
                justify-content: space-between;
                line-height: 35px;
                color: rgba(83, 94, 152, 1);
                text-decoration: none;

                p {
                    position: relative;
                    margin: 0;
                    width: 316px;
                    overflow: hidden;

                    &:before {
                        position: absolute;
                        z-index: 1;
                        bottom: 0;
                        left: 0;
                        content: '...';
                        background: rgba(14, 18, 39, 1);
                    }

                    i {
                        position: absolute;
                        top: 0;
                        right: 0;
                        text-align: right;
                        overflow: hidden;
                        font-style: normal;

                        span {
                            color: #37ffbb;
                        }
                    }
                }

                span {
                    color: rgba(64, 70, 103, 1);
                }
            }
        }

        @media (max-width: 800px) {
            padding: 0;
            margin-top: rem(20rem);
            width: rem(750rem);
            height: auto;
            box-shadow: 0px -1px 2px 0px rgba(77, 87, 131, 1);
            background: rgba(28, 36, 70, 1);
            & > h4 {
                margin: 0;
                width: rem(750rem);
                height: rem(80rem);
                line-height: rem(80rem);
                text-indent: rem(45rem);
                background: rgba(28, 36, 70, 1);
                font-size: rem(28rem);
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
            .title {
                padding: 0 rem(38rem) 0 rem(28rem);
                background: rgba(22, 28, 56, 1);

                h4 {
                    font-size: rem(20rem);
                    font-weight: 400;
                    color: rgba(126, 135, 178, 1);

                    &:first-of-type {
                        text-align: left;
                    }

                    &:last-of-type {
                        text-align: right;
                    }
                }
            }

            ul {
                height: rem(265rem);
                overflow-y: auto;

                li > a {
                    padding: 0 rem(38rem) 0 rem(28rem);
                    height: rem(44rem);
                    line-height: rem(44rem);
                    font-size: rem(20rem);
                    color: rgba(136, 144, 186, 1);
                    border-bottom: 1px solid lighten(#161C38, 15%);

                    p {
                        width: rem(395rem);

                        &:before {
                            background: rgba(28, 36, 70, 1);
                        }
                    }
                }
            }
        }
    }
</style>
<!--
<template>
    <div class="bet-show">
        <p>投注组合</p>
        <ul>
            <li v-if="!highOptions">
                <p>{{size[0]==='b'?'大':'小'}} {{plural[0]==='o'?'单':'双'}}</p>
                <p class="slash"> / </p>
            </li>
            <li v-for="(x,item) in parseInt(star)" :key="item">
                <p>[ {{number[item]}} ]</p>
                <p v-if="parseInt(star) !== x" class="slash"> / </p>
            </li>
        </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "BetShow",
    computed: mapState(['highOptions', 'star', 'size', 'plural', 'number']),
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .bet-show {
        margin-top: 3px;
        padding: 0 20px 0 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            padding: 0;
            margin: 0 0 30px;
            color: #fff;
            text-align: center;
            line-height: 46px;
            font-size: 16px;
            font-weight: 400;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                padding-top: 10px;
                height: 60px;

                &:first-of-type > p:first-of-type {
                    letter-spacing: 3px;
                }

                p {
                    margin: 0;
                    height: 30px;
                    letter-spacing: -2px;
                    line-height: 30px;

                    &.slash {
                        line-height: 37px;
                        color: rgba(21, 240, 243, 1);
                    }
                }
            }
        }

        @media (max-width: 800px) {
            margin: rem(40rem) 0 rem(50rem);
            width: auto;
            height: auto;
            flex-direction: row;
            justify-content: flex-start;
            p {
                margin: 0;

                &:last-of-type {
                    margin-left: rem(40rem);
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    span {
                        letter-spacing: rem(5rem);

                        &:nth-of-type(2) {
                            margin: 0 rem(20rem);
                        }
                    }
                }
            }
        }
    }
</style>-->

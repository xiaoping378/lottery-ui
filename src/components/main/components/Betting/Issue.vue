<template>
    <div class="issue">期号 {{issue}}</div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "Issue",
    computed: mapState({
      issue: state => state.LotteryRecord[0] && parseInt(state.LotteryRecord[0].issue) + 1
    })
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .issue {
        margin-left: 300px;
        width: 156px;
        height: 41px;
        line-height: 37px;
        border: 2px solid rgba(55, 255, 187, 1);
        border-radius: 21px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        @media (max-width: 800px) {
            margin: rem(43rem) 0 rem(33rem);
            width: auto;
            height: auto;
            border: 0;
            text-align: left;
            font-size: rem(28rem);
            line-height: 1;
        }

    }
</style>
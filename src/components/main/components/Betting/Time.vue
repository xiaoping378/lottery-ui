<template>
    <div class="time"><i class="el-icon-time"></i>{{time}}</div>
</template>

<script>
  export default {
    name: "Time",
    data: () => ({
      time: 0
    }),
    mounted() {
      setInterval(() => {
        let data = 60 - new Date().getSeconds();
        this.time = `00:${data < 10 ? '0' + data : data}`;
      }, 1e3);
    }
  }
</script>

<style scoped lang="scss">
    @import "./../../../../assets/scss/variable";

    .time {
        width: 150px;
        font-size: 40px;
        font-weight: 100;
        color: rgba(55, 255, 187, 1);
        line-height: 50px;

        i {
            margin-right: 18px;
            font-size: 32px;
            font-weight: bold;
            color: rgba(64, 70, 103, 1);
        }

        @media (max-width: 800px) {
            width: rem(135rem);
            height: rem(40rem);
            line-height: rem(42rem);
            font-size: rem(26rem);
            background: rgba(55, 255, 187, 1);
            border-radius: rem(20rem);
            text-align: center;
            color: rgba(31, 39, 71, 1);
            i {
                margin-right: rem(10rem);
                font-size: rem(22rem);
            }
        }
    }
</style>
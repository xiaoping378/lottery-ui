<template>
    <div id="app">
        <HeaderNav :innerWidth="innerWidth"/>
        <Main v-show="!isGameInfo" :innerWidth="innerWidth"/>
        <gameInfo v-show="isGameInfo"></gameInfo>
    </div>
</template>

<script>
  import Main from './components/main/Main'
  import HeaderNav from "./components/nav/Header-nav.vue";
  import gameInfo from "./components/gameInfo";
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    data: () => ({
      innerWidth: false
    }),
    computed: mapState(['isGameInfo']),
    components: {HeaderNav, Main, gameInfo},
    mounted() {
      this.resize();
      let _this = this;
      window.onresize = () => _this.resize();
      this.$store.dispatch('LOTTERY_RECORD');
    },
    methods: {
      resize() {
        let width = window.innerWidth || document.body.clientWidth;
        if (width <= 800) {
          document.documentElement.style.fontSize = innerWidth / 16 + 'px';
          this.innerWidth = true
        } else {
          document.documentElement.style.fontSize = '16px';
          this.innerWidth = false
        }
      },
    }
  }
</script>

<style lang="scss">
    @import "./assets/scss/variable";

    * {
        box-sizing: border-box;
        outline: none;
    }

    body {
        margin: 0;
    }

    button:hover {
        -webkit-box-shadow: 0 0 8px #37FFBB;
        -moz-box-shadow: 0 0 8px #37FFBB;
        box-shadow: 0 0 8px #37FFBB;
    }

    button.isActive {
        color: #11162D !important;
        background: rgba(55, 255, 187, 1) !important;
    }


    #app {
        min-width: 1090px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding-bottom: 230px;
        min-height: 100vh;
        background: url("./assets/bg.jpg") no-repeat top 100px center/cover;
        @media (max-width: 800px) {
            min-width: rem(750rem);
            width: rem(750rem);
            background: #0E1227;
        }
    }

    .nav-dialog {
        background-color: #303143;

        .el-dialog__title {
            color: #fff;
        }

        p {
            margin: 0;
            color: #fff;
        }
    }

    .el-pagination {
        position: absolute;
        right: 5px;
        bottom: 10px;
        color: #fff;

        button:disabled {
            background-color: transparent;
        }

        .btn-prev, .btn-next {
            background-color: transparent;
        }
    }

    .el-dialog, .el-pager li {
        background-color: transparent;
    }

    .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
        color: #fff;
    }

</style>

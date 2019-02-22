<template>
    <div id="Header-nav">
        <div class="nav-box" v-clickoutside="isMobile">
            <span class="nav-logo">百万鲸鱼</span>
            <div v-if="!innerWidth || mobileNav" class="nav-select">
                <div class="nav-router">
                    <span @click="openInfo">{{$t('lang.nav')}}</span>
                    <!--<span>游戏奖励</span>-->
                    <!--<span>等级</span>-->
                </div>
                <div class="nav-lang">
                    <p v-clickoutside="intSet" @click="isSetLang">
                        <img :src="$t('lang.lang.img')" alt=""/>
                        <span>{{$t('lang.lang.text')}}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </p>
                    <ul v-if="isSet">
                        <li @click="setLang('zh')"><img src="../../assets/CN.png" alt=""/><span>中文</span></li>
                        <li @click="setLang('en')">
                            <img src="../../assets/EN.png" alt=""/><span>English</span>
                        </li>
                    </ul>
                </div>
            </div>
            <span class="nav-login" @click="login">{{user?user:'scatter登录'}}</span>
            <span v-if="innerWidth" class="mobile-nav" @click="isMobileNav"></span>
        </div>
    </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: "Header-nav",
    data: () => ({
      isSet: false,
      mobileNav: false,
    }),
    computed: mapState(['scatter', 'identity', 'network', 'user']),
    methods: {
      isSetLang() {
        this.isSet = !this.isSet
      },
      setLang(lang) {
        this.$i18n.locale = lang;
        this.isSet = !this.isSet;
      },
      intSet() {
        this.isSet = false;
      },
      isMobile() {
        this.mobileNav = false;
      },
      isMobileNav() {
        this.mobileNav = !this.mobileNav
      },
      openInfo() {
        this.mobileNav = !this.mobileNav;
        this.$store.commit('SET_GAME_INFO', true)
      },
      login() {
        this.$store.dispatch('LOGIN')
      }
    },
    directives: {
      clickoutside: {
        // 初始化指令
        bind(el, binding, vnode) {
          function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
              return false
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
              // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
              binding.value()
            }
          }

          // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
          el.__vueClickOutside__ = documentHandler;
          document.addEventListener('click', documentHandler)
        },
        update() {
        },
        unbind(el, binding) {
          // 解除事件监听
          document.removeEventListener('click', el.__vueClickOutside__)
          delete el.__vueClickOutside__
        }
      }
    },
    props: ['innerWidth']
  }
</script>

<style scoped lang="scss">
    @import "./../../assets/scss/variable";

    #Header-nav {
        width: 100vw;
        min-width: 1090px;
        height: 100px;
        background: rgba(27, 34, 63, 1);
        box-shadow: 0 2px 2px 0 rgba(70, 247, 242, 1);

        .nav-box {
            margin: 0 auto;
            padding: 0 46px;
            width: 1090px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .nav-logo {
                margin-right: 35px;
                width: 109px;
                font-size: 26px;
                font-weight: 400;
                color: rgba(29, 255, 247, 1);
            }
        }

        .nav-select {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                cursor: pointer;
                margin: 0 30px;
                width: 282px;
                height: 17px;
                font-size: 18px;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }

            .nav-lang {
                position: relative;
                z-index: 1;
                padding: 0;
                margin: 0;
                width: 100px;
                height: 32px;
                background: rgba(27, 34, 63, 1);

                p {
                    cursor: pointer;
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                }

                img {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                }

                span {
                    margin: 0 0 0 10px;
                    font-size: 14px;
                }

                ul {
                    position: absolute;
                    padding: 30px 0 0;
                    width: 100%;
                    margin: 0;
                    list-style: none;

                    li {
                        cursor: pointer;
                        padding: 5px 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: rgba(27, 34, 63, 1);

                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }
        }

        .nav-login {
            cursor: pointer;
            margin-left: 28px;
            width: 102px;
            height: 30px;
            line-height: 30px;
            background: rgba(14, 18, 39, 1);
            border-radius: 15px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }

        @media (max-width: 800px) {
            min-width: rem(750rem);
            width: rem(750rem);
            height: rem(100rem);
            .nav-box {
                width: rem(750rem);
                position: relative;
                padding: 0 rem(50rem);

                .nav-logo {
                    font-size: rem(28rem);
                }

                .nav-select {
                    position: absolute;
                    top: rem(100rem);
                    left: 0;
                    width: rem(750rem);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: rgba(27, 34, 63, 1);
                    box-shadow: 0 2px 2px 0 rgba(70, 247, 242, 1);

                    .nav-router, .nav-lang {
                        width: 100%;
                        height: rem(80rem);
                        margin: 0 rem(10rem);
                        text-align: center;
                        box-shadow: 0 2px 2px 0 rgba(70, 247, 242, 1);

                        p {
                            margin: 0 auto;
                            width: rem(300rem);
                            height: rem(80rem);
                        }

                        ul {
                            padding: 0;
                            left: 50%;
                            transform: translateX(-50%);
                            width: rem(300rem);
                        }
                    }
                }
            }
            .nav-login {
                margin-left: rem(250rem);
                width: rem(250rem);
                height: rem(50rem);
                line-height: rem(50rem);
                background: rgba(14, 18, 39, 1);
                border-radius: rem(25rem);
                font-size: rem(20rem);
            }
            .mobile-nav {
                cursor: pointer;
                margin-left: rem(40rem);
                position: relative;
                width: rem(30rem);
                height: rem(26rem);
                background: #fff;

                &:after, &:before {
                    position: absolute;
                    content: '';
                    top: rem(4rem);
                    left: 0;
                    width: 100%;
                    height: rem(7rem);
                    background: rgba(27, 34, 63, 1);
                }

                &:after {
                    top: rem(15rem);
                }
            }
        }
    }

</style>
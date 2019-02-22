<template>
    <button class="submit" @click="submit">{{$t('lang.submit')}}</button>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "Submit",
    computed: mapState(['size', 'plural', 'number', 'memo', 'BetAmount', 'star']),
    methods: {
      submit() {
        let data = null;
        if (this.star === '1') {
          let array = [this.size, this.plural].join('').split('').join(',');
          if (array) {
            if (this.number[0]) {
              data = `lottery:${array},[${this.number[0]}]`
            } else {
              data = `lottery:${array}`
            }
          } else {
            if (this.number[0]) {
              data = `lottery:[${this.number[0]}]`
            } else {
              data = null;
            }
          }
        } else {
          let array = [];
          for (let x = 0; x < this.star; x++) {
            if (this.number[x]) {
              array.push(this.number[x])
            } else {
              return this.$message.error('请完善投注信息')
            }
          }
          data = `lottery:${array.map(x => `[${x}]`).join('')}`;
        }
        this.$store.dispatch('SUBMIT', data)
      }
    }
  }
</script>

<style scoped lang="scss">
    .submit {
        cursor: pointer;
        display: block;
        margin: 24px auto 0;
        width: 311px;
        height: 70px;
        line-height: 70px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 14px;
        color: rgba(33, 39, 71, 1);
        border: 0;
        outline: none;
        background: url("./../../../../assets/submit.png") no-repeat center/cover;

        &:hover {
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
        }
    }

    @media (max-width: 800px) {
        .submit {
            margin: 0 0 rem(20rem) 0;
            padding: 0;
            width: 100%;
            height: rem(90rem);
            line-height: rem(90rem);
            background: rgba(55, 255, 187, 1);
            border: 0;
            border-radius: rem(8rem);
            font-size: rem(32rem);
            color: rgba(19, 25, 50, 1);
        }
    }

</style>
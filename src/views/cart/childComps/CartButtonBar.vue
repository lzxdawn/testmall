<template>
  <div class="bottom-menu">
      <div class="check-all">
          <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
          <span>全选</span>
      </div>
      <div class="total-price">
          合计: {{ totalPrice }}
      </div>
      <div class="product">
         <span>去结算({{ checkLength }})</span>
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
    name: "CartButtonBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['checkLength','totalPrice','cartList']),
        isSelectAll() {
            if (this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
        }
    },
    methods: {
        checkClick() {
            if (this.isSelectAll) {
                this.cartList.forEach(item => item.checked = false)
                this.$toast.show('取消全选')
            } else {
                this.cartList.forEach(item => item.checked = true)
                this.$toast.show('已全选')
            }
        }
    }
}
</script>

<style scoped>
    .bottom-menu {
        height: 40px;
        display: flex;
        background-color: #eee;
        line-height: 40px;
    }
    .check-all {
        display: flex;
        width: 80px;
        /* background-color: pink; */
        align-items: center;
    }
    .check-button {
        width: 20px;
        height: 20px;
        /* background-color: red; */
        margin: 0 8px;
        line-height: 20px;
    }
   
    .total-price {
        display: flex;
        flex: 1;
        margin-left: 22px;
        /* background-color: purple; */
    }
    .product {
        width: 90px;
        background-color: red;
        color: #fff;
        text-align: center;

    }
</style>
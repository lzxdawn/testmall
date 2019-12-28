<template>
  <div class="toast" v-show="isShow">
      {{ message }}
  </div>
</template>

<script>
export default {
    name: "Toast",
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message='默认文字', duration=1500) {
            this.message = message
            this.isShow = true

            setTimeout(() => {
                this.message = ''
                this.isShow = false
            },duration)
        }
    }
}
</script>

<style>
    .toast {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 8px 10px;
        z-index: 999;
    }
</style>
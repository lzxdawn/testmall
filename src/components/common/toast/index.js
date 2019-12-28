import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
        //2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()
        //3.将组件对象，手动挂在到某一个元素
    toast.$mount(document.createElement('div'))
        //4.toast.$el就是div 把他加到body里面
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj
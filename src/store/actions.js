import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'


export default {
    addCart(context, payload) {
        // let oldPrice = null
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldPrice = item
        //     }
        // }
        return new Promise((resolve, reject) => {
            let oldPrice = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldPrice) {
                // oldPrice.count += 1
                context.commit(ADD_COUNTER, oldPrice)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                    // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('新增了新商品')
            }
        })
    }
}
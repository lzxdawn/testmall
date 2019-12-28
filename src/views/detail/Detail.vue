<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" ref="scroll"
       :probeType="3" 
       @scroll="listenScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommendList"/>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
      <Toast/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'


import {formatDate, debounce} from 'common/utils'
import {backTopMixin} from '@/common/mixin'

import { mapActions } from 'vuex'

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        BackTop,
        Toast
    },
    mixins: [backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommendList: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0
        }
    },
    created() {
        //1. 获取iid
        this.iid = this.$route.params.iid
        //2. 请求详情数据
        getDetail(this.iid).then(res => {
            // 1.获取顶部的图片轮播数据
            // console.log(res);
            const data = res.result
            // console.log(data)
            this.topImages = data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            // 3.获取店铺信息
            this.shop = new Shop(data.shopInfo)
            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo
            // 5.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            // 5.获取评论的信息
            if (data.rate.list) {
                this.commentInfo = data.rate.list[0]
            }

            // this.$nextTick(() => {
            //     this.themeTopYs = []

            //     this.themeTopYs.push(0)
            //     this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
                
            //     console.log(this.themeTopYs)
            // })

        })
        //3. 请求推荐数据
        getRecommend().then((res, err) => {
            if (err) return
            // console.log(res)
            this.recommendList = res.data.list
        })

        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []

            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log(this.themeTopYs)
        },100)
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()
        },
        titleClick(index) {
            // console.log(index)
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        listenScroll(position) {
            const positionY = -position.y
            // console.log(positionY)
            let length = this.themeTopYs.length
            for(let i = 0; i < length - 1; i++) {
                if (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
                    if (this.currentIndex !== i) {
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
            }
            this.listenShowBackTop(positionY)
        },
        addToCart() {
            // console.log('加入到购物车')
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            // console.log(product)
            // this.$store.dispatch('addCart',product)
            this.addCart(product).then(res => {
                this.$toast.show(res, 2000)            
            })
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px - 58px);
    }
</style>
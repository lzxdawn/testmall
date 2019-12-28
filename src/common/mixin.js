// import { POP, NEW, SELL } from "./const";

export const backTopMixin = {
    data: function() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backTop: function(position) {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        listenShowBackTop(position) {
            // console.log(position)
            this.isShowBackTop = position > 1000
        }
    }
}

// export const tabControlMixin = {
//     data: function() {
//         return {
//             currentType: POP
//         }
//     },
//     methods: {
//         tabClick(index) {
//             switch (index) {
//                 case 0:
//                     this.currentType = POP
//                     break
//                 case 1:
//                     this.currentType = NEW
//                     break
//                 case 2:
//                     this.currentType = SELL
//                     break
//             }
//             // console.log(this.currentType);
//         }
//     }
// }
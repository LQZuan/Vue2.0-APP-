<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
                        <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="food-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="(item, index) in goods" class="food-list food-list-hook" :key="index">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li @click="selectFood(food, $event)" v-for="(food, index) in item.foods" class="food-item border-1px" :key="index">
                                <div class="icon">
                                    <img :src="food.icon" width="57" height="57">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now"><span class="fee">￥</span>{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <!-- 监听到子组件传来的cart-add事件就调用cartAdd方法 -->
                                        <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- vue2中统一用ref来访问dom元素和子组件 -->
            <shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :select-foods="selectFoods"></shopcart>
        </div>
        <food :food="selectedFood" ref="food" v-on:cart-add="cartAdd"></food>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from '../shopcart/shopcart.vue';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';

    const ERR_OK = 0;
    export default {
        props: {
            seller: Object
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            /* 由下面计算得出的高度，实现当滚动右边菜单时，左边联动效果 */
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('/api/goods').then(response => {
                response = response.body;
                if (response.errno === ERR_OK) {
                  this.goods = response.data;
                  this.$nextTick(() => {
                    this._initScroll();
                    this._caculateHeight();
                  });
                };
          });
        },
        methods: {
            /* 点击左边菜单，右边联动效果 */
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                };
                /* vue2中统一用$refs来访问dom元素或者子组件 */
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            /* 调用shopcart中的drop */
            cartAdd(el) {
                this.$nextTick(() => {
                    /* 将目标元素传给子组件shopcart并调用其中drop */
                    this.$refs['shopcart'].drop(el);
                });
            },
            /* 点击商品触发该事件 */
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                };
                /* 将触发的food传给子组件food，并调用子组件中的show方法 */
                this.selectedFood = food;
                this.$refs['food'].show();
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3,
                    click: true
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(pos.y);
                });
            },
            /* 计算所点击的菜单高度，实现联动效果 */
            _caculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                };
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        position: absolute
        top: 174px
        bottom: 46px
        display: flex
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background-color: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    .text
                        border-none()
            .text
                display: table-cell
                font-size: 12px
                width: 56px
                vertical-align: middle
                border-1px(rgba(7, 17, 27, 0.1))
                .icon
                    display: inline-block
                    height: 12px
                    width: 12px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    margin-right: 2px
                    &.discount
                        bg-image('discount_3')
                    &.decrease
                        bg-image('decrease_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
        .food-wrapper
            flex: 1
            .title
                background-color: #f3f5f7
                padding-left: 12px
                border-left: 2px solid #d9dde1
                font-size: 12px
                height: 26px
                line-height: 26px
                color: rgb(147, 153, 159)
            .food-item
                margin: 18px
                padding-bottom: 18px
                display: flex
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        font-size: 14px
                        color: rgb(7, 17, 27)
                        line-height: 14px
                        margin: 2px 0 8px 0
                        height: 14px
                    .desc
                        margin-bottom: 8px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                        line-height: 12px
                    .extra
                        font-size: 10px
                        line-height: 10px
                        color: rgb(147, 153, 159)
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                            .fee
                                font-size: 7px
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>

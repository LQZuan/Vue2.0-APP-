<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="icon-remove_circle_outline inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                /* better-scroll派发的event事件和原生js的event有属性上的区别，其中有一个属性为event._constructed。better-scroll派发的事件中event._constructed为true，原生点击事件中没有这个属性。 */
                /* 所以这样就可以阻止原生点击事件，这样就可以避免切换到电脑端的时候，点击一次触发两次点击事件 */
                if (!event._constructed) {
                    return;
                };
                /* 处理第一次点击：如果为0则置1 */
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                };
                /* vue2中通过$emit和v-on:配合监听事件触发 */
                /* 获取并把添加按钮这个DOM元素以'cart-add'名字传递给父组件good.vue,传给父组件good.vue */
                this.$emit('cart-add', event.target);
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                };
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            transition: all .4s linear
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)
                transition: all 0.4s linear
        .move-enter-active, .move-leave-active
            opacity: 1
            transform: translate3d(0, 0, 0)
            .inner
               transform: rotate(0)
        .move-enter, .move-leave-to
            opacity: 0
            transform: translate3d(24px, 0, 0)
            .inner
                transform: rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .cart-add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
</style>

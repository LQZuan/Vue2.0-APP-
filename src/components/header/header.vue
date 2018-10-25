<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" height="100%" width="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '../star/star';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail () {
                this.detailShow = true;
            },
            hideDetail () {
                this.detailShow = false;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {star}
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position: relative
        color: #fff
        background-color: rgba(7, 17, 27, 0.5)
        overflow: hidden
        .content-wrapper
            position: relative
            padding: 24px 12px 18px 24px
            font-size: 0
            .avatar
                display: inline-block
                vertical-align: top
                img
                    border-radius: 2px
            .content
                display: inline-block
                margin-left: 16px
                padding-top: 2px
                .title
                    margin-bottom: 8px
                    .brand
                        display: inline-block
                        height: 18px
                        width: 30px
                        margin-right: 6px
                        vertical-align: top
                        bg-image('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        font-size: 16px
                        line-height: 18px
                        font-weight: bold
                .description
                    font-size: 12px
                    line-height: 12px
                .support
                    font-size: 10px
                    line-height: 12px
                    margin: 10px 0 2px 0
                    .icon
                        display: inline-block
                        height: 12px
                        width: 12px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        margin-right: 2px
                        vertical-align: top
                        &.discount
                            bg-image('discount_1')
                        &.decrease
                            bg-image('decrease_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
            .support-count
                position: absolute
                right: 12px
                bottom: 18px
                height: 24px
                font-size: 10px
                line-height: 24px
                color: #fff
                background-color: rgba(0, 0, 0, 0.2)
                border-radius: 14px
                text-align: center
                padding: 0 8px
        .bulletin-wrapper
            position: relative
            padding: 0 22px 0 12px
            height: 28px
            line-height: 28px
            white-space: nowrap
            background-color: rgba(7, 17, 27, 0.2)
            font-size: 10px
            overflow: hidden
            text-overflow: ellipsis
            .bulletin-title
                display: inline-block
                height: 12px
                width: 22px
                margin-top: 7px
                bg-image('bulletin')
                background-repeat: no-repeat
                background-size: 22px 12px
                vertical-align: top
            .bulletin-text
                margin: 0 4px
                padding-top: 1px
            .icon-keyboard_arrow_right
                position: absolute
                right: 12px
                top: 8px
        .background
            position: absolute
            left: 0
            top: 0
            height: 100%
            width: 100%
            z-index: -1
            filter: blur(10px)
        .fade-enter-active, .fade-leave-active
            transition: all .5s
            opacity: 1
            background-color: rgba(7, 17, 27, 0.8)
        .fade-enter, .fade-leave-to
            opacity: 0
            background-color: rgba(7, 17, 27, 0)
        .detail
            height: 100%
            width: 100%
            position: fixed
            top: 0
            left: 0
            z-index: 100
            overflow: auto
            background-color: rgba(7, 17, 27, 0.8)
            .detail-wrapper
                min-height: 100%
                width: 100%
                vertical-align: top
                .detail-main
                    margin-top: 64px
                    padding-bottom: 64px
                    .name
                        font-size: 16px
                        line-height: 16px
                        font-weight: 700
                        text-align: center
                    .star-wrapper
                        margin-top: 16px
                        text-align: center
                    .title
                        width: 80%
                        display: flex
                        margin: 28px auto 24px
                        .line
                            position: relative
                            top: -6px
                            flex: 1
                            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
                        .text
                            font-size: 14px
                            font-weight: 700
                            padding: 0 12px
                    .supports
                        width: 80%
                        margin: 0 auto
                        .support-item
                            padding: 0 12px
                            margin-bottom: 12px
                            font-size: 0
                            &:last-child
                                margin-bottom: 0
                            .icon
                                display: inline-block
                                width: 16px
                                height: 16px
                                vertical-align: top
                                margin-right: 6px
                                background-size: 16px 16px
                                background-repeat: no-repeat
                                &.discount
                                    bg-image('discount_2')
                                &.decrease
                                    bg-image('decrease_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                                &.special
                                    bg-image('special_2')
                            .text
                                font-size: 12px
                                line-height: 16px
                    .bulletin
                        width: 80%
                        margin: 0 auto
                        .content
                            font-size: 12px
                            line-height: 24px
                            color: #fff
                            padding: 0 12px
            .detail-close
                width: 32px
                height: 32px
                font-size: 32px
                position: relative
                margin: -64px auto 0
                clear: both
</style>

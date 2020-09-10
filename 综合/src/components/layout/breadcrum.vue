<template>
    <div class="breadcrumb-comp clearfix">
        <span class="b-icon">
            <svg class="icon-svg" aria-hidden="true">
                <use :xlink:href="`#${routericon}`"></use>
            </svg>
        </span>
        <span class="b-title">{{routername}}</span>
    </div>
</template>
<script>
export default {
    name: 'breadcrumb-comp',
    data() {
        return {
            routername: '',
            routericon: ''
        }
    },
    created() {
        this.setRouterTitle()
    },
    methods: {
        setRouterTitle() {
            const { meta: { title, icon }, path } = this.$route
            const pathList = path.split('/')
            if(title) this.routername = title
            if(icon) this.routericon = icon

            // 设置 选中菜单
            this.$store.commit('setActiveMenu', `/${pathList[1]}`)
        }
    },
    watch: {
        '$route': function(n) {
            this.setRouterTitle()
        }
    }
}
</script>
<style lang="scss" scoped>
    .breadcrumb-comp {
        // line-height: 48px;
        padding: 0 15px;
        box-sizing: border-box;
        .b-icon {
            float: left;
            margin-top: 8px;
            width: 32px;
            height: 32px;
            background-color: $basictheme-color;
            border-radius: 50%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .icon-svg {
                width: 1.4em;
                height: 1.4em;
                color: #ffffff;
                vertical-align: middle;
            }
        }
        .b-title {
             float: left;
             height: 100%;
             line-height: 48px;
             margin-left: 10px;
        }
    }
</style>
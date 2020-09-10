<template>
    <el-container class="custom-layout">
        <el-header class="custom-layout-header">
            <HeaderComp />
        </el-header>
        <el-container class="custom-layout-container">
            <el-aside :width="`${asideW}px`">
                <AsideComp />
            </el-aside>
            <el-main class="custom-layout-main">
                <div class="main-breadcrumb">
                    <BreadcrumbComp />
                </div>
                <div class="main-container">
                    <transition name="fade-transform" mode="out-in"> 
                        <router-view></router-view> 
                    </transition>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import AsideComp from './aside'
import HeaderComp from './header'
import BreadcrumbComp from './breadcrum'
export default {
    name: 'layout-comp',
    data() {
        return {
            asideW: 200
        }
    },
    components: { AsideComp, HeaderComp, BreadcrumbComp }
}
</script>
<style lang="scss" scoped>
    .custom-layout {
        height: 100%;
        .custom-layout-header {
            height: 50px !important;
            line-height: 50px;
            padding: 0 35px;
            background-color: $basictheme-color;
            color: #ffffff;
        }
        .custom-layout-container {
            .custom-layout-main {
                background-color: #e8edf4;
                padding: 10px;
                position: relative;
                .main-breadcrumb {
                    height: 48px;
                    border-bottom: 1px solid #eaeaea;
                    background-color: #f9f9f9;
                }
                .main-container {
                    position: relative;
                    background-color: #fff;
                    height: calc(100% - 49px);
                }
            }
        }
    }
</style>
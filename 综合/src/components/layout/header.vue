<template>
    <div class="custom-layout-header-container clearfix">
        <div class="h-title-wrap">
            <span class="logo"></span>
            <span class="title">陕西世纪国瑞综合服务平台</span>
            <span class="sub-title">{{subsystemName}}</span>
        </div>
        <div class="h-user-center" title="个人中心">
            <el-popover placement="bottom-end" width="300" trigger="hover" :visible-arrow="false" popper-class="h-c-popover" @show="popoverShow('hc')" @hide="popoverHide('hc')">
                <div :class="['user-popover', popoverHover.hc?'active':null]" slot="reference">
                    <el-avatar class="user-pic" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span class="user-name">管理员</span>
                    <i class="arrow-icon el-icon-arrow-down"></i>
                </div>
                <div class="h-u-c-content">
                    <div class="user-info clearfix">
                        <el-avatar class="user-pic" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <ul class="user-desc">
                            <li class="user-desc-item">
                                <span class="user-name">管理员</span>
                                <span class="user-zw">采购主管</span>
                            </li>
                            <li class="user-desc-item">财务部/采购主管</li>
                        </ul>
                    </div>
                    <ul class="user-tabs">
                        <li class="user-tabs-item clearfix">
                            <svg class="icon-svg" aria-hidden="true">
                                <use xlink:href="#icon-password"></use>
                            </svg>
                            <span class="text">修改密码</span>
                        </li>
                        <li class="user-tabs-item clearfix" @click="logout">
                            <svg class="icon-svg" aria-hidden="true">
                                <use xlink:href="#icon-logout"></use>
                            </svg>
                            <span class="text">退出</span>
                        </li>
                    </ul>
                </div>
            </el-popover>
        </div>
        <div class="h-tabs-wrap clearfix">
            <el-popover placement="bottom-end" width="320" trigger="hover" :visible-arrow="false" popper-class="h-subsytem-popover" @show="popoverShow('hs')" @hide="popoverHide('hs')">
                <span :class="['tab-item', popoverHover.hs?'active':null]" title="子系统选择" slot="reference" v-if="subsystemlist.length > 1">
                    <svg class="icon-svg" aria-hidden="true">
                        <use xlink:href="#menu-menu-icon"></use>
                    </svg>
                </span>
                <div class="h-s-wrap">
                    <div class="subsystem-item" v-for="item in subsystemlist" :key="item.id">
                        <div class="s-i-content" :style="`background-color:${item.description}`" @click="goSubSystem(item)">
                            <svg class="icon-svg" aria-hidden="true">
                                <use :xlink:href="`#${item.img}`"></use>
                            </svg>
                           <span class="system-title">{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </el-popover>
            <span class="tab-item" title="消息">
                <i class="el-icon-message-solid"></i>
            </span>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import loginApi from '@/api/login-api'
import Session from '@/utils/session-util'
import { symlink } from 'fs'
export default {
    name: 'header-comp',
    data() {
        return {
            popoverHover: {
                hc: false, // 用户中心
                hs: false, // 子系统
            }
        }
    },
    computed: {
        ...mapGetters(['subsystemlist', 'basepath', 'subsystemName'])
    },
    methods: {
        /* 退出登录 */
        logout() {
            this.$confirm('确定要退出系统, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                loginApi.logout().then(res => {
                    // 清除缓存
                    Session.removeAllSession()
                    location.href = '/'
                }).catech(err => {
                    // 清除缓存
                    Session.removeAllSession()
                    location.href = '/'
                })
            }).catch(err => console.log(err));
        },
        /* 跳转子系统 */
        goSubSystem(subsystem) {
            const { url } = subsystem
            if(url === this.basepath) return
            location.href = `/${url}`
        },
        popoverShow(name) {
            this.popoverHover[name] = true
        },
        popoverHide(name) {
            this.popoverHover[name] = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .custom-layout-header {
        .h-title-wrap {
            float: left;
            .title {
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
            }
            .sub-title {
                margin-left: 10px;
                font-weight: bold;
            }
        }
        .h-user-center {
            float: right;
            cursor: pointer;
            transition:  all 0.2s ease-in-out;
            &:hover {
                background-color: #fff;
                color: $basictheme-color;
                .arrow-icon {
                    transform: rotate(180deg);
                }
            }
            .user-popover {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 0 10px;
                .user-name {
                    margin: 0 5px;
                }
                .arrow-icon {
                    font-weight: bolder;
                    transition: transform 0.2s ease-in-out;
                }
            }
            .active {
                background-color: #fff;
                color: $basictheme-color;
                .arrow-icon {
                    transform: rotate(180deg);
                }
            }
        }
        .h-tabs-wrap {
            float: right;
            margin-right: 15px;
            .tab-item {
                float: left;
                font-size: 23px;
                padding: 0 10px;
                transition: all 0.2s ease-in-out;
                cursor: pointer;
                &:hover {
                    background-color: #fff;
                    color: $basictheme-color;
                }
                .icon-svg {
                    width: 1.05em;
                    height: 1.05em;
                }
                &.active {
                    background-color: #fff;
                    color: $basictheme-color;
                }
            }
        }
    }
</style>
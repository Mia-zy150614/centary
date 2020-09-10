<template>
  	<div class="view_img">
  		<div class="view_img_list" v-if="options.images && options.images.length">
  			<div class="images" v-viewer="{movable: true}" v-show="options.smallImgShow" :style="{'height':options.imgHeight}">
		      	<img v-for="src in options.images" :src="src" :key="src" />
		    </div>
            <div class="view_button" @click="show" v-show="options.buttonShow">
               <slot name='btn'>
                    <i class="el-icon-zoom-in btn" @click="show"></i>
                </slot>
                <slot name='btn'>
                    <i class="el-icon-delete btn" @click="deleteImg"></i>
                </slot>
            </div>
  		</div>
  		<div class="view_img_list" v-if="options.image">
  			<div class="images" v-viewer="{movable: true}" v-show="options.smallImgShow" :style="{'height':options.imgHeight}">
		      	<img :src="options.image" />
		    </div>
            <div class="info"></div>
            <div class="view_button"  v-show="options.buttonShow">
                <slot name='btn'>
                    <i class="el-icon-zoom-in btn" @click="show"></i>
                </slot>
                <slot name='btn'>
                    <i class="el-icon-delete btn" @click="deleteImg"></i>
                </slot>
            </div>
  		</div>
	 </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})
export default {
    props: {
        options: {
            type: Object,
            default: () => {
                return {
                    images: [], //多张图片
                    image: '', // 单个图片
                    smallImgShow: true, // 缩略图是否显示
                    buttonShow: true, // 按钮是否显示
                    imgHeight: 'auto'
                }
            }
        }
    },
    methods: {
	    show () {
	        const vuer = this.$el.querySelector('.images').$viewer
	        vuer.show()
	    },
        deleteImg(){
            this.$emit('delImg', '')
        }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
.view_img_list{
    max-width: 150px;
    height: 100px;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    line-height: 1.3;
    flex-direction: column;
    -webkit-transition: all .1s;
    transition: all .1s;
    color: #666;
    margin-right: 1em;
    margin-bottom: 1em;
    box-sizing: border-box;
    &:hover{
        border: 1px dashed #37A2DA;
        border-radius: 3px;
    }
    .images {
        position: relative;
        display: inline-block;
        overflow: hidden;
        img {
            display: inline-block;
            height: 100%;
            margin: 0 auto;
            cursor: pointer;
            border-radius: 3px;
        }
    }
    .view_button{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: space-around;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        background-color: rgba(0,0,0,.3);
        -webkit-transition: all .3s;
        transition: all .3s;
        -webkit-transition-delay: .1s;
        transition-delay: .1s;
         &:hover{
            opacity:0.8;
        }
        .btn{
            color: #fff;
        }
    }
    .info{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        -webkit-transition: all .3s;
        transition: all .3s;
        -webkit-transition-delay: .1s;
        transition-delay: .1s;
    }
}
    
   
</style>
<template>
  	<div class="view_img">
  		<div class="view_img_list" v-if="options.images && options.images.length">
  			<div class="images" v-viewer="{movable: true}" v-show="options.smallImgShow" :style="{'height':options.imgHeight}">
		      	<img v-for="src in options.images" :src="src" :key="src" />
		    </div>
            <div class="view_button" @click="show" v-show="options.buttonShow">
                <slot name='btn'></slot>
            </div>
  		</div>
  		<div class="view_img_list" v-if="options.image">
  			<div class="images" v-viewer="{movable: true}" v-show="options.smallImgShow" :style="{'height':options.imgHeight}">
		      	<img :src="options.image" />
		    </div>
            <div class="view_button" @click="show" v-show="options.buttonShow">
                <slot name='btn'></slot>
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
	    }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
    .images {
        img {
            display: inline-block;
            height: 100%;
            margin: 0 auto;
            cursor: pointer;
        }
    }
</style>
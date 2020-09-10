<template>
    <div class="base64-upload">
        <input type="file" ref="image2Base64-upload" value class="upload-btn" />
        <span @click="upload">
            <slot name="upload-btn"></slot>
        </span>
    </div>
</template>
<script>
export default {
    /* 图片转成Base64 */
    name: "image2Base64",
    data() {
        return {
            fileDom: null
        }
    },
    mounted() {
        const _this = this
        const oFile = this.$refs['image2Base64-upload']; //获取input file节点
        if (oFile) {
            this.fileDom = oFile
            oFile.addEventListener("change", function () {
                const file = this.files[0];
                if (file.type.indexOf("image") == 0) {
                    const reader = new FileReader(); //创建FileReader对象实例reader
                    reader.readAsDataURL(file); //将图片url转换为base64码
                    reader.onload = function (e) {
                        const newUrl = this.result;
                        _this.$emit('success', newUrl)
                    };
                } else {
                    _this.$notify({
                        title: "错误",
                        message: '只能上传图片',
                        type: "error",
                        duration: 2000,
                    });
                    this.value = ''
                }
            });
        } else {
            this.$notify({
                title: "错误",
                message: '图片上传插件初始化失败',
                type: "error",
                duration: 2000,
            });
        }
    },
    methods: {
        /* 点击打开文件选择框 */
        upload() {
            const oFile = this.$refs['image2Base64-upload']; //获取input file节点
            oFile.click()
        }
    }
};
</script>
<style lang="scss" scoped>
    .upload-btn {
        display: none;
    }
</style>
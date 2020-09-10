<template>
<div>
	<el-upload
        class="avatar-uploader"
        list-type="picture-card"
        :action="fileuploadUrl"
        :file-list="fileList"
        :on-change="fileChange"
        :on-success="uploadSuccess"
        :on-error="uploadFiled"
        :on-exceed="overfileuploadNumber"
        :beforeRemove="fileBerofeRemove"
        :on-remove="fileRemove"
        :limit="limit"
        :on-preview="handlePictureCardPreview"
	>
		<i class="el-icon-plus"></i> 
        <div slot="tip" class="el-upload__tip">只能上传 jpg、png 格式的文件, 单个文件最大5MB，总数最多不超过{{limit}}个</div>
	</el-upload>
    <!-- 图片放大展示 -->
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</div>
</template>
<script>
import fileApi from '@/api/file-api';
export default {
	/* 图片展示 upload */
	name: "upload-pic-card",
    props: {
        value: {
            type: Array,
            default: () => []
        },
        //上传文件分类 
        uploadUrl: {    
            type: String
        },
        limit: {
            type: Number,
            default: 1
        }
    },
	data() {
		return {
			dialogImageUrl: "",//展示地址链接
			dialogVisible: false,
            fileList: this.value,
            fileuploadUrl: fileApi.uploadFiles( `uploadChildPath=${this.uploadUrl}`), // 上传文件地址 
		};
	},
     watch: {
        value: function(n) {
            this.fileList = n
            // 修改 v-model 数据
            this.$emit('input', n)
        },
    },
	methods: {
        //放大展示
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
         // 上传文件 改变时
         // 文件上传成功
        uploadSuccess(response, file, fileList) {
            const { raw } = file
            const { data,  success} = response
            const { type } = raw;
            if(success && data[0]) {
                this.fileList.push({name: data[0].fileName, url: data[0].url, type: 'image'})
                this.$message({message: '文件上传成功', type: 'success',duration: 2000})
            } else {
                this.$message({message: '文件上传失败', type: 'warning',duration: 2000})
                fileList.pop() 
            }
            // this.loading = false
            // 修改 v-model 数据
            this.$emit('input', this.fileList)
        },
        // 图片改变时大小类型验证
        fileChange(file, fileList) {
            // console.log(file)
            if(file.status === "ready") {
                // 文件准备就绪未上传
                /* 
                    image/jpeg 
                    image/png   
                */
                const { raw } = file
                const isJPG = raw.type === 'image/jpeg';
                const isPNG = raw.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 > 5;
                if (!isJPG && !isPNG) {
                    // 文件格式判断
                    this.$notify.error({
                        title: '异常',
                        message: `上传头像图片只能是 JPG 或 PNG 格式!`,
                        duration: 2000

                    });
                    fileList.pop() 
                } else {
                    if(isLt5M) {
                        this.$notify.error({
                            title: '异常',
                            message: `上传头像图片大小不能超过 5MB!`,
                            duration: 2000
                        });
                        fileList.pop() 
                    }
                }
            }
        },
        // 文件超出上传个数
        overfileuploadNumber(file, fileList) {
            this.$notify.error({
                title: '异常',
                message: `文件最多上传${fileList.length}个`,
                duration: 2000
            });
        },
        // 文件在列表被移除前
        async fileBerofeRemove(file, fileList) {
            // if(!this.isEdit) return // 非编辑不可删除
            // console.log(file);
            if(file.status === 'success') {
                return new Promise((resvole, reject) => {
                    this.$confirm('该操作删除文件后不可找回，请谨慎操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(res =>{
                        Promise.all([fileApi.delServerFile({url: file.url}), file.id? fileApi.delete({id: file.id}):'']).then(res => {
                            const [resOne, resTwo] = res;
                            this.$message({type: 'success', message: '文件删除成功',duration: 2000})
                            resvole()
                        }).catch(err => {
                            this.$message({type: 'error', message: '文件删除失败',duration: 2000})
                            reject()
                        })
                    }).catch(err => console.log(err))
                })
            }
            if(file.status === "uploading") {
                this.$message({type: 'warning', message: '文件上传被取消',duration: 2000})
                // this.loading = false
            }
        },
         // 文件在列表被移除后
        fileRemove(file, fileList) {
            // console.log(file)
            const index = this.fileList.findIndex(item => item.uid === file.uid)
            this.fileList.splice(index, 1)
            // 修改 v-model 数据
            this.$emit('input', this.fileList)
        },
        // 文件上传失败
        uploadFiled(err, file, fileList) {
            this.$message({message: '文件上传失败', type: 'warning',duration: 2000})
            this.loading = false
        },
	},
};
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
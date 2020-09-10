<template>
    <el-dialog  width="500" :visible.sync="outerVisible" custom-class="dialog-custom-class" :close-on-click-modal="false" :close-on-press-escape="false"  :show-close="false">
        <p class="dialog-title" slot="title">批量搜索</p>
        <el-dialog
        :visible.sync="innerVisible"
        custom-class="dialog-custom-class"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body>
            <p class="dialog-title" slot="title">批量导入搜索</p>
            <div class="dialog-container">
                <UploadWord :uploadUrl="fileuploadUrl" @uploadSuccess="uploadWordSuccess" />
            </div>
            <div class="dialog-footer" slot="footer">
                <el-button class="dialog-footer-btn" type="info" size="mini" @click="innerVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <div class="radio-box">
            <el-radio v-model="radio" label="1">货物名称</el-radio>
            <el-radio v-model="radio" label="2">货物类型</el-radio>
        </div>
        <el-input type="textarea" :rows="5" placeholder="批量搜索格式  例：佩戴式防爆照明灯,玻璃破碎器,氯气罐阀门泄漏封堵工具" v-model="content" ></el-input>
        <span class="error-info">批量搜索格式  例：佩戴式防爆照明灯,玻璃破碎器,氯气罐阀门泄漏封堵工具</span>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="close">关闭</el-button>
            <el-button size="mini" @click="reSet">重置</el-button>
            <el-button size="mini" @click="getMoreList">确定</el-button>
            <el-button size="mini" type="primary" @click="innerVisible = true">导入模板</el-button>
        </div>
    </el-dialog>
</template>

<script>
import UploadWord from '@/components/upload/upload-word'
import contractApi from "@/api/contract-api";
import { log } from 'util';
export default {
    data(){
        return {
            innerVisible:false,
            content:'',
            radio:"1",
            fileuploadUrl: contractApi.importWord( `uploadChildPath=uploadTemlate`), // 上传文件地址 批量搜索
        }
    },
    props:{
        outerVisible:false
    },
    methods:{
        uploadWordSuccess(value){
            this.innerVisible = false
            this.content = value && value.replace(/<[^>]+>/g,"")
        },
        close(){
            this.$emit('success',false)
        },
        getMoreList(){
            var reg =  /^[\W\w,]+$/;
            if(this.content === ''){
                this.$notify({
                    title: "错误",
                    message: "请输入完整的搜索信息",
                    type: "error",
                    duration: 2000,
                });
            }else{
                if(reg.test(this.content)){
                    const params = {
                        content:this.content,
                        radio:this.radio
                    }
                    this.$emit('success',params)
                }else{
                    this.$notify({
                        title: "错误",
                        message: "搜索信息格式错误，请以英文逗号分隔",
                        type: "error",
                        duration: 2000,
                    });
                }
            }
          
        },
        reSet(){
            this.content = ''
            this.$emit('success','')
        }
    },
    components: { UploadWord },
}
</script>

<style lang="scss" scoped>
    .radio-box{
        margin-bottom: 10px;
    }
    .error-info {
		color: $default-fail;
        margin-top: 10px;
        font-size: 14px;
        display: inline-block;
	}
</style>
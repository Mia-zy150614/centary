<template>
    <div class="page-container page-info">
        <div class="p-i-section">
            <div class="p-i-title clearfix">
                <span class="line"></span>
                <span class="text">数据字典基本信息</span>
            </div>
            <div class="p-i-content">
                <el-form :model="infoForm" :rules="formRules" ref="infoForm" label-width="120px" class="p-i-form">
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="字段名称：" class="p-i-form-item-content" prop="name">
                            <el-input size="small" v-model.trim="infoForm.name" placeholder="请输入字段名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="字段值：" class="p-i-form-item-content" prop="value">
                            <el-input size="small" v-model.trim="infoForm.value" placeholder="请输入字段值" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="字段类型：" class="p-i-form-item-content" prop="type">
                            <el-select style="width: 100%" size="small" v-model="infoForm.type" placeholder="请选择字段类型" :disabled="disEdit" filterable clearable>
                                <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value"
                                >{{item.name}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="序号：" class="p-i-form-item-content" prop="orderNum">
                            <el-input size="small" v-model="infoForm.orderNum" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="备注：" prop="remark" class="p-i-form-item-content large">
                            <el-input type="textarea" v-model="infoForm.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item submit-wrap">
                        <el-button class="btn" size="small" @click="$router.go(-1)">取消</el-button>
                        <el-button class="btn" type="primary" size="small" @click="saveSubmit('infoForm')">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import dictDataApi from "@/api/dictdata-api";
export default {
    name: '',
    data() {
        return {
            infoForm: {
                id: "",
                name: "",
                value: "",
                type: "",
                remark: "",
                orderNum: ''
            },
            formRules: {
                name: [{ required: true, message: '字段名称不能为空'},{ max:20 ,message:'字段名称长度不能超过20个字符'}],
                value: [{ required: true, message: '字段值不能为空'},{ max:32 ,message:'字段名称长度不能超过32个字符'}],
                type: {required: true, message: '字段类型必填'},
                orderNum: [
                    { required: true, message: '序号不能为空'},
                    { max: 8, message: '序号不能超过8位',trigger: 'blur'},{ validator: this.validateOrderNum ,trigger:'blur'}
                ]
            },
            typeOptions: [],
            disEdit:false,
        }
    },
    created() {
        this.getDictType()
        const { type, id } = this.$route.query;
        if(type === 'edit' &&　id) {
            this.getData(id);
            this.disEdit = true;
        }
    },
    methods: {
        /* 保存提交 */
        saveSubmit(form_name) {
            this.$refs[form_name].validate(valid => {
                if (valid) {
                    var msgs = "";
                    var msge = "";
                    // 判断是修改还是新增来改变提示语
                    if (this.infoForm.id) {
                        msgs = "修改成功";
                        msge = "修改失败";
                    } else {
                        msgs = "创建成功";
                        msge = "创建失败";
                    }
                    dictDataApi.add(this.infoForm).then( res => {
                        if(res.data.data == 3){
                            this.$notify({
                                title: "失败",
                                message: "同一字段类型字段名称不能重复",
                                type: "error",
                                duration: 2000
                            });
                        }else if (res.data.data == 2) {
                            this.$notify({
                                title: "失败",
                                message: "同一字段类型字段值不能重复",
                                type: "error",
                                duration: 2000
                            });
                        } else {
                            this.$notify({
                                title: "成功",
                                message: msgs,
                                type: "success",
                                duration: 2000
                            });
                            this.cancel();
                        }
                    }).catch( err => {
                        this.$notify({
                            title: "失败",
                            message: msge,
                            type: "error",
                            duration: 2000
                        });
                    });
                } else{
                    this.$notify({
                        title: "失败",
                        message: "请填写正确的信息",
                        type: "error",
                        duration: 2000
                    });
                    return false;
                }
            })
        },
        /* 编辑时获取信息 */
        //编辑
        getData(id) {
            dictDataApi.queryByParam({id}).then(res => {
                if (res.data.success) {
                    this.infoForm.id = res.data.data[0].id;
                    this.infoForm.name = res.data.data[0].name;
                    this.infoForm.value = res.data.data[0].value;
                    this.infoForm.type = res.data.data[0].type;
                    this.infoForm.remark = res.data.data[0].remark;
                    this.infoForm.orderNum = res.data.data[0].orderNum;
                    this.infoForm.orderNum = this.infoForm.orderNum ? this.infoForm.orderNum.toString() : ''
                }
            }).catch(err => console.log(err));
        },
        validateOrderNum (rule, value, callback) {
            if (value != null && value != "") {
                if (!/[\d.]/.test(parseInt(value)) ){
                    callback(new Error("序号必须为数字"));
                }else{
                    callback();
                }
            }else{
                callback();
            }
        },
        getDictType() {
            dictDataApi.queryByModel({type: "60"}).then( res => {
                this.typeOptions = res.data.data;
                this.typeOptions.push({name: "字典类型", value: "60"});
            }).catch(err => console.log(err));
        },
        // 取消返回
        cancel(){
            this.$router.go(-1)
        }
    }
}
</script>
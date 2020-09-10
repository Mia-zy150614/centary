<template>
    <div class="page-container page-info">
        <div class="p-i-section">
            <div class="p-i-title clearfix">
                <span class="line"></span>
                <span class="text">系统参数基本信息</span>
            </div>
            <div class="p-i-content">
                <el-form :model="infoForm" :rules="formRules" ref="infoForm" label-width="120px" class="p-i-form">
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="参数类型：" prop="kind" class="p-i-form-item-content">
                            <el-input type="text" size="small" v-model="infoForm.kind" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="参数名称：" prop="name" class="p-i-form-item-content">
                            <el-input type="text" size="small" v-model="infoForm.name" autocomplete="off" disabled></el-input>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="参数值的类型：" prop="dataType" class="p-i-form-item-content">
                            <el-select v-model="infoForm.dataType" placeholder="请选择参数类型" size="small" style="width: 100%" clearable disabled>
                                <el-option
                                    v-for="item in dataTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    {{item.label}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="参数值：" prop="value" class="p-i-form-item-content">
                            <el-input type="text" size="small" v-model="infoForm.value" autocomplete="off" clearable></el-input>
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
import paramApi from "@/api/param-api";
export default {
    name: 'paramsinfo-page',
    data() {
        return {
            isDisable: false,
            infoForm: {
                id: "",
                kind: "",
                name: "",
                dataType: "",
                value: "",
                remark: "",
                oldKind: "",
                oldName: ""
            },
            dataTypes: [
                { value: 1, label: "int" },
                { value: 2, label: "String"}
            ],
            formRules: {
                value: [
                    {
                        validator: this.validateCheckValue,
                        trigger: "blur"
                    },
                    {
                        required: true,
                        message: "参数值不能为空"
                    }
                ],
                remark: [
                    {
                        max: 50,
                        message: "备注长度必须在1到50个字之间",
                        trigger: "blur"
                    }
                ]
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        validateCheckValue (rule, value, callback) {
            if (this.infoForm.dataType == 1 && !Number(value) && value != 0) {
                callback(new Error("参数值格式不正确"));
            } else {
                callback();
            }
        },
        /* 保存 */
        saveSubmit(form_name) {
            this.$refs[form_name].validate(valid => {
                if (valid) {
                    paramApi.save(this.infoForm).then( res => {
                        if (res.data.success) {
                            this.$notify({
                                title: "成功",
                                message: "保存成功",
                                type: "success",
                                duration: 2000,
                                onClose(){
                                    that.$router.push({ name: "params" });
                                }
                            });
                        } else {
                            this.$notify({
                                title: "保存失败",
                                message: res.data.msg,
                                type: "error",
                                duration: 2000
                            });
                        }
                    }).catch(err => console.warn(err));
                } else {
                    this.$notify({
                        title: "失败",
                        message: "请填写完整信息",
                        type: "error",
                        duration: 2000
                    });
                    return false;
                }
            });
        },
        /* 获取信息 */
        getData() {
            const {kind,name} = this.$route.query
            paramApi.getParamsInfoByKindAndName(kind,name).then(res => {
                const data = res.data.data
                if(data) this.infoForm = {...this.infoForm, ...data}
            }).catch(err => console.warn(err))
        }
    }
}
</script>
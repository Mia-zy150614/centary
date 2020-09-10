<template>
    <div class="page-container page-info">
        <div class="p-i-section">
            <div class="p-i-title clearfix">
                <span class="line"></span>
                <span class="text">单位基本信息</span>
            </div>
            <div class="p-i-content">
                <el-form :model="infoForm" :rules="formRules" ref="infoForm" label-width="140px" class="p-i-form">
                    <div class="p-i-form-item clearfix">
                        <el-form-item  label="上级单位：" class="p-i-form-item-content"  prop="deptName" clearable :rules="[
                                {required: true, message: '上级单位必选', trigger: 'blur'}
                            ]">
                            <el-select style="width: 100%" v-model="infoForm.deptName" placeholder="请选择单位" ref="select-ref" size="small" :disabled="isDisable">
                                <el-option :value="[]" style="width: auto; height: auto; min-height: 250px; background-color:#fff">
                                    <el-tree
                                        :highlight-current = true
                                        :default-expand-all = true
                                        :expand-on-click-node="true"
                                        :data="parentTreeData"
                                        :filter-node-method="$filterNode"
                                        @node-click="selectClassfy">
                                    </el-tree>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位名称：" class="p-i-form-item-content" prop="name" size="small">
                            <el-input v-model.trim="infoForm.name" placeholder="请输入单位名称" :disabled="isDisable" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="备注：" prop="remark" class="p-i-form-item-content large">
                            <el-input type="textarea" v-model="infoForm.remark" autocomplete="off" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item submit-wrap">
                        <el-button class="btn" size="small" @click="$router.go(-1)">取消</el-button>
                        <el-button class="btn" type="primary" size="small" :disabled="preSecondSubmit" v-if="!isDisable" @click="saveSubmit('infoForm')">保存</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import deptApi from "@/api/dept-api";
export default {
    name: 'pmunit-add-unit-page',
    data() {
        return {
            parentTreeData: [], // 组织架构树
            infoForm: {
                id:'',
                name:'',
                abbreviation:'',
                deptName:'',
                parentId:'',
                contactName:'',
                contactMobile:'',
                openBank:'',
                website:'',
                address:'',
                remark:'',
                deptType:'1',
            },
            formRules: {
                name: [
                    { validator: this.validateName, trigger: "blur" },
                    { required: true, message: "单位名称不能为空", trigger: "blur" }
                ],
            },
            isDisable:false,
            preSecondSubmit: false, // 阻止二次提交
        }
    },
    created() {
        const {type,id} = this.$route.query;
        if(id){
            if(type === 'view'){
                this.isDisable = true;
            }
            this.edit(id);
        }
        this.getAllDeptTree()
    },
    methods: {
        // 保存
        saveSubmit(form_name) {
            var that = this;
            if(that.preSecondSubmit) return
            that.preSecondSubmit = true;
            this.$refs[form_name].validate(valid => {
                if (valid) {
                    var msgs = that.infoForm.id?"修改成功":"新建成功";
                    var msge = that.infoForm.id?"修改失败":"创建失败";
                    deptApi.save(that.infoForm).then(res => {
                        this.preSecondSubmit = false
                        if(res.data.success){
                            that.$notify({
                                    title: "成功",
                                    message: msgs,
                                    type: "success",
                                    duration: 2000,
                                    onClose(){
                                        that.$router.push({ name: "pmunit-page" });
                                        that.preventSecondarySubmit =  false
                                    }
                                },
                            );
                        }else{
                            that.$notify({
                                title: "失败",
                                message:res.data.msg===""? msge:res.data.msg,
                                type: "warning",
                                duration: 2000
                            });
                        }

                    }).catch( res => {
                        this.preSecondSubmit = false
                        that.$notify({
                            title: "失败",
                            message: msge,
                            type: "warning",
                            duration: 2000
                        });
                    });
                }else{
                    this.$notify({
                        title: "失败",
                        message: "请填写正确的信息",
                        type: "warning",
                        duration: 2000
                    });
                    console.log("error submit!!");
                }
            })
        },
        //查询权限内的单位
        getAllDeptTree() {
            deptApi.getAllDeptTree({deptType:"1"}).then( res => {
                const data = res.data.data
                if(data) this.parentTreeData = data
            }).catch(err => console.log(err))
        },
        //选择部门树节点事件
        selectClassfy(data) {
            this.infoForm.deptName = data.label
            this.infoForm.parentId = data.id
            this.$refs['select-ref'].blur();
        },
        //查询详情
        edit(id){
            deptApi.getById({id:id}).then( res => {
                this.infoForm = res.data.data;
                this.infoForm.deptName = res.data.data.pDeptName;
            }).catch(function (res) {
                console.log(res);
            });
        },
        // 单位验证
        validateName(rule, value, callback){
            var _this = this;
            var reg = /^([a-zA-Z]|[0-9]|[a-zA-Z0-9]|[a-zA-Z0-9!#$%^&*-_()]|[\u4e00-\u9fa5]){0,50}$/;
            if (value != null && value != "") {
                if(value.length>50){
                    callback(
                        new Error("输入长度必须在1-50个字之间")
                    );
                    return;
                }
                if (!reg.test(value)) {
                    callback(
                        new Error("请输入中文，字母，数字及特殊字符")
                    );
                    return;
                }
                var params = {
                    pId: _this.infoForm.parentId,
                    uniqueFiled: "name",
                    uniqueFiledValue: value,
                };
                deptApi.checkUnique(params).then(function(res) {
                    if (res.data) {
                        callback();
                    } else {
                        callback(new Error("单位名称已存在，请重新输入"))
                    }
                }).catch(function(res) {
                    console.log(res);
                });
            } else {
                callback();
            }
        }
    }
}
</script>
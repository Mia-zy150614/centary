<template>
    <div class="page-container page-info">
        <div class="p-i-section">
            <div class="p-i-title clearfix">
                <span class="line"></span>
                <span class="text">角色基本信息</span>
            </div>
            <div class="p-i-content">
                <el-form :model="infoForm" :rules="formRules" ref="infoForm" label-width="100px" class="p-i-form">
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="角色名称：" prop="ruleName" class="p-i-form-item-content">
                            <el-input type="text" size="small" v-model="infoForm.ruleName" :disabled="isDisable" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item  label="所属部门：" class="p-i-form-item-content"  prop="deptName" :rules="[
                                {required: true, message: '所属部门必选', trigger: 'blur'}
                            ]">
                            <el-select size="small" style="width: 100%" v-model="infoForm.deptName" :disabled="isDisable" placeholder="请选择部门" ref="select-ref">
                                <el-option :value="[]" style="width: auto; height: auto; background-color:#fff">
                                    <el-tree
                                        :highlight-current = false
                                        :default-expand-all = true
                                        :expand-on-click-node= false
                                        :data="parentTreeData"
                                        :filter-node-method="$filterNode"
                                        @node-click="selectDeptClassfy"
                                        class="organization-tree"
                                    >
                                    <span class="organization-tree-node"  slot-scope="{ node, data }">
                                        <span class="node-icon">
                                            <svg class="icon-svg" aria-hidden="true" v-if="data.deptType === null">
                                                <use xlink:href="#icon-pingtai"></use>
                                            </svg>
                                            <svg class="icon-svg" aria-hidden="true" v-if="data.deptType === 1">
                                                <use xlink:href="#icon-gongsi"></use>
                                            </svg>
                                            <svg class="icon-svg" aria-hidden="true" v-if="data.deptType === 2">
                                                <use xlink:href="#icon-bumen"></use>
                                            </svg>
                                        </span>
                                        <span class="node-text">{{ node.label }}</span>
                                    </span>
                                    </el-tree>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item  label="审批分类：" class="p-i-form-item-content"  prop="type">
                            <el-select v-model="infoForm.type" :disabled="isDisable || !infoForm.deptName" size="small" style="width: 100%" placeholder="请选择分类">
                                <el-option v-for="item in typeData" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="状态：" class="p-i-form-item-content">
                            <span :class="[infoForm['status'] === 0?'table-column-fail':'table-column-success']">{{infoForm['status'] === 0 ? '停用中':'启用中'}}</span>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="备注：" class="p-i-form-item-content large" prop="description">
                            <el-input type="textarea" v-model="infoForm.description" :disabled="isDisable && !ruleEditeBtn"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="p-i-section">
            <div class="p-i-title clearfix">
                <span class="line"></span>
                <span class="text">审批流程</span>
            </div>
            <div class="p-i-content">
                <div class="rule_timeline_wrap">
                    <div class="rule_list_container">
                        <div class="rule_list_show" v-show="!ruleEdite">
                            <el-timeline>
                                <el-timeline-item class="rule_list_show_item" v-for="(item, index) in ruleListShow" :key="index">
                                    <strong>第 {{index+1}} 步：</strong>
                                    <p class="rule_list_show_approvaluser">
                                        <label>审批人：</label>
                                        <el-link type="primary">{{item.approvalUserName}}</el-link>
                                    </p>
                                    <p class="rule_list_show_approvaluser">
                                        <label>抄送人：</label>
                                        <el-link class="ccuser-link" type="info" v-for="(ccuser,index) in item.ccUserName" :key="index">{{ccuser}}，</el-link>
                                    </p>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div class="rule_list_edit" v-show="ruleEdite">
                            <el-form :model="ruleListForm" ref="rulelist_form" label-width="100px">
                                <div class="el_from_item" v-for="(ruleitem, index)  in ruleListForm.ruleList" :key="index">
                                    <strong class="step_info">第 {{index+1}} 步</strong>
                                    <el-form-item class="el_form_item_rest" label="审批人员："
                                        :prop="'ruleList.' + index + '.approvalUserId'"
                                        :rules="[
                                            { required: true, message: '请选择审批人员', trigger: 'blur' },  
                                            { validator: approvalUserIdVadator, trigger: 'change' }
                                        ]"
                                    >
                                        <el-select size="small" v-model="ruleitem.approvalUserId" placeholder="请选择审批人员" @change="approvalChange" filterable clearable>
                                            <el-option v-for="item in allUserList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                                                <span style="float: left; font-size: 14px; margin-right: 15px">{{ item.name }}</span>
                                                <span style="float: left; color: #8492a6; font-size: 12px">{{ item.locationName }}</span>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="el_form_item_rest" label="抄送人员：" :prop="'ruleList.' + index + '.ccIds'">
                                        <el-select size="small" v-model="ruleitem.ccIds" placeholder="请选择抄送人员：" class="multiple_input" filterable multiple clearable>
                                            <el-option v-for="item in allUserList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
                                                <span style="float: left; font-size: 14px; margin-right: 15px">{{ item.name }}</span>
                                                <span style="float: left; color: #8492a6; font-size: 12px">{{ item.locationName }}</span>
                                            </el-option>
                                        </el-select>
                                        <el-button class="del_btn" size="small" type="danger" @click="ruleDelClick(index)">删除</el-button>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </div>
                    <div class="rule_edit_btn" v-if="!isDisable || ruleEditeBtn">
                        <el-button size="mini" type="success" v-show="ruleEdite" @click="ruleAddClick">添加</el-button>
                        <el-button size="mini" type="warning" v-show="!ruleEdite" @click="ruleEditeClick">编辑审批流程</el-button>
                        <el-button size="mini" type="primary" v-show="ruleEdite" @click="ruleSaveClick">保存</el-button>
                        <el-button size="mini" type="info" v-show="ruleEdite" @click="ruleCancelClick">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-i-section">
            <div class="p-i-content">
                <div class="p-i-form-item submit-wrap" v-show="!ruleEdite">
                    <el-button class="btn" type="primary" size="small" v-if="!isDisable || ruleEditeBtn" @click="saveSubmit('infoForm')">保存</el-button>
                    <el-button class="btn" size="small" @click="$router.go(-1)">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import deptApi from '@/api/dept-api'
import userApi from '@/api/user-api'
import approvalRuleApi from '@/api/approvalrule-api'
export default {
    name: "ruleinfo-page",
    data() {
        return {
            isDisable: false,
            infoForm: {
                deptId:'',
                ruleName: '',
                description:'',
                deptId:'',
                deptName:'',
                datas:'',
                type: '',
                id: '',
                status: null
            },
            formRules: {
                ruleName: [
                    {
                        required: true,
                        message: "规则名称不能为空",
                        trigger: "blur"
                    },
                    {
                        max: 20,
                        message: "输入长度必须在1到20字之间",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        max: 50,
                        message: "输入长度必须在1到50个字之间",
                        trigger: "blur"
                    }
                ],
                type: [
                    { required: true, message: '审批分类必选', trigger: 'blur'}
                ]
            },
            parentTreeData:[],
            isDisable: false, // 详情禁止编辑
            ruleEdite: false,
            ruleEditeBtn: false,
            ruleListForm: {
                // 审批流程编辑
                ruleList: [
                    { approvalUserId: "", ccIds:"" }
                ],
            },
            ruleListShow:[], // 审批流程展示
            approvalUserList: [], // 审批人
            ccUserList:[], // 抄送人
            allUserList: [], //所有人员
            typeData: [],//审批类型
        }
    },
    created() {
        const {id, type} = this.$route.query;
        this.getAllDeptTree()
        this.getUserNameAndLocation()
        if( type && id ) {
            this.getApprovalRulesData(id)
            this.isDisable =  true
            this.ruleEditeBtn =  type === 'edit' ? true : false 
        } else {
            this.ruleEdite = true
        }
    },
    watch: {
        "infoForm.deptId": function(n) {
             this.deptChange(n)
        }
    },
    methods: {
        // 审批规则保存
        saveSubmit(form_name) {
            const _this = this;
            this.$refs[form_name].validate(valid => {
                if(valid) {
                    const list = this.ruleListShow.map(item => {
                        return {
                            approvalUserId: item.approvalUserId,
                            ccIds: item.ccIds.join(',')
                        }
                    })
                    this.infoForm.datas = JSON.stringify(list);
                    approvalRuleApi.saveTree(this.infoForm).then(res => {
                        if(res.data.success){
                            _this.$notify({
                                    title: "成功",
                                    message: '规则保存成功',
                                    type: "success",
                                    duration: 1000,
                                    onClose(){
                                        _this.$router.push({ name: "rule-page" });
                                        _this.preventSecondarySubmit =  false
                                    }
                                },
                            );
                        }else{
                            _this.$notify({
                                title: "失败",
                                message:res.data.msg === "",
                                type: "error",
                                duration: 1000
                            });
                        }
                    }).catch( res => {
                        _this.preventSecondarySubmit = false
                        _this.$notify({
                            title: "失败",
                            message: msge,
                            type: "error",
                            duration: 1000
                        });
                    });;
                }
            })
        },
        /* select 树点击 */
        selectDeptClassfy(data) {
            if(data.deptType !== 2) {
                this.$message({
                    message: "只能给部门添加规则",
                    type: "error"
                });
                return;
            }
            this.infoForm.deptName = data.label;
            this.infoForm.deptId = data.id;
            this.$refs['select-ref'].blur();
        },
        // 部门修改时
        deptChange(deptId) {
            if(deptId) {
                approvalRuleApi.getApprovalRules({deptId}).then(res => {
                    const data = res.data.data;
                    if(data) this.typeData = data;
                }).catch(err => console.log(err))
            } else {
                this.typeData = []
            }
        },
        // 流程编辑
        ruleEditeClick() {
            const list = this.ruleListShow.map( (item, index) => {
                return {
                    approvalUserId: item.approvalUserId,
                    ccIds: item.ccIds
                }
            })
            this.ruleListForm.ruleList = list;
            this.ruleEdite = true
        },
        // 添加审批步骤
        ruleAddClick() {
            this.ruleListForm.ruleList.push({description: ''})
        },
        // 审批步骤删除
        ruleDelClick(index) {
            if(this.ruleListForm.ruleList.length <= 1) {
                this.$notify({
                    title: "错误",
                    message: "审批流程至少要存在一个步骤",
                    type: "error",
                    duration: 1000,
                });
                return
            }
            // 先清除校验状态在去验证
            this.ruleListForm.ruleList.splice(index, 1)
            this.$nextTick(() => this.$refs['rulelist_form'].validate(valid =>{}))
        },
        // 审批步骤保存
        ruleSaveClick() {
            this.$refs['rulelist_form'].validate(valid => {
                if (valid) {
                    const { ruleList } = this.ruleListForm
                    if(ruleList && ruleList.length) {
                        const list = ruleList.map(item => {
                            let approvalUserName, ccUserName=[];
                            this.allUserList.map( i => {
                                if(i.id === item.approvalUserId) approvalUserName =  i.name
                                if(item.ccIds) {
                                    if(item.ccIds.indexOf(i.id) !== -1) ccUserName.push(i.name)
                                }
                            })
                            return {
                                approvalUserName,
                                approvalUserId: item.approvalUserId,
                                ccIds: item.ccIds? item.ccIds : [],
                                ccUserName
                            }
                        })
                        this.ruleListShow = list;
                        this.ruleEdite = false
                    }
                }
            })
        },
        // 审批步骤取消
        ruleCancelClick() {
            if(!this.$route.query.type && !this.ruleListShow.length) {
                this.$router.go(-1)
            } else {
                this.ruleListForm.ruleList = []
                this.ruleEdite = false
            }
        },
        // 审批人唯一性验证
        approvalUserIdVadator(rule, value, callback) {
            const { ruleList } = this.ruleListForm
            const ishas = ruleList.filter(item => {
                return item.approvalUserId === value && value
            })
            if(ishas.length > 1) {
                callback(new Error('审批人不能重复'));
            } else {
                callback();
            }
        },
        // 审批人员change
        approvalChange(value) {
            this.allUserList.forEach(item => {
                item.disabled = false
                if(value === item.id) {
                    item.disabled = true
                }
            })
        },
        //查询权限内的单位
        getAllDeptTree() {
            deptApi.getAllDeptTree({}).then( res => {
                const  data = res.data.data
                if(data) this.parentTreeData = data
            }).catch(function (res) {
                console.log(res);
            });
        },
        // 获取人员
        getUserNameAndLocation() {
            userApi.getUserNameAndLocation().then(res => {
                const data = res.data.data;
                this.allUserList =  data && data;
            })
        },
        // 获取审批信息
        getApprovalRulesData(id) {
            approvalRuleApi.getApprovalRulesData({id}).then( async res => {
                const data = res.data.data;
                const { ruleName, deptId, description, deptName, children, type, status } = data;
                this.infoForm['ruleName'] = ruleName;
                this.infoForm['deptName'] = deptName;
                this.infoForm['type'] = type;
                this.infoForm['description'] = description;
                this.infoForm['id'] = id;
                this.infoForm['status'] =status;
                this.infoForm['deptId'] = deptId;
                // 审批流程
                if(children && children.length) {
                    const list = children.map(item => {
                        return {
                            approvalUserId: item.approvalUserId,
                            approvalUserName: item.approvalUserName,
                            ccIds: item.ccIds ? item.ccIds.split(','):[],
                            ccUserName: item.ccUserName ? item.ccUserName.split(','):[]
                        }
                    })
                    this.ruleListShow = list;
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .rule_timeline_wrap {
        padding: 0 20px;
        .rule_edit_btn {
            width: 60%;
        }
        .rule_list_container {
            .rule_list_show {
                .rule_list_show_item {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    color: #666666;
                    strong {
                        display: inline-block;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .rule_list_show_approvaluser {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        margin-bottom: 10px;
                        label {
                            width: 80px;
                            text-align: right;
                        }
                        .ccuser-link {
                            margin-right: 5px;
                        }
                    }
                }
            }
            /deep/.rule_list_edit {
                .el_from_item {
                    overflow: hidden;
                    .step_info {
                        line-height: 40px;
                        font-weight: 600;
                        float: left;
                    }
                    .el_form_item_rest {
                        float: left;
                        // TODO 后期解决
                        // .multiple_input {
                        //     .el-input--suffix {
                        //         .el-input__inner {
                        //             height: auto !important;
                        //         }
                        //     }
                        // }
                        &:first-of-type {
                            width: 250px;
                        }
                        .del_btn {
                                margin-left: 15px;
                        }
                    }
                }
            }
        }
    }
    /deep/.organization-tree {
        .organization-tree-node {
            width: 100%;
            .node-icon {
                margin-right: 10px;
                .icon-svg {
                    color: $basictheme-color;
                    vertical-align: -3px;
                }
            }
            .node-left {
                float: left;
            }
            .node-right {
                float: right;
                margin-right: 50px;
                .icon-wrap {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
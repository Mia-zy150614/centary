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
                        <el-form-item label="角色名称：" prop="name" class="p-i-form-item-content">
                            <el-input type="text" size="small" v-model="infoForm.name" autocomplete="off" :disabled="isDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="所属部门：" prop="deptName" class="p-i-form-item-content">
                            <el-select style="width: 100%" size="small" v-model="infoForm.deptName" :disabled="isDisable || isView" placeholder="请选择部门" ref="select-ref">
                                <el-option :value="[]" style="width: auto; height: auto; background-color:#fff">
                                    <el-tree
                                        :highlight-current = false
                                        :default-expand-all = true
                                        :expand-on-click-node=true
                                        :data="parentTreeData"
                                        :filter-node-method="$filterNode"
                                        @node-click="selectDeptClassfy"
                                    >
                                    <span  slot-scope="{ node }">
                                        <span>{{ node.label}}</span>
                                    </span>
                                    </el-tree>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="p-i-form-item clearfix">
                        <el-form-item label="备注：" prop="remark" class="p-i-form-item-content large">
                            <el-input type="textarea" size="small" v-model="infoForm.remark" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="p-i-section">
            <div class="p-i-title clearfix">
                <span class="line"></span>
                <span class="text">菜单权限</span>
            </div>
            <div class="p-i-content">
                <div class="roleinfo_menu_wrap">
                    <div class="no_menu_item" v-show="!infoForm.subSystem.length">暂无信息</div>
                    <div class="roleinfo_menu_item" v-for="(item, index) in infoForm.subSystem" :key="item.id">
                        <p class="menu_item_header">
                            <span class="item_title">{{item.label}}</span>
                            <el-checkbox v-model="item.allSelected" @change="changeCheckbox(item,index)" :disabled="isDisable"></el-checkbox>
                        </p>
                        <div class="menu_list">
                            <el-scrollbar class="menu_list-scroll">
                                <el-tree
                                    :data="item.tree"
                                    ref="subSystemTree"
                                    show-checkbox
                                    node-key="id"
                                    @check="roletreechecknodesChange(item,index)"
                                    :check-strictly="checkstrictly"
                                    :default-checked-keys="item.selectedMenusList"
                                    :props="defaultProps"
                                >
                                </el-tree>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-i-section">
            <div class="p-i-content">
                <div class="p-i-form-item submit-wrap">
                    <el-button class="btn" size="small" @click="$router.go(-1)">取消</el-button>
                    <el-button class="btn" type="primary" size="small" @click="saveSubmit('infoForm')" v-if="!isDisable" :disabled="preventSecondarySubmit">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import roleApi from "@/api/role-api";
import deptApi from "@/api/dept-api";
import { filter_role_menus, filter_save_role_promisseId } from '../utils'
export default {
    name: 'roleinfo-page',
    data() {
        return {
            isDisable: false,
            isView:false,
            preventSecondarySubmit: false, // 阻止二次提交
            infoForm: {
                id:'',
                name: '',
                remark:'',
                deptId:'',
                deptName:'',
                subSystem:[],
            },
            formRules: {
                name: [
                    {
                        required: true,
                        message: "角色名称不能为空",
                        trigger: "blur"
                    },
                    {
                        max: 20,
                        message: "输入长度必须在1到20字之间",
                        trigger: "blur"
                    }
                ],
                deptName: {required: true, message: '所属部门必选', trigger: 'blur'},
                remark: [
                    {
                        max: 50,
                        message: "输入长度必须在1到50个字之间",
                        trigger: "blur"
                    }
                ]
            },
            parentTreeData: [],
            disableBox:false,
            checkstrictly: true, // 角色权限树是否联动
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
    },
    created() {
        const {type , id } = this.$route.query;
        this.httpRequest(id,type)
        this.getAllDeptTree()
        this.getSubSystem(null);
      
    },
    methods: {
            // 获取页面信息
        httpRequest(id,type) {
            if(id) {
                this.isDisable = type === 'view' ? true: false
                this.isView = type === 'edit' ? true: false
                roleApi.getRolePrivilegeById(id).then( res => {
                    const roleinfoData = res.data.data;
                    if(roleinfoData.roleData && roleinfoData.subSystem) {
                        for(let i in this.infoForm) {
                            this.infoForm[i] = roleinfoData.roleData[i]
                        }
                        this.getSubSystem(roleinfoData.subSystem)
                        setTimeout(() =>{
                            // 时间差 保证tree 节点联动效果展示出来
                            this.checkstrictly = false
                        }, 1000)
                    }
                }).catch(function (res) {
                    console.log(res);
                });
            }

        },
        // 保存
        saveSubmit(form_name) {
            const that = this
            if(this.preventSecondarySubmit) return
            this.preventSecondarySubmit = true
            this.$refs[form_name].validate(valid => {
                if (valid) {
                    const {menuIds, buttonIds} = filter_save_role_promisseId(this.$refs.subSystemTree)
                    var jsonData = {
                        id: this.infoForm.id,
                        name: this.infoForm.name,
                        deptId: this.infoForm.deptId,
                        remark: this.infoForm.remark,
                        menuIds: menuIds.join(","),
                        buttonIds: buttonIds.join(","),
                    };
                    roleApi.saveRole(jsonData).then( res => {
                        if (res.data.success) {
                            this.$notify({
                                title: "成功",
                                message: "保存成功",
                                type: "success",
                                duration: 1000,
                                onClose(){
                                    that.$router.push({ name: "role" });
                                    that.preventSecondarySubmit =  false
                                }
                            });
                        } else {
                            this.$notify({
                                title: "保存失败",
                                message: res.data.msg,
                                type: "warning",
                                duration: 1000
                            });
                            that.preventSecondarySubmit = false
                        }
                    }).catch(res => {
                        that.preventSecondarySubmit = false
                        console.log(res);
                    });
                }else{
                    this.$notify({
                        title: "保存失败",
                        message: "请填写正确的信息",
                        type: "error",
                        duration: 1000
                    });
                    this.preventSecondarySubmit = false
                    console.log("error submit!!");
                }
            })
        },
        //查询权限内的单位
        getAllDeptTree() {
            deptApi.getAllDeptTree().then( res => {
                const data = res.data.data
                if(data) this.parentTreeData = data;
            }).catch(err => console.warn(err));
        },
        selectDeptClassfy(data) {
            if(data.deptType !==2) {
                this.$message({
                    message: "请选择部门",
                    type: "warning"
                });
                return;
            }
            this.infoForm.deptName = data.label;
            this.infoForm.deptId = data.id;
            this.$refs['select-ref'].blur();
        },
        //角色权限树节点 被修改时
        roletreechecknodesChange(data,index) {
            const { allId } = data
            let checkedNodes = this.$refs.subSystemTree[index].getCheckedNodes(false,true);
            if(allId.length <= checkedNodes.length) {
                this.infoForm.subSystem[index]['allSelected'] = true
            }else {
                this.infoForm.subSystem[index]['allSelected'] = false
            }
            if(this.checkstrictly) {
                this.checkstrictly = false
            }
        },
        //获取权限内的系统菜单
        getSubSystem(subSystemSelectData) {
            /**
             * @roleType 当前角色角色类型
             * @subSystemSelectData 当前角色拥有的权限
             * */
            this.infoForm.subSystem = [];
            roleApi.getSubSystemMenuButtonByUserId(this.infoForm.createUserId).then( res => {
                const subsystemslist = res.data.data;
                if(subsystemslist && subsystemslist.length) {
                    // 组装数据
                    if(this.isDisable){
                        this.disableBox = true;
                    }
                    const subSystem = filter_role_menus(res.data.data,subSystemSelectData, this.disableBox);
                    this.infoForm.subSystem = subSystem
                }
            }).catch(function (res) {
                console.log(res);
            });
        },
        // 角色权限全选
        changeCheckbox(data, index){
            const { allSelected, allId } = data
            if(this.checkstrictly) {
                this.checkstrictly = false
            }
            if(allSelected) {
                // 全选
                this.$refs.subSystemTree[index].setCheckedKeys(allId)
            } else {
                // 取消全选
                this.$refs.subSystemTree[index].setCheckedKeys([])
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .roleinfo_menu_wrap {
        .no_menu_item {
            text-align: center;
            color: #999999;
            padding:20px 0 30px;
        }
        .roleinfo_menu_item {
            display: inline-block;
            width: 200px;
            padding: 20px;
            .menu_item_header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .item_title {
                    font-size: 13px;
                    font-weight: bold;
                }
            }
            /deep/.menu_list {
                margin-top: 15px;
                padding: 15px 10px;
                box-shadow: 0px 0px 5px #cac6cc;
                height: 200px;
                .menu_list-scroll {
                    height: 100%;
                    .el-scrollbar__wrap {
                        overflow-x: hidden;
                    }
                }
            }
        }
        /deep/.tree-node{
            .tree_node_disabled {
                opacity: 0.1;
                cursor: no-drop;
            }
        }
    }
</style>
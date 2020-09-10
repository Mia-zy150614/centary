<template>
    <div class="role-page page-container">
        <div class="page-search clearfix">
            <el-input class="p-s-input" size="mini" v-model.trim="searchOptions.name" placeholder="请输入规则名称" clearable></el-input>
            <el-button type="primary" size="mini" class="p-s-btn" @click="getAllApprovalRules">搜索</el-button>
            <el-popover placement="bottom" trigger="click" popper-class="high-search-popover" ref="high-search-popover">
                <el-button :type="isHighSearch?'primary': null" size="mini" slot="reference" class="p-s-high-search">
                    <svg class="icon-svg" aria-hidden="true">
                        <use xlink:href="#icon-highsearch"></use>
                    </svg>
                    <span>高级搜索</span>
                </el-button>
                <div class="high-search-content">
                    <el-form ref="high-search-popover-form" label-width="80px" :model="searchOptions" label-position="right" class="high-search-popover-form">
                        <el-form-item label="名称：" prop="name">
                            <el-input size="mini" v-model.trim="searchOptions.name" placeholder="请输入规则名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="部门：" prop="deptId">
                            <el-select style="width: 100%" size="mini" v-model="searchOptions.deptName" placeholder="请选择部门" ref="select-ref" @change="deptSelectChange" clearable>
                                <el-option :value="[]" style="width: auto; height: auto; min-height: 250px; background-color:#fff">
                                    <el-tree
                                        :highlight-current = true
                                        :default-expand-all = true
                                        :expand-on-click-node="false"
                                        :data="parentTreeData"
                                        :filter-node-method="$filterNode"
                                        @node-click="selectClassfy">
                                    </el-tree>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="分类：" prop="type">
                            <el-select style="width: 100%" size="mini" v-model="searchOptions.type" placeholder="请选择分类" clearable>
                                <el-option v-for="item in typeData" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态：" prop="status">
                            <el-select size="mini" v-model="searchOptions.status" style="width: 100%" placeholder="请选择状态" clearable>
                                <el-option label="启用" value="1">启用</el-option>
                                <el-option label="停用" value="0">停用</el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="high-search-popover-form-submit">
                        <el-button type="primary" size="mini" class="p-s-btn" @click="$hideSubmit(getAllApprovalRules, $refs['high-search-popover'])">确定</el-button>
                        <el-button type="info" size="mini" class="p-s-btn" @click="resetForm">重置</el-button>
                    </div>
                </div>
            </el-popover>
            <div class="p-s-btn-right">
                <el-button type="success" size="mini" title="新建" @click="add">新建</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="page-content-scroll-warp">
                <el-scrollbar class="scroll-wrap">
                    <el-table 
                        :data="tableData" 
                        style="width: 100%"
                        header-cell-class-name="custom-el-table-header-class"
                        cell-class-name="custom-el-table-cell-class-name"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column align="center" type="index" fixed :index="$indexMethod(0,searchOptions.currentPage,searchOptions.pageSize)" label="序号" width="80" ></el-table-column>
                        <el-table-column  align="center" prop="ruleName" label="规则名称"></el-table-column>
                        <el-table-column align="center" prop="deptName" label="所属部门"></el-table-column>
                        <el-table-column align="center" prop="type" label="规则类型"></el-table-column>
                        <el-table-column align="center" prop="createUserName" label="创建人"></el-table-column>
                        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column align="center" prop="status" label="状态">
                            <template slot-scope="scope">
                                <span class="table-column-success" v-if="scope.row.status === 1">启用中</span>
                                <span class="table-column-fail" v-if="scope.row.status === 0">停用中</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="210" fixed="right">
                            <template slot-scope="scope">
                                <el-link  @click="edit(scope.row)" :underline="false" type="warning">编辑</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link  @click="view(scope.row)" :underline="false" type="info">详情</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link  @click="runOrstop(scope.row)" :underline="false" type="danger" v-if="scope.row.status === 1">规则(停用)</el-link>
                                <el-link  @click="runOrstop(scope.row)" :underline="false" type="success" v-if="scope.row.status === 0">规则(启用)</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
import deptApi from '@/api/dept-api'
import dictDataApi from '@/api/dictdata-api'
import approvalRuleApi from '@/api/approvalrule-api'
export default {
    name: "user-page",
    data(){
        return {
            multipleSelection: [],
            searchOptions:{
                currentPage: 1, //当前页码
                pageSize: 20, //每页显示条数
                total: 0,
                ruleName: '',
                deptId: '',
                type:'',
                deptName:'',
                status: ''
            },
            tableData: [],
            isHighSearch: false,
            parentTreeData: [],
            treeData:[],
            typeData:[],
        }
    },
    created() {
        this.getAllDeptTree()
        this.getAllType()
        this.getAllApprovalRules()
    },
    watch: {
        'searchOptions': {
            handler(n, o) {
                /* 动态监听高级搜索是否有值 */
                const {ruleName, deptId, type, status} = n
                if(ruleName || deptId || type || status) {
                    this.isHighSearch = true
                } else {
                    this.isHighSearch = false
                }
            },
            deep: true
        }
    },
    methods: {
        //查询审批规则
        getAllApprovalRules(searchOptions) {
            const {currentPage,pageSize,ruleName,deptId,type,status} = this.searchOptions
            approvalRuleApi.getAllApprovalRules({currentPage,pageSize,ruleName,deptId,type,status}).then( res => {
                this.tableData = res.data.data.list;
                this.searchOptions.total=res.data.data.total;
            }).catch(function (res) {
                console.log(res);
            });
        },
         //查询权限内的单位
        getAllDeptTree() {
            deptApi.getAllDeptTree().then( res => {
                const data = res.data.data
                if(data) this.parentTreeData = data
            }).catch(err => console.warn(err));
        },
        //选择部门树节点事件
        selectClassfy(data) {
            this.searchOptions.deptId = data.id;
            this.searchOptions.deptName = data.label;
            this.$refs['select-ref'].blur();
        },
        // 重置 高级搜索
        resetForm() {
            this.$hideReset(this.$refs['high-search-popover-form'].resetFields)
            this.searchOptions.deptName = ''
        },
        /* 部门 选择 */
        deptSelectChange(value) {
            if(!value) {
                this.searchOptions.deptId = ''
            }
        },
        //查询权限内的审批类型
        getAllType() {
            dictDataApi.queryByModel({type: 'apply_type'}).then(res=>{
                const data = res.data.data
                if(data) this.typeData = data
            }).catch(err => console.warn(err));
        },
        currentChange(val) {
            this.searchOptions.currentPage = val;
            this.getAllApprovalRules();
        },
        /* table 选择 */
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
        /* 新增 */
        add() {
            this.$router.push({name: 'rule-page-add'})
        },
        /* 编辑 */
        edit(row) {
            this.$confirm(`确定要修改这条规则吗, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                this.$router.push({name: 'rule-page-edit', query: {type: 'edit', id: row.id}})
            }).catch(err => console.log(err))
        },
        /* 查看 */
        view(row) {
            this.$router.push({name: 'rule-page-edit', query: {type: 'view', id: row.id}})
        },
        // 规则启用或停用
        async runOrstop(row) {
            const confirmMsg = row.status === 1 ? '停用' : '启用'
            this.$confirm(`确定要${confirmMsg}该条规则吗, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(res => {
                approvalRuleApi.updateApprovalRulesStatu({id: row.id}).then(res => {
                    this.$message({type: 'success', message: '修改成功'})
                    this.getAllApprovalRules()
                }).catch(err => {
                    this.$message({type: 'error', message: '修改失败'})
                })
            }).catch(err => console.log(err))
        }
    }
};
</script>
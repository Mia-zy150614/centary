<template>
    <div class="page-container">
        <div class="page-search clearfix">
            <el-input v-model="searchOptions.name" size="mini" class="p-s-input" placeholder="请输入合同名称" clearable></el-input>
            <el-select v-model="searchOptions.type" placeholder="请选择模板类型" class="p-s-input" clearable size="mini">
				<el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
					{{ item.name}}
				</el-option>
			</el-select>
            <el-button type="primary" size="mini" class="p-s-btn" @click="getList">搜索</el-button>
            <div class="p-s-btn-right">
                <el-button type="success" size="mini" title="新增合同" @click="add()">新增合同</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="page-content-scroll-warp">
                <el-scrollbar class="scroll-wrap">
                    <el-table :data="tableData" style="width: 100%" header-cell-class-name="custom-el-table-header-class" cell-class-name="custom-el-table-cell-class-name">
                        <el-table-column align="center" type="selection"  v-model.trim="multipleSelection" width="55"></el-table-column>
                        <el-table-column align="center" type="index" fixed :index="$indexMethod(0,searchOptions.currentPage,searchOptions.pageSize)" label="序号" width="80">
                        </el-table-column>
                        <el-table-column align="center" prop="name" label="合同名称" show-overflow-tooltip>
                             <template slot-scope="scope">
                                <el-link type="primary" slot="reference" :underline="false" @click.stop="view(scope.row)">{{scope.row.name}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="typeLabel" label="合同类型" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="createUserName" label="创建人" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="createTime" label="创建时间" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column align="center" prop="checkStatus" label="审核状态">
                            <template slot-scope="scope">
                                <span class="table-column-success" v-if="scope.row.checkStatus === 1">未审核</span>
                                <span class="table-column-fail" v-if="scope.row.checkStatus === 0">已审核</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" fixed="right" width="210" prop="checkStatus">
                            <template slot-scope="scope">
                                <el-link  @click.stop="view(scope.row)" :underline="false" type="info">详情</el-link>
                                <el-divider direction="vertical" v-if="scope.row.checkStatus === 1"></el-divider>
                                <el-link  @click="edit(scope.row)" :underline="false" type="warning" v-if="scope.row.checkStatus === 1">编辑</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link  @click.stop="addQuo(scope.row)" :underline="false" type="primary">添加报价单</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <div class="page-pagination">
                        <pagination-comp @currentChange="currentChange" :currentPage="searchOptions.currentPage" :total="searchOptions.total" />
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
import contractApi from '@/api/contract-api'
export default {
    /* 合同列表 */
    name: 'contractlist-page',
    data() {
        return {
            multipleSelection: [],
            searchOptions: {
                currentPage: 1, //当前页码
                pageSize: 20, //每页显示条数
                total: 0,
                name:'',
                type:''
            },
            typeList:[],
            tableData: []  
        }
    },
    created() {
        this.getList()
        this.getTemList()
    },
    methods: {
        /* 获取合同数据 */
        getList() {
            contractApi.listContract(this.searchOptions).then( res => {  
                const data = res.data.data
                if(data) {
                    this.tableData = data.list;
                    this.searchOptions.total=data.total;
                }
            }).catch(function (res) {
                console.log(res);
            });
        },
        // 获取模板类型
		getTemList() {
			contractApi.listNoPage().then((res) => {
                const data = res.data.data;
                if(data) this.typeList = data;
            }).catch((err) => console.log(err));
		},
        add(){
            this.$router.push({name:'contractlist-page-add'})
        },
        edit(rows){
            this.$router.push({name:'contractlist-page-edit',query:{type:'edit',id:rows.id}})
        },
        view(rows){
            this.$router.push({name:'contractlist-page-view',query:{type:'view',id:rows.id}})
        },
        addQuo(rows){
            this.$router.push({name:'contractlist-page-view',query:{type:'add',id:rows.id}})
        },
        // 翻页
        currentChange(val) {
            this.searchOptions.currentPage = val;
            this.getList();
        },
        /* table 选择 */
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
    }
}
</script>
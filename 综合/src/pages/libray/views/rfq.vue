<template>
    <div class="page-container">
        <div class="page-search clearfix">
            <el-input class="p-s-input" v-model.trim="searchOptions.name" placeholder="请输入报价单名称" size="mini" clearable></el-input>
            <el-button type="primary" size="mini" class="p-s-btn" @click="getList">搜索</el-button>
            <div class="p-s-btn-right">
                <el-button type="success" size="mini" title="新建" @click="add">新建</el-button>
                <!-- <el-button type="primary" size="mini" title="导出" @click="exportExcel">导出</el-button>
                <el-button type="warning" size="mini" title="批量导入" @click="importExcel">批量导入</el-button> -->
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
                        <el-table-column align="center" type="selection" fixed="left"  v-model.trim="multipleSelection" width="55"></el-table-column>
                        <el-table-column
                            align="center"
                            type="index"
                            fixed="left"
                            :index="$indexMethod(0,searchOptions.currentPage,searchOptions.pageSize)"
                            label="序号"
                            width="80"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            show-overflow-tooltip
                            label="供应商">
                            <template slot-scope="scope">
                                 <el-link type="primary" slot="reference" :underline="false">{{scope.row.name}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="user"
                            show-overflow-tooltip
                            label="联系人"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="phone"
                            show-overflow-tooltip
                            label="联系电话"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="company"
                            show-overflow-tooltip
                            label="供应商"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="companyTel"
                            show-overflow-tooltip
                            label="公司电话"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="companyFax"
                            show-overflow-tooltip
                            label="公司传真"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="companyAddress"
                            show-overflow-tooltip
                            label="公司地址"
                        ></el-table-column>
                        <el-table-column align="center" label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-link  @click="edit(scope.row)" :underline="false" type="warning">编辑</el-link>
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
export default {
    /* 询价单 */
    name: 'rfq-page',
    data() {
        return {
            multipleSelection: [],
            searchOptions: {
                currentPage: 1, //当前页码
                pageSize: 20, //每页显示条数
                total: 0,
                name: '',
                totalPrice: ''
            },
            tableData: [
                {
                    name: '省队消防采购询价单', 
                    user: '曹卫平',
                    phone: '18182620907',
                    company: '陕西国瑞安防技术有限公司', 
                    companyTel: '029-86190910',
                    companyFax: '029-86190910',
                    companyAddress: '陕西省西安市未央区凤城二路新世纪大厦',
                }
            ]
        }
    },
    methods: {
        /* 询价单编辑 */
        edit(row) {

        },
        add(){
            this.$router.push({name:'rfq-add-page'})
        },
        /* 获取报价单数据 */
        getList() {

        },
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
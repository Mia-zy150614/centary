<template>
    <div class="pagination-wrap" v-show="totalNumber">
        <span class="page-info">{{firstnumber}}-{{lastnumber}}条,&nbsp;共{{totalNumber}}条</span>
        <div class="main">
            <!--<el-button class="first" @click="firstpage">首页</el-button>-->
            <el-pagination
                background
                layout="prev, pager, next,jumper"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentpage"
                :page-size="pageSize"
                :page-sizes="[10, 50]"
                :total="totalNumber"
            ></el-pagination>
            <!--<el-button class="last" @click="lastpage">尾页</el-button>-->
        </div>
    </div>
</template>
<script>
export default {
    name: "pagination-comp",
    props: {
        total: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            currentpage: this.currentPage,
            firstnumber: 0,
            lastnumber: 0,
            totalNumber: this.total
        };
    },
    watch: {
        currentPage: function(n) {
            if (n) {
                this.currentpage = n;
                this.changenumber(n);
            }
        },
        total(n){
            if(n !== null){
                this.totalNumber = n
                this.changenumber(this.currentpage)
            }
        }
    },
    created() {
        this.changenumber(this.currentpage);
    },
    methods: {
        handleCurrentChange(val) {
            this.currentpage = val;
            this.$emit("currentChange", val);
        },
        handleSizeChange(val) {
            this.$emit("sizeChange", val)
        },
        firstpage() {
            this.$emit("currentChange", 1);
            this.currentpage = 1;
        },
        lastpage() {
            const last = Math.ceil(parseInt(this.totalNumber) / parseInt(this.pageSize));
            this.$emit("currentChange", last);
            this.currentpage = last;
        },
        changenumber(currentPage) {
            this.firstnumber = (currentPage - 1) * this.pageSize + 1;
            this.lastnumber = currentPage * this.pageSize >= this.totalNumber ? this.totalNumber : currentPage * this.pageSize;
        }
    }
};
</script>
<style lang="scss" scoped>
    .pagination-wrap {
        overflow: hidden;
        // position: absolute;
        // left: 0;
        // bottom: 6px;
        // width: 100%;
        color: #999999;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        z-index: 1;
        .page-info {
            letter-spacing: 2px;
            color: #666666;
        }
        .main {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .first,.last {
                cursor: pointer;
                padding: 6px 11px;
                border: 1px solid #cccccc;
                border-radius: 0px;
                transition: all 0.2s ease-in;
                background-color: #fafafa;
                outline-style: none;
                color: #999999;
                background: #ffffff;
                &:hover {
                    color: #fafafa;
                    background-color: $basictheme-color;
                    border: 1px solid $basictheme-color;
                }
            }
        }
    }
</style>

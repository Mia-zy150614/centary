<template>
	<div class="page-container page-info">
		<div class="scroll-wrap p-i-section">
			<el-scrollbar class="scroll-wrap-bar">
				<div class="page-search clearfix">
					<el-form :inline="true" :model="formData" :rules="formRules">
						<el-form-item label="询价名称" prop="rfqName" class="p-i-form-item-content">
							<el-select v-model="formData.rfqName" placeholder="请输入询价名称" clearable size="small">
								<el-option v-for="item in rfqOptions" :key="item.id" :label="item.name" :value="item.value">
									{{ item.name }}
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="项目名称" prop="projectName" class="p-i-form-item-content">
							<el-select v-model="formData.projectName" placeholder="请输入项目名称" clearable size="small">
								<el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.value">
									{{ item.name }}
								</el-option>
							</el-select>
						</el-form-item>
						<div class="p-s-btn-right">
								<el-button type="success" size="mini" title="添加">添加</el-button>
								<el-button class="btn" type="primary" @click="submitSave" size="small">保存</el-button>
                                <el-button class="btn" type="info" size="small" @click="cancel">取消</el-button>
							</div>
					</el-form>
				</div>
				<div class="page-content">
					<div class="page-content-list">
						<div class="page-search p-i-title clearfix">
							<span class="line"></span>
							<span class="text">询价单列表</span>
						</div>
						<!-- 询价单列表 -->
						<el-form ref="rfqForm" :model="rfqInfoForm" :rules="rfqInfoForm.paramsRules">
							<el-table
								:data="rfqInfoForm.tableList"
								show-summary
								:summary-method="getSummaries"
								style="width: 100%">
								<el-table-column align="center" type="index" fixed="left" label="序号" width="80">
									<template slot-scope="scope">
										{{ scope.$index + 1 }}
									</template>
								</el-table-column>
								<el-table-column align="center" prop="id" label="编码">
								</el-table-column>
								<el-table-column prop="brand" label="规格/参数" align="center">
								</el-table-column>
								<el-table-column prop="model" label="型号" align="center">
								</el-table-column>
								<el-table-column prop="unit" label="单位" align="center">
								</el-table-column>
								<el-table-column label="数量" align="center">
									<template slot-scope="scope">
										<el-form-item :prop="'tableList.' + scope.$index + '.amount'" :rules="rfqInfoForm.paramsRules.amount">
											<el-input-number style="width: 100%" size="mini" v-model.number="scope.row.amount" :disabled="scope.row.unitPrice <= 0 || isDisable" :min="0" ></el-input-number>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column label="单价" align="center">
									<template slot-scope="scope">
										<el-form-item :prop="'tableList.' + scope.$index + '.unitPrice'">
											<el-input v-model="scope.row.unitPrice" size="mini" :rules="rfqInfoForm.paramsRules.unitPrice" clearable>
												<template slot="append">元</template>
											</el-input>
										</el-form-item>
									</template>
								</el-table-column>
								<el-table-column prop="totalPrice" label="总价" align="center">
								</el-table-column>
								<el-table-column align="center" prop="goodsImgStr" width="120" label="图片">
									<template slot-scope="scope">
										<viewimg-comp :options="{image: scope.row.goodsImgStr, smallImgShow: true, imgHeight: '40px'}" />
									</template>
                        		</el-table-column>
								<el-table-column align="center" label="操作" fixed="right">
									<template slot-scope="scope">
										<el-button size="mini" plain @click="del($event, scope.row)" type="danger" >删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</el-form>
					</div>
                    <div class="page-search p-i-title clearfix">
							<span class="line"></span>
							<span class="text">货物列表</span>
						</div>
					<div class="page-content-scroll-warp goodslist-warp">
                            <div class="page-search  clearfix">
                                <el-input class="p-s-input" size="mini" v-model.trim="searchOptions.goodsName" placeholder="请输入货物名称" clearable></el-input>
                                <el-button type="primary" size="mini" class="p-s-btn" @click="getGoodsList">搜索</el-button>
                                <el-popover placement="bottom" trigger="click" popper-class="high-search-popover" ref="high-search-popover">
                                    <el-button :type="isHighSearch?'primary': null" size="mini" slot="reference" class="p-s-high-search">
                                        <svg class="icon-svg" aria-hidden="true">
                                            <use xlink:href="#icon-highsearch"></use>
                                        </svg>
                                        <span>高级搜索</span>
                                    </el-button>
                                    <div class="high-search-content">
                                        <el-form ref="high-search-popover-form" label-width="80px" :model="searchOptions" :rules="searchRules" label-position="right" class="high-search-popover-form">
                                            <el-form-item label="货物名称：" prop="goodsName" >
                                                <el-input size="mini" v-model.trim="searchOptions.goodsName" placeholder="请输入货物名称" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="大类类型：" prop="bigType">
                                                <el-input size="mini" v-model.trim="searchOptions.bigType" placeholder="请输入大类类型" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="厂商：" prop="firm">
                                                <el-input size="mini" v-model.trim="searchOptions.firm" placeholder="请输入厂商" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="品牌：" prop="brand">
                                                <el-input size="mini" v-model.trim="searchOptions.brand" placeholder="请输入品牌" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="型号：" prop="type">
                                                <el-input size="mini" v-model.trim="searchOptions.type" placeholder="请输入型号" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="款式：" prop="design">
                                                <el-input size="mini" v-model.trim="searchOptions.design" placeholder="请输入款式" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="成本价：">
                                                <div class="el-input-interval">
                                                    <el-form-item prop="startCostPrice" class="el-input-interval-inner" :rules="searchRules.startCostPrice">
                                                        <el-input  size="mini" v-model.trim="searchOptions.startCostPrice" placeholder="最低价" clearable></el-input>
                                                    </el-form-item>
                                                    <div class="input-line">~</div>
                                                    <el-form-item prop="endCostPrice" class="el-input-interval-inner" :rules="searchRules.endCostPrices">
                                                        <el-input  size="mini" v-model.trim="searchOptions.endCostPrice" placeholder="最高价" clearable></el-input>
                                                    </el-form-item>
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="销售价：">
                                                <div class="el-input-interval">
                                                    <el-form-item prop="startSalesPrice" class="el-input-interval-inner" :rules="searchRules.startSalesPrice">
                                                        <el-input  size="mini" v-model.trim="searchOptions.startSalesPrice" placeholder="最低价" clearable></el-input>
                                                    </el-form-item>
                                                    <div class="input-line">~</div>
                                                    <el-form-item prop="endSalesPrice" class="el-input-interval-inner" :rules="searchRules.endSalesPrice">
                                                        <el-input  size="mini" v-model.trim="searchOptions.endSalesPrice" placeholder="最高价" clearable></el-input>
                                                    </el-form-item>
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="时间：" prop="time">
                                                <el-date-picker
                                                    v-model="searchOptions.time"
                                                    type="daterange"
                                                    size="mini"
                                                    range-separator="-"
                                                    value-format="yyyy-MM-dd"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="联系人：" prop="contactPerson">
                                                <el-input size="mini" v-model.trim="searchOptions.contactPerson" placeholder="请输入联系人" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="联系电话：" prop="phone">
                                                <el-input size="mini" v-model.trim="searchOptions.phone" placeholder="请输入联系电话" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="投标参数：" prop="tenderParams">
                                                <el-input size="mini" v-model.trim="searchOptions.tenderParams" placeholder="请输入投标参数" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="招标参数：" prop="bidsParams">
                                                <el-input size="mini" v-model.trim="searchOptions.bidsParams" placeholder="请输入招标参数" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="优先等级：" prop="orderNum">
                                                <el-input size="mini" v-model.trim="searchOptions.orderNum" placeholder="请输入优先等级" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="风险等级：" prop="dangerNum">
                                                <el-input size="mini" v-model.trim="searchOptions.dangerNum" placeholder="请输入风险等级" clearable></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div class="high-search-popover-form-submit">
                                            <el-button type="primary" size="mini" class="p-s-btn" @click="$hideSubmit(getGoodsList, $refs['high-search-popover'])">确定</el-button>
                                            <el-button type="info" size="mini" class="p-s-btn" @click="$hideReset($refs['high-search-popover-form'].resetFields)">重置</el-button>
                                        </div>
                                    </div>
                                </el-popover>
                            </div>
                            <el-table 
                                :data="tableData" 
                                style="width: 100%"
                                header-cell-class-name="custom-el-table-header-class"
                                cell-class-name="custom-el-table-cell-class-name"
								@select = 'handleRowClick'
                            >
                                <el-table-column align="center" type="selection" fixed="left"  v-model.trim="multipleSelection" width="55"></el-table-column>
                                <el-table-column
                                    align="center"
                                    type="index"
                                    fixed="left"
                                    label="序号"
                                    width="80"
                                ></el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="bigType"
                                    show-overflow-tooltip
                                    label="大类类型">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="name"
                                    show-overflow-tooltip
                                    width="180"
                                    label="货物名称">
                                    <template slot-scope="scope">
                                        <el-popover placement="right" trigger="hover" width="800">
                                            <el-link type="primary" slot="reference" :underline="false">{{scope.row.name}}</el-link>
                                            <div class="goods-popover">
                                                <table class="organization-table" width="100%" borderColor="#eeeeee" cellspacing='0' cellpadding="5" border="1">
                                                    <thead>
                                                        <tr>
                                                            <th class="t-header-th" align="center" colspan="2">货物信息表</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th width="20%">大类类型</th>
                                                            <td>{{scope.row.bigType || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">货物名称</th>
                                                            <td>{{scope.row.name || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">厂商</th>
                                                            <td>{{scope.row.firm || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">品牌</th>
                                                            <td>{{scope.row.brand || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">型号</th>
                                                            <td>{{scope.row.type || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">款式</th>
                                                            <td>{{scope.row.design || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">成本价</th>
                                                            <td>{{scope.row.costPrice || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">销售价</th>
                                                            <td>{{scope.row.salesPrice || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">联系人</th>
                                                            <td>{{scope.row.contactPerson || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">联系电话</th>
                                                            <td>{{scope.row.phone || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">图片</th>
                                                            <td>
                                                                <viewimg-comp :options="{image: scope.row.goodsImg, smallImgShow: true}" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">产品资料</th>
                                                            <td>
                                                                <viewimg-comp :options="{image: scope.row.productImg, smallImgShow: true}" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">投标参数</th>
                                                            <td>{{scope.row.tenderParams || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">招标参数</th>
                                                            <td>{{scope.row.bidsParams || '-'}}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="20%">备注</th>
                                                            <td>{{scope.row.remark || '-'}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="firm"
                                    show-overflow-tooltip
                                    label="厂商">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="brand"
                                    show-overflow-tooltip
                                    label="品牌">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="type"
                                    show-overflow-tooltip
                                    label="型号">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="design"
                                    show-overflow-tooltip
                                    label="款式">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="costPrice"
                                    show-overflow-tooltip
                                    width="140"
                                    label="成本价(元)">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="salesPrice"
                                    show-overflow-tooltip
                                    width="140"
                                    label="销售价(元)">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="contactPerson"
                                    show-overflow-tooltip
                                    label="联系人">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="phone"
                                    show-overflow-tooltip
                                    label="联系电话">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="goodsImgStr"
                                    width="120"
                                    label="图片">
                                    <template slot-scope="scope">
                                        <viewimg-comp :options="{image: scope.row.goodsImgStr, smallImgShow: true, imgHeight: '40px'}" />
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="productImgStr"
                                    width="120"
                                    label="产品资料">
                                    <template slot-scope="scope">
                                        <viewimg-comp :options="{image: scope.row.productImgStr, smallImgShow: true, imgHeight: '40px'}" />
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="tenderParams"
                                    show-overflow-tooltip
                                    label="投标参数">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="bidsParams"
                                    show-overflow-tooltip
                                    label="招标参数">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="remark"
                                    show-overflow-tooltip
                                    label="备注">
                                </el-table-column>
								<el-table-column
									align="center"
									prop="orderNum"
									label="优先等级"
									width="150px">
									<template slot-scope="scope">
										<div class="block">
											<el-rate
												v-model="scope.row.orderNum"
												disabled
												:colors="colors">
											</el-rate>
										</div>
									</template>
								</el-table-column>
								<el-table-column
									align="center"
									prop="dangerNum"
									label="风险等级"
									width="150px">
									<template slot-scope="scope">
										<div class="block">
											<el-rate
												v-model="scope.row.dangerNum"
												disabled
												:colors="colors">
											</el-rate>
										</div>
									</template>
								</el-table-column>
                            </el-table>
                    </div>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>
<script>
import goodsApi from "@/api/goods-api";
export default {
	name: "quotation-info-page",
	data() {
		return {
			searchOptions: {
				goodsName: "", //货物名称
				bigType: "", //大类类型
				firm: "", //厂商
				brand: "", //品牌
				type: "", //型号
				design: "", //款式
				time: [],
				startCostPrice: "", //成本价start
				endCostPrice: "", // 成本价end
				startSalesPrice: "", //销售价start
				endSalesPrice: "", //销售价end
				contactPerson: "", //联系人
				phone: "", //联系电话
				tenderParams: "", //投标参数
				bidsParams: "", //招标参数
				orderNum:null,  //优先等级
				dangerNum:null,  //危险等级
			},
			searchRules: {
				startCostPrice: [
					{ validator: this.validateStartPrice, trigger: "blur" },
				],
				endCostPrice: [{ validator: this.validateEndPrice, trigger: "blur" }],
				startSalesPrice: [
					{ validator: this.validateStartSalesPrice, trigger: "blur" },
				],
				endSalesPrice: [
					{ validator: this.validateEndSalesPrice, trigger: "blur" },
				],
			},
			formData: {
				rfqName: "", // 询价名称
				projectName: "", // 项目名称
			},
			formRules: {
				projectName: [
					{ required: true, message: "项目名称不能为空", trigger: "blur" },
				],
				rfqName: [
					{ required: true, message: "询价名称不能为空", trigger: "blur" },
				],
			},
			rfqOptions: [],
			projectOptions: [],
			tableData: [],
			multipleSelection: [],
			rfqInfoForm: {
				tableList: [],
				paramsRules: {
					amount: [
						{
							required: true,
							message: "货物数量不能为空",
							trigger: ["blur", "change"],
						},
						{
							type: "number",
							message: "货物数量必须为数字值",
							trigger: "change",
						},
					],
					unitPrice: [
						{
							required: true,
							message: "货物单价不能为空",
							trigger: ["blur", "change"],
						},
					],
				},
			},
			sum: 0, //合计
			capital: "", //大写金额
			tender: false, //投标参数
			bidding: false, //招标参数
			isDisable: false,
			isHighSearch: false,
			colors:['#e7f56c','#F7BA2A','#e91a13'], //评分颜色
		};
	},
	created() {
		this.getGoodsList();
	},
	methods: {
		getTime() {
			console.log(this.searchOptions.time);
		},
		// 获取所有货物列表
		getGoodsList() {
			goodsApi.noPageList().then((res) => {
					const data = res.data.data;
					this.tableData = data;
					this.tableData.map(item=>{
						item.orderNum = item.orderNum/2
						item.dangerNum = item.dangerNum/2
					})
				})
				.catch((err) => {
					console.log(err);
				});
		},
		// 删除
		del(e, row) {
			console.log(e, row);
		},
		/* 报价单保存 */
		submitSave() {
			const params = {
				rfqName: this.formData.rfqName,
				projectName:this.formData.projectName,
				tableList:this.rfqInfoForm.tableList
			};
			console.log(params);
		},
		/* 取消返回 */
		cancel() {
			this.$router.push({ name: "quotation-page" });
		},
		/* table 选择 */
		handleSelectionChange(rows) {
			this.multipleSelection = rows;
			console.log(rows);
		},
		handleRowClick(selection, row){
			console.log(row);
			console.log(selection);
			// const list = []
			// this.rfqInfoForm.tableList.push(selection)
		},
		// 合计
		getSummaries(param) {
			const { columns, data } = param;
			const sums = [];
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = "合计";
					return;
				}
				const values = data.map((item) => Number(item[column.property]));
				if (column.property == "totalPrice") {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr);
						if (!isNaN(value)) {
							return prev + curr;
						} else {
							return prev;
						}
					}, 0);
					sums[index];
				}
			});
			return sums;
		},
		// // 计算总价
		// getSum(){
		//     let initialValue = 0;
		//     let sum = this.rfqInfoForm.tableList.reduce(function (accumulator, currentValue) {
		//         return accumulator + currentValue.totalPrice;
		//     },initialValue)
		//     this.sum = sum.toFixed(2)
		//     this.capital = this.toString(sum)
		// },
		// 数值转大写
		toString(n) {
			if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
				return "数据非法"; //判断数据是否大于0
			}
			var unit = "千百拾亿千百拾万千百拾元角分",
				str = "";
			n += "00";
			var indexpoint = n.indexOf("."); // 如果是小数，截取小数点前面的位数
			if (indexpoint >= 0) {
				n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
			}
			unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
			for (var i = 0; i < n.length; i++) {
				str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i); //遍历转化为大写的数字
			}
			return str
				.replace(/零(千|百|拾|角)/g, "零")
				.replace(/(零)+/g, "零")
				.replace(/零(万|亿|元)/g, "$1")
				.replace(/(亿)万|壹(拾)/g, "$1$2")
				.replace(/^元零?|零分/g, "")
				.replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果
		},
		// 校验最低成本价
		validateStartPrice(rule, value, callback) {
			let reg = /^\d+(\.\d+)?$/;
			if (!reg.test(value)) {
				return callback(new Error("输入格式不正确"));
			} else {
				this.searchOptions.startCostPrice = Number(value).toFixed(2);
				callback();
			}
		},
		// 校验最高成本价validateStartSalesPrice
		validateEndPrice(rule, value, callback) {
			let reg = /^\d+(\.\d+)?$/;
			if (!reg.test(value)) {
				return callback(new Error("输入格式不正确"));
			} else {
				if (value <= this.searchOptions.startCostPrice) {
					return callback(new Error("请输入有效数值"));
				} else {
					this.searchOptions.endCostPrice = Number(value).toFixed(2);
					callback();
				}
			}
		},
		// 校验最低销售价
		validateStartSalesPrice(rule, value, callback) {
			let reg = /^\d+(\.\d+)?$/;
			if (!reg.test(value)) {
				return callback(new Error("输入格式不正确"));
			} else {
				this.searchOptions.startSalesPrice = Number(value).toFixed(2);
				callback();
			}
		},
		// 校验最高销售价
		validateEndSalesPrice(rule, value, callback) {
			let reg = /^\d+(\.\d+)?$/;
			if (!reg.test(value)) {
				return callback(new Error("输入格式不正确"));
			} else {
				if (value <= this.searchOptions.startSalesPrice) {
					return callback(new Error("请输入有效数值"));
				} else {
					this.searchOptions.endSalesPrice = Number(value).toFixed(2);
					callback();
				}
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.page-container .page-content {
	padding: 0px;
}
   .submit-btn-warp{
        text-align: center;
        margin: 20px auto;
    }
    
    .page-content-list{
        margin-bottom: 20px;
        .page-content-list-warp{
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }
    }
    .subtitle{
        font-weight: 600;
        margin-bottom: 20px;
    }
    /deep/.el-input-group__append, .el-input-group__prepend{
        padding: 0px 10px;
    }
    /deep/.el-input__inner {
        height: 32px;
        line-height: 32px;
        outline: none;
        padding: 0 5px;
        text-align: center;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    /deep/.el-form-item__label{
        line-height: 32px;
    }
    /deep/.el-form-item__content {
        line-height: 32px;
    }
    /deep/.el-form-item{
      margin: 5px 0;
    }
    .goodslist-warp{
        .page-search{
            padding: 10px 0;
        }
    }
</style>

<template>
  <div class="page-container page-info">
		<div class="p-i-section">
			<div class="p-i-title clearfix">
					<span class="line"></span>
					<span class="text">用户基本信息</span>
			</div>
			<div class="p-i-content">
				<el-form ref="infoForm" :model="userinfoForm" :rules="userRules" label-width="100px" label-position='right' class="p-i-form">
					<div class="p-i-form-item clearfix">
						<el-form-item label="用户名：" class="p-i-form-item-content" prop="username">
							<el-input v-model.trim="userinfoForm.username" placeholder="请输入账号" :disabled="disUsername" clearable size="small"></el-input>
						</el-form-item>
						<el-form-item label="姓名："  class="p-i-form-item-content" prop="name" clearable>
							<el-input v-model.trim="userinfoForm.name" placeholder="请输入姓名" :disabled="isDisable" clearable size="small"></el-input>
						</el-form-item>	
					</div>
					<div  class="p-i-form-item clearfix">
						<el-form-item  label="所属部门："  class="p-i-form-item-content"  prop="deptName" :rules="[{required: true, message: '所属部门必选', trigger: 'blur'}]">
							<el-select style="width: 100%" v-model="userinfoForm.deptName" :disabled="isDisable" placeholder="请选择部门" ref="deptSelect" size="small">
								<el-option :value="[]" style="width: auto; height: auto; background-color:#fff">
									<el-tree
										:highlight-current = false
										:default-expand-all = true
										:expand-on-click-node=true
										:data="parentTreeData"
										:filter-node-method="$filterNode"
										@node-click="selectDeptClassfy">
										<span  slot-scope="{ node}">
												<span>{{ node.label}}</span>
										</span>
									</el-tree>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="角色："  class="p-i-form-item-content" prop="roleIds">
								<el-select v-model="userinfoForm.roleIds" placeholder="请选择角色" :disabled="isDisable" multiple filterable clearable size="small">
										<el-option
												v-for="item in userinfoForm.roleOptions"
												:key="item.id"
												:label="item.label"
												:value="item.id">
												{{item.label}}
										</el-option>
								</el-select>
						</el-form-item>
					</div>
					<div  class="p-i-form-item clearfix">
							<el-form-item label="数据范围："  class="p-i-form-item-content" prop="dataRange">
									<el-select v-model="userinfoForm.dataRange" placeholder="请选择数据范围" :disabled="isDisable" clearable size="small">
											<el-option
													v-for="item in angeOptions"
													:key="item.value"
													:label="item.label"
													:value="item.value">
													{{item.label}}
											</el-option>
									</el-select>
							</el-form-item>
							<el-form-item label="用户状态："  class="p-i-form-item-content" prop="unableState">
									<el-select v-model="userinfoForm.unableState" placeholder="请选择用户状态" :disabled="isDisable" clearable size="small">
											<el-option
													v-for="item in unableStates"
													:key="item.value"
													:label="item.label"
													:value="item.value">
													{{item.label}}
											</el-option>
									</el-select>
							</el-form-item>
					</div>
					<div  class="p-i-form-item clearfix" v-if="!isView">
							<el-form-item label="用户密码："  class="p-i-form-item-content" prop="password">
									<el-input :type="`${pwsshow?'text':'password'}`" v-model.trim="userinfoForm.password" placeholder="请输入用户密码" :disabled="isDisable" clearable size="small">
											<i slot="suffix" :class="['el_icon_reset', pwsshow?'eyes_close_icon':'eyes_open_icon']" @click.stop="pwsShow"></i>
									</el-input>
							</el-form-item>
							<el-form-item label="确认密码："  class="p-i-form-item-content" prop="checkPassword" clearable>
									<el-input :type="`${pwsshow?'text':'password'}`" v-model.trim="userinfoForm.checkPassword" placeholder="请输入确认密码" :disabled="isDisable" clearable size="small">
											<i slot="suffix" :class="['el_icon_reset', pwsshow?'eyes_close_icon':'eyes_open_icon']" @click.stop="pwsShow"></i>
									</el-input>
							</el-form-item>
					</div>
					<div  class="p-i-form-item clearfix">
							<el-form-item label="职位："  class="p-i-form-item-content" prop="location">
									<el-select v-model="userinfoForm.location" placeholder="请选择用户状态" :disabled="isDisable" clearable size="small">
											<el-option
													v-for="item in locationOptions"
													:key="item.value"
													:label="item.name"
													:value="item.value">
													{{item.name}}
											</el-option>
									</el-select>
							</el-form-item>
					</div>
					<div  class="p-i-form-item clearfix">
							<el-form-item label="备注：" class="p-i-form-item-content large remark" prop="remark">
									<el-input type="textarea" v-model="userinfoForm.remark" :disabled="isDisable"></el-input>
							</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<div class="p-i-section">
			<div class="p-i-content">
					<div class="p-i-form-item submit-wrap">
						<el-button class="el_button_reset el_button_reset_batch" size="small" @click="cancel">取消</el-button>
						<el-button class="el_button_reset el_button_reset_batch" size="small" @click="resetForm('infoForm')" v-if="!isDisable">清空</el-button>
						<el-button class="el_button_reset el_button_reset_batch" type="primary" size="small" :disabled="preventSecondarySubmit" v-if="!isDisable"  @click="saveSubmit('infoForm')">保存</el-button>
					</div>
			</div>
		</div>
  </div>
</template>

<script>
import userApi from "@/api/user-api";
import roleApi from "@/api/role-api";
import deptApi from "@/api/dept-api";
import dictDataApi from "@/api/dictdata-api"
export default {
	name:'userinfo-page',
	data() {
		//用户名正则，6到20位（字母，数字，特殊字符）
		var validateUserName = (rule, value, callback) => {
				var that = this;
				if (value != null && value != "") {
						var params = {
								id: that.userinfoForm.id,
								uniqueFiled: "username",
								uniqueFiledValue: value,
						};
						userApi.checkUnique(params).then(function(res) {
								if (res.data) {
										callback();
								} else {
										callback(new Error("账号已存在，请重新输入"));
								}
						}).catch(function(res) {
								console.log(res);
						});
				} else {
						callback();
				}
		};
		//正则表达式验证（字母，数字，特殊字符）
		var validatePassword = (rule, value, callback) => {
				var reg = /^([a-zA-Z]|[0-9]|[a-zA-Z0-9]|[a-zA-Z0-9!#$%^&*-_()]){6,20}$/;
				if (value != null && value != "") {
						if (!(value.length >= 6 && value.length <= 20)) {
								callback(new Error("用户密码长度6-20"));
								return;
						}
						if (!reg.test(value)) {
								callback(
										new Error("密码格式不正确，应为字母、数字、特殊字符长度6-20")
								);
								return;
						}
				}
				callback();
		};
		var validateCheckPassword = (rule, value, callback) => {
				var reg = /^([a-zA-Z]|[0-9]|[a-zA-Z0-9]|[a-zA-Z0-9!#$%^&*-_()]){6,20}$/;
				if (value != null && value != "") {
						if (!(value.length >= 6 && value.length <= 20)) {
								callback(new Error("用户密码长度6-20"));
								return;
						}
						if (!reg.test(value)) {
								callback(
										new Error("密码格式不正确，应为字母、数字、特殊字符长度6-20")
								);
								return;
						}
				}
				if (this.userinfoForm.password != value) {
						
						callback(new Error("确认密码和密码保持一致！"));
						return;
				}
				callback();
		};
		var validateRoleIds=(rule,value,callback)=>{
			if(value != null&&value.length>5){
					callback(new Error("用户最多可选择5个角色"));
					return;
			}
				callback();
		};
		return {
				userinfoForm: {
						id: "",
						username: "",
						name: "",
						roleIds: [],
						roleOptions:[],
						password: "",
						checkPassword: "",
						unableState: 1,
						remark: "",
						createUserId: "",
						deptId:"",
						deptName:"",
						dataRange:"",
						location:"",
				},
				unableStates: [
						{
								value: 1,
								label: "启用"
						},
						{
								value: 2,
								label: "禁用"
						}
				],
				isView:false,
				isDisable:false,
				vertifyFail: false, // 新增用户提交校验不通过
				userRules: {
						username: [
								{
										required: true,
										message: "用户名不能为空"
								},
								{
										validator: validateUserName,
										trigger: "blur"
								}
						],
						name: [
								{
										required: true,
										message: "姓名不能为空"
								},
								{
										max: 10,
										message: "姓名不能超过10个字符",
										trigger: "blur"
								}
						],
						password: [
								{
										validator: validatePassword,
										trigger: "blur"
								},
								{
										required: true,
										message: "密码不能为空"
								}
						],
						checkPassword: [
								{
										validator: validateCheckPassword,
										trigger: "blur"
								},
								{
										required: true,
										message: "确认密码不能为空"
								}
						],
						dataRange: [
								{
										required: true,
										message: "数据范围必选",
										trigger: "blur"
								}
						],
						location: [
								{
										required: true,
										message: "职位必选",
										trigger: "blur"
								}
						],
						remark: [
								{
										max: 50,
										message: "备注长度必须在1到50个字之间",
										trigger: "blur"
								}
						],
						roleIds:[
								{
										validator:validateRoleIds,
										trigger:"blur"
								},
								{
										required: true,
										message: "角色必填"
								}
						]
				},
				pwsshow: false, //密码是否铭文显示
				preventSecondarySubmit: false, // 阻止二次提交
				parentTreeData:[],
				angeOptions:[],
				locationOptions:[],
				disUsername:true,
		}
	},
	created(){
		const {type,id} = this.$route.query;
		if(id){
				if(type === 'view'){
					this.isDisable = true;
				}
				this.isView = true;
				this.edit(id);
		}else{
				this.getUserNameMax();
		}
		this.disUsername = true;
		this.getAllDeptTree();
		this.getRangeOptions();
		this.getDictByType();
	},
	methods: {
		//获取职位类型
		getDictByType() {
				dictDataApi.queryByModel({type: "location"}).then( res => {
						this.locationOptions = res.data.data;
				}).catch(err => console.log(err));
		},
		//获取账号
		getUserNameMax() {
				userApi.getUserNameMax().then( res => {
						this.userinfoForm.username = res.data.data;
				}).catch(err => console.log(err));
		},
		//角色
		showSubRoleTree(deptId) {
				var that = this;
				roleApi.getRoleByCreateUserId({deptId:deptId})
						.then(function(res) {
								if (res.data.success) {
										that.userinfoForm.roleOptions = res.data.data;
								} else {
										that.userinfoForm.roleOptions = [];
								}
						})
						.catch(function(res) {
								console.log(res);
						});
		},
		//数据范围
		getRangeOptions() {
				var that = this;
				userApi.getRangeOptions()
						.then(function(res) {
								if (res.data.success) {
										that.angeOptions = res.data.data;
								} else {
										that.angeOptions = [];
								}
						})
						.catch(function(res) {
								console.log(res);
						});
		},
		//查询权限内的单位
		getAllDeptTree() {
				const params = {
						// deptType:"1"
				}
				deptApi.getAllDeptTree(params).then( res => {
						this.parentTreeData = res.data.data;
				}).catch(function (res) {
						console.log(res);
				});
		},
		//编辑信息
		edit(id) {
				var that = this;
				userApi.getUserInfoById(id).then(function(res) {
								that.userinfoForm.id = res.data.data.id;
								that.userinfoForm.username = res.data.data.username;
								that.userinfoForm.name = res.data.data.name;
								that.userinfoForm.roleIds = res.data.data.roleIds;
								that.userinfoForm.unableState = res.data.data.unableState;
								that.userinfoForm.remark = res.data.data.remark;
								that.userinfoForm.createUserId = res.data.data.createUserId;
								that.userinfoForm.deptId = res.data.data.deptId;
								that.userinfoForm.deptName = res.data.data.deptName;
								that.userinfoForm.dataRange = res.data.data.dataRange;
								that.userinfoForm.location = res.data.data.location;
								that.showSubRoleTree(res.data.data.deptId);
						})
						.catch(function(res) {
								console.log(res);
						});
		},
		// 保存提交
		saveSubmit(form_name) {
				var that = this;
				if(this.preventSecondarySubmit) return
				this.preventSecondarySubmit = true
				this.$refs[form_name].validate(valid => {
						if (valid) {
								const {id,username, name,roleIds,password,checkPassword,unableState,remark,createUserId,dataRange,deptId,location} = that.userinfoForm
								
								userApi.saveUser({id,username, name,roleIds,password,checkPassword,unableState,remark,createUserId,dataRange,deptId,location}).then(function(res) {
										if (res.data.success) {
												that.$notify({
														title: "成功",
														message: "保存成功",
														type: "success",
														duration: 500,
														onClose(){
																that.$router.push({ name: "user-page" });
																that.preventSecondarySubmit =  false
														}
												});
										} else {
												that.$notify({
														title: "保存失败",
														message: res.data.msg,
														type: "warning",
														duration: 2000
												});
												that.preventSecondarySubmit = false
										}
								}).catch(function(res) {
										that.preventSecondarySubmit = false
										console.log(res);
								});
						} else {
								if (!this.vertifyFail) {
										this.$notify({
												title: "失败",
												message: "请填写完整信息",
												type: "warning",
												duration: 2000
										});
										this.vertifyFail = true;
								}
								console.log("error submit!!");
								this.preventSecondarySubmit = false
								return false;
						}
				});
		},
		// 清空 form
		resetForm(form_name) {
				this.$refs[form_name].resetFields();
				this.userinfoForm.roleOptions = [];
		},
		// 取消返回
		cancel(){
				this.$router.go(-1)
		},
		// 密码是否明文
		pwsShow() {
				this.pwsshow = !this.pwsshow
		},
		selectDeptClassfy(data) {
				if(data.deptType !==2) {
						this.$message({
								message: "请选择部门",
								type: "warning"
						});
						return;
				}
				this.userinfoForm.deptName = data.label;
				this.userinfoForm.deptId = data.id;
				this.showSubRoleTree(data.id);
				this.$refs.deptSelect.blur();
				this.userinfoForm.roleIds = ''
		},
	}
}
</script>

<style>

</style>
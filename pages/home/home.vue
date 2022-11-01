<template>
	<view class="">

		<view class="box-top">
			<view class="box-left">
				设备总数
				<qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
			</view>


			<view class="box-right">
				<view class="alarm-right">
					一级
				</view>
				<view class="alarm-right">
					2级
				</view>
				<view class="alarm-right">
					3级
				</view>
				<view class="alarm-right">
					4级
				</view>
			</view>

		</view>


		<view class="box-center">
			<view class="equip-center">
				<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @change="changeHandler"
					@cancel="show = false"></u-picker>
				<u-button @click="show = true">打开</u-button>
			</view>
			<view class="equip-center">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u-form>
					<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true; hideKeyboard()"
						ref="item1">
						<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u-form>

				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showSex = false" @select="sexSelect">
				</u-action-sheet>
			</view>
			<view class="" style="width: 100%;">
				<u-cell-group>
					<u-cell @click="showSex = true; hideKeyboard()" icon="share" v-model="model1.userInfo.sex"
						title="停车坐爱枫林晚" :isLink="true" arrow-direction="right"></u-cell>
				</u-cell-group>
			</view>
			<!-- <view class="equip-center">
				设备
			</view> -->
		</view>

		<view class="box-footer">

			<view class="equip-footer" v-for="(item,index) in 20" :key="index">
				设备
				<u-cell-group>
					<u-cell @click="showSex = true; hideKeyboard()" icon="share" v-model="model1.userInfo.sex"
						title="停车坐爱枫林晚" :isLink="true" arrow-direction="right" size="large" label="描述信息">

						<view slot="title" class="u-slot-title">
							<text class="u-cell-text">单元格</text>
							<u-tag text="标签" plain size="mini" type="warning">
							</u-tag>
						</view>

					</u-cell>
				</u-cell-group>
			</view>

		</view>
	</view>


</template>

<script>
	import {
		login
	} from "@/api/system/home.js"
	export default {
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['arcbar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: undefined,
					title: {
						name: "80%",
						fontSize: 35,
						color: "#2fc25b"
					},
					subtitle: {
						name: "设备总数",
						fontSize: 25,
						color: "#666666"
					},
					extra: {
						arcbar: {
							type: "default",
							width: 12,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
							linearType: "custom"
						}
					}
				},
				showSex: false,
				model1: {
					userInfo: {
						name: 'uView UI',
						sex: '',
					},
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false,
				show: false,
				columns: [
					['中国', '美国', '日本']
				],
				columnData: [
					['深圳', '厦门', '上海', '拉萨'],
					['得州', '华盛顿', '纽约', '阿拉斯加']
				]
			}
		},
		onLoad() {
			this.ceshi()
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			// this.$refs.form1.setRules(this.rules);
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							name: "正确率",
							color: "#2fc25b",
							data: 0.8
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				this.show = false
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			ceshi() {
				login().then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	//头部
	.box-top {
		background-color: rgba(4, 53, 105, 0.7);

		height: 300rpx;
		display: flex;
		justify-content: space-around;

		.box-left {
			width: 48%;
			height: 200rpx;
		}

		.box-right {
			width: 48%;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
		}

		.alarm-right {
			background-color: aqua;
			width: 48%;
			height: 48%;
		}
	}

	//中间
	.box-center {
		background-color: bisque;
		height: 350rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.equip-center {
			background-color: silver;
			width: 49%;
			height: 49%;
		}
	}

	.box-footer {
		background-color: forestgreen;
		height: 100%;
		overflow: scroll;

		.equip-footer {
			background-color: whitesmoke;
			height: 300rpx;
			border-bottom: 1rpx solid #ccc;
		}

	}
</style>

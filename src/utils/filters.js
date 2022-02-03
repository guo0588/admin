/** 表单验证 金额*/
/** 可以输入正负数字并且只能保留两位小数*/
export function amountVerification() {
	return (rule, value, callback) => {
		const reg = /^-?\d+(,\d{3})*(\.\d{1,2})?$/
		if (!value) {
			callback(new Error('请输入价格'))
		} else if (Number(value) !== 0 && !Number(value)) {
			callback(new Error('请输入数字值'))
		} else {
			if (reg.test(value)) {
				callback()
			} else {
				callback(new Error('请输入正确的格式且保留两位小数'))
			}
		}
	}
}

/** 验证整数*/
export function integer() {
	return (rule, value, callback) => {
		const regex = /^-?\d+$/
		if (Number(value) !== 0 && !Number(value)) {
			return callback(new Error('请输入数字'))
		} else if (!regex.test(value)) {
			return callback(new Error('请输入正确的格式'))
		}
	}
}

/** 正整数*/
export function positiveInteger() {
	return (rule, value, callback) => {
		const regex = /^\+?[0-9]\d*$/
		if (Number(value) !== 0 && !Number(value)) {
			return callback(new Error('请输入数字'))
		} else if (!regex.test(value)) {
			return callback(new Error('请输入正确的格式'))
		}
	}
}


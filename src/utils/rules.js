export function getRules (vue) {
  return {
    userAccount: [
      { validator: (rule, value, callback) => {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          if (value) {
            callback(new Error('请输入正确的账号'))
          } else {
            callback(new Error('请输入账号'))
          }
        }
      },
      trigger: 'blur' },
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    phoneNumber: [
      { validator: (rule, value, callback) => {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          if (value) {
            callback(new Error('请输入正确的手机号'))
          } else {
            callback(new Error('请输入手机号'))
          }
        }
      },
      trigger: 'blur' },
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ]
  }
}

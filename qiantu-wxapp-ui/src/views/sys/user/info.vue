<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <template>
        <el-tabs @tab-click="switchTab">
          <el-tab-pane label='信息管理' name='userManager'/>
          <el-tab-pane label='密码管理' name='passwordManager'/>
        </el-tabs>
      </template>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form :model="ruleForm2"
                     :rules="rules2"
                     class="demo-ruleForm"
                     label-width="100px"
                     ref="ruleForm2"
                     v-if="switchStatus==='userManager'">
              <el-form-item label="用户名"
                            prop="username">
                <el-input disabled
                          type="text"
                          v-model="ruleForm2.username"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input placeholder="验证码登录使用" v-model="ruleForm2.phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('ruleForm2')"
                           type="primary">提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-form :model="ruleForm2"
                     :rules="rules2"
                     class="demo-ruleForm"
                     label-width="100px"
                     ref="ruleForm2"
                     v-if="switchStatus==='passwordManager'">
              <el-form-item label="原密码"
                            prop="password">
                <el-input auto-complete="off"
                          type="password"
                          v-model="ruleForm2.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="newpassword1">
                <el-input auto-complete="off"
                          type="password"
                          v-model="ruleForm2.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认密码"
                            prop="newpassword2">
                <el-input auto-complete="off"
                          type="password"
                          v-model="ruleForm2.confirmPassword"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('ruleForm2')" size="small"
                           type="primary">提交
                </el-button>
                <el-button @click="resetForm('ruleForm2')" size="small">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>


<script>
    import {mapState} from 'vuex'
    import store from "@/store";
    import request from '@/router/axios'

    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (this.ruleForm2.newPassword !== '') {
                    if (value !== this.ruleForm2.confirmPassword) {
                        callback(new Error('两次输入密码不一致!'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            };
            return {
                switchStatus: '',
                avatarUrl: '',
                show: false,
                headers: {
                    Authorization: 'Bearer ' + store.getters.access_token
                },
                ruleForm2: {
                  username: '',
                  oldPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                  avatar: '',
                  phone: ''
                },
                rules2: {
                  oldPassword: [{required: true, min: 6, message: '原密码不能为空且不少于6位', trigger: 'change'}],
                  newPassword: [{required: false, min: 6, message: '不少于6位', trigger: 'change'}],
                  confirmPassword: [{required: false, validator: validatePass, trigger: 'blur'}]
                }
            }
        },
        created() {
            this.ruleForm2.username = this.user.username;
            this.ruleForm2.phone = this.user.phone;
            this.switchStatus = 'userManager'
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            }),
        },
        methods: {
            switchTab(tab, event) {
                this.switchStatus = tab.name
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                      // 修改密码
                      if (this.switchStatus === 'passwordManager') {
                        request({
                          url: '/account/change-password',
                          method: 'post',
                          data: this.ruleForm2
                        }).then(response => {
                          if (response.code) {
                            this.$notify({
                              title: '成功',
                              message: '修改成功',
                              type: 'success',
                              duration: 2000
                            });
                            // 修改密码之后强制重新登录
                            this.$store.dispatch('logOut').then(() => {
                              location.reload() // 为了重新实例化vue-router对象 避免bug
                            })
                          } else {
                            this.$notify({
                              title: '失败',
                              message: response.message,
                              type: 'error',
                              duration: 2000
                            })
                          }
                        }).catch(() => {
                          this.$notify({
                            title: '失败',
                            message: '修改失败',
                            type: 'error',
                            duration: 2000
                          })
                        })
                      }else {

                      }
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px !important;
    color: #8c939d !important;
    width: 178px !important;
    height: 178px !important;
    line-height: 178px !important;
    text-align: center !important;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

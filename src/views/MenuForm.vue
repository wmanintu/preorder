<template>
  <div>
    <el-button icon="el-icon-arrow-left" @click="redirectTo('menu-list')"></el-button>
    <h1>Create Menu</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Title" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        desc: '',
        timestamp: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input menu title', trigger: 'blur' },
          { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
        ],
        desc: [
          { required: false, message: 'Please input menu description', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      createMenu: 'Menus/createMenu'
    }),
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            let docRef = await this.createMenu(this.ruleForm)
            if (docRef) {
              this.$message('success')
              this.$router.push({ name: 'menu-list' })
            }
          } catch (error) {
            this.$message.error('error')
          }
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    redirectTo (routeName) {
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style scoped>
</style>

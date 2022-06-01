<template>
  <div class="login-container">
    <div class="login-container--background" />
    <el-form class="login-form" ref="loginForm" :model="formData" :rules="formRule" autocomplete="on" label-position="left">

      <div class="login-form--title">
        <h3>
          {{ applicationName }}
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input 
          ref="username" 
          size="small"
          v-model="formData.username" 
          :placeholder="$t('common.username')" 
          name="username" 
          type="text" 
          tabindex="1" 
          autocomplete="on" 
          @keyup.enter="handleLogin"
        />
      </el-form-item>

      <el-tooltip v-model:visible="showCapsTooltip" :content="$t('common.tips.caps_lock_is_on')" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="key" />
          </span>
          <el-input 
            ref="password"
            size="small"
            v-model="formData.password"
            :type="showPassword ? '' : 'password'"
            :placeholder="$t('common.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="showCapsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="togglePassword">
            <svg-icon :icon-class="showPassword ? 'eye' : 'eye-close'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        size="default"
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.prevent="handleLogin"
      >
        {{ $t('common.login') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { PARAM_KEYS } from '@/consts'
import { deepClone, getCookie, setCookie } from '@/utils'

import settings from '@/../settings'
const config = settings.security.password
const encrypt = (function(){
  if (typeof config.encrypt === 'function') {
    return config.encrypt
  }
  return a => { return a }
})()

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      callback()
    }
    return {
      formData: {
        username: null,
        password: null
      },
      formRule: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      showPassword: false,
      showCapsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  computed: {
    applicationName() {
      return this.$settings[PARAM_KEYS.SYSTEM_TITLE] || settings.title
    },
    settings() {
      return settings
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    window.localStorage.removeItem('impersonate_ticket')
  },
  mounted() {
    if (this.formData.username === '') {
      this.$refs.username.focus()
    } else if (this.formData.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.showCapsTooltip = true
        } else {
          this.showCapsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.showCapsTooltip === true) {
        this.showCapsTooltip = false
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      const formData = deepClone(this.formData)
      formData.password = encrypt(formData.password)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('subscriber/login', formData)
            .then(() => {
              if (this.redirect && this.redirect.startsWith('http')) {
                window.location.href = this.redirect
              }
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            })
            .catch((e) => {
              console.log(e)
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$dark_gray:#889aa4;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-container--background {
    position: fixed; 
    width: 100%; 
    height: 100%; 
    overflow: hidden; 
    background: url(login.jpg); 
    background-repeat: repeat-y; 
    background-size: 100% auto;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .login-form--title {
    position: relative;

    h3 {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    .el-input__wrapper {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0;
      color: #fff;
      height: 47px;
      caret-color: #fff;
      box-shadow: none;
      width: 100%;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
      
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

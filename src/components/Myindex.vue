<template>
  <div class="login">
    <div class="login-img">
      <!-- 顶部图片 -->
      <div class="image"></div>
      <span>{{title}}</span>
    </div>
    <!-- 提交部分 -->
    <div v-show="!$store.state.islogin">
      <div class="login-box">
        <div class="login-body">
          <van-cell-group v-show="!isBlock">
            <van-field class="username" v-model="users.username" placeholder="手机号码"/>
            <van-field
              class="password"
              v-model="users.password"
              type="password"
              placeholder="密码"
              right-icon="browsing-history"
            />
          </van-cell-group>
          <van-cell-group v-show="isBlock">
            <van-field class="username" v-model="users.phoneCode" placeholder="手机号码"/>
            <van-field class="password" v-model="valueCode" center clearable placeholder="请输入短信验证码">
              <van-button
                @click="sendCode"
                slot="button"
                class="send-b"
                size="small"
                type="primary"
                :disabled="isDisble"
              >{{msg}}</van-button>
            </van-field>
          </van-cell-group>

          <van-button @click="entryCode" type="info" class="info" v-model="infodl">{{infodl}}</van-button>
          <van-button type="info" v-model="infozc" class="info-xx" @click="sendChange">{{infozc}}</van-button>
        </div>

        <!-- 忘记密码 -->
        <div class="login-span">
          <span class="span-one">立即注册</span>
          <span class="line">|</span>
          <span class="span-two">忘记密码？</span>
        </div>

        <!-- logo部分 -->
        <div class="login-logo">
          <a href="#">
            <span>其他方式登录</span>
          </a>
          <div class="logo">
            <div>
              <img src="../assets/weibo.png" alt width="30px" height="26px">
            </div>
            <van-icon name="alipay" size="29.9996px" class="alipy"/>
            <div>
              <img src="../assets/WeChat.png" alt width="30px" height="26px">
            </div>
          </div>
        </div>
      </div>
      <!-- 底部文件切换 -->
      <div class="login-bottom">
        <span class="span-b">简体</span>
        <span>|</span>
        <span class="span-b">繁体</span>
        <span>|</span>
        <span class="span-b">English</span>
        <span>|</span>
        <span class="span-b">常见问题</span>
        <span>|</span>
        <span class="span-b">隐私政策</span>
      </div>
    </div>
    <!-- 登录状态 -->
    <div class="myindex" v-show="$store.state.islogin">
      <div class="ul-line"></div>
      <ul class="ul-vip">
        <li class="vip">
          <van-icon name="video" class="icon-vip" color="#f33"/>
          <van-cell title="电影订单" is-link url="#" class="van-text"/>
        </li>
        <li class="vip">
          <van-icon name="shopping-cart" class="icon-vip" color="#c96"/>
          <van-cell title="商城订单" is-link url="#" class="van-text"/>
        </li>
      </ul>
      <div class="ul-line"></div>
      <ul class="ul-vip">
        <li class="vip">
          <van-icon name="eye" class="icon-vip" color="#666"/>
          <van-cell title="在线观影" is-link url="#" class="van-text"/>
        </li>
        <li class="vip">
          <van-icon name="gem" class="icon-vip" color="#ffff33"/>
          <van-cell title="优惠卡" is-link url="#" class="van-text"/>
        </li>
        <li class="vip">
          <van-icon name="vip-card" class="icon-vip" color="#3cc"/>
          <van-cell title="折扣卡" is-link url="#" class="van-text"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Cell, Field, CellGroup, Button, Dialog } from "vant";
import valueFrom from "./valueFrom/valueFrom.js";

export default {
  name: "Myindex",
  data() {
    return {
      //存储验证后信息
      valuecode: "",
      isDisble: false,
      msg: "发送验证码",
      isBlock: false,
      infodl: "登录",
      infozc: "手机短信登录/注册",
      //短信验证码
      valueCode: "",
      // 标题
      title: "小喵账号登录",
      //用户v-model单次
      users: {
        phoneCode: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 手机号验证
    sendCode() {
      var v = valueFrom.sendCode();
      //手机验证
      if (valueFrom.valuePhone(this.users.phoneCode)) {
        // console.log(v);
        valueFrom.alert(v);
        this.valuecode = v;
        //发送验证码按钮
        var time = 20;
        this.msg = time + "s后重新发送";
        this.isDisble = true;
        var timer = setInterval(() => {
          if (time <= 0) {
            this.msg = "发送验证码";
            this.isDisble = false;
            clearInterval(timer);
          } else {
            this.msg = --time + "s后重新发送";
          }
        }, 1000);
      } else {
        valueFrom.alert("输入正确手机号");
      }
    },
    //注册登录账号
    entryCode() {
      if ((this.valueCode == this.valuecode) & (this.valuecode.length == 6)) {
        valueFrom.alert("登录成功");
        this.goLogin();
      } else {
        valueFrom.alert("验证码错误");
      }
    },
    //登录方式切换或注册
    sendChange() {
      if (this.isBlock == false) {
        this.isBlock = true;
        this.infodl = "立即登录/注册";
        this.infozc = "用户名密码登录";
      } else {
        this.isBlock = false;
        this.infodl = "登录";
        this.infozc = "手机短信登录/注册";
      }
    },
    // 登录状态
    goLogin() {
      this.$store.commit('changelo')
      this.title = "小喵已登录";
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Cell.name]: Cell
  }
};
</script>


<style lang="less" scoped>
div.login {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  padding: 40px 7% 50px;
  // 头部文本图片部分
  .login-img {
    padding-top: 29.9996px;
    padding-bottom: 5%;
    text-align: center;
    font-size: 18.0005px;
    .image {
      margin: 0 auto 14.9998px;
      border-radius: 50%;
      border: 1px solid #ff6700;
      width: 48.0001px;
      height: 48.0001px;
      background: url("../assets/cat.png") center no-repeat;
      background-size: 48px 48px;
    }
  }
}

// 输入框和按钮部分
div.login-box {
  padding-bottom: 19.9985px;
  margin-bottom: 29.9996px;
  div.login-body {
    .username,
    .password {
      border-bottom: 0.999px solid #ccc;
      margin-bottom: 3.0007px;
    }
    .info {
      margin-top: 19.9985px;
      border: none;
      width: 100%;
      background-color: #ff6700;
      border-radius: 10.0011px 10.0011px;
      font-size: 18.0005px;
    }
    .info-xx {
      margin: 19.9985px 0;
      border: 1px solid #ddd;
      background-color: #fff;
      color: #000;
      width: 100%;
      font-size: 18.0005px;
      border-radius: 10.0011px 10.0011px;
    }
    .send-b {
      background: #fff;
      color: rgba(4, 144, 209, 0.747);
      border: none;
      font-size: 14.0008px;
    }
  }
}

// 忘记密码
div.login-box .login-span {
  text-align: center;
  .span-two,
  .span-one {
    padding: 0 10.0011px;
    color: #999;
  }
  .line {
    color: #000;
  }
}
// logo
.login-logo {
  text-align: center;
  padding-top: 40.0007px;

  span {
    color: #999;
    font-size: 11.9991px;
  }
  .logo {
    div {
      display: inline-block;
      margin: 0 5px;
    }
    margin-top: 10.0011px;
    .alipy {
      color: rgba(4, 144, 209, 0.747);
    }
  }
}

// 底部样式
div.login-bottom {
  width: 100%;
  max-width: 740px;
  display: block;
  margin: 0 auto 89.9988px;
  text-align: center;
  color: #999;
  font-size: 14.0008px;
  .span-b {
    text-align: center;
    padding: 0 4.9987px;
  }
}
.myindex ul {
  width: 100%;
}
// 订单展示部分
.myindex .ul-vip > li {
  position: relative;
  height: 52.9988px;
  // 图标
  .icon-vip {
    left: 14.9998px;
    top: 14.9998px;
    font-size: 28px;
  }
  .van-text {
    position: absolute;
    width: 85%;
    top: 4.9987px;
    right: 0px;
    font-size: 17.0015px;
    border-bottom: 0.999px solid #ddd;
    padding-bottom: 14.9998px;
    padding-left: 0;
  }
}
// 中间线
div.ul-line {
  width: 100%;
  height: 15px;
  background-color: #f5f5f5;
}
</style>



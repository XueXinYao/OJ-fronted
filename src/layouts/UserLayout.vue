<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/logo.png" />
          <div>X O J</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"
        ><a href="http://localhost:8080">Oj By Xxy</a></a-layout-footer
      >
    </a-layout>
  </div>
</template>

<script></script>
<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .header {
  margin-top: 16px;
  margin-bottom: 16px;
  //box-shadow: #eee 1px 1px 5px;
}

#userLayout .content {
  background: linear-gradient(to right, #eee, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
#userLayout .logo {
  width: 64px;
  height: 64px;
}
</style>

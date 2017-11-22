<template>
<div id="logout">
  <br>
  <h3> You have been logged out successfully.</h3>
</div>
</template>

<script>
import request from 'superagent';

import router from '../router'

export default {
  name: 'logout',
  data() {
    return {
      title: 'BBQ Journal',
      page: 'Log Out',
      fieldData: {},
      authFail: false,
      noAuth: true
    }
  },
  mounted() {
    if (!localStorage.user_id) {
      router.push('/login')
    } else {
      localStorage.removeItem("user_id");
      localStorage.removeItem("id_token");
      localStorage.removeItem("put_id");
      localStorage.removeItem("put_index");
      localStorage.setItem("logged_out", true);
      router.push('/')
    }
  }
}
</script>

<style scoped>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: tan;
}

html {
  background-color: grey;
}

h1,
h2 {
  font-weight: normal;
  color: orange;
  text-shadow: 1px 1px 1px grey;

}

h3 {
  font-weight: normal;
  color: aqua;
  text-shadow: 1px 1px 1px grey;

}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

p {
  color: grey;
}

.box-entry {
  margin: 5px;
  margin-top: 15px;
  border: solid 1px tan;
  padding-bottom: 5px;
}

.top-field {
  margin: 15px;
  border-bottom: solid tan 2px;
  margin-bottom: 95px;
}

.field {
  padding-top: 15px;
  margin: 5px;
}

.center-box {
  line-height: 40px;
  height: 40px;
  vertical-align: middle;
}

.form-box {
  line-height: 1.5;
  display: inline-block;
  text-align: left;
  padding-left: 20px
}

.validate-box {
  padding-left: 20px
}

.field-desc {
  padding-left: 20px
}

.field-entry {
  padding-left: 20px
}

.form-input {
  padding-top: 55px
}

.fortypercent {
  width: 40%;
  margin: auto
}

.timeField {
  width: 45%;
}

#hours {
  margin: 5px
}

#mins {
  margin: 5px
}

.formField {
  margin-bottom: 8px
}

.slideup {
  margin-bottom: -1px
}

.slideupsixpx {
  margin-bottom: -6px
}

.formsections {
  border: 1px solid lightgrey;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 12px;
  padding-left: 12px;
}

.marginauto {
  display: block;
	margin: auto;
	width: 50%;
}

.shadowed {
  text-shadow: 1px 1px 1px grey;
}*/
</style>

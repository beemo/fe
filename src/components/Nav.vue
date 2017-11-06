<template>
<div id="app">
  <b-navbar class="navtop" toggleable="md" type="light" variant="info">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-navbar-brand href="/">{{ title }}</b-navbar-brand left>
    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item-dropdown text="Links" color="orange" right>
        <b-dropdown-item href="/#/create">Create</b-dropdown-item>
        <b-dropdown-item href="/#/list">Entries</b-dropdown-item>
        <b-dropdown-item v-show="noAuth" href="/#/login">Login</b-dropdown-item>
        <b-dropdown-item v-show="!noAuth" href="/#/logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'

export default {
  name: 'nav',
  data() {
    return {
      title: 'BBQ Journal',
      noAuth: true
    }
  },
  mounted() {
    self = this
      if (localStorage.user_id) {
        self.noAuth = false
      }
  }
}
</script>

<style>
#app {
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
  color: dodgerblue;
  text-shadow: 1px 1px 1px grey;
}

h5 {
  font-weight: normal;
  color: dodgerblue;
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
  color: orange;
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
  border-radius: 5px;
  background-color: lightgrey;
}

.shadowed {
  text-shadow: 1px 1px 1px grey;
}

.lighted {
  : 1px 1px 1px orange;
}
</style>

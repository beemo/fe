<template>
<div id="signup">
  <br>
  <h1> {{ title }} </h1>
  <h3 class="shadowed"> {{ page }}</h3>

  <div class="fortypercent">
      <b-form @submit="postEntry()">

        <b-form-group id="creds" label-for="creds">

          <b-form-input placeholder="First and Last Name" id="user" type="text" v-model="fieldData.user" required class="formField">
          </b-form-input>
          <b-form-input placeholder="Email" id="email" type="email" v-model="fieldData.email" required class="formField">
          </b-form-input>
          <b-form-input placeholder="Password" id="password" type="password" v-model="fieldData.password" required class="formField">
          </b-form-input>

        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="secondary">Reset</b-button>
      </b-form>
      <br>
  </div>

  <!-- <button v-on:click="postEntry()" :disabled='isDisabled'> Submit</button> -->

</div>
</template>

<script>
import request from 'superagent';

import router from '../router'

export default {
  name: 'signup',
  data() {
    return {
      title: 'BBQ Journal',
      page: 'Sign Up',
      fieldData: {}
    }
  },
  mounted() {
    var self = this;
    if ( localStorage.user_id || localStorage.id_token ) {
      router.push('/list')
    }
  },
  methods: {
    postEntry() {
      var self = this;
      var entry = {
        'profile': {
          'name': self.fieldData.user
        },
        'email': self.fieldData.email,
        'password': self.fieldData.password,
        'confirmPassword': self.fieldData.password
      };
      console.log('entry: ', entry)
      request
        .post('http://' + window.location.hostname + ':3000/api/signup')
        .send(entry)
        .end((entry, err, res) => {
          localStorage.setItem('id_token', res.body.token)
          localStorage.setItem('user_id', res.body.user._id)

          console.log('yay got ' + JSON.stringify(localStorage.user_id) + ' ' + JSON.stringify(localStorage.id_token));
          localStorage.removeItem("localStorage.logged_out");

          console.log('entry: ', entry, 'err: ', err, 'res: ', res)
        });
        router.push('/list')

    },
    Loggit() {
      var self = this
      console.log(self)
    }
  }
  // axios({
  //     method: 'post',
  //     url: 'http://' + window.location.hostname + ':3000/api/entries/',
  //     headers: {
  //       'cache-control': 'no-cache',
  //       'postman-token': '192bb095-0757-4c2d-9656-94b0845fb3ec',
  //       'content-type': 'application/json',
  //       accept: '*/*'
  //     },
  //     data: {
  //       'title': 'Beef',
  //       'user': '59ee0773a679dae37518e076'
  //     }
  //   })
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
}
</script>

<style scoped>
/*
.fortypercent {
  width: 40%;
  margin: auto
}*/

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

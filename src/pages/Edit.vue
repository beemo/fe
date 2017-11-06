<template>
<div id="app">
  <h3 v-if="!putSuccessful">{{ page }}</h3>
  <div class="fortypercent" v-if="authorized">
    <h5 v-if="putSuccessful">BBQ Journal Entry Edited Successfully.</h5>
    <b-button v-if="sendBack" class="lighted" variant="primary" v-on:click="redirectList()">Back</b-button>

    <div v-if="!putSuccessful">

      <b-form @submit="putEntry()">

        <!-- <b-form-group class="formsections" id="titleOnly" label-for="entryTitle">
          <b-form-input placeholder="Entry Title" id="title" type="text" v-model="fieldData.title" required class="formField">
          </b-form-input> -->
        <!-- </b-form-group> -->
        <b-form-group label="Entry title:">
          <b-form-input id="title" type="text" v-model="fieldData.title" class="formField" required></b-form-input>
        </b-form-group>
        <!--
        <h5 class="slideup">Ingredients</h5>
        <b-form-group class="formsections" id="ingredients" placeholder="Ingredients" label-for="ingredients">

          <b-form-input id="meat" placeholder="Meat" type="text" v-model="fieldData.ingredients.meat" required class="formField"></b-form-input>
          <b-form-input id="marinade" placeholder="Marinade" type="text" v-model="fieldData.ingredients.marinade" class="formField"></b-form-input>
          <span class="field-desc"><b>Injection Used: </b></span>
          <b-form-input id="injection" placeholder="Injection" type="text" v-model="fieldData.ingredients.injection" class="formField"></b-form-input>
          <b-form-input id="rub" placeholder="Rub" type="text" v-model="fieldData.ingredients.rub" class="formField"></b-form-input>
          <b-form-input id="sauce" placeholder="Sauce" type="text" v-model="fieldData.ingredients.sauce" class="formField"></b-form-input>
        </b-form-group> -->

        <h5 class="slideup">Ingredients</h5>
        <div class="form-section">
          <b-form-group label="Meat:">
            <b-form-input id="meat" type="text" v-model="fieldData.ingredients.meat" class="formField" required></b-form-input>
          </b-form-group>
          <b-form-group label="Marinade:">
            <b-form-input id="marinade" type="text" v-model="fieldData.ingredients.marinade"></b-form-input>
          </b-form-group>
          <b-form-group label="Injection:">
            <b-form-input id="injection" type="text" v-model="fieldData.ingredients.injection"></b-form-input>
          </b-form-group>
          <b-form-group label="Rub:">
            <b-form-input id="rub" type="text" v-model="fieldData.ingredients.rub"></b-form-input>
          </b-form-group>
          <b-form-group label="Sauce:">
            <b-form-input id="sauce" type="text" v-model="fieldData.ingredients.sauce"></b-form-input>
          </b-form-group>
        </div>
        <br>
        <h5>The Cook</h5>
        <div class="form-section">

          <b-form-group class="slideupsixpx" label="Smoker Model:">
            <b-form-input type="text" id="smoker" v-model="fieldData.cook.smokerModel"></b-form-input>
          </b-form-group>
          <b-form-group label="BBQ Tempurature:">
            <b-form-input type="number" id="temp" v-model="fieldData.cook.temp" required></b-form-input>
          </b-form-group>
          <b-form-group label="Type of Wood:">
            <b-form-input type="text" id="woodtype" v-model="fieldData.cook.woodtype"></b-form-input>
          </b-form-group>
          <b-form-group class="slideupsixpx" label="How long was your cook?">

            <!-- <p class="slideupsixpx">How long was your cook?</p> -->
            <br>
            <div>
              <p class="slideupsixpx"> Hours&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minutes</p>
            </div>
            <b-row class="time ">
              <b-form-input placeholder="Hours" type="number" id="hours" class="timeField" v-model="fieldData.cook.cookTime.hours"></b-form-input>
              <b-form-input placeholder="Minutes" type="number" id="mins" class="timeField" v-model="fieldData.cook.cookTime.mins"></b-form-input>
            </b-row>
          </b-form-group>

          <br>
          <div class="slideupsixpx">
            <b-form-group label="Did you use an Electric Heating Element?">
              <b-form-checkbox id="electricHeatingElement" v-model="fieldData.cook.electricHeatingElement">
              </b-form-checkbox>
            </b-form-group>

            <b-form-group label="Did you use Wood Pellets?">
              <b-form-checkbox id="pellets" v-model="fieldData.cook.pellets">
              </b-form-checkbox>
            </b-form-group>


            <b-form-group label="Did you use Charcoal?">
              <b-form-checkbox id="charcoal" v-model="fieldData.cook.charcoal">
              </b-form-checkbox>
            </b-form-group>

          </div>
        </div>
        <br>

        <h5>Results</h5>
        <div class="form-section">
          <b-form-group label="Appearance">
            <b-form-input type="number" id="appearance" v-model="fieldData.results.appearance"></b-form-input>
          </b-form-group>
          <b-form-group label="Texture">
            <b-form-input type="number" id="texture" v-model="fieldData.results.texture" class="formField"></b-form-input>
          </b-form-group>
          <b-form-group label="Flavor">
            <b-form-input type="number" id="flavor" v-model="fieldData.results.flavor" class="formField"></b-form-input>
          </b-form-group>
          <b-form-group label="Overall">
            <b-form-input type="number" id="overall" v-model="fieldData.results.overall" class="formField" required></b-form-input>
          </b-form-group>

        </div>

        <b-button class="lighted" type="submit" variant="primary">Update</b-button>
        <b-button class="lighted" type="reset" variant="secondary">Reset</b-button>
      </b-form>
      <br>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import request from 'superagent'

import router from '../router'


export default {
  name: 'app',
  data() {
    return {
      title: 'BBQ Journal',
      page: 'Edit a Journal Entry',
      fieldData: {
        title: '',
        ingredients: {},
        smokerModel: {},
        cook: {
          cookTime: {}
        },
        results: {}
      },
      putSuccessful: false,
      currentEntry: {},
      sendBack: false

    }
  },
  mounted() {
    this.putIdCheck;
  },
  computed: {
    authorized: function() {
      return localStorage.user_id || localStorage.id_token
    },
    putIdCheck: function() {
      var self = this
      if (!localStorage.put_id) {
        router.push('/list')

      }
      self.populateForm();
    }
  },
  methods: {
    populateForm() {
      // NOTE POPULATE FORM FROM LOCALSTORAGE.PUT_ID
      var self = this
      axios.get('http://127.0.0.1:3000/api/entries/' + localStorage.put_id)
        .then(function(response) {
          console.log(response.data)
          return response.data
        })
        .then(function(response) {
          console.log('jergins:', response)
          self.fieldData = response
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    putEntry() {
      // NOTE BIND DATA FROM CURRENTENTRY GET REQ TO V-MODEL DATA
      var self = this
      event.preventDefault()
      var entry = {
        'title': self.fieldData.title,
        'user': localStorage.user_id,
        'results': {
          'flavor': self.fieldData.results.flavor,
          'texture': self.fieldData.results.texture,
          'appearance': self.fieldData.results.appearance,
          'overall': self.fieldData.results.overall
        },
        'cook': {
          'smokerModel': self.fieldData.cook.smokerModel,
          'temp': self.fieldData.cook.temp,
          'woodType': self.fieldData.cook.woodType,
          'electricHeatingElement': self.fieldData.cook.electricHeatingElement,
          'pellets': self.fieldData.cook.pellets,
          'charcoal': self.fieldData.cook.charcoal,
          'cookTime': {
            'hours': self.fieldData.cook.cookTime.hours,
            'mins': self.fieldData.cook.cookTime.mins
          }
        },
        'ingredients': {
          'meat': self.fieldData.ingredients.meat,
          'marinade': self.fieldData.ingredients.marinade,
          'injection': self.fieldData.ingredients.injection,
          'slather': self.fieldData.ingredients.slather,
          'rub': self.fieldData.ingredients.rub,
          'sauce': self.fieldData.ingredients.sauce
        }
      }
      // NOTE UPDATE DB ENTRY VIA PUT REQUEST
      console.log('entry: ', entry)
      request
        .put('http://127.0.0.1:3000/api/entries/' + localStorage.put_id)
        .send(entry)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (res.status != '200') {
            return (err)
          }
          self.putSuccessful = true
          self.sendBack = true
        });
    },
    redirectList() {
      localStorage.put_id = ''
      router.push('/list')
    },
  }
}
</script>

<style>
.form-section {
  border: lightgrey 1px solid;
  border-radius: 5px;
  padding: 17px 7px 7px 17px;
}





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
}*/
</style>

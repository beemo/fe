<template>
<div id="app">
  <div v-cloak v-if="deleteOK">
    <br>
    <h3>Your previous entry was successfully deleted.</h3>
  </div>
  <div v-if="singleEntry">
    <hr>
    <b-container class="resultsbox">
      <h4 class="bordermargin shadowed-noblur">Cook Date: {{ cookDate }} - {{ singleEntry.title }} <span><b-button class="lighted upten" v-on:click="EditButton(singleEntry._id)" variant="primary">Edit</b-button> </span>
 </h4>
      <b-row>
        <b-col md="4" class="resultcolumn">
          <h5 class="tabletitle">Ingredients</h5>
          <div v-if="singleEntry.ingredients.meat" class="result-field"><b>Meat: </b>{{ singleEntry.ingredients.meat }}</div>
          <div v-if="singleEntry.ingredients.marinade" class="result-field"><b>Marinade: </b>{{ singleEntry.ingredients.marinade }}</div>
          <div v-if="singleEntry.ingredients.injection" class="result-field"><b>Injection: </b>{{ singleEntry.ingredients.injection }}</div>
          <div v-if="singleEntry.ingredients.slather" class="result-field"><b>Slather: </b>{{ singleEntry.ingredients.slather }}</div>
          <div v-if="singleEntry.ingredients.rub" class="result-field"><b>Rub: </b>{{ singleEntry.ingredients.rub }}</div>
          <div v-if="singleEntry.ingredients.sauce" class="result-field"><b>Sauce: </b>{{ singleEntry.ingredients.sauce }}</div>

        </b-col>

        <b-col md="4" class="resultcolumn">
          <h5 class="tabletitle">The Cook</h5>

          <div v-if="singleEntry.cook.smokerModel" class="result-field"><b>Smoker Model: </b>{{ singleEntry.cook.smokerModel }}</div>
          <div v-if="singleEntry.cook.temp" class="result-field"><b>Tempurature: </b>{{ singleEntry.cook.temp }}</div>
          <div v-if="singleEntry.cook.woodType" class="result-field"><b>Wood Type: </b>{{ singleEntry.cook.woodType }}</div>
          <div v-if="singleEntry.cook.cookTime.hours" class="result-field"><b>Cook Time: </b>{{ singleEntry.cook.cookTime.hours }} hours <span v-if="singleEntry.cook.cookTime.mins">{{ singleEntry.cook.cookTime.mins }} minutes</span></div>
          <div v-if="singleEntry.cook.electricHeatingElement" class="result-field"><b>Electric Heating Element:</b> yes</div>
          <div v-if="singleEntry.cook.pellets" class="result-field"><b>Wood Pellets:</b> yes</div>
          <div v-if="singleEntry.cook.charcoal" class="result-field"><b>Charcoal:</b> yes</div>

        </b-col>

        <b-col md="4" class="resultcolumn">
          <h5 class="tabletitle">Results</h5>

          <div v-if="singleEntry.results.appearance" class="result-field"><b>Appearance Results: </b>{{ singleEntry.results.appearance }}</div>
          <div v-if="singleEntry.results.texture" class="result-field"><b>Texture Results: </b>{{ singleEntry.results.texture }}</div>
          <div v-if="singleEntry.results.flavor" class="result-field"><b>Flavor Results: </b>{{ singleEntry.results.flavor }}</div>
          <div v-if="singleEntry.results.overall" class="result-field"><b>Overall Results: </b>{{ singleEntry.results.overall }}</div>

        </b-col>
      </b-row>
      <div v-show="imageSrc" class="container">
        <img :src="imageSrc" class="image">
      </div>
    </b-container>
  </div>
  <b-container v-show="authorized && hasEntries">
    <b-row class="text-center">
      <b-col>
        <h4 class="tabletitle">Entries List</h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="11" class="ml-md-auto p-11">
          <b-table hover :items=" items " :fields="[ 'title', 'rating', 'date'] " @row-clicked="getMore " @row-dblclicked="EditEntry ">
          </b-table>
      </b-col>
    </b-row>
  </b-container>
  <b-container v-if="!hasEntries" class="seventypercent box-entry ">
    <b-row>
      <h4 class="entriesoffset bordermargin shadowed-noblur ">You have no entries yet.</h4>
      <b-button @click="redirectCreate() " class="lighted " type="submit " variant="success ">Make one.</b-button><br><br>
    </b-row>
  </b-container>
</div>
</template>

<script>
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
import lodash from 'lodash'
import axios from 'axios'
import auto from 'run-auto'
// import { accordan, slide } from 'vue-strap'

import router from '../router'


export default {
  name: 'app',
  data() {
    return {
      title: 'BBQ Journal',
      entries: [],
      singleEntry: null,
      items: [],
      cookDate: '',
      imageSrc: '',
      photo_id: '',
      deleteOK: false
    }
  },
  mounted() {
    this.getEssentials();
    if (localStorage.deleteOK) {
      this.deleteOK = true
    };
    if (localStorage.put_id) {
      this.populatePut(localStorage.put_id)
      localStorage.removeItem("put_id")
    };
    if (!localStorage.id_token) {
      router.push('/login')
    }
  },
  computed: {
    authorized() {
      return localStorage.user_id || localStorage.id_token
    },
    hasEntries() {
      var self = this
      return self.items[0]
    }
  },
  methods: {
    getEntries() {
      var self = this
      console.log(localStorage.user_id)
      axios.get('http://' + window.location.hostname + ':3000/api/entries?user=' + localStorage.user_id)
        .then(function(response) {
          console.log(response.data)
          return response.data.entriesSchema
        })
        .then(function(response) {
          self.entries = response
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getEssentials() {
      var self = this
      var essentials = {
        title: '',
        results: {
          overall: ''
        },
        created: '',
        overall: ''
      }
      var arr = []
      console.log(localStorage.user_id)
      axios.get('http://' + window.location.hostname + ':3000/api/entries?user=' + localStorage.user_id)
        .then(function(response) {
          var validEntryArray = response.data.entriesSchema
          console.log('v:', validEntryArray)
          var garbage = _.remove(validEntryArray, function(n) {
            return !(n.created) || !(n.title) || !(n.results.overall)
          });
          validEntryArray = _.forEach(validEntryArray, function(object) {
            object.rating = object.results.overall
          })
          console.log('add rating', validEntryArray)
          return validEntryArray
        })
        .then(function(response) {
          var arr = []
          arr = _.forEach(response, function(object) {
            object.date = moment(object.created).format('l')
          })
          return arr
        })
        .then(function(response) {
          self.items = _.clone(response)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMore(entry, index) {
      var self = this
      var id = self.items[index]._id
      self.imageSrc = ''
      localStorage.removeItem("deleteOK");
      self.deleteOK = false;
      axios.get('http://' + window.location.hostname + ':3000/api/entries/' + id)
        .then(function(response) {
          console.log(response)
          self.singleEntry = response.data
          if (response.data.photo) {
            self.imageSrc = self.singleEntry.photo.vuePath
          }
          self.cookDate = moment(response.data.created).format('l')
          localStorage.removeItem("put_id");
          return
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // populatePut(entry) {
    //   var self = this
    //   var id = entry
    //   axios.get('http://' + window.location.hostname + ':3000/api/entries/' + id)
    //     .then(function(response) {
    //       self.singleEntry = response.data
    //       self.cookDate = moment(response.data.created).format('l')
    //       return
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    EditEntry(record, index) {
      var self = this
      localStorage.put_id = this.items[index]._id
      router.push('/edit')
    },
    EditButton(record, index) {
      console.log(record, index)
      var self = this
      localStorage.put_id = record
      router.push('/edit')
    },
    redirectCreate() {
      router.push('/create')
    },
  }
}
</script>

<style scoped>
.image {
  margin: 15px;
  border: lightgrey solid 2px;
  padding: 25px;
  max-width: 45%;
  max-height: 45%;
}




/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
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
  color: orange;
}

.box-entry {
  margin: 5px;
  margin-top: 15px;
  border: solid 1px lightgrey;
  padding-bottom: 5px;
}

.top-field {
  margin: 15px;
  border-bottom: solid lightgrey 2px;
  margin-bottom: 95px;
  color: black;
}

.field {
  padding-top: 15px;
  margin: 5px;
  color: black;
}

.resultcolumn {
  padding-top: 15px;
  border: solid 1px lightgrey;
}

.bordermargin {
  padding-top: 15px;
  border: solid 1px lightgrey;
  color: orange;
}

.centeralign {
  display: block;
}

.shadowed {
  text-shadow: 1px 1px 1px grey;
}

.shadowed-noblur {
  text-shadow: 1px 1px grey;
}

.seventypercent {
  width: 70%;
  margin: auto
}


.upten {
  margin-top: -15px;
  margin-left: 35px;
}
*/
</style>

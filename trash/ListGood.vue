<template>
<div id="app">
  <br>
  <h1> {{ title }} </h1>
  <h5 v-if="!authorized">Please log in <a href="#/login">here</a>.</h5>
  <h3 class="shadowed" v-if="authorized">This page will list all of your BBQ Journal entries.</h3>
  <br><br>
  <div v-if="singleEntry">
    <b-container fluid class="resultsbox">
      <h4 class="bordermargin shadowed-noblur">Cook Date: {{ singleEntry.date }} - {{ singleEntry.title }} <span><b-button class="lighted upten" v-on:click="EditButton(singleEntry._id)" variant="primary">Edit</b-button> </span>
 </h4>
      <b-row no-gutters>
        <b-col class="resultcolumn">

          <div v-if="singleEntry.ingredients.meat" class="result-field"><b>Meat: </b>{{ singleEntry.ingredients.meat }}</div>
          <div v-if="singleEntry.ingredients.marinade" class="result-field"><b>Marinade: </b>{{ singleEntry.ingredients.marinade }}</div>
          <div v-if="singleEntry.ingredients.injection" class="result-field"><b>Injection: </b>{{ singleEntry.ingredients.injection }}</div>
          <div v-if="singleEntry.ingredients.slather" class="result-field"><b>Slather: </b>{{ singleEntry.ingredients.slather }}</div>
          <div v-if="singleEntry.ingredients.rub" class="result-field"><b>Rub: </b>{{ singleEntry.ingredients.rub }}</div>
          <div v-if="singleEntry.ingredients.sauce" class="result-field"><b>Sauce: </b>{{ singleEntry.ingredients.sauce }}</div>

        </b-col>

        <b-col class="resultcolumn">

          <div v-if="singleEntry.cook.smokerModel" class="result-field"><b>Smoker Model: </b>{{ singleEntry.cook.smokerModel }}</div>
          <div v-if="singleEntry.cook.temp" class="result-field"><b>Tempurature: </b>{{ singleEntry.cook.temp }}</div>
          <div v-if="singleEntry.cook.woodType" class="result-field"><b>Wood Type: </b>{{ singleEntry.cook.woodType }}</div>
          <div v-if="singleEntry.cook.cookTime.hours" class="result-field"><b>Cook Time: </b>{{ singleEntry.cook.cookTime.hours }} hours <span v-if="singleEntry.cook.cookTime.mins">{{ singleEntry.cook.cookTime.mins }} minutes</span></div>
          <div v-if="singleEntry.cook.electricHeatingElement" class="result-field"><b>Electric Heating Element:</b> yes</div>
          <div v-if="singleEntry.cook.pellets" class="result-field"><b>Wood Pellets:</b> yes</div>
          <div v-if="singleEntry.cook.charcoal" class="result-field"><b>Charcoal:</b> yes</div>

        </b-col>

        <b-col class="resultcolumn">

          <div v-if="singleEntry.results.appearance" class="result-field"><b>Appearance Results: </b>{{ singleEntry.results.appearance }}</div>
          <div v-if="singleEntry.results.texture" class="result-field"><b>Texture Results: </b>{{ singleEntry.results.texture }}</div>
          <div v-if="singleEntry.results.flavor" class="result-field"><b>Flavor Results: </b>{{ singleEntry.results.flavor }}</div>
          <div v-if="singleEntry.results.overall" class="result-field"><b>Overall Results: </b>{{ singleEntry.results.overall }}</div>


        </b-col>
      </b-row>
    </b-container>

  </div>
  <div class="seventypercent box-entry" v-if="authorized">
    <h4 class="entriesoffset bordermargin shadowed-noblur">Entries List</h4>
    <b-table class="table-class" small hover :items="items" :fields="['title', 'rating', 'date']" @row-clicked="getMore" @row-dblclicked="EditEntry"></b-table>
    <br>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import BootstrapVue from 'bootstrap-vue'
import lodash from 'lodash'
import axios from 'axios'
// import { accordan, slide } from 'vue-strap'

import router from '../router'


export default {
  name: 'app',
  data() {
    return {
      title: 'BBQ Journal',
      entries: [],
      singleEntry: '',
      pleaseLogin: false,
      items: []

    }
  },
  mounted() {
    this.getEssentials();
    console.log(localStorage)


  },
  computed: {
    authorized() {
      return localStorage.user_id || localStorage.id_token
    }
  },
  methods: {
    getEntries() {
      var self = this
      console.log(localStorage.user_id)
      axios.get('http://127.0.0.1:3000/api/entries?user=' + localStorage.user_id)
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
      axios.get('http://127.0.0.1:3000/api/entries?user=' + localStorage.user_id)
        .then(function(response) {
          var validEntryArray = response.data.entriesSchema
          console.log('v:', validEntryArray)
          var garbage = _.remove(validEntryArray, function(n) {
            return !(n.created) ||!(n.title) || !(n.results.overall)
          });
          console.log('rrrrr:', validEntryArray)
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
          console.log('self.items: ', self.items)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    convertTime(_date) {
      var time = moment(_date).format('l');
      return time
    },
    getMore(entry, index) {
      var self = this
      // var id = self.items[index]._id
      var id = entry._id

      axios.get('http://127.0.0.1:3000/api/entries/' + id)
        .then(function(response) {
          console.log(response)
          self.singleEntry = response.data
          self.singleEntry.date = moment(response.data.created).format('l')
          return self.singleEntry
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    EditEntry(record, index) {
      var self = this
      localStorage.put_id = this.items[index]._id
      router.push('/edit')
    },
    EditButton(record) {
      var self = this
      localStorage.put_id = record
      router.push('/edit')
    },
    GetBoth() {
      var self = this
      auto({
        postText: function(callback) {
          request
            .post('http://127.0.0.1:3000/api/entries')
            .send(entry)
            .set('Accept', 'application/json')
            .end((err, res) => {
              if (err) {
                console.error('ENTRIES: FAIL - ', err)
                return err
              }
              if (res.status == '201') {
                var _body_id = res.body._id
                console.log('ENTRIES: SUCCESS - ', res)
              }
            })
          callback(err, null)
        },
        postImage: ['postText', function(results, callback) {
          console.log('in postImage', console.log(results))
          if (self.uploadImage) {
            request
              .post('http://localhost:3000/api/image')
              .attach('file', photo)
              // .field('user_id', localStorage.user_id)
              .field('user_id', localStorage.user_id)
              .field('entryId', self.entryId)
              .end((err, res) => {
                if (err) {
                  console.error('IMAGE: FAIL - ', err)
                  return err
                }
                if (res.status == '201') {
                  var _body_message = res.body.message

                  console.log('IMAGE: SUCCESS - ', res)
                }
              })
          }
          callback(null, _body_message)
        }]
      }, function(err, results) {
        self.entrySuccessful = true
        console.log('err = ', err)
        console.log('results = ', results)
      })
    }
  }
  //     functionToFind(arr, key, valuetosearch) {
  //       var self = this
  //
  //       for (var i = 0; i < arr.length; i++) {
  //
  //         if (arr[i][key] == valuetosearch) {
  //           i = self.i
  //           return self.i;
  //         }
  //       }
  //       return null;
  //     },
  //     getMoreAndIndex(id, index) {
  //       console.log('index', index)
  //       var self = this
  //       axios.get('http://127.0.0.1:3000/api/entries/' + id)
  //         .then(function(response) {
  //           console.log(response)
  //           self.singleEntry = response.data
  //
  //           return self.singleEntry
  //         })
  //         .catch(function(error) {
  //           console.log(error);
  //         });
  //     }
}
</script>

<style>
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

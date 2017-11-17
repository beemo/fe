<template>
<div class="create">
  <h3 v-if="!entrySuccessful">{{ page }}</h3>
  <div class="fortypercent" v-if="authorized">
    <h5 v-if="entrySuccessful">Congrats! BBQ Journal Entry Successful.</h5>
    <div v-if="!entrySuccessful">

      <b-form @submit="postEntry()">

        <b-form-group class="formsections" id="titleOnly" label-for="entryTitle">

          <b-form-input placeholder="Entry Title" id="entryTitle" type="text" v-model="fieldData.entryTitle" required class="formField">
          </b-form-input>

        </b-form-group>

        <h5 class="slideup">Ingredients</h5>
        <b-form-group class="formsections" id="ingredients" placeholder="Ingredients" label-for="ingredients">

          <b-form-input id="meat" placeholder="Meat" type="text" v-model="fieldData.ingredients.meat" required class="formField"></b-form-input>
          <b-form-input id="marinade" placeholder="Marinade" type="text" v-model="fieldData.ingredients.marinade" class="formField"></b-form-input>
          <b-form-input id="injection" placeholder="Injection" type="text" v-model="fieldData.ingredients.injection" class="formField"></b-form-input>
          <b-form-input id="rub" placeholder="Rub" type="text" v-model="fieldData.ingredients.rub" class="formField"></b-form-input>
          <b-form-input id="sauce" placeholder="Sauce" type="text" v-model="fieldData.ingredients.sauce" class="formField"></b-form-input>

        </b-form-group>
        <h5 class="slideup">The Cook</h5>
        <b-form-group class="formsections" id="cook" label-for="cook">

          <b-form-input placeholder="Smoker Model" type="text" id="smoker" v-model="fieldData.cook.smokerModel" class="formField"></b-form-input>
          <b-form-input placeholder="BBQ Tempurature" type="number" id="temp" v-model="fieldData.cook.temp" required class="formField" required></b-form-input>
          <b-form-input placeholder="Type of Wood" type="text" id="woodtype" v-model="fieldData.cook.woodtype" class="formField"></b-form-input>
          <p class="slideupsixpx">How long was your cook?</p>
          <b-row class="time">
            <b-form-input placeholder="Hours" type="number" id="hours" class="timeField" v-model="fieldData.cook.cookTime.hours"></b-form-input>
            <b-form-input placeholder="Minutes" type="number" id="mins" class="timeField" v-model="fieldData.cook.cookTime.mins"></b-form-input>
          </b-row>
          <br>
          <p>Did you use an Electric Heating Element?</p>
          <b-form-checkbox id="electricHeatingElement" v-model="fieldData.cook.electricHeatingElement" value="true" unchecked-value="false">
          </b-form-checkbox>
          <p>Did you use Wood Pellets?</p>
          <b-form-checkbox id="pellets" v-model="fieldData.cook.pellets" value="true" unchecked-value="false">
          </b-form-checkbox>
          <p>Did you use Charcoal?</p>
          <b-form-checkbox id="charcoal" v-model="fieldData.cook.charcoal" value="true" unchecked-value="false">
          </b-form-checkbox>
        </b-form-group>

        <h5 class="slideup">Results</h5>
        <b-form-group class="formsections" id="results" label-for="results">
          <b-form-input placeholder="Appearance" type="number" id="appearance" v-model="fieldData.results.appearance" class="formField"></b-form-input>
          <b-form-input placeholder="Texture" type="number" id="texture" v-model="fieldData.results.texture" class="formField"></b-form-input>
          <b-form-input placeholder="Flavor" type="number" id="flavor" v-model="fieldData.results.flavor" class="formField"></b-form-input>
          <b-form-input placeholder="Overall" type="number" id="overall" v-model="fieldData.results.overall" class="formField" required></b-form-input>

        </b-form-group>

        <h5 class="slideup">File Upload</h5>
        <b-form-group class="formsections" id="upload" label-for="upload">Selected file: {{uploadImage && uploadImage.name}}
          <!-- @click.native="bindImage()" -->
          <b-form-file id="file_input" name="bbqpic" v-model="uploadImage" accept="image/*"></b-form-file>
          <b-button @click="clearFile">Reset</b-button>
        </b-form-group>

        <b-button class="lighted" color="aqua" type="submit" variant="primary">Submit</b-button>
        <b-button class="lighted" type="reset" variant="secondary">Reset</b-button>
      </b-form>
      <br>
    </div>
  </div>

  <button v-if="entrySuccessful" v-on:click="Again()">Create Another Entry?</button>

</div>
</template>

<script>
import request from 'superagent';
import axios from 'axios';
import auto from 'run-auto';
import router from '../router';

export default {
  name: 'Create',
  data() {
    return {
      title: 'BBQ Journal',
      page: 'Create a New Entry',
      fieldData: {
        ingredients: {},
        smokerModel: {},
        cook: {
          cookTime: {}
        },
        results: {}
      },
      entryId: '',
      imagePostSuccessful: null,
      textPostSuccessful: null,
      entrySuccessful: null,
      uploadImage: '',
      photo_id: ''
    }
  },
  mounted() {
    if (!localStorage.id_token) {
      router.push('/login')
    }
  },
  computed: {
    authorized() {
      return localStorage.user_id || localStorage.id_token
    }
  },
  methods: {
    clearFile() {
      var self = this
      self.uploadImage = ''
    },
    postEntry() {
      event.preventDefault()
      var self = this;
      auto({
        postImage: function(callback) {
          if (self.uploadImage) {
            request
              .post('http://localhost:3000/api/image')
              .attach('file', self.uploadImage)
              .field('user', localStorage.user_id)
              .end((err, res) => {
                if (err) {
                  console.error('IMAGE: FAIL - ', err)
                  return err
                }
                if (res.status == '201') {
                  console.log('res.body._id', res.body._id)
                  console.log('IMAGE: SUCCESS - ', res)
                  self.imagePostSuccessful = true
                  self.$set(self, 'photo_id', res.body._id)
                  console.log('self photo', self.photo_id)
                }
              })
          }
          callback(null, {
            photo: self.photo_id
          })
        },
        createEntryObj: ['postImage', function(results, callback) {
          console.log('results:', results)
          var entry = {
            'title': self.fieldData.entryTitle,
            'user': localStorage.user_id,
            'photo': self.photo_id || null,
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
          var _entry = Object.assign({}, entry, results.postImage);
          console.log('entry:', _entry)
          callback(null, _entry)
        }],
        postText: ['createEntryObj', 'postImage', function(results, callback) {
          request
            .post('http://127.0.0.1:3000/api/entries')
            .send(results.createEntryObj)
            .set('Accept', 'application/json')
            .end((err, res) => {
              if (err) {
                console.error('ENTRIES: FAIL - ', err)
                return err
              }
              if (res.status == '201') {
                console.log('ENTRIES: SUCCESS - ', res)
              }
            })
          callback(null, true)
        }]
      }, function(err, results) {
        self.entrySuccessful = true,
          console.log('err = ', err)
        console.log('results = ', results)
      })
    },
    Again() {
      var self = this
      self.entrySuccessful = false
      this.fieldData = {
        ingredients: {},
        smokerModel: {},
        cook: {
          cookTime: {}
        },
        results: {}
      }
      router.push('/create')
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

<template>
<div id="app">
  <h3 v-show="!putSuccessful">{{ page }}</h3>
  <div class="fortypercent" v-show="authorized">
    <b-form @submit="putEntry()">
      <b-form-group label="Entry title:">
        <b-form-input id="title" type="text" v-model="fieldData.title" class="formField" required></b-form-input>
      </b-form-group>
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
          <br>
          <div>
            <p class="slideupsixpx"> Hours&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Minutes</p>
          </div>
          <b-row class="leftbuffer">
            <b-form-input type="number" id="hours" class="timeField" v-model="fieldData.cook.cookTime.hours"></b-form-input>
            <b-form-input type="number" id="mins" class="timeField" v-model="fieldData.cook.cookTime.mins"></b-form-input>
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
      <br>

      <div v-show="!photoRemoved" class="form-section">
        <div v-show="imageSrc" class="container">
          <img :src="imageSrc" class="image thumb">
          <b-button @click="deletePhoto" class="lighted" variant="danger">{{ deleteButtonText }}</b-button>
        </div>

        <div v-show="photoRemoved">
          <a>Your photo has been removed from this entry.</a>
          <b-form-file id="file_input2" v-model="newImage" accept="image/*"></b-form-file>
        </div>

        <div v-show="!photoRemoved">
          <b-form-group>
            <div>
              <a v-show="newImage && !imageSrc">File chosen: <b>{{ newImage && newImage.name }}</b> </a>
              <a v-show="!newImage  && !imageSrc"><b>{{ photoSectionText }}</b></a>

              <b-form-file v-show="!newImage && !imageSrc" id="file_input1" v-model="newImage" accept="image/*"></b-form-file>
              <br><br>
            </div>
            <b-button @click="clearFile" v-show="!imageSrc && newImage && !putSuccessful" class="lighted" variant="danger">Clear</b-button>
          </b-form-group>
        </div>
      </div>

      <br>

      <div v-show="putSuccessful">
        <h5>BBQ Journal Entry Edited Successfully.</h5>
      </div>

      <b-button @click="redirectList()" class="lighted" type="submit" variant="success">Back to Entries</b-button>
      <b-button class="lighted" type="submit" variant="primary">Update Entry</b-button><br><br>
      <b-button class="lighted" type="reset" variant="secondary">Reset Text</b-button>
      <b-button @click="deleteEntry()" class="lighted" type="reset" variant="danger">{{ deleteEntryButtonText }}</b-button>

    </b-form>
    <br>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import request from 'superagent'
import auto from 'run-auto'
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
      textPutSuccessful: false,
      imagePutSuccessful: false,
      putSuccessful: false,
      currentEntry: {},
      sendBack: false,
      newImage: '',
      photoRemoved: false,
      photoAdded: false,
      deleteButtonCounter: 0,
      deleteButtonText: "Delete photo?",
      deleteEntryButtonCounter: 0,
      deleteEntryButtonText: 'Delete Entire Entry?',
      imageSrc: '',
      photo_id: '',
      photoSectionText: ''
    }
  },
  mounted() {
    this.putIdCheck;
    this.generatePhotoSectionText;
    if (!localStorage.id_token) {
      router.push('/login')
    }
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
    },
    generatePhotoSectionText: function() {
      var self = this
      if (self.photo_id) {
        self.photoSectionText = "Change Photo?"
      } else {
        self.photoSectionText = "Add Photo?"
      }
    }
  },
  methods: {
    populateForm() {
      // NOTE POPULATE FORM FROM LOCALSTORAGE.PUT_ID
      var self = this
      axios.get('http://' + window.location.hostname + ':3000/api/entries/' + localStorage.put_id)
        .then(function(response) {
          console.log(response.data)
          return response.data
        })
        .then(function(response) {
          self.fieldData = response
          if (response.photo) {
            self.entryHasImage = true
            self.photo_id = response.photo._id
            self.imageSrc = response.photo.vuePath
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    putEntry() {
      event.preventDefault()
      var self = this;

      console.log('Starting putEntry')
      console.log('self.photo_id: ', self.photo_id)
      console.log('self.newImage: ', self.newImage)

      auto({
          putImage: function(callback) {
            console.log('in putImage')
            if (!self.newImage) {
              console.log('no self.newImage. Skipping putImage.')
            }
            if (!self.photo_id) {
              request
                .post('http://' + window.location.hostname + ':3000/api/image')
                .attach('file', self.newImage)
                .field('user', localStorage.user_id)
                .end((err, res) => {
                  if (err) {
                    console.error('IMAGE: FAIL - ', err)
                    return err
                  }
                  if (res.status == '201') {
                    console.log('res.body._id', res.body._id)
                    console.log('IMAGE: SUCCESS - ', res)
                    self.photo_id = res.body._id
                    console.log('self photo', self.photo_id)
                  }
                })
            } else if (self.newImage) {
              request
                .put('http://' + window.location.hostname + ':3000/api/image/' + self.photo_id)
                .attach('file', self.newImage)
                .field('user', localStorage.user_id)
                .end((err, res) => {
                  if (err) {
                    console.error('IMAGE: FAIL - ', err)
                    return err
                  }
                  if (res.status == '200') {
                    console.log('res.body._id', res.body._id)
                    console.log('IMAGE: SUCCESS - ', res)
                    self.photo_id = res.body._id
                    console.log('self photo', self.photo_id)
                  }
                })
            }
            callback(null, {
              photo: self.photo_id
            })
          },
          createPutObj: ['putImage', function(results, callback) {
            console.log('in createPutObj')
            var entry = {
              'title': self.fieldData.title,
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
            var _entry = Object.assign({}, entry, results.puttImage);
            console.log('entry:', _entry)
            callback(null, _entry)
          }],
          putText: ['createPutObj', 'putImage', function(results, callback) {
            console.log('in putText')
            request
              .put('http://' + window.location.hostname + ':3000/api/entries/' + localStorage.put_id)
              .send(results.createPutObj)
              .set('Accept', 'application/json')
              .end((err, res) => {
                if (err) {
                  console.error('ENTRIES: FAIL - ', err)
                  return err
                }
                if (res.status == '200') {
                  console.log('ENTRIES: SUCCESS - ', res)
                }
              })
            callback(null, true)
          }]
        },
        function(err, results) {
          self.putSuccessful = true
          console.log('err = ', err)
          console.log('results = ', results)
        })
    },
    // putText() {
    //   // NOTE BIND DATA FROM CURRENTENTRY GET REQ TO V-MODEL DATA
    //   event.preventDefault()
    //   var self = this
    //   var entry = {
    //     'title': self.fieldData.title,
    //     'user': localStorage.user_id,
    //     'results': {
    //       'flavor': self.fieldData.results.flavor,
    //       'texture': self.fieldData.results.texture,
    //       'appearance': self.fieldData.results.appearance,
    //       'overall': self.fieldData.results.overall
    //     },
    //     'cook': {
    //       'smokerModel': self.fieldData.cook.smokerModel,
    //       'temp': self.fieldData.cook.temp,
    //       'woodType': self.fieldData.cook.woodType,
    //       'electricHeatingElement': self.fieldData.cook.electricHeatingElement,
    //       'pellets': self.fieldData.cook.pellets,
    //       'charcoal': self.fieldData.cook.charcoal,
    //       'cookTime': {
    //         'hours': self.fieldData.cook.cookTime.hours,
    //         'mins': self.fieldData.cook.cookTime.mins
    //       }
    //     },
    //     'ingredients': {
    //       'meat': self.fieldData.ingredients.meat,
    //       'marinade': self.fieldData.ingredients.marinade,
    //       'injection': self.fieldData.ingredients.injection,
    //       'slather': self.fieldData.ingredients.slather,
    //       'rub': self.fieldData.ingredients.rub,
    //       'sauce': self.fieldData.ingredients.sauce
    //     }
    //   }
    //   console.log('newImage: ', self.newImage)
    //
    //   if (self.photo_id && self.newImage) {
    //     self.putImage(self.newImage)
    //   } else if (!self.photo_id && self.newImage) {
    //     self.postImage(self.newImage)
    //   } else {
    //     self.$set(self, 'putSuccessful', true)
    //     return
    //   }
    //
    //   // NOTE UPDATE DB ENTRY VIA PUT REQUEST
    //   console.log('entry: ', entry)
    //   request
    //     .put('http://' + window.location.hostname + ':3000/api/entries/' + localStorage.put_id)
    //     .send(entry)
    //     .set('Accept', 'application/json')
    //     .end((err, res) => {
    //       if (res.status != '200') {
    //         return (err)
    //       }
    //       console.log('TEXT: PUT SUCCESS - ', res)
    //     })
    // },
    // postImage(image) {
    //   var self = this;
    //   request
    //     .post('http://' + window.location.hostname + ':3000/api/image/')
    //     .attach('file', self.newImage)
    //     .field('user', localStorage.user_id)
    //     .end((err, res) => {
    //       if (err) {
    //         console.error('IMAGE: POST FAIL - ', err)
    //         return err
    //       }
    //       if (res.status == '201') {
    //         console.log('IMAGE: POST SUCCESS - ', res)
    //         self.$set(self, 'photoAdded', true)
    //         self.$set(self, 'sendBack', true)
    //         self.$set(self, 'photo_id', res.body._id)
    //         self.$set(self, 'imageSrc', res.body.vuePath)
    //         self.$set(self, 'putSuccessful', true)
    //       }
    //     })
    // },
    deletePhoto() {
      var self = this
      if (self.deleteButtonCounter >= 2) {
        self.deleteButtonText = "Your photo has been deleted"
        return
      }
      self.deleteButtonCounter += 1
      if (self.deleteButtonCounter == 1) {
        self.deleteButtonText = "Are you sure?"
      }
      if (self.deleteButtonCounter == 2) {
        request
          .delete('http://' + window.location.hostname + ':3000/api/image/' + self.photo_id)
          .field('user', localStorage.user_id)
          .end((err, res) => {
            if (err) {
              console.error('IMAGE: DELETE FAIL - ', err)
              return err
            }
            self.$set(self, 'imageSrc', '')
            self.$set(self, 'photoRemoved', true)
            self.$delete(self, 'newImage')

          })
      }
    },
    deleteEntry() {
      var self = this;

      self.deleteEntryButtonCounter += 1
      if (self.deleteEntryButtonCounter == 1) {
        self.deleteEntryButtonText = "Are you sure?"
      }
      if (self.deleteEntryButtonCounter == 2) {
        auto({
          deleteImage: function(callback) {
            request
              .delete('http://' + window.location.hostname + ':3000/api/image/' + self.photo_id)
              .field('user', localStorage.user_id)
              .end((err, res) => {
                if (err) {
                  console.error('IMAGE: DELETE FAIL - ', err)
                  return err
                }
                self.$set(self, 'photoRemoved', true)
                self.$set('newImage', '');
              })
            callback(null, true)
          },
          deleteText: function(callback) {
            request
              .delete('http://' + window.location.hostname + ':3000/api/entries/' + localStorage.put_id)
              .field('user', localStorage.user_id)
              .end((err, res) => {
                if (err) {
                  console.error('ENTRY TEXT: DELETE FAIL - ', err)
                  return err
                }
                self.$set(self, 'textRemoved', true)
              })
            callback(null, true)
          }
        }, function(err, results) {
          localStorage.deleteOK = true
          router.push('/list')
          console.log('err = ', err)
          console.log('results = ', results)
        })
      }
    },
    // putImage(image) {
    //   var self = this;
    //   console.log('self.photo_id:', self.photo_id)
    //   request
    //     .put('http://' + window.location.hostname + ':3000/api/image?id=' + self.photo_id)
    //     .attach('file', image)
    //     .field('user_id', localStorage.user_id)
    //     .end((err, res) => {
    //       if (err) {
    //         console.error('IMAGE: FAIL - ', err)
    //         return err
    //       }
    //       if (res.status == '200') {
    //         self.photo_id = res.body._id
    //         self.imageSrc = res.body.vuePath
    //         self.$set(self, 'putSuccessful', true)
    //         console.log('IMAGE: SUCCESS - ', res)
    //       }
    //     })
    // },
    clearFile() {
      var self = this
      self.newImage = ''
    },
    redirectList() {
      router.push('/list')
    },
  }
}
</script>

<style>
.form-section {
  border: lightgrey 1px solid;
  border-radius: 5px;
  padding: 7px 7px 7px 7px;
}

.custom-file-control::before {
  content: 'Click here to choose a file' !important;
  width: 101%
}

.thumb {
  width: 93%;
  padding: 8px;
}

.timeField {
  width: 45%;
}

.leftbuffer {
  padding-left: 16px
}

#hours {
  margin: 5px
}

#mins {
  margin: 5px
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

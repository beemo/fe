<template>
<div id="home">
  <div v-cloak v-show="logged_out">
    <br>
    <h4>You have been logged out successfully.</h4>
  </div>
  <hr>
  <h3>Most Popular Meats</h3>
  <CommitChart class="fortypercent">
    <h4>Most Popular Meats</h4></CommitChart>
  <br>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import CommitChart from '../components/CommitChart'

export default {
  name: 'home',
  components: {
    CommitChart
  },
  data() {
    return {
      title: 'Welcome to BBQ Journal',
      logged_out: false
    }
  },
  created: function() {
    var self = this
    self.logged_out = localStorage.logged_out
  },
  beforeDestroy: function() {
    localStorage.removeItem("logged_out");
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

<style scoped>
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
  color: #42b983;
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

.seventypercent {
  width: 70%;
  margin: auto
}

.shadowed-noblur
{
  text-shadow: 1px 1px grey;
}
.fortypercent {
  width: 40%;
  margin: auto
}

.seventypercent {
  width: 70%;
  margin: auto
}*/
</style>

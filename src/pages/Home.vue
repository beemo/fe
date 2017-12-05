<template>
<div id="home">
  <div v-cloak v-show="logged_out">
    <br>
    <h4>You have been logged out successfully.</h4>
  </div>
  <hr>

  <h3> Welcome to BBQ Journal </h3>
  <h4> A place to record your cooks </h4>
  <hr>
  <br>

  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col>
        <blockquote cite="https://www.brainyquote.com/quotes/quotes/m/maewest398931.html">
          <h6>"I always say, keep a diary and someday it'll keep you." - Mae West</h6>
        </blockquote>
      </b-col>
    </b-row>
    <br>
    <b-row class="text-left">
      <b-col md="8">
        <p>The key ingredient to any successful dish is consistency, or more specifically, reproducibility. Ken Forkish, who won a James Beard Award for his book, "Flour, Water, Yeast, Salt: The Fundamentals of Artisan Bread and Pizza" (2012), considers
          a pencil and paper to be one of the most powerful tools in his kitchen. Similarly, Aaron Franklin of Franklin Barbeque in Austin, TX (a fellow James Beard award winner himself), emphasizes consistency as the secret of his success in his book,
          "Franklin Barbecue: A Meat-Smoking Manifesto" (2015).</p>
      </b-col>
      <b-col md="4">
        <b-img src="../static/sausage_stock_flickr.jpg" fluid alt="Responsive sausage image" />
      </b-col>
    </b-row>
    <br>
    <b-row class="text-left">
      <b-col md="11">
        <h6>
          If you want to make great barbeque consistently, you will need to be able to reproduce your results.</p>
        </h6>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center">
      <h4><a href="/#/signup">Sign up</a></h4>
    </b-col>
    </b-row>
  </b-container>

  <hr>

  <br>
  <h3>Most Popular Meats This Month</h3>
  <CommitChart class="fortypercent"></CommitChart>
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
  //       axios.get('http://' + window.location.hostname + ':3000/api/entries/' + id)
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

<template>
    <div id="show-results">
       <h2 v-if="loading">Loading...</h2>
        <ul>
        <h3 v-if="!loading">Number of Articles per medicine:</h3>
          <li v-for="c in results.counts" :key="c.medicine" class="single-res">
              <p>  <b>Medicine:</b> {{c.medicine}} </p>
              <p> <b>Number of Articles:</b> {{c.count}} </p>
          </li>
        <h3 v-if="!loading && mult">Articles with multiple medicines:</h3>
          <li v-for="paper in results.papers" :key="paper.cord_uid" class="single-res">
              <p>  <b>Article-id:</b> {{paper.cord_uid}} </p>
              <p>  <b>Medicines:</b>  {{paper.medicine}} </p>
          </li>
        </ul>
     </div>
</template>

<script>
import {bus} from '../main';

export default {
    data () {
        return {
            input: [],
            results: [],
            loading: true,
            mult: false,
        }
    },
    methods: {

    },
    created() {
        bus.$once('inputChanged',(data) =>{
          this.axios.post('http://localhost:8000/', {'medicine' : data}, {headers: {'Content-Type': 'application/json'}}).then((response) => {
            this.results = response.data;
            if(this.results.papers.length != 0) this.mult = true;
            for(var i =0; i < this.results.papers.length; i++){
              this.results.papers[i].medicine = this.results.papers[i].medicine.join(', ');
            }
            this.loading = false;
          }).catch(error => {
            alert(error.response.data);
        });

        });
    }
}
</script>

<style>
#show-results{
    max-width: 800px;
    margin: 0px auto;
}
li{
  list-style-type: none;
}
.single-res{
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;

}
p{
  font-family: verdana;
  color:black;
  font-size: 20px;
}
b{
  font-family: verdana;
  color:black;
  font-size: 20px;
}
h3{
  text-align: center;
  font-family: verdana;
  color:black;
  font-size: 30px;
}
h2{
  text-align: center;
  font-family: verdana;
  color:black;
  font-size: 50px;
  margin-top: 90px;
}
</style>

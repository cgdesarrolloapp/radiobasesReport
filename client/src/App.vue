<template>
  <div id="app">
    <table class="table mt-5">
      <thead>
        <tr >
          <th scope="col">Radiobases</th>
          <td  className="rotate" v-for="item  in  items" :key="item.RADIOBASE" >{{item.FECHA}}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i)  in  items" :key="item.RADIOBASE">
          <th v-if="{i == 0}" scope="row">{{items[0].RADIOBASE}}</th>
          <td v-if="{i == 0}" v-for="item  in  items" :key="item.RADIOBASE">{{item.TRAFICO}}</td>
          {{++i}}
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios"
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data() {
    return {
      items : [

      ]
    }
  },
    async mounted(){
      const response = await axios.get('http://localhost:5000/reporteRadiobases/RBZA9931C003')
      console.log("response",response)
      this.items = response.data.results
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
},
.rotate {
     -moz-transform: rotate(-90.0deg);  /* FF3.5+ */
       -o-transform: rotate(-90.0deg);  /* Opera 10.5 */
  -webkit-transform: rotate(-90.0deg);  /* Saf3.1+, Chrome */
             filter:  progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083);  /* IE6,IE7 */
         -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0.083)"; /* IE8 */
}
</style>
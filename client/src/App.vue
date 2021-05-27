<template>
  <div id="app">
  <form onSubmit={mounted}>
        <input
          name="firstName"
          placeholder="First Name"
          v-model="radiobases"
        />
        <br />
        <input
          type="date"
          name="lastName"
          placeholder="Last Name"
          v-model="date"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    <table class="table mt-5">
      <thead>
        <tr >
          <th scope="col">Radiobases</th>
         <!--<td  className="rotate" v-for="item  in  items" :key="item.FECHA" >{{item.FECHA}}</td>-->
          <td  className="rotate"  v-for="i in 30" :key="i">{{i}}</td> 
        </tr>
      </thead>
      <tbody>
        <tr>
          <th v-for="item  in  items" :key="item.RADIOBASE" scope="row">{{item.RADIOBASE}}</th>
          <td v-for="item  in  items" :key="item.RADIOBASE">{{item.TRAFICO}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios"

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      items : [

      ],
      date:"2019-09-08",
      radiobases:"RBZA9931C003"
    }
  },
    async mounted(req){
      console.log("aaaaaaaaaa",req)
      const response = await axios.get('http://localhost:5000/reporteRadiobases?RADIOBASE='+this.radiobases+'&FECHA='+this.date)
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
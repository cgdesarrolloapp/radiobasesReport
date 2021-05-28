<template>
  <div id="app">
        <!--ul id="array-rendering">
          <li v-for="radiobase in rb" :key="radiobase">
            {{ radiobase.RADIOBASE }}
          </li>
        </ul>
        <br /-->
        <br />
        <text >Ingrese Radiobase</text>
        <br />
        <input
        id="inpRadioBase"
          name="RADIOBASES"
          placeholder="Radiobase"
          value="RBZA9931C003"
        />
        <br />
        <text >Seleccione Fecha</text>
        <br />
        <input
          id="dpFecha"
          type="date"
          name="FECHA"
          placeholder="Fecha"
          value=""
        />
        <br />
        <input type="submit" @click="mounted" />
   
    <table class="table mt-5">
      <thead>
        <tr id="rotate"  >
          <th style="max-width: 100px,  min-width: 100px" scope="col">Radiobases</th>
          <td :style="{ transform: 'rotate('+ turn+'turn)'}" v-for=" i in Object.keys(aDateReport.fechatrafico)" :key="i"  >{{i}}</td> 
        </tr>
      </thead>
      <tbody>
        <tr >
          <th  scope="row">{{radiobases}}</th>
          <!--td v-for="item  in  Object.keys(aDateReport)" :key="item.RADIOBASE">{{item.TRAFICO}}</td-->
          <td v-bind:style="{ height: '150px'}"  v-for=" i in Object.values(aDateReport.fechatrafico)" :key="i"  >{{i}}</td> 
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
},
#rotate td {
     -moz-transform: rotate(-90.0deg);  /* FF3.5+ */
       -o-transform: rotate(-90.0deg);  /* Opera 10.5 */
  -webkit-transform: rotate(-90.0deg);  /* Saf3.1+, Chrome */
},
table, th, td {
  border: 1px solid black;
}table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  color: black;
  background-color: #FFFFFF;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  color: black;
  background-color: #f9f9f9;
}

th, td {
  color: black;
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

</style>
<script>
import axios from "axios"
import moment from 'moment'
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      items : [],
      date:"",
      rb : [],
      radiobases:"",
      aDateRange:[],
      aDateReport:{fechatrafico:{}},
      turn: 0.75,
      widthTd:50
    }
 
  },
  methods: {

      async maestroRadioBases(){
        const response = await axios.get('http://localhost:5000/maestroRadiobases')
        console.log("response",response)
        this.rb = response.data.results
      },
    async mounted(){
      let sDateP = document.getElementById("dpFecha").value
      let sRadioBaseInp = document.getElementById("inpRadioBase").value
      this.radiobases = []
      this.radiobases = sRadioBaseInp
      this.date = sDateP
      this.aDateRange = []
      this.items = []
      console.log("this.date",this.date)
      let fecha = moment.utc(this.date).endOf('day').format()
      console.log("fecha",fecha)
      this.aDateRange.push(moment(fecha).format('YYYY-MM-DD'))
      for (let step = 0; step < 10; step++) {
        let diasAtras 
        diasAtras = moment(fecha).subtract(step + 1, 'days').format('YYYY-MM-DD')
        this.aDateRange.push(diasAtras)
      }
      this.aDateRange = this.aDateRange.sort().reverse()
      console.log("this.aDateRange",this.aDateRange)
      const response = await axios.get('http://localhost:5000/reporteRadiobases?RADIOBASE='+this.radiobases+'&FECHA='+this.date)
      console.log("response",response)
      var oData
      this.items = response.data.results
       this.items.forEach(item => {
                   oData = {
                          RADIOBASE : item.RADIOBASE,                                    
                          REGION : item.REGION,
                          fechatrafico:{}
                        }
        /*this.aDateRange.find(element => {
          console.log("element yyyy", element)
          console.log("item.FECHA yyyy", item.FECHA)
          console.log("item yyyy", item.TRAFICO)
          if(item.FECHA !== element){
                  oData.fechatrafico[element] = "0"
          }else{
                   oData.fechatrafico[item.FECHA] = item.TRAFICO
          }
          console.log("oData",oData)
    
        })*/

        this.aDateRange.forEach(date => {
            const result =  this.items.filter(item1 => item1.FECHA == date);
            console.log("zzzzz", result)


          if(result.length > 0){
            oData.fechatrafico[date] = result[0].TRAFICO
          }else{
            if (!oData.fechatrafico[date] ){
                  oData.fechatrafico[date] = "0"
            } 
          }
        })

        

                console.log("oData",oData)

      })

      console.log("oData Final",oData)
      //this.aDateReport = oData.fechatrafico
      this.aDateReport = oData

      console.log("Values",Object.values(this.aDateReport.fechatrafico) )

    }  
  }
}
</script>



<template>
  <div id="app">
    <form
    v-bind:style="{ padding: '10px'}"
    v-on:submit.prevent="onSubmit"
      id="appForm">
      <br />
      <label v-bind:style="{ padding: '10px', margin : '10px'}" >Ingrese Radiobase</label>
      <br />
      <input
        v-bind:style="{ padding: '10px', margin : '10px'}"
        id="inpRadioBase"
        name="RADIOBASES"
        placeholder="Radiobase"
        value="RBZA9931C003"
      />
      <br />
      <label v-bind:style="{ padding: '10px', margin : '10px'}" >Seleccione Fecha</label>
      <br />
      <input
        id="dpFecha"
        v-bind:style="{ padding: '10px', margin : '10px'}"
        type="date"
        name="FECHA"
        placeholder="Fecha"
        value=""
      />
      <br />
      <input type="submit" @click="consultarRadioBase" />
    </form>

    <table id="tblRadio" class="table mt-5">
      <thead>
        <tr id="rotate">
          <th
            :style="{
              width: '90px',
              minWidth: '90px',
              height: '140px',
              border: '1px solid black',
            }"
            style="max-width: 100px,  min-width: 100px"
            scope="col"
          >
            Radiobases
          </th>
          <td
            :style="{
              transform: 'rotate(' + turn + 'turn)',
              width: '90px',
              minWidth: '90px',
              height: '140px',
              border: '1px solid black',
            }"
            v-for="i in Object.keys(aDateReport.fechatrafico)"
            :key="i"
          >
            {{ i }}
          </td>
        </tr>
      </thead>
      <tbody :class="tblBody">
        <tr>
          <th
            v-bind:style="{ height: '150px', border: '1px solid black' }"
            scope="row"
          >
            {{ radiobases }}
          </th>
          <!--span  v-bind:style="parseInt(i) <= 15 ? coloBG = 'red' : parseInt(i) > 15 && parseInt(i) <= 40 ? coloBG = '#ff8000' : parseInt(i) > 40 && parseInt(i) <= 90 ? colorBg = 'yellow' : parseInt(i) < 90 ? colorBG = 'green' : colorBG = 'grey'"-->
          <td 
            v-bind:id="dynamicId++"
            v-bind:style="
            {
              height: '150px',
              border: '1px solid black',
              backgroundColor: ColorBG,
            }"

            v-for="i in Object.values(aDateReport.fechatrafico)"
            :key="i"
            
          >
            {{ i }}
          </td>

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
}
,
#tblRadio {
  border: 2px solid black;
}
,
#tblRadio td {
  border: 2px solid black;
}
,
#tblRadio th {
  border: 2px solid black;
}
,
#rotate td {
  -moz-transform: rotate(-90deg); /* FF3.5+ */
  -o-transform: rotate(-90deg); /* Opera 10.5 */
  -webkit-transform: rotate(-90deg); /* Saf3.1+, Chrome */
}
,
table,
th,
td {
  border: 1px solid black;
}
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  color: black;
  background-color: #ffffff;
  color: rgba(255, 255, 255, 0.66);
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

th,
td {
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
import axios from "axios";
import moment from "moment";
export default {
  name: "App",
  components: {},
  data() {
    return {
      items: [],
      date: "",
      rb: [],
      radiobases: "",
      aDateRange: [],
      aDateReport: { fechatrafico: {} },
      turn: 0.75,
      widthTd: 50,
      ColorBG: "red",
      IndexId: 0,
    };
  },
  beforemounted() {
    let oData;
    let fecha = moment.utc(moment()).endOf("day").format();
    console.log("fecha", fecha);
    this.aDateRange.push(moment(fecha).format("YYYY-MM-DD"));
    for (let step = 0; step < 29; step++) {
      let diasAtras;
      diasAtras = moment(fecha)
        .subtract(step + 1, "days")
        .format("YYYY-MM-DD");
      this.aDateRange.push(diasAtras);
    }
    if (this.items.length == 0) {
      oData = {
        RADIOBASE: "",
        REGION: "",
        fechatrafico: {},
      };
      this.aDateRange.forEach((date) => {
        oData.fechatrafico[date] = "";
      });
    }
  },
  mounted() {},
  updated() {
    for (let step = 0; step < 29; step++) {
      //document.getElementById("1").style.backgroundColor = "lightblue";
    }
  },
  methods: {
    colorBack(val) {
      console.log("aaaaaaa", val);
      return "red";
    },
    async maestroRadioBases() {
      const response = await axios.get(
        "http://localhost:5000/maestroRadiobases"
      );
      console.log("response", response);
      this.rb = response.data.results;
    },
    async consultarRadioBase() {
     // document.getElementById(".tblBody > td") ? document.getElementById(".tblBody > td").remove : document.getElementById(".tblBody > td")
      let sDateP = document.getElementById("dpFecha").value;
      let sRadioBaseInp = document.getElementById("inpRadioBase").value;
      this.radiobases = [];
      this.radiobases = sRadioBaseInp;
      this.date = sDateP;
      this.aDateRange = [];
      this.items = [];
      console.log("this.date", this.date);
      let fecha = moment.utc(this.date).endOf("day").format();
      console.log("fecha", fecha);
      this.aDateRange.push(moment(fecha).format("YYYY-MM-DD"));
      for (let step = 0; step < 29; step++) {
        let diasAtras;
        diasAtras = moment(fecha)
          .subtract(step + 1, "days")
          .format("YYYY-MM-DD");
        this.aDateRange.push(diasAtras);
      }
      this.aDateRange = this.aDateRange.sort().reverse();
      console.log("this.aDateRange", this.aDateRange);
      const response = await axios.get(
        "http://localhost:5000/reporteRadiobases?RADIOBASE=" +
          this.radiobases +
          "&FECHA=" +
          this.date
      );
      console.log("response", response);
      var oData;
      this.items = response.data.results;
      this.items.forEach((item) => {
        oData = {
          RADIOBASE: item.RADIOBASE,
          REGION: item.REGION,
          fechatrafico: {},
        };
        this.aDateRange.forEach((date) => {
          const result = this.items.filter((item1) => item1.FECHA == date);
          console.log("000 zzzzz", result);
          if (result.length > 0) {
            oData.fechatrafico[date] = result[0].TRAFICO;
          } else {
            if (!oData.fechatrafico[date]) {
              oData.fechatrafico[date] = "";
            }
          }
        });
        console.log("oData", oData);
      });
      if (this.items.length == 0) {
        oData = {
          RADIOBASE: "",
          REGION: "",
          fechatrafico: {},
        };
        this.aDateRange.forEach((date) => {
          oData.fechatrafico[date] = "";
        });
      }

      console.log("oData Final", oData.fechatrafico);
      this.aDateReport = oData;
      console.log("Values", Object.values(this.aDateReport.fechatrafico));
    },
  },
};
</script>



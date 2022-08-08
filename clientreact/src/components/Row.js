import React from "react";
//import './Gif.css'
//export default function Row({id, value, fecha}){
export default function Row(singleGif){
    console.log("singleGif",singleGif)
    var aProperty = Object.getOwnPropertyNames(singleGif)
    aProperty = aProperty.filter(element => element !== 'cabecera' && element !== 'key' && element !== 'RadioBase' );
    //debugger
    var oRow = aProperty.map(element =><td>{singleGif[element]}</td>) 
    var oRowA = aProperty.map(element =>element)
    //debugger
    const results = oRow.filter(element => element !== undefined);
    console.log("aProperty",aProperty)
    console.log("oRow",oRow)
    console.log("results",results)
    //debugger
            return  <tr>
                        {results}
                    </tr>
}
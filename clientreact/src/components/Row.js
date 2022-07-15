import React from "react";
//import './Gif.css'
//export default function Row({id, value, fecha}){
export default function Row(singleGif){
    console.log("singleGif",singleGif)
    var aProperty = Object.getOwnPropertyNames(singleGif)
    aProperty = aProperty.filter(element => element !== 'cabecera');
    var oRow = aProperty.map(element =><td>{singleGif[element]}</td>)
    const results = oRow.filter(element => element !== undefined);
    console.log("aProperty",aProperty)
    console.log("oRow",oRow)
    console.log("results",results)
            return  <tr>
                        {results}
                    </tr>
}
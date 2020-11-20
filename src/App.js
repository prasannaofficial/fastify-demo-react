import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import "./App.css";
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
const App = () => {
  const [data, setData] = useState([]);
  const [indianState, setIndianState] = useState("Andhra Pradesh");
  const [dataPoints, setDataPoints] = useState([]);
  useEffect(() => {
    // fetch("http://127.0.0.1:3000/gettabledata")
    fetch("https://stark-anchorage-35752.herokuapp.com/gettabledata")
      .then((res) => res.json())
      .then((res) => {
        let temp_data = res.table[0].map((el) => {
          let temp_dataPoints = [];
          for (let key in el) {
            if (el.hasOwnProperty(key) && key !== "States") {
              if (el[key] != "NA")
                temp_dataPoints.push({
                  y: Number(el[key]),
                  label: key,
                });
            }
          }
          return {
            stateName: el.States,
            dataPoints: temp_dataPoints,
          };
        });
        setData(temp_data);
        setDataPoints(temp_data[0].dataPoints);
      });
  }, []);
  const selectHandler = (e) => {
    console.log(e.target.value);
    data.forEach((el) => {
      if (el.stateName === e.target.value) {
        setDataPoints(el.dataPoints);
      }
    });
    setIndianState(e.target.value);
  };
  return (
    <div className="container">
      <h1>Unemployment Rate in India</h1>
      {/* {JSON.stringify(data)} */}
      <div class="select">
        <select onChange={selectHandler}>
          {data.map((el) => {
            return <option value={el.stateName}>{el.stateName}</option>;
          })}
        </select>
        <div class="select__arrow"></div>
      </div>
      <CanvasJSChart
        options={{
          animationEnabled: true,
          title: {
            text: `Unemployment Rate Monthly time series (%) : ${indianState}`,
          },
          axisY: {
            title: "Unemployment Rate (%)",
            includeZero: false,
          },
          data: [
            {
              type: "spline",
              // showInLegend: true,
              dataPoints,
            },
          ],
        }}
        /* onRef={ref => this.chart = ref} */
      />
    </div>
  );
};

export default App;

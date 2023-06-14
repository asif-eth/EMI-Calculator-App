import "./styles.css";
import React from "react";
import tenureData from "../src/utils/constants"
import { useState } from "react";

const App = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = () => {}

  const updateEMI = (e) => {
    if(!cost) return;

    const dp = Number(e.target.value)
    setDownPayment(dp.toFixed(0));

    // calculate EMI and update it
  }

  const updateDownPayment = (e) => {
    if(!cost) return;

    const emi = Number(e.target.value)
    setEmi(dp.toFixed(0));

    // calculate DP and update it
  }


  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <span className="title">Total Cost Of Asset</span>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Total Cost Of Assets"
      />

      <span className="title">Interest Rate (in %)</span>
      <input
        type="number"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Interest Rate (in %)"
      />

      <span className="title">Processing Fee (in %)</span>
      <input
        type="number"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder="Processing Fee (in %)"
      />

      <span className="title">Down Payment</span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEMI}
        />
        <div className="labels">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>

      <span className="title">Loan Per Month</span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className="slider"
          value={emi}
          onChange={updateDownPayment}
        />
        <div className="labels">
          <label>{calculateEMI(cost)}</label>
          <b>{downPayment}</b>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>

      <span className="title">Tenure</span>
      <div className="tenureContainer">
      {tenureData.map((t)=>{
        return <button className= {`tenure ${t===tenure?"selected":""}`} onClick={()=>{setTenure(t)}}>{t}</button>
      })}
      </div>
    </div>
  );
};

export default App;

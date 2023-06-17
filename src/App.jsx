import "./styles.css";
import React from "react";
import tenureData from "../src/utils/constants"
import { useState } from "react";
import { useEffect } from "react";
import { numberWithCommas } from "./utils/config";
import SliderInput from "./components/SliderInput";
import TextInput from "./components/TextInput";

const App = () => {
  const [cost, setCost] = useState();
  const [interest, setInterest] = useState();
  const [fee, setFee] = useState();
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downPayment) => {
    if(!cost) return;

    const loanAmt = cost - downPayment;
    const rateOfInterest = Math.min(interest, 100)/100;
    const numOfYears = tenure / 12;

    const EMI = (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
    ((1 + rateOfInterest) ** numOfYears - 1);
    
    return Number(EMI/12).toFixed(0);
  }

  const calculateDP = (emi) => {
    if(!cost) return;

    const downPaymentPercent = 100 - (emi/calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  }

  useEffect(()=>{
    if(!(cost > 0)){
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  },[tenure,cost])

  const updateEMI = (e) => {
    if(!cost) return;

    const dp = Number(e.target.value)
    setDownPayment(dp.toFixed(0));

    const emi = calculateEMI(dp);
    setEmi(emi);
  }

  const updateDownPayment = (e) => {
    if(!cost) return;

    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setDownPayment(dp);
  }

  const totalDownPayment = () => {
    return numberWithCommas (
      (Number(downPayment) + (cost-downPayment) * (fee / 100)).toFixed(0)
    )
  }

  const totalEMI = () => {
    return numberWithCommas ((emi*tenure).toFixed(0))
  }

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <TextInput
        title={"Total Cost Of Asset"}
        state={cost}
        setState={setCost}
      />

      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
      />

      <TextInput
        title={"Processing Fee (in %)"}
        state={fee}
        setState={setFee}
      />

      <SliderInput
        title="Down Payment"
        underLineTitle={`Total Down Payment - ${totalDownPayment()}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title="Loan Per Month"
        underLineTitle={`Total Loan Amount - ${totalEMI()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => {
                setTenure(t);
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;

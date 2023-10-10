import React, { useEffect, useState } from 'react';
import './PricingTable.css';
import api from '../api.ts';
import { GetPlan } from '../interface/interfaces.ts';
import { PlanCard } from './PlanCard.tsx';


const PricingTable: React.FC<GetPlan> = () => {

   const showQuarterly = false;
   const [isChecked, setIsChecked] = useState<boolean>(false);
   const [plans, setPlans] = useState<GetPlan[]>([]);

   const toggleTable = () => {
    setIsChecked(!isChecked);
    setPlans(prevPlans => {
      const updatedPlans = [...prevPlans];
      if(!showQuarterly) {
        const temp = updatedPlans[1];
        updatedPlans[1] = updatedPlans[3];
        updatedPlans[3] = temp;
      }
      return updatedPlans;
    })
   };

   const getPlans = async () => {
    try {
      const plans = await api.getPlans();
      setPlans(plans);

    } catch (error) {
      console.log("error desconhecido", error);
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  
  return (
    <div className='btn'>
        <label className={`toggle-container ${isChecked ? 'checked' : ""}`}>
            <input type="checkbox" onClick={toggleTable}/>
            <div className='toggle-slider'></div>
        </label>
        <div className='pricing-table'>
            {plans.slice(0, 3).map((plan: any, index) => (
              <div className={`pricing-plan ${index === 1 ? 'recommended' : ''} `}>
                <PlanCard plan={plan}/>
              </div>
            ))}
        </div>
        <p className='popular'>Most PoPular</p>
    </div>
  );
};


export default PricingTable;

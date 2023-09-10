import React, { useEffect, useState } from 'react';
import './PricingTable.css';
import axios from 'axios';


interface Price {
  'price-mensal': string;
  'price-trimestral': string;
  'price-annual': string;
  'price-semestral': string;
}

interface Feature {
  capacity: string;
  user: string;
  devices: string;
}


const PricingTable: React.FC = () => {

   const [showQuarterly, setShowQuarterly] = useState<boolean>(true);
   const [title, setTitle] = useState<string>("Pro");
   const [isChecked, setIsChecked] = useState<boolean>(false);
   const [prices, setPrices] = useState<Price[]>([]);
   const [features, setFeatures] = useState<Feature[]>([]);

   const toggleTable = () => {
    setShowQuarterly(!showQuarterly);
    changePro()
   };

   const changePro = () => {
    if(!showQuarterly) {
        setTitle("Pro")
    } else {
        setTitle("Ultimate")
    }
   }

   const handleToggle = () => {
    setIsChecked(!isChecked)
    toggleTable()
   };

   useEffect(() => {
    axios.get<Price[]>('http://localhost:3001/api/prices')
   .then((response) => {
      if(response.status === 200) {
        return response.data
      } else {
        throw new Error('Erro na solicitação');
      }
   })
   .then((data) => {
      setPrices(data);
   })
   .catch((error) => {
    console.log(error)
   })
  }, [])

  useEffect(() => {
    axios.get<Feature[]>('http://localhost:3001/api/features')
   .then((response) => {
      if(response.status === 200) {
        return response.data
      } else {
        throw new Error('Erro na solicitação');
      }
   })
   .then((data) => {
      setFeatures(data);
   })
   .catch((error) => {
    console.log(error)
   })
  }, [])


  return (
    <div className='btn'>
        <label className={`toggle-container ${isChecked ? 'checked' : ""}`}>
            <input type="checkbox" onClick={handleToggle}/>
            <div className='toggle-slider'></div>
        </label>
        <p className='popular'>MOST POPULAR</p>
    <div className="pricing-table">
      <div className="pricing-plan">
        <h2>Basic</h2>
        <p>Individuals</p>
        <div className="price">{prices.length > 0 ? `$${prices[0]['price-mensal']}` : ""}<span>/month</span></div>
        <ul>
          <li>{features.length > 0 ? `${features[0]['capacity']}` : ""}</li>
          <li>{features.length > 0 ? `${features[0]['user']}` : ""}</li>
          <li>{features.length > 0 ? `${features[0]['devices']}` : ""}</li>
        </ul>
        <button className='btn btn-basic'>Get Started</button>
      </div>

      <div className="pricing-plan recommended">
        <h2>{title}</h2>
        <p>{showQuarterly ? 'Small Businesses' : 'Enterprises'}</p>
        <div className="price">{showQuarterly ? (prices.length > 0 ? `$${prices[1]['price-trimestral']}` : "") : (prices.length > 0 ? `$${prices[3]['price-annual']}` : "")}<span>{showQuarterly ? '/quarter' : '/annual'}</span></div>
        <ul>
          <li>{showQuarterly ? (features.length > 0 ? `${features[1]['capacity']}` : "") : (features.length > 0 ? `${features[3]['capacity']}` : "") }</li>
          <li>{showQuarterly ? (features.length > 0 ? `${features[1]['user']}` : "") : (features.length > 0 ? `${features[3]['user']}` : "") }</li>
          <li>{showQuarterly ? (features.length > 0 ? `${features[1]['devices']}` : "") : (features.length > 0 ? `${features[3]['devices']}` : "") }</li>
        </ul>
        <button className='btn'>Get Started</button>
      </div>

      <div className="pricing-plan">
        <h2>Premium</h2>
        <p>Medium Bussiness</p>
        <div className="price">{prices.length > 0 ? `$${prices[2]['price-semestral']}` : ""}<span>/semester</span></div>
        <ul>
          <li>{features.length > 0 ? `${features[2]['capacity']}` : ""}</li>
          <li>{features.length > 0 ? `${features[2]['user']}` : ""}</li>
          <li>{features.length > 0 ? `${features[2]['devices']}` : ""}</li>
        </ul>
        <button className='btn'>Get Started</button>
      </div>
    </div>
    </div>
  );
};


export default PricingTable;

import React from 'react';
import './devices.css';

import { API, graphqlOperation } from "aws-amplify";

import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Divider } from '@aws-amplify/ui-react';

export default function Devices() {

  /*const [iot, setIot] = useState([]);

  useEffect(() => {fetchdata();
  },[])
  const fetchdata = async () => {
    try{
      const iotData = await API.graphql(graphqlOperation(listIotDatawithTime2S))    
      const iotList = iotData.data.listIotDatawithTime2S.items
      console.log('iot list', iotList)
      setIot(iotList)
    }
    catch(error)
    {
      console.log("error occurredddd",error)
    }
    
  }

  return (
    <div className='devices'>
        <LineChart width={700} height={300} data={iot} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="Temperature" stroke="#D83715" />
          <Line type="monotone" dataKey="Humidity" stroke="#159AD8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="ts" />
          <YAxis />
          <Tooltip />
        </LineChart>
    </div>
  )*/
  return(
    <div className="devices">devices</div>
    )
}

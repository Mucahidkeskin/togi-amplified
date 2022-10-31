import React from 'react'
import './log.css'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react';
import { Amplify, Storage,StorageProvider, Auth } from 'aws-amplify';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect , useCallback} from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

export default function Log() {
  const[file, setJsonData] = useState();
  const[fList, setfList] = useState();
  const[resp,setResponse]=useState(null);
  const[tempResp,setTempResp]=useState();
  const[logData,setLogData]=useState();
  const[showChart,setShowChart]=useState(false);
  const[options,setOptions]=useState(null);


  const navigate = useNavigate();
  const logViewClick = useCallback(() => navigate('charts', {replace: true}), [navigate]);
  const getLogurl = "https://f78gbpenv4.execute-api.us-east-1.amazonaws.com/getLogs?name=abc/";
  const deleteurl = "https://f78gbpenv4.execute-api.us-east-1.amazonaws.com/deleteLog?name=";
  const uploadurl = "https://f78gbpenv4.execute-api.us-east-1.amazonaws.com/getUploadLink?name=a.json";
  const uploadLink = "https://logbucket71500-staging.s3.amazonaws.com/aab.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAZPDT6BXQDRZ4ED72%2F20221018%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221018T191724Z&X-Amz-Expires=2500&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFwaCXVzLWVhc3QtMSJIMEYCIQDFdh5qeX0VOyHm2iPt%2BPC1Zlbb%2Fa%2FP3Z3AB4C4mBDh3QIhAJF0IRS1liILn9UjXfHRwMsnOlWfD34Cnur3Qi762ovMKugCCDQQABoMNjUwOTMwNjg3NDU2IgyVhn9PxFm2XD85z50qxQKK5MNAdEFJw%2B3q3Vbg3V2I7YBeiNH5ogfwNAmn9qriqEwtWU4FK3dn%2FxNvw7GABxHS2O48fgrDrjzDgvkxzB%2BCllwgLuzLJ93nv3ALwkF0xSbAEoz%2FBWhIAZmtcnsNYuYFvV%2BD9Q0Mxtw3w4kMgS8XKc217x6%2Fbb1kGOqbNmEgmrzCq5fnaz31%2B1R8dkGX4r5JyUkjZj45w6vsd8XVTDZkrrmRJagUG090bAHp3hwjHKoBFuFN%2F7TrlICWgB7R5T1FGZln332df3YJYhOFvw07SUBPGbS%2BS6JD5UCrG2qtj1HRPswebiKCohDX8eGdpVA32lo7p%2BD%2BjIsbFWHt%2FCIX4vvr%2BRBTw9rIei2QwRKthHyl7ylt0GcpfApAE%2BxnAagLUUE4Jp%2FRaZiET%2FMzKqYQ4JLGedHHOCCpumLZMKWATD9rW4A1MML3u5oGOp0BKioSl2tVjsOWpW%2FRhwBaShN5mcr94VQe8LSLF5PS7K1I7i0W%2FErY6pk%2Fx8yInLxlXQONXYpdMkTfLAXcBJsN%2BKm5SESt1Pf%2BRWye0R0V7W3Lo%2BpJE56jS1IfaiQOAW3vR9pBIi7QstpJIVsdAbHAwzEMZpKUgzzpPJmpFKHKEzwnNxS9KjAkZ6jwkif%2FtXRDMjgMQ8jM5vbFGuJUrQ%3D%3D&X-Amz-Signature=ccb32de107793ec53a40fff33bf400ba43551cb628b93f25bf0651ab8521ca2a"
  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs(){
    axios.get(getLogurl).then((response) => {
      remapResponseData(response.data);
    });
    
  }

  function remapResponseData(param){
    setResponse(param)
    console.log(resp)
    try{
      const a= resp.map(r => <li>{r.fileName}<button onClick={event => setChart(event, r.url)}>Görüntüle</button><button onClick={event => removeF(event, r.fileName)}>Sil</button></li>);
      setTempResp(a);
    }
    catch(e) { 
      setTempResp([]);
      console.error(e);
    }
  }

  async function getFiles(){
    const files = await Storage.list('admin/')
    try{
      const fUl= files.map((file) => <li>{file.key}<button onClick={event => removeF(event, file.key)}>Sil</button><button onClick={logViewClick}>Görüntüle</button></li>);
      setfList(fUl);
    }
    catch(e) { 
      setfList([]);
      console.error(e);
    }
  }
  const setChart = async(event,param) => {
    const response = await fetch(param);
    const data = await response.json();
    setLogData(data);
    console.log(data);
    setOptions([{
    title: {
      text: 'System Modules'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['C1', 'C2', 'C3', 'C4', 'C5','C6','C6','C7']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },dataZoom: [
      {
        textStyle: {
          color: "#8392A5",
        },
        handleIcon:
          "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        dataBackground: {
          areaStyle: {
            color: "#8392A5",
          },
          lineStyle: {
            opacity: 0.8,
            color: "#8392A5",
          },
        },
        brushSelect: false,
      },
      {
        type: "inside",
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[1][0][0]
    },
    yAxis: {
      type: 'value'
    },
      series: [
        {
          name: 'C1',
          type: 'line',
          stack: 'Total1',
          data: data[1][0][2]
        },{
          name: 'C2',
          type: 'line',
          stack: 'Total2',
          data: data[1][0][3]
        },{
          name: 'C3',
          type: 'line',
          stack: 'Total3',
          data: data[1][0][4]
        },{
          name: 'C4',
          type: 'line',
          stack: 'Total4',
          data: data[1][0][5]
        },{
          name: 'C5',
          type: 'line',
          stack: 'Total5',
          data: data[1][0][6]
        },{
          name: 'C6',
          type: 'line',
          stack: 'Total6',
          data: data[1][0][7]
        },{
          name: 'C7',
          type: 'line',
          stack: 'Total7',
          data: data[1][0][8]
        }
      ]
    },{title: {
      text: 'Battery Details'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Vpack', 'Ipack', 'SOC']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        textStyle: {
          color: "#8392A5",
        },
        handleIcon:
          "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        dataBackground: {
          areaStyle: {
            color: "#8392A5",
          },
          lineStyle: {
            opacity: 0.8,
            color: "#8392A5",
          },
        },
        brushSelect: false,
      },
      {
        type: "inside",
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[2][0]
    },
    yAxis: {
      type: 'value'
    },
      series: [
        {
          name: 'Vpack',
          type: 'line',
          stack: 'Total1',
          data: data[2][1]
        },{
          name: 'Ipack',
          type: 'line',
          stack: 'Total2',
          data: data[2][2]
        },{
          name: 'SOC',
          type: 'line',
          stack: 'Total3',
          data: data[2][3]
        }
      ]
    },{title: {
      text: 'Stacked Line'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['VCmax', 'VCmin', 'Vd', 'Tmax', 'Tmin','Td','Tmean']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        textStyle: {
          color: "#8392A5",
        },
        handleIcon:
          "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
        dataBackground: {
          areaStyle: {
            color: "#8392A5",
          },
          lineStyle: {
            opacity: 0.8,
            color: "#8392A5",
          },
        },
        brushSelect: false,
      },
      {
        type: "inside",
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[3][0]
    },
    yAxis: {
      type: 'value'
    },
      series: [
        {
          name: 'VCmax',
          type: 'line',
          stack: 'Total1',
          data: data[3][1]
        },{
          name: 'VCmin',
          type: 'line',
          stack: 'Total2',
          data: data[3][2]
        },{
          name: 'Vd',
          type: 'line',
          stack: 'Total3',
          data: data[3][3]
        },{
          name: 'Tmax',
          type: 'line',
          stack: 'Total4',
          data: data[3][4]
        },{
          name: 'Tmin',
          type: 'line',
          stack: 'Total5',
          data: data[3][5]
        },{
          name: 'Td',
          type: 'line',
          stack: 'Total6',
          data: data[3][6]
        },{
          name: 'Tmean',
          type: 'line',
          stack: 'Total7',
          data: data[3][7]
        }
      ]
    }])
    setShowChart(true);
  }
  const removeF = async (event, param) => {
    axios.get(deleteurl+param).then((response) => {
      fetchLogs();
    });
  };
  useEffect(() => {
    getFiles();
  },[]);
  //console.log(fList);
  const uploadJson = async () => {
    var options = { headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' } };
    axios.put(uploadLink,file).then(response => {
      console.log(response.data);
    })
  };
 
  

//<ul>{fList}</ul>
  return (
    <div className='log'>
      <input type="file" accept="json" onChange={e => setJsonData(e.target.files[0])}/>
      <button onClick={uploadJson}>Yükle</button><br/>
      <button onClick={remapResponseData}>List Logs</button>
      <ul>{tempResp}</ul>
      {showChart ? <div><ReactECharts option={options[0]}/><br/><ReactECharts option={options[1]}/><br/><ReactECharts option={options[2]}/></div>: 'yok sana chart'}
    </div>
  );
}
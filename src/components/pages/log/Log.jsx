import React from 'react'
import './log.css'
import { Amplify, Storage,StorageProvider, Auth } from 'aws-amplify';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect , useCallback} from 'react';


export default function Log() {
  const[jsonData, setJsonData] = useState();
  const[fList, setfList] = useState();
  const navigate = useNavigate();
  const logViewClick = useCallback(() => navigate('log/charts', {replace: true}), [navigate]);
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
  async function showCharts(){
    
  }
  const removeF = async (event, param) => {
    await Storage.remove(param);
    getFiles();
  };
  useEffect(() => {
    getFiles();
  },[]);
  console.log(fList);
  const uploadJson = async () => {
    //Upload the song
    const userInfo = await Auth.currentUserInfo();
    console.log('userInfo:', userInfo);
    var fileName = userInfo.username +"/"+ jsonData.name;
    console.log('çalıştı',jsonData);
    const result = await Storage.put(fileName, jsonData,{
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total} `);
      },
    });
    getFiles();
  };
  return (
    <div className='log'>
      <input type="file" accept="json" onChange={e => setJsonData(e.target.files[0])}/>
      <button onClick={uploadJson}>Yükle</button>
      <ul>{fList}</ul>
    </div>
  );
}
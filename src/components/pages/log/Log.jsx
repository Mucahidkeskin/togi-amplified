import React from 'react'
import './log.css'
import { Amplify, Storage,StorageProvider, Auth } from 'aws-amplify';

import { useState } from 'react';


export default function Log() {
  const[jsonData, setJsonData] = useState();
  const uploadJson = async () => {
    //Upload the song
    const userInfo = await Auth.currentUserInfo();
    console.log('userInfo:', userInfo);
    var fileName = userInfo.username +"_"+ jsonData.name;
    console.log('çalıştı',jsonData);
    const result = await Storage.put(fileName, jsonData,{
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total} `);
      },
    });
};
  return (
    <div className='log'>
      <input type="file" accept="json" onChange={e => setJsonData(e.target.files[0])}/>
      <button onClick={uploadJson}>Yükle</button>
    </div>
  );
}
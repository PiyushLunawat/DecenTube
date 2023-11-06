import React,{useState,useEffect} from 'react';
import Web3 from 'web3';
import Youtube from './contracts/Youtube.json';
import {FileUpload} from 'react-ipfs-uploader';
import './App.css';
import Card from './Cards.js'

var uri = '';

export default function App() {


  const [web3,setweb3] = useState(null);
  const [contract,setcontract] = useState(null);
  const [address,setadd] = useState('');
  const [url,seturl] = useState('');
  const [about,setabout] = useState('');
  const [arr,setarr] = useState([]);
  const currentUrl = localStorage.getItem('url');
  const text = localStorage.getItem('text');

    useEffect(()=>{
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
          
            setweb3(new Web3(window.ethereum));
            setadd(res[0]);
        
      }) 
    }else{
      alert("install metamask extension!!")
    }
  },[window.ethereum])

  useEffect(()=>{
      web3 && setcontract(new web3.eth.Contract(Youtube.abi,'0x6Fdd71f2ABe9b7D4119D917E0f82600a3c462739'));
  },[web3])


  useEffect(()=>{

      contract && contract.methods.putVideo(url,about).send({from:address});
    
  },[url])
  
  useEffect(()=>{

      const videos = [];
      const getvids = async()=>{
        const total =await contract.methods.totalVideos.call().call();
        console.log(total);
        console.log(uri)
        for(var i = 0;i<total;i++)
        {
          videos.push(await contract.methods.videos(i).call());
        }

        setarr(videos);
      }

      contract && getvids();
  },[contract])


  



  return (
    <>
    <div className="header">
        <img src="https://cdn.pixabay.com/photo/2016/07/03/18/36/youtube-1495277__340.png" className='image' />
        DECENTRATUBE
      </div>
    <div className='x'>
      
         <div className="video">

         <video width="600" height="400" controls>
          <source src={currentUrl} type="video/mp4"/>
          </video>
          <div className='abt'>
            {text}
          </div>

         </div>
         <div className="data">

            <div className="input">
            <input type="text" placeholder='About' className='inp' value={about} onChange={(e)=>{setabout(e.target.value)}}/>

              <FileUpload setUrl={seturl} />
            </div>
            <div className="list">

                {
                  arr.map((item,key)=>{
                    return(
                     <button className='y' onClick={async()=>{localStorage.setItem('url',item.ipfslink);localStorage.setItem('text',item.about);window.location.reload()}}><Card id = {parseInt(item.Id) + 1} about={item.about}/></button>
                    )
                  })
                }

            </div>
         </div>

    </div>
    </>
  )
}




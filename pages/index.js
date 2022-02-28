import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useState , React } from 'react';

export const getStaticProps = async () =>{
  const res = await fetch("https://restcountries.com/v3.1/all");
  const values = await res.json();
  
  return{
    props:{
      values,}
  };
};

function dateTime(timezone){
  let offset1 = timezone.split("C");
  let offset2 = offset1[1].split(":");
  let offset3=parseInt(offset2[0]);
  let offset4 =parseInt(offset2[1]);
  let offset = offset3+(offset4/60);
  let x = new Date();
  let month = x.getMonth();
  let months =["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let day = x.getDate();
  let year = x.getFullYear();
  let str1 = ""
  let str=""
  let str2= ""
  str1= day+" " +months[month] + " "+ year;
  let localTime = x.getTime();
  let localOffset = x.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let nd = new Date(utc + (3600000*offset));
  let h = nd.getHours();
  let m = nd.getMinutes();
  let h1="";
  let m1 ="";
  if(h<10){
    h1=h1+"0"+h.toString();
  }
  if(m<10){
    m1=m1+"0"+m.toString();
  }
  if(h<10){
    if(m<10){
      str2 = h1+":"+m1;
    }
    else{
      str2 = h1+":"+m;
    }
  }
  else{
    if(m<10){
      str2 = h+":"+m1;
    }
    else{
      str2 = h+":"+m;
    }
  }
  str=str1+" and "+str2;
  
  return(str)
}

  

  

  
      
  
  
  
    
    
   




export default function Home({values}) {
  
 
  const [data, setvalue] = useState(values);
  const [tk, tki] = useState('');
  const find = async(Event) =>{
    Event.preventDefault();
    
    console.log(tk);
    const apid = await fetch("https://restcountries.com/v3.1/name/"+tk);
    let apide = await apid.json();
    console.log(apide);
    setvalue(apide);
  }

  
 
  
  
    
  
  
     
  
  
      
  
  
    
    
      
 
  
  return (
    <div className="borderbox">
      <Head>
        <title>countryinfo</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      
      <h1 id="head">Countries</h1>
      <form  className="example" >
      <input   type="text" placeholder="Search countries" name="search" value ={tk}id="myInput" onChange={e => tki(e.target.value)} />
      <button  type="button" name="search"  onClick={find} ><i className="fa fa-search"></i></button>
      </form>
      
      {
        data.slice(0,4).map((curr) =>{
           let next = "NULL";
          if(curr.currencies)
          {
            next = Object.values(curr.currencies)[0].name;
          }
          
          return <div key = {curr.id} className='box'  >
               
               <div className='sec' >
                 <img src={curr.flags.png} object-fit='fill'width='100%' height='100%'></img>
               </div>
               <div className='thir'>
                <h1 className='cn'> {curr.name.common}</h1>
                <div className='cne'>Currency:{next}</div>
                <div className='cned'>Current date and time : {dateTime(curr.timezones[0])} </div>
                <div className='six'>
                <div className='four'>
                 <Link href={curr.maps.googleMaps}><a className='sh'>Show Map</a></Link>
                 </div>
                 <div className='five' key={curr.cca3}>
                <Link  href={`/country/${curr.cca3}`}><a className='dd'>Detail</a></Link>
            
              </div>
              </div>
              </div>
              
          
            
         


           </div>

        
        } )
      }

    </div>
  

     
  )
}



  
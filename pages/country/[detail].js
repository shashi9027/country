export const getStaticPaths = async () =>
{
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  const paths = data.map((currElem) => {
    return {
      params:{
        detail : currElem.cca3.toString(),
      },
    }
  })
  return {
    paths,
    fallback:false,
  }
}

export const getStaticProps = async (context) =>
{
  const id = context.params.detail;


  const res = await fetch("https://restcountries.com/v3.1/alpha/"+id);
  const data = await res.json();
  return {
    props:{
      data,
    }
  }
  
}
const myData = ({data}) =>{
  let re="NULL",red="NULL";
  re = Object.values(data[0].name.nativeName)[0];
  red = Object.values(re)[0];
  var lan = Object.values(data[0].languages)[0];
  var lane = Object.values(lan);
  let neighbour;
  if(data[0].borders)
  {
   neighbour  = data[0].borders.map((necon)=>{
    return ("https://countryflagsapi.com/png/"+necon);
  })}
  console.log(neighbour);
  
  
  let next = "NULL";
          if(data.currencies)
          {
            next = Object.values(data.currencies)[0].name;
          }
  return (
    <div>
    <div id="first">
      <div id = "second" className="child">
        <h1 id="name">{data[0].name.common} </h1>
        <img src={data[0].flags.png} id="image"></img>
      </div>
      <div id = "third" className="child">
        <div id="native" className="fo">NativeName:{red}</div>
        <div id="capital" className="fo"> Capital:{data[0].capital}</div>
        <div id="popu" className="fo">Population:{data[0].population}</div>
        <div id="Region" className="fo">Region:{data[0].region}</div>
        <div id ="Sub" className="fo">Sub-Region:{data[0].subregion} </div>
        <div id="Area" className="fo">Area:{data[0].area} </div>
        <div id="Country" className="fo">Country-Code:</div>
        <div id="lang" className="fo">Languages:{lane}</div>
        <div id="curr" className="fo">Currency:{next} </div>
        <div id="time" className="fo">TimeZones:{data[0].timezones}</div>
      </div>
      
      
    
    </div>
    <div className="neighbour">
      <div className="hene">Neighbour Countries</div>
           <div className="hened">
           {neighbour.map((value, index)=>( <div  className="neimg" key={index} >
               <img src={value} object-fit='fill' width='100%' height='100%' />
          
            </div>))}
            </div>
         
      <div/>
      
    </div>
    </div>
  )
  
}
export default myData

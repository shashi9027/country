import {useRouter} from "next/router";
          

export async function getServerSideProps({query})
{
    const {blogId} = query;
    console.log(blogId);
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${blogId}`);
    const data = await res.json();
    console.log(data);
  
  return{
    props:{
      data,}
  };
}
export default function resting(props)
{
    const data = props.data;
    let next = "NULL";
    next = Object.values(data)[0];
    console.log(next);
    
       
       return <div>
           
       <div></div>
            
       </div>
}

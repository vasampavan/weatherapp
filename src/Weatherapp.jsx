import { useEffect } from "react"
import { useState } from "react"
import { LuWaves } from "react-icons/lu";
import { PiCloudSunFill } from "react-icons/pi";
 import { BiWind } from "react-icons/bi";
 import { HiSun } from "react-icons/hi";
 import './weatherapp.css'  
 const API="0d61912f231b5951e8fa430df0597242"
function Weatherapp(){
    const [city,setCity]=useState('')
    const [weatherdata,setWeatherdata]=useState(null)
  
    const [search,setSearch]=useState(false)
    const fetchweatherdata=async()=>{
        try {
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
            const data=await response.json()
            setSearch(true)
            if (data.cod === "404") {
            setWeatherdata(null); 
        } else {
            setWeatherdata(data);
           
        } }catch (error) {
            setWeatherdata(null)
            
            setSearch(true)
            
        }
    }
    useEffect(()=>{
        if(city){
             fetchweatherdata()
        }
    },[city,search])
    return(
        <div className="weathercontainer">
            <div className="searchbox">
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City Name" />
               
            </div>
            
            {search &&(
                    <div >
                            {weatherdata?(
                            <div className="weatherdetails">
                                <div className="temp">
                                    {(weatherdata?.main?.temp-273.15)?.toFixed(2)}C
                                </div>      
                                <div className="cityname">
                                {
                                    weatherdata?.name
                                }
                                </div>        
                                <div className="infocard">
                                    {<BiWind />}
                                    <p>{(weatherdata?.wind?.speed*3.6)?.toFixed(2)} kmph</p>
                                </div>
                                 <div className="infocard">
                                    {<LuWaves />}
                                    <p>{(weatherdata?.main?.humidity?.toFixed(2))}</p>
                                </div>
                                <div className="infocard">
                                    {<HiSun />}
                                    <p>{new Date(weatherdata?.sys?.sunrise*1000)?.toLocaleTimeString([],{
                                        hour:"2-digit",
                                        minute:"2-digit"
                                    })}</p>
                                </div>
                                 <div className="infocard">
                                    {<PiCloudSunFill />}
                                    <p>{new Date(weatherdata?.sys?.sunset*1000)?.toLocaleTimeString([],{
                                        hour:"2-digit",
                                        minute:"2-digit"
                                    })}</p>
                                </div>
                                
                            </div>):(
                                <div className="errormessage">City not found!</div>
                            )
                        }
                         
                    </div>
            )
        }
        </div>
    )
}
export default Weatherapp
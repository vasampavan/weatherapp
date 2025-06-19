import { useEffect } from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { LuWaves } from "react-icons/lu";
import { PiCloudSunFill } from "react-icons/pi";
 const API="0d61912f231b5951e8fa430df0597242"
 import { BiWind } from "react-icons/bi";
 import { HiSun } from "react-icons/hi";
function Weatherapp(){
    const [city,setCity]=useState('')
    const [weatherdata,setWeatherdata]=useState(null)
    const [search,setSearch]=useState(false)
    const fetchweatherdata=async()=>{
        try {
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
            const data=await response.json()
            setSearch(true)
            console.log(data)
            setWeatherdata(data)
        } catch (error) {
            console.log("Error fetching weather data",error)
            setWeatherdata(null)
            setSearch(true)
        }
    }
    useEffect(()=>{
        if(city && search){
             fetchweatherdata()
        }
    },[city,search])
    return(
        <div className="weather-container">
            <div className="search-box">
                <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City Name" />
                <button onClick={fetchweatherdata}><FaSearch /></button>
            </div>
            {search &&(
                    <div >
                        {weatherdata?(
                            <div className="weather-details">
                                <div className="temp">
                                    {(weatherdata?.main?.temp-273.15)?.toFixed(2)}C
                                </div>      
                                <div className="city-name">
                                {
                                    weatherdata?.name
                                }
                                </div>        
                                <div className="info-card">
                                    {<BiWind />}
                                    <p>{(weatherdata?.wind?.speed*3.6?.toFixed(2))}kmph</p>
                                </div>
                                 <div className="info-card">
                                    {<LuWaves />}
                                    <p>{(weatherdata?.main?.humidity)}</p>
                                </div>
                                <div className="info-card">
                                    {<HiSun />}
                                    <p>{new Date(weatherdata?.sys?.sunrise*1000)?.toLocaleTimeString([],{
                                        hour:"2-digit",
                                        minute:"2-digit"
                                    })}</p>
                                </div>
                                 <div className="info-card">
                                    {<PiCloudSunFill />}
                                    <p>{new Date(weatherdata?.sys?.sunset*1000)?.toLocaleTimeString([],{
                                        hour:"2-digit",
                                        minute:"2-digit"
                                    })}</p>
                                </div>
                            </div>
                        ): (<div className="error-message">Wheather not found</div>)
                        }
                    </div>
                )
            }
        </div>
    )
}
export default Weatherapp
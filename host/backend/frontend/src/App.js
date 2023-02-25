import { useState,useEffect } from 'react';
import pinPoint from './pin.png'
import ReactMapGL from 'react-map-gl';
import Map, {Marker,Popup} from 'react-map-gl';
import { Room, Star, StarBorder } from "@material-ui/icons";
import 'mapbox-gl/dist/mapbox-gl.css'; 
import './app.css'
import axios from 'axios'
import {format} from 'timeago.js'
import Register from './components/Register';
import Login from './components/Login';


function App() {

  const[ currentUser,setCurrentUser] =useState(window.localStorage.getItem("user"))
  const [pins,setPins] =useState([])
  const [currentPlaceId,setCurrentPlaceId]=useState(null)
  const [newPlace,setNewPlace]=useState(null)
  const [viewport2, setViewport2]=useState({long:77.2090, lat:28.6139})
  const [title,setTitle]= useState(null)
  const [desc,setDesc]=useState(null)
  const [rating,setRating]= useState(0)
  const [showRegister,setShowRegister]= useState(false)
  const [showLogin,setShowLogin]= useState(false)

  const [viewport, setViewport]=useState({
    width:400,
    height:400,
    longitude: -122.4,
    latitude: 37.8,
    zoom: 8
  })

  useEffect(()=>{
const getPins= async ()=>{
  try{
const res= await axios.get("/pins")
setPins(res.data)  
}

  catch(err)
{
console.log("error ->",err)
}}
getPins()
  },[])

  const handleMarkerClick=(id,long,lat)=>{
    console.log("Marker clicked",long, lat)
setCurrentPlaceId(id)
setViewport2({long,lat})
  }
const handleAddClick=(e)=>{
  console.log("vp",viewport2)
const lng = e.lngLat.lng
const lat= e.lngLat.lat
console.log(lng,lat)
setNewPlace({
  lng,lat
})
}
const handleSubmit= async(e)=>{
  e.preventDefault()

  const newPin={
    username:currentUser,
    title,
    desc,
    rating,
    lat:newPlace.lat,
    long:newPlace.lng
  }
try{
const res= await axios.post("/pins", newPin)
setPins([...pins,res.data])
setNewPlace(null)

}
catch(err){
  console.log(err)
}

}

const handleLogout=()=>{
  window.localStorage.removeItem("user")
  setCurrentUser(null)
}
  return (
    <div className="App">
  


<Map

style={{position:"absolute", top:"0", bottom:"0", width:"100%"}}
    initialViewState={{
      longitude: viewport2.long,
      latitude: viewport2.lat,
      zoom: 6,
      
    }}
    mapboxAccessToken ='your mapbox api key'
    
    
    mapStyle="mapbox://styles/mapbox/streets-v9"

    onDblClick={handleAddClick}
  >
 
    {pins.map((p,index)=>{

    return( 
<>
   
    <Marker longitude={p.long}  key={index}latitude={p.lat} anchor="bottom" >
   
    <Room
    onClick={()=>handleMarkerClick(p._id,p.long,p.lat)
    }
                style={{
                  color :p.username===currentUser ? "tomato" :"slateblue",
                  fontSize: 7 * viewport.zoom,
                  cursor:"pointer"
               
                }}
                
              />
  </Marker>

  { p._id===currentPlaceId  && (

  
 <Popup

longitude={p.long} latitude={p.lat}
closeButton={true}
closeOnClick={false}
onClose={()=>setCurrentPlaceId(null)}

anchor="left"
>
  <div className="card">
  <label htmlFor="">Place</label>
  <h4 className="place">{p.title}</h4>
<label htmlFor="">Review</label>
<p className='desc'>{p.desc}</p>
<label htmlFor="">Rating</label>
<div className='stars'>

{Array(p.rating).fill(<Star className="star" />)}




</div>
<label htmlFor="">Infromatiozn</label>
<span className='username'> Created by <b>{p.username}</b></span>
<span className='date'>{format(p.time)}</span>
  </div>

</Popup> 
      )  }
</>
)})}
{newPlace && <Popup

longitude={newPlace.lng} 
latitude={newPlace.lat}
closeButton={true}
closeOnClick={false}
onClose={()=>setCurrentPlaceId(null)}

anchor="left"
>
  <div>
   <form onSubmit={handleSubmit}>
   <label >Title</label>
   <input placeholder='Enter a title'  
   onChange={(e)=>setTitle(e.target.value)}/>
    <label >Review</label>
    <textarea 
    onChange={(e)=>setDesc(e.target.value)}
    placeholder='Say us something about this place'
     > 
      </textarea>
    <label >Rating</label>
    <select 
    onChange={(e)=>setRating(e.target.value)}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button className='submitButton' type="submit">Add pin</button>
   </form>
  </div>
  </Popup>}
   

   {currentUser? (<div className="btn">
   <button className="button logout" onClick={handleLogout} >Log out</button>
  
   </div>):(<div className="btn">

  <button className="button login" onClick={()=>{setShowLogin(true)
  setShowRegister(false)}}>Login</button>
  <button className="button register" onClick={()=>{setShowRegister(true)
  setShowLogin(false)}} >Register</button>
   </div>)}

 {showRegister&& <Register setShowRegister={setShowRegister}/>}
 {showLogin&& <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser}/>}

{currentUser &&<div className='greeting'>
<p>Howdy! {currentUser}</p>
</div> }
    </Map>



    </div>
  );
}

export default App;

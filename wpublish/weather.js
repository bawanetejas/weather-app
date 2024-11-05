
let yourweather=document.querySelector("[your-weather]");
let Searchweather=document.querySelector("[Search-weather]");
let loading=document.querySelector(".loadingimg")
let grantAccessContainer=document.querySelector(".grant-location-contai")
let formcontainer=document.querySelector("[formcontainer]");
let currentTab=yourweather;
let errorsec=document.querySelector(".error-sec");
currentTab.classList.add("active");
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
let informationcontainer=document.querySelector("[information-container]")
getfromSessionStorage();

function switchTab(newTab){
    if(newTab != currentTab){
        currentTab.classList.remove("active")
        currentTab = newTab;
        currentTab.classList.add("active");
        
        if(Searchweather.classList.contains("active")){
            grantAccessContainer.classList.remove("active");
            informationcontainer.classList.remove("active");
            formcontainer.classList.add("active");
        }
        else{
            informationcontainer.classList.remove("active");
            formcontainer.classList.remove("active");
            // userweather();
            getfromSessionStorage();
            // grantAccessContainer.classList.remove("active");
        }
  
}
}
yourweather.addEventListener("click",()=>{
    switchTab(yourweather)
});
Searchweather.addEventListener("click",()=>{
    switchTab(Searchweather)
});


function geolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(userposition)
    }
    else{
        alert("not support geoloction");
    }
}

function userposition(position){

    let userCoordinates={
        lat : position.coords.latitude,
        lon : position.coords.longitude
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates))
    fetchUserWeatherInfo(userCoordinates);
}

function getfromSessionStorage(){
    let localCoordinates = sessionStorage.getItem("user-coordinates")

    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        let coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    let {lat, lon}=coordinates;
    errorsec.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    loading.classList.add("active");
    try{
        let info= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        const respons= await info.json();
        loading.classList.remove("active");
        informationcontainer.classList.add("active");
        renderWeatherInfo(respons);
        // console.log(respons)
    }
    catch(e){
        loading.classList.remove("active");
        console.log("got error", e)
    }
  
    
}

 let cityName=document.querySelector("[city-name]")
 let flag=document.querySelector("[flag]");
 let description=document.querySelector("[description]");
 let Weatherimg=document.querySelector("[weather-img]")
 let tepmerature=document.querySelector("[temp]");
 let wind=document.querySelector("[wind]");
 let humidity=document.querySelector("[humidity");
 let clouds=document.querySelector("[clouds]");

function renderWeatherInfo(respons){

    cityName.innerText=respons?.name;
    if(cityName.innerText === "undefined"){
        informationcontainer.classList.remove("active");
        errorsec.classList.add("active");
    }
    else{
        errorsec.classList.remove("active");
    }
    flag.src= `https://flagcdn.com/144x108/${respons?.sys?.country.toLowerCase()}.png`;
    Weatherimg.src= `http://openweathermap.org/img/w/${respons?.weather?.[0]?.icon}.png`;
    tepmerature.innerText= `${respons?.main?.temp}°C`;
    wind.innerText = `${respons?.wind?.speed} M/s`;
    humidity.innerText = `${respons?.main?.humidity} %`;
    clouds.innerText = `${respons?.clouds?.all} %`;
    description.innerText=respons?.weather?.[0]?.description;

}

let grantAccessButton=document.querySelector("[grant-access]");

grantAccessButton.addEventListener("click",geolocation);

let searchInput=document.querySelector("[search-Input]");

formcontainer.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ""){
        return;
    }
    else{  console.log(cityName)

        fetchSearchWeatherInfo(cityName); 
    }

})

  async function fetchSearchWeatherInfo(city){
    informationcontainer.classList.remove("active");
    errorsec.classList.remove("active");
    loading.classList.add("active");
    try{
        let searchCity= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let info= await searchCity.json();
        loading.classList.remove("active");
        informationcontainer.classList.add("active");
        renderWeatherInfo(info);
    }
    catch(e){
        console.log(e);
    }
}


//Add click eventListener On DOM load
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById("generate").addEventListener("click",function(){
        document.getElementById('Messages').classList.remove('Hidden');
        GetTemperature();
    } );
});
//Hide Results Menu on retry
function HideMenu(){
    document.getElementById('Messages').classList.add('Hidden');
}

// API Zip Code Format
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={0e4242a53a1d5718c772768681d3e601}
let CurrentDate= "";
function GetTemperature(){
    CurrentDate = new Date().getDate() +'/'+ (new Date().getMonth() +1)+'/'+ new Date().getFullYear();
    document.getElementById('Messages').classList.remove('Hidden');
    let ZipCode = document.getElementById('zip').value;
    UseAPI(ZipCode)
    //Before Review Code - .then(function(){UpdateClientSide();})
}

//Getting the temperature using the API, and other variables from on Client Submit
async function UseAPI(ZipCode){
    await fetch('http://api.openweathermap.org/data/2.5/weather?zip='+ZipCode+'&appid=0e4242a53a1d5718c772768681d3e601').then(function(response){
        response.json().then(function(data) {
            let API_Data = data.main.temp - 273.15;
            let Feeling = document.getElementById('feelings').value;
            PostData('/ClientData',{Date :CurrentDate, Temperature: Math.round(API_Data) ,Feelings:Feeling } );
            UpdateClientSide();
        });
    }).catch(function(error) {
        console.log('Fetch Error:', error);
    });
}
//Posting the ClientData to serverSide
async function PostData(url='',data ={}) {
    //console.log(data);
    const resultResponse = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    });
    const newData = await resultResponse.json();
    try{
        const newData = await resultResponse.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log('The error is',error)
    }
  }
 
//Updating ClientSide using server Response
async function UpdateClientSide(){
    await fetch('/AppData').then(function(response){
    response.json()
    .then(function(FinalRequest) {
        if(FinalRequest.Date != CurrentDate){GetTemperature();}
        else{
        console.log(FinalRequest);
        document.getElementById('temp').innerHTML= FinalRequest.Temperature ;
        document.getElementById('date').innerHTML  = FinalRequest.Date;
        document.getElementById('content').innerHTML = FinalRequest.Feelings ;
        }
    });})
    .catch(function(error) {
        console.log('Fetch Error:', error);
    });
}
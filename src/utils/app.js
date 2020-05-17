const request=require('request');
const forecast=require('./forecast.js');
const geocode=require('./geocode.js');

// latitue=process.argv[2];
// longitude=process.argv[3];

address=process.argv[2];
console.log(address);

geocode(address,(error,data)=>{
    if(error)
    {
        console.log("Please enter a valid location");
    }
    else{
       longitude=data.center[0];
         latitude=data.center[1];
    
        forecast(latitude,longitude,(error,data)=>{
            console.log(latitude);
            console.log(longitude);

            console.log("The temperature of "+address+" is "+data.temperature+"and it feels like "+data.feelslike);
        
        });
    }
});


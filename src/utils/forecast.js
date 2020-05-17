const request=require('request');

const forecast=(latitude,longitude,callback)=>{

    const url="http://api.weatherstack.com/current?access_key=7d1c9307e050e644689772879454d0cf&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"";
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback("Unable to connect to location services",undefined);
        }
        else if(response.body.error)
        {
            callback("Please specify a valid location",undefined);
        }
        else{
            callback(undefined,"The temperature is "+response.body.current.temperature+" and it feels like "+response.body.current.feelslike);
        }
    });

}




module.exports=forecast;
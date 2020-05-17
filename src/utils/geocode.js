const request=require('request');


const geocode=(address,callback)=>{

    const murl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicHJpbmNlYXVndXN0aW5lOTUiLCJhIjoiY2s5cnV3bXhmMHM2YjNsbHp3azRqd3hqbSJ9.wUlygJVne2UrKd-MLKkYEw";

  

    request({url:murl,json:true},(error,response)=>{

        if(error)
        {
            callback("Unable to connect to Location Service",undefined);
        }
        else if(response.body.features.length===0)
        {
            callback("Please enter a valid Location",undefined);

        }
        else{
            callback(undefined,{

                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            });
            
        }
    });
}

module.exports=geocode;
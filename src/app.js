const path=require('path');
const express= require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast= require('./utils/forecast');

const app=express();

console.log(__dirname);
console.log(__filename);

const statictemplate=path.join(__dirname,'../public');

//app.use or the use method needs to used to to serve up the static content.
//the use method takes a function called express.static()
app.use(express.static(statictemplate));

//so inorder to render dynamic content rather than static content we need a npm module called handle bars
//hbs is package which used ot render dynamic content
//hbs is set up as app.set('view engine','hbs');

const dynamictemplate=path.join(__dirname,'../templates');
const partialsPath=path.join(__dirname,'../templates/partials');



app.set('view engine','hbs');
app.set('views',dynamictemplate);



hbs.registerPartials(partialsPath);
app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather',
        name:'Prince Augustine'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Prince Augustine'
    });
});

app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        helpText:'This is the page where you will find all the useful document',
        name:'Prince Augustine'
    });
});


app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:"Address not provided"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            });
        }

        forecast(latitude,longitude,(error,forecastData)=>{

            if(error)
            {
                return res.send({error});
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address

            });


        });


    });
    // res.send({
    //     forecast:'Its currently raining',
    //     location:'Brampton',
    //     address:req.query.address
    // });
});


app.get('/products',(req,res)=>{
   if(!req.query.search)
   {
       return res.send({

        error:"No search value found"

       });
   }
    res.send({
        products:[]
    });
});

app.get('*',(req,res)=>{

    res.render('error',{
        title:'404 page',
        helpText:'The page you want to visit doesnt exist',
        name:'Prince Augustine'
    });
});
app.listen(3000,()=>{
    console.log("Server is running in port 3000");
});
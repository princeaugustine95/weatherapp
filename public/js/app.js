const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const errorMessage=document.querySelector('.message1');
const correctMessage=document.querySelector('.message2');
weatherForm.addEventListener('submit',(event)=>{

    event.preventDefault();

const place=search.value;
    //console.log('Testing');
    //console.log(place);
    errorMessage.textContent="Loading";
    correctMessage.textContent="";


    fetch('http://localhost:3000/weather?address='+place).then((response)=>{

        response.json().then((data)=>{

            if(data.error)
            {
                errorMessage.textContent=data.error;
            }
            else{
                // console.log(data.forecast);
                // console.log(data.location);
                errorMessage.textContent=data.forecast;
                correctMessage.textContent=data.location;

            
            }

        });

});

});
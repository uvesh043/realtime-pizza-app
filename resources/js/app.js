const addToCart=document.getElementsByClassName('add-to-cart');
import axios from 'axios'
import Noty from "noty";



for(let i=0;i<addToCart.length;i++)
    {
        addToCart[i].addEventListener('click',(e)=>{
            const pizza=JSON.parse(addToCart[i].dataset.pizza);
            updateCart(pizza);
        })
        
    }forEach

    const qtyCounter=document.getElementById('qtyCounter');
    
    function updateCart (pizza){
        axios.post('/update-cart',pizza).then((res)=>{
    //    console.log(res);
       qtyCounter.innerText=res.data.totalQty;
       new Noty({
           type:'success',
           timeout:800,
            text: "pizza Added to Cart",
            progressBar:false,
            // layout:"bottomLeft"
      }).show();
   }).catch(()=>{
    new Noty({
        type:'error',
        timeout:1200,
         text: "something went wrong",
        //  progressBar:false,
         // layout:"bottomLeft"
   }).show()
   })
    }
'use strict'
//construct a function to create a PaymentRequest
//the three parameter :methodData,details,options
const supportedPaymentMethods = [
  {
    supportedMethods:"basic-card",
    data:{
      supportedNetworks:["visa","mastercard","amex"],
      supportedTypes:["debit","credit"],
    },
  },
  {
    supportedMethods:"https://example.com/bodypay",
    data:{
      merchantIdentifier:"XXX",
      bobPaySpecificField:true,
    },
  },
];

const allDisplayItems = [
  {
    label:"Sub-total",
    amount:{currency:"USD",value:55.00},
  },
  {
    label:"Sales_Tax",
    amount:{currency:"USD",value:5.00},
    type:"tax"
  },
  {
    label:"Sales_discount",
    amount:{currency:"USD",value:-1},
  }
]

//calculate the total value
const totalvalue = allDisplayItems.map(i=>i.amount.value).reduce((x,y)=>{
  return x+y;
},0);

const details = {
  id:"super-store-order-123-12312",
  displayItems:allDisplayItems,
  total:{
    label:"Total due",
    amount:{currency:"USD",value:totalvalue.toString()}
  },
};

//fill out the options
const options = {
  requestPayerEmail:true,
  requestPayerName:true,
  requestPayerPhone:true,
  requestShipping:true,
}

function validatePayment(paymentResponse){
  window.setTime(function(){
    paymentResponse
    .complete('success')
    .then(console.log('payment done:',paymentResponse))
    .catch(err => console.log(err));
  },2000)
}

function doCheckout(){
  if(window.Payment){
    //Use Payment Request API
    let request = new PaymentRequest(supportedPaymentMethods,details,options);

    let canMakePaymentPromise = Promise.resolve(true);
    //Feature detect canMakePayment
    if(request.canMakePayment){
      canMakePaymentPromise = PaymentRequest.canMakePayment();
    }
    console.log(request);

    canMakePaymentPromise
    .then((result)=>{
      if(!result){

        alert("no payment method supported by the user");
        return;
      }
     request
     .show()
     .then((paymentResponse)=>{
       return validatePayment(paymentResponse);
     })
     .catch(err=>{
       console.error(err);
     });
    })
    .catch(err=>{
      console.error(err);
    });
  }else{
    alert('This browser is not supported PaymentRequest');
  }
}

document.getElementById('checkoutButton').addEventListener('click', doCheckout);

create date:2018/05/07

intension:to create a my own payment request code by JavaScript

author:wangruoyu

source:https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request

note: 
    to verify whether the browser is available to PaymentRequest:
        if(window.PaymentRequest){
           //Use Payment Request API
        }else{
           //Fallback to traditional checkout
           window.location.href = '/checkout/traditional';
        }
    by the code,we look forword to:
        1.how our input affects the payment request UI
        2.how we can request information from user
        3.how the final payment and user information is passed to your site
    
    PaymentRequest Constructor:
        PaymentRequest(methodData,details,options)
            methodData:A sequence of PaymentRequest that that represents the payment methods that the site supports
            
            The details: The details of the transaction, as a PaymentDetailsInit dictionary. This includes total cost, and optionally a list of goods or services being purchased, for physical goods, and shipping options. Additionally, it can optionally include "modifiers" to how payments are made. 
            
            The options: Optionally, a list of things as PaymentOptions that the site needs to deliver the good or service (e.g., for physical goods, the merchant will typically need an physical address to ship to. For digital goods, an email will usually suffice). 
    
    Having gathered all the prerequisite bits of information,we can now construct a PaymentRequest and request that the browser present it to the user
    
    validatePaymentWithBackend:
            if you wanted to process the payment while the payment request UI is showing a spinner you'd delay the call to complete().
            
            the method that will check the details with our backend and return a promise resolving to a boolean(true if the payment was successful,false,otherwise)
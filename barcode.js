var Qrcode = require('qrcode');
console.log('hello');

 var qrtext = document.getElementById('text');

 const qrbtn = document.getElementById('btn');

 qrbtn.addEventListener('click', generateQr());


 function generateQr() {

    var data = qrtext.innerHTML;

    

    Qrcode.toCanvas(document.getElementById('qrcode'), data , (err, url)=>{

        console.log(url);
    
    })

}




/*
const qrbtn = document.getElementById('btn');

const text = document.getElementById('text').innerHTML;


qrbtn.addEventListener('click', generateQr(text));


function generateQr(data) {

  

 new QRCode(document.getElementById("qrcode"), data);

}

*/
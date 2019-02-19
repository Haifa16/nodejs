
const express = require('express'); // required = import modul
const hai = express(); // eksekusi modul

hai.get('/r6', function(request, respone) {
    respone.send("Haifa")
})

hai.listen('8080'); // port
const bodyParser = require('body-Parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBurl = "mongodb://127.0.0.1:27017/";
const DBname = "XIR6";

let dbo = null;
MongoClient.connect(DBurl, (error,db)=>{
    if (error) throw error;
    dbo = db.db(DBname);
});

const express = require('express');
const fungsi = express();
fungsi.use(bodyParser.urlencoded({extended: false}))

//method

//endpoint get dgn parameter
fungsi.get('/r6',(req,response)=>{ //:nama = parameter
    // let namaSiswa = req.params.nama; //deklarasi variabel namaSiswa
    dbo.collection("murid").find().toArray((err,res)=>{
        if(err) throw err;
        response.json(res);
    })
    // res.end("Nama saya "+ namaSiswa);
});

//endpoint post bobyParser u/ kirim data
// fungsi.post('/r6',(req,res)=>{
//     let namaSiswa = req.body.nama;
//     let alamat = req.body.address;
//     res.end("Nama siswa baru "+ namaSiswa +", yang beralamat di "+ alamat);
// });

fungsi.post('/r6',(req,response)=>{
    let namaSiswa = req.body.nama;
    let alamatSiswa = req.body.address;
    dbo.collection("murid").insertOne({
        nama : namaSiswa,
        alamat : alamatSiswa
    }, (err,res)=>{
        if(!err){
            response.json(res);
            response.end("data berhasil masuk");
        }else{
            throw err;
        }
    })
});

//data diakses scr spesifik dgn parameter
// fungsi.delete('/r6/:id',(req,res)=>{
//     let id = req.params.id;
//     let namaSiswa = req.params.nama;
//     res.end('id '+ id +' telah dihapus, dengan nama: '+ namaSiswa);
// });
fungsi.put('/r6/:id',(req,response)=>{
    let id = req.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa = req.body.nama;
    let kelasSiswa = req.body.kelas;
    let jurusanSiswa = req.body.jurusan;
    dbo.collection("murid").updateOne({
        _id : id_object
    }, {$set:{
        nama : namaSiswa,
        kelas : kelasSiswa,
        jurusan : jurusanSiswa
    }},
    (err,res)=>{
        if(!res) throw err;
        response.end("data berhasil diupdate");
    })
});
//update
// fungsi.put('/r6/:id',(req,res)=>{
//     let id = req.params.id;
//     let namaSiswa = req.params.nama;
//     let alamat = req.body.address;
//     res.end('Siswa dengan id: '+ id +' telah diupdate'); 
// });

fungsi.delete('/r6/:id',(req,res)=>{
    let id = req.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("murid").deleteOne({
        _id : id_object
    },(err,response)=>{
        if(err) throw err;
        res.end("data berhasil dihapus");
    })
});

fungsi.listen('12345', (e)=>{
    console.log("Berhasil");
});
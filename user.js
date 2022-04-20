var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const Web3 = require('web3');
const Window = require('window');
const window = new Window();
const Tx = require('ethereumjs-tx').Transaction;
var abi = require('../helper');
var instance;
var networkId;
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
//console.log(web3.eth);

const contractAddress = "0xD23d0998092C136FDAa3B57454E6CD8CceA75708";
const privateKey = Buffer.from(
    "fe78cd60406369705f7cc4253fa5d23a95a931767b016c4d45d21331f15b1f73",
    'hex',
  )
const myAddress = "0x6CBa88AF3EbE7Fcba991681dbad849268A105DBd";
    contract = new web3.eth.Contract(abi, contractAddress);



/**
 * @swagger
 * /api/Authenticate/{UserName}/{Password}:
 *  get:
 *    summary: Initial Setup
 *    parameters:
 *     - in: path
 *       name: UserName
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *     - in: path
 *       name: Password
 *       schema:
 *          type : string
 *          required : true
 *          description:  Password Required
 * 
 *
 *    tags:
 *      - Basic
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/Authenticate/:UserName/:Password', async (req, res) => {
         console.log(req.params);
    
        const result = await contract.methods.Authenticate(req.params.UserName,req.params.Password).call();
        res.send(result);
     });





/**
 * @swagger
 * /api/testConnection:
 *  get:
 *    summary: Admin Wallet Address
 *    tags:
 *      - getters
 *      
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/testConnection', async (req, res) => {
    const result = await contract.methods.AdminAddress().call();
    res.send(result);
 });


/**
 * @swagger
 * /api/getUserList:
 *  get:
 *    summary: Getting User Keylist
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/getUserList', async (req,res)=>{
    const result = await contract.methods.userKeys().call();
    res.send(result);
 });



 /**
 * @swagger
 * /api/getDrugDetails/{SerialNumber}:
 *  get:
 *    summary: Getting Baisc Drug details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *    
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
  router.get('/getDrugDetails/:SerialNumber', async (req,res)=>{
      console.log(req.params.SerialNumber);
    const result = await contract.methods.BatchDrugDetails(req.params.SerialNumber).call();
    res.send(result);
 });





/**
 * @swagger
 * /api/getDrugKeyList:
 *  get:
 *    summary: Getting Drug Key list
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/getDrugKeyList', async (req,res)=>{
    const result = await contract.methods.getDrugKeyList().call();
    console.log(result.length);
    res.send(result);
 });



/**
 * @swagger
 * /api/UserDetails/{UserName}:
 *  get:
 *    summary: get User Details
 *    parameters:
 *     - in: path
 *       name: UserName
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/UserDetails/:UserName', async (req,res)=>{
   const result = await contract.methods.BatchUserDetails(req.params.UserName).call();
   res.send(result);
});



/**
 * @swagger
 * /api/ManufacturerDetails/{SerialNumber}:
 *  get:
 *    summary: Manufacturer Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/ManufacturerDetails/:SerialNumber', async (req,res)=>{
   const result = await contract.methods.BatchManufactureringDetails(req.params.SerialNumber).call();
   res.send(result);
});



/**
 * @swagger
 * /api/DistributorDetails/{SerialNumber}:
 *  get:
 *    summary: Distributor Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/DistributorDetails/:SerialNumber', async (req,res)=>{
    const result = await contract.methods.BatchdistributorDetails(req.params.SerialNumber).call();
    res.send(result);
 });



/**
 * @swagger
 * /api/WholesalerDetails/{SerialNumber}:
 *  get:
 *    summary: WholeSaler Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/WholesalerDetails/:SerialNumber', async (req,res)=>{
   const result = await contract.methods.BatchWholesalerDetails(req.params.SerialNumber).call();
   res.send(result);
});


/**
 * @swagger
 * /api/PharmacyDetails/{SerialNumber}:
 *  get:
 *    summary: Pharmacy Details
 *    parameters:
 *     - in: path
 *       name: SerialNumber
 *       schema:
 *          type : string
 *          required : true
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/PharmacyDetails/:SerialNumber', async (req,res)=>{
   const result = await contract.methods.BatchPharmacyDetails(req.params.SerialNumber).call();
   res.send(result);
});

/**
 * @swagger
 * /api/UserRole/{UserName}:
 *  get:
 *    summary: User Role 
 *    parameters:
 *     - in: path
 *       name: UserName
 *       schema:
 *          type : string
 *          required : true
 *          description:  UserName Required
 *    tags:
 *      - getters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.get('/UserRole/:UserName', async (req,res)=>{
    const result = await contract.methods.userRole(req.params.UserName).call();
    res.send(result);
 });




/**
 * @swagger
 * /api/AddUser:
 *  post:
 *    summary: adding User Details
 *    tags:
 *      - Setters
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "Name":"Teja",
 *                  "Phone":1234,
 *                  "UserName":"Teja",
 *                  "Password":"Teja",
 *                  "Email":"Teja@mindtree.com",
 *                  "Role":"Manufacturer"
 *                  }
 * 
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
router.post('/AddUser', async (req, res) => {
    const params = req.body;
    const web3js = web3;
    web3js.eth.getTransactionCount(myAddress).then(function(v){
        console.log("Count: "+v);
        count = v;
        var amount = web3js.utils.toHex(1e16);
        //creating raw tranaction
        var rawTransaction = {
            "from":myAddress,
             "gasPrice":web3js.utils.toHex(25* 1e9),
             "gasLimit":web3js.utils.toHex(4481130),
             "to":contractAddress,"value":"0x0",
             "data":contract.methods.setUser(params.CurrentUser,params.Name,params.Phone,params.UserName,params.Password,params.Email,params.Role,false).encodeABI(),
             "nonce":web3js.utils.toHex(count)}
        console.log(rawTransaction);
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' })
        //signing transaction with private key
        transaction.sign(privateKey);
        //sending transacton via web3js module
        web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
        .on('transactionHash',console.log);
    })
    res.send("Check hash returned in terminal on Ganache")
})



/**
 * @swagger
 * /api/UpdateUser:
 *  post:
 *    summary: adding User Details
 *    tags:
 *      - Setters
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "Name":"Teja",
 *                  "Phone":1234,
 *                  "UserName":"Teja",
 *                  "Password":"Teja",
 *                  "Email":"Teja@mindtree.com",
 *                  "Role":"Manufacturer"
 *                  }
 * 
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/UpdateUser', async (req, res) => {
    const params = req.body;
    const web3js = web3;
    web3js.eth.getTransactionCount(myAddress).then(function(v){
        console.log("Count: "+v);
        count = v;
        var amount = web3js.utils.toHex(1e16);
        //creating raw tranaction
        var rawTransaction = {
            "from":myAddress,
             "gasPrice":web3js.utils.toHex(25* 1e9),
             "gasLimit":web3js.utils.toHex(4481130),
             "to":contractAddress,"value":"0x0",
             "data":contract.methods.setUser(params.CurrentUser,params.Name,params.Phone,params.UserName,params.Password,params.Email,params.Role,true).encodeABI(),
             "nonce":web3js.utils.toHex(count)}
        console.log(rawTransaction);
        //creating tranaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
        //signing transaction with private key
        transaction.sign(privateKey);
        //sending transacton via web3js module
        web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
        .on('transactionHash',console.log);
    })
    res.send("Check hash returned in terminal on Ganache");
})

/**
 * @swagger
 * /api/AddDrug:
 *  post:
 *    summary: adding drug Details  
 *    tags:
 *      - Setters
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Teja",
 *                  "DrugID":1,
 *                  "BatchID":2,
 *                  "DrugName":"Paracetmol",
 *                  "Location":"Manufacturer",
 *                  "Mfg":1649097200,
 *                  "Exp":1649097200,
 *                  "CurrentTemp":5,
 *                  "MaxTemp":10
 *                  }
 * 
 * 
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/AddDrug', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
    
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.addDrugDetails(params.CurrentUser,params.DrugID,params.BatchID,params.DrugName,params.Location,params.Mfg,params.Exp,params.CurrentTemp,params.MaxTemp,"0x0000000000000000000000000000000000000000").encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
      
        web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
        .on('transactionHash',console.log);
        
   })
   res.send("Check hash returned in terminal on Ganache")
}
catch(err){
    console.log(err)
}
});



/**
 * @swagger
 * /api/UpdateDrug:
 *  post:
 *    summary: Updating drug Details
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Sunu",
 *                  "DrugID":1,
 *                  "BatchID":2,
 *                  "DrugName":"Paracetmol",
 *                  "Location":"Manufacturer",
 *                  "Mfg":1649097200,
 *                  "Exp":1649097200,
 *                  "CurrentTemp":5,
 *                  "MaxTemp":10,
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa"
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/UpdateDrug', async (req, res) => {
     const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.addDrugDetails(params.CurrentUser,params.DrugID,params.BatchID,params.DrugName,params.Location,params.Mfg,params.Exp,params.CurrentTemp,params.MaxTemp,params.SerialNumber).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}
catch(err){
    console.log(err)
}
});





/**
 * @swagger
 * /api/ManufacturerShipping:
 *  post:
 *    summary: Shipping from Manufacturer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "Location":"Manufacturer",
 *                  "DistributorUserName":"Teja",
 *                  "ExportTemp":7
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/ManufacturerShipping', async (req, res) => {
    const params = req.body;
    console.log(params);
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.moveFromManufacturer(params.SerialNumber,params.CurrentUser,params.Location,params.DistributorUserName,params.ExportTemp).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")

   }
   catch(err){
    console.log(err)
}
});








/**
 * @swagger
 * /api/DistributorReceiving:
 *  post:
 *    summary: Distributor Receving from Manufacturer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "Location":"Manufacturer",
 *                  "ImportTemp":7
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/DistributorReceiving', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.distributorReceving(params.SerialNumber,params.CurrentUser,params.Location,params.ImportTemp).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}
catch(err){
    console.log(err)
}
});


/**
 * @swagger
 * /api/DistributorShipping:
 *  post:
 *    summary: Shipping from Distributor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "WholesalerUserName":"Teja",
 *                  "ExportTemp":7
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/DistributorShipping', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.moveFromDistributor(params.CurrentUser,params.SerialNumber,params.ExportTemp,params.WholesalerUserName).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}
catch(err){
    console.log(err)
}
});


/**
 * @swagger
 * /api/WholesalerReceiving:
 *  post:
 *    summary: Receving Drug From Distributor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "Location":"Manufacturer",
 *                  "ImportTemp":7
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/WholesalerReceiving', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.wholesalerReceving(params.SerialNumber,params.CurrentUser,params.Location,params.ImportTemp).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}  catch(err){
    console.log(err)
}
});



/**
 * @swagger
 * /api/WholesalerrShipping:
 *  post:
 *    summary: Shipping Drug from Wholesaler
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "PharmacyUserName":"Teja",
 *                  "ExportTemp":7
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/WholesalerrShipping', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.moveFromWholeSaler(params.CurrentUser,params.SerialNumber,params.ExportTemp,params.PharmacyUserName).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}
catch(err){
    console.log(err)
}
});

/**
 * @swagger
 * /api/PharmacyReceiving:
 *  post:
 *    summary: Importing Drug to Pharmacy
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "CurrentUser":"Admin",
 *                  "SerialNumber":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "Location":"Pharamcy",
 *                  "ImportTemp":7
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/PharmacyReceiving', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),
            "gasLimit":web3js.utils.toHex(4481130),
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.importToPharmacy(params.SerialNumber,params.CurrentUser,params.Location,params.ImportTemp).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}
catch(err){
    console.log(err)
}
});



/**
 * @swagger
 * /api/ChangeAdmin:
 *  post:
 *    summary: Change Admin
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              example:
 *                  {
 *                  "Admin":"Admin",
 *                  "WalletAddress":"0x06C4251B8dd763Ed3bC2A3156311bBE7A7f7A2Fa",
 *                  "newAdmin":"Teja"
 *                  }
 *    tags:
 *      - Setters
 *    responses:
 *      200:
 *        description: Login is successful
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Method Not Allowed
 */
 router.post('/ChangeAdmin', async (req, res) => {
    const params = req.body;
   const web3js = web3;
   try{
   web3js.eth.getTransactionCount(myAddress).then(function(v){
       console.log("Count: "+v);
       count = v;
       var amount = web3js.utils.toHex(1e16);
       //creating raw tranaction
       var rawTransaction = {
           "from":myAddress,
            "gasPrice":web3js.utils.toHex(25* 1e9),//1 ether = 10^18 wei  10
            "gasLimit":web3js.utils.toHex(4481130),//10
            "to":contractAddress,"value":"0x0",
            "data":contract.methods.changeAdmin(params.WalletAddress,params.newAdmin,params.Admin).encodeABI(),
            "nonce":web3js.utils.toHex(count)}
       console.log(rawTransaction);
       //creating tranaction via ethereumjs-tx
       var transaction = new Tx(rawTransaction,{ chain: 'rinkeby' });
       //signing transaction with private key
       transaction.sign(privateKey);
       //sending transacton via web3js module
       web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
       .on('transactionHash',console.log);
   })
   res.send("Check hash returned in terminal on Ganache")
}  catch(err){
    console.log(err)
}
});






module.exports = router;

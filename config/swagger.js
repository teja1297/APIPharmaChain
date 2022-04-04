const port = process.env.PORT || 3000;

 module.exports = {
     "open_api_version": "3.0.3",
     "title": "Pharma Supplychain API",
     "version": "1.0.0",
     "description": "Controller for Test API Calls are defined here",
     "url": "http://localhost:" + port,
     "apis": ['./routes/*.js'],
 }
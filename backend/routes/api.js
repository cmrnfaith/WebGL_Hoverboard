var express = require("express");
var request = require("request");
const axios = require("axios");
var router = express.Router();

router.get("/collection/:collection/:item", async function (req, res) {
  var collection = req.params.collection;
  var item = req.params.item;
  var url =
    "https://us-central1-jadu-e23c4.cloudfunctions.net/getTokenFile?collection=" +
    collection +
    "&tokenID=" +
    item;

  try {
    const response = await generateV4ReadSignedUrl(url);
    console.log(response.data);
    var new_url = response.data;
    req.pipe(request(new_url)).pipe(res);
  } catch (error) {
    console.log(error);
  }
});

async function generateV4ReadSignedUrl(url) {
  return await axios.get(url);
}

module.exports = router;

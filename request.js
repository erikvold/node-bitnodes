
var request = require('request');
var Promise = require('promise');

function getJSON(options) {
  return new Promise(function(resolve, reject) {
    var req = {
      url: options.url,
      headers: {
        'Accept': 'application/json; indent=4'
      }
    };

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
        return null;
      }

      reject(error);
    }

    request(req, callback);
  });
}
exports.getJSON = getJSON;

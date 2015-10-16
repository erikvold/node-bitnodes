
var getJSON = require('./request').getJSON;
var Promise = require('promise');
var querystring = require('querystring');
var externalip = require('externalip');

function getLeaderboard(options) {
  var options = {
    url: 'https://bitnodes.21.co/api/v1/nodes/leaderboard'
  };

  return getJSON(options);
}
exports.getLeaderboard = getLeaderboard;

function getSnapshots(options) {
  options = options || {};

  var params = {
    page: options.page || 1,
    limit: options.limit || 15
  };

  options.url = 'https://bitnodes.21.co/api/v1/snapshots?' + querystring.stringify(params);

  return getJSON(options);
}
exports.getSnapshots = getSnapshots;

function getLatency(options) {
  options = options || {};

  return new Promise(function(resolve, reject) {
    var args = {};

    function start() {
      var url = 'https://bitnodes.21.co/api/v1/nodes/' + args.address + "-" + args.port + "/latency/";

      return getJSON({
        url: url
      }).then(resolve, reject);
    }

    if (!!options.address) {
      args = {
        address: options.address,
        port: options.port || 8333
      };
      start();
    }
    else {
      externalip(function(err, ip) {
        if (err) {
          reject(err);
        }

        args = {
          address: options.address || ip,
          port: options.port || 8333
        };

        start();
      });
    }
  });
}
exports.getLatency = getLatency;


function getNodeStatus(options) {
  options = options || {};

  return new Promise(function(resolve, reject) {
    var args = {};

    function start() {
      var url = 'https://bitnodes.21.co/api/v1/nodes/' + args.address + "-" + args.port + "/";

      return getJSON({
        url: url
      }).then(resolve, reject);
    }

    if (!!options.address) {
      args = {
        address: options.address,
        port: options.port || 8333
      };
      start();
    }
    else {
      externalip(function(err, ip) {
        if (err) {
          reject(err);
        }

        args = {
          address: options.address || ip,
          port: options.port || 8333
        };

        start();
      });
    }
  });
}
exports.getNodeStatus = getNodeStatus;


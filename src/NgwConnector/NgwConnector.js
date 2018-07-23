(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.NgwConnector = factory();
  }
}(this, function () {

  var loadJSONP = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open('GET', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  };

  // https://github.com/Leaflet/Leaflet/blob/b507e21c510b53cd704fb8d3f89bb46ea925c8eb/src/core/Util.js#L165
  var templateRe = /\{ *([\w_-]+) *\}/g;

  var template = function (str, data) {
    return str.replace(templateRe, function (str, key) {
      var value = data[key];

      if (value === undefined) {
        throw new Error('No value provided for variable ' + str);

      } else if (typeof value === 'function') {
        value = value(data);
      }
      return value;
    });
  }

  var OPTIONS = {
    url: '/api/resource/{id}'
    // baseUrl: 'http://'
  }

  /**
   *
   * @param {Object} [options]
   */
  var NgwConnector = function (options) {
    options = options || {};
    this.options = OPTIONS;
    // two level options copy
    for (var o in options) {
      if (options.hasOwnProperty(o)) {
        var exist = OPTIONS[o];
        if (exist) {
          for (var p in options[o]) {
            if (options[o].hasOwnProperty(p)) {
              this.options[o][p] = options[o][p];
            }
          }
        } else {
          this.options[o] = options[o];
        }
      }
    }
  };

  NgwConnector.prototype.connect = function (resourceId, callback, context) {
    this._makeQuery(this.options.url, {id: resourceId}, callback, context);
  }

  NgwConnector.prototype.geojson = function (resourceId, callback, context) {
    this._makeQuery(this.options.url + '/geojson', {id: resourceId}, callback, context);
  }

  NgwConnector.prototype._makeQuery = function (url, params, callback, context) {

    url = (this.options.baseUrl ? this.options.baseUrl : '') + url;
    if (url) {
      if (params) {
        url = template(url, params);
      }
      this._getJson(url, callback, context);
    } else {
      throw new Error('No `url` parameter set for option ' + name);
    }

  }

  NgwConnector.prototype._getJson = function (url, callback, context) {
    return loadJSONP(url, callback, context);
  }

  return NgwConnector;
}));

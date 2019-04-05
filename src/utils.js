// https://github.com/Leaflet/Leaflet/blob/b507e21c510b53cd704fb8d3f89bb46ea925c8eb/src/core/Util.js#L165
var templateRe = /\{ *([\w_-]+) *\}/g;

export function template (str, data) {
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
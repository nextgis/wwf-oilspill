import { BaseFilter } from './BaseFilter';

export var PropFilter = BaseFilter.extend({

  initialize: function (layer, options) {
    BaseFilter.prototype.initialize.call(this, layer, options);
    this.propName = options.propName;
  },

  check: function (layer) {
    var prop = this._getLayerProp(layer);

    if (prop === this.value) {
      return true;
    } else if (this.value === this.options.empty.value) {
      return true;
    }
    return false;
  },

  getFilterData: function (layer) {
    var that = this;
    this.dataDict = {};
    layer.eachLayer(function(f) {
      var property = that._getLayerProp(f);
      if (property) {
        var exist = that.dataDict[property];
        if (exist) {
          that.dataDict[property] = exist + 1;
        } else {
          that.dataDict[property] = 1;
        }
      }
    })
    // for (var f in this.feature.properties) {
    //   if (this.feature.properties.hasOwnProperty(f)) {
    //     var property = this.feature.properties[f];
    //     data.push({name: property, value: property});
    //   }
    // }
    return this.dataDict;
  },

  _getLayerProp: function (l) {
    return l.feature && l.feature.properties && l.feature.properties[this.propName];
  }

})

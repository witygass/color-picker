// var color = require('./server/lib/colorflow.min.js');


// console.log(color);
// console.log(color.hex2rgb(193, 67, 28));
var withinCircle = function(num) {
  num = num > 360 ? num - 360 : num;
  num = num < 0 ? num + 360 : num;
  return num;
};

var RGBtoHSL = function(rgb) {

  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b -
          r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h *= 360;
  s *= 100;
  l *= 100;
  return [h, s, l];
}

console.log(RGBtoHSL([219, 39, 99]));

var HSLtoRGB = function(hsl) {
  var h = hsl[0] / 100;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  // console.log(h,s,l);
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
};
console.log(HSLtoRGB([123, 67, 28]));

var componentToHex = function(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

var RGBtoHEX = function(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

var HEXtoRGB = function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  // console.log([r, g, b]);
  return [r,g,b]
};

// console.log(HEXtoRGB('#FFFFF1'));

var complimentary = function(hsl) {
  var results = [];
  results.push(hsl);
  var h = hsl[0];

  h = withinCircle(h + 180);

  results.push([h, hsl[1], hsl[2]]);
  return results;
};

var triad = function(hsl) {
  var results = [];
  //takes [h,s,l]
  var h = hsl[0] - 120;
  var s = hsl[1];
  var l = hsl[2];
  h = withinCircle(h)
  results.push([
    [h, s, l]
  ]);
  results.push(hsl);
  h = withinCircle(h - 120);
  results.push([h + 120, s, l]);

  return results;
}
var analagous = function(hsl) {
  var results = [];
  //takes [h,s,l]
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  h = withinCircle(h - 30);
  results.push(h, s, l);

  results.push(hsl);

  h = withinCircle(h + 60);
  results.push(h, s, l);
  return results;
};
var splitComplimentary = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];
  var h1 = withinCircle(h - 150);
  var h2 = withinCircle(h + 150);

  results.push([h1, s, l]);
  results.push([h, s, l]);
  results.push([h2, s, l]);
  return results;
};
var squareTetrad = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  for (var i = 0; i < 4; i++) {
    h = withinCircle(h + 90);

    results.push([h, s, l])
  }
  return results;
};
var monochromatic = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  for (var i = 0; i <= 100; i += 25) {
    results.push([h, s, i]);
  }
  return results;
};
var rectangularTetrad = function(hsl) {
  //-30, + 150, + 180;
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];

  var temp = withinCircle(h - 30);
  results.push([temp, s, l]);

  results.push(hsl);

  temp = withinCircle(h + 150);
  results.push([temp, s, l]);

  temp = withinCircle(h + 180);
  results.push([temp, s, l])

  return results;
};

//May or may not do this   //probably not going to do this.
var cool = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];
};
var warm = function(hsl) {
  var results = [];
  var h = hsl[0];
  var s = hsl[1];
  var l = hsl[2];
};
var convertMatrix = function(array){
  var results = [];
  for (var i = 0; i < array.length; i++) {
    var inner = [];
    for (var i = 0; i < array[i].length; i++) {
        inner.push(RGBtoHEX(HSLtoRGB(array[j][i])));
    }
    results.push(inner);
  }
}
// console.log(RGBtoHSL([1,1,0]));
// console.log(rectangularTetrad([350, 0, 0]));
// console.log(analagous([350, 0, 0]));
// console.log(complimentary([193, 67, 28]));
// console.log(triad([193, 67, 28]));
// console.log(splitComplimentary([100,0,0]));
// console.log(squareTetrad([193, 67, 28]));
// console.log(monochromatic([193, 67, 28]));
module.exports.rectangularTetrad = rectangularTetrad;
module.exports.complimentary = complimentary;
module.exports.triad = triad;
module.exports.analagous = analagous;
module.exports.splitComplimentary = splitComplimentary;
module.exports.squareTetrad = squareTetrad;
module.exports.monochromatic = monochromatic;
module.exports.RGBtoHSL = RGBtoHSL;
module.exports.RGBtoHEX = RGBtoHEX;
module.exports.HEXtoRGB = HEXtoRGB;
module.exports.HSLtoRGB = HSLtoRGB;
module.exports.convertMatrix = convertMatrix;



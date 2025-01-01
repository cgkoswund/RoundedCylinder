import { Vector2 } from 'three';
import * as React from 'react';

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

var _excluded$1 = ["radiusTop", "radiusBottom", "height", "bevelSegments", "bevelAmount", "segments", "children"];
var TaperedCylinder = function TaperedCylinder(_ref) {
  var radiusTop = _ref.radiusTop,
    radiusBottom = _ref.radiusBottom,
    height = _ref.height,
    bevelSegments = _ref.bevelSegments,
    bevelAmount = _ref.bevelAmount,
    _ref$segments = _ref.segments,
    segments = _ref$segments === void 0 ? 32 : _ref$segments,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded$1);
  var points = React.useMemo(function () {
    var pts = [];
    var bevelRadius = bevelAmount; // easier for me to think with :-)

    //acute angle specs
    var acuteBevelAngle = Math.atan2(height, Math.abs(radiusTop - radiusBottom));
    var acuteCapBevelOffset = bevelRadius / Math.tan(acuteBevelAngle / 2);

    //obtuse angle specs
    var obtuseBevelAngle = Math.PI - acuteBevelAngle;
    var obtuseCapBevelOffset = bevelRadius / Math.tan(obtuseBevelAngle / 2);

    //share angle specs between top and bottom
    var topAngle = radiusTop > radiusBottom ? acuteBevelAngle : obtuseBevelAngle;
    var bottomAngle = radiusTop < radiusBottom ? acuteBevelAngle : obtuseBevelAngle;
    var adjustedRadiusTop = radiusTop > radiusBottom ? radiusTop - acuteCapBevelOffset : radiusTop - obtuseCapBevelOffset;
    var adjustedRadiusBottom = radiusTop < radiusBottom ? radiusBottom - acuteCapBevelOffset : radiusBottom - obtuseCapBevelOffset;
    console.log("angles:", topAngle * 180 / Math.PI, bottomAngle * 180 / Math.PI, acuteCapBevelOffset);
    // Calculate the height of the bevel <>  ? why not just A = B
    var bevelHeight = bevelAmount * Math.sin(Math.PI / 2);

    // Bottom inside point
    pts.push(new Vector2(0, height * -0.5));

    // Bottom bevel
    for (var i = 0; i <= bevelSegments; i++) {
      var angle = 1.5 * Math.PI + topAngle * (i / bevelSegments); //1.5PI for 4th quadrant, anticlockwise
      pts.push(new Vector2(adjustedRadiusBottom + bevelRadius * Math.cos(angle), height * -0.5 + bevelHeight + bevelRadius * Math.sin(angle))
      // new Vector2(
      //   radiusBottom - bevelAmount * (1 - Math.cos(angle)),
      //   height * -0.5 + bevelHeight - bevelAmount * Math.sin(angle)
      // )
      );
    }

    // Top bevel
    for (var _i = 0; _i <= bevelSegments; _i++) {
      var _angle = 1.5 * Math.PI + topAngle + bottomAngle * (_i / bevelSegments); //1.5PI for 4th quadrant, anticlockwise
      pts.push(new Vector2(adjustedRadiusTop + bevelRadius * Math.cos(_angle), height * 0.5 - bevelHeight + bevelRadius * Math.sin(_angle))
      // new Vector2(
      //   radiusTop - bevelAmount * (1 - Math.cos(angle)),
      //   height * 0.5 - bevelHeight + bevelAmount * Math.sin(angle)
      // )
      );
    }

    // Top inside point
    pts.push(new Vector2(0, height * 0.5));
    return pts;
  }, [radiusTop, radiusBottom, height, bevelSegments, bevelAmount]);
  return /*#__PURE__*/React.createElement("mesh", props, /*#__PURE__*/React.createElement("latheGeometry", {
    args: [points, segments]
  }), children);
};

var _excluded = ["radiusTop", "radiusBottom", "height", "bevelSegments", "bevelAmount", "segments", "children"];
var BeveledCylinder = function BeveledCylinder(_ref) {
  var radiusTop = _ref.radiusTop,
    radiusBottom = _ref.radiusBottom,
    height = _ref.height,
    bevelSegments = _ref.bevelSegments,
    bevelAmount = _ref.bevelAmount,
    _ref$segments = _ref.segments,
    segments = _ref$segments === void 0 ? 32 : _ref$segments,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  var points = React.useMemo(function () {
    var pts = [];

    // Calculate the height of the bevel
    var bevelHeight = bevelAmount * Math.sin(Math.PI / 2);

    // Bottom inside point
    pts.push(new Vector2(0, height * -0.5));

    // Bottom bevel
    for (var i = bevelSegments; i >= 0; i--) {
      var angle = Math.PI / 2 * (i / bevelSegments);
      pts.push(new Vector2(radiusBottom - bevelAmount * (1 - Math.cos(angle)), height * -0.5 + bevelHeight - bevelAmount * Math.sin(angle)));
    }

    // Top bevel
    for (var _i = 0; _i <= bevelSegments; _i++) {
      var _angle = Math.PI / 2 * (_i / bevelSegments);
      pts.push(new Vector2(radiusTop - bevelAmount * (1 - Math.cos(_angle)), height * 0.5 - bevelHeight + bevelAmount * Math.sin(_angle)));
    }

    // Top inside point
    pts.push(new Vector2(0, height * 0.5));
    return pts;
  }, [radiusTop, radiusBottom, height, bevelSegments, bevelAmount]);
  return /*#__PURE__*/React.createElement("mesh", props, /*#__PURE__*/React.createElement("latheGeometry", {
    args: [points, segments]
  }), children);
};

export { BeveledCylinder, TaperedCylinder, BeveledCylinder as default };

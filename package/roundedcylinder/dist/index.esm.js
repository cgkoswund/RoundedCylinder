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

export { BeveledCylinder, BeveledCylinder as default };

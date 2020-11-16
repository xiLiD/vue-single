!(function(t, i) {
  "object" == typeof exports && "undefined" != typeof module
    ? i(exports, require("leaflet"))
    : "function" == typeof define && define.amd
    ? define(["exports", "leaflet"], i)
    : i(((t.L = t.L || {}), (t.L.esri = {})), t.L);
})(this, function(t, m) {
  "use strict";
  var i =
      window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest(),
    s = "" === document.documentElement.style.pointerEvents,
    r = { cors: i, pointerEvents: s },
    e = { attributionWidthOffset: 55 },
    o = 0;
  function h(t) {
    var i = "";
    for (var s in ((t.f = t.f || "json"), t))
      if (t.hasOwnProperty(s)) {
        var e,
          a = t[s],
          n = Object.prototype.toString.call(a);
        i.length && (i += "&"),
          (e =
            "[object Array]" === n
              ? "[object Object]" === Object.prototype.toString.call(a[0])
                ? JSON.stringify(a)
                : a.join(",")
              : "[object Object]" === n
              ? JSON.stringify(a)
              : "[object Date]" === n
              ? a.valueOf()
              : a),
          (i += encodeURIComponent(s) + "=" + encodeURIComponent(e));
      }
    return i;
  }
  function l(e, a) {
    var n = new window.XMLHttpRequest();
    return (
      (n.onerror = function(t) {
        (n.onreadystatechange = m.Util.falseFn),
          e.call(
            a,
            { error: { code: 500, message: "XMLHttpRequest error" } },
            null
          );
      }),
      (n.onreadystatechange = function() {
        var i, s;
        if (4 === n.readyState) {
          try {
            i = JSON.parse(n.responseText);
          } catch (t) {
            (i = null),
              (s = {
                code: 500,
                message:
                  "Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error."
              });
          }
          !s && i.error && ((s = i.error), (i = null)),
            (n.onerror = m.Util.falseFn),
            e.call(a, s, i);
        }
      }),
      (n.ontimeout = function() {
        this.onerror();
      }),
      n
    );
  }
  function a(t, i, s, e) {
    var a = l(s, e);
    return (
      a.open("POST", t),
      null != e && void 0 !== e.options && (a.timeout = e.options.timeout),
      a.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      a.send(h(i)),
      a
    );
  }
  function n(t, i, s, e) {
    var a = l(s, e);
    return (
      a.open("GET", t + "?" + h(i), !0),
      null != e && void 0 !== e.options && (a.timeout = e.options.timeout),
      a.send(null),
      a
    );
  }
  function u(t, i, s, e) {
    var a = h(i),
      n = l(s, e),
      o = (t + "?" + a).length;
    if (
      (o <= 2e3 && r.cors
        ? n.open("GET", t + "?" + a)
        : 2e3 < o &&
          r.cors &&
          (n.open("POST", t),
          n.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
          )),
      null != e && void 0 !== e.options && (n.timeout = e.options.timeout),
      o <= 2e3 && r.cors)
    )
      n.send(null);
    else {
      if (!(2e3 < o && r.cors))
        return o <= 2e3 && !r.cors
          ? c(t, i, s, e)
          : void f(
              "a request to " +
                t +
                " was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html"
            );
      n.send(a);
    }
    return n;
  }
  function c(t, i, e, a) {
    window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
    var n = "c" + o;
    (i.callback = "window._EsriLeafletCallbacks." + n),
      (window._EsriLeafletCallbacks[n] = function(t) {
        if (!0 !== window._EsriLeafletCallbacks[n]) {
          var i,
            s = Object.prototype.toString.call(t);
          "[object Object]" !== s &&
            "[object Array]" !== s &&
            ((i = {
              error: {
                code: 500,
                message: "Expected array or object as JSONP response"
              }
            }),
            (t = null)),
            !i && t.error && ((i = t), (t = null)),
            e.call(a, i, t),
            (window._EsriLeafletCallbacks[n] = !0);
        }
      });
    var s = m.DomUtil.create("script", null, document.body);
    return (
      (s.type = "text/javascript"),
      (s.src = t + "?" + h(i)),
      (s.id = n),
      (s.onerror = function(t) {
        t &&
          !0 !== window._EsriLeafletCallbacks[n] &&
          (e.call(a, {
            error: { code: 500, message: "An unknown error occurred" }
          }),
          (window._EsriLeafletCallbacks[n] = !0));
      }),
      m.DomUtil.addClass(s, "esri-leaflet-jsonp"),
      o++,
      {
        id: n,
        url: s.src,
        abort: function() {
          window._EsriLeafletCallbacks._callback[n]({
            code: 0,
            message: "Request aborted."
          });
        }
      }
    );
  }
  var p = r.cors ? n : c;
  function f() {
    console && console.warn && console.warn.apply(console, arguments);
  }
  (p.CORS = n), (p.JSONP = c);
  var d = { request: u, get: p, post: a };
  function _(t) {
    return (
      (function(t, i) {
        for (var s = 0; s < t.length; s++) if (t[s] !== i[s]) return;
        return 1;
      })(t[0], t[t.length - 1]) || t.push(t[0]),
      t
    );
  }
  function y(t) {
    for (var i, s = 0, e = 0, a = t.length, n = t[e]; e < a - 1; e++)
      (s += ((i = t[e + 1])[0] - n[0]) * (i[1] + n[1])), (n = i);
    return 0 <= s;
  }
  function g(t, i, s, e) {
    var a = (e[0] - s[0]) * (t[1] - s[1]) - (e[1] - s[1]) * (t[0] - s[0]),
      n = (i[0] - t[0]) * (t[1] - s[1]) - (i[1] - t[1]) * (t[0] - s[0]),
      o = (e[1] - s[1]) * (i[0] - t[0]) - (e[0] - s[0]) * (i[1] - t[1]);
    if (0 != o) {
      var r = a / o,
        h = n / o;
      if (0 <= r && r <= 1 && 0 <= h && h <= 1) return 1;
    }
  }
  function M(t, i) {
    for (var s = 0; s < t.length - 1; s++)
      for (var e = 0; e < i.length - 1; e++)
        if (g(t[s], t[s + 1], i[e], i[e + 1])) return !0;
    return !1;
  }
  function v(t) {
    var i = [],
      s = t.slice(0),
      e = _(s.shift().slice(0));
    if (4 <= e.length) {
      y(e) || e.reverse(), i.push(e);
      for (var a = 0; a < s.length; a++) {
        var n = _(s[a].slice(0));
        4 <= n.length && (y(n) && n.reverse(), i.push(n));
      }
    }
    return i;
  }
  function b(t) {
    var i = {};
    for (var s in t) t.hasOwnProperty(s) && (i[s] = t[s]);
    return i;
  }
  function x(t, a) {
    var i = {};
    if (t.features) {
      (i.type = "FeatureCollection"), (i.features = []);
      for (var s = 0; s < t.features.length; s++)
        i.features.push(x(t.features[s], a));
    }
    if (
      ("number" == typeof t.x &&
        "number" == typeof t.y &&
        ((i.type = "Point"),
        (i.coordinates = [t.x, t.y]),
        "number" == typeof t.z && i.coordinates.push(t.z)),
      t.points &&
        ((i.type = "MultiPoint"), (i.coordinates = t.points.slice(0))),
      t.paths &&
        (1 === t.paths.length
          ? ((i.type = "LineString"), (i.coordinates = t.paths[0].slice(0)))
          : ((i.type = "MultiLineString"), (i.coordinates = t.paths.slice(0)))),
      t.rings &&
        (i = (function(t) {
          for (var i, s, e = [], a = [], n = 0; n < t.length; n++) {
            var o = _(t[n].slice(0));
            if (!(o.length < 4))
              if (y(o)) {
                var r = [o.slice().reverse()];
                e.push(r);
              } else a.push(o.slice().reverse());
          }
          for (var h = []; a.length; ) {
            s = a.pop();
            var l = !1;
            for (i = e.length - 1; 0 <= i; i--)
              if (
                ((u = e[i][0]),
                0,
                (m = M(u, (c = s))),
                (p = (function(t, i) {
                  for (
                    var s = !1, e = -1, a = t.length, n = a - 1;
                    ++e < a;
                    n = e
                  )
                    ((t[e][1] <= i[1] && i[1] < t[n][1]) ||
                      (t[n][1] <= i[1] && i[1] < t[e][1])) &&
                      i[0] <
                        ((t[n][0] - t[e][0]) * (i[1] - t[e][1])) /
                          (t[n][1] - t[e][1]) +
                          t[e][0] &&
                      (s = !s);
                  return s;
                })(u, c[0])),
                !m && p)
              ) {
                e[i].push(s), (l = !0);
                break;
              }
            l || h.push(s);
          }
          for (var u, c, m, p; h.length; ) {
            s = h.pop();
            var f = !1;
            for (i = e.length - 1; 0 <= i; i--)
              if (M(e[i][0], s)) {
                e[i].push(s), (f = !0);
                break;
              }
            f || e.push([s.reverse()]);
          }
          return 1 === e.length
            ? { type: "Polygon", coordinates: e[0] }
            : { type: "MultiPolygon", coordinates: e };
        })(t.rings.slice(0))),
      "number" == typeof t.xmin &&
        "number" == typeof t.ymin &&
        "number" == typeof t.xmax &&
        "number" == typeof t.ymax &&
        ((i.type = "Polygon"),
        (i.coordinates = [
          [
            [t.xmax, t.ymax],
            [t.xmin, t.ymax],
            [t.xmin, t.ymin],
            [t.xmax, t.ymin],
            [t.xmax, t.ymax]
          ]
        ])),
      (t.geometry || t.attributes) &&
        ((i.type = "Feature"),
        (i.geometry = t.geometry ? x(t.geometry) : null),
        (i.properties = t.attributes ? b(t.attributes) : null),
        t.attributes))
    )
      try {
        i.id = (function(t) {
          for (
            var i = a ? [a, "OBJECTID", "FID"] : ["OBJECTID", "FID"], s = 0;
            s < i.length;
            s++
          ) {
            var e = i[s];
            if (e in t && ("string" == typeof t[e] || "number" == typeof t[e]))
              return t[e];
          }
          throw Error("No valid id attribute found");
        })(t.attributes);
      } catch (t) {}
    return (
      JSON.stringify(i.geometry) === JSON.stringify({}) && (i.geometry = null),
      t.spatialReference &&
        t.spatialReference.wkid &&
        4326 !== t.spatialReference.wkid &&
        console.warn(
          "Object converted in non-standard crs - " +
            JSON.stringify(t.spatialReference)
        ),
      i
    );
  }
  function S(t, i) {
    return (function t(i, s) {
      s = s || "OBJECTID";
      var e,
        a = { wkid: 4326 },
        n = {};
      switch (i.type) {
        case "Point":
          (n.x = i.coordinates[0]),
            (n.y = i.coordinates[1]),
            (n.spatialReference = a);
          break;
        case "MultiPoint":
          (n.points = i.coordinates.slice(0)), (n.spatialReference = a);
          break;
        case "LineString":
          (n.paths = [i.coordinates.slice(0)]), (n.spatialReference = a);
          break;
        case "MultiLineString":
          (n.paths = i.coordinates.slice(0)), (n.spatialReference = a);
          break;
        case "Polygon":
          (n.rings = v(i.coordinates.slice(0))), (n.spatialReference = a);
          break;
        case "MultiPolygon":
          (n.rings = (function(t) {
            for (var i = [], s = 0; s < t.length; s++)
              for (var e = v(t[s]), a = e.length - 1; 0 <= a; a--) {
                var n = e[a].slice(0);
                i.push(n);
              }
            return i;
          })(i.coordinates.slice(0))),
            (n.spatialReference = a);
          break;
        case "Feature":
          i.geometry && (n.geometry = t(i.geometry, s)),
            (n.attributes = i.properties ? b(i.properties) : {}),
            i.id && (n.attributes[s] = i.id);
          break;
        case "FeatureCollection":
          for (n = [], e = 0; e < i.features.length; e++)
            n.push(t(i.features[e], s));
          break;
        case "GeometryCollection":
          for (n = [], e = 0; e < i.geometries.length; e++)
            n.push(t(i.geometries[e], s));
      }
      return n;
    })(t, i);
  }
  function w(t, i) {
    return x(t, i);
  }
  function P(t) {
    if (
      "NaN" === t.xmin ||
      "NaN" === t.ymin ||
      "NaN" === t.xmax ||
      "NaN" === t.ymax
    )
      return null;
    var i = m.latLng(t.ymin, t.xmin),
      s = m.latLng(t.ymax, t.xmax);
    return m.latLngBounds(i, s);
  }
  function I(t) {
    return {
      xmin: (t = m.latLngBounds(t)).getSouthWest().lng,
      ymin: t.getSouthWest().lat,
      xmax: t.getNorthEast().lng,
      ymax: t.getNorthEast().lat,
      spatialReference: { wkid: 4326 }
    };
  }
  var C = /^(OBJECTID|FID|OID|ID)$/i;
  function A(t) {
    var i;
    if (t.objectIdFieldName) i = t.objectIdFieldName;
    else if (t.fields) {
      for (var s = 0; s <= t.fields.length - 1; s++)
        if ("esriFieldTypeOID" === t.fields[s].type) {
          i = t.fields[s].name;
          break;
        }
      if (!i)
        for (s = 0; s <= t.fields.length - 1; s++)
          if (t.fields[s].name.match(C)) {
            i = t.fields[s].name;
            break;
          }
    }
    return i;
  }
  function j(t) {
    for (var i in t.attributes) if (i.match(C)) return i;
  }
  function O(t, i) {
    var s,
      e = t.features || t.results,
      a = e.length;
    s = i || A(t);
    var n = { type: "FeatureCollection", features: [] };
    if (a)
      for (var o = e.length - 1; 0 <= o; o--) {
        var r = w(e[o], s || j(e[o]));
        n.features.push(r);
      }
    return n;
  }
  function k(t) {
    return "/" !== (t = m.Util.trim(t))[t.length - 1] && (t += "/"), t;
  }
  function T(t) {
    if (-1 !== t.url.indexOf("?")) {
      t.requestParams = t.requestParams || {};
      var i = t.url.substring(t.url.indexOf("?") + 1);
      (t.url = t.url.split("?")[0]),
        (t.requestParams = JSON.parse(
          '{"' +
            decodeURI(i)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        ));
    }
    return (t.url = k(t.url.split("?")[0])), t;
  }
  function q(t) {
    return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t);
  }
  function N(t) {
    var i;
    switch (t) {
      case "Point":
        i = "esriGeometryPoint";
        break;
      case "MultiPoint":
        i = "esriGeometryMultipoint";
        break;
      case "LineString":
      case "MultiLineString":
        i = "esriGeometryPolyline";
        break;
      case "Polygon":
      case "MultiPolygon":
        i = "esriGeometryPolygon";
    }
    return i;
  }
  function E(t) {
    return t.getSize().x - e.attributionWidthOffset + "px";
  }
  function R(i) {
    if (i.attributionControl && !i.attributionControl._esriAttributionAdded) {
      i.attributionControl.setPrefix(
        '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com">Esri</a>'
      );
      var t = document.createElement("style");
      (t.type = "text/css"),
        (t.innerHTML =
          ".esri-truncated-attribution:hover {white-space: normal;}"),
        document.getElementsByTagName("head")[0].appendChild(t),
        m.DomUtil.addClass(
          i.attributionControl._container,
          "esri-truncated-attribution:hover"
        );
      var s = document.createElement("style");
      (s.type = "text/css"),
        (s.innerHTML =
          ".esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: " +
          E(i) +
          ";}"),
        document.getElementsByTagName("head")[0].appendChild(s),
        m.DomUtil.addClass(
          i.attributionControl._container,
          "esri-truncated-attribution"
        ),
        i.on("resize", function(t) {
          i.attributionControl._container.style.maxWidth = E(t.target);
        }),
        (i.attributionControl._esriAttributionAdded = !0);
    }
  }
  function z(t) {
    var i = { geometry: null, geometryType: null };
    return t instanceof m.LatLngBounds
      ? ((i.geometry = I(t)), (i.geometryType = "esriGeometryEnvelope"), i)
      : (t.getLatLng && (t = t.getLatLng()),
        t instanceof m.LatLng &&
          (t = { type: "Point", coordinates: [t.lng, t.lat] }),
        t instanceof m.GeoJSON &&
          ((t = t.getLayers()[0].feature.geometry),
          (i.geometry = S(t)),
          (i.geometryType = N(t.type))),
        t.toGeoJSON && (t = t.toGeoJSON()),
        "Feature" === t.type && (t = t.geometry),
        "Point" === t.type ||
        "LineString" === t.type ||
        "Polygon" === t.type ||
        "MultiPolygon" === t.type
          ? ((i.geometry = S(t)), (i.geometryType = N(t.type)), i)
          : void f(
              "invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object"
            ));
  }
  function G(t, h) {
    r.cors &&
      u(
        t,
        {},
        m.Util.bind(function(t, i) {
          if (!t) {
            h._esriAttributions = [];
            for (var s = 0; s < i.contributors.length; s++)
              for (
                var e = i.contributors[s], a = 0;
                a < e.coverageAreas.length;
                a++
              ) {
                var n = e.coverageAreas[a],
                  o = m.latLng(n.bbox[0], n.bbox[1]),
                  r = m.latLng(n.bbox[2], n.bbox[3]);
                h._esriAttributions.push({
                  attribution: e.attribution,
                  score: n.score,
                  bounds: m.latLngBounds(o, r),
                  minZoom: n.zoomMin,
                  maxZoom: n.zoomMax
                });
              }
            h._esriAttributions.sort(function(t, i) {
              return i.score - t.score;
            }),
              F({ target: h });
          }
        }, this)
      );
  }
  function F(t) {
    var i = t.target,
      s = i._esriAttributions;
    if (i && i.attributionControl) {
      var e = i.attributionControl._container.querySelector(
        ".esri-dynamic-attribution"
      );
      if (e && s) {
        for (
          var a = "",
            n = i.getBounds(),
            o = m.latLngBounds(
              n.getSouthWest().wrap(),
              n.getNorthEast().wrap()
            ),
            r = i.getZoom(),
            h = 0;
          h < s.length;
          h++
        ) {
          var l = s[h],
            u = l.attribution;
          !a.match(u) &&
            l.bounds.intersects(o) &&
            r >= l.minZoom &&
            r <= l.maxZoom &&
            (a += ", " + u);
        }
        (a = a.substr(2)),
          (e.innerHTML = a),
          (e.style.maxWidth = E(i)),
          i.fire("attributionupdated", { attribution: a });
      }
    }
  }
  var D = {
      warn: f,
      cleanUrl: k,
      getUrlParams: T,
      isArcgisOnline: q,
      geojsonTypeToArcGIS: N,
      responseToFeatureCollection: O,
      geojsonToArcGIS: S,
      arcgisToGeoJSON: w,
      boundsToExtent: I,
      extentToBounds: P,
      calcAttributionWidth: E,
      setEsriAttribution: R,
      _setGeometry: z,
      _getAttributionData: G,
      _updateMapAttribution: F,
      _findIdAttributeFromFeature: j,
      _findIdAttributeFromResponse: A
    },
    U = m.Class.extend({
      options: { proxy: !1, useCors: i },
      generateSetter: function(i, t) {
        return m.Util.bind(function(t) {
          return (this.params[i] = t), this;
        }, t);
      },
      initialize: function(t) {
        if (
          (t.request && t.options
            ? ((this._service = t), m.Util.setOptions(this, t.options))
            : (m.Util.setOptions(this, t), (this.options.url = k(t.url))),
          (this.params = m.Util.extend({}, this.params || {})),
          this.setters)
        )
          for (var i in this.setters) {
            var s = this.setters[i];
            this[i] = this.generateSetter(s, this);
          }
      },
      token: function(t) {
        return (
          this._service
            ? this._service.authenticate(t)
            : (this.params.token = t),
          this
        );
      },
      format: function(t) {
        return (this.params.returnUnformattedValues = !t), this;
      },
      request: function(t, i) {
        return (
          this.options.requestParams &&
            m.Util.extend(this.params, this.options.requestParams),
          this._service
            ? this._service.request(this.path, this.params, t, i)
            : this._request("request", this.path, this.params, t, i)
        );
      },
      _request: function(t, i, s, e, a) {
        var n = this.options.proxy
          ? this.options.proxy + "?" + this.options.url + i
          : this.options.url + i;
        return ("get" !== t && "request" !== t) || this.options.useCors
          ? d[t](n, s, e, a)
          : d.get.JSONP(n, s, e, a);
      }
    }),
    B = U.extend({
      setters: {
        offset: "resultOffset",
        limit: "resultRecordCount",
        fields: "outFields",
        precision: "geometryPrecision",
        featureIds: "objectIds",
        returnGeometry: "returnGeometry",
        returnM: "returnM",
        transform: "datumTransformation",
        token: "token"
      },
      path: "query",
      params: { returnGeometry: !0, where: "1=1", outSR: 4326, outFields: "*" },
      within: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelContains"),
          this
        );
      },
      intersects: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelIntersects"),
          this
        );
      },
      contains: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelWithin"),
          this
        );
      },
      crosses: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelCrosses"),
          this
        );
      },
      touches: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelTouches"),
          this
        );
      },
      overlaps: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelOverlaps"),
          this
        );
      },
      bboxIntersects: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelEnvelopeIntersects"),
          this
        );
      },
      indexIntersects: function(t) {
        return (
          this._setGeometryParams(t),
          (this.params.spatialRel = "esriSpatialRelIndexIntersects"),
          this
        );
      },
      nearby: function(t, i) {
        return (
          (t = m.latLng(t)),
          (this.params.geometry = [t.lng, t.lat]),
          (this.params.geometryType = "esriGeometryPoint"),
          (this.params.spatialRel = "esriSpatialRelIntersects"),
          (this.params.units = "esriSRUnit_Meter"),
          (this.params.distance = i),
          (this.params.inSr = 4326),
          this
        );
      },
      where: function(t) {
        return (this.params.where = t), this;
      },
      between: function(t, i) {
        return (this.params.time = [t.valueOf(), i.valueOf()]), this;
      },
      simplify: function(t, i) {
        var s = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
        return (this.params.maxAllowableOffset = (s / t.getSize().y) * i), this;
      },
      orderBy: function(t, i) {
        return (
          (i = i || "ASC"),
          (this.params.orderByFields = this.params.orderByFields
            ? this.params.orderByFields + ","
            : ""),
          (this.params.orderByFields += [t, i].join(" ")),
          this
        );
      },
      run: function(s, e) {
        return (
          this._cleanParams(),
          this.options.isModern || q(this.options.url)
            ? ((this.params.f = "geojson"),
              this.request(function(t, i) {
                this._trapSQLerrors(t), s.call(e, t, i, i);
              }, this))
            : this.request(function(t, i) {
                this._trapSQLerrors(t), s.call(e, t, i && O(i), i);
              }, this)
        );
      },
      count: function(s, t) {
        return (
          this._cleanParams(),
          (this.params.returnCountOnly = !0),
          this.request(function(t, i) {
            s.call(this, t, i && i.count, i);
          }, t)
        );
      },
      ids: function(s, t) {
        return (
          this._cleanParams(),
          (this.params.returnIdsOnly = !0),
          this.request(function(t, i) {
            s.call(this, t, i && i.objectIds, i);
          }, t)
        );
      },
      bounds: function(s, e) {
        return (
          this._cleanParams(),
          (this.params.returnExtentOnly = !0),
          this.request(function(t, i) {
            i && i.extent && P(i.extent)
              ? s.call(e, t, P(i.extent), i)
              : ((t = { message: "Invalid Bounds" }), s.call(e, t, null, i));
          }, e)
        );
      },
      distinct: function() {
        return (
          (this.params.returnGeometry = !1),
          (this.params.returnDistinctValues = !0),
          this
        );
      },
      pixelSize: function(t) {
        var i = m.point(t);
        return (this.params.pixelSize = [i.x, i.y]), this;
      },
      layer: function(t) {
        return (this.path = t + "/query"), this;
      },
      _trapSQLerrors: function(t) {
        t &&
          "400" === t.code &&
          f(
            "one common syntax error in query requests is encasing string values in double quotes instead of single quotes"
          );
      },
      _cleanParams: function() {
        delete this.params.returnIdsOnly,
          delete this.params.returnExtentOnly,
          delete this.params.returnCountOnly;
      },
      _setGeometryParams: function(t) {
        this.params.inSr = 4326;
        var i = z(t);
        (this.params.geometry = i.geometry),
          (this.params.geometryType = i.geometryType);
      }
    });
  function Z(t) {
    return new B(t);
  }
  var W = U.extend({
    setters: {
      contains: "contains",
      text: "searchText",
      fields: "searchFields",
      spatialReference: "sr",
      sr: "sr",
      layers: "layers",
      returnGeometry: "returnGeometry",
      maxAllowableOffset: "maxAllowableOffset",
      precision: "geometryPrecision",
      dynamicLayers: "dynamicLayers",
      returnZ: "returnZ",
      returnM: "returnM",
      gdbVersion: "gdbVersion",
      token: "token"
    },
    path: "find",
    params: {
      sr: 4326,
      contains: !0,
      returnGeometry: !0,
      returnZ: !0,
      returnM: !1
    },
    layerDefs: function(t, i) {
      return (
        (this.params.layerDefs = this.params.layerDefs
          ? this.params.layerDefs + ";"
          : ""),
        (this.params.layerDefs += [t, i].join(":")),
        this
      );
    },
    simplify: function(t, i) {
      var s = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
      return (this.params.maxAllowableOffset = (s / t.getSize().y) * i), this;
    },
    run: function(s, e) {
      return this.request(function(t, i) {
        s.call(e, t, i && O(i), i);
      }, e);
    }
  });
  function J(t) {
    return new W(t);
  }
  var Q = U.extend({
      path: "identify",
      between: function(t, i) {
        return (this.params.time = [t.valueOf(), i.valueOf()]), this;
      }
    }),
    H = Q.extend({
      setters: {
        layers: "layers",
        precision: "geometryPrecision",
        tolerance: "tolerance",
        returnGeometry: "returnGeometry"
      },
      params: { sr: 4326, layers: "all", tolerance: 3, returnGeometry: !0 },
      on: function(t) {
        var i = I(t.getBounds()),
          s = t.getSize();
        return (
          (this.params.imageDisplay = [s.x, s.y, 96]),
          (this.params.mapExtent = [i.xmin, i.ymin, i.xmax, i.ymax]),
          this
        );
      },
      at: function(t) {
        return (
          2 === t.length && (t = m.latLng(t)), this._setGeometryParams(t), this
        );
      },
      layerDef: function(t, i) {
        return (
          (this.params.layerDefs = this.params.layerDefs
            ? this.params.layerDefs + ";"
            : ""),
          (this.params.layerDefs += [t, i].join(":")),
          this
        );
      },
      simplify: function(t, i) {
        var s = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
        return (this.params.maxAllowableOffset = (s / t.getSize().y) * i), this;
      },
      run: function(a, n) {
        return this.request(function(t, i) {
          if (t) a.call(n, t, void 0, i);
          else {
            var s = O(i);
            i.results = i.results.reverse();
            for (var e = 0; e < s.features.length; e++)
              s.features[e].layerId = i.results[e].layerId;
            a.call(n, void 0, s, i);
          }
        });
      },
      _setGeometryParams: function(t) {
        var i = z(t);
        (this.params.geometry = i.geometry),
          (this.params.geometryType = i.geometryType);
      }
    });
  function V(t) {
    return new H(t);
  }
  var X = Q.extend({
    setters: {
      setMosaicRule: "mosaicRule",
      setRenderingRule: "renderingRule",
      setPixelSize: "pixelSize",
      returnCatalogItems: "returnCatalogItems",
      returnGeometry: "returnGeometry"
    },
    params: { returnGeometry: !1 },
    at: function(t) {
      return (
        (t = m.latLng(t)),
        (this.params.geometry = JSON.stringify({
          x: t.lng,
          y: t.lat,
          spatialReference: { wkid: 4326 }
        })),
        (this.params.geometryType = "esriGeometryPoint"),
        this
      );
    },
    getMosaicRule: function() {
      return this.params.mosaicRule;
    },
    getRenderingRule: function() {
      return this.params.renderingRule;
    },
    getPixelSize: function() {
      return this.params.pixelSize;
    },
    run: function(s, e) {
      return this.request(function(t, i) {
        s.call(e, t, i && this._responseToGeoJSON(i), i);
      }, this);
    },
    _responseToGeoJSON: function(t) {
      var i = t.location,
        s = t.catalogItems,
        e = t.catalogItemVisibilities,
        a = {
          pixel: {
            type: "Feature",
            geometry: { type: "Point", coordinates: [i.x, i.y] },
            crs: {
              type: "EPSG",
              properties: { code: i.spatialReference.wkid }
            },
            properties: { OBJECTID: t.objectId, name: t.name, value: t.value },
            id: t.objectId
          }
        };
      if (
        (t.properties &&
          t.properties.Values &&
          (a.pixel.properties.values = t.properties.Values),
        s &&
          s.features &&
          ((a.catalogItems = O(s)),
          e && e.length === a.catalogItems.features.length))
      )
        for (var n = e.length - 1; 0 <= n; n--)
          a.catalogItems.features[n].properties.catalogItemVisibility = e[n];
      return a;
    }
  });
  function K(t) {
    return new X(t);
  }
  var Y = m.Evented.extend({
      options: { proxy: !1, useCors: i, timeout: 0 },
      initialize: function(t) {
        (t = t || {}),
          (this._requestQueue = []),
          (this._authenticating = !1),
          m.Util.setOptions(this, t),
          (this.options.url = k(this.options.url));
      },
      get: function(t, i, s, e) {
        return this._request("get", t, i, s, e);
      },
      post: function(t, i, s, e) {
        return this._request("post", t, i, s, e);
      },
      request: function(t, i, s, e) {
        return this._request("request", t, i, s, e);
      },
      metadata: function(t, i) {
        return this._request("get", "", {}, t, i);
      },
      authenticate: function(t) {
        return (
          (this._authenticating = !1),
          (this.options.token = t),
          this._runQueue(),
          this
        );
      },
      getTimeout: function() {
        return this.options.timeout;
      },
      setTimeout: function(t) {
        this.options.timeout = t;
      },
      _request: function(t, i, s, e, a) {
        this.fire(
          "requeststart",
          { url: this.options.url + i, params: s, method: t },
          !0
        );
        var n = this._createServiceCallback(t, i, s, e, a);
        if (
          (this.options.token && (s.token = this.options.token),
          this.options.requestParams &&
            m.Util.extend(s, this.options.requestParams),
          !this._authenticating)
        ) {
          var o = this.options.proxy
            ? this.options.proxy + "?" + this.options.url + i
            : this.options.url + i;
          return ("get" !== t && "request" !== t) || this.options.useCors
            ? d[t](o, s, n, a)
            : d.get.JSONP(o, s, n, a);
        }
        this._requestQueue.push([t, i, s, e, a]);
      },
      _createServiceCallback: function(s, e, a, n, o) {
        return m.Util.bind(function(t, i) {
          !t ||
            (499 !== t.code && 498 !== t.code) ||
            ((this._authenticating = !0),
            this._requestQueue.push([s, e, a, n, o]),
            this.fire(
              "authenticationrequired",
              { authenticate: m.Util.bind(this.authenticate, this) },
              !0
            ),
            (t.authenticate = m.Util.bind(this.authenticate, this))),
            n.call(o, t, i),
            t
              ? this.fire(
                  "requesterror",
                  {
                    url: this.options.url + e,
                    params: a,
                    message: t.message,
                    code: t.code,
                    method: s
                  },
                  !0
                )
              : this.fire(
                  "requestsuccess",
                  {
                    url: this.options.url + e,
                    params: a,
                    response: i,
                    method: s
                  },
                  !0
                ),
            this.fire(
              "requestend",
              { url: this.options.url + e, params: a, method: s },
              !0
            );
        }, this);
      },
      _runQueue: function() {
        for (var t = this._requestQueue.length - 1; 0 <= t; t--) {
          var i = this._requestQueue[t];
          this[i.shift()].apply(this, i);
        }
        this._requestQueue = [];
      }
    }),
    $ = Y.extend({
      identify: function() {
        return V(this);
      },
      find: function() {
        return J(this);
      },
      query: function() {
        return Z(this);
      }
    });
  function tt(t) {
    return new $(t);
  }
  var it = Y.extend({
    query: function() {
      return Z(this);
    },
    identify: function() {
      return K(this);
    }
  });
  function st(t) {
    return new it(t);
  }
  var et = Y.extend({
    options: { idAttribute: "OBJECTID" },
    query: function() {
      return Z(this);
    },
    addFeature: function(t, i, s) {
      this.addFeatures(t, i, s);
    },
    addFeatures: function(t, e, a) {
      for (var i = t.features ? t.features : [t], s = i.length - 1; 0 <= s; s--)
        delete i[s].id;
      return (
        (t = S(t)),
        (t = 1 < i.length ? t : [t]),
        this.post(
          "addFeatures",
          { features: t },
          function(t, i) {
            var s =
              i && i.addResults
                ? 1 < i.addResults.length
                  ? i.addResults
                  : i.addResults[0]
                : void 0;
            e && e.call(a, t || i.addResults[0].error, s);
          },
          a
        )
      );
    },
    updateFeature: function(t, i, s) {
      this.updateFeatures(t, i, s);
    },
    updateFeatures: function(t, e, a) {
      var i = t.features ? t.features : [t];
      return (
        (t = S(t, this.options.idAttribute)),
        (t = 1 < i.length ? t : [t]),
        this.post(
          "updateFeatures",
          { features: t },
          function(t, i) {
            var s =
              i && i.updateResults
                ? 1 < i.updateResults.length
                  ? i.updateResults
                  : i.updateResults[0]
                : void 0;
            e && e.call(a, t || i.updateResults[0].error, s);
          },
          a
        )
      );
    },
    deleteFeature: function(t, i, s) {
      this.deleteFeatures(t, i, s);
    },
    deleteFeatures: function(t, e, a) {
      return this.post(
        "deleteFeatures",
        { objectIds: t },
        function(t, i) {
          var s =
            i && i.deleteResults
              ? 1 < i.deleteResults.length
                ? i.deleteResults
                : i.deleteResults[0]
              : void 0;
          e && e.call(a, t || i.deleteResults[0].error, s);
        },
        a
      );
    }
  });
  function at(t) {
    return new et(t);
  }
  var nt = "https:" !== window.location.protocol ? "http:" : "https:",
    ot = m.TileLayer.extend({
      statics: {
        TILES: {
          Streets: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ["server", "services"],
              attribution: "USGS, NOAA",
              attributionUrl:
                "https://static.arcgis.com/attribution/World_Street_Map"
            }
          },
          Topographic: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ["server", "services"],
              attribution: "USGS, NOAA",
              attributionUrl:
                "https://static.arcgis.com/attribution/World_Topo_Map"
            }
          },
          Oceans: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              attribution: "USGS, NOAA",
              attributionUrl:
                "https://static.arcgis.com/attribution/Ocean_Basemap"
            }
          },
          OceansLabels: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          NationalGeographic: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              attribution:
                "National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp."
            }
          },
          DarkGray: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              attribution:
                "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
            }
          },
          DarkGrayLabels: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          Gray: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              attribution:
                "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
            }
          },
          GrayLabels: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 16,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          Imagery: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 22,
              maxNativeZoom: 22,
              downsampled: !1,
              subdomains: ["server", "services"],
              attribution:
                "DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
              attributionUrl:
                "https://static.arcgis.com/attribution/World_Imagery"
            }
          },
          ImageryLabels: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          ImageryTransportation: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 19,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          ShadedRelief: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ["server", "services"],
              attribution: "USGS"
            }
          },
          ShadedReliefLabels: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 12,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          Terrain: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ["server", "services"],
              attribution: "USGS, NOAA"
            }
          },
          TerrainLabels: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 13,
              subdomains: ["server", "services"],
              pane: s ? "esri-labels" : "tilePane",
              attribution: ""
            }
          },
          USATopo: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 15,
              subdomains: ["server", "services"],
              attribution: "USGS, National Geographic Society, i-cubed"
            }
          },
          ImageryClarity: {
            urlTemplate:
              nt +
              "//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 19,
              attribution:
                "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
            }
          },
          Physical: {
            urlTemplate:
              nt +
              "//{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 8,
              subdomains: ["server", "services"],
              attribution: "U.S. National Park Service"
            }
          },
          ImageryFirefly: {
            urlTemplate:
              nt +
              "//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}",
            options: {
              minZoom: 1,
              maxZoom: 19,
              attribution:
                "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
              attributionUrl:
                "https://static.arcgis.com/attribution/World_Imagery"
            }
          }
        }
      },
      initialize: function(t, i) {
        var s;
        if ("object" == typeof t && t.urlTemplate && t.options) s = t;
        else {
          if ("string" != typeof t || !ot.TILES[t])
            throw new Error(
              'L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"'
            );
          s = ot.TILES[t];
        }
        var e = m.Util.extend(s.options, i);
        m.Util.setOptions(this, e),
          this.options.token &&
            -1 === s.urlTemplate.indexOf("token=") &&
            (s.urlTemplate += "?token=" + this.options.token),
          this.options.proxy &&
            (s.urlTemplate = this.options.proxy + "?" + s.urlTemplate),
          m.TileLayer.prototype.initialize.call(this, s.urlTemplate, e);
      },
      onAdd: function(t) {
        R(t),
          "esri-labels" === this.options.pane && this._initPane(),
          this.options.attributionUrl &&
            G(
              (this.options.proxy ? this.options.proxy + "?" : "") +
                this.options.attributionUrl,
              t
            ),
          t.on("moveend", F),
          -1 !== this._url.indexOf("World_Imagery") &&
            t.on("zoomanim", rt, this),
          m.TileLayer.prototype.onAdd.call(this, t);
      },
      onRemove: function(t) {
        t.off("moveend", F), m.TileLayer.prototype.onRemove.call(this, t);
      },
      _initPane: function() {
        if (!this._map.getPane(this.options.pane)) {
          var t = this._map.createPane(this.options.pane);
          (t.style.pointerEvents = "none"), (t.style.zIndex = 500);
        }
      },
      getAttribution: function() {
        if (this.options.attribution)
          var t =
            '<span class="esri-dynamic-attribution">' +
            this.options.attribution +
            "</span>";
        return t;
      }
    });
  function rt(t) {
    var i = t.target;
    if (i) {
      var s = i.getZoom(),
        e = t.zoom,
        a = i.wrapLatLng(t.center);
      if (s < e && 13 < e && !this.options.downsampled) {
        var n = i
            .project(a, e)
            .divideBy(256)
            .floor(),
          o =
            m.Util.template(
              this._url,
              m.Util.extend(
                { s: this._getSubdomain(n), x: n.x, y: n.y, z: e },
                this.options
              )
            ).replace(/tile/, "tilemap") + "/8/8";
        L.esri.request(
          o,
          {},
          function(t, i) {
            if (!t)
              for (var s = 0; s < i.data.length; s++) {
                if (!i.data[s]) {
                  (this.options.maxNativeZoom = e - 1),
                    (this.options.downsampled = !0);
                  break;
                }
                this.options.maxNativeZoom = 22;
              }
          },
          this
        );
      } else e < 13 && (this.options.downsampled = !1);
    }
  }
  var ht = m.TileLayer.extend({
      options: {
        zoomOffsetAllowance: 0.1,
        errorTileUrl:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg=="
      },
      statics: {
        MercatorZoomLevels: {
          0: 156543.033928,
          1: 78271.5169639999,
          2: 39135.7584820001,
          3: 19567.8792409999,
          4: 9783.93962049996,
          5: 4891.96981024998,
          6: 2445.98490512499,
          7: 1222.99245256249,
          8: 611.49622628138,
          9: 305.748113140558,
          10: 152.874056570411,
          11: 76.4370282850732,
          12: 38.2185141425366,
          13: 19.1092570712683,
          14: 9.55462853563415,
          15: 4.77731426794937,
          16: 2.38865713397468,
          17: 1.19432856685505,
          18: 0.597164283559817,
          19: 0.298582141647617,
          20: 0.14929107082381,
          21: 0.07464553541191,
          22: 0.0373227677059525,
          23: 0.0186613838529763
        }
      },
      initialize: function(t) {
        (t = T((t = m.Util.setOptions(this, t)))),
          (this.tileUrl =
            (t.proxy ? t.proxy + "?" : "") +
            t.url +
            "tile/{z}/{y}/{x}" +
            (t.requestParams && 0 < Object.keys(t.requestParams).length
              ? m.Util.getParamString(t.requestParams)
              : "")),
          -1 !== t.url.indexOf("{s}") &&
            t.subdomains &&
            (t.url = t.url.replace("{s}", t.subdomains[0])),
          (this.service = tt(t)),
          this.service.addEventParent(this),
          new RegExp(/tiles.arcgis(online)?\.com/g).test(t.url) &&
            ((this.tileUrl = this.tileUrl.replace("://tiles", "://tiles{s}")),
            (t.subdomains = ["1", "2", "3", "4"])),
          this.options.token &&
            (this.tileUrl += "?token=" + this.options.token),
          m.TileLayer.prototype.initialize.call(this, this.tileUrl, t);
      },
      getTileUrl: function(t) {
        var i = this._getZoomForUrl();
        return m.Util.template(
          this.tileUrl,
          m.Util.extend(
            {
              s: this._getSubdomain(t),
              x: t.x,
              y: t.y,
              z: this._lodMap && this._lodMap[i] ? this._lodMap[i] : i
            },
            this.options
          )
        );
      },
      createTile: function(t, i) {
        var s = document.createElement("img");
        return (
          m.DomEvent.on(s, "load", m.Util.bind(this._tileOnLoad, this, i, s)),
          m.DomEvent.on(s, "error", m.Util.bind(this._tileOnError, this, i, s)),
          this.options.crossOrigin && (s.crossOrigin = ""),
          (s.alt = ""),
          !this._lodMap || (this._lodMap && this._lodMap[this._getZoomForUrl()])
            ? (s.src = this.getTileUrl(t))
            : this.once(
                "lodmap",
                function() {
                  s.src = this.getTileUrl(t);
                },
                this
              ),
          s
        );
      },
      onAdd: function(l) {
        R(l),
          this._lodMap ||
            this.metadata(function(t, i) {
              if (!t && i.spatialReference) {
                var s =
                  i.spatialReference.latestWkid || i.spatialReference.wkid;
                if (
                  (!this.options.attribution &&
                    l.attributionControl &&
                    i.copyrightText &&
                    ((this.options.attribution = i.copyrightText),
                    l.attributionControl.addAttribution(this.getAttribution())),
                  l.options.crs !== m.CRS.EPSG3857 ||
                    (102100 !== s && 3857 !== s))
                )
                  (l.options.crs &&
                    l.options.crs.code &&
                    -1 < l.options.crs.code.indexOf(s)) ||
                    f(
                      "L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html"
                    );
                else {
                  this._lodMap = {};
                  for (
                    var e = i.tileInfo.lods, a = ht.MercatorZoomLevels, n = 0;
                    n < e.length;
                    n++
                  ) {
                    var o = e[n];
                    for (var r in a) {
                      var h = a[r];
                      if (
                        this._withinPercentage(
                          o.resolution,
                          h,
                          this.options.zoomOffsetAllowance
                        )
                      ) {
                        this._lodMap[r] = o.level;
                        break;
                      }
                    }
                  }
                  this.fire("lodmap");
                }
              }
            }, this),
          m.TileLayer.prototype.onAdd.call(this, l);
      },
      metadata: function(t, i) {
        return this.service.metadata(t, i), this;
      },
      identify: function() {
        return this.service.identify();
      },
      find: function() {
        return this.service.find();
      },
      query: function() {
        return this.service.query();
      },
      authenticate: function(t) {
        var i = "?token=" + t;
        return (
          (this.tileUrl = this.options.token
            ? this.tileUrl.replace(/\?token=(.+)/g, i)
            : this.tileUrl + i),
          (this.options.token = t),
          this.service.authenticate(t),
          this
        );
      },
      _withinPercentage: function(t, i, s) {
        return Math.abs(t / i - 1) < s;
      }
    }),
    lt = m.ImageOverlay.extend({
      onAdd: function(t) {
        (this._topLeft = t.getPixelBounds().min),
          m.ImageOverlay.prototype.onAdd.call(this, t);
      },
      _reset: function() {
        this._map.options.crs === m.CRS.EPSG3857
          ? m.ImageOverlay.prototype._reset.call(this)
          : m.DomUtil.setPosition(
              this._image,
              this._topLeft.subtract(this._map.getPixelOrigin())
            );
      }
    }),
    ut = m.Layer.extend({
      options: {
        opacity: 1,
        position: "front",
        f: "image",
        useCors: i,
        attribution: null,
        interactive: !1,
        alt: ""
      },
      onAdd: function(s) {
        R(s),
          this.options.zIndex && (this.options.position = null),
          (this._update = m.Util.throttle(
            this._update,
            this.options.updateInterval,
            this
          )),
          s.on("moveend", this._update, this),
          this._currentImage &&
          this._currentImage._bounds.equals(this._map.getBounds())
            ? s.addLayer(this._currentImage)
            : this._currentImage &&
              (this._map.removeLayer(this._currentImage),
              (this._currentImage = null)),
          this._update(),
          this._popup &&
            (this._map.on("click", this._getPopupData, this),
            this._map.on("dblclick", this._resetPopupState, this)),
          this.metadata(function(t, i) {
            !t &&
              !this.options.attribution &&
              s.attributionControl &&
              i.copyrightText &&
              ((this.options.attribution = i.copyrightText),
              s.attributionControl.addAttribution(this.getAttribution()));
          }, this);
      },
      onRemove: function(t) {
        this._currentImage && this._map.removeLayer(this._currentImage),
          this._popup &&
            (this._map.off("click", this._getPopupData, this),
            this._map.off("dblclick", this._resetPopupState, this)),
          this._map.off("moveend", this._update, this);
      },
      bindPopup: function(t, i) {
        return (
          (this._shouldRenderPopup = !1),
          (this._lastClick = !1),
          (this._popup = m.popup(i)),
          (this._popupFunction = t),
          this._map &&
            (this._map.on("click", this._getPopupData, this),
            this._map.on("dblclick", this._resetPopupState, this)),
          this
        );
      },
      unbindPopup: function() {
        return (
          this._map &&
            (this._map.closePopup(this._popup),
            this._map.off("click", this._getPopupData, this),
            this._map.off("dblclick", this._resetPopupState, this)),
          (this._popup = !1),
          this
        );
      },
      bringToFront: function() {
        return (
          (this.options.position = "front"),
          this._currentImage &&
            (this._currentImage.bringToFront(), this._setAutoZIndex(Math.max)),
          this
        );
      },
      bringToBack: function() {
        return (
          (this.options.position = "back"),
          this._currentImage &&
            (this._currentImage.bringToBack(), this._setAutoZIndex(Math.min)),
          this
        );
      },
      setZIndex: function(t) {
        return (
          (this.options.zIndex = t),
          this._currentImage && this._currentImage.setZIndex(t),
          this
        );
      },
      _setAutoZIndex: function(t) {
        if (this._currentImage) {
          for (
            var i,
              s = this._currentImage.getPane().children,
              e = -t(-1 / 0, 1 / 0),
              a = 0,
              n = s.length;
            a < n;
            a++
          )
            (i = s[a].style.zIndex),
              s[a] !== this._currentImage._image && i && (e = t(e, +i));
          isFinite(e) &&
            ((this.options.zIndex = e + t(-1, 1)),
            this.setZIndex(this.options.zIndex));
        }
      },
      getAttribution: function() {
        return this.options.attribution;
      },
      getOpacity: function() {
        return this.options.opacity;
      },
      setOpacity: function(t) {
        return (
          (this.options.opacity = t),
          this._currentImage && this._currentImage.setOpacity(t),
          this
        );
      },
      getTimeRange: function() {
        return [this.options.from, this.options.to];
      },
      setTimeRange: function(t, i) {
        return (
          (this.options.from = t), (this.options.to = i), this._update(), this
        );
      },
      metadata: function(t, i) {
        return this.service.metadata(t, i), this;
      },
      authenticate: function(t) {
        return this.service.authenticate(t), this;
      },
      redraw: function() {
        this._update();
      },
      _renderImage: function(t, e, i) {
        if (this._map) {
          if ((i && (t = "data:" + i + ";base64," + t), !t)) return;
          var a = new lt(t, e, {
              opacity: 0,
              crossOrigin: this.options.useCors,
              alt: this.options.alt,
              pane: this.options.pane || this.getPane(),
              interactive: this.options.interactive
            }).addTo(this._map),
            n = function(t) {
              if ((a.off("error", n, this), this._map)) {
                var i = t.target,
                  s = this._currentImage;
                i._bounds.equals(e) && i._bounds.equals(this._map.getBounds())
                  ? ((this._currentImage = i),
                    "front" === this.options.position
                      ? this.bringToFront()
                      : "back" === this.options.position && this.bringToBack(),
                    this.options.zIndex && this.setZIndex(this.options.zIndex),
                    this._map && this._currentImage._map
                      ? this._currentImage.setOpacity(this.options.opacity)
                      : this._currentImage._map.removeLayer(this._currentImage),
                    s && this._map && this._map.removeLayer(s),
                    s && s._map && s._map.removeLayer(s))
                  : this._map.removeLayer(i);
              }
              this.fire("load", { bounds: e });
            };
          a.once(
            "error",
            function() {
              this._map.removeLayer(a),
                this.fire("error"),
                a.off("load", n, this);
            },
            this
          ),
            a.once("load", n, this);
        }
      },
      _update: function() {
        if (this._map) {
          var t = this._map.getZoom(),
            i = this._map.getBounds();
          if (
            !(
              this._animatingZoom ||
              (this._map._panTransition && this._map._panTransition._inProgress)
            )
          )
            if (t > this.options.maxZoom || t < this.options.minZoom)
              this._currentImage &&
                (this._currentImage._map.removeLayer(this._currentImage),
                (this._currentImage = null));
            else {
              var s = this._buildExportParams();
              m.Util.extend(s, this.options.requestParams),
                s
                  ? (this._requestExport(s, i),
                    this.fire("loading", { bounds: i }))
                  : this._currentImage &&
                    (this._currentImage._map.removeLayer(this._currentImage),
                    (this._currentImage = null));
            }
        }
      },
      _renderPopup: function(t, i, s, e) {
        if (
          ((t = m.latLng(t)),
          this._shouldRenderPopup && this._lastClick.equals(t))
        ) {
          var a = this._popupFunction(i, s, e);
          a &&
            this._popup
              .setLatLng(t)
              .setContent(a)
              .openOn(this._map);
        }
      },
      _resetPopupState: function(t) {
        (this._shouldRenderPopup = !1), (this._lastClick = t.latlng);
      },
      _calculateBbox: function() {
        var t = this._map.getPixelBounds(),
          i = this._map.unproject(t.getBottomLeft()),
          s = this._map.unproject(t.getTopRight()),
          e = this._map.options.crs.project(s),
          a = this._map.options.crs.project(i),
          n = m.bounds(e, a);
        return [
          n.getBottomLeft().x,
          n.getBottomLeft().y,
          n.getTopRight().x,
          n.getTopRight().y
        ].join(",");
      },
      _calculateImageSize: function() {
        var t = this._map.getPixelBounds(),
          i = this._map.getSize(),
          s = this._map.unproject(t.getBottomLeft()),
          e = this._map.unproject(t.getTopRight()),
          a = this._map.latLngToLayerPoint(e).y,
          n = this._map.latLngToLayerPoint(s).y;
        return (0 < a || n < i.y) && (i.y = n - a), i.x + "," + i.y;
      }
    }),
    ct = ut.extend({
      options: {
        updateInterval: 150,
        format: "jpgpng",
        transparent: !0,
        f: "image"
      },
      query: function() {
        return this.service.query();
      },
      identify: function() {
        return this.service.identify();
      },
      initialize: function(t) {
        (t = T(t)),
          (this.service = st(t)),
          this.service.addEventParent(this),
          m.Util.setOptions(this, t);
      },
      setPixelType: function(t) {
        return (this.options.pixelType = t), this._update(), this;
      },
      getPixelType: function() {
        return this.options.pixelType;
      },
      setBandIds: function(t) {
        return (
          m.Util.isArray(t)
            ? (this.options.bandIds = t.join(","))
            : (this.options.bandIds = t.toString()),
          this._update(),
          this
        );
      },
      getBandIds: function() {
        return this.options.bandIds;
      },
      setNoData: function(t, i) {
        return (
          m.Util.isArray(t)
            ? (this.options.noData = t.join(","))
            : (this.options.noData = t.toString()),
          i && (this.options.noDataInterpretation = i),
          this._update(),
          this
        );
      },
      getNoData: function() {
        return this.options.noData;
      },
      getNoDataInterpretation: function() {
        return this.options.noDataInterpretation;
      },
      setRenderingRule: function(t) {
        (this.options.renderingRule = t), this._update();
      },
      getRenderingRule: function() {
        return this.options.renderingRule;
      },
      setMosaicRule: function(t) {
        (this.options.mosaicRule = t), this._update();
      },
      getMosaicRule: function() {
        return this.options.mosaicRule;
      },
      _getPopupData: function(e) {
        var t = m.Util.bind(function(t, i, s) {
            t ||
              setTimeout(
                m.Util.bind(function() {
                  this._renderPopup(e.latlng, t, i, s);
                }, this),
                300
              );
          }, this),
          i = this.identify().at(e.latlng);
        this.options.mosaicRule && i.setMosaicRule(this.options.mosaicRule),
          i.run(t),
          (this._shouldRenderPopup = !0),
          (this._lastClick = e.latlng);
      },
      _buildExportParams: function() {
        var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
          i = {
            bbox: this._calculateBbox(),
            size: this._calculateImageSize(),
            format: this.options.format,
            transparent: this.options.transparent,
            bboxSR: t,
            imageSR: t
          };
        return (
          this.options.from &&
            this.options.to &&
            (i.time =
              this.options.from.valueOf() + "," + this.options.to.valueOf()),
          this.options.pixelType && (i.pixelType = this.options.pixelType),
          this.options.interpolation &&
            (i.interpolation = this.options.interpolation),
          this.options.compressionQuality &&
            (i.compressionQuality = this.options.compressionQuality),
          this.options.bandIds && (i.bandIds = this.options.bandIds),
          (0 !== this.options.noData && !this.options.noData) ||
            (i.noData = this.options.noData),
          this.options.noDataInterpretation &&
            (i.noDataInterpretation = this.options.noDataInterpretation),
          this.service.options.token && (i.token = this.service.options.token),
          this.options.renderingRule &&
            (i.renderingRule = JSON.stringify(this.options.renderingRule)),
          this.options.mosaicRule &&
            (i.mosaicRule = JSON.stringify(this.options.mosaicRule)),
          i
        );
      },
      _requestExport: function(t, s) {
        "json" === this.options.f
          ? this.service.request(
              "exportImage",
              t,
              function(t, i) {
                t ||
                  (this.options.token &&
                    (i.href += "?token=" + this.options.token),
                  this.options.proxy &&
                    (i.href = this.options.proxy + "?" + i.href),
                  this._renderImage(i.href, s));
              },
              this
            )
          : ((t.f = "image"),
            this._renderImage(
              this.options.url + "exportImage" + m.Util.getParamString(t),
              s
            ));
      }
    }),
    mt = ut.extend({
      options: {
        updateInterval: 150,
        layers: !1,
        layerDefs: !1,
        timeOptions: !1,
        format: "png24",
        transparent: !0,
        f: "json"
      },
      initialize: function(t) {
        (t = T(t)),
          (this.service = tt(t)),
          this.service.addEventParent(this),
          t.proxy && "json" !== t.f && (t.f = "json"),
          m.Util.setOptions(this, t);
      },
      getDynamicLayers: function() {
        return this.options.dynamicLayers;
      },
      setDynamicLayers: function(t) {
        return (this.options.dynamicLayers = t), this._update(), this;
      },
      getLayers: function() {
        return this.options.layers;
      },
      setLayers: function(t) {
        return (this.options.layers = t), this._update(), this;
      },
      getLayerDefs: function() {
        return this.options.layerDefs;
      },
      setLayerDefs: function(t) {
        return (this.options.layerDefs = t), this._update(), this;
      },
      getTimeOptions: function() {
        return this.options.timeOptions;
      },
      setTimeOptions: function(t) {
        return (this.options.timeOptions = t), this._update(), this;
      },
      query: function() {
        return this.service.query();
      },
      identify: function() {
        return this.service.identify();
      },
      find: function() {
        return this.service.find();
      },
      _getPopupData: function(e) {
        var t,
          i = m.Util.bind(function(t, i, s) {
            t ||
              setTimeout(
                m.Util.bind(function() {
                  this._renderPopup(e.latlng, t, i, s);
                }, this),
                300
              );
          }, this);
        if (
          ((t = this.options.popup
            ? this.options.popup.on(this._map).at(e.latlng)
            : this.identify()
                .on(this._map)
                .at(e.latlng)).params.maxAllowableOffset ||
            t.simplify(this._map, 0.5),
          (this.options.popup &&
            this.options.popup.params &&
            this.options.popup.params.layers) ||
            (this.options.layers
              ? t.layers("visible:" + this.options.layers.join(","))
              : t.layers("visible")),
          this.options.layerDefs &&
            "string" != typeof this.options.layerDefs &&
            !t.params.layerDefs)
        )
          for (var s in this.options.layerDefs)
            this.options.layerDefs.hasOwnProperty(s) &&
              t.layerDef(s, this.options.layerDefs[s]);
        t.run(i), (this._shouldRenderPopup = !0), (this._lastClick = e.latlng);
      },
      _buildExportParams: function() {
        var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
          i = {
            bbox: this._calculateBbox(),
            size: this._calculateImageSize(),
            dpi: 96,
            format: this.options.format,
            transparent: this.options.transparent,
            bboxSR: t,
            imageSR: t
          };
        if (
          (this.options.dynamicLayers &&
            (i.dynamicLayers = this.options.dynamicLayers),
          this.options.layers)
        ) {
          if (0 === this.options.layers.length) return;
          i.layers = "show:" + this.options.layers.join(",");
        }
        return (
          this.options.layerDefs &&
            (i.layerDefs =
              "string" == typeof this.options.layerDefs
                ? this.options.layerDefs
                : JSON.stringify(this.options.layerDefs)),
          this.options.timeOptions &&
            (i.timeOptions = JSON.stringify(this.options.timeOptions)),
          this.options.from &&
            this.options.to &&
            (i.time =
              this.options.from.valueOf() + "," + this.options.to.valueOf()),
          this.service.options.token && (i.token = this.service.options.token),
          this.options.proxy && (i.proxy = this.options.proxy),
          this.options.disableCache && (i._ts = Date.now()),
          i
        );
      },
      _requestExport: function(t, s) {
        "json" === this.options.f
          ? this.service.request(
              "export",
              t,
              function(t, i) {
                t ||
                  (this.options.token &&
                    i.href &&
                    (i.href += "?token=" + this.options.token),
                  this.options.proxy &&
                    i.href &&
                    (i.href = this.options.proxy + "?" + i.href),
                  i.href
                    ? this._renderImage(i.href, s)
                    : this._renderImage(i.imageData, s, i.contentType));
              },
              this
            )
          : ((t.f = "image"),
            this._renderImage(
              this.options.url + "export" + m.Util.getParamString(t),
              s
            ));
      }
    }),
    pt = m.Layer.extend({
      options: { cellSize: 512, updateInterval: 150 },
      initialize: function(t) {
        (t = m.setOptions(this, t)), (this._zooming = !1);
      },
      onAdd: function(t) {
        (this._map = t),
          (this._update = m.Util.throttle(
            this._update,
            this.options.updateInterval,
            this
          )),
          this._reset(),
          this._update();
      },
      onRemove: function() {
        this._map.removeEventListener(this.getEvents(), this),
          this._removeCells();
      },
      getEvents: function() {
        return {
          moveend: this._update,
          zoomstart: this._zoomstart,
          zoomend: this._reset
        };
      },
      addTo: function(t) {
        return t.addLayer(this), this;
      },
      removeFrom: function(t) {
        return t.removeLayer(this), this;
      },
      _zoomstart: function() {
        this._zooming = !0;
      },
      _reset: function() {
        this._removeCells(),
          (this._cells = {}),
          (this._activeCells = {}),
          (this._cellsToLoad = 0),
          (this._cellsTotal = 0),
          (this._cellNumBounds = this._getCellNumBounds()),
          this._resetWrap(),
          (this._zooming = !1);
      },
      _resetWrap: function() {
        var t = this._map,
          i = t.options.crs;
        if (!i.infinite) {
          var s = this._getCellSize();
          i.wrapLng &&
            (this._wrapLng = [
              Math.floor(t.project([0, i.wrapLng[0]]).x / s),
              Math.ceil(t.project([0, i.wrapLng[1]]).x / s)
            ]),
            i.wrapLat &&
              (this._wrapLat = [
                Math.floor(t.project([i.wrapLat[0], 0]).y / s),
                Math.ceil(t.project([i.wrapLat[1], 0]).y / s)
              ]);
        }
      },
      _getCellSize: function() {
        return this.options.cellSize;
      },
      _update: function() {
        if (this._map) {
          var t = this._map.getPixelBounds(),
            i = this._getCellSize(),
            s = m.bounds(t.min.divideBy(i).floor(), t.max.divideBy(i).floor());
          this._removeOtherCells(s),
            this._addCells(s),
            this.fire("cellsupdated");
        }
      },
      _addCells: function(t) {
        var i,
          s,
          e,
          a = [],
          n = t.getCenter(),
          o = this._map.getZoom();
        for (i = t.min.y; i <= t.max.y; i++)
          for (s = t.min.x; s <= t.max.x; s++)
            ((e = m.point(s, i)).z = o), this._isValidCell(e) && a.push(e);
        var r = a.length;
        if (0 !== r)
          for (
            this._cellsToLoad += r,
              this._cellsTotal += r,
              a.sort(function(t, i) {
                return t.distanceTo(n) - i.distanceTo(n);
              }),
              s = 0;
            s < r;
            s++
          )
            this._addCell(a[s]);
      },
      _isValidCell: function(t) {
        var i = this._map.options.crs;
        if (!i.infinite) {
          var s = this._cellNumBounds;
          if (!s) return !1;
          if (
            (!i.wrapLng && (t.x < s.min.x || t.x > s.max.x)) ||
            (!i.wrapLat && (t.y < s.min.y || t.y > s.max.y))
          )
            return !1;
        }
        if (!this.options.bounds) return !0;
        var e = this._cellCoordsToBounds(t);
        return m.latLngBounds(this.options.bounds).intersects(e);
      },
      _cellCoordsToBounds: function(t) {
        var i = this._map,
          s = this.options.cellSize,
          e = t.multiplyBy(s),
          a = e.add([s, s]),
          n = i.wrapLatLng(i.unproject(e, t.z)),
          o = i.wrapLatLng(i.unproject(a, t.z));
        return m.latLngBounds(n, o);
      },
      _cellCoordsToKey: function(t) {
        return t.x + ":" + t.y;
      },
      _keyToCellCoords: function(t) {
        var i = t.split(":"),
          s = parseInt(i[0], 10),
          e = parseInt(i[1], 10);
        return m.point(s, e);
      },
      _removeOtherCells: function(t) {
        for (var i in this._cells)
          t.contains(this._keyToCellCoords(i)) || this._removeCell(i);
      },
      _removeCell: function(t) {
        var i = this._activeCells[t];
        i &&
          (delete this._activeCells[t],
          this.cellLeave && this.cellLeave(i.bounds, i.coords),
          this.fire("cellleave", { bounds: i.bounds, coords: i.coords }));
      },
      _removeCells: function() {
        for (var t in this._cells) {
          var i = this._cells[t].bounds,
            s = this._cells[t].coords;
          this.cellLeave && this.cellLeave(i, s),
            this.fire("cellleave", { bounds: i, coords: s });
        }
      },
      _addCell: function(t) {
        this._wrapCoords(t);
        var i = this._cellCoordsToKey(t),
          s = this._cells[i];
        s &&
          !this._activeCells[i] &&
          (this.cellEnter && this.cellEnter(s.bounds, t),
          this.fire("cellenter", { bounds: s.bounds, coords: t }),
          (this._activeCells[i] = s)),
          s ||
            ((s = { coords: t, bounds: this._cellCoordsToBounds(t) }),
            (this._cells[i] = s),
            (this._activeCells[i] = s),
            this.createCell && this.createCell(s.bounds, t),
            this.fire("cellcreate", { bounds: s.bounds, coords: t }));
      },
      _wrapCoords: function(t) {
        (t.x = this._wrapLng ? m.Util.wrapNum(t.x, this._wrapLng) : t.x),
          (t.y = this._wrapLat ? m.Util.wrapNum(t.y, this._wrapLat) : t.y);
      },
      _getCellNumBounds: function() {
        var t = this._map.getPixelWorldBounds(),
          i = this._getCellSize();
        return t
          ? m.bounds(
              t.min.divideBy(i).floor(),
              t.max
                .divideBy(i)
                .ceil()
                .subtract([1, 1])
            )
          : null;
      }
    });
  function ft(t) {
    this.values = [].concat(t || []);
  }
  (ft.prototype.query = function(t) {
    var i = this.getIndex(t);
    return this.values[i];
  }),
    (ft.prototype.getIndex = function(t) {
      this.dirty && this.sort();
      for (var i, s, e = 0, a = this.values.length - 1; e <= a; )
        if (
          ((i = ((e + a) / 2) | 0),
          +(s = this.values[Math.round(i)]).value < +t)
        )
          e = 1 + i;
        else {
          if (!(+s.value > +t)) return i;
          a = i - 1;
        }
      return Math.abs(~a);
    }),
    (ft.prototype.between = function(t, i) {
      var s = this.getIndex(t),
        e = this.getIndex(i);
      if (0 === s && 0 === e) return [];
      for (; this.values[s - 1] && this.values[s - 1].value === t; ) s--;
      for (; this.values[e + 1] && this.values[e + 1].value === i; ) e++;
      return (
        this.values[e] &&
          this.values[e].value === i &&
          this.values[e + 1] &&
          e++,
        this.values.slice(s, e)
      );
    }),
    (ft.prototype.insert = function(t) {
      return this.values.splice(this.getIndex(t.value), 0, t), this;
    }),
    (ft.prototype.bulkAdd = function(t, i) {
      return (
        (this.values = this.values.concat([].concat(t || []))),
        i ? this.sort() : (this.dirty = !0),
        this
      );
    }),
    (ft.prototype.sort = function() {
      return (
        this.values
          .sort(function(t, i) {
            return i.value - t.value;
          })
          .reverse(),
        (this.dirty = !1),
        this
      );
    });
  var dt = pt.extend({
      options: {
        attribution: null,
        where: "1=1",
        fields: ["*"],
        from: !1,
        to: !1,
        timeField: !1,
        timeFilterMode: "server",
        simplifyFactor: 0,
        precision: 6
      },
      initialize: function(t) {
        if (
          (pt.prototype.initialize.call(this, t),
          (t = T(t)),
          (t = m.Util.setOptions(this, t)),
          (this.service = at(t)),
          this.service.addEventParent(this),
          "*" !== this.options.fields[0])
        ) {
          for (var i = !1, s = 0; s < this.options.fields.length; s++)
            this.options.fields[s].match(/^(OBJECTID|FID|OID|ID)$/i) &&
              (i = !0);
          !1 === i &&
            f(
              "no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly."
            );
        }
        this.options.timeField.start && this.options.timeField.end
          ? ((this._startTimeIndex = new ft()), (this._endTimeIndex = new ft()))
          : this.options.timeField && (this._timeIndex = new ft()),
          (this._cache = {}),
          (this._currentSnapshot = []),
          (this._activeRequests = 0);
      },
      onAdd: function(a) {
        return (
          R(a),
          this.service.metadata(function(t, i) {
            if (!t) {
              var s = i.supportedQueryFormats,
                e = !1;
              !1 === this.service.options.isModern && (e = !0),
                !e &&
                  s &&
                  -1 !== s.indexOf("geoJSON") &&
                  (this.service.options.isModern = !0),
                i.objectIdField &&
                  (this.service.options.idAttribute = i.objectIdField),
                !this.options.attribution &&
                  a.attributionControl &&
                  i.copyrightText &&
                  ((this.options.attribution = i.copyrightText),
                  a.attributionControl.addAttribution(this.getAttribution()));
            }
          }, this),
          a.on("zoomend", this._handleZoomChange, this),
          pt.prototype.onAdd.call(this, a)
        );
      },
      onRemove: function(t) {
        return (
          t.off("zoomend", this._handleZoomChange, this),
          pt.prototype.onRemove.call(this, t)
        );
      },
      getAttribution: function() {
        return this.options.attribution;
      },
      createCell: function(t, i) {
        this._visibleZoom() && this._requestFeatures(t, i);
      },
      _requestFeatures: function(e, a, n) {
        return (
          this._activeRequests++,
          1 === this._activeRequests && this.fire("loading", { bounds: e }, !0),
          this._buildQuery(e).run(function(t, i, s) {
            s && s.exceededTransferLimit && this.fire("drawlimitexceeded"),
              !t &&
                i &&
                i.features.length &&
                m.Util.requestAnimFrame(
                  m.Util.bind(function() {
                    this._addFeatures(i.features, a),
                      this._postProcessFeatures(e);
                  }, this)
                ),
              t || !i || i.features.length || this._postProcessFeatures(e),
              t && this._postProcessFeatures(e),
              n && n.call(this, t, i);
          }, this)
        );
      },
      _postProcessFeatures: function(t) {
        this._activeRequests--,
          this._activeRequests <= 0 && this.fire("load", { bounds: t });
      },
      _cacheKey: function(t) {
        return t.z + ":" + t.x + ":" + t.y;
      },
      _addFeatures: function(t, i) {
        var s = this._cacheKey(i);
        this._cache[s] = this._cache[s] || [];
        for (var e = t.length - 1; 0 <= e; e--) {
          var a = t[e].id;
          -1 === this._currentSnapshot.indexOf(a) &&
            this._currentSnapshot.push(a),
            -1 === this._cache[s].indexOf(a) && this._cache[s].push(a);
        }
        this.options.timeField && this._buildTimeIndexes(t),
          this.createLayers(t);
      },
      _buildQuery: function(t) {
        var i = this.service
          .query()
          .intersects(t)
          .where(this.options.where)
          .fields(this.options.fields)
          .precision(this.options.precision);
        return (
          this.options.requestParams &&
            m.Util.extend(i.params, this.options.requestParams),
          this.options.simplifyFactor &&
            i.simplify(this._map, this.options.simplifyFactor),
          "server" === this.options.timeFilterMode &&
            this.options.from &&
            this.options.to &&
            i.between(this.options.from, this.options.to),
          i
        );
      },
      setWhere: function(t, e, a) {
        this.options.where = t && t.length ? t : "1=1";
        for (
          var n = [],
            o = [],
            r = 0,
            h = null,
            i = m.Util.bind(function(t, i) {
              if ((t && (h = t), i))
                for (var s = i.features.length - 1; 0 <= s; s--)
                  o.push(i.features[s].id);
              --r <= 0 &&
                this._visibleZoom() &&
                ((this._currentSnapshot = o),
                m.Util.requestAnimFrame(
                  m.Util.bind(function() {
                    this.removeLayers(n), this.addLayers(o), e && e.call(a, h);
                  }, this)
                ));
            }, this),
            s = this._currentSnapshot.length - 1;
          0 <= s;
          s--
        )
          n.push(this._currentSnapshot[s]);
        for (var l in this._activeCells) {
          r++;
          var u = this._keyToCellCoords(l),
            c = this._cellCoordsToBounds(u);
          this._requestFeatures(c, l, i);
        }
        return this;
      },
      getWhere: function() {
        return this.options.where;
      },
      getTimeRange: function() {
        return [this.options.from, this.options.to];
      },
      setTimeRange: function(i, s, e, a) {
        var n = this.options.from,
          o = this.options.to,
          r = 0,
          h = null,
          t = m.Util.bind(function(t) {
            t && (h = t),
              this._filterExistingFeatures(n, o, i, s),
              r--,
              e && r <= 0 && e.call(a, h);
          }, this);
        if (
          ((this.options.from = i),
          (this.options.to = s),
          this._filterExistingFeatures(n, o, i, s),
          "server" === this.options.timeFilterMode)
        )
          for (var l in this._activeCells) {
            r++;
            var u = this._keyToCellCoords(l),
              c = this._cellCoordsToBounds(u);
            this._requestFeatures(c, l, t);
          }
        return this;
      },
      refresh: function() {
        for (var t in this._activeCells) {
          var i = this._keyToCellCoords(t),
            s = this._cellCoordsToBounds(i);
          this._requestFeatures(s, t);
        }
        this.redraw &&
          this.once(
            "load",
            function() {
              this.eachFeature(function(t) {
                this._redraw(t.feature.id);
              }, this);
            },
            this
          );
      },
      _filterExistingFeatures: function(t, i, s, e) {
        var a =
            t && i ? this._getFeaturesInTimeRange(t, i) : this._currentSnapshot,
          n = this._getFeaturesInTimeRange(s, e);
        if (n.indexOf)
          for (var o = 0; o < n.length; o++) {
            var r = a.indexOf(n[o]);
            0 <= r && a.splice(r, 1);
          }
        m.Util.requestAnimFrame(
          m.Util.bind(function() {
            this.removeLayers(a), this.addLayers(n);
          }, this)
        );
      },
      _getFeaturesInTimeRange: function(t, i) {
        var s,
          e = [];
        if (this.options.timeField.start && this.options.timeField.end) {
          var a = this._startTimeIndex.between(t, i),
            n = this._endTimeIndex.between(t, i);
          s = a.concat(n);
        } else {
          if (!this._timeIndex)
            return (
              f(
                "You must set timeField in the layer constructor in order to manipulate the start and end time filter."
              ),
              []
            );
          s = this._timeIndex.between(t, i);
        }
        for (var o = s.length - 1; 0 <= o; o--) e.push(s[o].id);
        return e;
      },
      _buildTimeIndexes: function(t) {
        var i, s;
        if (this.options.timeField.start && this.options.timeField.end) {
          var e = [],
            a = [];
          for (i = t.length - 1; 0 <= i; i--)
            (s = t[i]),
              e.push({
                id: s.id,
                value: new Date(s.properties[this.options.timeField.start])
              }),
              a.push({
                id: s.id,
                value: new Date(s.properties[this.options.timeField.end])
              });
          this._startTimeIndex.bulkAdd(e), this._endTimeIndex.bulkAdd(a);
        } else {
          var n = [];
          for (i = t.length - 1; 0 <= i; i--)
            (s = t[i]),
              n.push({
                id: s.id,
                value: new Date(s.properties[this.options.timeField])
              });
          this._timeIndex.bulkAdd(n);
        }
      },
      _featureWithinTimeRange: function(t) {
        if (!this.options.from || !this.options.to) return !0;
        var i = +this.options.from.valueOf(),
          s = +this.options.to.valueOf();
        if ("string" == typeof this.options.timeField) {
          var e = +t.properties[this.options.timeField];
          return i <= e && e <= s;
        }
        if (this.options.timeField.start && this.options.timeField.end) {
          var a = +t.properties[this.options.timeField.start],
            n = +t.properties[this.options.timeField.end];
          return (i <= a && a <= s) || (i <= n && n <= s) || (a <= i && s <= n);
        }
      },
      _visibleZoom: function() {
        if (!this._map) return !1;
        var t = this._map.getZoom();
        return !(t > this.options.maxZoom || t < this.options.minZoom);
      },
      _handleZoomChange: function() {
        if (this._visibleZoom())
          for (var t in this._activeCells) {
            var i = this._activeCells[t].coords,
              s = this._cacheKey(i);
            this._cache[s] && this.addLayers(this._cache[s]);
          }
        else
          this.removeLayers(this._currentSnapshot),
            (this._currentSnapshot = []);
      },
      authenticate: function(t) {
        return this.service.authenticate(t), this;
      },
      metadata: function(t, i) {
        return this.service.metadata(t, i), this;
      },
      query: function() {
        return this.service.query();
      },
      _getMetadata: function(s) {
        this._metadata
          ? s(void 0, this._metadata)
          : this.metadata(
              m.Util.bind(function(t, i) {
                (this._metadata = i), s(t, this._metadata);
              }, this)
            );
      },
      addFeature: function(t, i, s) {
        this.addFeatures(t, i, s);
      },
      addFeatures: function(i, n, o) {
        this._getMetadata(
          m.Util.bind(function(t, e) {
            if (t) n && n.call(this, t, null);
            else {
              var a = i.features ? i.features : [i];
              this.service.addFeatures(
                i,
                m.Util.bind(function(t, i) {
                  if (!t) {
                    for (var s = a.length - 1; 0 <= s; s--)
                      (a[s].properties[e.objectIdField] =
                        1 < a.length ? i[s].objectId : i.objectId),
                        (a[s].id = 1 < a.length ? i[s].objectId : i.objectId);
                    this.createLayers(a);
                  }
                  n && n.call(o, t, i);
                }, this)
              );
            }
          }, this)
        );
      },
      updateFeature: function(t, i, s) {
        this.updateFeatures(t, i, s);
      },
      updateFeatures: function(t, e, a) {
        var n = t.features ? t.features : [t];
        this.service.updateFeatures(
          t,
          function(t, i) {
            if (!t) {
              for (var s = n.length - 1; 0 <= s; s--)
                this.removeLayers([n[s].id], !0);
              this.createLayers(n);
            }
            e && e.call(a, t, i);
          },
          this
        );
      },
      deleteFeature: function(t, i, s) {
        this.deleteFeatures(t, i, s);
      },
      deleteFeatures: function(t, a, n) {
        return this.service.deleteFeatures(
          t,
          function(t, i) {
            var s = i.length ? i : [i];
            if (!t && 0 < s.length)
              for (var e = s.length - 1; 0 <= e; e--)
                this.removeLayers([s[e].objectId], !0);
            a && a.call(n, t, i);
          },
          this
        );
      }
    }),
    _t = dt.extend({
      options: { cacheLayers: !0 },
      initialize: function(t) {
        dt.prototype.initialize.call(this, t),
          (this._originalStyle = this.options.style),
          (this._layers = {});
      },
      onRemove: function(t) {
        for (var i in this._layers)
          t.removeLayer(this._layers[i]),
            this.fire(
              "removefeature",
              { feature: this._layers[i].feature, permanent: !1 },
              !0
            );
        return dt.prototype.onRemove.call(this, t);
      },
      createNewLayer: function(t) {
        var i = m.GeoJSON.geometryToLayer(t, this.options);
        return i && (i.defaultOptions = i.options), i;
      },
      _updateLayer: function(t, i) {
        var s = [],
          e = this.options.coordsToLatLng || m.GeoJSON.coordsToLatLng;
        switch (
          (i.properties && (t.feature.properties = i.properties),
          i.geometry.type)
        ) {
          case "Point":
            (s = m.GeoJSON.coordsToLatLng(i.geometry.coordinates)),
              t.setLatLng(s);
            break;
          case "LineString":
            (s = m.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 0, e)),
              t.setLatLngs(s);
            break;
          case "MultiLineString":
          case "Polygon":
            (s = m.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 1, e)),
              t.setLatLngs(s);
            break;
          case "MultiPolygon":
            (s = m.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 2, e)),
              t.setLatLngs(s);
        }
      },
      createLayers: function(t) {
        for (var i = t.length - 1; 0 <= i; i--) {
          var s,
            e = t[i],
            a = this._layers[e.id];
          !this._visibleZoom() ||
            !a ||
            this._map.hasLayer(a) ||
            (this.options.timeField && !this._featureWithinTimeRange(e)) ||
            (this._map.addLayer(a),
            this.fire("addfeature", { feature: a.feature }, !0)),
            a &&
              0 < this.options.simplifyFactor &&
              (a.setLatLngs || a.setLatLng) &&
              this._updateLayer(a, e),
            a ||
              ((s = this.createNewLayer(e))
                ? ((s.feature = e),
                  s.addEventParent(this),
                  this.options.onEachFeature &&
                    this.options.onEachFeature(s.feature, s),
                  (this._layers[s.feature.id] = s),
                  this.setFeatureStyle(s.feature.id, this.options.style),
                  this.fire("createfeature", { feature: s.feature }, !0),
                  this._visibleZoom() &&
                    (!this.options.timeField ||
                      (this.options.timeField &&
                        this._featureWithinTimeRange(e))) &&
                    this._map.addLayer(s))
                : f("invalid GeoJSON encountered"));
        }
      },
      addLayers: function(t) {
        for (var i = t.length - 1; 0 <= i; i--) {
          var s = this._layers[t[i]];
          !s ||
            (this.options.timeField &&
              !this._featureWithinTimeRange(s.feature)) ||
            this._map.addLayer(s);
        }
      },
      removeLayers: function(t, i) {
        for (var s = t.length - 1; 0 <= s; s--) {
          var e = t[s],
            a = this._layers[e];
          a &&
            (this.fire(
              "removefeature",
              { feature: a.feature, permanent: i },
              !0
            ),
            this._map.removeLayer(a)),
            a && i && delete this._layers[e];
        }
      },
      cellEnter: function(t, e) {
        this._visibleZoom() &&
          !this._zooming &&
          this._map &&
          m.Util.requestAnimFrame(
            m.Util.bind(function() {
              var t = this._cacheKey(e),
                i = this._cellCoordsToKey(e),
                s = this._cache[t];
              this._activeCells[i] && s && this.addLayers(s);
            }, this)
          );
      },
      cellLeave: function(t, r) {
        this._zooming ||
          m.Util.requestAnimFrame(
            m.Util.bind(function() {
              if (this._map) {
                var t = this._cacheKey(r),
                  i = this._cellCoordsToKey(r),
                  s = this._cache[t],
                  e = this._map.getBounds();
                if (!this._activeCells[i] && s) {
                  for (var a = !0, n = 0; n < s.length; n++) {
                    var o = this._layers[s[n]];
                    o && o.getBounds && e.intersects(o.getBounds()) && (a = !1);
                  }
                  a && this.removeLayers(s, !this.options.cacheLayers),
                    !this.options.cacheLayers &&
                      a &&
                      (delete this._cache[t],
                      delete this._cells[i],
                      delete this._activeCells[i]);
                }
              }
            }, this)
          );
      },
      resetStyle: function() {
        return (
          (this.options.style = this._originalStyle),
          this.eachFeature(function(t) {
            this.resetFeatureStyle(t.feature.id);
          }, this),
          this
        );
      },
      setStyle: function(i) {
        return (
          (this.options.style = i),
          this.eachFeature(function(t) {
            this.setFeatureStyle(t.feature.id, i);
          }, this),
          this
        );
      },
      resetFeatureStyle: function(t) {
        var i = this._layers[t],
          s = this._originalStyle || m.Path.prototype.options;
        return (
          i &&
            (m.Util.extend(i.options, i.defaultOptions),
            this.setFeatureStyle(t, s)),
          this
        );
      },
      setFeatureStyle: function(t, i) {
        var s = this._layers[t];
        return (
          "function" == typeof i && (i = i(s.feature)),
          s.setStyle && s.setStyle(i),
          this
        );
      },
      eachActiveFeature: function(t, i) {
        if (this._map) {
          var s = this._map.getBounds();
          for (var e in this._layers)
            -1 !== this._currentSnapshot.indexOf(this._layers[e].feature.id) &&
              (("function" == typeof this._layers[e].getLatLng &&
                s.contains(this._layers[e].getLatLng())) ||
                ("function" == typeof this._layers[e].getBounds &&
                  s.intersects(this._layers[e].getBounds()))) &&
              t.call(i, this._layers[e]);
        }
        return this;
      },
      eachFeature: function(t, i) {
        for (var s in this._layers) t.call(i, this._layers[s]);
        return this;
      },
      getFeature: function(t) {
        return this._layers[t];
      },
      bringToBack: function() {
        this.eachFeature(function(t) {
          t.bringToBack && t.bringToBack();
        });
      },
      bringToFront: function() {
        this.eachFeature(function(t) {
          t.bringToFront && t.bringToFront();
        });
      },
      redraw: function(t) {
        return t && this._redraw(t), this;
      },
      _redraw: function(t) {
        var i = this._layers[t],
          s = i.feature;
        if (
          i &&
          i.setIcon &&
          this.options.pointToLayer &&
          this.options.pointToLayer
        ) {
          var e = this.options.pointToLayer(
            s,
            m.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])
          ).options.icon;
          i.setIcon(e);
        }
        if (i && i.setStyle && this.options.pointToLayer) {
          var a = this.options.pointToLayer(
            s,
            m.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])
          ).options;
          this.setFeatureStyle(s.id, a);
        }
        i && i.setStyle && this.options.style && this.resetStyle(s.id);
      }
    });
  (t.VERSION = "2.3.3"),
    (t.Support = r),
    (t.options = e),
    (t.Util = D),
    (t.get = p),
    (t.post = a),
    (t.request = u),
    (t.Task = U),
    (t.task = function(t) {
      return (t = T(t)), new U(t);
    }),
    (t.Query = B),
    (t.query = Z),
    (t.Find = W),
    (t.find = J),
    (t.Identify = Q),
    (t.identify = function(t) {
      return new Q(t);
    }),
    (t.IdentifyFeatures = H),
    (t.identifyFeatures = V),
    (t.IdentifyImage = X),
    (t.identifyImage = K),
    (t.Service = Y),
    (t.service = function(t) {
      return (t = T(t)), new Y(t);
    }),
    (t.MapService = $),
    (t.mapService = tt),
    (t.ImageService = it),
    (t.imageService = st),
    (t.FeatureLayerService = et),
    (t.featureLayerService = at),
    (t.BasemapLayer = ot),
    (t.basemapLayer = function(t, i) {
      return new ot(t, i);
    }),
    (t.TiledMapLayer = ht),
    (t.tiledMapLayer = function(t, i) {
      return new ht(t, i);
    }),
    (t.RasterLayer = ut),
    (t.ImageMapLayer = ct),
    (t.imageMapLayer = function(t, i) {
      return new ct(t, i);
    }),
    (t.DynamicMapLayer = mt),
    (t.dynamicMapLayer = function(t, i) {
      return new mt(t, i);
    }),
    (t.FeatureManager = dt),
    (t.FeatureLayer = _t),
    (t.featureLayer = function(t) {
      return new _t(t);
    }),
    Object.defineProperty(t, "__esModule", { value: !0 });
}),
  (function(t) {
    if ("object" == typeof exports) module.exports = t();
    else if ("function" == typeof define && define.amd) define(t);
    else {
      var i;
      "undefined" != typeof window
        ? (i = window)
        : "undefined" != typeof global
        ? (i = global)
        : "undefined" != typeof self && (i = self),
        (i.proj4 = t());
    }
  })(function() {
    return (function a(n, o, r) {
      function h(s, t) {
        if (!o[s]) {
          if (!n[s]) {
            var i = "function" == typeof require && require;
            if (!t && i) return i(s, !0);
            if (l) return l(s, !0);
            throw new Error("Cannot find module '" + s + "'");
          }
          var e = (o[s] = { exports: {} });
          n[s][0].call(
            e.exports,
            function(t) {
              var i = n[s][1][t];
              return h(i || t);
            },
            e,
            e.exports,
            a,
            n,
            o,
            r
          );
        }
        return o[s].exports;
      }
      for (
        var l = "function" == typeof require && require, t = 0;
        t < r.length;
        t++
      )
        h(r[t]);
      return h;
    })(
      {
        1: [
          function(t, i, s) {
            function a(t, i, s) {
              if (!(this instanceof a)) return new a(t, i, s);
              if (Array.isArray(t))
                (this.x = t[0]), (this.y = t[1]), (this.z = t[2] || 0);
              else if ("object" == typeof t)
                (this.x = t.x), (this.y = t.y), (this.z = t.z || 0);
              else if ("string" == typeof t && void 0 === i) {
                var e = t.split(",");
                (this.x = parseFloat(e[0], 10)),
                  (this.y = parseFloat(e[1], 10)),
                  (this.z = parseFloat(e[2], 10) || 0);
              } else (this.x = t), (this.y = i), (this.z = s || 0);
              console.warn(
                "proj4.Point will be removed in version 3, use proj4.toPoint"
              );
            }
            var e = t("mgrs");
            (a.fromMGRS = function(t) {
              return new a(e.toPoint(t));
            }),
              (a.prototype.toMGRS = function(t) {
                return e.forward([this.x, this.y], t);
              }),
              (i.exports = a);
          },
          { mgrs: 67 }
        ],
        2: [
          function(t, i, s) {
            function n(t, i) {
              if (!(this instanceof n)) return new n(t);
              i =
                i ||
                function(t) {
                  if (t) throw t;
                };
              var s = o(t);
              if ("object" == typeof s) {
                var e = h(s),
                  a = n.projections.get(e.projName);
                a ? (r(this, e), r(this, a), this.init(), i(null, this)) : i(t);
              } else i(t);
            }
            var o = t("./parseCode"),
              r = t("./extend"),
              e = t("./projections"),
              h = t("./deriveConstants");
            (n.projections = e).start(), (i.exports = n);
          },
          {
            "./deriveConstants": 33,
            "./extend": 34,
            "./parseCode": 37,
            "./projections": 39
          }
        ],
        3: [
          function(t, i, s) {
            i.exports = function(t, i, s) {
              var e,
                a,
                n,
                o = s.x,
                r = s.y,
                h = s.z || 0;
              for (n = 0; n < 3; n++)
                if (!i || 2 !== n || void 0 !== s.z)
                  switch (
                    ((a =
                      0 === n
                        ? ((e = o), "x")
                        : 1 === n
                        ? ((e = r), "y")
                        : ((e = h), "z")),
                    t.axis[n])
                  ) {
                    case "e":
                      s[a] = e;
                      break;
                    case "w":
                      s[a] = -e;
                      break;
                    case "n":
                      s[a] = e;
                      break;
                    case "s":
                      s[a] = -e;
                      break;
                    case "u":
                      void 0 !== s[a] && (s.z = e);
                      break;
                    case "d":
                      void 0 !== s[a] && (s.z = -e);
                      break;
                    default:
                      return null;
                  }
              return s;
            };
          },
          {}
        ],
        4: [
          function(t, i, s) {
            var e = Math.PI / 2,
              a = t("./sign");
            i.exports = function(t) {
              return Math.abs(t) < e ? t : t - a(t) * Math.PI;
            };
          },
          { "./sign": 21 }
        ],
        5: [
          function(t, i, s) {
            var e = 2 * Math.PI,
              a = t("./sign");
            i.exports = function(t) {
              return Math.abs(t) <= 3.14159265359 ? t : t - a(t) * e;
            };
          },
          { "./sign": 21 }
        ],
        6: [
          function(t, i, s) {
            i.exports = function(t) {
              return 1 < Math.abs(t) && (t = 1 < t ? 1 : -1), Math.asin(t);
            };
          },
          {}
        ],
        7: [
          function(t, i, s) {
            i.exports = function(t) {
              return 1 - 0.25 * t * (1 + (t / 16) * (3 + 1.25 * t));
            };
          },
          {}
        ],
        8: [
          function(t, i, s) {
            i.exports = function(t) {
              return 0.375 * t * (1 + 0.25 * t * (1 + 0.46875 * t));
            };
          },
          {}
        ],
        9: [
          function(t, i, s) {
            i.exports = function(t) {
              return 0.05859375 * t * t * (1 + 0.75 * t);
            };
          },
          {}
        ],
        10: [
          function(t, i, s) {
            i.exports = function(t) {
              return t * t * t * (35 / 3072);
            };
          },
          {}
        ],
        11: [
          function(t, i, s) {
            i.exports = function(t, i, s) {
              var e = i * s;
              return t / Math.sqrt(1 - e * e);
            };
          },
          {}
        ],
        12: [
          function(t, i, s) {
            i.exports = function(t, i, s, e, a) {
              var n, o;
              n = t / i;
              for (var r = 0; r < 15; r++)
                if (
                  ((n += o =
                    (t -
                      (i * n -
                        s * Math.sin(2 * n) +
                        e * Math.sin(4 * n) -
                        a * Math.sin(6 * n))) /
                    (i -
                      2 * s * Math.cos(2 * n) +
                      4 * e * Math.cos(4 * n) -
                      6 * a * Math.cos(6 * n))),
                  Math.abs(o) <= 1e-10)
                )
                  return n;
              return NaN;
            };
          },
          {}
        ],
        13: [
          function(t, i, s) {
            var l = Math.PI / 2;
            i.exports = function(t, i) {
              var s = 1 - ((1 - t * t) / (2 * t)) * Math.log((1 - t) / (1 + t));
              if (Math.abs(Math.abs(i) - s) < 1e-6) return i < 0 ? -1 * l : l;
              for (var e, a, n, o, r = Math.asin(0.5 * i), h = 0; h < 30; h++)
                if (
                  ((a = Math.sin(r)),
                  (n = Math.cos(r)),
                  (o = t * a),
                  (r += e =
                    (Math.pow(1 - o * o, 2) / (2 * n)) *
                    (i / (1 - t * t) -
                      a / (1 - o * o) +
                      (0.5 / t) * Math.log((1 - o) / (1 + o)))),
                  Math.abs(e) <= 1e-10)
                )
                  return r;
              return NaN;
            };
          },
          {}
        ],
        14: [
          function(t, i, s) {
            i.exports = function(t, i, s, e, a) {
              return (
                t * a -
                i * Math.sin(2 * a) +
                s * Math.sin(4 * a) -
                e * Math.sin(6 * a)
              );
            };
          },
          {}
        ],
        15: [
          function(t, i, s) {
            i.exports = function(t, i, s) {
              var e = t * i;
              return s / Math.sqrt(1 - e * e);
            };
          },
          {}
        ],
        16: [
          function(t, i, s) {
            var r = Math.PI / 2;
            i.exports = function(t, i) {
              for (
                var s, e, a = 0.5 * t, n = r - 2 * Math.atan(i), o = 0;
                o <= 15;
                o++
              )
                if (
                  ((s = t * Math.sin(n)),
                  (n += e =
                    r - 2 * Math.atan(i * Math.pow((1 - s) / (1 + s), a)) - n),
                  Math.abs(e) <= 1e-10)
                )
                  return n;
              return -9999;
            };
          },
          {}
        ],
        17: [
          function(t, i, s) {
            var e = 0.01953125,
              a = 0.01068115234375;
            i.exports = function(t) {
              var i = [];
              (i[0] = 1 - t * (0.25 + t * (0.046875 + t * (e + t * a)))),
                (i[1] = t * (0.75 - t * (0.046875 + t * (e + t * a))));
              var s = t * t;
              return (
                (i[2] =
                  s *
                  (0.46875 -
                    t * (0.013020833333333334 + 0.007120768229166667 * t))),
                (s *= t),
                (i[3] = s * (0.3645833333333333 - 0.005696614583333333 * t)),
                (i[4] = s * t * 0.3076171875),
                i
              );
            };
          },
          {}
        ],
        18: [
          function(t, i, s) {
            var h = t("./pj_mlfn");
            i.exports = function(t, i, s) {
              for (var e = 1 / (1 - i), a = t, n = 20; n; --n) {
                var o = Math.sin(a),
                  r = 1 - i * o * o;
                if (
                  ((a -= r =
                    (h(a, o, Math.cos(a), s) - t) * (r * Math.sqrt(r)) * e),
                  Math.abs(r) < 1e-10)
                )
                  return a;
              }
              return a;
            };
          },
          { "./pj_mlfn": 19 }
        ],
        19: [
          function(t, i, s) {
            i.exports = function(t, i, s, e) {
              return (
                (s *= i),
                (i *= i),
                e[0] * t - s * (e[1] + i * (e[2] + i * (e[3] + i * e[4])))
              );
            };
          },
          {}
        ],
        20: [
          function(t, i, s) {
            i.exports = function(t, i) {
              var s;
              return 1e-7 < t
                ? (1 - t * t) *
                    (i / (1 - (s = t * i) * s) -
                      (0.5 / t) * Math.log((1 - s) / (1 + s)))
                : 2 * i;
            };
          },
          {}
        ],
        21: [
          function(t, i, s) {
            i.exports = function(t) {
              return t < 0 ? -1 : 1;
            };
          },
          {}
        ],
        22: [
          function(t, i, s) {
            i.exports = function(t, i) {
              return Math.pow((1 - t) / (1 + t), i);
            };
          },
          {}
        ],
        23: [
          function(t, i, s) {
            i.exports = function(t) {
              var i = { x: t[0], y: t[1] };
              return (
                2 < t.length && (i.z = t[2]), 3 < t.length && (i.m = t[3]), i
              );
            };
          },
          {}
        ],
        24: [
          function(t, i, s) {
            var n = Math.PI / 2;
            i.exports = function(t, i, s) {
              var e = t * s,
                a = 0.5 * t;
              return (
                (e = Math.pow((1 - e) / (1 + e), a)),
                Math.tan(0.5 * (n - i)) / e
              );
            };
          },
          {}
        ],
        25: [
          function(t, i, s) {
            (s.wgs84 = {
              towgs84: "0,0,0",
              ellipse: "WGS84",
              datumName: "WGS84"
            }),
              (s.ch1903 = {
                towgs84: "674.374,15.056,405.346",
                ellipse: "bessel",
                datumName: "swiss"
              }),
              (s.ggrs87 = {
                towgs84: "-199.87,74.79,246.62",
                ellipse: "GRS80",
                datumName: "Greek_Geodetic_Reference_System_1987"
              }),
              (s.nad83 = {
                towgs84: "0,0,0",
                ellipse: "GRS80",
                datumName: "North_American_Datum_1983"
              }),
              (s.nad27 = {
                nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
                ellipse: "clrk66",
                datumName: "North_American_Datum_1927"
              }),
              (s.potsdam = {
                towgs84: "606.0,23.0,413.0",
                ellipse: "bessel",
                datumName: "Potsdam Rauenberg 1950 DHDN"
              }),
              (s.carthage = {
                towgs84: "-263.0,6.0,431.0",
                ellipse: "clark80",
                datumName: "Carthage 1934 Tunisia"
              }),
              (s.hermannskogel = {
                towgs84: "653.0,-212.0,449.0",
                ellipse: "bessel",
                datumName: "Hermannskogel"
              }),
              (s.ire65 = {
                towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
                ellipse: "mod_airy",
                datumName: "Ireland 1965"
              }),
              (s.rassadiran = {
                towgs84: "-133.63,-157.5,-158.62",
                ellipse: "intl",
                datumName: "Rassadiran"
              }),
              (s.nzgd49 = {
                towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
                ellipse: "intl",
                datumName: "New Zealand Geodetic Datum 1949"
              }),
              (s.osgb36 = {
                towgs84:
                  "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
                ellipse: "airy",
                datumName: "Airy 1830"
              }),
              (s.s_jtsk = {
                towgs84: "589,76,480",
                ellipse: "bessel",
                datumName: "S-JTSK (Ferro)"
              }),
              (s.beduaram = {
                towgs84: "-106,-87,188",
                ellipse: "clrk80",
                datumName: "Beduaram"
              }),
              (s.gunung_segara = {
                towgs84: "-403,684,41",
                ellipse: "bessel",
                datumName: "Gunung Segara Jakarta"
              }),
              (s.rnb72 = {
                towgs84:
                  "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
                ellipse: "intl",
                datumName: "Reseau National Belge 1972"
              });
          },
          {}
        ],
        26: [
          function(t, i, s) {
            (s.MERIT = { a: 6378137, rf: 298.257, ellipseName: "MERIT 1983" }),
              (s.SGS85 = {
                a: 6378136,
                rf: 298.257,
                ellipseName: "Soviet Geodetic System 85"
              }),
              (s.GRS80 = {
                a: 6378137,
                rf: 298.257222101,
                ellipseName: "GRS 1980(IUGG, 1980)"
              }),
              (s.IAU76 = { a: 6378140, rf: 298.257, ellipseName: "IAU 1976" }),
              (s.airy = {
                a: 6377563.396,
                b: 6356256.91,
                ellipseName: "Airy 1830"
              }),
              (s.APL4 = {
                a: 6378137,
                rf: 298.25,
                ellipseName: "Appl. Physics. 1965"
              }),
              (s.NWL9D = {
                a: 6378145,
                rf: 298.25,
                ellipseName: "Naval Weapons Lab., 1965"
              }),
              (s.mod_airy = {
                a: 6377340.189,
                b: 6356034.446,
                ellipseName: "Modified Airy"
              }),
              (s.andrae = {
                a: 6377104.43,
                rf: 300,
                ellipseName: "Andrae 1876 (Den., Iclnd.)"
              }),
              (s.aust_SA = {
                a: 6378160,
                rf: 298.25,
                ellipseName: "Australian Natl & S. Amer. 1969"
              }),
              (s.GRS67 = {
                a: 6378160,
                rf: 298.247167427,
                ellipseName: "GRS 67(IUGG 1967)"
              }),
              (s.bessel = {
                a: 6377397.155,
                rf: 299.1528128,
                ellipseName: "Bessel 1841"
              }),
              (s.bess_nam = {
                a: 6377483.865,
                rf: 299.1528128,
                ellipseName: "Bessel 1841 (Namibia)"
              }),
              (s.clrk66 = {
                a: 6378206.4,
                b: 6356583.8,
                ellipseName: "Clarke 1866"
              }),
              (s.clrk80 = {
                a: 6378249.145,
                rf: 293.4663,
                ellipseName: "Clarke 1880 mod."
              }),
              (s.clrk58 = {
                a: 6378293.645208759,
                rf: 294.2606763692654,
                ellipseName: "Clarke 1858"
              }),
              (s.CPM = {
                a: 6375738.7,
                rf: 334.29,
                ellipseName: "Comm. des Poids et Mesures 1799"
              }),
              (s.delmbr = {
                a: 6376428,
                rf: 311.5,
                ellipseName: "Delambre 1810 (Belgium)"
              }),
              (s.engelis = {
                a: 6378136.05,
                rf: 298.2566,
                ellipseName: "Engelis 1985"
              }),
              (s.evrst30 = {
                a: 6377276.345,
                rf: 300.8017,
                ellipseName: "Everest 1830"
              }),
              (s.evrst48 = {
                a: 6377304.063,
                rf: 300.8017,
                ellipseName: "Everest 1948"
              }),
              (s.evrst56 = {
                a: 6377301.243,
                rf: 300.8017,
                ellipseName: "Everest 1956"
              }),
              (s.evrst69 = {
                a: 6377295.664,
                rf: 300.8017,
                ellipseName: "Everest 1969"
              }),
              (s.evrstSS = {
                a: 6377298.556,
                rf: 300.8017,
                ellipseName: "Everest (Sabah & Sarawak)"
              }),
              (s.fschr60 = {
                a: 6378166,
                rf: 298.3,
                ellipseName: "Fischer (Mercury Datum) 1960"
              }),
              (s.fschr60m = {
                a: 6378155,
                rf: 298.3,
                ellipseName: "Fischer 1960"
              }),
              (s.fschr68 = {
                a: 6378150,
                rf: 298.3,
                ellipseName: "Fischer 1968"
              }),
              (s.helmert = {
                a: 6378200,
                rf: 298.3,
                ellipseName: "Helmert 1906"
              }),
              (s.hough = { a: 6378270, rf: 297, ellipseName: "Hough" }),
              (s.intl = {
                a: 6378388,
                rf: 297,
                ellipseName: "International 1909 (Hayford)"
              }),
              (s.kaula = { a: 6378163, rf: 298.24, ellipseName: "Kaula 1961" }),
              (s.lerch = {
                a: 6378139,
                rf: 298.257,
                ellipseName: "Lerch 1979"
              }),
              (s.mprts = {
                a: 6397300,
                rf: 191,
                ellipseName: "Maupertius 1738"
              }),
              (s.new_intl = {
                a: 6378157.5,
                b: 6356772.2,
                ellipseName: "New International 1967"
              }),
              (s.plessis = {
                a: 6376523,
                rf: 6355863,
                ellipseName: "Plessis 1817 (France)"
              }),
              (s.krass = {
                a: 6378245,
                rf: 298.3,
                ellipseName: "Krassovsky, 1942"
              }),
              (s.SEasia = {
                a: 6378155,
                b: 6356773.3205,
                ellipseName: "Southeast Asia"
              }),
              (s.walbeck = {
                a: 6376896,
                b: 6355834.8467,
                ellipseName: "Walbeck"
              }),
              (s.WGS60 = { a: 6378165, rf: 298.3, ellipseName: "WGS 60" }),
              (s.WGS66 = { a: 6378145, rf: 298.25, ellipseName: "WGS 66" }),
              (s.WGS7 = { a: 6378135, rf: 298.26, ellipseName: "WGS 72" }),
              (s.WGS84 = {
                a: 6378137,
                rf: 298.257223563,
                ellipseName: "WGS 84"
              }),
              (s.sphere = {
                a: 6370997,
                b: 6370997,
                ellipseName: "Normal Sphere (r=6370997)"
              });
          },
          {}
        ],
        27: [
          function(t, i, s) {
            (s.greenwich = 0),
              (s.lisbon = -9.131906111111),
              (s.paris = 2.337229166667),
              (s.bogota = -74.080916666667),
              (s.madrid = -3.687938888889),
              (s.rome = 12.452333333333),
              (s.bern = 7.439583333333),
              (s.jakarta = 106.807719444444),
              (s.ferro = -17.666666666667),
              (s.brussels = 4.367975),
              (s.stockholm = 18.058277777778),
              (s.athens = 23.7163375),
              (s.oslo = 10.722916666667);
          },
          {}
        ],
        28: [
          function(t, i, s) {
            (s.ft = { to_meter: 0.3048 }),
              (s["us-ft"] = { to_meter: 1200 / 3937 });
          },
          {}
        ],
        29: [
          function(t, i, s) {
            function n(t, i, s) {
              var e;
              return Array.isArray(s)
                ? ((e = a(t, i, s)),
                  3 === s.length ? [e.x, e.y, e.z] : [e.x, e.y])
                : a(t, i, s);
            }
            function o(t) {
              return t instanceof e ? t : t.oProj ? t.oProj : e(t);
            }
            var e = t("./Proj"),
              a = t("./transform"),
              r = e("WGS84");
            i.exports = function(i, s, t) {
              i = o(i);
              var e,
                a = !1;
              return (
                void 0 === s
                  ? ((s = i), (i = r), (a = !0))
                  : (void 0 === s.x && !Array.isArray(s)) ||
                    ((t = s), (s = i), (i = r), (a = !0)),
                (s = o(s)),
                t
                  ? n(i, s, t)
                  : ((e = {
                      forward: function(t) {
                        return n(i, s, t);
                      },
                      inverse: function(t) {
                        return n(s, i, t);
                      }
                    }),
                    a && (e.oProj = s),
                    e)
              );
            };
          },
          { "./Proj": 2, "./transform": 65 }
        ],
        30: [
          function(t, i, s) {
            var b = Math.PI / 2,
              e = 484813681109536e-20,
              x = 0.3826834323650898,
              a = function(t) {
                return this instanceof a
                  ? ((this.datum_type = 4),
                    void (
                      t &&
                      (t.datumCode &&
                        "none" === t.datumCode &&
                        (this.datum_type = 5),
                      t.datum_params &&
                        ((this.datum_params = t.datum_params.map(parseFloat)),
                        (0 === this.datum_params[0] &&
                          0 === this.datum_params[1] &&
                          0 === this.datum_params[2]) ||
                          (this.datum_type = 1),
                        3 < this.datum_params.length &&
                          (0 !== this.datum_params[3] ||
                            0 !== this.datum_params[4] ||
                            0 !== this.datum_params[5] ||
                            0 !== this.datum_params[6]) &&
                          ((this.datum_type = 2),
                          (this.datum_params[3] *= e),
                          (this.datum_params[4] *= e),
                          (this.datum_params[5] *= e),
                          (this.datum_params[6] =
                            this.datum_params[6] / 1e6 + 1))),
                      (this.datum_type = t.grids ? 3 : this.datum_type),
                      (this.a = t.a),
                      (this.b = t.b),
                      (this.es = t.es),
                      (this.ep2 = t.ep2),
                      3 === this.datum_type && (this.grids = t.grids))
                    ))
                  : new a(t);
              };
            (a.prototype = {
              compare_datums: function(t) {
                return (
                  this.datum_type === t.datum_type &&
                  !(this.a !== t.a || 5e-11 < Math.abs(this.es - t.es)) &&
                    (1 === this.datum_type
                      ? this.datum_params[0] === t.datum_params[0] &&
                        this.datum_params[1] === t.datum_params[1] &&
                        this.datum_params[2] === t.datum_params[2]
                      : 2 === this.datum_type
                      ? this.datum_params[0] === t.datum_params[0] &&
                        this.datum_params[1] === t.datum_params[1] &&
                        this.datum_params[2] === t.datum_params[2] &&
                        this.datum_params[3] === t.datum_params[3] &&
                        this.datum_params[4] === t.datum_params[4] &&
                        this.datum_params[5] === t.datum_params[5] &&
                        this.datum_params[6] === t.datum_params[6]
                      : (3 !== this.datum_type && 3 !== t.datum_type) ||
                        this.nadgrids === t.nadgrids)
                );
              },
              geodetic_to_geocentric: function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h = t.x,
                  l = t.y,
                  u = t.z ? t.z : 0;
                if (l < -b && -1.001 * b < l) l = -b;
                else if (b < l && l < 1.001 * b) l = b;
                else if (l < -b || b < l) return null;
                return (
                  h > Math.PI && (h -= 2 * Math.PI),
                  (n = Math.sin(l)),
                  (r = Math.cos(l)),
                  (o = n * n),
                  (i =
                    ((a = this.a / Math.sqrt(1 - this.es * o)) + u) *
                    r *
                    Math.cos(h)),
                  (s = (a + u) * r * Math.sin(h)),
                  (e = (a * (1 - this.es) + u) * n),
                  (t.x = i),
                  (t.y = s),
                  (t.z = e),
                  0
                );
              },
              geocentric_to_geodetic: function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h,
                  l,
                  u,
                  c,
                  m,
                  p,
                  f,
                  d,
                  _,
                  y = 1e-12,
                  g = t.x,
                  M = t.y,
                  v = t.z ? t.z : 0;
                if (
                  ((i = Math.sqrt(g * g + M * M)),
                  (s = Math.sqrt(g * g + M * M + v * v)),
                  i / this.a < y)
                ) {
                  if (((f = 0), s / this.a < y)) return (d = b), void this.b;
                } else f = Math.atan2(M, g);
                for (
                  e = v / s,
                    a = i / s,
                    n = 1 / Math.sqrt(1 - this.es * (2 - this.es) * a * a),
                    h = a * (1 - this.es) * n,
                    l = e * n,
                    p = 0;
                  p++,
                    (_ =
                      i * h +
                      v * l -
                      (r = this.a / Math.sqrt(1 - this.es * l * l)) *
                        (1 - this.es * l * l)),
                    (o = (this.es * r) / (r + _)),
                    (m =
                      (c = e * (n = 1 / Math.sqrt(1 - o * (2 - o) * a * a))) *
                        h -
                      (u = a * (1 - o) * n) * l),
                    (h = u),
                    (l = c),
                    1e-24 < m * m && p < 30;

                );
                return (
                  (d = Math.atan(c / Math.abs(u))),
                  (t.x = f),
                  (t.y = d),
                  (t.z = _),
                  t
                );
              },
              geocentric_to_geodetic_noniter: function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h,
                  l,
                  u,
                  c,
                  m,
                  p,
                  f,
                  d,
                  _,
                  y,
                  g = t.x,
                  M = t.y,
                  v = t.z ? t.z : 0;
                if (
                  ((g = parseFloat(g)),
                  (M = parseFloat(M)),
                  (v = parseFloat(v)),
                  (y = !1),
                  0 !== g)
                )
                  i = Math.atan2(M, g);
                else if (0 < M) i = b;
                else if (M < 0) i = -b;
                else if (((y = !0), (i = 0) < v)) s = b;
                else {
                  if (!(v < 0)) return (s = b), void this.b;
                  s = -b;
                }
                return (
                  (n = g * g + M * M),
                  (o = 1.0026 * v),
                  (m = (a = Math.sqrt(n)) / (h = Math.sqrt(o * o + n))),
                  (c = (u = o / h) * u * u),
                  (r = v + this.b * this.ep2 * c),
                  (_ = a - this.a * this.es * m * m * m),
                  (p = r / (l = Math.sqrt(r * r + _ * _))),
                  (f = _ / l),
                  (d = this.a / Math.sqrt(1 - this.es * p * p)),
                  (e =
                    x <= f
                      ? a / f - d
                      : f <= -x
                      ? a / -f - d
                      : v / p + d * (this.es - 1)),
                  !1 === y && (s = Math.atan(p / f)),
                  (t.x = i),
                  (t.y = s),
                  (t.z = e),
                  t
                );
              },
              geocentric_to_wgs84: function(t) {
                if (1 === this.datum_type)
                  (t.x += this.datum_params[0]),
                    (t.y += this.datum_params[1]),
                    (t.z += this.datum_params[2]);
                else if (2 === this.datum_type) {
                  var i = this.datum_params[0],
                    s = this.datum_params[1],
                    e = this.datum_params[2],
                    a = this.datum_params[3],
                    n = this.datum_params[4],
                    o = this.datum_params[5],
                    r = this.datum_params[6],
                    h = r * (t.x - o * t.y + n * t.z) + i,
                    l = r * (o * t.x + t.y - a * t.z) + s,
                    u = r * (-n * t.x + a * t.y + t.z) + e;
                  (t.x = h), (t.y = l), (t.z = u);
                }
              },
              geocentric_from_wgs84: function(t) {
                if (1 === this.datum_type)
                  (t.x -= this.datum_params[0]),
                    (t.y -= this.datum_params[1]),
                    (t.z -= this.datum_params[2]);
                else if (2 === this.datum_type) {
                  var i = this.datum_params[0],
                    s = this.datum_params[1],
                    e = this.datum_params[2],
                    a = this.datum_params[3],
                    n = this.datum_params[4],
                    o = this.datum_params[5],
                    r = this.datum_params[6],
                    h = (t.x - i) / r,
                    l = (t.y - s) / r,
                    u = (t.z - e) / r;
                  (t.x = h + o * l - n * u),
                    (t.y = -o * h + l + a * u),
                    (t.z = n * h - a * l + u);
                }
              }
            }),
              (i.exports = a);
          },
          {}
        ],
        31: [
          function(t, i, s) {
            var m = 0.006694379990141316;
            i.exports = function(t, i, s) {
              function e(t) {
                return 1 === t || 2 === t;
              }
              var a, n, o;
              if (t.compare_datums(i)) return s;
              if (5 === t.datum_type || 5 === i.datum_type) return s;
              var r = t.a,
                h = t.es,
                l = i.a,
                u = i.es,
                c = t.datum_type;
              if (3 === c)
                if (0 === this.apply_gridshift(t, 0, s))
                  (t.a = 6378137), (t.es = m);
                else {
                  if (!t.datum_params) return (t.a = r), (t.es = t.es), s;
                  for (a = 1, n = 0, o = t.datum_params.length; n < o; n++)
                    a *= t.datum_params[n];
                  if (0 === a) return (t.a = r), (t.es = t.es), s;
                  c = 3 < t.datum_params.length ? 2 : 1;
                }
              return (
                3 === i.datum_type && ((i.a = 6378137), (i.es = m)),
                (t.es !== i.es || t.a !== i.a || e(c) || e(i.datum_type)) &&
                  (t.geodetic_to_geocentric(s),
                  e(t.datum_type) && t.geocentric_to_wgs84(s),
                  e(i.datum_type) && i.geocentric_from_wgs84(s),
                  i.geocentric_to_geodetic(s)),
                3 === i.datum_type && this.apply_gridshift(i, 1, s),
                (t.a = r),
                (t.es = h),
                (i.a = l),
                (i.es = u),
                s
              );
            };
          },
          {}
        ],
        32: [
          function(t, i, s) {
            function e(t) {
              var i = this;
              if (2 === arguments.length) {
                var s = arguments[1];
                "string" == typeof s
                  ? "+" === s.charAt(0)
                    ? (e[t] = n(arguments[1]))
                    : (e[t] = o(arguments[1]))
                  : (e[t] = s);
              } else if (1 === arguments.length) {
                if (Array.isArray(t))
                  return t.map(function(t) {
                    Array.isArray(t) ? e.apply(i, t) : e(t);
                  });
                if ("string" == typeof t) {
                  if (t in e) return e[t];
                } else
                  "EPSG" in t
                    ? (e["EPSG:" + t.EPSG] = t)
                    : "ESRI" in t
                    ? (e["ESRI:" + t.ESRI] = t)
                    : "IAU2000" in t
                    ? (e["IAU2000:" + t.IAU2000] = t)
                    : console.log(t);
                return;
              }
            }
            var a = t("./global"),
              n = t("./projString"),
              o = t("./wkt");
            a(e), (i.exports = e);
          },
          { "./global": 35, "./projString": 38, "./wkt": 66 }
        ],
        33: [
          function(t, i, s) {
            var e = t("./constants/Datum"),
              a = t("./constants/Ellipsoid"),
              n = t("./extend"),
              o = t("./datum");
            i.exports = function(t) {
              if (t.datumCode && "none" !== t.datumCode) {
                var i = e[t.datumCode];
                i &&
                  ((t.datum_params = i.towgs84 ? i.towgs84.split(",") : null),
                  (t.ellps = i.ellipse),
                  (t.datumName = i.datumName ? i.datumName : t.datumCode));
              }
              if (!t.a) {
                var s = a[t.ellps] ? a[t.ellps] : a.WGS84;
                n(t, s);
              }
              return (
                t.rf && !t.b && (t.b = (1 - 1 / t.rf) * t.a),
                (0 === t.rf || Math.abs(t.a - t.b) < 1e-10) &&
                  ((t.sphere = !0), (t.b = t.a)),
                (t.a2 = t.a * t.a),
                (t.b2 = t.b * t.b),
                (t.es = (t.a2 - t.b2) / t.a2),
                (t.e = Math.sqrt(t.es)),
                t.R_A &&
                  ((t.a *=
                    1 -
                    t.es *
                      (0.16666666666666666 +
                        t.es *
                          (0.04722222222222222 + 0.022156084656084655 * t.es))),
                  (t.a2 = t.a * t.a),
                  (t.b2 = t.b * t.b),
                  (t.es = 0)),
                (t.ep2 = (t.a2 - t.b2) / t.b2),
                t.k0 || (t.k0 = 1),
                t.axis || (t.axis = "enu"),
                t.datum || (t.datum = o(t)),
                t
              );
            };
          },
          {
            "./constants/Datum": 25,
            "./constants/Ellipsoid": 26,
            "./datum": 30,
            "./extend": 34
          }
        ],
        34: [
          function(t, i, s) {
            i.exports = function(t, i) {
              var s, e;
              if (((t = t || {}), !i)) return t;
              for (e in i) void 0 !== (s = i[e]) && (t[e] = s);
              return t;
            };
          },
          {}
        ],
        35: [
          function(t, i, s) {
            i.exports = function(t) {
              t(
                "EPSG:4326",
                "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
              ),
                t(
                  "EPSG:4269",
                  "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"
                ),
                t(
                  "EPSG:3857",
                  "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
                ),
                (t.WGS84 = t["EPSG:4326"]),
                (t["EPSG:3785"] = t["EPSG:3857"]),
                (t.GOOGLE = t["EPSG:3857"]),
                (t["EPSG:900913"] = t["EPSG:3857"]),
                (t["EPSG:102113"] = t["EPSG:3857"]);
            };
          },
          {}
        ],
        36: [
          function(t, i, s) {
            var e = t("./core");
            (e.defaultDatum = "WGS84"),
              (e.Proj = t("./Proj")),
              (e.WGS84 = new e.Proj("WGS84")),
              (e.Point = t("./Point")),
              (e.toPoint = t("./common/toPoint")),
              (e.defs = t("./defs")),
              (e.transform = t("./transform")),
              (e.mgrs = t("mgrs")),
              (e.version = t("../package.json").version),
              t("./includedProjections")(e),
              (i.exports = e);
          },
          {
            "../package.json": 68,
            "./Point": 1,
            "./Proj": 2,
            "./common/toPoint": 23,
            "./core": 29,
            "./defs": 32,
            "./includedProjections": "hTEDpn",
            "./transform": 65,
            mgrs: 67
          }
        ],
        37: [
          function(t, i, s) {
            var e = t("./defs"),
              a = t("./wkt"),
              n = t("./projString");
            i.exports = function(t) {
              return "string" == typeof t
                ? t in e
                  ? e[t]
                  : ((s = t),
                    ["GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS"].reduce(function(
                      t,
                      i
                    ) {
                      return t + 1 + s.indexOf(i);
                    },
                    0)
                      ? a(t)
                      : "+" === t[0]
                      ? n(t)
                      : void 0)
                : t;
              var s;
            };
          },
          { "./defs": 32, "./projString": 38, "./wkt": 66 }
        ],
        38: [
          function(t, i, s) {
            var r = 0.017453292519943295,
              h = t("./constants/PrimeMeridian"),
              l = t("./constants/units");
            i.exports = function(t) {
              var s = {},
                e = {};
              t.split("+")
                .map(function(t) {
                  return t.trim();
                })
                .filter(function(t) {
                  return t;
                })
                .forEach(function(t) {
                  var i = t.split("=");
                  i.push(!0), (e[i[0].toLowerCase()] = i[1]);
                });
              var i,
                a,
                n,
                o = {
                  proj: "projName",
                  datum: "datumCode",
                  rf: function(t) {
                    s.rf = parseFloat(t);
                  },
                  lat_0: function(t) {
                    s.lat0 = t * r;
                  },
                  lat_1: function(t) {
                    s.lat1 = t * r;
                  },
                  lat_2: function(t) {
                    s.lat2 = t * r;
                  },
                  lat_ts: function(t) {
                    s.lat_ts = t * r;
                  },
                  lon_0: function(t) {
                    s.long0 = t * r;
                  },
                  lon_1: function(t) {
                    s.long1 = t * r;
                  },
                  lon_2: function(t) {
                    s.long2 = t * r;
                  },
                  alpha: function(t) {
                    s.alpha = parseFloat(t) * r;
                  },
                  lonc: function(t) {
                    s.longc = t * r;
                  },
                  x_0: function(t) {
                    s.x0 = parseFloat(t);
                  },
                  y_0: function(t) {
                    s.y0 = parseFloat(t);
                  },
                  k_0: function(t) {
                    s.k0 = parseFloat(t);
                  },
                  k: function(t) {
                    s.k0 = parseFloat(t);
                  },
                  a: function(t) {
                    s.a = parseFloat(t);
                  },
                  b: function(t) {
                    s.b = parseFloat(t);
                  },
                  r_a: function() {
                    s.R_A = !0;
                  },
                  zone: function(t) {
                    s.zone = parseInt(t, 10);
                  },
                  south: function() {
                    s.utmSouth = !0;
                  },
                  towgs84: function(t) {
                    s.datum_params = t.split(",").map(function(t) {
                      return parseFloat(t);
                    });
                  },
                  to_meter: function(t) {
                    s.to_meter = parseFloat(t);
                  },
                  units: function(t) {
                    (s.units = t), l[t] && (s.to_meter = l[t].to_meter);
                  },
                  from_greenwich: function(t) {
                    s.from_greenwich = t * r;
                  },
                  pm: function(t) {
                    s.from_greenwich = (h[t] ? h[t] : parseFloat(t)) * r;
                  },
                  nadgrids: function(t) {
                    "@null" === t ? (s.datumCode = "none") : (s.nadgrids = t);
                  },
                  axis: function(t) {
                    var i = "ewnsud";
                    3 === t.length &&
                      -1 !== i.indexOf(t.substr(0, 1)) &&
                      -1 !== i.indexOf(t.substr(1, 1)) &&
                      -1 !== i.indexOf(t.substr(2, 1)) &&
                      (s.axis = t);
                  }
                };
              for (i in e)
                (a = e[i]),
                  i in o
                    ? "function" == typeof (n = o[i])
                      ? n(a)
                      : (s[n] = a)
                    : (s[i] = a);
              return (
                "string" == typeof s.datumCode &&
                  "WGS84" !== s.datumCode &&
                  (s.datumCode = s.datumCode.toLowerCase()),
                s
              );
            };
          },
          { "./constants/PrimeMeridian": 27, "./constants/units": 28 }
        ],
        39: [
          function(t, i, s) {
            function e(t, i) {
              var s = o.length;
              return t.names
                ? ((o[s] = t).names.forEach(function(t) {
                    n[t.toLowerCase()] = s;
                  }),
                  this)
                : (console.log(i), !0);
            }
            var a = [t("./projections/merc"), t("./projections/longlat")],
              n = {},
              o = [];
            (s.add = e),
              (s.get = function(t) {
                if (!t) return !1;
                var i = t.toLowerCase();
                return void 0 !== n[i] && o[n[i]] ? o[n[i]] : void 0;
              }),
              (s.start = function() {
                a.forEach(e);
              });
          },
          { "./projections/longlat": 51, "./projections/merc": 52 }
        ],
        40: [
          function(t, i, s) {
            var e = t("../common/msfnz"),
              h = t("../common/qsfnz"),
              l = t("../common/adjust_lon"),
              u = t("../common/asinz");
            (s.init = function() {
              Math.abs(this.lat1 + this.lat2) < 1e-10 ||
                ((this.temp = this.b / this.a),
                (this.es = 1 - Math.pow(this.temp, 2)),
                (this.e3 = Math.sqrt(this.es)),
                (this.sin_po = Math.sin(this.lat1)),
                (this.cos_po = Math.cos(this.lat1)),
                (this.t1 = this.sin_po),
                (this.con = this.sin_po),
                (this.ms1 = e(this.e3, this.sin_po, this.cos_po)),
                (this.qs1 = h(this.e3, this.sin_po, this.cos_po)),
                (this.sin_po = Math.sin(this.lat2)),
                (this.cos_po = Math.cos(this.lat2)),
                (this.t2 = this.sin_po),
                (this.ms2 = e(this.e3, this.sin_po, this.cos_po)),
                (this.qs2 = h(this.e3, this.sin_po, this.cos_po)),
                (this.sin_po = Math.sin(this.lat0)),
                (this.cos_po = Math.cos(this.lat0)),
                (this.t3 = this.sin_po),
                (this.qs0 = h(this.e3, this.sin_po, this.cos_po)),
                1e-10 < Math.abs(this.lat1 - this.lat2)
                  ? (this.ns0 =
                      (this.ms1 * this.ms1 - this.ms2 * this.ms2) /
                      (this.qs2 - this.qs1))
                  : (this.ns0 = this.con),
                (this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1),
                (this.rh =
                  (this.a * Math.sqrt(this.c - this.ns0 * this.qs0)) /
                  this.ns0));
            }),
              (s.forward = function(t) {
                var i = t.x,
                  s = t.y;
                (this.sin_phi = Math.sin(s)), (this.cos_phi = Math.cos(s));
                var e = h(this.e3, this.sin_phi, this.cos_phi),
                  a = (this.a * Math.sqrt(this.c - this.ns0 * e)) / this.ns0,
                  n = this.ns0 * l(i - this.long0),
                  o = a * Math.sin(n) + this.x0,
                  r = this.rh - a * Math.cos(n) + this.y0;
                return (t.x = o), (t.y = r), t;
              }),
              (s.inverse = function(t) {
                var i, s, e, a, n, o;
                return (
                  (t.x -= this.x0),
                  (t.y = this.rh - t.y + this.y0),
                  (e =
                    0 <= this.ns0
                      ? ((i = Math.sqrt(t.x * t.x + t.y * t.y)), 1)
                      : ((i = -Math.sqrt(t.x * t.x + t.y * t.y)), -1)),
                  (a = 0) !== i && (a = Math.atan2(e * t.x, e * t.y)),
                  (e = (i * this.ns0) / this.a),
                  (o = this.sphere
                    ? Math.asin((this.c - e * e) / (2 * this.ns0))
                    : ((s = (this.c - e * e) / this.ns0),
                      this.phi1z(this.e3, s))),
                  (n = l(a / this.ns0 + this.long0)),
                  (t.x = n),
                  (t.y = o),
                  t
                );
              }),
              (s.phi1z = function(t, i) {
                var s,
                  e,
                  a,
                  n,
                  o = u(0.5 * i);
                if (t < 1e-10) return o;
                for (var r = t * t, h = 1; h <= 25; h++)
                  if (
                    ((o += n =
                      ((0.5 * (a = 1 - (e = t * (s = Math.sin(o))) * e) * a) /
                        Math.cos(o)) *
                      (i / (1 - r) -
                        s / a +
                        (0.5 / t) * Math.log((1 - e) / (1 + e)))),
                    Math.abs(n) <= 1e-7)
                  )
                    return o;
                return null;
              }),
              (s.names = ["Albers_Conic_Equal_Area", "Albers", "aea"]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/msfnz": 15,
            "../common/qsfnz": 20
          }
        ],
        41: [
          function(t, i, s) {
            var C = t("../common/adjust_lon"),
              A = Math.PI / 2,
              j = 1e-10,
              O = t("../common/mlfn"),
              k = t("../common/e0fn"),
              T = t("../common/e1fn"),
              q = t("../common/e2fn"),
              N = t("../common/e3fn"),
              E = t("../common/gN"),
              S = t("../common/asinz"),
              w = t("../common/imlfn");
            (s.init = function() {
              (this.sin_p12 = Math.sin(this.lat0)),
                (this.cos_p12 = Math.cos(this.lat0));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h,
                  l,
                  u,
                  c,
                  m,
                  p,
                  f,
                  d,
                  _,
                  y,
                  g,
                  M,
                  v,
                  b,
                  x,
                  S = t.x,
                  w = t.y,
                  P = Math.sin(t.y),
                  I = Math.cos(t.y),
                  L = C(S - this.long0);
                return (
                  this.sphere
                    ? Math.abs(this.sin_p12 - 1) <= j
                      ? ((t.x = this.x0 + this.a * (A - w) * Math.sin(L)),
                        (t.y = this.y0 - this.a * (A - w) * Math.cos(L)))
                      : Math.abs(this.sin_p12 + 1) <= j
                      ? ((t.x = this.x0 + this.a * (A + w) * Math.sin(L)),
                        (t.y = this.y0 + this.a * (A + w) * Math.cos(L)))
                      : ((g =
                          this.sin_p12 * P + this.cos_p12 * I * Math.cos(L)),
                        (y = (_ = Math.acos(g)) / Math.sin(_)),
                        (t.x = this.x0 + this.a * y * I * Math.sin(L)),
                        (t.y =
                          this.y0 +
                          this.a *
                            y *
                            (this.cos_p12 * P -
                              this.sin_p12 * I * Math.cos(L))))
                    : ((i = k(this.es)),
                      (s = T(this.es)),
                      (e = q(this.es)),
                      (a = N(this.es)),
                      Math.abs(this.sin_p12 - 1) <= j
                        ? ((n = this.a * O(i, s, e, a, A)),
                          (o = this.a * O(i, s, e, a, w)),
                          (t.x = this.x0 + (n - o) * Math.sin(L)),
                          (t.y = this.y0 - (n - o) * Math.cos(L)))
                        : Math.abs(this.sin_p12 + 1) <= j
                        ? ((n = this.a * O(i, s, e, a, A)),
                          (o = this.a * O(i, s, e, a, w)),
                          (t.x = this.x0 + (n + o) * Math.sin(L)),
                          (t.y = this.y0 + (n + o) * Math.cos(L)))
                        : ((r = P / I),
                          (h = E(this.a, this.e, this.sin_p12)),
                          (l = E(this.a, this.e, P)),
                          (u = Math.atan(
                            (1 - this.es) * r +
                              (this.es * h * this.sin_p12) / (l * I)
                          )),
                          (M =
                            0 ===
                            (c = Math.atan2(
                              Math.sin(L),
                              this.cos_p12 * Math.tan(u) -
                                this.sin_p12 * Math.cos(L)
                            ))
                              ? Math.asin(
                                  this.cos_p12 * Math.sin(u) -
                                    this.sin_p12 * Math.cos(u)
                                )
                              : Math.abs(Math.abs(c) - Math.PI) <= j
                              ? -Math.asin(
                                  this.cos_p12 * Math.sin(u) -
                                    this.sin_p12 * Math.cos(u)
                                )
                              : Math.asin(
                                  (Math.sin(L) * Math.cos(u)) / Math.sin(c)
                                )),
                          (m =
                            (this.e * this.sin_p12) / Math.sqrt(1 - this.es)),
                          (_ =
                            h *
                            M *
                            (1 -
                              ((v = M * M) *
                                (d =
                                  (p =
                                    (this.e * this.cos_p12 * Math.cos(c)) /
                                    Math.sqrt(1 - this.es)) * p) *
                                (1 - d)) /
                                6 +
                              ((b = v * M) / 8) * (f = m * p) * (1 - 2 * d) +
                              ((x = b * M) / 120) *
                                (d * (4 - 7 * d) - 3 * m * m * (1 - 7 * d)) -
                              ((x * M) / 48) * f)),
                          (t.x = this.x0 + _ * Math.sin(c)),
                          (t.y = this.y0 + _ * Math.cos(c)))),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h,
                  l,
                  u,
                  c,
                  m,
                  p,
                  f,
                  d,
                  _,
                  y,
                  g,
                  M,
                  v,
                  b,
                  x;
                if (((t.x -= this.x0), (t.y -= this.y0), this.sphere)) {
                  if ((i = Math.sqrt(t.x * t.x + t.y * t.y)) > 2 * A * this.a)
                    return;
                  return (
                    (s = i / this.a),
                    (e = Math.sin(s)),
                    (a = Math.cos(s)),
                    (n = this.long0),
                    Math.abs(i) <= j
                      ? (o = this.lat0)
                      : ((o = S(
                          a * this.sin_p12 + (t.y * e * this.cos_p12) / i
                        )),
                        (r = Math.abs(this.lat0) - A),
                        (n = C(
                          Math.abs(r) <= j
                            ? 0 <= this.lat0
                              ? this.long0 + Math.atan2(t.x, -t.y)
                              : this.long0 - Math.atan2(-t.x, t.y)
                            : this.long0 +
                                Math.atan2(
                                  t.x * e,
                                  i * this.cos_p12 * a - t.y * this.sin_p12 * e
                                )
                        ))),
                    (t.x = n),
                    (t.y = o),
                    t
                  );
                }
                return (
                  (h = k(this.es)),
                  (l = T(this.es)),
                  (u = q(this.es)),
                  (c = N(this.es)),
                  Math.abs(this.sin_p12 - 1) <= j
                    ? ((m = this.a * O(h, l, u, c, A)),
                      (i = Math.sqrt(t.x * t.x + t.y * t.y)),
                      (o = w((m - i) / this.a, h, l, u, c)),
                      (n = C(this.long0 + Math.atan2(t.x, -1 * t.y))))
                    : Math.abs(this.sin_p12 + 1) <= j
                    ? ((m = this.a * O(h, l, u, c, A)),
                      (i = Math.sqrt(t.x * t.x + t.y * t.y)),
                      (o = w((i - m) / this.a, h, l, u, c)),
                      (n = C(this.long0 + Math.atan2(t.x, t.y))))
                    : ((i = Math.sqrt(t.x * t.x + t.y * t.y)),
                      (d = Math.atan2(t.x, t.y)),
                      (p = E(this.a, this.e, this.sin_p12)),
                      (_ = Math.cos(d)),
                      (g =
                        (-(y = this.e * this.cos_p12 * _) * y) / (1 - this.es)),
                      (M =
                        (3 *
                          this.es *
                          (1 - g) *
                          this.sin_p12 *
                          this.cos_p12 *
                          _) /
                        (1 - this.es)),
                      (x =
                        1 -
                        (g *
                          (b =
                            (v = i / p) -
                            (g * (1 + g) * Math.pow(v, 3)) / 6 -
                            (M * (1 + 3 * g) * Math.pow(v, 4)) / 24) *
                          b) /
                          2 -
                        (v * b * b * b) / 6),
                      (f = Math.asin(
                        this.sin_p12 * Math.cos(b) +
                          this.cos_p12 * Math.sin(b) * _
                      )),
                      (n = C(
                        this.long0 +
                          Math.asin((Math.sin(d) * Math.sin(b)) / Math.cos(f))
                      )),
                      (o = Math.atan(
                        ((1 - (this.es * x * this.sin_p12) / Math.sin(f)) *
                          Math.tan(f)) /
                          (1 - this.es)
                      ))),
                  (t.x = n),
                  (t.y = o),
                  t
                );
              }),
              (s.names = ["Azimuthal_Equidistant", "aeqd"]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/gN": 11,
            "../common/imlfn": 12,
            "../common/mlfn": 14
          }
        ],
        42: [
          function(t, i, s) {
            var m = t("../common/mlfn"),
              e = t("../common/e0fn"),
              a = t("../common/e1fn"),
              n = t("../common/e2fn"),
              o = t("../common/e3fn"),
              p = t("../common/gN"),
              f = t("../common/adjust_lon"),
              d = t("../common/adjust_lat"),
              _ = t("../common/imlfn"),
              y = Math.PI / 2;
            (s.init = function() {
              this.sphere ||
                ((this.e0 = e(this.es)),
                (this.e1 = a(this.es)),
                (this.e2 = n(this.es)),
                (this.e3 = o(this.es)),
                (this.ml0 =
                  this.a * m(this.e0, this.e1, this.e2, this.e3, this.lat0)));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e = t.x,
                  a = t.y;
                if (((e = f(e - this.long0)), this.sphere))
                  (i = this.a * Math.asin(Math.cos(a) * Math.sin(e))),
                    (s =
                      this.a *
                      (Math.atan2(Math.tan(a), Math.cos(e)) - this.lat0));
                else {
                  var n = Math.sin(a),
                    o = Math.cos(a),
                    r = p(this.a, this.e, n),
                    h = Math.tan(a) * Math.tan(a),
                    l = e * Math.cos(a),
                    u = l * l,
                    c = (this.es * o * o) / (1 - this.es);
                  (i =
                    r *
                    l *
                    (1 - u * h * (1 / 6 - ((8 - h + 8 * c) * u) / 120))),
                    (s =
                      this.a * m(this.e0, this.e1, this.e2, this.e3, a) -
                      this.ml0 +
                      ((r * n) / o) * u * (0.5 + ((5 - h + 6 * c) * u) / 24));
                }
                return (t.x = i + this.x0), (t.y = s + this.y0), t;
              }),
              (s.inverse = function(t) {
                (t.x -= this.x0), (t.y -= this.y0);
                var i,
                  s,
                  e = t.x / this.a,
                  a = t.y / this.a;
                if (this.sphere) {
                  var n = a + this.lat0;
                  (i = Math.asin(Math.sin(n) * Math.cos(e))),
                    (s = Math.atan2(Math.tan(e), Math.cos(n)));
                } else {
                  var o = this.ml0 / this.a + a,
                    r = _(o, this.e0, this.e1, this.e2, this.e3);
                  if (Math.abs(Math.abs(r) - y) <= 1e-10)
                    return (
                      (t.x = this.long0), (t.y = y), a < 0 && (t.y *= -1), t
                    );
                  var h = p(this.a, this.e, Math.sin(r)),
                    l = ((h * h * h) / this.a / this.a) * (1 - this.es),
                    u = Math.pow(Math.tan(r), 2),
                    c = (e * this.a) / h,
                    m = c * c;
                  (i =
                    r -
                    ((h * Math.tan(r)) / l) *
                      c *
                      c *
                      (0.5 - ((1 + 3 * u) * c * c) / 24)),
                    (s =
                      (c * (1 - m * (u / 3 + ((1 + 3 * u) * u * m) / 15))) /
                      Math.cos(r));
                }
                return (t.x = f(s + this.long0)), (t.y = d(i)), t;
              }),
              (s.names = ["Cassini", "Cassini_Soldner", "cass"]);
          },
          {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/gN": 11,
            "../common/imlfn": 12,
            "../common/mlfn": 14
          }
        ],
        43: [
          function(t, i, s) {
            var r = t("../common/adjust_lon"),
              h = t("../common/qsfnz"),
              e = t("../common/msfnz"),
              a = t("../common/iqsfnz");
            (s.init = function() {
              this.sphere ||
                (this.k0 = e(
                  this.e,
                  Math.sin(this.lat_ts),
                  Math.cos(this.lat_ts)
                ));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e = t.x,
                  a = t.y,
                  n = r(e - this.long0);
                if (this.sphere)
                  (i = this.x0 + this.a * n * Math.cos(this.lat_ts)),
                    (s =
                      this.y0 + (this.a * Math.sin(a)) / Math.cos(this.lat_ts));
                else {
                  var o = h(this.e, Math.sin(a));
                  (i = this.x0 + this.a * this.k0 * n),
                    (s = this.y0 + (this.a * o * 0.5) / this.k0);
                }
                return (t.x = i), (t.y = s), t;
              }),
              (s.inverse = function(t) {
                var i, s;
                return (
                  (t.x -= this.x0),
                  (t.y -= this.y0),
                  this.sphere
                    ? ((i = r(
                        this.long0 + t.x / this.a / Math.cos(this.lat_ts)
                      )),
                      (s = Math.asin((t.y / this.a) * Math.cos(this.lat_ts))))
                    : ((s = a(this.e, (2 * t.y * this.k0) / this.a)),
                      (i = r(this.long0 + t.x / (this.a * this.k0)))),
                  (t.x = i),
                  (t.y = s),
                  t
                );
              }),
              (s.names = ["cea"]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/iqsfnz": 13,
            "../common/msfnz": 15,
            "../common/qsfnz": 20
          }
        ],
        44: [
          function(t, i, s) {
            var n = t("../common/adjust_lon"),
              o = t("../common/adjust_lat");
            (s.init = function() {
              (this.x0 = this.x0 || 0),
                (this.y0 = this.y0 || 0),
                (this.lat0 = this.lat0 || 0),
                (this.long0 = this.long0 || 0),
                (this.lat_ts = this.lat_ts || 0),
                (this.title =
                  this.title || "Equidistant Cylindrical (Plate Carre)"),
                (this.rc = Math.cos(this.lat_ts));
            }),
              (s.forward = function(t) {
                var i = t.x,
                  s = t.y,
                  e = n(i - this.long0),
                  a = o(s - this.lat0);
                return (
                  (t.x = this.x0 + this.a * e * this.rc),
                  (t.y = this.y0 + this.a * a),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i = t.x,
                  s = t.y;
                return (
                  (t.x = n(this.long0 + (i - this.x0) / (this.a * this.rc))),
                  (t.y = o(this.lat0 + (s - this.y0) / this.a)),
                  t
                );
              }),
              (s.names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"]);
          },
          { "../common/adjust_lat": 4, "../common/adjust_lon": 5 }
        ],
        45: [
          function(t, i, s) {
            var e = t("../common/e0fn"),
              a = t("../common/e1fn"),
              n = t("../common/e2fn"),
              o = t("../common/e3fn"),
              r = t("../common/msfnz"),
              h = t("../common/mlfn"),
              l = t("../common/adjust_lon"),
              u = t("../common/adjust_lat"),
              c = t("../common/imlfn");
            (s.init = function() {
              Math.abs(this.lat1 + this.lat2) < 1e-10 ||
                ((this.lat2 = this.lat2 || this.lat1),
                (this.temp = this.b / this.a),
                (this.es = 1 - Math.pow(this.temp, 2)),
                (this.e = Math.sqrt(this.es)),
                (this.e0 = e(this.es)),
                (this.e1 = a(this.es)),
                (this.e2 = n(this.es)),
                (this.e3 = o(this.es)),
                (this.sinphi = Math.sin(this.lat1)),
                (this.cosphi = Math.cos(this.lat1)),
                (this.ms1 = r(this.e, this.sinphi, this.cosphi)),
                (this.ml1 = h(this.e0, this.e1, this.e2, this.e3, this.lat1)),
                Math.abs(this.lat1 - this.lat2) < 1e-10
                  ? (this.ns = this.sinphi)
                  : ((this.sinphi = Math.sin(this.lat2)),
                    (this.cosphi = Math.cos(this.lat2)),
                    (this.ms2 = r(this.e, this.sinphi, this.cosphi)),
                    (this.ml2 = h(
                      this.e0,
                      this.e1,
                      this.e2,
                      this.e3,
                      this.lat2
                    )),
                    (this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1))),
                (this.g = this.ml1 + this.ms1 / this.ns),
                (this.ml0 = h(this.e0, this.e1, this.e2, this.e3, this.lat0)),
                (this.rh = this.a * (this.g - this.ml0)));
            }),
              (s.forward = function(t) {
                var i,
                  s = t.x,
                  e = t.y;
                if (this.sphere) i = this.a * (this.g - e);
                else {
                  var a = h(this.e0, this.e1, this.e2, this.e3, e);
                  i = this.a * (this.g - a);
                }
                var n = this.ns * l(s - this.long0),
                  o = this.x0 + i * Math.sin(n),
                  r = this.y0 + this.rh - i * Math.cos(n);
                return (t.x = o), (t.y = r), t;
              }),
              (s.inverse = function(t) {
                var i, s, e, a;
                (t.x -= this.x0),
                  (t.y = this.rh - t.y + this.y0),
                  (i =
                    0 <= this.ns
                      ? ((s = Math.sqrt(t.x * t.x + t.y * t.y)), 1)
                      : ((s = -Math.sqrt(t.x * t.x + t.y * t.y)), -1));
                var n = 0;
                if (
                  (0 !== s && (n = Math.atan2(i * t.x, i * t.y)), this.sphere)
                )
                  return (
                    (a = l(this.long0 + n / this.ns)),
                    (e = u(this.g - s / this.a)),
                    (t.x = a),
                    (t.y = e),
                    t
                  );
                var o = this.g - s / this.a;
                return (
                  (e = c(o, this.e0, this.e1, this.e2, this.e3)),
                  (a = l(this.long0 + n / this.ns)),
                  (t.x = a),
                  (t.y = e),
                  t
                );
              }),
              (s.names = ["Equidistant_Conic", "eqdc"]);
          },
          {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/imlfn": 12,
            "../common/mlfn": 14,
            "../common/msfnz": 15
          }
        ],
        46: [
          function(t, i, s) {
            var n = Math.PI / 4,
              o = t("../common/srat"),
              r = Math.PI / 2;
            (s.init = function() {
              var t = Math.sin(this.lat0),
                i = Math.cos(this.lat0);
              (i *= i),
                (this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t)),
                (this.C = Math.sqrt(1 + (this.es * i * i) / (1 - this.es))),
                (this.phic0 = Math.asin(t / this.C)),
                (this.ratexp = 0.5 * this.C * this.e),
                (this.K =
                  Math.tan(0.5 * this.phic0 + n) /
                  (Math.pow(Math.tan(0.5 * this.lat0 + n), this.C) *
                    o(this.e * t, this.ratexp)));
            }),
              (s.forward = function(t) {
                var i = t.x,
                  s = t.y;
                return (
                  (t.y =
                    2 *
                      Math.atan(
                        this.K *
                          Math.pow(Math.tan(0.5 * s + n), this.C) *
                          o(this.e * Math.sin(s), this.ratexp)
                      ) -
                    r),
                  (t.x = this.C * i),
                  t
                );
              }),
              (s.inverse = function(t) {
                for (
                  var i = t.x / this.C,
                    s = t.y,
                    e = Math.pow(Math.tan(0.5 * s + n) / this.K, 1 / this.C),
                    a = 20;
                  0 < a &&
                  ((s =
                    2 *
                      Math.atan(e * o(this.e * Math.sin(t.y), -0.5 * this.e)) -
                    r),
                  !(Math.abs(s - t.y) < 1e-14));
                  --a
                )
                  t.y = s;
                return a ? ((t.x = i), (t.y = s), t) : null;
              }),
              (s.names = ["gauss"]);
          },
          { "../common/srat": 22 }
        ],
        47: [
          function(t, i, s) {
            var u = t("../common/adjust_lon"),
              r = t("../common/asinz");
            (s.init = function() {
              (this.sin_p14 = Math.sin(this.lat0)),
                (this.cos_p14 = Math.cos(this.lat0)),
                (this.infinity_dist = 1e3 * this.a),
                (this.rc = 1);
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h = t.x,
                  l = t.y;
                return (
                  (e = u(h - this.long0)),
                  (i = Math.sin(l)),
                  (s = Math.cos(l)),
                  (a = Math.cos(e)),
                  (r =
                    0 < (n = this.sin_p14 * i + this.cos_p14 * s * a) ||
                    Math.abs(n) <= 1e-10
                      ? ((o = this.x0 + (this.a * s * Math.sin(e)) / n),
                        this.y0 +
                          (this.a * (this.cos_p14 * i - this.sin_p14 * s * a)) /
                            n)
                      : ((o = this.x0 + this.infinity_dist * s * Math.sin(e)),
                        this.y0 +
                          this.infinity_dist *
                            (this.cos_p14 * i - this.sin_p14 * s * a))),
                  (t.x = o),
                  (t.y = r),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i, s, e, a, n, o;
                return (
                  (t.x = (t.x - this.x0) / this.a),
                  (t.y = (t.y - this.y0) / this.a),
                  (t.x /= this.k0),
                  (t.y /= this.k0),
                  (n = (i = Math.sqrt(t.x * t.x + t.y * t.y))
                    ? ((a = Math.atan2(i, this.rc)),
                      (s = Math.sin(a)),
                      (e = Math.cos(a)),
                      (o = r(e * this.sin_p14 + (t.y * s * this.cos_p14) / i)),
                      (n = Math.atan2(
                        t.x * s,
                        i * this.cos_p14 * e - t.y * this.sin_p14 * s
                      )),
                      u(this.long0 + n))
                    : ((o = this.phic0), 0)),
                  (t.x = n),
                  (t.y = o),
                  t
                );
              }),
              (s.names = ["gnom"]);
          },
          { "../common/adjust_lon": 5, "../common/asinz": 6 }
        ],
        48: [
          function(t, i, s) {
            var c = t("../common/adjust_lon");
            (s.init = function() {
              (this.a = 6377397.155),
                (this.es = 0.006674372230614),
                (this.e = Math.sqrt(this.es)),
                this.lat0 || (this.lat0 = 0.863937979737193),
                this.long0 || (this.long0 = 0.4334234309119251),
                this.k0 || (this.k0 = 0.9999),
                (this.s45 = 0.785398163397448),
                (this.s90 = 2 * this.s45),
                (this.fi0 = this.lat0),
                (this.e2 = this.es),
                (this.e = Math.sqrt(this.e2)),
                (this.alfa = Math.sqrt(
                  1 +
                    (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2)
                )),
                (this.uq = 1.04216856380474),
                (this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa)),
                (this.g = Math.pow(
                  (1 + this.e * Math.sin(this.fi0)) /
                    (1 - this.e * Math.sin(this.fi0)),
                  (this.alfa * this.e) / 2
                )),
                (this.k =
                  (Math.tan(this.u0 / 2 + this.s45) /
                    Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa)) *
                  this.g),
                (this.k1 = this.k0),
                (this.n0 =
                  (this.a * Math.sqrt(1 - this.e2)) /
                  (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2))),
                (this.s0 = 1.37008346281555),
                (this.n = Math.sin(this.s0)),
                (this.ro0 = (this.k1 * this.n0) / Math.tan(this.s0)),
                (this.ad = this.s90 - this.uq);
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h = t.x,
                  l = t.y,
                  u = c(h - this.long0);
                return (
                  (i = Math.pow(
                    (1 + this.e * Math.sin(l)) / (1 - this.e * Math.sin(l)),
                    (this.alfa * this.e) / 2
                  )),
                  (s =
                    2 *
                    (Math.atan(
                      (this.k *
                        Math.pow(Math.tan(l / 2 + this.s45), this.alfa)) /
                        i
                    ) -
                      this.s45)),
                  (e = -u * this.alfa),
                  (a = Math.asin(
                    Math.cos(this.ad) * Math.sin(s) +
                      Math.sin(this.ad) * Math.cos(s) * Math.cos(e)
                  )),
                  (n = Math.asin((Math.cos(s) * Math.sin(e)) / Math.cos(a))),
                  (o = this.n * n),
                  (r =
                    (this.ro0 *
                      Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n)) /
                    Math.pow(Math.tan(a / 2 + this.s45), this.n)),
                  (t.y = r * Math.cos(o)),
                  (t.x = r * Math.sin(o)),
                  this.czech || ((t.y *= -1), (t.x *= -1)),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h = t.x;
                (t.x = t.y),
                  (t.y = h),
                  this.czech || ((t.y *= -1), (t.x *= -1)),
                  (n = Math.sqrt(t.x * t.x + t.y * t.y)),
                  (a = Math.atan2(t.y, t.x) / Math.sin(this.s0)),
                  (e =
                    2 *
                    (Math.atan(
                      Math.pow(this.ro0 / n, 1 / this.n) *
                        Math.tan(this.s0 / 2 + this.s45)
                    ) -
                      this.s45)),
                  (i = Math.asin(
                    Math.cos(this.ad) * Math.sin(e) -
                      Math.sin(this.ad) * Math.cos(e) * Math.cos(a)
                  )),
                  (s = Math.asin((Math.cos(e) * Math.sin(a)) / Math.cos(i))),
                  (t.x = this.long0 - s / this.alfa),
                  (o = i);
                for (
                  var l = (r = 0);
                  (t.y =
                    2 *
                    (Math.atan(
                      Math.pow(this.k, -1 / this.alfa) *
                        Math.pow(Math.tan(i / 2 + this.s45), 1 / this.alfa) *
                        Math.pow(
                          (1 + this.e * Math.sin(o)) /
                            (1 - this.e * Math.sin(o)),
                          this.e / 2
                        )
                    ) -
                      this.s45)),
                    Math.abs(o - t.y) < 1e-10 && (r = 1),
                    (o = t.y),
                    (l += 1),
                    0 === r && l < 15;

                );
                return 15 <= l ? null : t;
              }),
              (s.names = ["Krovak", "krovak"]);
          },
          { "../common/adjust_lon": 5 }
        ],
        49: [
          function(t, i, s) {
            var p = Math.PI / 2,
              f = Math.PI / 4,
              d = 1e-10,
              _ = t("../common/qsfnz"),
              y = t("../common/adjust_lon");
            (s.S_POLE = 1),
              (s.N_POLE = 2),
              (s.EQUIT = 3),
              (s.OBLIQ = 4),
              (s.init = function() {
                var t,
                  i = Math.abs(this.lat0);
                if (
                  (Math.abs(i - p) < d
                    ? (this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE)
                    : Math.abs(i) < d
                    ? (this.mode = this.EQUIT)
                    : (this.mode = this.OBLIQ),
                  0 < this.es)
                )
                  switch (
                    ((this.qp = _(this.e, 1)),
                    (this.mmf = 0.5 / (1 - this.es)),
                    (this.apa = this.authset(this.es)),
                    this.mode)
                  ) {
                    case this.N_POLE:
                    case this.S_POLE:
                      this.dd = 1;
                      break;
                    case this.EQUIT:
                      (this.rq = Math.sqrt(0.5 * this.qp)),
                        (this.dd = 1 / this.rq),
                        (this.xmf = 1),
                        (this.ymf = 0.5 * this.qp);
                      break;
                    case this.OBLIQ:
                      (this.rq = Math.sqrt(0.5 * this.qp)),
                        (t = Math.sin(this.lat0)),
                        (this.sinb1 = _(this.e, t) / this.qp),
                        (this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1)),
                        (this.dd =
                          Math.cos(this.lat0) /
                          (Math.sqrt(1 - this.es * t * t) *
                            this.rq *
                            this.cosb1)),
                        (this.ymf = (this.xmf = this.rq) / this.dd),
                        (this.xmf *= this.dd);
                  }
                else
                  this.mode === this.OBLIQ &&
                    ((this.sinph0 = Math.sin(this.lat0)),
                    (this.cosph0 = Math.cos(this.lat0)));
              }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h,
                  l,
                  u,
                  c = t.x,
                  m = t.y;
                if (((c = y(c - this.long0)), this.sphere)) {
                  if (
                    ((n = Math.sin(m)),
                    (u = Math.cos(m)),
                    (e = Math.cos(c)),
                    this.mode === this.OBLIQ || this.mode === this.EQUIT)
                  ) {
                    if (
                      (s =
                        this.mode === this.EQUIT
                          ? 1 + u * e
                          : 1 + this.sinph0 * n + this.cosph0 * u * e) <= d
                    )
                      return null;
                    (i = (s = Math.sqrt(2 / s)) * u * Math.sin(c)),
                      (s *=
                        this.mode === this.EQUIT
                          ? n
                          : this.cosph0 * n - this.sinph0 * u * e);
                  } else if (
                    this.mode === this.N_POLE ||
                    this.mode === this.S_POLE
                  ) {
                    if (
                      (this.mode === this.N_POLE && (e = -e),
                      Math.abs(m + this.phi0) < d)
                    )
                      return null;
                    (s = f - 0.5 * m),
                      (i =
                        (s =
                          2 *
                          (this.mode === this.S_POLE
                            ? Math.cos(s)
                            : Math.sin(s))) * Math.sin(c)),
                      (s *= e);
                  }
                } else {
                  switch (
                    ((l = h = r = 0),
                    (e = Math.cos(c)),
                    (a = Math.sin(c)),
                    (n = Math.sin(m)),
                    (o = _(this.e, n)),
                    (this.mode !== this.OBLIQ && this.mode !== this.EQUIT) ||
                      ((r = o / this.qp), (h = Math.sqrt(1 - r * r))),
                    this.mode)
                  ) {
                    case this.OBLIQ:
                      l = 1 + this.sinb1 * r + this.cosb1 * h * e;
                      break;
                    case this.EQUIT:
                      l = 1 + h * e;
                      break;
                    case this.N_POLE:
                      (l = p + m), (o = this.qp - o);
                      break;
                    case this.S_POLE:
                      (l = m - p), (o = this.qp + o);
                  }
                  if (Math.abs(l) < d) return null;
                  switch (this.mode) {
                    case this.OBLIQ:
                    case this.EQUIT:
                      (l = Math.sqrt(2 / l)),
                        (s =
                          this.mode === this.OBLIQ
                            ? this.ymf *
                              l *
                              (this.cosb1 * r - this.sinb1 * h * e)
                            : (l = Math.sqrt(2 / (1 + h * e))) * r * this.ymf),
                        (i = this.xmf * l * h * a);
                      break;
                    case this.N_POLE:
                    case this.S_POLE:
                      0 <= o
                        ? ((i = (l = Math.sqrt(o)) * a),
                          (s = e * (this.mode === this.S_POLE ? l : -l)))
                        : (i = s = 0);
                  }
                }
                return (
                  (t.x = this.a * i + this.x0), (t.y = this.a * s + this.y0), t
                );
              }),
              (s.inverse = function(t) {
                (t.x -= this.x0), (t.y -= this.y0);
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r,
                  h = t.x / this.a,
                  l = t.y / this.a;
                if (this.sphere) {
                  var u,
                    c = 0,
                    m = 0;
                  if (1 < (s = 0.5 * (u = Math.sqrt(h * h + l * l))))
                    return null;
                  switch (
                    ((s = 2 * Math.asin(s)),
                    (this.mode !== this.OBLIQ && this.mode !== this.EQUIT) ||
                      ((m = Math.sin(s)), (c = Math.cos(s))),
                    this.mode)
                  ) {
                    case this.EQUIT:
                      (s = Math.abs(u) <= d ? 0 : Math.asin((l * m) / u)),
                        (h *= m),
                        (l = c * u);
                      break;
                    case this.OBLIQ:
                      (s =
                        Math.abs(u) <= d
                          ? this.phi0
                          : Math.asin(
                              c * this.sinph0 + (l * m * this.cosph0) / u
                            )),
                        (h *= m * this.cosph0),
                        (l = (c - Math.sin(s) * this.sinph0) * u);
                      break;
                    case this.N_POLE:
                      (l = -l), (s = p - s);
                      break;
                    case this.S_POLE:
                      s -= p;
                  }
                  i =
                    0 !== l ||
                    (this.mode !== this.EQUIT && this.mode !== this.OBLIQ)
                      ? Math.atan2(h, l)
                      : 0;
                } else {
                  if (
                    ((r = 0),
                    this.mode === this.OBLIQ || this.mode === this.EQUIT)
                  ) {
                    if (
                      ((h /= this.dd),
                      (l *= this.dd),
                      (o = Math.sqrt(h * h + l * l)) < d)
                    )
                      return (t.x = 0), (t.y = this.phi0), t;
                    (a = 2 * Math.asin((0.5 * o) / this.rq)),
                      (e = Math.cos(a)),
                      (h *= a = Math.sin(a)),
                      (l =
                        this.mode === this.OBLIQ
                          ? ((r = e * this.sinb1 + (l * a * this.cosb1) / o),
                            (n = this.qp * r),
                            o * this.cosb1 * e - l * this.sinb1 * a)
                          : ((r = (l * a) / o), (n = this.qp * r), o * e));
                  } else if (
                    this.mode === this.N_POLE ||
                    this.mode === this.S_POLE
                  ) {
                    if (
                      (this.mode === this.N_POLE && (l = -l),
                      !(n = h * h + l * l))
                    )
                      return (t.x = 0), (t.y = this.phi0), t;
                    (r = 1 - n / this.qp),
                      this.mode === this.S_POLE && (r = -r);
                  }
                  (i = Math.atan2(h, l)),
                    (s = this.authlat(Math.asin(r), this.apa));
                }
                return (t.x = y(this.long0 + i)), (t.y = s), t;
              }),
              (s.P00 = 0.3333333333333333),
              (s.P01 = 0.17222222222222222),
              (s.P02 = 0.10257936507936508),
              (s.P10 = 0.06388888888888888),
              (s.P11 = 0.0664021164021164),
              (s.P20 = 0.016415012942191543),
              (s.authset = function(t) {
                var i,
                  s = [];
                return (
                  (s[0] = t * this.P00),
                  (i = t * t),
                  (s[0] += i * this.P01),
                  (s[1] = i * this.P10),
                  (i *= t),
                  (s[0] += i * this.P02),
                  (s[1] += i * this.P11),
                  (s[2] = i * this.P20),
                  s
                );
              }),
              (s.authlat = function(t, i) {
                var s = t + t;
                return (
                  t +
                  i[0] * Math.sin(s) +
                  i[1] * Math.sin(s + s) +
                  i[2] * Math.sin(s + s + s)
                );
              }),
              (s.names = [
                "Lambert Azimuthal Equal Area",
                "Lambert_Azimuthal_Equal_Area",
                "laea"
              ]);
          },
          { "../common/adjust_lon": 5, "../common/qsfnz": 20 }
        ],
        50: [
          function(t, i, s) {
            var u = 1e-10,
              c = t("../common/msfnz"),
              m = t("../common/tsfnz"),
              l = Math.PI / 2,
              r = t("../common/sign"),
              p = t("../common/adjust_lon"),
              f = t("../common/phi2z");
            (s.init = function() {
              if (
                (this.lat2 || (this.lat2 = this.lat1),
                this.k0 || (this.k0 = 1),
                (this.x0 = this.x0 || 0),
                (this.y0 = this.y0 || 0),
                !(Math.abs(this.lat1 + this.lat2) < u))
              ) {
                var t = this.b / this.a;
                this.e = Math.sqrt(1 - t * t);
                var i = Math.sin(this.lat1),
                  s = Math.cos(this.lat1),
                  e = c(this.e, i, s),
                  a = m(this.e, this.lat1, i),
                  n = Math.sin(this.lat2),
                  o = Math.cos(this.lat2),
                  r = c(this.e, n, o),
                  h = m(this.e, this.lat2, n),
                  l = m(this.e, this.lat0, Math.sin(this.lat0));
                Math.abs(this.lat1 - this.lat2) > u
                  ? (this.ns = Math.log(e / r) / Math.log(a / h))
                  : (this.ns = i),
                  isNaN(this.ns) && (this.ns = i),
                  (this.f0 = e / (this.ns * Math.pow(a, this.ns))),
                  (this.rh = this.a * this.f0 * Math.pow(l, this.ns)),
                  this.title || (this.title = "Lambert Conformal Conic");
              }
            }),
              (s.forward = function(t) {
                var i = t.x,
                  s = t.y;
                Math.abs(2 * Math.abs(s) - Math.PI) <= u &&
                  (s = r(s) * (l - 2 * u));
                var e,
                  a,
                  n = Math.abs(Math.abs(s) - l);
                if (u < n)
                  (e = m(this.e, s, Math.sin(s))),
                    (a = this.a * this.f0 * Math.pow(e, this.ns));
                else {
                  if ((n = s * this.ns) <= 0) return null;
                  a = 0;
                }
                var o = this.ns * p(i - this.long0);
                return (
                  (t.x = this.k0 * (a * Math.sin(o)) + this.x0),
                  (t.y = this.k0 * (this.rh - a * Math.cos(o)) + this.y0),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o = (t.x - this.x0) / this.k0,
                  r = this.rh - (t.y - this.y0) / this.k0;
                s =
                  0 < this.ns
                    ? ((i = Math.sqrt(o * o + r * r)), 1)
                    : ((i = -Math.sqrt(o * o + r * r)), -1);
                var h = 0;
                if (
                  (0 !== i && (h = Math.atan2(s * o, s * r)),
                  0 !== i || 0 < this.ns)
                ) {
                  if (
                    ((s = 1 / this.ns),
                    (e = Math.pow(i / (this.a * this.f0), s)),
                    -9999 === (a = f(this.e, e)))
                  )
                    return null;
                } else a = -l;
                return (
                  (n = p(h / this.ns + this.long0)), (t.x = n), (t.y = a), t
                );
              }),
              (s.names = [
                "Lambert Tangential Conformal Conic Projection",
                "Lambert_Conformal_Conic",
                "Lambert_Conformal_Conic_2SP",
                "lcc"
              ]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/msfnz": 15,
            "../common/phi2z": 16,
            "../common/sign": 21,
            "../common/tsfnz": 24
          }
        ],
        51: [
          function(t, i, s) {
            function e(t) {
              return t;
            }
            (s.init = function() {}),
              (s.forward = e),
              (s.inverse = e),
              (s.names = ["longlat", "identity"]);
          },
          {}
        ],
        52: [
          function(t, i, s) {
            var e = t("../common/msfnz"),
              r = Math.PI / 2,
              h = 57.29577951308232,
              l = t("../common/adjust_lon"),
              u = Math.PI / 4,
              c = t("../common/tsfnz"),
              o = t("../common/phi2z");
            (s.init = function() {
              var t = this.b / this.a;
              (this.es = 1 - t * t),
                "x0" in this || (this.x0 = 0),
                "y0" in this || (this.y0 = 0),
                (this.e = Math.sqrt(this.es)),
                this.lat_ts
                  ? this.sphere
                    ? (this.k0 = Math.cos(this.lat_ts))
                    : (this.k0 = e(
                        this.e,
                        Math.sin(this.lat_ts),
                        Math.cos(this.lat_ts)
                      ))
                  : this.k0 || (this.k ? (this.k0 = this.k) : (this.k0 = 1));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e = t.x,
                  a = t.y;
                if (90 < a * h && a * h < -90 && 180 < e * h && e * h < -180)
                  return null;
                if (Math.abs(Math.abs(a) - r) <= 1e-10) return null;
                if (this.sphere)
                  (i = this.x0 + this.a * this.k0 * l(e - this.long0)),
                    (s =
                      this.y0 +
                      this.a * this.k0 * Math.log(Math.tan(u + 0.5 * a)));
                else {
                  var n = Math.sin(a),
                    o = c(this.e, a, n);
                  (i = this.x0 + this.a * this.k0 * l(e - this.long0)),
                    (s = this.y0 - this.a * this.k0 * Math.log(o));
                }
                return (t.x = i), (t.y = s), t;
              }),
              (s.inverse = function(t) {
                var i,
                  s,
                  e = t.x - this.x0,
                  a = t.y - this.y0;
                if (this.sphere)
                  s = r - 2 * Math.atan(Math.exp(-a / (this.a * this.k0)));
                else {
                  var n = Math.exp(-a / (this.a * this.k0));
                  if (-9999 === (s = o(this.e, n))) return null;
                }
                return (
                  (i = l(this.long0 + e / (this.a * this.k0))),
                  (t.x = i),
                  (t.y = s),
                  t
                );
              }),
              (s.names = [
                "Mercator",
                "Popular Visualisation Pseudo Mercator",
                "Mercator_1SP",
                "Mercator_Auxiliary_Sphere",
                "merc"
              ]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/msfnz": 15,
            "../common/phi2z": 16,
            "../common/tsfnz": 24
          }
        ],
        53: [
          function(t, i, s) {
            var o = t("../common/adjust_lon");
            (s.init = function() {}),
              (s.forward = function(t) {
                var i = t.x,
                  s = t.y,
                  e = o(i - this.long0),
                  a = this.x0 + this.a * e,
                  n =
                    this.y0 +
                    this.a * Math.log(Math.tan(Math.PI / 4 + s / 2.5)) * 1.25;
                return (t.x = a), (t.y = n), t;
              }),
              (s.inverse = function(t) {
                (t.x -= this.x0), (t.y -= this.y0);
                var i = o(this.long0 + t.x / this.a),
                  s =
                    2.5 *
                    (Math.atan(Math.exp((0.8 * t.y) / this.a)) - Math.PI / 4);
                return (t.x = i), (t.y = s), t;
              }),
              (s.names = ["Miller_Cylindrical", "mill"]);
          },
          { "../common/adjust_lon": 5 }
        ],
        54: [
          function(t, i, s) {
            var l = t("../common/adjust_lon");
            (s.init = function() {}),
              (s.forward = function(t) {
                for (
                  var i = t.x,
                    s = t.y,
                    e = l(i - this.long0),
                    a = s,
                    n = Math.PI * Math.sin(s);
                  ;
                  0
                ) {
                  var o = -(a + Math.sin(a) - n) / (1 + Math.cos(a));
                  if (((a += o), Math.abs(o) < 1e-10)) break;
                }
                (a /= 2), Math.PI / 2 - Math.abs(s) < 1e-10 && (e = 0);
                var r = 0.900316316158 * this.a * e * Math.cos(a) + this.x0,
                  h = 1.4142135623731 * this.a * Math.sin(a) + this.y0;
                return (t.x = r), (t.y = h), t;
              }),
              (s.inverse = function(t) {
                var i, s;
                (t.x -= this.x0),
                  (t.y -= this.y0),
                  (s = t.y / (1.4142135623731 * this.a)),
                  0.999999999999 < Math.abs(s) && (s = 0.999999999999),
                  (i = Math.asin(s));
                var e = l(
                  this.long0 + t.x / (0.900316316158 * this.a * Math.cos(i))
                );
                e < -Math.PI && (e = -Math.PI),
                  e > Math.PI && (e = Math.PI),
                  (s = (2 * i + Math.sin(2 * i)) / Math.PI),
                  1 < Math.abs(s) && (s = 1);
                var a = Math.asin(s);
                return (t.x = e), (t.y = a), t;
              }),
              (s.names = ["Mollweide", "moll"]);
          },
          { "../common/adjust_lon": 5 }
        ],
        55: [
          function(t, i, s) {
            var L = 484813681109536e-20;
            (s.iterations = 1),
              (s.init = function() {
                (this.A = []),
                  (this.A[1] = 0.6399175073),
                  (this.A[2] = -0.1358797613),
                  (this.A[3] = 0.063294409),
                  (this.A[4] = -0.02526853),
                  (this.A[5] = 0.0117879),
                  (this.A[6] = -0.0055161),
                  (this.A[7] = 0.0026906),
                  (this.A[8] = -0.001333),
                  (this.A[9] = 67e-5),
                  (this.A[10] = -34e-5),
                  (this.B_re = []),
                  (this.B_im = []),
                  (this.B_re[1] = 0.7557853228),
                  (this.B_im[1] = 0),
                  (this.B_re[2] = 0.249204646),
                  (this.B_im[2] = 0.003371507),
                  (this.B_re[3] = -0.001541739),
                  (this.B_im[3] = 0.04105856),
                  (this.B_re[4] = -0.10162907),
                  (this.B_im[4] = 0.01727609),
                  (this.B_re[5] = -0.26623489),
                  (this.B_im[5] = -0.36249218),
                  (this.B_re[6] = -0.6870983),
                  (this.B_im[6] = -1.1651967),
                  (this.C_re = []),
                  (this.C_im = []),
                  (this.C_re[1] = 1.3231270439),
                  (this.C_im[1] = 0),
                  (this.C_re[2] = -0.577245789),
                  (this.C_im[2] = -0.007809598),
                  (this.C_re[3] = 0.508307513),
                  (this.C_im[3] = -0.112208952),
                  (this.C_re[4] = -0.15094762),
                  (this.C_im[4] = 0.18200602),
                  (this.C_re[5] = 1.01418179),
                  (this.C_im[5] = 1.64497696),
                  (this.C_re[6] = 1.9660549),
                  (this.C_im[6] = 2.5127645),
                  (this.D = []),
                  (this.D[1] = 1.5627014243),
                  (this.D[2] = 0.5185406398),
                  (this.D[3] = -0.03333098),
                  (this.D[4] = -0.1052906),
                  (this.D[5] = -0.0368594),
                  (this.D[6] = 0.007317),
                  (this.D[7] = 0.0122),
                  (this.D[8] = 0.00394),
                  (this.D[9] = -0.0013);
              }),
              (s.forward = function(t) {
                var i,
                  s = t.x,
                  e = t.y - this.lat0,
                  a = s - this.long0,
                  n = (e / L) * 1e-5,
                  o = a,
                  r = 1,
                  h = 0;
                for (i = 1; i <= 10; i++) (r *= n), (h += this.A[i] * r);
                var l,
                  u = h,
                  c = o,
                  m = 1,
                  p = 0,
                  f = 0,
                  d = 0;
                for (i = 1; i <= 6; i++)
                  (l = p * u + m * c),
                    (m = m * u - p * c),
                    (p = l),
                    (f = f + this.B_re[i] * m - this.B_im[i] * p),
                    (d = d + this.B_im[i] * m + this.B_re[i] * p);
                return (
                  (t.x = d * this.a + this.x0), (t.y = f * this.a + this.y0), t
                );
              }),
              (s.inverse = function(t) {
                var i,
                  s,
                  e = t.x,
                  a = t.y,
                  n = e - this.x0,
                  o = (a - this.y0) / this.a,
                  r = n / this.a,
                  h = 1,
                  l = 0,
                  u = 0,
                  c = 0;
                for (i = 1; i <= 6; i++)
                  (s = l * o + h * r),
                    (h = h * o - l * r),
                    (l = s),
                    (u = u + this.C_re[i] * h - this.C_im[i] * l),
                    (c = c + this.C_im[i] * h + this.C_re[i] * l);
                for (var m = 0; m < this.iterations; m++) {
                  var p,
                    f = u,
                    d = c,
                    _ = o,
                    y = r;
                  for (i = 2; i <= 6; i++)
                    (p = d * u + f * c),
                      (f = f * u - d * c),
                      (d = p),
                      (_ += (i - 1) * (this.B_re[i] * f - this.B_im[i] * d)),
                      (y += (i - 1) * (this.B_im[i] * f + this.B_re[i] * d));
                  (f = 1), (d = 0);
                  var g = this.B_re[1],
                    M = this.B_im[1];
                  for (i = 2; i <= 6; i++)
                    (p = d * u + f * c),
                      (f = f * u - d * c),
                      (d = p),
                      (g += i * (this.B_re[i] * f - this.B_im[i] * d)),
                      (M += i * (this.B_im[i] * f + this.B_re[i] * d));
                  var v = g * g + M * M;
                  (u = (_ * g + y * M) / v), (c = (y * g - _ * M) / v);
                }
                var b = u,
                  x = c,
                  S = 1,
                  w = 0;
                for (i = 1; i <= 9; i++) (S *= b), (w += this.D[i] * S);
                var P = this.lat0 + w * L * 1e5,
                  I = this.long0 + x;
                return (t.x = I), (t.y = P), t;
              }),
              (s.names = ["New_Zealand_Map_Grid", "nzmg"]);
          },
          {}
        ],
        56: [
          function(t, i, s) {
            var d = t("../common/tsfnz"),
              _ = t("../common/adjust_lon"),
              l = t("../common/phi2z"),
              p = Math.PI / 2,
              f = Math.PI / 4,
              y = 1e-10;
            (s.init = function() {
              (this.no_off = this.no_off || !1),
                (this.no_rot = this.no_rot || !1),
                isNaN(this.k0) && (this.k0 = 1);
              var t = Math.sin(this.lat0),
                i = Math.cos(this.lat0),
                s = this.e * t;
              (this.bl = Math.sqrt(
                1 + (this.es / (1 - this.es)) * Math.pow(i, 4)
              )),
                (this.al =
                  (this.a * this.bl * this.k0 * Math.sqrt(1 - this.es)) /
                  (1 - s * s));
              var e,
                a,
                n = d(this.e, this.lat0, t),
                o = (this.bl / i) * Math.sqrt((1 - this.es) / (1 - s * s));
              if ((o * o < 1 && (o = 1), isNaN(this.longc))) {
                var r = d(this.e, this.lat1, Math.sin(this.lat1)),
                  h = d(this.e, this.lat2, Math.sin(this.lat2));
                0 <= this.lat0
                  ? (this.el =
                      (o + Math.sqrt(o * o - 1)) * Math.pow(n, this.bl))
                  : (this.el =
                      (o - Math.sqrt(o * o - 1)) * Math.pow(n, this.bl));
                var l = Math.pow(r, this.bl),
                  u = Math.pow(h, this.bl);
                a = 0.5 * ((e = this.el / l) - 1 / e);
                var c =
                    (this.el * this.el - u * l) / (this.el * this.el + u * l),
                  m = (u - l) / (u + l),
                  p = _(this.long1 - this.long2);
                (this.long0 =
                  0.5 * (this.long1 + this.long2) -
                  Math.atan((c * Math.tan(0.5 * this.bl * p)) / m) / this.bl),
                  (this.long0 = _(this.long0));
                var f = _(this.long1 - this.long0);
                (this.gamma0 = Math.atan(Math.sin(this.bl * f) / a)),
                  (this.alpha = Math.asin(o * Math.sin(this.gamma0)));
              } else
                (e =
                  0 <= this.lat0
                    ? o + Math.sqrt(o * o - 1)
                    : o - Math.sqrt(o * o - 1)),
                  (this.el = e * Math.pow(n, this.bl)),
                  (a = 0.5 * (e - 1 / e)),
                  (this.gamma0 = Math.asin(Math.sin(this.alpha) / o)),
                  (this.long0 =
                    this.longc -
                    Math.asin(a * Math.tan(this.gamma0)) / this.bl);
              this.no_off
                ? (this.uc = 0)
                : 0 <= this.lat0
                ? (this.uc =
                    (this.al / this.bl) *
                    Math.atan2(Math.sqrt(o * o - 1), Math.cos(this.alpha)))
                : (this.uc =
                    ((-1 * this.al) / this.bl) *
                    Math.atan2(Math.sqrt(o * o - 1), Math.cos(this.alpha)));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a = t.x,
                  n = t.y,
                  o = _(a - this.long0);
                if (Math.abs(Math.abs(n) - p) <= y)
                  (e = 0 < n ? -1 : 1),
                    (s =
                      (this.al / this.bl) *
                      Math.log(Math.tan(f + e * this.gamma0 * 0.5))),
                    (i = (-1 * e * p * this.al) / this.bl);
                else {
                  var r = d(this.e, n, Math.sin(n)),
                    h = this.el / Math.pow(r, this.bl),
                    l = 0.5 * (h - 1 / h),
                    u = 0.5 * (h + 1 / h),
                    c = Math.sin(this.bl * o),
                    m =
                      (l * Math.sin(this.gamma0) - c * Math.cos(this.gamma0)) /
                      u;
                  (s =
                    Math.abs(Math.abs(m) - 1) <= y
                      ? Number.POSITIVE_INFINITY
                      : (0.5 * this.al * Math.log((1 - m) / (1 + m))) /
                        this.bl),
                    (i =
                      Math.abs(Math.cos(this.bl * o)) <= y
                        ? this.al * this.bl * o
                        : (this.al *
                            Math.atan2(
                              l * Math.cos(this.gamma0) +
                                c * Math.sin(this.gamma0),
                              Math.cos(this.bl * o)
                            )) /
                          this.bl);
                }
                return (
                  this.no_rot
                    ? ((t.x = this.x0 + i), (t.y = this.y0 + s))
                    : ((i -= this.uc),
                      (t.x =
                        this.x0 +
                        s * Math.cos(this.alpha) +
                        i * Math.sin(this.alpha)),
                      (t.y =
                        this.y0 +
                        i * Math.cos(this.alpha) -
                        s * Math.sin(this.alpha))),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i, s;
                this.no_rot
                  ? ((s = t.y - this.y0), (i = t.x - this.x0))
                  : ((s =
                      (t.x - this.x0) * Math.cos(this.alpha) -
                      (t.y - this.y0) * Math.sin(this.alpha)),
                    (i =
                      (t.y - this.y0) * Math.cos(this.alpha) +
                      (t.x - this.x0) * Math.sin(this.alpha)),
                    (i += this.uc));
                var e = Math.exp((-1 * this.bl * s) / this.al),
                  a = 0.5 * (e - 1 / e),
                  n = 0.5 * (e + 1 / e),
                  o = Math.sin((this.bl * i) / this.al),
                  r =
                    (o * Math.cos(this.gamma0) + a * Math.sin(this.gamma0)) / n,
                  h = Math.pow(
                    this.el / Math.sqrt((1 + r) / (1 - r)),
                    1 / this.bl
                  );
                return (
                  Math.abs(r - 1) < y
                    ? ((t.x = this.long0), (t.y = p))
                    : Math.abs(1 + r) < y
                    ? ((t.x = this.long0), (t.y = -1 * p))
                    : ((t.y = l(this.e, h)),
                      (t.x = _(
                        this.long0 -
                          Math.atan2(
                            a * Math.cos(this.gamma0) -
                              o * Math.sin(this.gamma0),
                            Math.cos((this.bl * i) / this.al)
                          ) /
                            this.bl
                      ))),
                  t
                );
              }),
              (s.names = [
                "Hotine_Oblique_Mercator",
                "Hotine Oblique Mercator",
                "Hotine_Oblique_Mercator_Azimuth_Natural_Origin",
                "Hotine_Oblique_Mercator_Azimuth_Center",
                "omerc"
              ]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/phi2z": 16,
            "../common/tsfnz": 24
          }
        ],
        57: [
          function(t, i, s) {
            var e = t("../common/e0fn"),
              a = t("../common/e1fn"),
              n = t("../common/e2fn"),
              o = t("../common/e3fn"),
              _ = t("../common/adjust_lon"),
              h = t("../common/adjust_lat"),
              y = t("../common/mlfn"),
              g = 1e-10,
              l = t("../common/gN");
            (s.init = function() {
              (this.temp = this.b / this.a),
                (this.es = 1 - Math.pow(this.temp, 2)),
                (this.e = Math.sqrt(this.es)),
                (this.e0 = e(this.es)),
                (this.e1 = a(this.es)),
                (this.e2 = n(this.es)),
                (this.e3 = o(this.es)),
                (this.ml0 =
                  this.a * y(this.e0, this.e1, this.e2, this.e3, this.lat0));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a = t.x,
                  n = t.y,
                  o = _(a - this.long0);
                if (((e = o * Math.sin(n)), this.sphere))
                  s =
                    Math.abs(n) <= g
                      ? ((i = this.a * o), -1 * this.a * this.lat0)
                      : ((i = (this.a * Math.sin(e)) / Math.tan(n)),
                        this.a *
                          (h(n - this.lat0) + (1 - Math.cos(e)) / Math.tan(n)));
                else if (Math.abs(n) <= g)
                  (i = this.a * o), (s = -1 * this.ml0);
                else {
                  var r = l(this.a, this.e, Math.sin(n)) / Math.tan(n);
                  (i = r * Math.sin(e)),
                    (s =
                      this.a * y(this.e0, this.e1, this.e2, this.e3, n) -
                      this.ml0 +
                      r * (1 - Math.cos(e)));
                }
                return (t.x = i + this.x0), (t.y = s + this.y0), t;
              }),
              (s.inverse = function(t) {
                var i, s, e, a, n, o, r, h, l;
                if (((e = t.x - this.x0), (a = t.y - this.y0), this.sphere))
                  if (Math.abs(a + this.a * this.lat0) <= g)
                    (i = _(e / this.a + this.long0)), (s = 0);
                  else {
                    var u;
                    for (
                      o = this.lat0 + a / this.a,
                        r = (e * e) / this.a / this.a + o * o,
                        h = o,
                        n = 20;
                      n;
                      --n
                    )
                      if (
                        ((h += l =
                          (-1 *
                            (o * (h * (u = Math.tan(h)) + 1) -
                              h -
                              0.5 * (h * h + r) * u)) /
                          ((h - o) / u - 1)),
                        Math.abs(l) <= g)
                      ) {
                        s = h;
                        break;
                      }
                    i = _(
                      this.long0 +
                        Math.asin((e * Math.tan(h)) / this.a) / Math.sin(s)
                    );
                  }
                else if (Math.abs(a + this.ml0) <= g)
                  (s = 0), (i = _(this.long0 + e / this.a));
                else {
                  var c, m, p, f, d;
                  for (
                    o = (this.ml0 + a) / this.a,
                      r = (e * e) / this.a / this.a + o * o,
                      h = o,
                      n = 20;
                    n;
                    --n
                  )
                    if (
                      ((d = this.e * Math.sin(h)),
                      (c = Math.sqrt(1 - d * d) * Math.tan(h)),
                      (m = this.a * y(this.e0, this.e1, this.e2, this.e3, h)),
                      (p =
                        this.e0 -
                        2 * this.e1 * Math.cos(2 * h) +
                        4 * this.e2 * Math.cos(4 * h) -
                        6 * this.e3 * Math.cos(6 * h)),
                      (h -= l =
                        (o * (c * (f = m / this.a) + 1) -
                          f -
                          0.5 * c * (f * f + r)) /
                        ((this.es * Math.sin(2 * h) * (f * f + r - 2 * o * f)) /
                          (4 * c) +
                          (o - f) * (c * p - 2 / Math.sin(2 * h)) -
                          p)),
                      Math.abs(l) <= g)
                    ) {
                      s = h;
                      break;
                    }
                  (c =
                    Math.sqrt(1 - this.es * Math.pow(Math.sin(s), 2)) *
                    Math.tan(s)),
                    (i = _(
                      this.long0 + Math.asin((e * c) / this.a) / Math.sin(s)
                    ));
                }
                return (t.x = i), (t.y = s), t;
              }),
              (s.names = ["Polyconic", "poly"]);
          },
          {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/gN": 11,
            "../common/mlfn": 14
          }
        ],
        58: [
          function(t, i, s) {
            var u = t("../common/adjust_lon"),
              n = t("../common/adjust_lat"),
              e = t("../common/pj_enfn"),
              c = t("../common/pj_mlfn"),
              o = t("../common/pj_inv_mlfn"),
              r = Math.PI / 2,
              h = t("../common/asinz");
            (s.init = function() {
              this.sphere
                ? ((this.n = 1),
                  (this.m = 0),
                  (this.es = 0),
                  (this.C_y = Math.sqrt((this.m + 1) / this.n)),
                  (this.C_x = this.C_y / (this.m + 1)))
                : (this.en = e(this.es));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e = t.x,
                  a = t.y;
                if (((e = u(e - this.long0)), this.sphere)) {
                  if (this.m)
                    for (var n = this.n * Math.sin(a), o = 20; o; --o) {
                      var r =
                        (this.m * a + Math.sin(a) - n) / (this.m + Math.cos(a));
                      if (((a -= r), Math.abs(r) < 1e-10)) break;
                    }
                  else a = 1 !== this.n ? Math.asin(this.n * Math.sin(a)) : a;
                  (i = this.a * this.C_x * e * (this.m + Math.cos(a))),
                    (s = this.a * this.C_y * a);
                } else {
                  var h = Math.sin(a),
                    l = Math.cos(a);
                  (s = this.a * c(a, h, l, this.en)),
                    (i = (this.a * e * l) / Math.sqrt(1 - this.es * h * h));
                }
                return (t.x = i), (t.y = s), t;
              }),
              (s.inverse = function(t) {
                var i, s, e, a;
                return (
                  (t.x -= this.x0),
                  (e = t.x / this.a),
                  (t.y -= this.y0),
                  (i = t.y / this.a),
                  this.sphere
                    ? ((i /= this.C_y),
                      (e /= this.C_x * (this.m + Math.cos(i))),
                      this.m
                        ? (i = h((this.m * i + Math.sin(i)) / this.n))
                        : 1 !== this.n && (i = h(Math.sin(i) / this.n)),
                      (e = u(e + this.long0)),
                      (i = n(i)))
                    : ((i = o(t.y / this.a, this.es, this.en)),
                      (a = Math.abs(i)) < r
                        ? ((a = Math.sin(i)),
                          (s =
                            this.long0 +
                            (t.x * Math.sqrt(1 - this.es * a * a)) /
                              (this.a * Math.cos(i))),
                          (e = u(s)))
                        : a - 1e-10 < r && (e = this.long0)),
                  (t.x = e),
                  (t.y = i),
                  t
                );
              }),
              (s.names = ["Sinusoidal", "sinu"]);
          },
          {
            "../common/adjust_lat": 4,
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/pj_enfn": 17,
            "../common/pj_inv_mlfn": 18,
            "../common/pj_mlfn": 19
          }
        ],
        59: [
          function(t, i, s) {
            (s.init = function() {
              var t = this.lat0;
              this.lambda0 = this.long0;
              var i = Math.sin(t),
                s = this.a,
                e = 1 / this.rf,
                a = 2 * e - Math.pow(e, 2),
                n = (this.e = Math.sqrt(a));
              (this.R =
                (this.k0 * s * Math.sqrt(1 - a)) / (1 - a * Math.pow(i, 2))),
                (this.alpha = Math.sqrt(
                  1 + (a / (1 - a)) * Math.pow(Math.cos(t), 4)
                )),
                (this.b0 = Math.asin(i / this.alpha));
              var o = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
                r = Math.log(Math.tan(Math.PI / 4 + t / 2)),
                h = Math.log((1 + n * i) / (1 - n * i));
              this.K = o - this.alpha * r + ((this.alpha * n) / 2) * h;
            }),
              (s.forward = function(t) {
                var i = Math.log(Math.tan(Math.PI / 4 - t.y / 2)),
                  s =
                    (this.e / 2) *
                    Math.log(
                      (1 + this.e * Math.sin(t.y)) /
                        (1 - this.e * Math.sin(t.y))
                    ),
                  e = -this.alpha * (i + s) + this.K,
                  a = 2 * (Math.atan(Math.exp(e)) - Math.PI / 4),
                  n = this.alpha * (t.x - this.lambda0),
                  o = Math.atan(
                    Math.sin(n) /
                      (Math.sin(this.b0) * Math.tan(a) +
                        Math.cos(this.b0) * Math.cos(n))
                  ),
                  r = Math.asin(
                    Math.cos(this.b0) * Math.sin(a) -
                      Math.sin(this.b0) * Math.cos(a) * Math.cos(n)
                  );
                return (
                  (t.y =
                    (this.R / 2) *
                      Math.log((1 + Math.sin(r)) / (1 - Math.sin(r))) +
                    this.y0),
                  (t.x = this.R * o + this.x0),
                  t
                );
              }),
              (s.inverse = function(t) {
                for (
                  var i = t.x - this.x0,
                    s = t.y - this.y0,
                    e = i / this.R,
                    a = 2 * (Math.atan(Math.exp(s / this.R)) - Math.PI / 4),
                    n = Math.asin(
                      Math.cos(this.b0) * Math.sin(a) +
                        Math.sin(this.b0) * Math.cos(a) * Math.cos(e)
                    ),
                    o = Math.atan(
                      Math.sin(e) /
                        (Math.cos(this.b0) * Math.cos(e) -
                          Math.sin(this.b0) * Math.tan(a))
                    ),
                    r = this.lambda0 + o / this.alpha,
                    h = 0,
                    l = n,
                    u = -1e3,
                    c = 0;
                  1e-7 < Math.abs(l - u);

                ) {
                  if (20 < ++c) return;
                  (h =
                    (1 / this.alpha) *
                      (Math.log(Math.tan(Math.PI / 4 + n / 2)) - this.K) +
                    this.e *
                      Math.log(
                        Math.tan(
                          Math.PI / 4 + Math.asin(this.e * Math.sin(l)) / 2
                        )
                      )),
                    (u = l),
                    (l = 2 * Math.atan(Math.exp(h)) - Math.PI / 2);
                }
                return (t.x = r), (t.y = l), t;
              }),
              (s.names = ["somerc"]);
          },
          {}
        ],
        60: [
          function(t, i, s) {
            var m = Math.PI / 2,
              p = 1e-10,
              e = t("../common/sign"),
              a = t("../common/msfnz"),
              f = t("../common/tsfnz"),
              h = t("../common/phi2z"),
              d = t("../common/adjust_lon");
            (s.ssfn_ = function(t, i, s) {
              return (
                (i *= s),
                Math.tan(0.5 * (m + t)) * Math.pow((1 - i) / (1 + i), 0.5 * s)
              );
            }),
              (s.init = function() {
                (this.coslat0 = Math.cos(this.lat0)),
                  (this.sinlat0 = Math.sin(this.lat0)),
                  this.sphere
                    ? 1 === this.k0 &&
                      !isNaN(this.lat_ts) &&
                      Math.abs(this.coslat0) <= p &&
                      (this.k0 =
                        0.5 * (1 + e(this.lat0) * Math.sin(this.lat_ts)))
                    : (Math.abs(this.coslat0) <= p &&
                        (0 < this.lat0 ? (this.con = 1) : (this.con = -1)),
                      (this.cons = Math.sqrt(
                        Math.pow(1 + this.e, 1 + this.e) *
                          Math.pow(1 - this.e, 1 - this.e)
                      )),
                      1 === this.k0 &&
                        !isNaN(this.lat_ts) &&
                        Math.abs(this.coslat0) <= p &&
                        (this.k0 =
                          (0.5 *
                            this.cons *
                            a(
                              this.e,
                              Math.sin(this.lat_ts),
                              Math.cos(this.lat_ts)
                            )) /
                          f(
                            this.e,
                            this.con * this.lat_ts,
                            this.con * Math.sin(this.lat_ts)
                          )),
                      (this.ms1 = a(this.e, this.sinlat0, this.coslat0)),
                      (this.X0 =
                        2 *
                          Math.atan(
                            this.ssfn_(this.lat0, this.sinlat0, this.e)
                          ) -
                        m),
                      (this.cosX0 = Math.cos(this.X0)),
                      (this.sinX0 = Math.sin(this.X0)));
              }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a,
                  n,
                  o,
                  r = t.x,
                  h = t.y,
                  l = Math.sin(h),
                  u = Math.cos(h),
                  c = d(r - this.long0);
                return (
                  Math.abs(Math.abs(r - this.long0) - Math.PI) <= p &&
                  Math.abs(h + this.lat0) <= p
                    ? ((t.x = NaN), (t.y = NaN))
                    : this.sphere
                    ? ((i =
                        (2 * this.k0) /
                        (1 +
                          this.sinlat0 * l +
                          this.coslat0 * u * Math.cos(c))),
                      (t.x = this.a * i * u * Math.sin(c) + this.x0),
                      (t.y =
                        this.a *
                          i *
                          (this.coslat0 * l - this.sinlat0 * u * Math.cos(c)) +
                        this.y0))
                    : ((s = 2 * Math.atan(this.ssfn_(h, l, this.e)) - m),
                      (a = Math.cos(s)),
                      (e = Math.sin(s)),
                      Math.abs(this.coslat0) <= p
                        ? ((n = f(this.e, h * this.con, this.con * l)),
                          (o = (2 * this.a * this.k0 * n) / this.cons),
                          (t.x = this.x0 + o * Math.sin(r - this.long0)),
                          (t.y =
                            this.y0 - this.con * o * Math.cos(r - this.long0)))
                        : (Math.abs(this.sinlat0) < p
                            ? ((i =
                                (2 * this.a * this.k0) / (1 + a * Math.cos(c))),
                              (t.y = i * e))
                            : ((i =
                                (2 * this.a * this.k0 * this.ms1) /
                                (this.cosX0 *
                                  (1 +
                                    this.sinX0 * e +
                                    this.cosX0 * a * Math.cos(c)))),
                              (t.y =
                                i *
                                  (this.cosX0 * e -
                                    this.sinX0 * a * Math.cos(c)) +
                                this.y0)),
                          (t.x = i * a * Math.sin(c) + this.x0))),
                  t
                );
              }),
              (s.inverse = function(t) {
                (t.x -= this.x0), (t.y -= this.y0);
                var i,
                  s,
                  e,
                  a,
                  n,
                  o = Math.sqrt(t.x * t.x + t.y * t.y);
                if (this.sphere) {
                  var r = 2 * Math.atan(o / (0.5 * this.a * this.k0));
                  return (
                    (i = this.long0),
                    (s = this.lat0),
                    o <= p ||
                      ((s = Math.asin(
                        Math.cos(r) * this.sinlat0 +
                          (t.y * Math.sin(r) * this.coslat0) / o
                      )),
                      (i = d(
                        Math.abs(this.coslat0) < p
                          ? 0 < this.lat0
                            ? this.long0 + Math.atan2(t.x, -1 * t.y)
                            : this.long0 + Math.atan2(t.x, t.y)
                          : this.long0 +
                              Math.atan2(
                                t.x * Math.sin(r),
                                o * this.coslat0 * Math.cos(r) -
                                  t.y * this.sinlat0 * Math.sin(r)
                              )
                      ))),
                    (t.x = i),
                    (t.y = s),
                    t
                  );
                }
                if (Math.abs(this.coslat0) <= p) {
                  if (o <= p)
                    return (
                      (s = this.lat0), (i = this.long0), (t.x = i), (t.y = s), t
                    );
                  (t.x *= this.con),
                    (t.y *= this.con),
                    (e = (o * this.cons) / (2 * this.a * this.k0)),
                    (s = this.con * h(this.e, e)),
                    (i =
                      this.con *
                      d(this.con * this.long0 + Math.atan2(t.x, -1 * t.y)));
                } else
                  (a =
                    2 *
                    Math.atan(
                      (o * this.cosX0) / (2 * this.a * this.k0 * this.ms1)
                    )),
                    (i = this.long0),
                    o <= p
                      ? (n = this.X0)
                      : ((n = Math.asin(
                          Math.cos(a) * this.sinX0 +
                            (t.y * Math.sin(a) * this.cosX0) / o
                        )),
                        (i = d(
                          this.long0 +
                            Math.atan2(
                              t.x * Math.sin(a),
                              o * this.cosX0 * Math.cos(a) -
                                t.y * this.sinX0 * Math.sin(a)
                            )
                        ))),
                    (s = -1 * h(this.e, Math.tan(0.5 * (m + n))));
                return (t.x = i), (t.y = s), t;
              }),
              (s.names = [
                "stere",
                "Stereographic_South_Pole",
                "Polar Stereographic (variant B)"
              ]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/msfnz": 15,
            "../common/phi2z": 16,
            "../common/sign": 21,
            "../common/tsfnz": 24
          }
        ],
        61: [
          function(t, i, s) {
            var r = t("./gauss"),
              h = t("../common/adjust_lon");
            (s.init = function() {
              r.init.apply(this),
                this.rc &&
                  ((this.sinc0 = Math.sin(this.phic0)),
                  (this.cosc0 = Math.cos(this.phic0)),
                  (this.R2 = 2 * this.rc),
                  this.title ||
                    (this.title = "Oblique Stereographic Alternative"));
            }),
              (s.forward = function(t) {
                var i, s, e, a;
                return (
                  (t.x = h(t.x - this.long0)),
                  r.forward.apply(this, [t]),
                  (i = Math.sin(t.y)),
                  (s = Math.cos(t.y)),
                  (e = Math.cos(t.x)),
                  (a =
                    (this.k0 * this.R2) /
                    (1 + this.sinc0 * i + this.cosc0 * s * e)),
                  (t.x = a * s * Math.sin(t.x)),
                  (t.y = a * (this.cosc0 * i - this.sinc0 * s * e)),
                  (t.x = this.a * t.x + this.x0),
                  (t.y = this.a * t.y + this.y0),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i, s, e, a, n;
                if (
                  ((t.x = (t.x - this.x0) / this.a),
                  (t.y = (t.y - this.y0) / this.a),
                  (t.x /= this.k0),
                  (t.y /= this.k0),
                  (n = Math.sqrt(t.x * t.x + t.y * t.y)))
                ) {
                  var o = 2 * Math.atan2(n, this.R2);
                  (i = Math.sin(o)),
                    (s = Math.cos(o)),
                    (a = Math.asin(
                      s * this.sinc0 + (t.y * i * this.cosc0) / n
                    )),
                    (e = Math.atan2(
                      t.x * i,
                      n * this.cosc0 * s - t.y * this.sinc0 * i
                    ));
                } else (a = this.phic0), (e = 0);
                return (
                  (t.x = e),
                  (t.y = a),
                  r.inverse.apply(this, [t]),
                  (t.x = h(t.x + this.long0)),
                  t
                );
              }),
              (s.names = [
                "Stereographic_North_Pole",
                "Oblique_Stereographic",
                "Polar_Stereographic",
                "sterea",
                "Oblique Stereographic Alternative"
              ]);
          },
          { "../common/adjust_lon": 5, "./gauss": 46 }
        ],
        62: [
          function(t, i, s) {
            var e = t("../common/e0fn"),
              a = t("../common/e1fn"),
              n = t("../common/e2fn"),
              o = t("../common/e3fn"),
              y = t("../common/mlfn"),
              w = t("../common/adjust_lon"),
              P = Math.PI / 2,
              I = t("../common/sign"),
              L = t("../common/asinz");
            (s.init = function() {
              (this.e0 = e(this.es)),
                (this.e1 = a(this.es)),
                (this.e2 = n(this.es)),
                (this.e3 = o(this.es)),
                (this.ml0 =
                  this.a * y(this.e0, this.e1, this.e2, this.e3, this.lat0));
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e,
                  a = t.x,
                  n = t.y,
                  o = w(a - this.long0),
                  r = Math.sin(n),
                  h = Math.cos(n);
                if (this.sphere) {
                  var l = h * Math.sin(o);
                  if (Math.abs(Math.abs(l) - 1) < 1e-10) return 93;
                  (s = 0.5 * this.a * this.k0 * Math.log((1 + l) / (1 - l))),
                    (i = Math.acos((h * Math.cos(o)) / Math.sqrt(1 - l * l))),
                    n < 0 && (i = -i),
                    (e = this.a * this.k0 * (i - this.lat0));
                } else {
                  var u = h * o,
                    c = Math.pow(u, 2),
                    m = this.ep2 * Math.pow(h, 2),
                    p = Math.tan(n),
                    f = Math.pow(p, 2);
                  i = 1 - this.es * Math.pow(r, 2);
                  var d = this.a / Math.sqrt(i),
                    _ = this.a * y(this.e0, this.e1, this.e2, this.e3, n);
                  (s =
                    this.k0 *
                      d *
                      u *
                      (1 +
                        (c / 6) *
                          (1 -
                            f +
                            m +
                            (c / 20) *
                              (5 -
                                18 * f +
                                Math.pow(f, 2) +
                                72 * m -
                                58 * this.ep2))) +
                    this.x0),
                    (e =
                      this.k0 *
                        (_ -
                          this.ml0 +
                          d *
                            p *
                            (c *
                              (0.5 +
                                (c / 24) *
                                  (5 -
                                    f +
                                    9 * m +
                                    4 * Math.pow(m, 2) +
                                    (c / 30) *
                                      (61 -
                                        58 * f +
                                        Math.pow(f, 2) +
                                        600 * m -
                                        330 * this.ep2))))) +
                      this.y0);
                }
                return (t.x = s), (t.y = e), t;
              }),
              (s.inverse = function(t) {
                var i, s, e, a, n, o;
                if (this.sphere) {
                  var r = Math.exp(t.x / (this.a * this.k0)),
                    h = 0.5 * (r - 1 / r),
                    l = this.lat0 + t.y / (this.a * this.k0),
                    u = Math.cos(l);
                  (i = Math.sqrt((1 - u * u) / (1 + h * h))),
                    (n = L(i)),
                    l < 0 && (n = -n),
                    (o =
                      0 == h && 0 === u
                        ? this.long0
                        : w(Math.atan2(h, u) + this.long0));
                } else {
                  var c = t.x - this.x0,
                    m = t.y - this.y0;
                  for (
                    s = i = (this.ml0 + m / this.k0) / this.a, a = 0;
                    (s += e =
                      (i +
                        this.e1 * Math.sin(2 * s) -
                        this.e2 * Math.sin(4 * s) +
                        this.e3 * Math.sin(6 * s)) /
                        this.e0 -
                      s),
                      !(Math.abs(e) <= 1e-10);
                    a++
                  )
                    if (6 <= a) return 95;
                  if (Math.abs(s) < P) {
                    var p = Math.sin(s),
                      f = Math.cos(s),
                      d = Math.tan(s),
                      _ = this.ep2 * Math.pow(f, 2),
                      y = Math.pow(_, 2),
                      g = Math.pow(d, 2),
                      M = Math.pow(g, 2);
                    i = 1 - this.es * Math.pow(p, 2);
                    var v = this.a / Math.sqrt(i),
                      b = (v * (1 - this.es)) / i,
                      x = c / (v * this.k0),
                      S = Math.pow(x, 2);
                    (n =
                      s -
                      ((v * d * S) / b) *
                        (0.5 -
                          (S / 24) *
                            (5 +
                              3 * g +
                              10 * _ -
                              4 * y -
                              9 * this.ep2 -
                              (S / 30) *
                                (61 +
                                  90 * g +
                                  298 * _ +
                                  45 * M -
                                  252 * this.ep2 -
                                  3 * y)))),
                      (o = w(
                        this.long0 +
                          (x *
                            (1 -
                              (S / 6) *
                                (1 +
                                  2 * g +
                                  _ -
                                  (S / 20) *
                                    (5 -
                                      2 * _ +
                                      28 * g -
                                      3 * y +
                                      8 * this.ep2 +
                                      24 * M)))) /
                            f
                      ));
                  } else (n = P * I(m)), (o = this.long0);
                }
                return (t.x = o), (t.y = n), t;
              }),
              (s.names = [
                "Transverse_Mercator",
                "Transverse Mercator",
                "tmerc"
              ]);
          },
          {
            "../common/adjust_lon": 5,
            "../common/asinz": 6,
            "../common/e0fn": 7,
            "../common/e1fn": 8,
            "../common/e2fn": 9,
            "../common/e3fn": 10,
            "../common/mlfn": 14,
            "../common/sign": 21
          }
        ],
        63: [
          function(t, i, s) {
            var e = t("./tmerc");
            (s.dependsOn = "tmerc"),
              (s.init = function() {
                this.zone &&
                  ((this.lat0 = 0),
                  (this.long0 =
                    0.017453292519943295 * (6 * Math.abs(this.zone) - 183)),
                  (this.x0 = 5e5),
                  (this.y0 = this.utmSouth ? 1e7 : 0),
                  (this.k0 = 0.9996),
                  e.init.apply(this),
                  (this.forward = e.forward),
                  (this.inverse = e.inverse));
              }),
              (s.names = ["Universal Transverse Mercator System", "utm"]);
          },
          { "./tmerc": 62 }
        ],
        64: [
          function(t, i, s) {
            var y = t("../common/adjust_lon"),
              g = Math.PI / 2,
              M = 1e-10,
              v = t("../common/asinz");
            (s.init = function() {
              this.R = this.a;
            }),
              (s.forward = function(t) {
                var i,
                  s,
                  e = t.x,
                  a = t.y,
                  n = y(e - this.long0);
                Math.abs(a) <= M && ((i = this.x0 + this.R * n), (s = this.y0));
                var o = v(2 * Math.abs(a / Math.PI));
                (Math.abs(n) <= M || Math.abs(Math.abs(a) - g) <= M) &&
                  ((i = this.x0),
                  (s =
                    0 <= a
                      ? this.y0 + Math.PI * this.R * Math.tan(0.5 * o)
                      : this.y0 + Math.PI * this.R * -Math.tan(0.5 * o)));
                var r = 0.5 * Math.abs(Math.PI / n - n / Math.PI),
                  h = r * r,
                  l = Math.sin(o),
                  u = Math.cos(o),
                  c = u / (l + u - 1),
                  m = c * c,
                  p = c * (2 / l - 1),
                  f = p * p,
                  d =
                    (Math.PI *
                      this.R *
                      (r * (c - f) +
                        Math.sqrt(h * (c - f) * (c - f) - (f + h) * (m - f)))) /
                    (f + h);
                n < 0 && (d = -d), (i = this.x0 + d);
                var _ = h + c;
                return (
                  (d =
                    (Math.PI *
                      this.R *
                      (p * _ - r * Math.sqrt((f + h) * (1 + h) - _ * _))) /
                    (f + h)),
                  (s = 0 <= a ? this.y0 + d : this.y0 - d),
                  (t.x = i),
                  (t.y = s),
                  t
                );
              }),
              (s.inverse = function(t) {
                var i, s, e, a, n, o, r, h, l, u, c, m;
                return (
                  (t.x -= this.x0),
                  (t.y -= this.y0),
                  (c = Math.PI * this.R),
                  (n = (e = t.x / c) * e + (a = t.y / c) * a),
                  (c =
                    (3 *
                      ((a * a) /
                        (h =
                          -2 * (o = -Math.abs(a) * (1 + n)) +
                          1 +
                          2 * a * a +
                          n * n) +
                        ((2 * (r = o - 2 * a * a + e * e) * r * r) / h / h / h -
                          (9 * o * r) / h / h) /
                          27)) /
                    (l = (o - (r * r) / 3 / h) / h) /
                    (u = 2 * Math.sqrt(-l / 3))),
                  1 < Math.abs(c) && (c = 0 <= c ? 1 : -1),
                  (m = Math.acos(c) / 3),
                  (s =
                    0 <= t.y
                      ? (-u * Math.cos(m + Math.PI / 3) - r / 3 / h) * Math.PI
                      : -(-u * Math.cos(m + Math.PI / 3) - r / 3 / h) *
                        Math.PI),
                  (i =
                    Math.abs(e) < M
                      ? this.long0
                      : y(
                          this.long0 +
                            (Math.PI *
                              (n -
                                1 +
                                Math.sqrt(1 + 2 * (e * e - a * a) + n * n))) /
                              2 /
                              e
                        )),
                  (t.x = i),
                  (t.y = s),
                  t
                );
              }),
              (s.names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]);
          },
          { "../common/adjust_lon": 5, "../common/asinz": 6 }
        ],
        65: [
          function(t, i, s) {
            var o = 0.017453292519943295,
              r = 57.29577951308232,
              h = t("./datum_transform"),
              l = t("./adjust_axis"),
              u = t("./Proj"),
              c = t("./common/toPoint");
            i.exports = function t(i, s, e) {
              function a(t, i) {
                return (
                  (1 === t.datum.datum_type || 2 === t.datum.datum_type) &&
                  "WGS84" !== i.datumCode
                );
              }
              var n;
              return (
                Array.isArray(e) && (e = c(e)),
                i.datum &&
                  s.datum &&
                  (a(i, s) || a(s, i)) &&
                  (t(i, (n = new u("WGS84")), e), (i = n)),
                "enu" !== i.axis && l(i, !1, e),
                "longlat" === i.projName
                  ? ((e.x *= o), (e.y *= o))
                  : (i.to_meter && ((e.x *= i.to_meter), (e.y *= i.to_meter)),
                    i.inverse(e)),
                i.from_greenwich && (e.x += i.from_greenwich),
                (e = h(i.datum, s.datum, e)),
                s.from_greenwich && (e.x -= s.from_greenwich),
                "longlat" === s.projName
                  ? ((e.x *= r), (e.y *= r))
                  : (s.forward(e),
                    s.to_meter && ((e.x /= s.to_meter), (e.y /= s.to_meter))),
                "enu" !== s.axis && l(s, !0, e),
                e
              );
            };
          },
          {
            "./Proj": 2,
            "./adjust_axis": 3,
            "./common/toPoint": 23,
            "./datum_transform": 31
          }
        ],
        66: [
          function(t, i, s) {
            function e(t, i, s) {
              t[i] = s
                .map(function(t) {
                  var i = {};
                  return o(t, i), i;
                })
                .reduce(function(t, i) {
                  return h(t, i);
                }, {});
            }
            function o(t, i) {
              var s;
              return Array.isArray(t)
                ? ("PARAMETER" === (s = t.shift()) && (s = t.shift()),
                  void (1 === t.length
                    ? Array.isArray(t[0])
                      ? ((i[s] = {}), o(t[0], i[s]))
                      : (i[s] = t[0])
                    : t.length
                    ? "TOWGS84" === s
                      ? (i[s] = t)
                      : ((i[s] = {}),
                        -1 < ["UNIT", "PRIMEM", "VERT_DATUM"].indexOf(s)
                          ? ((i[s] = {
                              name: t[0].toLowerCase(),
                              convert: t[1]
                            }),
                            3 === t.length && (i[s].auth = t[2]))
                          : "SPHEROID" === s
                          ? ((i[s] = { name: t[0], a: t[1], rf: t[2] }),
                            4 === t.length && (i[s].auth = t[3]))
                          : -1 <
                            [
                              "GEOGCS",
                              "GEOCCS",
                              "DATUM",
                              "VERT_CS",
                              "COMPD_CS",
                              "LOCAL_CS",
                              "FITTED_CS",
                              "LOCAL_DATUM"
                            ].indexOf(s)
                          ? ((t[0] = ["name", t[0]]), e(i, s, t))
                          : t.every(function(t) {
                              return Array.isArray(t);
                            })
                          ? e(i, s, t)
                          : o(t, i[s]))
                    : (i[s] = !0)))
                : void (i[t] = !0);
            }
            function a(t) {
              return t * n;
            }
            function r(n) {
              function t(t) {
                var i = n.to_meter || 1;
                return parseFloat(t, 10) * i;
              }
              "GEOGCS" === n.type
                ? (n.projName = "longlat")
                : "LOCAL_CS" === n.type
                ? ((n.projName = "identity"), (n.local = !0))
                : "object" == typeof n.PROJECTION
                ? (n.projName = Object.keys(n.PROJECTION)[0])
                : (n.projName = n.PROJECTION),
                n.UNIT &&
                  ((n.units = n.UNIT.name.toLowerCase()),
                  "metre" === n.units && (n.units = "meter"),
                  n.UNIT.convert &&
                    ("GEOGCS" === n.type
                      ? n.DATUM &&
                        n.DATUM.SPHEROID &&
                        (n.to_meter =
                          parseFloat(n.UNIT.convert, 10) * n.DATUM.SPHEROID.a)
                      : (n.to_meter = parseFloat(n.UNIT.convert, 10)))),
                n.GEOGCS &&
                  (n.GEOGCS.DATUM
                    ? (n.datumCode = n.GEOGCS.DATUM.name.toLowerCase())
                    : (n.datumCode = n.GEOGCS.name.toLowerCase()),
                  "d_" === n.datumCode.slice(0, 2) &&
                    (n.datumCode = n.datumCode.slice(2)),
                  ("new_zealand_geodetic_datum_1949" !== n.datumCode &&
                    "new_zealand_1949" !== n.datumCode) ||
                    (n.datumCode = "nzgd49"),
                  "wgs_1984" === n.datumCode &&
                    ("Mercator_Auxiliary_Sphere" === n.PROJECTION &&
                      (n.sphere = !0),
                    (n.datumCode = "wgs84")),
                  "_ferro" === n.datumCode.slice(-6) &&
                    (n.datumCode = n.datumCode.slice(0, -6)),
                  "_jakarta" === n.datumCode.slice(-8) &&
                    (n.datumCode = n.datumCode.slice(0, -8)),
                  ~n.datumCode.indexOf("belge") && (n.datumCode = "rnb72"),
                  n.GEOGCS.DATUM &&
                    n.GEOGCS.DATUM.SPHEROID &&
                    ((n.ellps = n.GEOGCS.DATUM.SPHEROID.name
                      .replace("_19", "")
                      .replace(/[Cc]larke\_18/, "clrk")),
                    "international" === n.ellps.toLowerCase().slice(0, 13) &&
                      (n.ellps = "intl"),
                    (n.a = n.GEOGCS.DATUM.SPHEROID.a),
                    (n.rf = parseFloat(n.GEOGCS.DATUM.SPHEROID.rf, 10))),
                  ~n.datumCode.indexOf("osgb_1936") &&
                    (n.datumCode = "osgb36")),
                n.b && !isFinite(n.b) && (n.b = n.a);
              [
                ["standard_parallel_1", "Standard_Parallel_1"],
                ["standard_parallel_2", "Standard_Parallel_2"],
                ["false_easting", "False_Easting"],
                ["false_northing", "False_Northing"],
                ["central_meridian", "Central_Meridian"],
                ["latitude_of_origin", "Latitude_Of_Origin"],
                ["latitude_of_origin", "Central_Parallel"],
                ["scale_factor", "Scale_Factor"],
                ["k0", "scale_factor"],
                ["latitude_of_center", "Latitude_of_center"],
                ["lat0", "latitude_of_center", a],
                ["longitude_of_center", "Longitude_Of_Center"],
                ["longc", "longitude_of_center", a],
                ["x0", "false_easting", t],
                ["y0", "false_northing", t],
                ["long0", "central_meridian", a],
                ["lat0", "latitude_of_origin", a],
                ["lat0", "standard_parallel_1", a],
                ["lat1", "standard_parallel_1", a],
                ["lat2", "standard_parallel_2", a],
                ["alpha", "azimuth", a],
                ["srsCode", "name"]
              ].forEach(function(t) {
                return (
                  (i = n),
                  (e = (s = t)[0]),
                  (a = s[1]),
                  void (
                    !(e in i) &&
                    a in i &&
                    ((i[e] = i[a]), 3 === s.length && (i[e] = s[2](i[e])))
                  )
                );
                var i, s, e, a;
              }),
                n.long0 ||
                  !n.longc ||
                  ("Albers_Conic_Equal_Area" !== n.projName &&
                    "Lambert_Azimuthal_Equal_Area" !== n.projName) ||
                  (n.long0 = n.longc),
                n.lat_ts ||
                  !n.lat1 ||
                  ("Stereographic_South_Pole" !== n.projName &&
                    "Polar Stereographic (variant B)" !== n.projName) ||
                  ((n.lat0 = a(0 < n.lat1 ? 90 : -90)), (n.lat_ts = n.lat1));
            }
            var n = 0.017453292519943295,
              h = t("./extend");
            i.exports = function(t, i) {
              var s = JSON.parse(
                  ("," + t)
                    .replace(/\s*\,\s*([A-Z_0-9]+?)(\[)/g, ',["$1",')
                    .slice(1)
                    .replace(/\s*\,\s*([A-Z_0-9]+?)\]/g, ',"$1"]')
                    .replace(/,\["VERTCS".+/, "")
                ),
                e = s.shift(),
                a = s.shift();
              s.unshift(["name", a]),
                s.unshift(["type", e]),
                s.unshift("output");
              var n = {};
              return o(s, n), r(n.output), h(i, n.output);
            };
          },
          { "./extend": 34 }
        ],
        67: [
          function(t, i, s) {
            function y(t) {
              return t * (Math.PI / 180);
            }
            function S(t) {
              return (t / Math.PI) * 180;
            }
            function w(t) {
              var i = t.northing,
                s = t.easting,
                e = t.zoneLetter,
                a = t.zoneNumber;
              if (a < 0 || 60 < a) return null;
              var n,
                o,
                r,
                h,
                l,
                u,
                c,
                m,
                p,
                f = 6378137,
                d = 0.00669438,
                _ = (1 - Math.sqrt(1 - d)) / (1 + Math.sqrt(1 - d)),
                y = s - 5e5,
                g = i;
              e < "N" && (g -= 1e7),
                (c = 6 * (a - 1) - 180 + 3),
                (n = d / (1 - d)),
                (p =
                  (m = g / 0.9996 / 6367449.145945056) +
                  ((3 * _) / 2 - (27 * _ * _ * _) / 32) * Math.sin(2 * m) +
                  ((21 * _ * _) / 16 - (55 * _ * _ * _ * _) / 32) *
                    Math.sin(4 * m) +
                  ((151 * _ * _ * _) / 96) * Math.sin(6 * m)),
                (o = f / Math.sqrt(1 - d * Math.sin(p) * Math.sin(p))),
                (r = Math.tan(p) * Math.tan(p)),
                (h = n * Math.cos(p) * Math.cos(p)),
                (l =
                  (f * (1 - d)) /
                  Math.pow(1 - d * Math.sin(p) * Math.sin(p), 1.5)),
                (u = y / (0.9996 * o));
              var M =
                p -
                ((o * Math.tan(p)) / l) *
                  ((u * u) / 2 -
                    ((5 + 3 * r + 10 * h - 4 * h * h - 9 * n) * u * u * u * u) /
                      24 +
                    ((61 +
                      90 * r +
                      298 * h +
                      45 * r * r -
                      252 * n -
                      3 * h * h) *
                      u *
                      u *
                      u *
                      u *
                      u *
                      u) /
                      720);
              M = S(M);
              var v,
                b =
                  (u -
                    ((1 + 2 * r + h) * u * u * u) / 6 +
                    ((5 - 2 * h + 28 * r - 3 * h * h + 8 * n + 24 * r * r) *
                      u *
                      u *
                      u *
                      u *
                      u) /
                      120) /
                  Math.cos(p);
              if (((b = c + S(b)), t.accuracy)) {
                var x = w({
                  northing: t.northing + t.accuracy,
                  easting: t.easting + t.accuracy,
                  zoneLetter: t.zoneLetter,
                  zoneNumber: t.zoneNumber
                });
                v = { top: x.lat, right: x.lon, bottom: M, left: b };
              } else v = { lat: M, lon: b };
              return v;
            }
            function e(t, i) {
              var s,
                e,
                a,
                n,
                o,
                r,
                h = "00000" + t.easting,
                l = "00000" + t.northing;
              return (
                t.zoneNumber +
                t.zoneLetter +
                ((s = t.easting),
                (e = t.northing),
                (a = t.zoneNumber),
                (n = g(a)),
                (o = Math.floor(s / 1e5)),
                (r = Math.floor(e / 1e5) % 20),
                (function(t, i, s) {
                  var e = s - 1,
                    a = v.charCodeAt(e),
                    n = b.charCodeAt(e),
                    o = a + t - 1,
                    r = n + i,
                    h = !1;
                  return (
                    C < o && ((o = o - C + x - 1), (h = !0)),
                    (o === P || (a < P && P < o) || ((P < o || a < P) && h)) &&
                      o++,
                    (o === I || (a < I && I < o) || ((I < o || a < I) && h)) &&
                      ++o === P &&
                      o++,
                    C < o && (o = o - C + x - 1),
                    (h = L < r && ((r = r - L + x - 1), !0)),
                    (r === P || (n < P && P < r) || ((P < r || n < P) && h)) &&
                      r++,
                    (r === I || (n < I && I < r) || ((I < r || n < I) && h)) &&
                      ++r === P &&
                      r++,
                    L < r && (r = r - L + x - 1),
                    String.fromCharCode(o) + String.fromCharCode(r)
                  );
                })(o, r, n)) +
                h.substr(h.length - 5, i) +
                l.substr(l.length - 5, i)
              );
            }
            function g(t) {
              var i = t % n;
              return 0 === i && (i = n), i;
            }
            function a(t) {
              if (t && 0 === t.length) throw "MGRSPoint coverting from nothing";
              for (
                var i, s = t.length, e = null, a = "", n = 0;
                !/[A-Z]/.test((i = t.charAt(n)));

              ) {
                if (2 <= n) throw "MGRSPoint bad conversion from: " + t;
                (a += i), n++;
              }
              var o = parseInt(a, 10);
              if (0 === n || s < n + 3)
                throw "MGRSPoint bad conversion from: " + t;
              var r = t.charAt(n++);
              if (
                r <= "A" ||
                "B" === r ||
                "Y" === r ||
                "Z" <= r ||
                "I" === r ||
                "O" === r
              )
                throw "MGRSPoint zone letter " + r + " not handled: " + t;
              e = t.substring(n, (n += 2));
              for (
                var h = g(o),
                  l = (function(t, i) {
                    for (
                      var s = v.charCodeAt(i - 1), e = 1e5, a = !1;
                      s !== t.charCodeAt(0);

                    ) {
                      if ((++s === P && s++, s === I && s++, C < s)) {
                        if (a) throw "Bad character: " + t;
                        (s = x), (a = !0);
                      }
                      e += 1e5;
                    }
                    return e;
                  })(e.charAt(0), h),
                  u = (function(t, i) {
                    if ("V" < t) throw "MGRSPoint given invalid Northing " + t;
                    for (
                      var s = b.charCodeAt(i - 1), e = 0, a = !1;
                      s !== t.charCodeAt(0);

                    ) {
                      if ((++s === P && s++, s === I && s++, L < s)) {
                        if (a) throw "Bad character: " + t;
                        (s = x), (a = !0);
                      }
                      e += 1e5;
                    }
                    return e;
                  })(e.charAt(1), h);
                u < M(r);

              )
                u += 2e6;
              var c = s - n;
              if (c % 2 != 0)
                throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" +
                  t;
              var m,
                p,
                f,
                d = c / 2,
                _ = 0,
                y = 0;
              return (
                0 < d &&
                  ((m = 1e5 / Math.pow(10, d)),
                  (p = t.substring(n, n + d)),
                  (_ = parseFloat(p) * m),
                  (f = t.substring(n + d)),
                  (y = parseFloat(f) * m)),
                {
                  easting: _ + l,
                  northing: y + u,
                  zoneLetter: r,
                  zoneNumber: o,
                  accuracy: m
                }
              );
            }
            function M(t) {
              var i;
              switch (t) {
                case "C":
                  i = 11e5;
                  break;
                case "D":
                  i = 2e6;
                  break;
                case "E":
                  i = 28e5;
                  break;
                case "F":
                  i = 37e5;
                  break;
                case "G":
                  i = 46e5;
                  break;
                case "H":
                  i = 55e5;
                  break;
                case "J":
                  i = 64e5;
                  break;
                case "K":
                  i = 73e5;
                  break;
                case "L":
                  i = 82e5;
                  break;
                case "M":
                  i = 91e5;
                  break;
                case "N":
                  i = 0;
                  break;
                case "P":
                  i = 8e5;
                  break;
                case "Q":
                  i = 17e5;
                  break;
                case "R":
                  i = 26e5;
                  break;
                case "S":
                  i = 35e5;
                  break;
                case "T":
                  i = 44e5;
                  break;
                case "U":
                  i = 53e5;
                  break;
                case "V":
                  i = 62e5;
                  break;
                case "W":
                  i = 7e6;
                  break;
                case "X":
                  i = 79e5;
                  break;
                default:
                  i = -1;
              }
              if (0 <= i) return i;
              throw "Invalid zone letter: " + t;
            }
            var n = 6,
              v = "AJSAJS",
              b = "AFAFAF",
              x = 65,
              P = 73,
              I = 79,
              L = 86,
              C = 90;
            (s.forward = function(t, i) {
              return (
                (i = i || 5),
                e(
                  (function(t) {
                    var i,
                      s,
                      e,
                      a,
                      n,
                      o,
                      r,
                      h = t.lat,
                      l = t.lon,
                      u = 0.00669438,
                      c = y(h),
                      m = y(l);
                    (r = Math.floor((l + 180) / 6) + 1),
                      180 === l && (r = 60),
                      56 <= h && h < 64 && 3 <= l && l < 12 && (r = 32),
                      72 <= h &&
                        h < 84 &&
                        (0 <= l && l < 9
                          ? (r = 31)
                          : 9 <= l && l < 21
                          ? (r = 33)
                          : 21 <= l && l < 33
                          ? (r = 35)
                          : 33 <= l && l < 42 && (r = 37)),
                      (o = y(6 * (r - 1) - 180 + 3)),
                      (i = u / (1 - u)),
                      (s =
                        6378137 / Math.sqrt(1 - u * Math.sin(c) * Math.sin(c))),
                      (e = Math.tan(c) * Math.tan(c)),
                      (a = i * Math.cos(c) * Math.cos(c));
                    var p,
                      f,
                      d =
                        0.9996 *
                          s *
                          ((n = Math.cos(c) * (m - o)) +
                            ((1 - e + a) * n * n * n) / 6 +
                            ((5 - 18 * e + e * e + 72 * a - 58 * i) *
                              n *
                              n *
                              n *
                              n *
                              n) /
                              120) +
                        5e5,
                      _ =
                        0.9996 *
                        (6378137 *
                          (0.9983242984503243 * c -
                            0.002514607064228144 * Math.sin(2 * c) +
                            2639046602129982e-21 * Math.sin(4 * c) -
                            ((35 * u * u * u) / 3072) * Math.sin(6 * c)) +
                          s *
                            Math.tan(c) *
                            ((n * n) / 2 +
                              ((5 - e + 9 * a + 4 * a * a) * n * n * n * n) /
                                24 +
                              ((61 - 58 * e + e * e + 600 * a - 330 * i) *
                                n *
                                n *
                                n *
                                n *
                                n *
                                n) /
                                720));
                    return (
                      h < 0 && (_ += 1e7),
                      {
                        northing: Math.round(_),
                        easting: Math.round(d),
                        zoneNumber: r,
                        zoneLetter:
                          ((f = "Z"),
                          (p = h) <= 84 && 72 <= p
                            ? (f = "X")
                            : p < 72 && 64 <= p
                            ? (f = "W")
                            : p < 64 && 56 <= p
                            ? (f = "V")
                            : p < 56 && 48 <= p
                            ? (f = "U")
                            : p < 48 && 40 <= p
                            ? (f = "T")
                            : p < 40 && 32 <= p
                            ? (f = "S")
                            : p < 32 && 24 <= p
                            ? (f = "R")
                            : p < 24 && 16 <= p
                            ? (f = "Q")
                            : p < 16 && 8 <= p
                            ? (f = "P")
                            : p < 8 && 0 <= p
                            ? (f = "N")
                            : p < 0 && -8 <= p
                            ? (f = "M")
                            : p < -8 && -16 <= p
                            ? (f = "L")
                            : p < -16 && -24 <= p
                            ? (f = "K")
                            : p < -24 && -32 <= p
                            ? (f = "J")
                            : p < -32 && -40 <= p
                            ? (f = "H")
                            : p < -40 && -48 <= p
                            ? (f = "G")
                            : p < -48 && -56 <= p
                            ? (f = "F")
                            : p < -56 && -64 <= p
                            ? (f = "E")
                            : p < -64 && -72 <= p
                            ? (f = "D")
                            : p < -72 && -80 <= p && (f = "C"),
                          f)
                      }
                    );
                  })({ lat: t[1], lon: t[0] }),
                  i
                )
              );
            }),
              (s.inverse = function(t) {
                var i = w(a(t.toUpperCase()));
                return i.lat && i.lon
                  ? [i.lon, i.lat, i.lon, i.lat]
                  : [i.left, i.bottom, i.right, i.top];
              }),
              (s.toPoint = function(t) {
                var i = w(a(t.toUpperCase()));
                return i.lat && i.lon
                  ? [i.lon, i.lat]
                  : [(i.left + i.right) / 2, (i.top + i.bottom) / 2];
              });
          },
          {}
        ],
        68: [
          function(t, i, s) {
            i.exports = {
              name: "proj4",
              version: "2.3.14",
              description:
                "Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",
              main: "lib/index.js",
              directories: { test: "test", doc: "docs" },
              scripts: {
                test:
                  "./node_modules/istanbul/lib/cli.js test ./node_modules/mocha/bin/_mocha test/test.js"
              },
              repository: {
                type: "git",
                url: "git://github.com/proj4js/proj4js.git"
              },
              author: "",
              license: "MIT",
              jam: {
                main: "dist/proj4.js",
                include: ["dist/proj4.js", "README.md", "AUTHORS", "LICENSE.md"]
              },
              devDependencies: {
                "grunt-cli": "~0.1.13",
                grunt: "~0.4.2",
                "grunt-contrib-connect": "~0.6.0",
                "grunt-contrib-jshint": "~0.8.0",
                chai: "~1.8.1",
                mocha: "~1.17.1",
                "grunt-mocha-phantomjs": "~0.4.0",
                browserify: "~12.0.1",
                "grunt-browserify": "~4.0.1",
                "grunt-contrib-uglify": "~0.11.1",
                curl: "git://github.com/cujojs/curl.git",
                istanbul: "~0.2.4",
                tin: "~0.4.0"
              },
              dependencies: { mgrs: "~0.0.2" }
            };
          },
          {}
        ],
        "./includedProjections": [
          function(t, i, s) {
            i.exports = t("hTEDpn");
          },
          {}
        ],
        hTEDpn: [
          function(t, i, s) {
            var e = [
              t("./lib/projections/tmerc"),
              t("./lib/projections/utm"),
              t("./lib/projections/sterea"),
              t("./lib/projections/stere"),
              t("./lib/projections/somerc"),
              t("./lib/projections/omerc"),
              t("./lib/projections/lcc"),
              t("./lib/projections/krovak"),
              t("./lib/projections/cass"),
              t("./lib/projections/laea"),
              t("./lib/projections/aea"),
              t("./lib/projections/gnom"),
              t("./lib/projections/cea"),
              t("./lib/projections/eqc"),
              t("./lib/projections/poly"),
              t("./lib/projections/nzmg"),
              t("./lib/projections/mill"),
              t("./lib/projections/sinu"),
              t("./lib/projections/moll"),
              t("./lib/projections/eqdc"),
              t("./lib/projections/vandg"),
              t("./lib/projections/aeqd")
            ];
            i.exports = function(i) {
              e.forEach(function(t) {
                i.Proj.projections.add(t);
              });
            };
          },
          {
            "./lib/projections/aea": 40,
            "./lib/projections/aeqd": 41,
            "./lib/projections/cass": 42,
            "./lib/projections/cea": 43,
            "./lib/projections/eqc": 44,
            "./lib/projections/eqdc": 45,
            "./lib/projections/gnom": 47,
            "./lib/projections/krovak": 48,
            "./lib/projections/laea": 49,
            "./lib/projections/lcc": 50,
            "./lib/projections/mill": 53,
            "./lib/projections/moll": 54,
            "./lib/projections/nzmg": 55,
            "./lib/projections/omerc": 56,
            "./lib/projections/poly": 57,
            "./lib/projections/sinu": 58,
            "./lib/projections/somerc": 59,
            "./lib/projections/stere": 60,
            "./lib/projections/sterea": 61,
            "./lib/projections/tmerc": 62,
            "./lib/projections/utm": 63,
            "./lib/projections/vandg": 64
          }
        ]
      },
      {},
      [36]
    )(36);
  }),
  (function(t) {
    var i, s;
    if ("function" == typeof define && define.amd)
      define(["lib/proj4leaflet", "proj4"], t);
    else if ("object" == typeof module && "object" == typeof module.exports)
      (i = require("lib/proj4leaflet")),
        (s = require("proj4")),
        (module.exports = t(i, s));
    else {
      if (void 0 === window.L || void 0 === window.proj4)
        throw new Error("Leaflet and proj4 must be loaded first");
      t(window.L, window.proj4);
    }
  })(function(o, e) {
    return (
      (o.Proj = {}),
      (o.Proj._isProj4Obj = function(t) {
        return void 0 !== t.inverse && void 0 !== t.forward;
      }),
      (o.Proj.Projection = o.Class.extend({
        initialize: function(t, i, s) {
          var e = o.Proj._isProj4Obj(t);
          (this._proj = e ? t : this._projFromCodeDef(t, i)),
            (this.bounds = e ? i : s);
        },
        project: function(t) {
          var i = this._proj.forward([t.lng, t.lat]);
          return new o.Point(i[0], i[1]);
        },
        unproject: function(t, i) {
          var s = this._proj.inverse([t.x, t.y]);
          return new o.LatLng(s[1], s[0], i);
        },
        _projFromCodeDef: function(t, i) {
          if (i) e.defs(t, i);
          else if (void 0 === e.defs[t]) {
            var s = t.split(":");
            if (
              (3 < s.length && (t = s[s.length - 3] + ":" + s[s.length - 1]),
              void 0 === e.defs[t])
            )
              throw new Error("No projection definition for code " + t);
          }
          return e(t);
        }
      })),
      (o.Proj.CRS = o.Class.extend({
        includes: o.CRS,
        options: { transformation: new o.Transformation(1, 0, -1, 0) },
        initialize: function(t, i, s) {
          var e, a;
          if (
            (o.Proj._isProj4Obj(t)
              ? ((e = t.srsCode),
                (a = i || {}),
                (this.projection = new o.Proj.Projection(t, a.bounds)))
              : ((e = t),
                (a = s || {}),
                (this.projection = new o.Proj.Projection(e, i, a.bounds))),
            o.Util.setOptions(this, a),
            (this.code = e),
            (this.transformation = this.options.transformation),
            this.options.origin &&
              (this.transformation = new o.Transformation(
                1,
                -this.options.origin[0],
                -1,
                this.options.origin[1]
              )),
            this.options.scales)
          )
            this._scales = this.options.scales;
          else if (this.options.resolutions) {
            this._scales = [];
            for (var n = this.options.resolutions.length - 1; 0 <= n; n--)
              this.options.resolutions[n] &&
                (this._scales[n] = 1 / this.options.resolutions[n]);
          }
          this.infinite = !this.options.bounds;
        },
        scale: function(t) {
          var i,
            s = Math.floor(t);
          return t === s
            ? this._scales[t]
            : (i = this._scales[s]) + (this._scales[s + 1] - i) * (t - s);
        },
        zoom: function(t) {
          var i,
            s,
            e = this._closestElement(this._scales, t),
            a = this._scales.indexOf(e);
          return t === e
            ? a
            : ((s = a + 1),
              void 0 === (i = this._scales[s]) ? 1 / 0 : (t - e) / (i - e) + a);
        },
        _closestElement: function(t, i) {
          for (var s, e = t.length; e--; )
            t[e] <= i && (void 0 === s || s < t[e]) && (s = t[e]);
          return s;
        }
      })),
      (o.Proj.GeoJSON = o.GeoJSON.extend({
        initialize: function(t, i) {
          (this._callLevel = 0),
            o.GeoJSON.prototype.initialize.call(this, t, i);
        },
        addData: function(t) {
          var s;
          t &&
            (t.crs && "name" === t.crs.type
              ? (s = new o.Proj.CRS(t.crs.properties.name))
              : t.crs &&
                t.crs.type &&
                (s = new o.Proj.CRS(t.crs.type + ":" + t.crs.properties.code)),
            void 0 !== s &&
              (this.options.coordsToLatLng = function(t) {
                var i = o.point(t[0], t[1]);
                return s.projection.unproject(i);
              })),
            this._callLevel++;
          try {
            o.GeoJSON.prototype.addData.call(this, t);
          } finally {
            this._callLevel--,
              0 === this._callLevel && delete this.options.coordsToLatLng;
          }
        }
      })),
      (o.Proj.geoJson = function(t, i) {
        return new o.Proj.GeoJSON(t, i);
      }),
      (o.Proj.ImageOverlay = o.ImageOverlay.extend({
        initialize: function(t, i, s) {
          o.ImageOverlay.prototype.initialize.call(this, t, null, s),
            (this._projectedBounds = i);
        },
        _animateZoom: function(t) {
          var i = this._map.getZoomScale(t.zoom),
            s = o.point(
              this._projectedBounds.min.x,
              this._projectedBounds.max.y
            ),
            e = this._projectedToNewLayerPoint(s, t.zoom, t.center);
          o.DomUtil.setTransform(this._image, e, i);
        },
        _reset: function() {
          var t = this._map.getZoom(),
            i = this._map.getPixelOrigin(),
            s = o.bounds(
              this._transform(this._projectedBounds.min, t)._subtract(i),
              this._transform(this._projectedBounds.max, t)._subtract(i)
            ),
            e = s.getSize();
          o.DomUtil.setPosition(this._image, s.min),
            (this._image.style.width = e.x + "px"),
            (this._image.style.height = e.y + "px");
        },
        _projectedToNewLayerPoint: function(t, i, s) {
          var e = this._map.getSize()._divideBy(2),
            a = this._map
              .project(s, i)
              ._subtract(e)
              ._round()
              .add(this._map._getMapPanePos());
          return this._transform(t, i)._subtract(a);
        },
        _transform: function(t, i) {
          var s = this._map.options.crs,
            e = s.transformation,
            a = s.scale(i);
          return e.transform(t, a);
        }
      })),
      (o.Proj.imageOverlay = function(t, i, s) {
        return new o.Proj.ImageOverlay(t, i, s);
      }),
      o.Proj
    );
  });
var BaseMap = BaseClass.extend({
  options: {
    name: "BaseMap",
    boxId: "mapDiv",
    crs: "EPSG:4326",
    crsProj4: "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
    res: [
      0.011897305029151402,
      0.005948652514575701,
      0.0029743262572878505,
      0.00237946100583028,
      0.0017845957543727103,
      0.00118973050291514,
      0.00059486525145757,
      0.000297432625728785,
      0.00015228550437313792,
      7614275218656896e-20,
      3807137609328448e-20,
      1903568804664224e-20,
      951784402332112e-20,
      475892201166056e-20
    ],
    mapCenter: [-400, 400],
    bounds: L.bounds(
      [108.78580000000005, 24.639200000000073],
      [114.25500000000011, 30.128400000000056]
    ),
    scaleDenominators: [
      5e6,
      25e5,
      125e4,
      1e6,
      75e4,
      5e5,
      25e4,
      125e3,
      64e3,
      32e3,
      16e3,
      8e3,
      4e3,
      2e3
    ],
    url:
      "http://192.168.66.166:6080/arcgis/rest/services/HN_BaseMap/MapServer/",
    boxCenter: [27.4, 111],
    zoom: 1,
    maxZoom: 13
  },
  loadBaseMap: function() {
    var t = this.options,
      i = new L.Proj.CRS(t.crs, null, {
        resolutions: t.res,
        origin: t.mapCenter,
        bounds: t.bounds,
        scaleDenominators: t.scaleDenominators
      });
    i.distance = function(t, i) {
      return t.distanceTo(i) / 1e3 / 100;
    };
    var s = L.DomUtil.get(this.options.boxId);
    s && (s._leaflet_id = null);
    var e = L.esri.tiledMapLayer({ url: t.url }),
      a = L.map(this.options.boxId, {
        crs: i,
        center: t.boxCenter,
        zoom: t.zoom,
        layers: [e],
        maxZoom: t.maxZoom,
        zoomControl: !0,
        preferCanvas: !0,
        logoControl: !1,
        zoomAnimation: !0,
        attributionControl: !1
      });
    return a.zoomControl.setPosition("bottomright"), a;
  }
});

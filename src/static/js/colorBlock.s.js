var ColorBlock = BaseClass.extend({
  options: {
    name: "ColorBlock",
    level: null,
    data: null,
    callback: null,
    showName: !1
  },
  draw: function() {
    var s = this,
      i = s.options.level,
      e = s.options.data;
    null !== i && s.createColorLevel(i);
    var r = [],
      c = [];
    e &&
      ((document.getElementsByClassName(
        "leaflet-overlay-pane"
      )[0].style.zIndex = 701),
      e.forEach(function(t) {
        var l = s.createGraph(
            { hasnPolygon: !0, coordinates: t.coordinates, hasFilling: !0 },
            { fillColor: t.color, weight: 1 }
          ),
          o = [],
          n = t.center;
        if (
          (n && o.push(n),
          t.centers &&
            ((n = t.center = t.centers[0]),
            t.centers.forEach(function(e) {
              o.push(e);
            }),
            delete t.centers),
          !n)
        ) {
          var e = turf.centroid(l.toGeoJSON()).geometry.coordinates;
          (n = t.center = [e[1], e[0]]), o.push(n);
        }
        if (
          t.name,
          s.options.showName
        ) {
          var a = 12 * t.name.length;
          o.forEach(function(e) {
            var o = L.marker(e, {
              icon: L.divIcon({
                iconSize: 0,
                html:
                  '<span style="display: inline-block; color: #ccc; font-weight: 500; position: relative; text-align: center; transform: scale(1.2); top: -12.6px; width: ' +
                  a +
                  "px; left: -" +
                  a / 2 +
                  'px">' +
                  t.name +
                  "</span>"
              })
            });
            c.push(o);
          });
        }
        s.options.callback &&
          l.on("click", function(e) {
            this.openPopup(), s.options.callback(t, e);
          }),
          l.on("mouseover", function(e) {
            this.openPopup(n);
            var o = e.layer || e.target;
            (function(e) {
              var o = {
                fillColor: e.fillColor,
                color: e.color,
                weight: e.weight
              };
              l.on("mouseout", function(e) {
                this.closePopup(), (e.layer || e.target).setStyle(o);
              });
            })(o.options),
              o.setStyle({
                fillColor: "rgba(255,9,36,.5)",
                color: "rgba(240,83,79,.5)",
                weight: 1
              });
          }),
          r.push(l);
      })),
      s.cacheMap("ColorBlock.S." + s.options.key, r),
      s.cacheMap("ColorBlock.S.showName." + s.options.key, c);
  },
  createColorLevel: function(e) {
    var o = document.getElementsByClassName("color-level");
    if (0 === o.length) {
      (o = document.createElement("div")).setAttribute("class", "color-level"),
        (e = e.reverse());
      for (var t = 0; t < e.length; t++) {
        var l = e[t],
          n = document.createElement("div");
        n.setAttribute("class", "color-level-line");
        var a = document.createElement("span");
        a.setAttribute("class", "color"),
          (a.style.backgroundColor = l[2]),
          n.appendChild(a);
        var s = document.createElement("span");
        s.setAttribute("class", "word"),
          l[0] === l[1]
            ? (s.innerText = "≥ " + l[0])
            : (s.innerText = l[0] + " ~ " + l[1]),
          n.appendChild(s),
          o.appendChild(n);
      }
      this.options.baseMap._container.appendChild(o);
    }
  },
  getColorByLevel: function(e, o) {
    if (null === e) return "rgba(0, 0, 255, 0)";
    for (var t = "#f0534f", l = 0; l < e.length; l++) {
      var n = e[l];
      if (n[0] <= o && (n[0] === n[1] || o < n[1])) {
        t = n[2];
        break;
      }
    }
    return t;
  },
  show: function() {
    this.add("ColorBlock.S." + this.options.key),
      this.options.showName &&
        this.add("ColorBlock.S.showName." + this.options.key),
      null !== this.options.level &&
        (document.getElementsByClassName("color-level")[0].style.display =
          "block");
  },
  hide: function() {
    this.del("ColorBlock.S." + this.options.key),
      this.options.showName &&
        this.del("ColorBlock.S.showName." + this.options.key),
      null !== this.options.level &&
        (document.getElementsByClassName("color-level")[0].style.display =
          "none");
  }
});

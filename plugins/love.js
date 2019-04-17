if (process.client) {
  !(function(e, t, a) {
    function n() {
        o(),
        r();
    }
    function r() {
      for (var e = 0; e < d.length; e++)
        d[e].alpha <= 0
          ? (t.body.removeChild(d[e].el), d.splice(e, 1))
          : (d[e].y--,
            (d[e].scale += 0.004),
            (d[e].alpha -= 0.013),
            (d[e].el.style.cssText =
              "left:" +
              d[e].x +
              "px;top:" +
              d[e].y +
              "px;opacity:" +
              d[e].alpha +
              ";transform:scale(" +
              d[e].scale +
              "," +
              d[e].scale +
              ") rotate(45deg);background:" +
              d[e].color +
              ";z-index:99999"));
      requestAnimationFrame(r);
    }
    function o() {
      var t = "function" == typeof e.onclick && e.onclick;
      e.onclick = function(e) {
        t && t(), i(e);
      };
    }
    function i(e) {
      var a = t.createElement("div");
      (a.className = "heart"),
        d.push({
          el: a,
          x: e.clientX - 5,
          y: e.clientY - 5,
          scale: 1,
          alpha: 1,
          color: s()
        }),
        t.body.appendChild(a);
    }
    function s() {
      return (
        "rgb(" +
        ~~(255 * Math.random()) +
        "," +
        ~~(255 * Math.random()) +
        "," +
        ~~(255 * Math.random()) +
        ")"
      );
    }
    var d = [];
    (e.requestAnimationFrame = (function() {
      return (
        e.requestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        e.mozRequestAnimationFrame ||
        e.oRequestAnimationFrame ||
        e.msRequestAnimationFrame ||
        function(e) {
          setTimeout(e, 1e3 / 60);
        }
      );
    })()),
      n();
  })(window, document);
}

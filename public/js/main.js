(function() {
  var center, el, elements, full, insideWidth, width, _i, _len;

  elements = document.getElementsByClassName('center');

  width = function(el, p, m) {
    var h, style;
    style = window.getComputedStyle(el, null);
    h = style ? parseInt(style.getPropertyValue("width")) : 0;
    if (m) {
      h += parseInt(style.getPropertyValue("margin-left"));
      h += parseInt(style.getPropertyValue("margin-right"));
    }
    if (p) {
      h += parseInt(style.getPropertyValue("padding-left"));
      h += parseInt(style.getPropertyValue("padding-right"));
    }
    return h;
  };

  insideWidth = function(el) {
    var child, w, _i, _len, _ref;
    w = 0;
    _ref = el.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      w += width(child, true, true);
    }
    return w;
  };

  center = function(c) {
    return c.style.paddingLeft = ((width(c, true) - insideWidth(c)) / 2) + "px";
  };

  full = function(el) {
    el.style.height = window.innerHeight + "px";
    return el.style.width = window.outerWidth + "px";
  };

  for (_i = 0, _len = elements.length; _i < _len; _i++) {
    el = elements[_i];
    center(el);
  }

  full(document.getElementById('background'));

}).call(this);

(function() {
  var js;

  js = ["http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"];

  require(js, function() {
    return $(function() {
      return console.log('jquery loaded, dom ready');
    });
  });

}).call(this);

(function() {
  var borderH, borderW, center, centered, currentPage, fLink, fLinks, footer, full, fullEl, fullwEl, getLink, getStyle, height, i, insideWidth, linkClick, links, lnk, main, n, nPages, nav, pageInit, pages, scrollHandler, totalHeight, width, _i, _j, _len, _len1;

  getStyle = function(stl, prop) {
    if (stl) {
      return parseInt(stl.getPropertyValue(prop));
    } else {
      return 0;
    }
  };

  borderW = function(el, m, p) {
    var stl, w;
    stl = window.getComputedStyle(el, null);
    w = 0;
    if (typeof p === 'undefined') {
      w += getStyle(stl, "padding-right");
      w += getStyle(stl, "padding-left");
    }
    if (m) {
      w += getStyle(stl, "margin-right");
      w += getStyle(stl, "margin-left");
    }
    return w;
  };

  borderH = function(el, m) {
    var h, stl;
    stl = window.getComputedStyle(el, null);
    h = getStyle(stl, "padding-top");
    h += getStyle(stl, "padding-bottom");
    if (m) {
      h += getStyle(stl, "margin-top");
      h += getStyle(stl, "margin-bottom");
    }
    return h;
  };

  width = function(el) {
    return getStyle(window.getComputedStyle(el, null), "width");
  };

  height = function(el) {
    return getStyle(window.getComputedStyle(el, null), "height");
  };

  insideWidth = function(el) {
    var child, w, _i, _len, _ref;
    w = 0;
    _ref = el.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      w += width(child) + borderW(child, true);
    }
    return w;
  };

  full = function(el, w, h) {
    var newH, newW;
    if (h) {
      newH = window.innerHeight - borderH(el);
      if (height(el) < newH) {
        el.style.height = newH + "px";
      }
    }
    if (w) {
      newW = window.innerWidth - borderW(el);
      if (width(el) < newW) {
        return el.style.width = newW + "px";
      }
    }
  };

  center = function(c) {
    var p;
    c.style.paddingLeft = 0;
    c.style.paddingRight = 0;
    p = (width(c) - insideWidth(c)) / 2;
    c.style.paddingLeft = p + "px";
    return p;
  };

  pages = [];

  nPages = 0;

  totalHeight = 0;

  pageInit = function() {
    var h, page, ps, _i, _len, _results;
    ps = document.getElementsByClassName('page');
    nPages = ps.length;
    totalHeight = 0;
    _results = [];
    for (_i = 0, _len = ps.length; _i < _len; _i++) {
      page = ps[_i];
      h = height(page) + borderH(page, true);
      totalHeight += h;
      _results.push(pages.push({
        el: page,
        h: h,
        cumH: totalHeight
      }));
    }
    return _results;
  };

  currentPage = function() {
    var n, page, y, _i, _len;
    n = 0;
    y = window.scrollY;
    for (_i = 0, _len = pages.length; _i < _len; _i++) {
      page = pages[_i];
      if (y > page.h) {
        break;
      }
      n++;
    }
    return n;
  };

  pageInit();

  nav = document.getElementsByTagName('nav')[0];

  getLink = function(lst) {
    var l, lnk, ls, _i, _len;
    ls = [];
    for (_i = 0, _len = lst.length; _i < _len; _i++) {
      l = lst[_i];
      lnk = l.children[0];
      if (lnk) {
        ls.push(lnk);
      }
    }
    return ls;
  };

  links = getLink(document.getElementsByClassName('navItem'));

  footer = document.getElementsByTagName('footer')[0];

  fLinks = getLink(document.getElementsByClassName('footerItem'));

  n = 0;

  scrollHandler = function(e) {
    var fh, id, m, next, prev, y;
    m = n;
    y = Math.max(window.scrollY, 0);
    prev = n < 1 ? 0 : pages[n - 1].cumH;
    next = pages[n].cumH;
    if (y > next) {
      n += 1;
    }
    if (y < prev) {
      n -= 1;
    }
    nav.style.display = 'block';
    if (n >= nPages) {
      fh = next + height(footer) + borderH(footer, true);
      if (y > fh) {
        nav.style.display = 'none';
      }
      n--;
      return;
    }
    if (!(m === n)) {
      links[m].className = "";
      links[n].className = "selected";
      if (n === 0) {
        nav.style.position = 'absolute';
        nav.style.paddingTop = "40px";
      }
      if (m === 0) {
        nav.style.position = 'fixed';
        nav.style.paddingTop = "10px";
      }
      id = window.location.pathname;
      id += links[n].getAttribute('href').substr(1);
      return window.history.replaceState({
        home: id
      }, "page " + n, id);
    }
  };

  linkClick = function(link, l_n) {
    return link.onclick = function(e) {
      e.preventDefault();
      e.returnValue = false;
      if (!(l_n === n)) {
        return pages[l_n].el.scrollIntoView();
      }
    };
  };

  for (i = _i = 0, _len = links.length; _i < _len; i = ++_i) {
    lnk = links[i];
    linkClick(lnk, i);
  }

  for (i = _j = 0, _len1 = fLinks.length; _j < _len1; i = ++_j) {
    fLink = fLinks[i];
    linkClick(fLink, i);
  }

  centered = document.getElementsByClassName('center');

  fullEl = document.getElementsByClassName('full2');

  fullwEl = document.getElementsByClassName('full_w');

  main = function() {
    var el, _k, _l, _len2, _len3, _len4, _m;
    for (_k = 0, _len2 = fullEl.length; _k < _len2; _k++) {
      el = fullEl[_k];
      full(el, true, true);
    }
    for (_l = 0, _len3 = fullwEl.length; _l < _len3; _l++) {
      el = fullwEl[_l];
      full(el, true, false);
    }
    for (_m = 0, _len4 = centered.length; _m < _len4; _m++) {
      el = centered[_m];
      center(el);
    }
    pageInit();
    return true;
  };

  main();

  scrollHandler();

  window.onresize = main;

  window.addEventListener('scroll', scrollHandler, false);

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

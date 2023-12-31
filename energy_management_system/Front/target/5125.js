"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[5125],{

/***/ 35125:
/*!**************************************************************!*\
  !*** ./node_modules/ionicons/dist/esm-es5/ion-icon.entry.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ion_icon": () => (/* binding */ Icon)
/* harmony export */ });
/* harmony import */ var _index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-5514a13d.js */ 81367);
/* harmony import */ var _utils_ccb924b9_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils-ccb924b9.js */ 79671);


var validateContent = function (e) {
  var t = document.createElement("div");
  t.innerHTML = e;
  for (var i = t.childNodes.length - 1; i >= 0; i--) {
    if (t.childNodes[i].nodeName.toLowerCase() !== "svg") {
      t.removeChild(t.childNodes[i]);
    }
  }
  var o = t.firstElementChild;
  if (o && o.nodeName.toLowerCase() === "svg") {
    var n = o.getAttribute("class") || "";
    o.setAttribute("class", (n + " s-ion-icon").trim());
    if (isValid(o)) {
      return t.innerHTML;
    }
  }
  return "";
};
var isValid = function (e) {
  if (e.nodeType === 1) {
    if (e.nodeName.toLowerCase() === "script") {
      return false;
    }
    for (var t = 0; t < e.attributes.length; t++) {
      var i = e.attributes[t].name;
      if ((0,_utils_ccb924b9_js__WEBPACK_IMPORTED_MODULE_0__.i)(i) && i.toLowerCase().indexOf("on") === 0) {
        return false;
      }
    }
    for (var t = 0; t < e.childNodes.length; t++) {
      if (!isValid(e.childNodes[t])) {
        return false;
      }
    }
  }
  return true;
};
var isSvgDataUrl = function (e) {
  return e.startsWith("data:image/svg+xml");
};
var isEncodedDataUrl = function (e) {
  return e.indexOf(";utf8,") !== -1;
};
var ioniconContent = new Map();
var requests = new Map();
var parser;
var getSvgContent = function (e, t) {
  var i = requests.get(e);
  if (!i) {
    if (typeof fetch !== "undefined" && typeof document !== "undefined") {
      if (isSvgDataUrl(e) && isEncodedDataUrl(e)) {
        if (!parser) {
          parser = new DOMParser();
        }
        var o = parser.parseFromString(e, "text/html");
        var n = o.querySelector("svg");
        if (n) {
          ioniconContent.set(e, n.outerHTML);
        }
        return Promise.resolve();
      } else {
        i = fetch(e).then(function (i) {
          if (i.ok) {
            return i.text().then(function (i) {
              if (i && t !== false) {
                i = validateContent(i);
              }
              ioniconContent.set(e, i || "");
            });
          }
          ioniconContent.set(e, "");
        });
        requests.set(e, i);
      }
    } else {
      ioniconContent.set(e, "");
      return Promise.resolve();
    }
  }
  return i;
};
var iconCss = ":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;-webkit-box-sizing:content-box !important;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:32px;stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner,.ionicon,svg{display:block;height:100%;width:100%}:host(.flip-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.icon-small){font-size:18px !important}:host(.icon-large){font-size:32px !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}";
var Icon = function () {
  function e(e) {
    var t = this;
    (0,_index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__.r)(this, e);
    this.iconName = null;
    this.inheritedAttributes = {};
    this.isVisible = false;
    this.mode = getIonMode();
    this.lazy = false;
    this.sanitize = true;
    this.hasAriaHidden = function () {
      var e = t.el;
      return e.hasAttribute("aria-hidden") && e.getAttribute("aria-hidden") === "true";
    };
  }
  e.prototype.componentWillLoad = function () {
    this.inheritedAttributes = (0,_utils_ccb924b9_js__WEBPACK_IMPORTED_MODULE_0__.b)(this.el, ["aria-label"]);
  };
  e.prototype.connectedCallback = function () {
    var e = this;
    this.waitUntilVisible(this.el, "50px", function () {
      e.isVisible = true;
      e.loadIcon();
    });
  };
  e.prototype.disconnectedCallback = function () {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  };
  e.prototype.waitUntilVisible = function (e, t, i) {
    var o = this;
    if (this.lazy && typeof window !== "undefined" && window.IntersectionObserver) {
      var n = this.io = new window.IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          n.disconnect();
          o.io = undefined;
          i();
        }
      }, {
        rootMargin: t
      });
      n.observe(e);
    } else {
      i();
    }
  };
  e.prototype.loadIcon = function () {
    var e = this;
    if (this.isVisible) {
      var t = (0,_utils_ccb924b9_js__WEBPACK_IMPORTED_MODULE_0__.g)(this);
      if (t) {
        if (ioniconContent.has(t)) {
          this.svgContent = ioniconContent.get(t);
        } else {
          getSvgContent(t, this.sanitize).then(function () {
            return e.svgContent = ioniconContent.get(t);
          });
        }
      }
    }
    var i = this.iconName = (0,_utils_ccb924b9_js__WEBPACK_IMPORTED_MODULE_0__.c)(this.name, this.icon, this.mode, this.ios, this.md);
    if (i) {
      this.ariaLabel = i.replace(/\-/g, " ");
    }
  };
  e.prototype.render = function () {
    var e, t;
    var i = this,
      o = i.iconName,
      n = i.ariaLabel,
      r = i.el,
      s = i.inheritedAttributes;
    var a = this.mode || "md";
    var c = this.flipRtl || o && (o.indexOf("arrow") > -1 || o.indexOf("chevron") > -1) && this.flipRtl !== false;
    return (0,_index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__.h)(_index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__.H, Object.assign({
      "aria-label": n !== undefined && !this.hasAriaHidden() ? n : null,
      role: "img",
      class: Object.assign(Object.assign((e = {}, e[a] = true, e), createColorClasses(this.color)), (t = {}, t["icon-".concat(this.size)] = !!this.size, t["flip-rtl"] = !!c && (0,_utils_ccb924b9_js__WEBPACK_IMPORTED_MODULE_0__.d)(r), t))
    }, s), this.svgContent ? (0,_index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__.h)("div", {
      class: "icon-inner",
      innerHTML: this.svgContent
    }) : (0,_index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__.h)("div", {
      class: "icon-inner"
    }));
  };
  Object.defineProperty(e, "assetsDirs", {
    get: function () {
      return ["svg"];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "el", {
    get: function () {
      return (0,_index_5514a13d_js__WEBPACK_IMPORTED_MODULE_1__.a)(this);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e, "watchers", {
    get: function () {
      return {
        name: ["loadIcon"],
        src: ["loadIcon"],
        icon: ["loadIcon"],
        ios: ["loadIcon"],
        md: ["loadIcon"]
      };
    },
    enumerable: false,
    configurable: true
  });
  return e;
}();
var getIonMode = function () {
  return typeof document !== "undefined" && document.documentElement.getAttribute("mode") || "md";
};
var createColorClasses = function (e) {
  var t;
  return e ? (t = {
    "ion-color": true
  }, t["ion-color-".concat(e)] = true, t) : null;
};
Icon.style = iconCss;


/***/ })

}]);
//# sourceMappingURL=5125.js.map
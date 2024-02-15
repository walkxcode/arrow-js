/**
 * Project Name: ArrowJS
 * Name: Bjorn Lammers
 * Github: https://github.com/walkxcode/arrowjs
 */

/* Pass in (window, document, undefined) to have an unmodified version of the variable in our function scope */
window.Arrow = (function (window, document, undefined) {
  ("use strict");

  var version = "1.0.0",
    Arrow = {},
    arrowNode,
    browser = "",
    browserVersion = 0,
    visibleHeight = 0,
    visibleWidth = 0;

  /**
   * Determine browser type and browser version
   */
  (function () {
    var N = navigator.appName,
      ua = navigator.userAgent,
      tem;
    var M = ua.match(
      /(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
    );
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
      M[2] = tem[1];
    }
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, "-?"];
    browser =
      M[0].toLowerCase() == "netscape"
        ? "IE11"
        : ua.toLowerCase().indexOf("edge") != -1
        ? "edge"
        : M[0].toLowerCase();

    browserVersion = parseInt(M[1], 10);
  })();

  /**
   * Fade in the arrow
   * Use DXImageTransform.Microsoft.Alpha for IE8
   *
   * @method _increaseOpacity
   * @private
   */
  function _increaseOpacity(milliseconds) {
    var arrow = document.getElementById("arrow-" + browser);
    arrow.style.display = "block";
    var i = 0.0,
      ieI = 0; // need to use whole numbers for IE filter
    var x = setInterval(function () {
      i += 0.1;
      ieI += 10;
      if (browser === "msie" && browserVersion <= 8) {
        if (arrow.filters) {
          arrow.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieI;
        }
      } else {
        arrow.style.opacity = i;
      }
      if (i >= 1) {
        clearInterval(x);
      }
    }, 50);
    setTimeout(function () {
      _hide();
    }, milliseconds || 6000);
  }

  /**
   * Fade out the arrow
   * Use DXImageTransform.Microsoft.Alpha for IE8
   *
   * @method _decreaseOpacity
   * @private
   */
  function _decreaseOpacity() {
    var arrow = document.getElementById("arrow-" + browser);
    var i = 1.0,
      ieI = 100; // need to use whole numbers for IE filter
    var x = setInterval(function () {
      i -= 0.1;
      ieI -= 10;
      if (browser === "msie" && browserVersion <= 8) {
        if (arrow.filters) {
          arrow.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieI;
        }
      } else {
        arrow.style.opacity = i;
      }
      if (i <= 0) {
        clearInterval(x);
        arrow.style.display = "none";
      }
    }, 50);
  }

  /*
   * How to access vendor specific properties with JS
   *
   * node.style.webkitTransform = '';
   * node.style.MozTransform = '';
   * node.style.msTransform = '';
   * node.style.OTransform = '';
   * node.style.transform = '';
   */

  /**
   * Apply modern browser style then browser specific styles to arrow
   *
   * @method _applyStyleModern
   * @param node
   * @private
   */
  function _applyStyleModern(node) {
    node.style.position = "fixed";
    node.style.zIndex = 999;
    node.style.display = "none";
    node.style.height = "130px";
    node.style.width = "120px";
    node.style.opacity = 0;
  }

  /**
   * IE 8 specific styles.
   *
   * @method _applyStyleIE8
   * @param node
   * @private
   */
  function _applyStyleIE8(node) {
    node.style.top = "10px";
    node.style.left = "20px";
    node.style.transform = "rotateX(180deg) rotateY(180deg)";
    node.style.webkitTransform = "rotateX(180deg) rotateY(180deg)";
    node.style.msTransform = "rotateX(180deg) rotateY(180deg)";
  }

  /**
   * IE 9 styles
   *
   * @method _applyStyleMs
   * @param node
   * @private
   */
  function _applyStyleMs(node) {
    node.style.bottom = "80px";
    node.style.left = "50%";
    node.style.transform = "rotateX(180deg) rotateY(180deg)";
    node.style.webkitTransform = "rotateX(180deg) rotateY(180deg)";
    node.style.msTransform = "rotateX(180deg) rotateY(180deg)";
  }

  /**
   * Firefox 20+ styles, 20+ is when new download manager was introduced.
   *
   * @method _applyStyleMoz
   * @param node
   * @private
   */
  function _applyStyleMoz(node) {
    node.style.top = "0px";
    node.style.right = "47px";
  }

  /**
   * Chrome
   * @method _applyStyleWebkit
   * @param node
   * @private
   */
  function _applyStyleWebkit(node) {
    node.style.top = "30px";
    node.style.right = "100px";
  }

  /**
   * Safari
   *
   * @method _applyStyleSafari
   * @param node
   * @private
   */
  function _applyStyleSafari(node) {
    node.style.top = "30px";
    node.style.right = "80px";
  }

  /**
   * Apply vendor specific styles based on the browser and browser version.
   *
   * @method _setStyleType
   * @param node
   * @private
   */
  function _setStyleType(node) {
    //add our basic styles then do vendor prefixes
    _applyStyleModern(node);

    if (browser === "msie") {
      if (browserVersion === 8) {
        _applyStyleIE8(node);
      } else if (browserVersion === 9 || browserVersion === 10) {
        _applyStyleMs(node);
      }
    } else if (browser === "chrome" || browser === "opera") {
      _applyStyleWebkit(node);
    } else if (browser === "safari") {
      _applyStyleSafari(node);
    } else if (browser === "IE11" || browser === "edge") {
      _applyStyleMs(node);
    } else if (browser === "firefox") {
      if (browserVersion >= 20) {
        _applyStyleMoz(node);
      }
    }
  }

  /**
   * Create arrow element and give it an id specific to the browser.
   *
   * @method _buildArrow
   * @returns div {HTMLElement}
   * @private
   */
  function _buildArrow() {
    var div = document.createElement("div");
    div.setAttribute("id", "arrow-" + browser);
    div.classList.add("arrow-js-arrow");
    arrowNode = div; //only used in resizing ie9
    div.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(270) scale(1,-1)" width="120" height="128" style="height: inherit; filter: drop-shadow(0px 0px 5px rgb(0 0 0 / 0.5));" fill="#ff8c00" fill-rule="nonzero" viewBox="0 0 22.703 21.928"> <path d="M1.056,21.928c0-6.531,5.661-9.034,10.018-9.375V18.1L22.7,9.044,11.073,0V4.836A10.5,10.5,0,0,0,3.729,8.188C-.618,12.946-.008,21,.076,21.928Z"/></svg> ';
    return div;
  }

  /**
   * Add HTML node to the page, in this case our arrow.
   *
   * @method _injectNode
   * @param node
   * @private
   */
  function _injectNode(node) {
    document.body.appendChild(node);
  }

  /**
   * Does our arrow exist on the page?
   *
   * @returns {boolean}
   * @private
   */
  function _isExist() {
    return !!document.getElementById("arrow-" + browser);
  }

  /**
   * Initialize our arrow internals
   * ---
   * Should only be run once per Arrow instance.
   * In the future would be nice to manage multiple arrows.
   *
   * @method _initArrow
   * @private
   */
  function _initArrow() {
    var arrow = _buildArrow();
    _setStyleType(arrow);
    _calculateArrowPosition();
    _injectNode(arrow);
    _addWindowEvent("resize", _calculateArrowPosition);
    _addWindowEvent("scroll", _calculateArrowPosition);
  }

  /**
   * Attach an event on the window object and a function to fire when it fires
   *
   * @method _addWindowEvent
   * @param event {string}
   * @param functionReference {Object}
   * @private
   */
  function _addWindowEvent(event, functionReference) {
    if (window.addEventListener) {
      window.addEventListener(event, functionReference, false);
    } else if (window.attachEvent) {
      window.attachEvent(event, functionReference);
    }
  }

  _initArrow(); //our constructor, fired when library loads

  /**
   * Calculate current visible height and width of the screen and stores them for library use.
   * Used to make sure IE9 arrow is in the right place.
   * ---
   * !! Possible performance bottleneck for IE/other browser if something is constantly resizing the window.
   *
   * @method _calculateArrowPosition
   * @private
   */
  function _calculateArrowPosition() {
    var docElement = document.documentElement;
    if (typeof window.innerWidth === "number") {
      // Non-IE
      visibleWidth = window.innerWidth;
      visibleHeight = window.innerHeight;
    } else if (
      docElement &&
      (docElement.clientWidth || docElement.clientHeight)
    ) {
      // IE 6+ in 'standards compliant mode'
      visibleWidth = docElement.clientWidth;
      visibleHeight = docElement.clientHeight;
    }

    if (browser === "msie" && browserVersion === 9) {
      if (visibleWidth < 1005) {
        arrowNode.style.bottom = "85px";
      } else if (visibleWidth > 1006) {
        arrowNode.style.bottom = "50px";
      }
    }
  }

  /**
   * Hide the arrow
   * If it doesn't exist it will throw an exception
   *
   * @method _hide
   * @private
   */
  function _hide() {
    if (_isExist()) {
      _decreaseOpacity();
    } else {
      throw "Invalid usage: There are no arrows on the page.";
    }
  }

  /**
   * Public API
   */

  /**
   * Show the arrow.
   * If it doesn't exist it will throw an exception
   *
   * @method show
   * @param seconds {int} optional parameter, length in seconds to fade out after
   * @public
   */
  function show(seconds) {
    if (_isExist()) {
      _increaseOpacity(seconds);
    } else {
      throw "Invalid usage: arrow does not exist";
    }
  }

  /**
   * Expose Public Data and Functions
   */

  Arrow._version = version;
  Arrow._browser = browser;
  Arrow._browserVersion = browserVersion;
  Arrow.show = show;

  return Arrow;
})(window, window.document);

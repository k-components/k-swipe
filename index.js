// Generated by CoffeeScript 1.10.0
(function() {
  var Swipe,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  module.exports = Swipe = (function() {
    function Swipe() {
      this.click = bind(this.click, this);
      this.touchEnd = bind(this.touchEnd, this);
      this.touchMove = bind(this.touchMove, this);
      this.touchStart = bind(this.touchStart, this);
      this.translate = bind(this.translate, this);
      this.keydown = bind(this.keydown, this);
    }

    Swipe.prototype.view = __dirname;

    Swipe.prototype.name = 'k-swipe';

    Swipe.prototype.xDown = null;

    Swipe.prototype.yDown = null;

    Swipe.prototype.init = function() {
      return this.model.set('hide', !this.model.get('show'));
    };

    Swipe.prototype.create = function() {
      document.addEventListener('touchstart', this.touchStart, false);
      document.addEventListener('touchend', this.touchEnd, false);
      document.addEventListener('touchmove', this.touchMove, false);
      this.root = document.getElementById('k-swipe-root') || document.body;
      return document.body.addEventListener('keydown', this.keydown, false);
    };

    Swipe.prototype.destroy = function() {
      document.removeEventListener('touchstart', this.touchStart);
      document.removeEventListener('touchend', this.touchEnd);
      return document.removeEventListener('touchmove', this.touchMove);
    };

    Swipe.prototype.keydown = function(e) {
      var key, t;
      t = (e != null ? e.target : void 0) || (e != null ? e.srcElement : void 0);
      if ((t != null ? t.nodeName : void 0) !== 'BODY') {
        return;
      }
      key = e.keyCode;
      if (key === 37) {
        return this.click(this.prevbutton);
      } else if (key === 39) {
        return this.click(this.nextbutton);
      }
    };

    Swipe.prototype.translate = function(pix) {
      var e;
      e = this.root;
      pix = pix * -1;
      e.style['-webkit-transform'] = 'translate(' + pix + 'px, 0px)';
      e.style['-moz-transform'] = 'translate(' + pix + 'px, 0px)';
      e.style['-ms-transform'] = 'translate(' + pix + 'px, 0px)';
      e.style['-o-transform'] = 'translate(' + pix + 'px, 0px)';
      e.style['transform'] = 'translate(' + pix + 'px, 0px)';
    };

    Swipe.prototype.touchStart = function(e) {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6;
      if (!((ref = e.touches) != null ? ref[0] : void 0)) {
        return;
      }
      if ((ref1 = typeof document !== "undefined" && document !== null ? (ref2 = document.activeElement) != null ? ref2.nodeName : void 0 : void 0) === 'TEXTAREA' || ref1 === 'INPUT') {
        return;
      }
      this.xDown = (ref3 = e.touches) != null ? (ref4 = ref3[0]) != null ? ref4.clientX : void 0 : void 0;
      this.yDown = (ref5 = e.touches) != null ? (ref6 = ref5[0]) != null ? ref6.clientY : void 0 : void 0;
    };

    Swipe.prototype.touchMove = function(e) {
      var ref, xDiff, xUp, yDiff, yUp;
      if (!this.xDown || !this.yDown || !((ref = e.changedTouches) != null ? ref.length : void 0)) {
        return;
      }
      xUp = e.changedTouches[0].clientX;
      yUp = e.changedTouches[0].clientY;
      xDiff = this.xDown - xUp;
      yDiff = this.yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
        return this.translate(xDiff);
      }
    };

    Swipe.prototype.touchEnd = function(e) {
      var ref, xDiff, xUp, yDiff, yUp;
      if (!this.xDown || !this.yDown || !((ref = e.changedTouches) != null ? ref.length : void 0)) {
        return;
      }
      xUp = e.changedTouches[0].clientX;
      yUp = e.changedTouches[0].clientY;
      xDiff = this.xDown - xUp;
      yDiff = this.yDown - yUp;
      this.xDown = null;
      this.yDown = null;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 150) {
          this.click(this.nextbutton);
        } else if (xDiff < -150) {
          this.click(this.prevbutton);
        } else {
          this.translate(0);
        }
      }
    };

    Swipe.prototype.click = function(el) {
      var err, error, ev;
      if (el != null ? el.href : void 0) {
        this.destroy();
        try {
          ev = new window.MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
          return el.dispatchEvent(ev);
        } catch (error) {
          err = error;
          ev = document.createEvent('MouseEvents');
          ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          return el.dispatchEvent(ev);
        }
      } else {
        return this.translate(0);
      }
    };

    return Swipe;

  })();

}).call(this);

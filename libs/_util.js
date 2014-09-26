/*jslint white:false */
/*globals _, C, W, ROOT, Global, jQuery,
        Util:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (function ($) { /// IIFE
    'use strict';
    var name = 'Util',
        self = new Global(name, '(1170361-getcollege utils)'),
        D, DE, U;
    var urlParseRE = /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// CONSTANTS
    D = W.document;
    DE = D.documentElement;

    U = {
        args: function () {
            return arguments;
        },
        arrg: function (args) {
            return Array.prototype.slice.apply(args);
        },
        debug: function (n) {
            return W.debug >= (n || 1);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], this.arrg(arguments));
        },
        echoing: function (arr) {
            arr = this.arrg(arguments);
            return function () {
                C.warn(arr);
            };
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    };

    if (U.undef(W.debug)) {
        W.debug = 1;
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _dom() {
        var obj = _dom.Obj;
        //
        if (!obj) {
            obj = D.body; // default
            if (!$.browser.webkit) {
                obj = DE;
            }
            _dom.Obj = obj = $(obj);
        }
        return obj;
    }

    // reflect function takes number arg (def 1) (0 = *)
    // returns function that slices and returns args array
    // on num means gimme that arg number
    // two nums mean apply slice (the way splice numbers it)

    function _arg(n1, n2) {
        // n2 = _undef(n2) ? 99 : n2;
        if (U.undef(n2)) {
            n2 = n1;
            n1 = 0;
        }
        return function () {
            var arr = Array.prototype.slice.apply(arguments);
            return arr.slice(n1, n2);
        };
    }

    function _scroll(ele, add) {
        var nom, off, top;

        add = add || 0;
        if (typeof ele === 'number') {
            add = ele;
            ele = 'body';
        }
        ele = $(ele || 'body').first();
        nom = ((ele[0] && ele[0].id) || ele);

        if (ele.length) {
            top = ele.offset().top;
            off = Math.abs(_dom().scrollTop() - top);

            if (off - add > 25) {
                if (U.debug(1)){
                    C.debug(name, '_scroll start', nom, off + 'px', add);
                }
                ele.addClass(':target');
                // W.location.hash = nom;
                off = (off > 1111 ? off / 5 : off / 2) + 250;

                _dom().stop().animate({
                    scrollTop: top + add,
                }, {
                    duration: off,
                    complete: function () { // 'easeInBack', 555
                        ele.removeClass(':target');
                        if (U.debug(2)){
                            C.debug(name, '_scroll done', nom, off + 'ms');
                        }
                    },
                    //step: function (now, fx) { var x = Math.abs(now - fx.end) | 0; C.warn(x, [fx]); }
                });
            }
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// JQUERY
    // <reify> take array of selector strings and replace each with page query
    $.reify = function (selarr) {
        $.each(selarr, function (i, e) {
            selarr[i] = $(e);
        });
    };
    // <parseUrl> like Location for hrefs... superparse
    $.parseUrl = function (str) {
        var parseUrl = function ( url ) { // from jquery.mobile.1.4.2
            if ( $.type( url ) === "object" ) {
                return url;
            }
            var matches = urlParseRE.exec( url || "" ) || [];
            return {
                href:         matches[  0 ] || "",
                hrefNoHash:   matches[  1 ] || "",
                hrefNoSearch: matches[  2 ] || "",
                domain:       matches[  3 ] || "",
                protocol:     matches[  4 ] || "",
                doubleSlash:  matches[  5 ] || "",
                authority:    matches[  6 ] || "",
                username:     matches[  8 ] || "",
                password:     matches[  9 ] || "",
                host:         matches[ 10 ] || "",
                hostname:     matches[ 11 ] || "",
                port:         matches[ 12 ] || "",
                pathname:     matches[ 13 ] || "",
                directory:    matches[ 14 ] || "",
                filename:     matches[ 15 ] || "",
                search:       matches[ 16 ] || "",
                hash:         matches[ 17 ] || ""
            };
        }
        var url = parseUrl(str);

        url.hashstring = url.hash.slice(1);
        url.hashbang = /^!/.exec(url.hashstring) && url.hashstring.slice(1);
        url.params = (function () {
            var ret = {},
            seg = url.search.replace(/^\?/, '').split('&'),
            len = seg.length,
            i, s;
            for (i = 0; i < len; i++) {
                if (!seg[i]) continue;
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        }());

        return url;
    };
    // <toString> shorthand logging of element identity
    $.fn.toString = function () {
        var out = [];

        this.each(function () {
            var tag, nom, eid, ecn;

            tag = (this.tagName || '???');
            nom = (this.name ? ('"' + this.name + '"') : 0);
            eid = (this.id ? ('#' + this.id) : 0);
            ecn = (this.className ? ('.' + this.className) : 0);
            nom = (nom || eid || ecn || '(anon)');

            out.push('<' + tag + nom + '>');
        });
        return ('jq:[' + (out.join(', ') || '(empty)') + ']');
    };
    // <filterAll> find items at root query level and below
    $.fn.filterAll = function (sel) {
        return this.filter(sel).add(this.find(sel));
    };
    // <scrolls> roughly find how much scrolling can happen
    $.fn.scrolls = function () {
        var me = this.first();
        return {
            horz: me.scrollLeft(1e6).scrollLeft(),
            vert: me.scrollTop(1e6).scrollTop(),
        };
    };
    // <fitContents> fit content by enlarging and report if enlarged
    $.fn.fitContents = function () {
        var me = this.first();
        var sc = me.scrolls();
        var act = Boolean(sc.horz || sc.vert);

        if (act) {
            me.width(me.width() + sc.horz + 1);
            me.height(me.height() + sc.vert + 1);
        }
        return act;
    };
    // <scrollInfo> find out all about the scroll situation
    $.fn.scrollInfo = function (dirty) {
        var me = this.first();

        var l0 = me.scrollLeft();
        var l1 = me.scrollLeft(1);
        var ln = dirty ? (l0 || l1): me.scrollLeft(1e6).scrollLeft();

        var t0 = me.scrollTop();
        var t1 = me.scrollTop(1);
        var tn = dirty ? (t0 || t1): me.scrollTop(1e6).scrollTop();

        if (!dirty) {
            me.scrollLeft(l0);
            me.scrollTop(t0);
        }
        return {
            x: l0,
            y: t0,
            xMax: dirty ? NaN : ln,
            yMax: dirty ? NaN : tn,
            carefully: !dirty,
            horz: Boolean(ln),
            vert: Boolean(tn),
        };
    };
    // <widorph> glue last 2 words
    $.fn.widorph = function () {
        return this.each(function () {
            var me = $(this);
            me.html(me.html().replace(/\s+(\S+)\s*$/, '&nbsp;$1'));
        });
    };
    $.fn.exempt = function (bool) {
        var ret = $();
        if (!bool) {
            ret = $(this);
        }
        ret.prevObject = this;
        return ret;
    };
    $.nameSpace = function (str, nom) {
        var arr;

        if (!nom) {
            throw new Error('no namespace given');
        }
        arr = str.split(' ');

        // add dot and name to each event type
        str = _.map(arr, function (e) {
            return e + '.' + nom;
        }).join(' ');

        if (!str) {
            C.warn('namespace error');
        }
        return str;
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _fixIE() {
        $('body').on('mouseover', '*', function (evt) {
            evt.stopPropagation();
            $(this).addClass('hover');
        }).on('mouseout', '*', function (evt) {
            evt.stopPropagation();
            $(this).removeClass('hover');
        });
    }

    void(W.isIE && _fixIE());

    $.extend(true, self, {
        arg: _arg,
        dom: _dom,
        scroll: _scroll,
        flatten: U.flatcat,
        isDef: U.defined,
        I: U.reflect,
        mobile: W.View && View.mobile,
        viewport: W.View && View.port,
    }, U);

    return self;
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */

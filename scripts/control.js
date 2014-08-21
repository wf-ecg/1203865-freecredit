/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Control:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Control = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Control',
        self = new G.constructor(name, '(control operations)'),
        Df, El;

    Df = { // DEFAULTS
        all: [],
        current: null,
        speed: null,
        timeout: 0,
        inits: function (ms) {
            $.reify(El);
            Df.speed = ms || 999;
        },
    };
    El = {
        all: '.control',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function _soonScrollTo(ele) {
        ele = $(ele);

        W.clearTimeout(Df.timeout);

        Df.timeout = W.setTimeout(function () { // delay scroll
            ele.scrollTo();
        }, Df.speed * 2);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function scroller(obj) {
        if (obj.status === 'active') {
            _soonScrollTo(obj.btn);
        } else {
            _soonScrollTo('#Top');
        }
    }

    function titler(obj) {
        if (obj.status === 'active') {
            obj.btn.attr('title', 'Close');
        } else {
            obj.btn.attr('title', 'Reveal');
        }
    }

    function datify() {
        var btn, cbs, obj;

        btn = $(this);
        cbs = $.Callbacks();

        obj = {
            btn: btn,
            status: 'normal',
            todo: function (fn) {
                if (fn) {
                    cbs.add(fn);
                } else {
                    if (Df.current) {
                        Df.current.deactivate();
                    }
                    cbs.fire(obj);
                }
            },
            reset: function (stat) {
                obj.btn.removeClass(obj.status);
                if (stat) {
                    obj.status = stat;
                    obj.btn.addClass(obj.status);
                }
            },
            activate: function () {
                if (obj.status === 'normal') {
                    obj.reset('active');
                    obj.todo();
                    Df.current = obj;
                    return true;
                }
                return false;
            },
            deactivate: function () {
                if (obj.status === 'active') {
                    obj.reset('normal');
                    Df.current = null;
                    obj.todo();
                    return true;
                }
                return false;
            },
        };

        obj.todo(scroller);
        obj.todo(titler);

        Df.all.push(obj);
        btn.data(name, obj);
        return obj;
    }

    function bind() {
        El.all //
        .each(datify) // decorate each control
        .on('click', function (evt) {
            evt.preventDefault();

            var obj = $(this).data(name);

            if (obj.btn.is('.active')) {
                obj.deactivate();
            } else {
                obj.activate();
            }
        });
        self.reset();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(speed) {
        if (self.inited(true)) {
            return null;
        }
        Df.inits(speed);
        bind();
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        ':': Df,
        init: _init,
        reset: function () {
            _.each(Df.all, function (x) {
                x.reset('normal');
            });
        },
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/

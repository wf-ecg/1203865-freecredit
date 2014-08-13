/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Reveal:true, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Reveal = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Reveal',
        self = new G.constructor(name, '(expand or contract)'),
        Df, El;

    Df = { // DEFAULTS
        all: [],
        speed: null,
        current: null,
        revealpx: 257,
        reveals: 'section.reveal',
        inits: function (ms) {
            $.reify(El);
            Df.speed = ms || 999;
            Df.inited = true;
        },
    };
    El = {
        body: 'body',
        reveals: 'section.reveal',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    // attach expand/contract/status events to items with _reveal

    function mobile() {
        return El.body.is('.mobile');
    }

    function scroller(obj) {
        if (!obj.carousel) {
            return;
        } else if (obj.status === 'active') {
            obj.carousel.tm = Carousel.auto(obj.carousel);
        } else {
            W.clearInterval(obj.carousel.tm);
        }
    }

    function fader(obj) {
        var div, mob;

        div = obj.wrap;
        mob = Respond.mobile();

        if (obj.status === 'active') {
            div.addClass('animate').show().css({
                display: 'block',
                height: Df.revealpx * (mob ? 1.2 : 1),
            });
            div.children().fadeIn(Df.speed * 2, function () {
                div.removeClass('animate');
                obj.carousel && obj.carousel.refresh();
            });
        } else {
            div.addClass('animate').css({
                height: '1px',
            });
            div.children().fadeOut(Df.speed, function () {
                div.removeClass('animate');
                div.is('.is-port') || div.hide();
            });
        }
    }

    function datify(sect) {
        var cbs, obj, wrap, wrapped;

        cbs = $.Callbacks();

        wrap = sect.parent().closest('.reveal');
        wrapped = wrap.data('carousel') || false;
        wrap = wrapped ? wrap : sect;

        obj = {
            wrap: wrap,
            carousel: wrapped,
            status: 'active',
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
                obj.wrap.removeClass(obj.status);
                if (stat) {
                    obj.status = stat;
                    obj.wrap.addClass(obj.status);
                }
            },
            activate: function () {
                if (obj.status !== 'active') {
                    obj.reset('active');
                    obj.todo();
                    Df.current = obj;
                    return true;
                }
                return false;
            },
            deactivate: function () {
                if (obj.status !== 'normal') {
                    obj.reset('normal');
                    Df.current = null;
                    obj.todo();
                    return true;
                }
                return false;
            },
        };


        obj.todo(fader);
        obj.todo(scroller);
        obj.deactivate();

        Df.all.push(obj);
        sect.data(name, obj);
        return obj;
    }

    function _setHandle(sel) {
        var sect, btn, dat;

        sect = $('section.' + sel);
        btn = $('article.' + sel + ' .control');
        dat = datify(sect.first());

        btn.on('click', function () { /// xyz 1
            if ($(this).is('.active')) {
                dat.deactivate();
            } else {
                dat.activate();
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(speed) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits(speed);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        attach: _setHandle,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/

/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
          Control, Decache, Modal, Respond, Reveal, Stats, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Main = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Main',
        self = new G.constructor(name, '(kicker and binder)'),
        Df, El;

    Df = { // DEFAULTS
        speed: 333,
        reveals: ['section._promo', 'section._tools', 'section._advert'],
        inits: function () {
            $.reify(El);
            Df.inited = true;
        },
    };
    El = { // ELEMENTS
        body: $('body'),
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function pubsubs() {
        $.PS_sub('change', function () {
            Control.reset();
        });

        $(W).bind('resize orientationchange', _.throttle(function () {
            $.PS_pub('refresh');
        }, 333));

        if (!Respond.mobile()) {
            Decache.init('.desktop');
        }
    }

    function isfreshen() {
        this.refresh();
        this.scrollTo(0, 0);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function watchInputDevice() {
        var htm = $('html');
        htm.on('keydown', function (evt) { // key action
            htm.removeClass('mouse');
            htm.addClass('keyboard');
        }).on('mousedown', function (evt) { // mouse action
            htm.removeClass('keyboard');
            htm.addClass('mouse');
        }).addClass('mouse');
    }

    function expander() {
        Reveal.attach('_promo');
        Reveal.attach('_tools');
        Reveal.attach('_advert');
    }

    function bind() {
        watchInputDevice(); // detect mouse or keys for highlighting

        $('a, .control, .shiny, .closeWidget').not('[tabindex]').attr('tabindex', 9);
        $('a').not('[href]').attr('href', 'javascript:void(0)');
        $('a').not('.control, .shiny, .closeWidget').each(function () {
            var me = $(this);
            me.attr('title', me.attr('href').replace(/(\S*?\/\/\S+?)\/.*/, '$1'));
        });

        Control.init(Df.speed);
        Modal.init(Df.speed);
        Reveal.init(Df.speed);
        Respond.init();
        //Stats.init();

        $('.masthead').on('dblclick', function (evt) {
            evt.preventDefault();
            if (!W.isIE) {
                Respond.toggle();
            }
        });

        pubsubs();
        $.PS_pub('refresh');
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (Df.inited) {
            return null;
        }
        Df.inits();
        self.serv = W.location.hostname;
        C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);

        expander();

        $('#Top').scrollTo();
        bind();
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        __: Df,
        speed: Df.speed,
        init: _init,
        mode: eval(U.testrict),
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */

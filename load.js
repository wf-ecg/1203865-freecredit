/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Data, Glob;

Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
    W.G = G;
    W.Load = {};

    _.defaults(G, { /// all stubs terminated
        top: ROOT.dir + '/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    });

    if ($.browser.msie) {
        $(function () {
            $('html').addClass('msie');
            $('body').on('mouseover', '.region, .widget, a, li', function () {
                $(this).addClass('hover');
            }).on('mouseout', '.region, .widget, a, li', function () {
                $(this).removeClass('hover');
            });
        });
        W.debug--;
    }
    if (ROOT.conf.nom === 'wfmedia') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    Load.base = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        G.loc + 'iscroll-ie.js',
        ],
        nope: [
        G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
        G.lib + 'jq/jq-pubsub.js',
        /*G.lib + 'jquery/mobile/custom/jquery.mobile.min.css',*/
        G.lib + 'jquery/mobile/custom/jquery.mobile.js',
        /* */
        G.loc + 'jq-help.js',
        G.loc + 'js-view.js',
        G.loc + 'mzr-highres.js',
        G.loc + '_util.js',
        ],
        complete: function () {
            U = Util;
        },
    };

    Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla1',
        yep: [
        G.lib + 'fonts/archer.ssm.css',
        G.lib + 'fonts/archer.ssm.itl.css',
        ],
        nope: [
        /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
        '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
        ],
    };

    Load.main = {
        both: [
        G.src + 'control.js',
        G.src + 'decache.js',
        G.src + 'modal.js',
        G.src + 'respond.js',
        G.src + 'reveal.js',
        //G.src + 'stats.js',
        G.src + '_main.js',
        ],
        complete: function () {
            ROOT.loaded($);
            W.Main && W.Main.init();
        },
    };

    Load.test = {
        test: W.debug >= 0,
        yep: [],
        nope: [
        'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([Load.base, Load.font, Load.main, Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*jslint white:false */
/*globals $, Global, Main, Modernizr, ROOT, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob = new Global('Glob');

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
    if (ROOT.conf.nom === 'wfmedia' || ROOT.conf.nom === 'mfal') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    Load.base = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/split.js',
        ],
        nope: [],
        both: [
        G.lib + 'jq/jq-pubsub.js',
        G.lib + 'jquery/mobile/custom/jquery.mobile.js',
        /*G.lib + 'jquery/mobile/custom/jquery.mobile.min.css',*/
        G.dir + 'build/lib.js',
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
        G.dir + 'build/src.js',
        ],
        complete: function () {
            ROOT.loaded($);
            evil(W.Main && W.Main.init());
        },
    };

    Load.test = {
        test: W.debug >= 1,
        yep: [],
        nope: [
        'http://www.wellsfargomedia.com/lib/js/ga-ecg.js',
        ],
    };
    M.load([Load.base, Load.font, Load.main, Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*jslint white:false */
/*globals _, C, W, Global, jQuery,
    Glob:true, Main, Modernizr, ROOT, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob;

Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    G.Load = {};
    W.Tests = $.Callbacks();

    _.defaults(G, { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
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

    G.Load.base = {
        test: W.isIE,
        yep: [
            G.lib + 'ie/split.js',
        ],
        nope: [],
        both: [
            G.lib + 'jq/jq-pubsub.js',
            G.lib + 'jquery/mobile/custom/jquery.mobile.min.js',
            /*G.lib + 'jquery/mobile/custom/jquery.mobile.min.css',*/
            'build/libs.min.js',
        ],
        complete: function () {
        },
    };

    G.Load.font = {
        test: (ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla2'),
        yep: [
            G.lib + (!W.isIE ? 'fonts/archer.ssm.css'     : 'fonts/eot/archer.ssm.css'),
            G.lib + (!W.isIE ? 'fonts/myriad.con.css'     : 'fonts/eot/myriad.con.css'),
            G.lib + (!W.isIE ? 'fonts/myriad.css'         : 'fonts/eot/myriad.css'),
        ],
        nope: [/*
            '//cloud.typography.com/6819872/620964/css/fonts.css', // Normal */
            '//cloud.typography.com/6819872/633184/css/fonts.css', // ScrnSmrt
            '//use.typekit.net/cqz6fet.js',
        ],
        complete: function () {
            try {
                if (!G.Load.font.test) {
                    Typekit.load();
                }
            } catch (e) {
                C.error('typekit');
            }
        },
    };

    G.Load.main = {
        both: [
            'build/main.js',
        ],
        complete: function () {
            ROOT.loaded($);
            Main.init();
        },
    };

    G.Load.test = {
        test: W.debug >= 1,
        //yep: ['_tests.js'],
        nope: [
        'http://www.wellsfargomedia.com/lib/js/ga-ecg.js',
        ],
    };
    M.load([G.Load.base, G.Load.font, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
Originally built by WF-ECG INTERACTIVE (Wells Fargo Enterprise Creative Group).
        We design and develop with a focus on web standards and best practices.
*/

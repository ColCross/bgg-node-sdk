import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { forum } from "~/routes/forum";
import { ParamsForum } from "~/routes/types/params";
import { PayloadForum } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

const endpoint = "/forum";

describe("forum", () => {
  it("should fetch forum data with an error page result and respond null", async () => {
    const mockApiResponse = `
        <!DOCTYPE html>
        <html ng-app="GeekApp" lang="en-US" ng-cloak>
        
        <head>
            <meta charset='utf-8'>
            <meta id="vp" name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
                window.addEventListener( 'DOMContentLoaded',  function() {
                        var width = document.documentElement.clientWidth || window.innerWidth;
                        if (width < 960) {
                            var mvp = document.getElementById('vp');
                            // android debugging
                            mvp.setAttribute('content','width=960');
                        }
                    });
            </script>
            <meta content='yes' name='apple-mobile-web-app-capable'>
            <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible'>
        
            <title>BoardGameGeek | Gaming Unplugged Since 2000</title>
        
        
            <link rel="apple-touch-icon" href="https://cf.geekdo-static.com/icons/touch-icon180.png" />
            <link rel="shortcut icon" href="https://cf.geekdo-static.com/icons/favicon2.ico" type="image/ico" />
            <link rel="icon" href="https://cf.geekdo-static.com/icons/favicon2.ico" type="image/ico" />
            <link rel="search" href="/game-opensearch.xml" type="application/opensearchdescription+xml"
                title="BGG Game Search" />
            <meta name="apple-mobile-web-app-title" content="BGG">
        
            <meta name="theme-color" content="#2e2b47">
            <link rel="preconnect" href="https://api.geekdo.com" />
        
        
        
        
            <meta property="og:image" content="https://cf.geekdo-static.com/images/opengraph/bgg_opengraph.png" />
        
        
        
            <meta name="keywords"
                content="board game, boardgames, boardgame, board, games, game, hobby, boardgamegeek, geek, geekdo">
        
            <script>
                window.AdSlots = window.AdSlots || {
            cmd: [],
            disableScripts: ['gpt'],
            renderOnFirstLoad: false,
            divCheck: false
        };
            </script>
        
        
            <link rel='stylesheet' type='text/css' href='https://cf.geekdo-static.com/static/geekui_master2_66341fc3495d4.css'>
            <link rel='stylesheet' type='text/css' href='https://cf.geekdo-static.com/static/css_master2_66341fb417496.css'>
        
            <base href="/">
        
            <script src="https://kit.fontawesome.com/ece5b35462.js" crossorigin="anonymous"></script>
        
            <script>
                var GEEK = GEEK || {};
            GEEK.adBlock = [];
            GEEK.adConfig = {"blockleaderboard":null,"blockskyscraper":null,"noadsense":null,"blocksupportdrive":null};
            GEEK.adSlots = {"dfp-leaderboard":{"name":"boardgame_leaderboard_728x90"},"dfp-skyscraper":{"name":"boardgame_skyscraper_160x600"},"dfp-medrect":{"name":"boardgame_rectangle_300x250"},"dfp-repeater":{"name":"boardgame_home_repeater"},"dfp-medrect-reserved-home":{"name":"boardgame_reserved_home_300x250"},"dfp-leaderboard-lg":{"name":"boardgame_home_hero"},"dfp-home-sidekick":{"name":"boardgame_home_repeater"},"dfp-inline-post":{"name":"boardgame_inline_post"}};
            GEEK.legacyAds = [];
            GEEK.bggStoreAds = [];
            GEEK.googleTargets = [];
            GEEK.userid = 0;
            GEEK.domainname = 'boardgamegeek.com';
            GEEK.domain = 'boardgame';
            GEEK.geekitemPreload = {};
            GEEK.geekitemSettings = null;
            GEEK.geekitemModules = null;
            GEEK.geekGlobalSettings = {"shutdown_file_ops":"1","shutdown_storeimage_ops":"0","shutdown_edit_avatar":"0","shutdown_file_upload":"0","shutdown_file_download":"0","shutdown_image_upload":"0"};
            GEEK.geekimageSettings = null;
            GEEK.legacy = 1;
            GEEK.apiurlsPrefix = 'https://api.geekdo.com';
        
            
                
                GEEK.apiurls = {
                'root': '/api',
                'amazon': '/api/amazon',
                'files': '/api/files',
                'geekitems': '/api/geekitems',
                'collectionstatsgraph': '/api/collectionstatsgraph',
                'images': '/api/images',
                'threads': '/api/forums/threads',
                'forums': '/api/forums',
                'videos': '/api/videos',
                'hotness': '/api/hotness',
                'dynamicinfo': '/api/dynamicinfo',
                'subtypeinfo': '/api/subtypeinfo',
                'geekbay': '/api/geekbay',
                'geekmarket': '/market/api/v1',
                'geekmarketapi': '/api/market',
                'geeklists': '/api/geeklists',
                'reviews': '/api/forumreviews',
                'collections': '/api/collections',
                'linkeditems': '/api/geekitem/linkeditems',
                'subscriptions': '/api/subscriptions',
                'fans': '/api/fans',
                'geekpreviews': '/api/geekpreviews',
                'geekpreviewitems': '/api/geekpreviewitems',
                'geekpreviewparentitems': '/api/geekpreviewparentitems',
                'recs': '/api/geekitem/recs',
                'awards': '/api/geekawards',
                'historicalrankgraph':  '/api/historicalrankgraph',
                'blueprint_recipes': '/api/blueprints/recipes',
                'affiliateads' : '/api/affiliateads',
                'sleevesbycard': '/api/sleevesbycard',
                'cardsetsbygame': '/api/cardsetsbygame',
            };
            </script>
        
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-104725-1"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'personalization_storage': 'denied',
                'wait_for_update': 3000
                });
            gtag('config', 'UA-104725-1', {
                'cookie_domain': 'boardgamegeek.com',
                'send_page_view': false
            });
            </script>
        
            <script type='text/javascript' src='https://cf.geekdo-static.com/static/geekangular17_master2_66341fd1dc6a7.js'>
            </script>
            <script type='text/javascript' src='https://cf.geekdo-static.com/static/geekui_master2_66341fc3495d4.js'></script>
            <script type='text/javascript' src='https://cf.geekdo-static.com/static/js_master2_66341fb39389f.js'></script>
            <script type='text/javascript'
                src='https://cf.geekdo-static.com/static/geekoutputtemplates_master2_66341fd2b5cd2.js'></script>
            <script type='text/javascript'
                src='https://cf.geekdo-static.com/static/geekuicommontemplates_master2_66341fd2be4b7.js'></script>
            <script>
                window.geekCookieConsent.gtagReady.then(function() {
                gtag('event', 'page_view');
            });
            </script>
            <!-- why this? -->
            <meta http-equiv="content-type" content="text/html;charset=UTF-8">
        
            <!-- Add to main?
        <link rel="apple-touch-icon" 	href="https://cf.geekdo-static.com/icons/appleicon.png" />
        <link rel="shortcut icon" 		href="https://cf.geekdo-static.com/icons/favicon.ico" type="image/ico" />
        <link rel="icon" 					href="https://cf.geekdo-static.com/icons/favicon.ico" type="image/ico" />
        <link rel="search" 				href="/game-opensearch.xml" type="application/opensearchdescription+xml" title="BGG Game Search" />
        -->
        
        
        
        
        
            <!--this is used only for GeekMap -->
        
        
            <!-- deal with adsense
            <script type="text/javascript">
                window.google_analytics_uacct = "UA-104725-1";
                var googletag = googletag || { };
                googletag.cmd = googletag.cmd || [];
                ( function() {
                    var gads = document.createElement('script');
                    gads.async = true;
                    gads.type  = 'text/javascript';
                    gads.src   = "//www.googletagservices.com/tag/js/gpt.js";
                    var node = document.getElementsByTagName('script')[0];
                    node.parentNode.insertBefore(gads, node);
                } )();
        
                adunits = [
                    {
                        name:    'boardgame_button_120x45',
                        size:    [ 120, 45 ],
                        target:  'dfp-button'
                    },
                    {
                        name:    'boardgame_leaderboard_728x90',
                        size:    [ 728, 90 ],
                        target:  'dfp-leaderboard'
                    },
                    {
                        name:    'boardgame_skyscraper_160x600',
                        size:    [ 160, 600 ],
                        target:  'dfp-skyscraper'
                    },
                    {
                        name:    'boardgame_rectangle_300x250',
                        size:    [ 300, 250 ],
                        target:  'dfp-medrect'
                    },
                    {
                        name:    'boardgame_rectangle_300x250',
                        size:    [ 300, 250 ],
                        target:  'dfp-medrect-reserved-home'
                    },
                    {
                        name:    'boardgame_button_120x90',
                        size:    [ 120, 90 ],
                        target:  'dfp-giftguide'
                    }
                ];
        
                googletag.cmd.push(function() {
                    for( var i=0; i< adunits.length; i++ )
                    {
                        unit = adunits[i];
                        googletag.defineUnit('/1005854/ca-pub-7206761047394129/'+unit.name, unit.size, unit.target).
                        addService(googletag.pubads());
                    }
        
                    
                    googletag.pubads().setTargeting( "subdomain", "all" );
                    googletag.enableServices();
                } );
        
            </script>
        -->
        
            <script>
                function start() {
                
            }
        
            function ondomready() {
                        
                GEEK.addHandlers();
                GEEK.recaptchaKey = '6Ldyr6EaAAAAAE0F2hYgtHHqbF6nKPTENAwo6SyU';
            }
        
            if( typeof window.addEvent === "function" ) {
                window.addEvent('domready', function() {
                    ondomready();
                } );
            } else {
                window.addEventListener( "DOMContentLoaded", function() {
                    ondomready();
            } );
            }
            window.onload = start;
            </script>
        
        
        </head>
        
        <body ng-controller="GeekOutput_LayoutCtrl as layoutctrl" class="domain-boardgame"
            ng-class="{ 'has-no-max-width' : layoutctrl.geekitemSettings.fluidlayout }">
        
        
            <div class='d-flex flex-column min-vh-100'>
                <div id="global-header-outer" class='global-header-outer' ng-controller="NavCtrl as navctrl"
                    click-out="navctrl.closeMobileMenu()">
        
                    <geeknav-menu></geeknav-menu>
                </div>
        
        
        
                <main class='global-body flex-grow-1' id="mainbody"
                    ng-class="{ 'has-overlay-sidebar': layoutctrl.showOverlaySidebar, 'has-hidden-fixed-sidebar': layoutctrl.localStorage.hideFixedSidebar }">
        
                    <a id='mainbodytarget' tabindex="-1"></a>
        
                    <!-- Home King Ad -->
        
                    <div hide-ad-block="blockleaderboard">
                        <div class="advertisement-leaderboard">
                            <div class='center-block' ng-dfp-ad="dfp-leaderboard"></div>
                        </div>
                    </div>
        
                    <div class='global-body-content-container container-fluid'>
                        <geekoutput-sidebar deactivate-overlay-sidebar='layoutctrl.deactivateOverlaySidebar'
                            show-overlay-sidebar='layoutctrl.showOverlaySidebar'></geekoutput-sidebar>
        
        
                        <div class='global-body-content pending' ng-class="{'ready': layoutctrl.ready}">
        
                            <a id='maincontenttarget' tabindex="-1"></a>
        
                            <div class="legacy">
                                <div id="container" class="yui-skin-sam">
                                    <div id="maincontent" ng-non-bindable>
                                        <div class="header">
                                            <ul class="commands">
                                                <li><a href="/community_rules">Rules</a></li>
                                                <li class="divider">&nbsp;</li>
                                                <li><a href="/subscriptions">Subscriptions</a></li>
                                                <li class="divider">&nbsp;</li>
                                                <li><a href="/thread/bookmarks">Bookmarks</a></li>
                                                <li class="divider">&nbsp;</li>
                                                <li><a href="/forum/search/region/1">Search</a></li>
                                                <li class="divider">&nbsp;</li>
                                                <li><a href="/geekaccount.php?action=editaccount">Account</a></li>
                                                <li class="divider">&nbsp;</li>
                                                <li><a href="/wiki/page/Admins">Moderators</a></li>
                                            </ul>
                                            <div class="clear"></div>
                                        </div>
                                        <div class='messagebox error'>
                                            Object does not exist
                                        </div>
                                        <div id="legacy_modal"></div>
                                    </div>
                                </div>
                            </div>
        
                            <div class='global-body-content-secondary'>
                            </div>
                        </div>
                    </div>
        
                </main>
                <geekoutput-footer></geekoutput-footer>
            </div>
        
        
        
        
        </body>
        
        </html>
      `;

    const params: ParamsForum = { id: "abc" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await forum(params);

    const mockPayload: PayloadForum = null;

    expect(result).toEqual(mockPayload);
  });

  it("should fetch forum data with an error page result and respond null", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <forum id="1565736" title="Reviews" numthreads="177" numposts="3185" lastpostdate="Thu, 01 Jan 1970 00:00:00 +0000" noposting="0" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <threads>
                <thread id="3265741" subject="You can&#039;t say Scythe without sigh" author="LyallUClarion" numarticles="20" postdate="Thu, 14 Mar 2024 20:23:23 +0000" lastpostdate="Fri, 22 Mar 2024 16:38:46 +0000" />
                <thread id="3254495" subject="Detailed Scythe Review - Spoiler Free" author="IndianBoardGamer" numarticles="1" postdate="Sun, 25 Feb 2024 19:45:52 +0000" lastpostdate="Sun, 25 Feb 2024 19:45:53 +0000" />
                <thread id="3235547" subject="Scythe: An Underwhelming Solo Experience" author="lostinsim" numarticles="9" postdate="Sat, 27 Jan 2024 23:14:13 +0000" lastpostdate="Thu, 01 Feb 2024 18:24:44 +0000" />
            </threads>
        </forum>
      `;

    const params: ParamsForum = { id: "1565736" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await forum(params);

    const mockPayload: PayloadForum = {
      attributes: {
        id: "1565736",
        title: "Reviews",
        numThreads: "177",
        numPosts: "3185",
        lastPostDate: "Thu, 01 Jan 1970 00:00:00 +0000",
        noPosting: "0",
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      threads: [
        {
          id: "3265741",
          subject: "You can't say Scythe without sigh",
          author: "LyallUClarion",
          numArticles: "20",
          postDate: "Thu, 14 Mar 2024 20:23:23 +0000",
          lastPostDate: "Fri, 22 Mar 2024 16:38:46 +0000",
        },
        {
          id: "3254495",
          subject: "Detailed Scythe Review - Spoiler Free",
          author: "IndianBoardGamer",
          numArticles: "1",
          postDate: "Sun, 25 Feb 2024 19:45:52 +0000",
          lastPostDate: "Sun, 25 Feb 2024 19:45:53 +0000",
        },
        {
          id: "3235547",
          subject: "Scythe: An Underwhelming Solo Experience",
          author: "lostinsim",
          numArticles: "9",
          postDate: "Sat, 27 Jan 2024 23:14:13 +0000",
          lastPostDate: "Thu, 01 Feb 2024 18:24:44 +0000",
        },
      ],
    };

    expect(result).toEqual(mockPayload);
  });
});

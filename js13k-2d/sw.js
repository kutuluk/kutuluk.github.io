"use strict";var precacheConfig=[["/js13k-2d/8e8e625f12e45ecc674f9579c4547351.ttf","8e8e625f12e45ecc674f9579c4547351"],["/js13k-2d/assets/favicon.ico","4a6ea6b3d8f4826018e6ea035ff6366d"],["/js13k-2d/assets/fonts/DS-DIGI.TTF","63f874d192fb3892d88d5e26f942b5e2"],["/js13k-2d/assets/fonts/DS-DIGIB.TTF","1467e2d37ec60cc50117a8db7c24f626"],["/js13k-2d/assets/fonts/DS-DIGII.TTF","8e8e625f12e45ecc674f9579c4547351"],["/js13k-2d/assets/fonts/DS-DIGIT.TTF","223f224650510797e0f06233d2a0f97b"],["/js13k-2d/assets/github.png","eb94bb97c3410733ce017b184d314723"],["/js13k-2d/assets/icons/android-icon-144x144.png","648be82fa078d1d95d3bf14ff0433dbd"],["/js13k-2d/assets/icons/android-icon-192x192.png","df7170c3d428ac5d250d81d8245665c4"],["/js13k-2d/assets/icons/android-icon-36x36.png","cb23660af5c6e5107a0ce911747e99ed"],["/js13k-2d/assets/icons/android-icon-48x48.png","d0c20f086acb9e7d334774aa0c644222"],["/js13k-2d/assets/icons/android-icon-72x72.png","5772f657b9191f274c910f39f142d7f6"],["/js13k-2d/assets/icons/android-icon-96x96.png","2c688613c93e6859a4da4bc2046e46ea"],["/js13k-2d/assets/icons/apple-icon-114x114.png","9f0a6eab5fa18fde646af212e22498a6"],["/js13k-2d/assets/icons/apple-icon-120x120.png","dfcd670ecae16054db8b8dd28bc0d76e"],["/js13k-2d/assets/icons/apple-icon-144x144.png","648be82fa078d1d95d3bf14ff0433dbd"],["/js13k-2d/assets/icons/apple-icon-152x152.png","2e303649263374fa31adce1165dc7d18"],["/js13k-2d/assets/icons/apple-icon-180x180.png","e5bf2a6bc77a7000bdea88138b051017"],["/js13k-2d/assets/icons/apple-icon-57x57.png","d8f346181ba3179498653242844b2c41"],["/js13k-2d/assets/icons/apple-icon-60x60.png","678edb9b08a1f8ed8c9d653d6861496d"],["/js13k-2d/assets/icons/apple-icon-72x72.png","5772f657b9191f274c910f39f142d7f6"],["/js13k-2d/assets/icons/apple-icon-76x76.png","23308d71702ba52dba4c3dd6a8f5b41d"],["/js13k-2d/assets/icons/apple-icon-precomposed.png","ad43e9d0e673b8cb7c367b117e3f1375"],["/js13k-2d/assets/icons/apple-icon.png","ad43e9d0e673b8cb7c367b117e3f1375"],["/js13k-2d/assets/icons/favicon-16x16.png","27e109296b179fcfae41e2c17237b8b3"],["/js13k-2d/assets/icons/favicon-32x32.png","e67046ff0fcc956d56daf53345ac0517"],["/js13k-2d/assets/icons/favicon-96x96.png","2c688613c93e6859a4da4bc2046e46ea"],["/js13k-2d/assets/icons/favicon.ico","4a6ea6b3d8f4826018e6ea035ff6366d"],["/js13k-2d/assets/icons/ms-icon-144x144.png","648be82fa078d1d95d3bf14ff0433dbd"],["/js13k-2d/assets/icons/ms-icon-150x150.png","082afe89b120da2a64d80b13d4608499"],["/js13k-2d/assets/icons/ms-icon-310x310.png","d546d118a4104aaabb79808666e1caab"],["/js13k-2d/assets/icons/ms-icon-70x70.png","8662221ffa5a2e5a2339b0405b849715"],["/js13k-2d/bundle.1fb2e.js","86c476a6e6d30b94790016f6fe6f596a"],["/js13k-2d/favicon.ico","4a6ea6b3d8f4826018e6ea035ff6366d"],["/js13k-2d/index.html","b570c92734cf123f96f99c84fe6d2610"],["/js13k-2d/manifest.json","44631ad5fc38eb0fe9fa75429f6ea51f"],["/js13k-2d/route-bunnymark.chunk.b8af6.js","b29bd2662bb858369fa57c89cafc95ed"],["/js13k-2d/route-home.chunk.3fcab.js","de77f648864650d0588093ff8780d731"],["/js13k-2d/style.e73e2.css","23697a03795b81c842c0c026024ca5d6"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,s){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=s),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(s){return new Response(s,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,s,n,a){var t=new URL(e);return a&&t.pathname.match(a)||(t.search+=(t.search?"&":"")+encodeURIComponent(s)+"="+encodeURIComponent(n)),t.toString()},isPathWhitelisted=function(e,s){if(0===e.length)return!0;var n=new URL(s).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,s){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return s.every(function(s){return!s.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var s=e[0],n=e[1],a=new URL(s,self.location),t=createCacheKey(a,hashParamName,n,!1);return[a.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(s){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!s.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(s){if(!s.ok)throw new Error("Request for "+n+" returned a response with status "+s.status);return cleanResponse(s).then(function(s){return e.put(n,s)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var s=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!s.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var s,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(s=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),s=urlsToCacheKeys.has(n));!s&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("index.html",self.location).toString(),s=urlsToCacheKeys.has(n)),s&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(s){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,s),fetch(e.request)}))}});
'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"icons/Icon-512.png": "61f9d0907b15041c58f595405c2fc9e0",
"icons/Icon-maskable-512.png": "fb174ff44b53fafeac1aea0fbbd5737b",
"icons/Icon-192.png": "61f9d0907b15041c58f595405c2fc9e0",
"icons/Icon-maskable-192.png": "fb174ff44b53fafeac1aea0fbbd5737b",
"manifest.json": "f4f8662a8523523a74c592fdbb4e3200",
"index.html": "004322b03e425fc95e66a8ccf938507d",
"/": "004322b03e425fc95e66a8ccf938507d",
"google188a82e5af12d6fb.html": "0cf1db423e154e9625b8d9ad0d5ccadf",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin.json": "4399d9ccf5bb30c658536942b491196a",
"assets/assets/data.json": "96fec37a5db6cb2d5cb81cc22e754405",
"assets/assets/images/app1/playstore_screen-2-folders-create-subfolder-light.png": "ca4aca29d2eac15736c2b3a77383c084",
"assets/assets/images/app1/playstore_screen-4-edit-menu-attach-media-files.png": "1176975423aa7754b82c7826ba692c11",
"assets/assets/images/app1/playstore_screen-1-home-notes-list-light.png": "c24e40138ced838c3e13543955bc179f",
"assets/assets/images/app1/playstore_screen-1-login.png": "f8b3b1ac9cc854c34ec8d6bd85ccbfb9",
"assets/assets/images/app1/playstore_screen-1-home-notes-list-dark.png": "f5836f09c3efceae95ec167ea5fffb4b",
"assets/assets/images/app1/playstore_screen-2-folders-create-subfolder-dark.png": "94f342104a37195ada815a35310849c3",
"assets/assets/images/app1/playstore_screen-2-folders-create-parent-folder.png": "210711e68bb26324cd7d4e2e9a2e0b39",
"assets/assets/images/app1/playstore_screen-3-settings-user-details.png": "4ec76d53a96c7a156c3ae945ecc8f564",
"assets/assets/images/app1/icon.png": "463b169ceb87a239aa0708fab059fe90",
"assets/assets/images/app1/playstore_screen-3-settings-history.png": "4e52e085b7b60ed6d30defb00080717d",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-frames-light.png": "df4d3a9d56834b348dc6126d90c36cdb",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-light-theme-dark.png": "a960e480e407ba088599c5e377290d1c",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-frames-playback-light.png": "28d3032cf25f3f1e71642923081299dc",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-grid-styles-light.png": "282166e467fe31538245c060f76df461",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-frames-reorder-dark.png": "dff912d872ace13152d2127586ffcdf9",
"assets/assets/images/app1/playstore_screen-3-settings.png": "6e020b8e7508592fcf6c3bd46d8309fd",
"assets/assets/images/app1/playstore_screen-3-settings-create-passcode-dark.png": "2b9e578f31a770a4c1d2df444552eb26",
"assets/assets/images/app1/playstore_screen-4-edit-menu-insert-list-headings-scribble-pad-dark.png": "d70885a54e0d728c4589ba6eaf4da6e7",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-frames-name-light.png": "26bc15c6b64344f073cad42548319c5d",
"assets/assets/images/app1/playstore_screen-1-home-search-notes-dark.png": "d8da3422f3f73e1c7a48ec1a4013dd22",
"assets/assets/images/app1/playstore_screen-4-edit-note-backgrounds.png": "2b87c0dcce1918aa18741c8a32e2a419",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-light-theme-light.png": "600f3384730c8558e7d2de2ef4053126",
"assets/assets/images/app1/playstore_screen-2-folders.png": "0f05cff2039e4d76b95d6b87e1a0634c",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-frames-reorder-light.png": "81f45035391585aa0bb98966f5087170",
"assets/assets/images/app1/playstore_screen-4-edit-menu-format.png": "6b58bae6ee8b9af4bc0a6e898670cbe1",
"assets/assets/images/app1/playstore_screen-3-settings-theme-material-you.png": "dde1c8e5122f9750407469ece2044745",
"assets/assets/images/app1/playstore_screen-4-edit-scribble-pad-frames-playback-dark.png": "7c502a3159b9d56c43ec262961803b8a",
"assets/assets/images/app1/playstore_screen-4-edit-menu-insert-list-headings-scribble-pad-light.png": "0c3c29dcaea3e9108abab63c43ea4ba6",
"assets/assets/images/app2/playstore_screen-4-upcoming.png": "197fb22dcb185783af0eb6dbfa3ece30",
"assets/assets/images/app2/playstore_screen-1-app-launch-2.png": "0c7695a3f0c905e403dd34244c9ee206",
"assets/assets/images/app2/playstore_screen-2-app-setup-parse-anayse-finance.png": "9ee337e2479ce6d4e43b7153165d64b8",
"assets/assets/images/app2/playstore_screen-2-inbox-search-by.png": "832e2657573938cb8f82ea6a9618719f",
"assets/assets/images/app2/icon.png": "52152922b72de87318569fcdb89e687a",
"assets/assets/images/app2/playstore_screen-2-app-setup-parse.png": "0acf79e8cb6fb1bd686803f28b57d10c",
"assets/assets/images/app2/playstore_screen-5-settings-spam-manage.png": "a3f5be7745beda26c8e24293235dcdcc",
"assets/assets/images/app2/playstore_screen-5-settings-sender-mapping-dialog.png": "35d6d997ab37f6a4311ee4c4fca12e2c",
"assets/assets/images/app2/playstore_screen-5-settings-logs.png": "5c7ffda18d2ad0e523ce110e9af3100e",
"assets/assets/images/app2/playstore_screen-5-settings-theme.png": "7b774bb3f1f3d7b58d228d6a10670777",
"assets/assets/images/app2/playstore_permission-1-deafult-app.png": "2ff4f70f9cb8d05d1a5b811254f9939c",
"assets/assets/images/app2/playstore_screen-5-settings-sender-mapping-list.png": "afbf5f5eb65cd76f0a2a47732e49271f",
"assets/assets/images/app2/playstore_screen-3-finance-analytics.png": "40040efc0c88c8a0a9917da91526b89d",
"assets/assets/images/app2/playstore_screen-5-settings.png": "4d8e9a314f1d7449bf64b3e5009310c6",
"assets/assets/images/app2/playstore_screen-5-settings-cloud-backup.png": "342ce43ae528258af8b5e9b8e4eb988d",
"assets/assets/images/app2/playstore_screen-1-app-launch-3.png": "0c1cc65a4bf4025c9a7cd0370a2e7b7b",
"assets/assets/images/app2/playstore_screen-2-inbox-search-by-date.png": "dbce067d3a43c983db8fca6ae983d218",
"assets/assets/images/app2/playstore_screen-1-app-launch-1.png": "fda3a7f6b32d1f6f83b35a818833d6a0",
"assets/assets/images/app2/playstore_screen-5-settings-operations.png": "2e578b34e07bafe5ddbcff8d3e079b8b",
"assets/assets/images/app2/playstore_screen-5-settings-sender-mapping-list-2.png": "e52b4164e087e685ea490dccc6761861",
"assets/assets/developers/banner.png": "a6e984d9007021220cca847d8ae59d72",
"assets/assets/developers/nsu_logo.png": "fb174ff44b53fafeac1aea0fbbd5737b",
"assets/assets/developers/dev-avatar.png": "a9a7bfb9f453cb09d390bbc26f29e4b9",
"assets/assets/developers/play_store_banner.png": "4d93faa165cb0a7a54e5c933784fcf8c",
"assets/fonts/MaterialIcons-Regular.otf": "53a134128217ca49120184d438019442",
"assets/NOTICES": "ead7d59f08e8dadf06667c4ccb45e1d6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Solid-900.otf": "338f6df29f4260055704bf4eb5ba01f7",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Brands-Regular-400.otf": "d063eaac27ce65a8efb0a297cc4ea8f0",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Regular-400.otf": "b2703f18eee8303425a5342dba6958db",
"assets/FontManifest.json": "c75f7af11fb9919e042ad2ee704db319",
"assets/AssetManifest.bin": "c163d4d2c5eb33e7290ad0bb1a63edcb",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"favicon.png": "61f9d0907b15041c58f595405c2fc9e0",
"flutter_bootstrap.js": "bb177da8a9e7d4db53ce9d65150a5630",
"version.json": "17c152eb51951229de6b0dc863d285a0",
"main.dart.js": "e6d2e4d21e07cf328cc8e287166995ea"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

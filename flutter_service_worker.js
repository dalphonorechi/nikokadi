'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "49382cd89a7757137790686e3fd236f1",
"assets/assets/cardback2.png": "49522fd2e055e3581905ef16bcf3f68b",
"assets/assets/card_imagery/back_001.png": "28c80e04ab991b80cc2aa5d18aa879aa",
"assets/assets/card_imagery/club.png": "d1fd0ca4bd3ccc4c5e852f3ce15dccd8",
"assets/assets/card_imagery/diamond.png": "f2eb19afc052c30eb571e4c6c6046d68",
"assets/assets/card_imagery/heart.png": "6f7fcfdfc88ec70f6bc4dcd339568b03",
"assets/assets/card_imagery/jc.png": "104dca27ba3f0734a5fde520f94d0eb3",
"assets/assets/card_imagery/jd.png": "ae263f367ef9e4c4b8ad40563623cea7",
"assets/assets/card_imagery/jh.png": "f7730fbbcf96889e45d2f9958ff825aa",
"assets/assets/card_imagery/js.png": "137bbce282a776498eb8b33618a77db9",
"assets/assets/card_imagery/kc.png": "cf60d0e257ec768bfee576f261e1a644",
"assets/assets/card_imagery/kd.png": "806f30f77fcf9f11249ac3bb0174965b",
"assets/assets/card_imagery/kh.png": "ce45da39c0f70540e158b16a0a8ead86",
"assets/assets/card_imagery/ks.png": "660271be7e65fe06f3b2034a83af6f24",
"assets/assets/card_imagery/qc.png": "85d80978a888f5a7a61eb016dddee679",
"assets/assets/card_imagery/qd.png": "01751a267acc9e7a5fd4b1373e9d3179",
"assets/assets/card_imagery/qh.png": "2d142e0a95f0adbd44b5c7c0172ef577",
"assets/assets/card_imagery/qs.png": "c01ffe97d768bb26c1293749647dfcfd",
"assets/assets/card_imagery/spade.png": "981c0b10f109bd3e9cb408b61f7a33a7",
"assets/assets/mask1.svg": "d0d83c3c66b895b612e05208be7f94b0",
"assets/assets/mask2.svg": "521de4c7f9ee262b37bc7efc938f7737",
"assets/assets/mask3.svg": "09dcf15a6cdcd0df4f91cde27418667e",
"assets/assets/mask4.svg": "fa768155f656934f9b083f8ceb54c367",
"assets/assets/mask5.svg": "776c9d8381a71b68bca200f6334287df",
"assets/assets/mask6.svg": "260c4a24cce73b0423f5adae81aa9e01",
"assets/FontManifest.json": "41abe49bc17d9629565566e09646d8bd",
"assets/fonts/Autography.otf": "b3b881b1c5338876288b4bda8d91df0a",
"assets/fonts/Autography.ttf": "c586e63a33fca0ab1f2fa3179f66c886",
"assets/fonts/LoveloBlack.ttf": "e76eec232a4dcc7b377f166f77c15d5e",
"assets/fonts/LoveloLineBold.ttf": "1023565d5a27f3e7d9fd6e6423beb6d5",
"assets/fonts/LoveloLineLight.ttf": "db8d3b2a8a193b347408056a26e37946",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/fonts/MaterialIcons-Regular.ttf": "ae32dbe51d4790fafcc0b8c76e02035a",
"assets/fonts/MyFlutterApp.ttf": "569a247a6dc32f3b24f9420c9a7f1338",
"assets/NOTICES": "619a324d4e7c188195cc63f625188942",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/apple-touch-icon.png": "2a9397f9af8eff89b77705d85c2730b8",
"icons/favicon.ico": "e7bdcf7b29c385cdfa1dabfa9203b1cb",
"icons/icon-192-maskable.png": "7566de29697b96e68d10fc96af778566",
"icons/Icon-192.png": "44e81678911741d8042afaeada648a6d",
"icons/icon-512-maskable.png": "fc08bd4a15070f03405152138f66a305",
"icons/Icon-512.png": "63927ea0d25a61e807245b1ea0af54fe",
"index.html": "49c9fca47cf4c060e1693df2afee5a16",
"/": "49c9fca47cf4c060e1693df2afee5a16",
"main.dart.js": "7325551ee1953b65f93377f34c47533a",
"manifest.json": "0630a663ae337873744c20b56b8e75b5",
"nikokadi.png": "ae208a9080abcd977abd9dfadf2188db",
"style.css": "f63cf1f62241f3cc2dd2b79185f88316",
"version.json": "6d4f15c26b74c3173da15e028db39b65"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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

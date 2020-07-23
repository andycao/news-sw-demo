/* eslint-disable */

// 开始安装
self.addEventListener("install", event => {
    console.log("installing");
    self.skipWaiting();

    // 这里适合做静态资源预加载
    event.waitUntil(
        caches.open("install-cache3").then(function (cache) {
            // 一般资源，非阻塞
            // cache.addAll();

            // 适合核心资源
            return cache.addAll([
                "/static/js/bundle.js",
                "/style.css",
                // etc
            ]);
        })
    );
});

// 激活阶段
self.addEventListener("activate", event => {
    console.log("active");
});

// 响应请求
self.addEventListener("fetch", event => {
    // cacheFirst(event);
    // networkFirst(event);
    myControl(event);
});

self.addEventListener("push", function (event) {
    console.log("push ", event.data.text());
});

// 缓存优先, fallback到网络
function cacheFirst(event) {
    event.respondWith(
        // 存储库
        caches.open("test-cache").then(cache => {
            return cache.match(event.request).then(resp => {
                return (
                    resp ||
                    fetch(event.request).then(newResp => {
                        cache.put(event.request, newResp.clone());
                        return newResp;
                    })
                );
            });
        })
    );
}

// 网络优先 fallback到cache
function networkFirst(event) {
    event.respondWith(
        caches.open("test-cache2").then(cache => {
            return fetch(event.request)
                .then(resp => {
                    // todo 增加比较，不需每次更新
                    cache.put(event.request, resp.clone());
                    return resp;
                })
                .catch(function () {
                    return cache.match(event.request);
                });
        })
    );
}

// 根据文件类型控制
function myControl(event) {
    // Parse the URL:
    const requestURL = new URL(event.request.url);

    // local request
    if (requestURL.origin == location.origin) {
        // api data
        if (
            event.request.method == "GET" &&
            /^\/api\//.test(requestURL.pathname)
        ) {
            networkFirst(event);
            return;
        }

        // files
        if (/\.js|.css|.ico|.png$/.test(requestURL.pathname)) {
            cacheFirst(event);
            return;
        }
    }

    // 默认逻辑
    event.respondWith(fetch(event.request));
}

// stale-while-revalidate
function staleWhileRevalidate(event) {
    self.addEventListener("fetch", function (event) {
        event.respondWith(
            caches.open("cacheName").then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    var fetchPromise = fetch(event.request).then(function (
                        networkResponse
                    ) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });
            })
        );
    });
}

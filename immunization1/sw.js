self.addEventListener("install", e => {
  console.log("install");
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll(["./",".\css\dragAndDropStyle.css",".\images\logo192.png"])
    })
  );
});

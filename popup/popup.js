const homeRecommendations = document.querySelector("#home-recommendations");
const sidebar = document.querySelector("#sidebar");
const videoRecommendations = document.querySelector("#video-recommendations");
const comments = document.querySelector("#comments");

chrome.storage.sync.get(
  [
    "homepage_recommendations",
    "homepage_sidebar",
    "video_comments",
    "video_recommendations",
  ],
  (result) => {
    console.log(result);

    if (result.homepage_recommendations) homeRecommendations.checked = true;
    if (result.video_recommendations) videoRecommendations.checked = true;
    if (result.video_comments) comments.checked = true;
    if (result.homepage_sidebar) sidebar.checked = true;
  }
);

homeRecommendations.addEventListener("click", () => {
  let params = { active: true, currentWindow: true };
  chrome.tabs.query(params, (tabs) => {
    console.log(tabs);
    const action = "display-recommendations";
    const value = homeRecommendations.checked;
    chrome.storage.sync.set({
      homepage_recommendations: value,
    });
    console.log(value);
    chrome.tabs.sendMessage(tabs[0].id, { action, value });
  });
});

sidebar.addEventListener("click", () => {
  let params = { active: true, currentWindow: true };
  chrome.tabs.query(params, (tabs) => {
    console.log(tabs);
    const action = "display-sidebar";
    const value = sidebar.checked;
    chrome.storage.sync.set({
      homepage_sidebar: value,
    });
    console.log(value);
    chrome.tabs.sendMessage(tabs[0].id, { action, value });
  });
});

videoRecommendations.addEventListener("click", () => {
  let params = { active: true, currentWindow: true };
  chrome.tabs.query(params, (tabs) => {
    console.log(tabs);
    const action = "display-video-recommendations";
    const value = videoRecommendations.checked;
    chrome.storage.sync.set({
      video_recommendations: value,
    });
    console.log(value);
    chrome.tabs.sendMessage(tabs[0].id, { action, value });
  });
});

comments.addEventListener("click", () => {
  let params = { active: true, currentWindow: true };
  chrome.tabs.query(params, (tabs) => {
    console.log(tabs);
    const action = "display-video-comments";
    const value = comments.checked;
    chrome.storage.sync.set({
      video_comments: value,
    });
    console.log(value);
    chrome.tabs.sendMessage(tabs[0].id, { action, value });
  });
});

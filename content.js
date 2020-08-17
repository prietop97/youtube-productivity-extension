const getSidebar = () => {
  let sidebar = document.querySelector("#sections");
  let otherSidebar = document.querySelector("ytd-mini-guide-renderer");
  return [sidebar, otherSidebar];
};

const getHomeRecommendations = () => {
  return [document.querySelector("#primary")];
};

const getVideoRecommendations = () => {
  const bigScreen = document.querySelector("#secondary-inner");
  const smallScreen = document.querySelector("#related");
  return [bigScreen, smallScreen];
};
const getComments = () => {
  return [document.querySelector("#comments")];
};

const changeDisplay = (arr, saved) => {
  if (saved) {
    arr.forEach((x) => {
      if (x && x.style) {
        x.style["display"] = "block";
      }
    });
  } else {
    arr.forEach((x) => {
      if (x && x.style) {
        x.style["display"] = "none";
      }
    });
  }
};

chrome.storage.sync.get(
  [
    "homepage_recommendations",
    "homepage_sidebar",
    "video_recommendations",
    "video_comments",
  ],
  (result) => {
    changeDisplay(getSidebar(), result.homepage_sidebar);
    changeDisplay(getHomeRecommendations(), result.homepage_recommendations);
    changeDisplay(getVideoRecommendations(), result.video_recommendations);
    changeDisplay(getComments(), result.video_comments);
  }
);

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message);
  if (message.action === "display-recommendations") {
    changeDisplay(getHomeRecommendations(), message.value);
  }
  if (message.action === "display-sidebar") {
    changeDisplay(getSidebar(), message.value);
  }
  if (message.action === "display-video-recommendations") {
    changeDisplay(getVideoRecommendations(), message.value);
  }
  if (message.action === "display-video-comments") {
    changeDisplay(getComments(), message.value);
  }
}

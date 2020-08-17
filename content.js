console.log("Chrome extenstion ready to go.");

const getRecommendations = () => {
  return document.querySelector("#secondary-inner");
};
const getComments = () => {
  return document.querySelector("#comments");
};
const getRelated = () => {
  return document.querySelector("#related");
};

chrome.storage.sync.get(
  ["video_recommendations", "video_comments"],
  (result) => {
    let recommendations = getRecommendations();
    let comments = getComments();
    let related = getRelated();
    if (Object.keys(result).length < 2) {
      recommendations.style["visibility"] = "hidden";
      comments.style["visibility"] = "hidden";
      related.style["visibility"] = "hidden";
      chrome.storage.sync.set({
        video_recommendations: false,
        video_comments: false,
      });
    } else {
      if (result.video_recommendations === false) {
        related.style["visibility"] = "hidden";
        recommendations.style["visibility"] = "hidden";
      }
      if (result.video_comments === false) {
        comments.style["visibility"] = "hidden";
      }
    }
  }
);

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message);
  if (message.action === "display-video-recommendations") {
    let recommendations = getRecommendations();
    let related = getRelated();
    if (message.value) {
      recommendations.style["visibility"] = "visible";
      related.style["visibility"] = "visible";
    } else {
      recommendations.style["visibility"] = "hidden";
      related.style["visibility"] = "hidden";
    }
  }
  if (message.action === "display-video-comments") {
    let comments = getComments();
    if (message.value) {
      comments.style["visibility"] = "visible";
    } else {
      comments.style["visibility"] = "hidden";
    }
  }
}

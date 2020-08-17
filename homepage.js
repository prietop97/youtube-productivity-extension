const getSidebar = () => {
  let sidebar = document.querySelector("#sections");
  if (!sidebar) sidebar = document.querySelector("ytd-mini-guide-renderer");
  return sidebar;
};

const getRecommendations = () => {
  return document.querySelector("#primary");
};

chrome.storage.sync.get(
  ["homepage_recommendations", "homepage_sidebar"],
  (result) => {
    console.log(result);
    let sidebar = getSidebar();
    let recommendations = getRecommendations();
    if (Object.keys(result).length < 2) {
      console.log("RUNNING");
      recommendations.style["visibility"] = "hidden";
      sidebar.style["visibility"] = "hidden";
      chrome.storage.sync.set({
        homepage_recommendations: false,
        homepage_sidebar: false,
      });
    } else {
      if (result.homepage_recommendations === false)
        recommendations.style["visibility"] = "hidden";
      if (result.homepage_sidebar === false)
        sidebar.style["visibility"] = "hidden";
    }
  }
);

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message);
  if (message.action === "display-recommendations") {
    let recommendations = getRecommendations();
    if (message.value) {
      recommendations.style["visibility"] = "visible";
    } else {
      recommendations.style["visibility"] = "hidden";
    }
  }
  if (message.action === "display-sidebar") {
    let sidebar = getSidebar();
    if (message.value) {
      sidebar.style["visibility"] = "visible";
    } else {
      sidebar.style["visibility"] = "hidden";
    }
  }
}

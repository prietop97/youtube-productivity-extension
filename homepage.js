const recommendations = document.querySelector("#primary");

recommendations.style["display"] = "none";
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message);
  if (message.action === "display-recommendations" && recommendations) {
    if (message.value) {
      recommendations.style["display"] = "block";
    } else {
      recommendations.style["display"] = "none";
    }
  }
}

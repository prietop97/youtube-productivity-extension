const homeRecommendations = document.querySelector("#home-recommendations");
homeRecommendations.addEventListener("click", () => {
  let params = { active: true, currentWindow: true };
  chrome.tabs.query(params, (tabs) => {
    console.log(tabs);
    const action = "display-recommendations";
    const value = homeRecommendations.checked;
    console.log(value);
    chrome.tabs.sendMessage(tabs[0].id, { action, value });
  });
});

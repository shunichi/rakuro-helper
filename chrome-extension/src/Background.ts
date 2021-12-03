export {};

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab == null || tab.id == null) return;

  chrome.tabs.sendMessage(tab.id, {type: "extract"});
});

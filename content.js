// 1: Unless background returns a Promise in its onMessage, this promise is
// rejected with:
// "The message port closed before a response was received."
browser.runtime
  .sendMessage("hello from content")
  .then(console.log, console.error);



// 2: This does not seem to cause any errors:
// chrome.runtime.sendMessage("hello from content");
// console.log("content: after chrome.runtime.sendMessage", chrome.runtime.lastError);



// 3: Inside the callback, `chrome.runtime.lastError` will be:
// "The message port closed before a response was received."
// It seems like if `sendMessage` defines a callback but the other end doesn't
// respond, Chrome is treating that as an error. Which makes sense.
// The question is how this should be handled in a Promise based API.
// chrome.runtime.sendMessage("hello from content", response => {
//   console.log("content: callback", response, chrome.runtime.lastError);
// });
// console.log(
//   "content: after chrome.runtime.sendMessage with callback",
//   chrome.runtime.lastError
// );

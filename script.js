// The magic code

document.addEventListener("click", function (event) {
  event.stopImmediatePropagation();
  event.stopPropagation();
  if (event === undefined) event = window.event; // IE hack
  var target = "target" in event ? event.target : event.srcElement; // another IE hack
  path = createXPathFromElement(target);
  localStorage["sero"] = [path, window.location.href];
  console.log(path);
});

// for (let elem of document.querySelectorAll("*")) {
//   elem.addEventListener(
//     "click",
//     (e) => console.log(`Capturing: ${elem.tagName}`),
//     true
//   );
//   elem.addEventListener("click", (e) =>
//     console.log(`Bubbling: ${elem.tagName}`)
//   );
// }

// let obj = {
//   handleEvent(event) {
//     console.log("raised", event);
//   },
// };

// document.addEventListener("click", obj);
// document.addEventListener("mousedown", obj);
// document.addEventListener("mouseup", obj);

// document.addEventListener("mouseup", function (event) {
//   if (event === undefined) event = window.event; // IE hack
//   var target = "target" in event ? event.target : event.srcElement; // another IE hack
//   console.log("target", target);
//   path = createXPathFromElement(target);
//   localStorage["sero"] = [path, window.location.href];
//   console.log(path);
// });

// document.addEventListener("mousedown", function (event) {
//   if (event === undefined) event = window.event; // IE hack
//   var target = "target" in event ? event.target : event.srcElement; // another IE hack
//   console.log("target", target);
//   path = createXPathFromElement(target);
//   localStorage["sero"] = [path, window.location.href];
//   console.log(path);
// });

function createXPathFromElement(element) {
  var allNodes = document.getElementsByTagName("*");

  for (
    var segments = [];
    element && element.nodeType == 1;
    element = element.parentNode
  ) {
    // if (element.hasAttribute("id")) {
    //   var uniqueIdCount = 0;
    //   for (var n = 0; n < allNodes.length; n++) {
    //     if (allNodes[n].hasAttribute("id") && allNodes[n].id == element.id)
    //       uniqueIdCount++;
    //   }
    //   if (uniqueIdCount === 1) {
    //     return `//${element.localName.toLowerCase()}[@id='${element.getAttribute(
    //       "id"
    //     )}']`;
    //   }
    // }
    let i = 1;
    for (
      i, sibling = element.previousSibling;
      sibling;
      sibling = sibling.previousSibling
    ) {
      if (sibling.localName === element.localName) i++;
    }
    segments.unshift(element.localName.toLowerCase() + "[" + i + "]");
  }
  return segments.length ? `/${segments.join("/")}` : null;
}

// function lookupElementByXPath(path) {
//   var evaluator = new XPathEvaluator();
//   var result = evaluator.evaluate(
//     path,
//     document.documentElement,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   );
//   return result.singleNodeValue;
// }

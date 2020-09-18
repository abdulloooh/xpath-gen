document.onclick = function (event) {
  if (event === undefined) event = window.event; // IE hack
  var target = "target" in event ? event.target : event.srcElement; // another IE hack

  path = createXPathFromElement(target);

  localStorage["sero"] = [path, window.location.href];
  console.log(path);
};

function createXPathFromElement(element) {
  var allNodes = document.getElementsByTagName("*");

  for (
    var segments = [];
    element && element.nodeType == 1;
    element = element.parentNode
  ) {
    if (element.hasAttribute("id")) {
      var uniqueIdCount = 0;
      for (var n = 0; n < allNodes.length; n++) {
        if (allNodes[n].hasAttribute("id") && allNodes[n].id == element.id)
          uniqueIdCount++;
      }
      if (uniqueIdCount === 1) {
        return `//${element.localName.toLowerCase()}[@id="${element.getAttribute(
          "id"
        )}"]`;
      }
    }
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

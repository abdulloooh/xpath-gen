document.onclick = function (event) {
  if (event === undefined) event = window.event; // IE hack
  var target = "target" in event ? event.target : event.srcElement; // another IE hack

  var root =
    document.compatMode === "CSS1Compat"
      ? document.documentElement
      : document.body;
  //var path= getPathTo(target);
  path = createXPathFromElement(target);

  //alert(lookupElementByXPath(createXPathFromElement(target)));
  localStorage["sero"] = [path, window.location.href];
};

function createXPathFromElement(elm) {
  var allNodes = document.getElementsByTagName("*");
  for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
    if (elm.hasAttribute("id")) {
      var uniqueIdCount = 0;
      for (var n = 0; n < allNodes.length; n++) {
        if (allNodes[n].hasAttribute("id") && allNodes[n].id == elm.id)
          uniqueIdCount++;
        if (uniqueIdCount > 1) break;
      }
      if (uniqueIdCount == 1) {
        segs.unshift('id("' + elm.getAttribute("id") + '")');
        return segs.join("/");
      } else {
        segs.unshift(
          elm.localName.toLowerCase() + '[@id="' + elm.getAttribute("id") + '"]'
        );
      }
    }
    //else if (elm.hasAttribute('class')) {
    //   segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
    // }
    else {
      for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.localName == elm.localName) i++;
      }
      segs.unshift(elm.localName.toLowerCase() + "[" + i + "]");
    }
  }
  return segs.length ? "/" + segs.join("/") : null;
}

//below here is for something else

function lookupElementByXPath(path) {
  var evaluator = new XPathEvaluator();
  var result = evaluator.evaluate(
    path,
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
}
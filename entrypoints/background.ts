function inspectPageWindow(): void {
  const iframe = document.createElement("iframe");
  iframe.hidden = true;
  iframe.src = "about:blank";
  document.documentElement.append(iframe);

  try {
    const cleanWindow = iframe.contentWindow;
    if (!cleanWindow) throw new Error("Could not create a clean window realm");

    const cleanKeys = new Set(Reflect.ownKeys(cleanWindow).map(String));
    const pageKeys = Reflect.ownKeys(window).map(String);
    const added = pageKeys.filter((key) => !cleanKeys.has(key)).sort();
    const changed: string[] = [];

    for (const key of pageKeys) {
      if (!cleanKeys.has(key)) continue;
      try {
        const pageValue = Reflect.get(window, key);
        const cleanValue = Reflect.get(cleanWindow, key);
        const pageType = typeof pageValue;
        const cleanType = typeof cleanValue;
        if (pageType !== cleanType) {
          changed.push(key);
          continue;
        }
        if (pageType === "function") {
          const pageSource = Function.prototype.toString.call(pageValue);
          const cleanSource = Function.prototype.toString.call(cleanValue);
          if (pageSource !== cleanSource) changed.push(key);
        }
      } catch {
        // Accessors on Window may throw; those are not actionable differences.
      }
    }

    const result = { added, changed: changed.sort() };
    console.group("WindowDiffer result");
    console.table({ added: added.length, changed: changed.length });
    console.log(result);
    console.groupEnd();
    window.dispatchEvent(new CustomEvent("window-differ:result", { detail: result }));
  } finally {
    iframe.remove();
  }
}

export default defineBackground(() => {
  browser.action.onClicked.addListener(async (tab) => {
    if (tab.id == null) return;
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      world: "MAIN",
      func: inspectPageWindow
    });
  });
});

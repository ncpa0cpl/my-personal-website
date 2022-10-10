const pushState = history.pushState;
history.pushState = function (...args) {
  pushState.apply(history, args);
  window.dispatchEvent(new Event("pushstate"));
};

const replaceState = history.replaceState;
history.replaceState = function (...args) {
  replaceState.apply(history, args);
  window.dispatchEvent(new Event("replacestate"));
};

class AnchorExtended extends HTMLAnchorElement {
  private hrefObserver?: MutationObserver;
  private naviagationListeners: [string, () => void][] = [];

  private parseHref(href: string) {
    if (href.startsWith(".?")) {
      const params = new URLSearchParams(href.slice(1));
      const url = new URL(window.location.href);

      for (const [paramName, paramValue] of params.entries()) {
        url.searchParams.set(paramName, paramValue);
      }

      url.hash = "";

      return url.toString();
    }

    return href;
  }

  private updateHref() {
    const href = this.getAttribute("data-href");
    if (href) {
      const newHref = this.parseHref(href);
      if (newHref !== this.getAttribute("href"))
        this.setAttribute("href", newHref);
    }
  }

  connectedCallback() {
    this.updateHref();

    this.hrefObserver = new MutationObserver(() => this.updateHref());

    this.hrefObserver.observe(this, {
      attributes: true,
      attributeFilter: ["data-href"],
    });

    const onNavigationChange = () => this.updateHref();

    window.addEventListener("pushstate", onNavigationChange);
    window.addEventListener("replacestate", onNavigationChange);
    window.addEventListener("popstate", onNavigationChange);

    this.naviagationListeners = [
      ["pushstate", onNavigationChange],
      ["replacestate", onNavigationChange],
      ["popstate", onNavigationChange],
    ];
  }

  disconnectedCallback() {
    if (this.hrefObserver) this.hrefObserver.disconnect();

    for (const [eventName, listener] of this.naviagationListeners) {
      window.removeEventListener(eventName, listener);
    }
  }
}

customElements.define("anchor-extended", AnchorExtended, { extends: "a" });

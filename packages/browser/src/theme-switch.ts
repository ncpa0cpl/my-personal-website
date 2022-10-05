class ThemeSwitch extends HTMLElement {
  private svgObject: HTMLObjectElement | undefined;

  get darkThemeIconSrc() {
    return this.getAttribute("data-dark-theme-icon-src");
  }

  get lightThemeIconSrc() {
    return this.getAttribute("data-light-theme-icon-src");
  }

  private updateIcon() {
    let icon: string | null;
    if (document.body.classList.contains("theme-dark")) {
      icon = this.lightThemeIconSrc;
    } else {
      icon = this.darkThemeIconSrc;
    }

    if (icon) {
      this.svgObject = document.createElement("object");
      this.svgObject.setAttribute("type", "image/svg+xml");
      this.svgObject.setAttribute("data", icon);
      this.svgObject.style.zIndex = "-1";
      this.svgObject.style.pointerEvents = "none";

      this.innerHTML = "";
      this.append(this.svgObject);
    }
  }

  private handleClick = () => {
    const body = document.body;
    if (body.classList.contains("theme-dark")) {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
    } else {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
    }
    this.updateIcon();
  };

  connectedCallback() {
    this.updateIcon();
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
}

customElements.define("theme-switch", ThemeSwitch);

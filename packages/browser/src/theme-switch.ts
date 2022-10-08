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
      this.svgObject.setAttribute(
        "alt",
        "Theme switch icon. Click to switch theme."
      );
      this.svgObject.style.zIndex = "-1";
      this.svgObject.style.pointerEvents = "none";

      this.innerHTML = "";
      this.append(this.svgObject);
    }
  }

  private setDarkTheme() {
    const body = document.body;

    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    localStorage.setItem("theme", "dark");

    this.updateIcon();
  }

  private setLightTheme() {
    const body = document.body;

    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    localStorage.setItem("theme", "light");

    this.updateIcon();
  }

  private handleClick = () => {
    const body = document.body;
    if (body.classList.contains("theme-dark")) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
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

// on load

const theme = localStorage.getItem("theme");

switch (theme) {
  case "light":
    {
      const body = document.body;
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
    }
    break;
  default:
    {
      const body = document.body;
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
    }
    break;
}

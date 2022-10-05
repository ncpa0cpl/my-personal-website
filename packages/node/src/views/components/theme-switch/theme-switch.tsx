import type { HTMLProps } from "jsxte";
import type { SvgName } from "../../../static/assets/icons/svg-name";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "theme-switch": HTMLProps<{
        "data-dark-theme-icon-src": string;
        "data-light-theme-icon-src": string;
      }>;
    }
  }
}

export type ThemeSwitchProps = {
  darkThemeIcon: SvgName;
  lightThemeIcon: SvgName;
};

export const ThemeSwitch = (props: ThemeSwitchProps): JSX.Element => {
  return (
    <theme-switch
      data-dark-theme-icon-src={`/static/assets/icons/${props.darkThemeIcon}.svg`}
      data-light-theme-icon-src={`/static/assets/icons/${props.lightThemeIcon}.svg`}
    />
  );
};

import clsx from "clsx";
import type { LinkProps } from "jsxte-web-frames";
import { Link } from "jsxte-web-frames";

export type LinkButtonProps = LinkProps & {};

export const LinkButton = (props: LinkButtonProps) => {
  const { class: className, ...rest } = props;

  return <Link class={clsx(className, "link-btn_element")} {...rest} />;
};

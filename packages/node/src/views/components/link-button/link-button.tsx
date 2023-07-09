import clsx from "clsx";
import { HtmxRouterLink } from "jsxte-htmx";
import type { LinkProps } from "jsxte-web-frames";

export type LinkButtonProps = LinkProps & {};

export const LinkButton = (props: LinkButtonProps) => {
  const { class: className, href, frameName, ...rest } = props;

  return (
    <HtmxRouterLink
      class={clsx(className, "link-btn_element")}
      {...rest}
      href={href}
      hx-vals={forwarderParams}
      hx-push-url="true"
    />
  );
};

// eslint-disable-next-line quotes
const forwarderParams = /* js */ `js:{...getLinkParams()}`;

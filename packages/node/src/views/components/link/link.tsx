export type LinkButtonProps = JSX.IntrinsicElements["a"];

export const Link = (props: LinkButtonProps) => {
  const { class: className, href, ...rest } = props;

  return (
    <a
      class={className}
      {...rest}
      href={href}
      hx-get={href}
      hx-vals={forwarderParams}
      hx-push-url="true"
    />
  );
};

// eslint-disable-next-line quotes
const forwarderParams = /* js */ `js:{
  lang: new URLSearchParams(window.location.search).get("lang"),
}`;

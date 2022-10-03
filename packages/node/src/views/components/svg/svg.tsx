import type { SvgName } from "../../../static/assets/icons/svg-name";

export type SvgProps = {
  name: SvgName;
} & Omit<JSX.IntrinsicElements["object"], "data" | "type">;

export const Svg = (props: SvgProps) => {
  const { name, ...rest } = props;
  return (
    <object
      data={`/static/assets/icons/${name}.svg`}
      type="image/svg+xml"
      {...rest}
    />
  );
};

import clsx from "clsx";

export type CardProps = {} & JSX.IntrinsicElements["div"];

export const Card = (props: CardProps) => {
  const { class: className, ...rest } = props;
  return (
    <div class={clsx("card_box", className)} {...rest}>
      {props.children}
    </div>
  );
};

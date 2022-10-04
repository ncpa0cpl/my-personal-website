import clsx from "clsx";

export type PopDownProps = JSXTE.PropsWithChildren<{
  content: JSX.Element;
  alignTo?: "left" | "right";
}>;

export const PopDown = (props: PopDownProps): JSX.Element => {
  return (
    <div class="pop-down_box">
      <div class="pop-down-main-content_box">{props.children}</div>
      <div
        class={clsx(
          "pop-down-hidden-content-container_box",
          props.alignTo ?? "right"
        )}
      >
        <div class="pop-down-hidden-content_box">{props.content}</div>
      </div>
    </div>
  );
};

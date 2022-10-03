export const ErrorMessage = (props: {
  reload: JSXTE.Component<JSX.IntrinsicElements["button"]>;
}) => {
  const { reload: Reload } = props;

  return (
    <div class="error-msg_box">
      <h2>Something went wrong.</h2>
      <Reload>Try Again</Reload>
    </div>
  );
};

(() => {
  const _global =
    typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof globalThis !== "undefined"
      ? globalThis
      : {};

  const getLinkParams = () => {
    const currentParams = new URLSearchParams(window.location.search);

    return Object.fromEntries(currentParams.entries());
  };

  Object.defineProperty(_global, "getLinkParams", {
    value: getLinkParams,
  });
})();

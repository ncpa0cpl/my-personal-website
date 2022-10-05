import { WebFrame } from "jsxte-web-frames";
import { ErrorMessage } from "./components/error-message/error-message";
import { Loader } from "./components/loader/loader";
import { Navbar } from "./components/navbar/navbar";
import { PageBase } from "./components/page-template/page-template";

export const RootPage = (): JSX.Element => {
  return (
    <PageBase>
      <Navbar />
      <WebFrame
        name="root"
        initialUrl="/home"
        minimumLoadTime={500}
        persistentState={true}
        onError={(reload) => <ErrorMessage reload={reload} />}
        onLoad={() => <Loader />}
      />
    </PageBase>
  );
};

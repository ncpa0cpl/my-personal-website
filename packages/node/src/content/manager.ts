import { ContentManager, HtmlLoader } from "scm";
import { Log } from "../utilities/log";
import type { ContentKey } from "./content-key";
import { YamlLoader } from "./yaml-loader";

export let contentManager: ContentManager<ContentKey>;

async function init() {
  contentManager = await ContentManager.create<ContentKey>(__dirname, [
    HtmlLoader,
    YamlLoader,
  ]);
}

init().catch((e) => Log.error(e));

import { ContentManager, HtmlLoader, JsonLoader } from "scm";
import { Log } from "../utilities/log";
import type { ContentKey } from "./content-key";

export let contentManager: ContentManager<ContentKey>;

async function init() {
  contentManager = await ContentManager.create<ContentKey>(__dirname, [
    HtmlLoader,
    JsonLoader,
  ]);
}

init().catch((e) => Log.error(e));

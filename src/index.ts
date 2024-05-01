import { collection } from "~/routes/collection";
import { family } from "~/routes/family";
import { forum } from "~/routes/forum";
import { forumList } from "~/routes/forumList";
import { guild } from "~/routes/guild";
import { hot } from "~/routes/hot";
import { search } from "~/routes/search";
import { thing } from "~/routes/thing";
import { thread } from "~/routes/thread";
import { user } from "~/routes/user";
import * as plays from "~/routes/plays";

/** @namespace */
export const bgg = {
  collection,
  family,
  forum,
  forumList,
  guild,
  hot,
  search,
  thing,
  thread,
  user,
  plays: { ...plays },
};

export default bgg;

export * from "~/routes/types/index";

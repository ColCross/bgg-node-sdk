import * as collection from "~/routes/collection";
import * as family from "~/routes/family";
import * as guild from "~/routes/guild";
import * as hot from "~/routes/hot";
import * as plays from "~/routes/plays";
import * as search from "~/routes/search";
import * as thing from "~/routes/thing";
import * as user from "~/routes/user";
import * as forumList from "~/routes/forumList";
import * as forum from "~/routes/forum";
import * as thread from "~/routes/thread";

/** @namespace */
export const bgg = {
  ...collection,
  ...family,
  ...forum,
  ...forumList,
  ...guild,
  ...hot,
  ...search,
  ...thing,
  ...thread,
  ...user,
  plays: { ...plays },
};

export default bgg;

export * from "~/routes/types/index";

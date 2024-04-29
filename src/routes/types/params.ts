import {
  boardgame,
  boardgameaccessory,
  boardgamecompany,
  boardgamecompilation,
  boardgameexpansion,
  boardgamefamily,
  boardgameimplementation,
  boardgameintegration,
  boardgameperson,
  Date,
  DateTime,
  family,
  rpg,
  rpgcompany,
  rpgissue,
  rpgitem,
  rpgperiodical,
  rpgperson,
  thing,
  videogame,
  videogamecompany,
} from "~/routes/types/contentTypes";

export type ParamsPlayBase = {
  minDate?: Date;
  maxDate?: Date;
  subtype?: Array<
    | boardgame
    | boardgameexpansion
    | boardgameaccessory
    | boardgameintegration
    | boardgamecompilation
    | boardgameimplementation
    | rpg
    | rpgitem
    | videogame
  >;
  page?: number;
};

export type ParamsPlaysId = ParamsPlayBase & {
  id: string;
  type: thing | family;
};

export type ParamsPlaysUsername = ParamsPlayBase & {
  username: string;
};

export type ParamsCollection = {
  username: string;
  version?: true;
  subtype?:
    | boardgame
    | boardgameaccessory
    | boardgameexpansion
    | rpgissue
    | rpgitem
    | videogame;
  excludesubtype?: string;
  id?: Array<string>;
  brief?: true;
  stats?: true;
  own?: 0 | 1;
  rated?: 0 | 1;
  played?: 0 | 1;
  comment?: 0 | 1;
  trade?: 0 | 1;
  want?: 0 | 1;
  wishlist?: 0 | 1;
  wishlistpriority?: 1 | 2 | 3 | 4 | 5;
  preordered?: 0 | 1;
  wanttoplay?: 0 | 1;
  wanttobuy?: 0 | 1;
  prevowned?: 0 | 1;
  hasparts?: 0 | 1;
  wantparts?: 0 | 1;
  minrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  rating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  minbggrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  bggrating?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  minplays?: number;
  maxplays?: number;
  showprivate?: true;
  collid?: number;
  modifiedsince?: string;
};

export type ParamsFamily = {
  id: Array<string>;
  type?: Array<rpg | rpgperiodical | boardgamefamily>;
};

export type ParamsForum = {
  id: string;
  page?: string;
};

export type ParamsForumList = {
  id: string;
  type: thing | family;
};

export type ParamsGuild = {
  id: string;
  members?: true;
  sort?: "username" | "date";
  page?: string;
};

export type ParamsHot = {
  type: Array<
    | boardgame
    | boardgamecompany
    | boardgameperson
    | rpg
    | rpgcompany
    | rpgperson
    | videogame
    | videogamecompany
  >;
};

export type ParamsSearch = {
  query: string;
  type?: Array<
    boardgame | boardgameaccessory | boardgameexpansion | rpgitem | videogame
  >;
  exact?: boolean;
};

export type ParamsThing = {
  id: Array<string>;
  type?: Array<
    | boardgame
    | boardgameaccessory
    | boardgameexpansion
    | rpgissue
    | rpgitem
    | videogame
  >;
  versions?: true;
  videos?: true;
  stats?: true;
  marketplace?: true;
  comments?: true;
  ratingcomments?: true;
  page?: number;
  pagesize?: number;
};

export type ParamsThread = {
  id: string;
  minArticleId: string;
  minArticleDate: Date | DateTime;
  count: string;
};

export type ParamsUser = {
  name: string;
  buddies?: true;
  guilds?: true;
  hot?: true;
  top?: true;
  domain?: boardgame | rpg | videogame;
  page?: string;
};

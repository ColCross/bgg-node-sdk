/*
  This file contains public types exported through '~/index.ts' for users of this module.
  All other types not in this file are intended for internal use only.
*/

import {
  boardgame,
  boardgameaccessory,
  boardgamecompany,
  boardgameexpansion,
  boardgamefamily,
  boardgameperson,
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
} from "~/routes/types/shared";

//////////////////////////////////////////
// Plays
//////////////////////////////////////////

import { ParamsBase as ParamsBasePlay } from "~/routes/plays/types";

export type ParamsPlaysId = ParamsBasePlay & {
  id: string;
  type: thing | family;
};

export type ParamsPlaysUsername = ParamsBasePlay & {
  username: string;
};

export type PayloadPlaysId = {
  attributes: {
    termsofuse: string;
    total: string;
    page: string;
  };
  plays: Array<{
    id: string;
    date: string;
    quantity: string;
    length: string;
    incomplete: string;
    nowInStats: string;
    location: string;
    item: {
      name: string;
      objectType: string;
      objectId: string;
      subtypes: Array<string>;
    };
    players?: Array<{
      username: string;
      userid: string;
      name: string;
      startPosition: string;
      color: string;
      score: string;
      new: string;
      rating: string;
      win: string;
    }>;
  }>;
};

export type PayloadPlaysUsername = {
  attributes: {
    termsofuse: string;
    username: string;
    userid: string;
    total: string;
    page: string;
  };
  plays: Array<{
    id: string;
    date: string;
    quantity: string;
    length: string;
    incomplete: string;
    nowinstats: string;
    location: string;
    item: {
      name: string;
      objecttype: string;
      objectid: string;
      subtypes: Array<string>;
    };
  }>;
};

//////////////////////////////////////////
// Collection
//////////////////////////////////////////

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

export type PayloadCollection = {
  attributes: {
    termsOfUse: string;
    totalItems: string;
    pubDate: string;
  };
  items: Array<{
    id: string;
    collId: string;
    type: string;
    name: string;
    yearPublished: string;
    image: string;
    thumbnail: string;
    status: {
      own: boolean;
      prevOwned: boolean;
      forTrade: boolean;
      want: boolean;
      wantToPlay: boolean;
      wantToBuy: boolean;
      wishList: boolean;
      preOrdered: boolean;
      lastModified: string;
    };
    numPlays: number;
  }>;
};

//////////////////////////////////////////
// Family
//////////////////////////////////////////

export type ParamsFamily = {
  id: Array<string>;
  type?: Array<rpg | rpgperiodical | boardgamefamily>;
};

export type PayloadFamily = {
  attributes: {
    termsOfUse: string;
  };
  items: Array<{
    id: string;
    type: string;
    thumbnail: string;
    image: string;
    description: string;
    names: Array<{
      type: string;
      sortIndex: string;
      value: string;
    }>;
    links: Array<{
      type: string;
      id: string;
      value: string;
      inbound: boolean;
    }>;
  }>;
};

//////////////////////////////////////////
// Forum
//////////////////////////////////////////

export type ParamsForum = {
  id: string;
  page?: string;
};

export type PayloadForum = {
  attributes: {
    id: string;
    title: string;
    numThreads: string;
    numPosts: string;
    lastPostDate: string;
    noPosting: string;
    termsOfUse: string;
  };
  threads: Array<{
    id: string;
    subject: string;
    author: string;
    numArticles: string;
    postDate: string;
    lastPostDate: string;
  }>;
};

//////////////////////////////////////////
// Forum List
//////////////////////////////////////////

export type ParamsForumList = {
  id: string;
  type: thing | family;
};

export type PayloadForumList = {
  attributes: {
    type: thing | family;
    termsOfUse: string;
    id: string;
  };
  forums: Array<{
    id: string;
    groupId: string;
    title: string;
    noPosting: string;
    description: string;
    numThreads: string;
    numPosts: string;
    lastPostDate: string;
  }>;
};

//////////////////////////////////////////
// Guild
//////////////////////////////////////////

export type ParamsGuild = {
  id: string;
  members?: true;
  sort?: "username" | "date";
  page?: string;
};

export type PayloadGuildSuccess = {
  attributes: {
    termsOfUse: string;
    id: string;
    name: string;
    created: string;
  };
  guild: {
    id: string;
    name: string;
    created: string;
    category: string;
    website: string;
    manager: string;
    description: string;
    location: {
      addr1?: string;
      addr2?: string;
      city?: string;
      stateorprovince?: string;
      postalcode?: string;
      country?: string;
    };
    members?: {
      count: string;
      page: string;
      member: Array<{
        name: string;
        date: string;
      }>;
    };
  };
};

export type PayloadGuildError = {
  attributes: {
    termsOfUse: string;
  };
  guild: null;
};

//////////////////////////////////////////
// Hot
//////////////////////////////////////////

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

export type PayloadHot = {
  attributes: {
    termsofuse: string;
  };
  items: Array<{
    id: string;
    rank: string;
    name: string;
    yearPublished: string;
    thumbnail: string;
  }>;
};

//////////////////////////////////////////
// Search
//////////////////////////////////////////

export type ParamsSearch = {
  query: string;
  type?: Array<
    boardgame | boardgameaccessory | boardgameexpansion | rpgitem | videogame
  >;
  exact?: boolean;
};

export type PayloadSearch = {
  attributes: {
    termsofuse: string;
  };
  items: Array<{
    id: string;
    type: string;
    name: string;
    yearPublished: string;
  }>;
};

//////////////////////////////////////////
// Thing
//////////////////////////////////////////

import { Polls as PollsThing } from "~/routes/thing";

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

export type PayloadThing = {
  attributes: {
    termsofuse: string;
  };
  items: Array<{
    id: string;
    type: string;
    thumbnail: string;
    image: string;
    names: Array<{
      type: string;
      sortindex: string;
      value: string;
    }>;
    description: string;
    yearPublished: string;
    minPlayers: string;
    maxPlayers: string;
    playingTime: string;
    minPlayTime: string;
    maxPlayTime: string;
    minAge: string;
    links: Array<{
      type: string;
      id: string;
      value: string;
    }>;
    polls: PollsThing;
  }>;
};

//////////////////////////////////////////
// Thread
//////////////////////////////////////////

export type ParamsThread = {
  id: string;
  minArticleId: string;
  minArticleDate: string;
  count: string;
};

export type PayloadThread = {
  attributes: {
    id: string;
    numArticles: string;
    link: string;
    termsOfUse: string;
  };
  subject: string;
  articles: Array<{
    id: string;
    username: string;
    link: string;
    postDate: string;
    editDate: string;
    numEdits: string;
    body: string;
  }>;
};

//////////////////////////////////////////
// User
//////////////////////////////////////////

export type ParamsUser = {
  name: string;
  buddies?: true;
  guilds?: true;
  hot?: true;
  top?: true;
  domain?: boardgame | rpg | videogame;
  page?: string;
};

export type PayloadUser = {
  termsOfUse: string;
  user: null | {
    id: string;
    name: string;
    termsOfUse: string;
    firstName: string;
    lastName: string;
    avatarLink: string;
    yearRegistered: string;
    lastLogin: string;
    stateOrProvince: string;
    country: string;
    webAddress: string;
    xboxAccount: string;
    wiiAccount: string;
    psnAccount: string;
    battlenetAccount: string;
    steamAccount: string;
    tradeRating: string;
    buddies?: {
      total: string;
      page: string;
      buddy: Array<{
        id: string;
        name: string;
      }>;
    };
    guilds?: {
      total: string;
      page: string;
      guild: Array<{
        id: string;
        name: string;
      }>;
    };
    hot?: {
      domain: string;
      item: Array<{
        rank: string;
        type: string;
        id: string;
        name: string;
      }>;
    };
    top?: {
      domain: string;
      item: Array<{
        rank: string;
        type: string;
        id: string;
        name: string;
      }>;
    };
  };
};

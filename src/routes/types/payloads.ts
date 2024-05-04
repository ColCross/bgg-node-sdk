import { thing, family } from "~/routes/types/contentTypes";

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
} | null;

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

export type PayloadHot = {
  attributes: {
    termsofuse: string;
  };
  items: Array<{
    id: string;
    rank: string;
    name: string;
    yearPublished?: string;
    thumbnail: string;
  }>;
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

export type PayloadThingPollLanguageDependence = {
  name: "language_dependence";
  title: string;
  totalvotes: string;
  results: Array<{
    level: string;
    value: string;
    numvotes: string;
  }>;
};

export type PayloadThingPollSuggestedPlayerAge = {
  name: string;
  title: string;
  totalvotes: string;
  results: Array<{
    value: string;
    numvotes: string;
  }>;
};

export type PayloadThingPollNumPlayers = {
  name: string;
  title: string;
  totalvotes: string;
  results: Array<{
    numplayers: string;
    result: Array<{
      value: string;
      numvotes: string;
    }>;
  }>;
};

export type PayloadThingPolls = Array<
  | PayloadThingPollLanguageDependence
  | PayloadThingPollNumPlayers
  | PayloadThingPollSuggestedPlayerAge
>;

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
    polls: PayloadThingPolls;
  }>;
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

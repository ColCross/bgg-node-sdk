import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

// TODO: Excluding poll data for now

type args = {
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

type params = Omit<args, "id" | "type"> & {
  id: string;
  type?: string;
};

const getParams = (args: args): params => {
  return {
    ...args,
    id: args.id.join(","),
    type: args.type?.join(","),
  };
};

type response = {
  items: {
    _attributes: {
      termsofuse: string;
    };
    item?: responseBody | responseBody[];
  };
};

type name = {
  _attributes: {
    type: string;
    sortindex: string;
    value: string;
  };
};

type link = {
  _attributes: {
    type: string;
    id: string;
    value: string;
  };
};

type responseBody = {
  _attributes: {
    type: string;
    id: string;
  };
  thumbnail?: {
    _text: string;
  };
  image?: {
    _text: string;
  };
  name?: name | name[];
  description?: {
    _text: string;
  };
  yearpublished?: {
    _attributes: {
      value: string;
    };
  };
  minplayers?: {
    _attributes: {
      value: string;
    };
  };
  maxplayers?: {
    _attributes: {
      value: string;
    };
  };
  playingtime?: {
    _attributes: {
      value: string;
    };
  };
  minplaytime?: {
    _attributes: {
      value: string;
    };
  };
  maxplaytime?: {
    _attributes: {
      value: string;
    };
  };
  minage?: {
    _attributes: {
      value: string;
    };
  };
  link?: link | link[];
};

type item = {
  id: string;
  type: string;
  thumbnail?: string;
  image?: string;
  name?: {
    type: string;
    sortindex: string;
    value: string;
  }[];
  description?: string;
  yearPublished?: string;
  minPlayers?: string;
  maxPlayers?: string;
  playingTime?: string;
  minPlayTime?: string;
  maxPlayTime?: string;
  minAge?: string;
  link?: {
    type: string;
    id: string;
    value: string;
  }[];
};

const transformData = (data: responseBody): item => {
  return {
    id: data._attributes.id,
    type: data._attributes.type,
    thumbnail: data.thumbnail?._text,
    image: data.image?._text,
    name: enforceArray(data.name).map((name) => {
      return {
        type: name._attributes.type ?? "",
        sortindex: name._attributes.sortindex,
        value: name._attributes.value,
      };
    }),
    description: data.description?._text,
    yearPublished: data.yearpublished?._attributes.value,
    minPlayers: data.minplayers?._attributes.value,
    maxPlayers: data.maxplayers?._attributes.value,
    playingTime: data.playingtime?._attributes.value,
    minPlayTime: data.minplaytime?._attributes.value,
    maxPlayTime: data.maxplaytime?._attributes.value,
    minAge: data.minage?._attributes.value,
    link: enforceArray(data.link).map((link) => {
      return {
        type: link._attributes.type,
        id: link._attributes.id,
        value: link._attributes.value,
      };
    }),
  };
};

export const thing = async (args: args): Promise<item[]> => {
  const params = getParams(args);
  const { data } = await axios.get<response>("/thing", { params });

  if (!data.items.item) return [];

  return enforceArray(data.items.item).map((data) => transformData(data));
};

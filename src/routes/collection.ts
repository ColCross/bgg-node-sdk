import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsCollection } from "~/routes/types/params";
import { PayloadCollection } from "~/routes/types/payloads";

export type ParamsTransformed = Omit<ParamsCollection, "id"> & {
  id?: string;
};

export const transformParams = (
  params: ParamsCollection,
): ParamsTransformed => {
  return {
    ...params,
    id: params.id?.join(","),
  };
};

type ApiResponseItem = {
  _attributes: {
    objecttype: string;
    objectid: string;
    subtype: string;
    collid: string;
  };
  name: {
    _attributes: {
      sortindex: string;
    };
    _text: string;
  };
  yearpublished?: {
    _text: string;
  };
  image?: {
    _text: string;
  };
  thumbnail?: {
    _text: string;
  };
  status: {
    _attributes: {
      own: string;
      prevowned: string;
      fortrade: string;
      want: string;
      wanttoplay: string;
      wanttobuy: string;
      wishlist: string;
      preordered: string;
      lastmodified: string;
    };
  };
  numplays: {
    _text: string;
  };
};

type ApiResponse = {
  items?: {
    _attributes: {
      termsofuse: string;
      totalitems: string;
      pubdate: string;
    };
    item: ApiResponseItem | Array<ApiResponseItem>;
  };
};

const transformData = (data: ApiResponse): PayloadCollection => {
  if (!data.items) {
    return null;
  }

  return {
    attributes: {
      termsOfUse: data.items._attributes.termsofuse,
      totalItems: data.items._attributes.totalitems,
      pubDate: data.items._attributes.pubdate,
    },
    items: enforceArray(data.items.item).map((data) => {
      return {
        id: data._attributes.objectid,
        collId: data._attributes.collid,
        type: data._attributes.objecttype,
        name: data.name._text,
        yearPublished: data.yearpublished?._text,
        image: data.image?._text,
        thumbnail: data.thumbnail?._text,
        status: {
          own: Boolean(Number(data.status._attributes.own)),
          prevOwned: Boolean(Number(data.status._attributes.prevowned)),
          forTrade: Boolean(Number(data.status._attributes.fortrade)),
          want: Boolean(Number(data.status._attributes.want)),
          wantToPlay: Boolean(Number(data.status._attributes.wanttoplay)),
          wantToBuy: Boolean(Number(data.status._attributes.wanttobuy)),
          wishList: Boolean(Number(data.status._attributes.wishlist)),
          preOrdered: Boolean(Number(data.status._attributes.preordered)),
          lastModified: data.status._attributes.lastmodified,
        },
        numPlays: Number(data.numplays._text),
      };
    }),
  };
};

export const collection = async (
  params: ParamsCollection,
): Promise<PayloadCollection> => {
  const { data } = await axios.get<ApiResponse>("/collection", {
    params: transformParams(params),
  });

  return transformData(data);
};

import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsThing } from "~/routes/types/params";
import {
  PayloadThing,
  PayloadThingPolls,
  PayloadThingPollLanguageDependence,
  PayloadThingPollSuggestedPlayerAge,
  PayloadThingPollNumPlayers,
} from "~/routes/types/payloads";

export const endpoint = "/thing";

export type ParamsTransformed = Omit<ParamsThing, "id" | "type"> & {
  id: string;
  type?: string;
};

export const transformParams = (args: ParamsThing): ParamsTransformed => {
  return {
    ...args,
    id: args.id.join(","),
    type: args.type?.join(","),
  };
};

type ApiResponsePollLanguageDependence = {
  _attributes: {
    name: "language_dependence";
    title: string;
    totalvotes: string;
  };
  results: {
    result: [
      {
        _attributes: {
          level: string;
          value: string;
          numvotes: string;
        };
      },
    ];
  };
};

type ApiResponsePollSuggestedPlayerAge = {
  _attributes: {
    name: "suggested_playerage";
    title: string;
    totalvotes: string;
  };
  results: {
    result: Array<{
      _attributes: {
        value: string;
        numvotes: string;
      };
    }>;
  };
};

type ApiResponsePollNumPlayers = {
  _attributes: {
    name: "suggested_numplayers";
    title: string;
    totalvotes: string;
  };
  results: Array<{
    _attributes: {
      numplayers: string;
    };
    result: Array<{
      _attributes: {
        value: string;
        numvotes: string;
      };
    }>;
  }>;
};

type ApiResponsePolls = Array<
  | ApiResponsePollLanguageDependence
  | ApiResponsePollNumPlayers
  | ApiResponsePollSuggestedPlayerAge
>;

type ApiResponseName = {
  _attributes: {
    type: string;
    sortindex: string;
    value: string;
  };
};

type ApiResponseLink = {
  _attributes: {
    type: string;
    id: string;
    value: string;
  };
};

type ApiResponseVideos = {
  _attributes: {
    id: string;
    title: string;
    category: string;
    language: string;
    link: string;
    username: string;
    userid: string;
    postdate: string;
  };
};

type ApiResponseMarketplaceListing = {
  listdate: {
    _attributes: {
      value: string;
    };
  };
  price: {
    _attributes: {
      currency: string;
      value: string;
    };
  };
  condition: {
    _attributes: {
      value: string;
    };
  };
  notes: {
    _attributes: {
      value: string;
    };
  };
  link: {
    _attributes: {
      href: string;
      title: string;
    };
  };
};

type ApiResponseStatisticsRatingRank = {
  _attributes: {
    type: string;
    id: string;
    name: string;
    friendlyname: string;
    value: string;
    bayesaverage: string;
  };
};

type ApiResponseStatisticsRating = {
  usersrated: {
    _attributes: {
      value: string;
    };
  };
  average: {
    _attributes: {
      value: string;
    };
  };
  bayesaverage: {
    _attributes: {
      value: string;
    };
  };
  ranks: {
    rank:
      | ApiResponseStatisticsRatingRank
      | Array<ApiResponseStatisticsRatingRank>;
  };
  stddev: {
    _attributes: {
      value: string;
    };
  };
  median: {
    _attributes: {
      value: string;
    };
  };
  owned: {
    _attributes: {
      value: string;
    };
  };
  trading: {
    _attributes: {
      value: string;
    };
  };
  wanting: {
    _attributes: {
      value: string;
    };
  };
  wishing: {
    _attributes: {
      value: string;
    };
  };
  numcomments: {
    _attributes: {
      value: string;
    };
  };
  numweights: {
    _attributes: {
      value: string;
    };
  };
  averageweight: {
    _attributes: {
      value: string;
    };
  };
};

type ApiResponseBody = {
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
  name: ApiResponseName | Array<ApiResponseName>;
  description: {
    _text: string;
  };
  yearpublished: {
    _attributes: {
      value: string;
    };
  };
  minplayers: {
    _attributes: {
      value: string;
    };
  };
  maxplayers: {
    _attributes: {
      value: string;
    };
  };
  playingtime: {
    _attributes: {
      value: string;
    };
  };
  minplaytime: {
    _attributes: {
      value: string;
    };
  };
  maxplaytime: {
    _attributes: {
      value: string;
    };
  };
  minage: {
    _attributes: {
      value: string;
    };
  };
  link: ApiResponseLink | Array<ApiResponseLink>;
  poll?: ApiResponsePolls;
  videos?: {
    _attributes: {
      total: string;
    };
    video: ApiResponseVideos | Array<ApiResponseVideos>;
  };
  versions?: {
    item: Array<{
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
      link: ApiResponseLink | Array<ApiResponseLink>;
      name: ApiResponseName | Array<ApiResponseName>;
      yearpublished: {
        _attributes: {
          value: string;
        };
      };
      productcode: {
        _attributes: {
          value: string;
        };
      };
      width: {
        _attributes: {
          value: string;
        };
      };
      length: {
        _attributes: {
          value: string;
        };
      };
      depth: {
        _attributes: {
          value: string;
        };
      };
      weight: {
        _attributes: {
          value: string;
        };
      };
    }>;
  };
  // Same for both rating comments and regular comments
  // Per the API documentation, if both are defined in the query regular comments will be returned
  comments?: {
    _attributes: {
      page: string;
      totalitems: string;
    };
    comment: Array<{
      _attributes: {
        username: string;
        rating: string;
        value: string;
      };
    }>;
  };
  statistics?: {
    _attributes: {
      page: string;
    };
    ratings: ApiResponseStatisticsRating;
  };
  marketplacelistings?: {
    listing:
      | ApiResponseMarketplaceListing
      | Array<ApiResponseMarketplaceListing>;
  };
};

type ApiResponse = {
  items: {
    _attributes: {
      termsofuse: string;
    };
    item?: ApiResponseBody | Array<ApiResponseBody>;
  };
};

const transformPollLanguageDependence = (
  poll: ApiResponsePollLanguageDependence,
): PayloadThingPollLanguageDependence => {
  return {
    name: poll._attributes.name,
    title: poll._attributes.title,
    totalvotes: poll._attributes.totalvotes,
    results: enforceArray(poll.results.result).map((result) => {
      return {
        level: result._attributes.level,
        value: result._attributes.value,
        numvotes: result._attributes.numvotes,
      };
    }),
  };
};

const transformPollSuggestedPlayerAge = (
  poll: ApiResponsePollSuggestedPlayerAge,
): PayloadThingPollSuggestedPlayerAge => {
  return {
    name: poll._attributes.name,
    title: poll._attributes.title,
    totalvotes: poll._attributes.totalvotes,
    results: enforceArray(poll.results.result).map((result) => {
      return {
        value: result._attributes.value,
        numvotes: result._attributes.numvotes,
      };
    }),
  };
};

const transformPollSuggestedNumPlayers = (
  poll: ApiResponsePollNumPlayers,
): PayloadThingPollNumPlayers => {
  return {
    name: poll._attributes.name,
    title: poll._attributes.title,
    totalvotes: poll._attributes.totalvotes,
    results: enforceArray(poll.results).map((result) => {
      return {
        numplayers: result._attributes.numplayers,
        result: enforceArray(result.result).map((result) => {
          return {
            value: result._attributes.value,
            numvotes: result._attributes.numvotes,
          };
        }),
      };
    }),
  };
};

// Typescript doesn't recognize discriminated unions for nested properties, so this is a workaround
// Avoids needing overly complex type guards
const transformPoll = (apiPolls: ApiResponsePolls): PayloadThingPolls => {
  const polls: PayloadThingPolls = [];

  apiPolls.forEach((apiPoll) => {
    switch (apiPoll._attributes.name) {
      case "language_dependence": {
        polls.push(
          transformPollLanguageDependence(
            apiPoll as ApiResponsePollLanguageDependence,
          ),
        );
        break;
      }
      case "suggested_playerage": {
        polls.push(
          transformPollSuggestedPlayerAge(
            apiPoll as ApiResponsePollSuggestedPlayerAge,
          ),
        );
        break;
      }
      case "suggested_numplayers": {
        polls.push(
          transformPollSuggestedNumPlayers(
            apiPoll as ApiResponsePollNumPlayers,
          ),
        );
        break;
      }
    }
  });

  return polls;
};

const transformData = (data: ApiResponse): PayloadThing => {
  return {
    attributes: {
      termsofuse: data.items._attributes.termsofuse,
    },
    items: enforceArray(data.items.item).map((data) => {
      return {
        id: data._attributes.id,
        type: data._attributes.type,
        thumbnail: data.thumbnail?._text,
        image: data.image?._text,
        names: enforceArray(data.name).map((name) => {
          return {
            type: name._attributes.type,
            sortindex: name._attributes.sortindex,
            value: name._attributes.value,
          };
        }),
        description: data.description._text,
        yearPublished: data.yearpublished._attributes.value,
        minPlayers: data.minplayers._attributes.value,
        maxPlayers: data.maxplayers._attributes.value,
        playingTime: data.playingtime._attributes.value,
        minPlayTime: data.minplaytime._attributes.value,
        maxPlayTime: data.maxplaytime._attributes.value,
        minAge: data.minage._attributes.value,
        links: enforceArray(data.link).map((link) => {
          return {
            type: link._attributes.type,
            id: link._attributes.id,
            value: link._attributes.value,
          };
        }),
        polls: transformPoll(enforceArray(data.poll)),
        comments: data.comments && {
          page: data.comments._attributes.page,
          total: data.comments._attributes.totalitems,
          comment: enforceArray(data.comments.comment).map((comment) => {
            return {
              username: comment._attributes.username,
              rating: comment._attributes.rating,
              value: comment._attributes.value,
            };
          }),
        },
        marketplace: data.marketplacelistings && {
          listings: enforceArray(data.marketplacelistings.listing).map(
            (listing) => {
              return {
                listDate: listing.listdate._attributes.value,
                price: {
                  currency: listing.price._attributes.currency,
                  value: listing.price._attributes.value,
                },
                condition: listing.condition._attributes.value,
                notes: listing.notes._attributes.value,
                link: {
                  href: listing.link._attributes.href,
                  title: listing.link._attributes.title,
                },
              };
            },
          ),
        },
        statistics: data.statistics && {
          page: data.statistics._attributes.page,
          ratings: {
            usersRated: data.statistics.ratings.usersrated._attributes.value,
            average: data.statistics.ratings.average._attributes.value,
            bayesAverage:
              data.statistics.ratings.bayesaverage._attributes.value,
            ranks: enforceArray(data.statistics.ratings.ranks.rank).map(
              (rank) => {
                return {
                  type: rank._attributes.type,
                  id: rank._attributes.id,
                  name: rank._attributes.name,
                  friendlyName: rank._attributes.friendlyname,
                  value: rank._attributes.value,
                  bayesAverage: rank._attributes.bayesaverage,
                };
              },
            ),
          },
          stdDev: data.statistics.ratings.stddev._attributes.value,
          median: data.statistics.ratings.median._attributes.value,
          owned: data.statistics.ratings.owned._attributes.value,
          trading: data.statistics.ratings.trading._attributes.value,
          wanting: data.statistics.ratings.wanting._attributes.value,
          wishing: data.statistics.ratings.wishing._attributes.value,
          numComments: data.statistics.ratings.numcomments._attributes.value,
          numWeights: data.statistics.ratings.numweights._attributes.value,
          averageWeight:
            data.statistics.ratings.averageweight._attributes.value,
        },
        versions:
          data.versions &&
          enforceArray(data.versions.item).map((item) => {
            return {
              id: item._attributes.id,
              type: item._attributes.type,
              thumbnail: item.thumbnail?._text,
              image: item.image?._text,
              links: enforceArray(item.link).map((link) => {
                return {
                  type: link._attributes.type,
                  id: link._attributes.id,
                  value: link._attributes.value,
                };
              }),
              names: enforceArray(item.name).map((name) => {
                return {
                  type: name._attributes.type,
                  sortindex: name._attributes.sortindex,
                  value: name._attributes.value,
                };
              }),
              yearPublished: item.yearpublished._attributes.value,
              productCode: item.productcode._attributes.value,
              width: item.width._attributes.value,
              length: item.length._attributes.value,
              depth: item.depth._attributes.value,
              weight: item.weight._attributes.value,
            };
          }),
        videos: data.videos && {
          total: data.videos._attributes.total,
          videos: enforceArray(data.videos.video).map((video) => {
            return {
              id: video._attributes.id,
              title: video._attributes.title,
              category: video._attributes.category,
              language: video._attributes.language,
              link: video._attributes.link,
              username: video._attributes.username,
              userid: video._attributes.userid,
              postdate: video._attributes.postdate,
            };
          }),
        },
      };
    }),
  };
};

export const thing = async (params: ParamsThing): Promise<PayloadThing> => {
  const { data } = await axios.get<ApiResponse>(endpoint, {
    params: transformParams(params),
  });

  return transformData(data);
};

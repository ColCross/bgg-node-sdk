import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsPlaysId, PayloadPlaysId } from "~/routes/types/public";
import {
  ApiResponseAttributesBase,
  ApiResponseBase,
} from "~/routes/plays/types";

type ApiResponsePlayers = {
  _attributes: {
    username: string;
    userid: string;
    name: string;
    startposition: string;
    color: string;
    score: string;
    new: string;
    rating: string;
    win: string;
  };
};

type ApiResponse = {
  _attributes: {
    id: string;
    date: string;
    quantity: string;
    length: string;
    incomplete: string;
    nowinstats: string;
    location: string;
  };
  item: {
    _attributes: {
      name: string;
      objecttype: string;
      objectid: string;
    };
    subtypes: {
      subtype: {
        _attributes: {
          value: string;
        };
      };
    };
  };
  players?: {
    player: ApiResponsePlayers | Array<ApiResponsePlayers>;
  };
};

type ApiResponsePlaysId = ApiResponseBase<
  ApiResponseAttributesBase,
  ApiResponse
>;

const transformData = (data: ApiResponsePlaysId): PayloadPlaysId => {
  const { play, _attributes } = data.plays;

  return {
    attributes: {
      termsofuse: _attributes.termsofuse,
      total: _attributes.total,
      page: _attributes.page,
    },
    plays: enforceArray(play).map((play) => ({
      id: play._attributes.id,
      date: play._attributes.date,
      quantity: play._attributes.quantity,
      length: play._attributes.length,
      incomplete: play._attributes.incomplete,
      nowInStats: play._attributes.nowinstats,
      location: play._attributes.location,
      item: {
        name: play.item._attributes.name,
        objectType: play.item._attributes.objecttype,
        objectId: play.item._attributes.objectid,
        subtypes: enforceArray(play.item.subtypes.subtype).map(
          (subtype) => subtype._attributes.value,
        ),
      },
      players:
        play.players?.player &&
        enforceArray(play.players.player).map((player) => ({
          username: player._attributes.username,
          userid: player._attributes.userid,
          name: player._attributes.name,
          startPosition: player._attributes.startposition,
          color: player._attributes.color,
          score: player._attributes.score,
          new: player._attributes.new,
          rating: player._attributes.rating,
          win: player._attributes.win,
        })),
    })),
  };
};

export const id = async (params: ParamsPlaysId): Promise<PayloadPlaysId> => {
  const { data } = await axios.get<ApiResponsePlaysId>("/plays", { params });
  return transformData(data);
};

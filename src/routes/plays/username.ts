import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import {
  ParamsPlaysUsername,
  PayloadPlaysUsername,
} from "~/routes/types/public";
import {
  ApiResponseAttributesBase,
  ApiResponseBase,
} from "~/routes/plays/types";

type ApiResponseAttributes = ApiResponseAttributesBase & {
  username: string;
  userid: string;
};

type ApiResponseItemSubtype = {
  _attributes: {
    value: string;
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
      subtype: ApiResponseItemSubtype | Array<ApiResponseItemSubtype>;
    };
  };
};

type ApiResponsePlaysUsername = ApiResponseBase<
  ApiResponseAttributes,
  ApiResponse
>;

const transformData = (
  data: ApiResponsePlaysUsername,
): PayloadPlaysUsername => {
  return {
    attributes: {
      termsofuse: data.plays._attributes.termsofuse,
      username: data.plays._attributes.username,
      userid: data.plays._attributes.userid,
      total: data.plays._attributes.total,
      page: data.plays._attributes.page,
    },
    plays: enforceArray(data.plays.play).map((play) => ({
      id: play._attributes.id,
      date: play._attributes.date,
      quantity: play._attributes.quantity,
      length: play._attributes.length,
      incomplete: play._attributes.incomplete,
      nowinstats: play._attributes.nowinstats,
      location: play._attributes.location,
      item: {
        name: play.item._attributes.name,
        objecttype: play.item._attributes.objecttype,
        objectid: play.item._attributes.objectid,
        subtypes: enforceArray(play.item.subtypes.subtype).map(
          (subtype) => subtype._attributes.value,
        ),
      },
    })),
  };
};

export const username = async (
  params: ParamsPlaysUsername,
): Promise<PayloadPlaysUsername> => {
  const { data } = await axios.get<ApiResponsePlaysUsername>("/plays", {
    params,
  });
  return transformData(data);
};

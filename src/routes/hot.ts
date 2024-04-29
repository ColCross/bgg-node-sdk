import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsHot } from "~/routes/types/params";
import { PayloadHot } from "~/routes/types/payloads";

type ParamsTransformed = Omit<ParamsHot, "type"> & {
  type: string;
};

const getParams = (args?: ParamsHot): ParamsTransformed | undefined => {
  if (!args) return undefined;

  return {
    type: args.type.join(","),
  };
};

type ApiResponseBody = {
  _attributes: { id: string; rank: string };
  name: { _attributes: { value: string } };
  yearpublished: { _attributes: { value: string } };
  thumbnail: { _attributes: { value: string } };
};

type ApiResponse = {
  items: {
    _attributes: { termsofuse: string };
    item?: ApiResponseBody | Array<ApiResponseBody>;
  };
};

const transformData = (data: ApiResponse): PayloadHot => {
  return {
    attributes: {
      termsofuse: data.items._attributes.termsofuse,
    },
    items: enforceArray(data.items.item).map((data) => {
      return {
        id: data._attributes.id,
        rank: data._attributes.rank,
        name: data.name._attributes.value,
        yearPublished: data.yearpublished._attributes.value,
        thumbnail: data.thumbnail._attributes.value,
      };
    }),
  };
};

export const hot = async (params?: ParamsHot): Promise<PayloadHot> => {
  const { data } = await axios.get<ApiResponse>("/hot", {
    params: getParams(params),
  });

  return transformData(data);
};

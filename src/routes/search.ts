import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsSearch } from "~/routes/types/params";
import { PayloadSearch } from "~/routes/types/payloads";

export const endpoint = "/search";

export type ParamsTransformed = Omit<ParamsSearch, "type"> & {
  type?: string;
};

export const transformParams = (args: ParamsSearch): ParamsTransformed => {
  return {
    ...args,
    type: args.type ? args.type.join(",") : undefined,
  };
};

type ApiResponseBody = {
  _attributes: { type: string; id: string };
  name: { _attributes: { type: string; value: string } };
  yearpublished?: { _attributes: { value: string } };
};

type ApiResponse = {
  items: {
    _attributes: { total: string; termsofuse: string };
    item?: ApiResponseBody | Array<ApiResponseBody>;
  };
};

const transformData = (data: ApiResponse): PayloadSearch => {
  return {
    attributes: {
      termsofuse: data.items._attributes.termsofuse,
    },
    items: enforceArray(data.items.item).map((data) => {
      return {
        id: data._attributes.id,
        type: data._attributes.type,
        name: data.name._attributes.value,
        yearPublished: data.yearpublished?._attributes.value,
      };
    }),
  };
};

export const search = async (args: ParamsSearch): Promise<PayloadSearch> => {
  const params = transformParams(args);
  const { data } = await axios.get<ApiResponse>(endpoint, { params });

  return transformData(data);
};

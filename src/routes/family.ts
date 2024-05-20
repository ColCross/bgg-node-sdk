import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsFamily } from "~/routes/types/params";
import { PayloadFamily } from "~/routes/types/payloads";

export type ParamsTransformed = Omit<ParamsFamily, "id" | "type"> & {
  id: string;
  type?: string;
};

export const transformParams = (params: ParamsFamily): ParamsTransformed => {
  return {
    ...params,
    id: params.id.join(","),
    type: params.type?.join(","),
  };
};

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
    inbound: string;
  };
};

type ApiResponseBody = {
  _attributes: {
    type: string;
    id: string;
  };
  thumbnail: {
    _text: string;
  };
  image: {
    _text: string;
  };
  name: ApiResponseName | Array<ApiResponseName>;
  description: {
    _text: string;
  };
  link: ApiResponseLink | Array<ApiResponseLink>;
};

type ApiResponse = {
  items?: {
    _attributes: { termsofuse: string };
    item?: ApiResponseBody | Array<ApiResponseBody>;
  };
};

const transformData = (data: ApiResponse): PayloadFamily | null => {
  if (!data.items) return null;

  return {
    attributes: {
      termsOfUse: data.items._attributes.termsofuse,
    },
    items: enforceArray(data.items.item).map((data) => {
      return {
        id: data._attributes.id,
        type: data._attributes.type,
        thumbnail: data.thumbnail._text,
        image: data.image._text,
        description: data.description._text,
        names: enforceArray(data.name).map((name) => ({
          type: name._attributes.type,
          sortIndex: name._attributes.sortindex,
          value: name._attributes.value,
        })),
        links: enforceArray(data.link).map((link) => ({
          type: link._attributes.type,
          id: link._attributes.id,
          value: link._attributes.value,
          inbound: link._attributes.inbound === "true",
        })),
      };
    }),
  };
};

export const family = async (
  params: ParamsFamily,
): Promise<PayloadFamily | null> => {
  const { data } = await axios.get<ApiResponse>("/family", {
    params: transformParams(params),
  });

  return transformData(data);
};

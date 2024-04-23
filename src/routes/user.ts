import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsUser, PayloadUser } from "~/routes/types/public";

type ApiResponseBuddy = {
  _attributes: {
    id: string;
    name: string;
  };
};

type ApiResponseGuild = {
  _attributes: {
    id: string;
    name: string;
  };
};

type ApiResponseHot = {
  _attributes: {
    rank: string;
    type: string;
    id: string;
    name: string;
  };
};

type ApiResponseTop = {
  _attributes: {
    rank: string;
    type: string;
    id: string;
    name: string;
  };
};

type ApiResponse = {
  user: {
    _attributes: {
      id: string;
      name: string;
      termsofuse: string;
    };
    firstname: {
      _attributes: {
        value: string;
      };
    };
    lastname: {
      _attributes: {
        value: string;
      };
    };
    avatarlink: {
      _attributes: {
        value: string;
      };
    };
    yearregistered: {
      _attributes: {
        value: string;
      };
    };
    lastlogin: {
      _attributes: {
        value: string;
      };
    };
    stateorprovince: {
      _attributes: {
        value: string;
      };
    };
    country: {
      _attributes: {
        value: string;
      };
    };
    webaddress: {
      _attributes: {
        value: string;
      };
    };
    xboxaccount: {
      _attributes: {
        value: string;
      };
    };
    wiiaccount: {
      _attributes: {
        value: string;
      };
    };
    psnaccount: {
      _attributes: {
        value: string;
      };
    };
    battlenetaccount: {
      _attributes: {
        value: string;
      };
    };
    steamaccount: {
      _attributes: {
        value: string;
      };
    };
    traderating: {
      _attributes: {
        value: string;
      };
    };
    buddies?: {
      _attributes: {
        total: string;
        page: string;
      };
      buddy: ApiResponseBuddy | Array<ApiResponseBuddy>;
    };
    guilds?: {
      _attributes: {
        total: string;
        page: string;
      };
      guild: ApiResponseGuild | Array<ApiResponseGuild>;
    };
    hot?: {
      _attributes: {
        domain: string;
      };
      item: ApiResponseHot | Array<ApiResponseHot>;
    };
    top?: {
      _attributes: {
        domain: string;
      };
      item: ApiResponseTop | Array<ApiResponseTop>;
    };
  };
};

const transformData = (data: ApiResponse): PayloadUser | null => {
  // If no user is found user id will be an empty string
  if (data.user._attributes.id === "") return null;

  return {
    termsOfUse: data.user._attributes.termsofuse,
    user: data.user
      ? {
          id: data.user._attributes.id,
          name: data.user._attributes.name,
          termsOfUse: data.user._attributes.termsofuse,
          firstName: data.user.firstname._attributes.value,
          lastName: data.user.lastname._attributes.value,
          avatarLink: data.user.avatarlink._attributes.value,
          yearRegistered: data.user.yearregistered._attributes.value,
          lastLogin: data.user.lastlogin._attributes.value,
          stateOrProvince: data.user.stateorprovince._attributes.value,
          country: data.user.country._attributes.value,
          webAddress: data.user.webaddress._attributes.value,
          xboxAccount: data.user.xboxaccount._attributes.value,
          wiiAccount: data.user.wiiaccount._attributes.value,
          psnAccount: data.user.psnaccount._attributes.value,
          battlenetAccount: data.user.battlenetaccount._attributes.value,
          steamAccount: data.user.steamaccount._attributes.value,
          tradeRating: data.user.traderating._attributes.value,
          buddies: data.user.buddies
            ? {
                total: data.user.buddies._attributes.total,
                page: data.user.buddies._attributes.page,
                buddy: enforceArray(data.user.buddies.buddy).map((data) => ({
                  id: data._attributes.id,
                  name: data._attributes.name,
                })),
              }
            : undefined,
          guilds: data.user.guilds
            ? {
                total: data.user.guilds._attributes.total,
                page: data.user.guilds._attributes.page,
                guild: enforceArray(data.user.guilds.guild).map((data) => ({
                  id: data._attributes.id,
                  name: data._attributes.name,
                })),
              }
            : undefined,
          hot: data.user.hot
            ? {
                domain: data.user.hot._attributes.domain,
                item: enforceArray(data.user.hot.item).map((data) => ({
                  rank: data._attributes.rank,
                  type: data._attributes.type,
                  id: data._attributes.id,
                  name: data._attributes.name,
                })),
              }
            : undefined,
          top: data.user.top
            ? {
                domain: data.user.top._attributes.domain,
                item: enforceArray(data.user.top.item).map((data) => ({
                  rank: data._attributes.rank,
                  type: data._attributes.type,
                  id: data._attributes.id,
                  name: data._attributes.name,
                })),
              }
            : undefined,
        }
      : null,
  };
};

export const user = async (params: ParamsUser): Promise<PayloadUser | null> => {
  const { data } = await axios.get<ApiResponse>("/user", {
    params,
  });

  return transformData(data);
};

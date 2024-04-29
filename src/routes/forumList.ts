import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsForumList } from "~/routes/types/params";
import { PayloadForumList } from "~/routes/types/payloads";
import { thing, family } from "~/routes/types/contentTypes";

type ApiResponse = {
  forums: {
    _attributes: {
      type: thing | family;
      id: string;
      termsofuse: string;
    };
    forum?: Array<{
      _attributes: {
        id: string;
        groupid: string;
        title: string;
        noposting: string;
        description: string;
        numthreads: string;
        numposts: string;
        lastpostdate: string;
      };
    }>;
  };
};

const transformData = (data: ApiResponse): PayloadForumList => {
  return {
    attributes: {
      type: data.forums._attributes.type,
      termsOfUse: data.forums._attributes.termsofuse,
      id: data.forums._attributes.id,
    },
    forums: enforceArray(data.forums.forum).map((forum) => ({
      id: forum._attributes.id,
      groupId: forum._attributes.groupid,
      title: forum._attributes.title,
      noPosting: forum._attributes.noposting,
      description: forum._attributes.description,
      numThreads: forum._attributes.numthreads,
      numPosts: forum._attributes.numposts,
      lastPostDate: forum._attributes.lastpostdate,
    })),
  };
};

export const forumList = async (
  params: ParamsForumList,
): Promise<PayloadForumList> => {
  const { data } = await axios.get<ApiResponse>("/forumlist", {
    params,
  });

  return transformData(data);
};

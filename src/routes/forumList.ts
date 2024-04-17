import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";
import { thing, family } from "~/routes/types";

type Params = {
  id: string;
  type: thing | family;
};

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

type Payload = {
  attributes: {
    type: thing | family;
    termsOfUse: string;
    id: string;
  };
  forums: Array<{
    id: string;
    groupId: string;
    title: string;
    noPosting: string;
    description: string;
    numThreads: string;
    numPosts: string;
    lastPostDate: string;
  }>;
};

export const transformData = (data: ApiResponse): Payload => {
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

export const forumList = async (params: Params): Promise<Payload> => {
  const { data } = await axios.get<ApiResponse>("/forumlist", {
    params,
  });

  return transformData(data);
};

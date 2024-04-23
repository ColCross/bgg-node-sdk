import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";
import { ParamsForum, PayloadForum } from "~/routes/types/public";

type ApiResponse = {
  forum: {
    _attributes: {
      id: string;
      title: string;
      numthreads: string;
      numposts: string;
      lastpostdate: string;
      noposting: string;
      termsofuse: string;
    };
    threads: {
      thread?: Array<{
        _attributes: {
          id: string;
          subject: string;
          author: string;
          numarticles: string;
          postdate: string;
          lastpostdate: string;
        };
      }>;
    };
  };
};

const transformData = (data: ApiResponse): PayloadForum => {
  return {
    attributes: {
      id: data.forum._attributes.id,
      title: data.forum._attributes.title,
      numThreads: data.forum._attributes.numthreads,
      numPosts: data.forum._attributes.numposts,
      lastPostDate: data.forum._attributes.lastpostdate,
      noPosting: data.forum._attributes.noposting,
      termsOfUse: data.forum._attributes.termsofuse,
    },
    threads: enforceArray(data.forum.threads.thread).map((thread) => ({
      id: thread._attributes.id,
      subject: thread._attributes.subject,
      author: thread._attributes.author,
      numArticles: thread._attributes.numarticles,
      postDate: thread._attributes.postdate,
      lastPostDate: thread._attributes.lastpostdate,
    })),
  };
};

export const forum = async (
  params: ParamsForum,
): Promise<PayloadForum | null> => {
  // If the id provided is not a valid forum, BGG returns 200 with an error page.
  // Catch parse error and return null.

  try {
    const { data } = await axios.get<ApiResponse>("/forum", {
      params,
    });

    return transformData(data);
  } catch (error) {
    return null;
  }
};

import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";

import { ParamsThread, PayloadThread } from "~/routes/types/public";

type ApiResponse = {
  thread: {
    _attributes: {
      id: string;
      numarticles: string;
      link: string;
      termsofuse: string;
    };
    subject: { _text: string };
    articles?: {
      article: Array<{
        _attributes: {
          id: string;
          username: string;
          link: string;
          postdate: string;
          editdate: string;
          numedits: string;
        };
        subject: { _text: string };
        body: { _text: string };
      }>;
    };
  };
};

const transformData = (data: ApiResponse): PayloadThread => {
  return {
    attributes: {
      id: data.thread._attributes.id,
      numArticles: data.thread._attributes.numarticles,
      link: data.thread._attributes.link,
      termsOfUse: data.thread._attributes.termsofuse,
    },
    subject: data.thread.subject._text,
    articles: enforceArray(data.thread.articles?.article).map((article) => ({
      id: article._attributes.id,
      username: article._attributes.username,
      link: article._attributes.link,
      postDate: article._attributes.postdate,
      editDate: article._attributes.editdate,
      numEdits: article._attributes.numedits,
      body: article.body._text,
    })),
  };
};

export const thread = async (
  params: ParamsThread,
): Promise<PayloadThread | null> => {
  const { data } = await axios.get<ApiResponse>("/thread", {
    params,
  });

  return transformData(data);
};

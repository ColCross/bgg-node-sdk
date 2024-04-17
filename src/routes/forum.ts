import { axios } from "~/lib/axios";
import { enforceArray } from "~/lib/helpers";
import { thing, family } from "~/routes/types";

type Params = {
  id: string;
  page?: string;
};

/*
{
  "_declaration": { "_attributes": { "version": "1.0", "encoding": "utf-8" } },
  "forum": {
    "_attributes": {
      "id": "1565736",
      "title": "Reviews",
      "numthreads": "177",
      "numposts": "3185",
      "lastpostdate": "Thu, 01 Jan 1970 00:00:00 +0000",
      "noposting": "0",
      "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse"
    },
    "threads": {
      "thread": [
        {
          "_attributes": {
            "id": "3265741",
            "subject": "You can't say Scythe without sigh",
            "author": "LyallUClarion",
            "numarticles": "20",
            "postdate": "Thu, 14 Mar 2024 20:23:23 +0000",
            "lastpostdate": "Fri, 22 Mar 2024 16:38:46 +0000"
          }
        },
        {
          "_attributes": {
            "id": "3254495",
            "subject": "Detailed Scythe Review - Spoiler Free",
            "author": "IndianBoardGamer",
            "numarticles": "1",
            "postdate": "Sun, 25 Feb 2024 19:45:52 +0000",
            "lastpostdate": "Sun, 25 Feb 2024 19:45:53 +0000"
          }
        },
*/

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

type Payload = {
  attributes: {
    id: string;
    title: string;
    numThreads: string;
    numPosts: string;
    lastPostDate: string;
    noPosting: string;
    termsOfUse: string;
  };
  threads: Array<{
    id: string;
    subject: string;
    author: string;
    numArticles: string;
    postDate: string;
    lastPostDate: string;
  }>;
};

const transformData = (data: ApiResponse): Payload => {
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

export const forum = async (params: Params): Promise<Payload | null> => {
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

import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { forumList } from "~/routes/forumList";
import { ParamsForumList } from "~/routes/types/params";
import { PayloadForumList } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

const endpoint = "/forumlist";

describe("forum list", () => {
  // BGG will return a forum list of similar type even for invalid IDs
  it("should fetch forum list data and transform it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <forums type="thing" id="169786" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <forum id="1565736" groupid="0" title="Reviews" noposting="0" description="Post your game reviews in this forum.  &lt;A href=&quot;/thread/59278&quot;&gt;Click here for help on writing game reviews.&lt;/A&gt;" numthreads="177" numposts="3185" lastpostdate="Fri, 22 Mar 2024 16:38:46 +0000" />
            <forum id="1565737" groupid="0" title="Sessions" noposting="0" description="Post your session reports here." numthreads="105" numposts="864" lastpostdate="Wed, 31 May 2023 14:11:02 +0000" />
            <forum id="1565738" groupid="0" title="General" noposting="0" description="Post any related article to this game here." numthreads="2045" numposts="31373" lastpostdate="Wed, 08 May 2024 18:27:45 +0000" />
        </forums>
      `;

    const params: ParamsForumList = { id: "169786", type: "thing" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await forumList(params);

    const mockPayload: PayloadForumList = {
      attributes: {
        type: "thing",
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
        id: "169786",
      },
      forums: [
        {
          id: "1565736",
          groupId: "0",
          title: "Reviews",
          noPosting: "0",
          description:
            'Post your game reviews in this forum.  <A href="/thread/59278">Click here for help on writing game reviews.</A>',
          numThreads: "177",
          numPosts: "3185",
          lastPostDate: "Fri, 22 Mar 2024 16:38:46 +0000",
        },
        {
          id: "1565737",
          groupId: "0",
          title: "Sessions",
          noPosting: "0",
          description: "Post your session reports here.",
          numThreads: "105",
          numPosts: "864",
          lastPostDate: "Wed, 31 May 2023 14:11:02 +0000",
        },
        {
          id: "1565738",
          groupId: "0",
          title: "General",
          noPosting: "0",
          description: "Post any related article to this game here.",
          numThreads: "2045",
          numPosts: "31373",
          lastPostDate: "Wed, 08 May 2024 18:27:45 +0000",
        },
      ],
    };

    expect(result).toEqual(mockPayload);
  });
});

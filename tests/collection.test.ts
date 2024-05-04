import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { collection } from "~/routes/collection";
import { ParamsCollection } from "~/routes/types/params";
import { PayloadCollection } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("collection", () => {
  it("should fetch collection data with an empty result and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <items totalitems="0" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse" pubdate="Sat, 04 May 2024 04:44:02 +0000">
        </items>
    `;

    const mockPayload: PayloadCollection = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
        totalItems: "0",
        pubDate: "Sat, 04 May 2024 04:44:02 +0000",
      },
      items: [],
    };

    const params: ParamsCollection = { username: "user" };

    mock.onGet("/collection", params).replyOnce(200, mockApiResponse);

    const result = await collection(params);

    expect(result).toEqual(mockPayload);
  });

  it("should fetch collection data with a valid result and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8" standalone="yes"?>
        <items totalitems="972" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse" pubdate="Sat, 04 May 2024 04:34:55 +0000">
            <item objecttype="thing" objectid="373167" subtype="boardgame" collid="112288092">
                <name sortindex="1">20 Strong</name>
                <yearpublished>2023</yearpublished>
                <image>https://cf.geekdo-images.com/ofw86iJ36-IOhMNdiRZd3w__original/img/tpTaYLFrgmnN4m92zEym4ywANyk=/0x0/filters:format(png)/pic7720772.png</image>
                <thumbnail>https://cf.geekdo-images.com/ofw86iJ36-IOhMNdiRZd3w__thumb/img/OkVkzjA9oyQupxvJympa5ODBdrQ=/fit-in/200x150/filters:strip_icc()/pic7720772.png</thumbnail>
                <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2023-11-10 11:28:09" />
                <numplays>0</numplays>
            </item>
            <item objecttype="thing" objectid="373169" subtype="boardgame" collid="112288095">
                <name sortindex="1">20 Strong: Hoplomachus Victorum</name>
                <yearpublished>2023</yearpublished>
                <image>https://cf.geekdo-images.com/SW9-PEYuqUrPdpJ2yQGJQw__original/img/tL4XWJo34nHiMpMTvFkqRh-EMWU=/0x0/filters:format(png)/pic7858266.png</image>
                <thumbnail>https://cf.geekdo-images.com/SW9-PEYuqUrPdpJ2yQGJQw__thumb/img/ZFNesclBVJ8ciCcuofX4u9Z9cgE=/fit-in/200x150/filters:strip_icc()/pic7858266.png</thumbnail>
                <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2023-11-10 11:28:13" />
                <numplays>0</numplays>
            </item>
            <item objecttype="thing" objectid="373168" subtype="boardgame" collid="112288098">
                <name sortindex="1">20 Strong: Too Many Bones</name>
                <yearpublished>2023</yearpublished>
                <image>https://cf.geekdo-images.com/LaQEc_vLxzee8FDw-Y1qnw__original/img/ibylQPK1odh659u1ilgdP5UieQ8=/0x0/filters:format(png)/pic7858265.png</image>
                <thumbnail>https://cf.geekdo-images.com/LaQEc_vLxzee8FDw-Y1qnw__thumb/img/7XLOTpi5-RBFV_huFki2TV8lYTk=/fit-in/200x150/filters:strip_icc()/pic7858265.png</thumbnail>
                <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2023-11-10 11:28:15" />
                <numplays>0</numplays>
            </item>
            <item objecttype="thing" objectid="277672" subtype="boardgame" collid="89578244">
                <name sortindex="1">303 Squadron</name>
                <yearpublished>2021</yearpublished>
                <image>https://cf.geekdo-images.com/A5CbwXTS8u1hSjUkUcahyw__original/img/yVh46G19w-sbvUL4NLKU_3C9Xb0=/0x0/filters:format(png)/pic4722439.png</image>
                <thumbnail>https://cf.geekdo-images.com/A5CbwXTS8u1hSjUkUcahyw__thumb/img/DHk_gg_KyjRbMQfNfD9gppLv1rQ=/fit-in/200x150/filters:strip_icc()/pic4722439.png</thumbnail>
                <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0"  preordered="0" lastmodified="2022-01-06 06:41:53" />
                <numplays>2</numplays>
            </item>
        </items>
    `;

    const mockPayload: PayloadCollection = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
        totalItems: "972",
        pubDate: "Sat, 04 May 2024 04:34:55 +0000",
      },
      items: [
        {
          id: "373167",
          collId: "112288092",
          type: "thing",
          name: "20 Strong",
          yearPublished: "2023",
          image:
            "https://cf.geekdo-images.com/ofw86iJ36-IOhMNdiRZd3w__original/img/tpTaYLFrgmnN4m92zEym4ywANyk=/0x0/filters:format(png)/pic7720772.png",
          thumbnail:
            "https://cf.geekdo-images.com/ofw86iJ36-IOhMNdiRZd3w__thumb/img/OkVkzjA9oyQupxvJympa5ODBdrQ=/fit-in/200x150/filters:strip_icc()/pic7720772.png",
          status: {
            own: true,
            prevOwned: false,
            forTrade: false,
            want: false,
            wantToPlay: false,
            wantToBuy: false,
            wishList: false,
            preOrdered: false,
            lastModified: "2023-11-10 11:28:09",
          },
          numPlays: 0,
        },
        {
          id: "373169",
          collId: "112288095",
          type: "thing",
          name: "20 Strong: Hoplomachus Victorum",
          yearPublished: "2023",
          image:
            "https://cf.geekdo-images.com/SW9-PEYuqUrPdpJ2yQGJQw__original/img/tL4XWJo34nHiMpMTvFkqRh-EMWU=/0x0/filters:format(png)/pic7858266.png",
          thumbnail:
            "https://cf.geekdo-images.com/SW9-PEYuqUrPdpJ2yQGJQw__thumb/img/ZFNesclBVJ8ciCcuofX4u9Z9cgE=/fit-in/200x150/filters:strip_icc()/pic7858266.png",
          status: {
            own: true,
            prevOwned: false,
            forTrade: false,
            want: false,
            wantToPlay: false,
            wantToBuy: false,
            wishList: false,
            preOrdered: false,
            lastModified: "2023-11-10 11:28:13",
          },
          numPlays: 0,
        },
        {
          id: "373168",
          collId: "112288098",
          type: "thing",
          name: "20 Strong: Too Many Bones",
          yearPublished: "2023",
          image:
            "https://cf.geekdo-images.com/LaQEc_vLxzee8FDw-Y1qnw__original/img/ibylQPK1odh659u1ilgdP5UieQ8=/0x0/filters:format(png)/pic7858265.png",
          thumbnail:
            "https://cf.geekdo-images.com/LaQEc_vLxzee8FDw-Y1qnw__thumb/img/7XLOTpi5-RBFV_huFki2TV8lYTk=/fit-in/200x150/filters:strip_icc()/pic7858265.png",
          status: {
            own: true,
            prevOwned: false,
            forTrade: false,
            want: false,
            wantToPlay: false,
            wantToBuy: false,
            wishList: false,
            preOrdered: false,
            lastModified: "2023-11-10 11:28:15",
          },
          numPlays: 0,
        },
        {
          id: "277672",
          collId: "89578244",
          type: "thing",
          name: "303 Squadron",
          yearPublished: "2021",
          image:
            "https://cf.geekdo-images.com/A5CbwXTS8u1hSjUkUcahyw__original/img/yVh46G19w-sbvUL4NLKU_3C9Xb0=/0x0/filters:format(png)/pic4722439.png",
          thumbnail:
            "https://cf.geekdo-images.com/A5CbwXTS8u1hSjUkUcahyw__thumb/img/DHk_gg_KyjRbMQfNfD9gppLv1rQ=/fit-in/200x150/filters:strip_icc()/pic4722439.png",
          status: {
            own: true,
            prevOwned: false,
            forTrade: false,
            want: false,
            wantToPlay: false,
            wantToBuy: false,
            wishList: false,
            preOrdered: false,
            lastModified: "2022-01-06 06:41:53",
          },
          numPlays: 2,
        },
      ],
    };
    const params: ParamsCollection = { username: "user" };

    mock.onGet("/collection", params).replyOnce(200, mockApiResponse);

    const result = await collection(params);

    expect(result).toEqual(mockPayload);
  });

  it("should fetch collection data with an error and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
        <errors>
            <error>
                <message>Invalid username specified</message>
            </error>
        </errors>
    `;

    const mockPayload: PayloadCollection = null;

    const params: ParamsCollection = { username: "user" };

    mock.onGet("/collection", params).replyOnce(200, mockApiResponse);

    const result = await collection(params);

    expect(result).toEqual(mockPayload);
  });
});

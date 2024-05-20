import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { ParamsTransformed, family, transformParams } from "~/routes/family";
import { ParamsFamily } from "~/routes/types/params";
import { PayloadFamily } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

const endpoint = "/family";

describe("family", () => {
  it("should fetch family data with an empty result and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse"></items>
    `;

    const mockPayload: PayloadFamily = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [],
    };

    const params: ParamsFamily = { id: ["213123123"] };

    mock.onGet(endpoint, params).replyOnce(200, mockApiResponse);

    const result = await family(params);

    expect(result).toEqual(mockPayload);
  });

  it("should fetch family data with a valid result and transform it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <item type="boardgamefamily" id="7381">
                <thumbnail>https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__thumb/img/7pTeU-32DZgMH22HZr0IaonBOUw=/fit-in/200x150/filters:strip_icc()/pic925144.jpg</thumbnail>
                <image>https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__original/img/5hI60KrH-xQdPSmVj2zelNxrANY=/0x0/filters:format(jpeg)/pic925144.jpg</image>
                <name type="primary" sortindex="1" value="Animals: Wolves" />
                <name type="alternate" sortindex="1" value="Mammals: Wolves" />
                <description>Games (expansions, promos, etc.) featuring wolves in theme or gameplay.&amp;#10;&amp;#10;&amp;#10;</description>
                <link type="boardgamefamily" id="32043" value="The 3 Little Pigs" inbound="true"/>
                <link type="boardgamefamily" id="52586" value="3 Little Pigs and the Big Bad Wolf" inbound="true"/>
                <link type="boardgamefamily" id="11323" value="Abdul's Adventure" inbound="true"/>
            </item>
        </items>
    `;

    const mockPayload: PayloadFamily = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [
        {
          id: "7381",
          type: "boardgamefamily",
          thumbnail:
            "https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__thumb/img/7pTeU-32DZgMH22HZr0IaonBOUw=/fit-in/200x150/filters:strip_icc()/pic925144.jpg",
          image:
            "https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__original/img/5hI60KrH-xQdPSmVj2zelNxrANY=/0x0/filters:format(jpeg)/pic925144.jpg",
          description:
            "Games (expansions, promos, etc.) featuring wolves in theme or gameplay.&#10;&#10;&#10;",
          names: [
            {
              type: "primary",
              sortIndex: "1",
              value: "Animals: Wolves",
            },
            {
              type: "alternate",
              sortIndex: "1",
              value: "Mammals: Wolves",
            },
          ],
          links: [
            {
              type: "boardgamefamily",
              id: "32043",
              value: "The 3 Little Pigs",
              inbound: true,
            },
            {
              type: "boardgamefamily",
              id: "52586",
              value: "3 Little Pigs and the Big Bad Wolf",
              inbound: true,
            },
            {
              type: "boardgamefamily",
              id: "11323",
              value: "Abdul's Adventure",
              inbound: true,
            },
          ],
        },
      ],
    };
    const params: ParamsFamily = { id: ["7381"] };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await family(params);

    expect(result).toEqual(mockPayload);
  });

  it("should fetch family data with multiple valid ids and transform it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <item type="boardgamefamily" id="7381">
                <thumbnail>https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__thumb/img/7pTeU-32DZgMH22HZr0IaonBOUw=/fit-in/200x150/filters:strip_icc()/pic925144.jpg</thumbnail>
                <image>https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__original/img/5hI60KrH-xQdPSmVj2zelNxrANY=/0x0/filters:format(jpeg)/pic925144.jpg</image>
                <name type="primary" sortindex="1" value="Animals: Wolves" />
                <name type="alternate" sortindex="1" value="Mammals: Wolves" />
                <description>Games (expansions, promos, etc.) featuring wolves in theme or gameplay.&amp;#10;&amp;#10;&amp;#10;</description>
                <link type="boardgamefamily" id="32043" value="The 3 Little Pigs" inbound="true"/>
                <link type="boardgamefamily" id="52586" value="3 Little Pigs and the Big Bad Wolf" inbound="true"/>
                <link type="boardgamefamily" id="11323" value="Abdul's Adventure" inbound="true"/>
            </item>
            <item type="boardgamefamily" id="58141">
                <thumbnail>https://cf.geekdo-images.com/TuNwpewMgkp2HPAXWPE3Sw__thumb/img/erdSKEao1TGxG0I5fjgnLt-wEZI=/fit-in/200x150/filters:strip_icc()/pic6280733.jpg</thumbnail>
                <image>https://cf.geekdo-images.com/TuNwpewMgkp2HPAXWPE3Sw__original/img/RGHAX4ZGun9sLFnZVj9D3YweedY=/0x0/filters:format(jpeg)/pic6280733.jpg</image>
                <name type="primary" sortindex="1" value="Animals: Wombats" />
                <name type="alternate" sortindex="1" value="Mammals: Wombats" />
                <description>Games (expansions, promos, etc.) featuring wombats in theme or gameplay.&amp;#10;&amp;#10;&amp;#10;</description>
                <link type="boardgamefamily" id="136778" value="Bushland Friends" inbound="true"/>
                <link type="boardgamefamily" id="356909" value="Hand-to-Hand Wombat" inbound="true"/>
                <link type="boardgamefamily" id="12837" value="Hedgehog's Revenge!" inbound="true"/>
            </item>
        </items>
    `;

    const mockPayload: PayloadFamily = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [
        {
          id: "7381",
          type: "boardgamefamily",
          thumbnail:
            "https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__thumb/img/7pTeU-32DZgMH22HZr0IaonBOUw=/fit-in/200x150/filters:strip_icc()/pic925144.jpg",
          image:
            "https://cf.geekdo-images.com/Yd_qszQj9pFDQJEhU59maQ__original/img/5hI60KrH-xQdPSmVj2zelNxrANY=/0x0/filters:format(jpeg)/pic925144.jpg",
          description:
            "Games (expansions, promos, etc.) featuring wolves in theme or gameplay.&#10;&#10;&#10;",
          names: [
            {
              type: "primary",
              sortIndex: "1",
              value: "Animals: Wolves",
            },
            {
              type: "alternate",
              sortIndex: "1",
              value: "Mammals: Wolves",
            },
          ],
          links: [
            {
              type: "boardgamefamily",
              id: "32043",
              value: "The 3 Little Pigs",
              inbound: true,
            },
            {
              type: "boardgamefamily",
              id: "52586",
              value: "3 Little Pigs and the Big Bad Wolf",
              inbound: true,
            },
            {
              type: "boardgamefamily",
              id: "11323",
              value: "Abdul's Adventure",
              inbound: true,
            },
          ],
        },
        {
          id: "58141",
          type: "boardgamefamily",
          thumbnail:
            "https://cf.geekdo-images.com/TuNwpewMgkp2HPAXWPE3Sw__thumb/img/erdSKEao1TGxG0I5fjgnLt-wEZI=/fit-in/200x150/filters:strip_icc()/pic6280733.jpg",
          image:
            "https://cf.geekdo-images.com/TuNwpewMgkp2HPAXWPE3Sw__original/img/RGHAX4ZGun9sLFnZVj9D3YweedY=/0x0/filters:format(jpeg)/pic6280733.jpg",
          description:
            "Games (expansions, promos, etc.) featuring wombats in theme or gameplay.&#10;&#10;&#10;",
          names: [
            {
              type: "primary",
              sortIndex: "1",
              value: "Animals: Wombats",
            },
            {
              type: "alternate",
              sortIndex: "1",
              value: "Mammals: Wombats",
            },
          ],
          links: [
            {
              type: "boardgamefamily",
              id: "136778",
              value: "Bushland Friends",
              inbound: true,
            },
            {
              type: "boardgamefamily",
              id: "356909",
              value: "Hand-to-Hand Wombat",
              inbound: true,
            },
            {
              type: "boardgamefamily",
              id: "12837",
              value: "Hedgehog's Revenge!",
              inbound: true,
            },
          ],
        },
      ],
    };
    const params: ParamsFamily = { id: ["7381", "58141"] };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await family(params);

    expect(result).toEqual(mockPayload);
  });

  it("should transform raw params", async () => {
    const rawParams: ParamsFamily = {
      id: ["7381", "58141"],
      type: ["rpg", "boardgamefamily"],
    };

    const transformedParams = transformParams(rawParams);

    const expectedParams: ParamsTransformed = {
      id: "7381,58141",
      type: "rpg,boardgamefamily",
    };

    expect(transformedParams).toEqual(expectedParams);
  });
});

import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { ParamsTransformed, hot, transformParams } from "~/routes/hot";
import { ParamsHot } from "~/routes/types/params";
import { PayloadHot } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

const endpoint = "/hot";

describe("hot", () => {
  it("should fetch hot data with an empty result and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            </items>`;

    const mockPayload: PayloadHot = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [],
    };

    mock.onGet(endpoint).replyOnce(200, mockApiResponse);

    const result = await hot();

    expect(result).toEqual(mockPayload);
  });

  it("should fetch default hot data and transform it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <item id="420033" rank="1">
                <thumbnail value="https://cf.geekdo-images.com/c3SChpKvfTed9ShMK1TPKQ__thumb/img/_pZPAWp3u0qbACxef2DFoQp3xY4=/fit-in/200x150/filters:strip_icc()/pic8170054.jpg"/>
                <name value="Vantage"/>
                <yearpublished value="2025" />
            </item>
            <item id="420077" rank="2">
                <thumbnail value="https://cf.geekdo-images.com/lvIHUl0m2wFXACaKcdVrjQ__thumb/img/H-2Mdf8nWx6X4pDui27eKHetjCo=/fit-in/200x150/filters:strip_icc()/pic8172090.jpg"/>
                <name value="The Mandalorian: Adventures"/>
                <yearpublished value="2024" />
            </item>
        </items>`;

    const mockPayload: PayloadHot = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [
        {
          id: "420033",
          rank: "1",
          name: "Vantage",
          yearPublished: "2025",
          thumbnail:
            "https://cf.geekdo-images.com/c3SChpKvfTed9ShMK1TPKQ__thumb/img/_pZPAWp3u0qbACxef2DFoQp3xY4=/fit-in/200x150/filters:strip_icc()/pic8170054.jpg",
        },
        {
          id: "420077",
          rank: "2",
          name: "The Mandalorian: Adventures",
          yearPublished: "2024",
          thumbnail:
            "https://cf.geekdo-images.com/lvIHUl0m2wFXACaKcdVrjQ__thumb/img/H-2Mdf8nWx6X4pDui27eKHetjCo=/fit-in/200x150/filters:strip_icc()/pic8172090.jpg",
        },
      ],
    };

    mock.onGet(endpoint).replyOnce(200, mockApiResponse);

    const result = await hot();

    expect(result).toEqual(mockPayload);
  });

  it("should fetch hot data of type and transform it", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
          <item id="403425" rank="1">
              <thumbnail value="https://cf.geekdo-images.com/vdk7BgJnbvRz8F5Rz3HatA__thumb/img/Kzy3E4qxGBp5TPH3CaILPW0L3co=/fit-in/200x150/filters:strip_icc()/pic7798352.jpg"/>
              <name value="Power Grid Boardgame"/>
          </item>
          <item id="383048" rank="2">
              <thumbnail value="https://cf.geekdo-images.com/PCKJnbN6o_7zWE_GF6gaCQ__thumb/img/8mWTyAO_ZnLqvkk5cKLA-VUTeyw=/fit-in/200x150/filters:strip_icc()/pic7470956.jpg"/>
              <name value="Capital Lux 2"/>
          </item>`;

    const mockPayload: PayloadHot = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [
        {
          id: "403425",
          rank: "1",
          name: "Power Grid Boardgame",
          thumbnail:
            "https://cf.geekdo-images.com/vdk7BgJnbvRz8F5Rz3HatA__thumb/img/Kzy3E4qxGBp5TPH3CaILPW0L3co=/fit-in/200x150/filters:strip_icc()/pic7798352.jpg",
        },
        {
          id: "383048",
          rank: "2",
          name: "Capital Lux 2",
          thumbnail:
            "https://cf.geekdo-images.com/PCKJnbN6o_7zWE_GF6gaCQ__thumb/img/8mWTyAO_ZnLqvkk5cKLA-VUTeyw=/fit-in/200x150/filters:strip_icc()/pic7470956.jpg",
        },
      ],
    };

    const params: ParamsHot = {
      type: ["videogame"],
    };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await hot(params);

    expect(result).toEqual(mockPayload);
  });

  it("should transform raw params", async () => {
    const rawParams: ParamsHot = {
      type: ["videogame", "boardgamecompany"],
    };

    const transformedParams = transformParams(rawParams);

    const expectedParams: ParamsTransformed = {
      type: "videogame,boardgamecompany",
    };

    expect(transformedParams).toEqual(expectedParams);
  });
});

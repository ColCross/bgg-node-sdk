import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import {
  ParamsTransformed,
  endpoint,
  transformParams,
  search,
} from "~/routes/search";
import { ParamsSearch } from "~/routes/types/params";
import { PayloadSearch } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("search", () => {
  it("should make a search query with results and transform them", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items total="76" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <item type="boardgame" id="398158">
                <name type="primary" value="Grind House: Scythes Out"/>
                <yearpublished value="2023" />
            </item>
            <item type="boardgame" id="226320">
                <name type="primary" value="My Little Scythe"/>
                <yearpublished value="2017" />
            </item>
            <item type="videogame" id="251883">
                <name type="primary" value="Scythe: Digital Edition"/>
            </item>
        </items>
    `;

    const params: ParamsSearch = { query: "scythe" };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await search(params);

    const mockPayload: PayloadSearch = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [
        {
          id: "398158",
          type: "boardgame",
          name: "Grind House: Scythes Out",
          yearPublished: "2023",
        },
        {
          id: "226320",
          type: "boardgame",
          name: "My Little Scythe",
          yearPublished: "2017",
        },
        {
          id: "251883",
          type: "videogame",
          name: "Scythe: Digital Edition",
        },
      ],
    };

    expect(result).toEqual(mockPayload);
  });

  it("should make a search query with no results and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items total="0" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">							</items>
    `;

    const params: ParamsSearch = { query: "abcdefg" };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await search(params);

    const mockPayload: PayloadSearch = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [],
    };

    expect(result).toEqual(mockPayload);
  });

  it("should transform raw params", async () => {
    const rawParams: ParamsSearch = {
      query: "scythe",
      type: ["videogame", "boardgameexpansion"],
    };

    const transformedParams = transformParams(rawParams);

    const expectedParams: ParamsTransformed = {
      query: "scythe",
      type: "videogame,boardgameexpansion",
    };

    expect(transformedParams).toEqual(expectedParams);
  });
});

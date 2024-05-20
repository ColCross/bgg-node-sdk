import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { guild } from "~/routes/guild";
import { ParamsGuild } from "~/routes/types/params";
import {
  PayloadGuildSuccess,
  PayloadGuildError,
} from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

const endpoint = "/guild";

describe("guild", () => {
  it("should fetch guild data successfully and transform it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <guild id="189" name="Atlanta, GA, USA" created="Fri, 15 Jun 2007 12:26:08 +0000" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <category>region</category>
            <website></website>
            <manager>gt8595b</manager>
            <description>The Atlanta, Georgia region guild</description>
            <location>
                <addr1></addr1>
                <addr2></addr2>
                <city>Atlanta</city>
                <stateorprovince>Georgia</stateorprovince>
                <postalcode></postalcode>
                <country>United States</country>
            </location>
            <members count="88" page="1">
                <member name="Example User" date="Mon, 28 Jan 2013 03:44:04 +0000" />
                <member name="exampleuser" date="Sat, 19 Feb 2011 10:43:49 +0000" />
            </members>
        </guild>
      `;

    const params: ParamsGuild = { id: "189", members: true };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await guild(params);

    const mockPayload: PayloadGuildSuccess = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
        id: "189",
        name: "Atlanta, GA, USA",
        created: "Fri, 15 Jun 2007 12:26:08 +0000",
      },
      guild: {
        id: "189",
        name: "Atlanta, GA, USA",
        created: "Fri, 15 Jun 2007 12:26:08 +0000",
        category: "region",
        manager: "gt8595b",
        description: "The Atlanta, Georgia region guild",
        location: {
          city: "Atlanta",
          stateorprovince: "Georgia",
          country: "United States",
        },
        members: {
          count: "88",
          page: "1",
          member: [
            {
              name: "Example User",
              date: "Mon, 28 Jan 2013 03:44:04 +0000",
            },
            {
              name: "exampleuser",
              date: "Sat, 19 Feb 2011 10:43:49 +0000",
            },
          ],
        },
      },
    };

    expect(result).toEqual(mockPayload);
  });

  it("should fetch guild data with a guild not found error and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <guild id="189234234234"  termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <error>Guild not found.</error>
        </guild>
      `;

    const params: ParamsGuild = { id: "189234234234" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await guild(params);

    const mockPayload: PayloadGuildError = {
      attributes: {
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      guild: null,
    };

    expect(result).toEqual(mockPayload);
  });
});

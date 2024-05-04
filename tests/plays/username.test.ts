import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { username } from "~/routes/plays/username";
import { ParamsPlaysUsername } from "~/routes/types/params";
import { PayloadPlaysUsername } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("plays by username", () => {
  it("should fetch plays by username data with an error result and respond null", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <div class='messagebox error'>
          Invalid object or user
        </div>
      `;

    const params: ParamsPlaysUsername = { username: "user" };

    mock.onGet("/plays", { params }).replyOnce(200, mockApiResponse);

    const result = await username(params);

    expect(result).toEqual(null);
  });

  it("should fetch plays by username data with a valid result and handle it", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <plays username="user" userid="123456" total="663" page="1" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
          <play id="84208342" date="2024-04-28" quantity="2" length="0" incomplete="0" nowinstats="0" location="">
              <item name="ISS Vanguard" objecttype="thing" objectid="325494">
                  <subtypes>
                      <subtype value="boardgame" />
                  </subtypes>
              </item>
          </play>
          <play id="84145932" date="2024-04-27" quantity="2" length="0" incomplete="0" nowinstats="0" location="">
              <item name="The Great British Baking Show Game" objecttype="thing" objectid="363252">
                  <subtypes>
                      <subtype value="boardgame" />
                  </subtypes>
              </item>
          </play>
          <play id="84145940" date="2024-04-27" quantity="1" length="0" incomplete="0" nowinstats="0" location="">
              <item name="Unmatched Adventures: Tales to Amaze" objecttype="thing" objectid="381297">
                  <subtypes>
                      <subtype value="boardgame" />
                      <subtype value="boardgameimplementation" />
                      <subtype value="boardgameintegration" />
                  </subtypes>
              </item>
          </play>
      </plays>
      `;

    const params: ParamsPlaysUsername = { username: "user" };

    mock.onGet("/plays", { params }).replyOnce(200, mockApiResponse);

    const result = await username(params);

    const mockPayload: PayloadPlaysUsername = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
        username: "user",
        userid: "123456",
        total: "663",
        page: "1",
      },
      plays: [
        {
          id: "84208342",
          date: "2024-04-28",
          quantity: "2",
          length: "0",
          incomplete: "0",
          nowinstats: "0",
          location: "",
          item: {
            name: "ISS Vanguard",
            objecttype: "thing",
            objectid: "325494",
            subtypes: ["boardgame"],
          },
        },
        {
          id: "84145932",
          date: "2024-04-27",
          quantity: "2",
          length: "0",
          incomplete: "0",
          nowinstats: "0",
          location: "",
          item: {
            name: "The Great British Baking Show Game",
            objecttype: "thing",
            objectid: "363252",
            subtypes: ["boardgame"],
          },
        },
        {
          id: "84145940",
          date: "2024-04-27",
          quantity: "1",
          length: "0",
          incomplete: "0",
          nowinstats: "0",
          location: "",
          item: {
            name: "Unmatched Adventures: Tales to Amaze",
            objecttype: "thing",
            objectid: "381297",
            subtypes: [
              "boardgame",
              "boardgameimplementation",
              "boardgameintegration",
            ],
          },
        },
      ],
    };

    expect(result).toEqual(mockPayload);
  });

  it("should fetch plays by username data with an empty result and transform it", async () => {
    const emptyMockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <plays username="user" userid="123456" total="0" page="1" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse"></plays>
      `;

    const params: ParamsPlaysUsername = { username: "user", subtype: "rpg" };

    mock.onGet("/plays", { params }).replyOnce(200, emptyMockApiResponse);

    const result = await username(params);

    const mockPayload: PayloadPlaysUsername = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
        username: "user",
        userid: "123456",
        total: "0",
        page: "1",
      },
      plays: [],
    };

    expect(result).toEqual(mockPayload);
  });
});

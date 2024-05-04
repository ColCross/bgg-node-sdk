import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { id } from "~/routes/plays/id";
import { ParamsPlaysId } from "~/routes/types/params";
import { PayloadPlaysId } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("plays by id", () => {
  it("should fetch plays by id data with an empty result and handle it", async () => {
    const mockApiResponse = `<?xml version="1.0" encoding="utf-8"?>
    <plays total="0" page="1" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse"></plays>`;

    const mockPayload: PayloadPlaysId = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
        total: "0",
        page: "1",
      },
      plays: [],
    };

    const params: ParamsPlaysId = { id: "1", type: "thing" };

    mock.onGet("/plays", { params }).replyOnce(200, mockApiResponse);

    const result = await id(params);

    expect(result).toEqual(mockPayload);
  });

  it("should fetch plays by id data with a valid result and transform it", async () => {
    const mockApiResponse = `
      <?xml version="1.0" encoding="utf-8"?>
      <plays total="1418" page="1" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
          <play id="84233913" userid="1438113" date="2024-04-30" quantity="1" length="135" incomplete="0" nowinstats="0" location="Boardroom">
              <item name="Intrepid" objecttype="thing" objectid="302461">
                  <subtypes>
                      <subtype value="boardgame" />
                  </subtypes>
              </item>
              <players>
                  <player username="FunkyGibbon69" userid="2261554" name="Ian" startposition="" color="" score="" new="0" rating="0" win="0" />
                  <player username="SuperchargedGTS" userid="1438113" name="Damon" startposition="" color="" score="" new="0" rating="0" win="0" />
                  <player username="Lukedonegan" userid="2251555" name="Luke" startposition="" color="" score="" new="1" rating="0" win="0" />
                  <player username="FotN06" userid="2344144" name="Azza" startposition="" color="" score="" new="0" rating="0" win="0" />
              </players>
          </play>
          <play id="84131737" userid="1161360" date="2024-04-27" quantity="1" length="0" incomplete="0" nowinstats="0" location="">
              <item name="Intrepid" objecttype="thing" objectid="302461">
                  <subtypes>
                      <subtype value="boardgame" />
                  </subtypes>
              </item>
              <comments>Meteor Storm
      Hikaru USA
      Dave Germany
      Won on round 9</comments>
              <players>
                  <player username="" userid="0" name="Hikaru" startposition="" color="" score="" new="0" rating="0" win="0" />
                  <player username="DaveyB" userid="1161360" name="Dave Brown" startposition="" color="" score="" new="0" rating="0" win="0" />
              </players>
          </play>
          <play id="84154136" userid="2862448" date="2024-04-27" quantity="1" length="0" incomplete="0" nowinstats="0" location="">
              <item name="Intrepid" objecttype="thing" objectid="302461">
                  <subtypes>
                      <subtype value="boardgame" />
                  </subtypes>
              </item>
          </play>
          <play id="84037496" userid="931260" date="2024-04-25" quantity="1" length="0" incomplete="0" nowinstats="0" location="Home">
              <item name="Intrepid" objecttype="thing" objectid="302461">
                  <subtypes>
                      <subtype value="boardgame" />
                  </subtypes>
              </item>
              <players>
                  <player username="emdrew" userid="931260" name="Andrew Luxton-Reilly" startposition="" color="" score="" new="1" rating="0" win="0" />
              </players>
          </play>
      </plays>
      `;

    const params: ParamsPlaysId = { id: "1", type: "thing" };

    mock.onGet("/plays", { params }).replyOnce(200, mockApiResponse);

    const result = await id(params);

    const mockPayload: PayloadPlaysId = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
        total: "1418",
        page: "1",
      },
      plays: [
        {
          id: "84233913",
          date: "2024-04-30",
          quantity: "1",
          length: "135",
          incomplete: "0",
          nowInStats: "0",
          location: "Boardroom",
          item: {
            name: "Intrepid",
            objectType: "thing",
            objectId: "302461",
            subtypes: ["boardgame"],
          },
          players: [
            {
              username: "FunkyGibbon69",
              userid: "2261554",
              name: "Ian",
              startPosition: "",
              color: "",
              score: "",
              new: "0",
              rating: "0",
              win: "0",
            },
            {
              username: "SuperchargedGTS",
              userid: "1438113",
              name: "Damon",
              startPosition: "",
              color: "",
              score: "",
              new: "0",
              rating: "0",
              win: "0",
            },
            {
              username: "Lukedonegan",
              userid: "2251555",
              name: "Luke",
              startPosition: "",
              color: "",
              score: "",
              new: "1",
              rating: "0",
              win: "0",
            },
            {
              username: "FotN06",
              userid: "2344144",
              name: "Azza",
              startPosition: "",
              color: "",
              score: "",
              new: "0",
              rating: "0",
              win: "0",
            },
          ],
        },
        {
          id: "84131737",
          date: "2024-04-27",
          quantity: "1",
          length: "0",
          incomplete: "0",
          nowInStats: "0",
          location: "",
          item: {
            name: "Intrepid",
            objectType: "thing",
            objectId: "302461",
            subtypes: ["boardgame"],
          },
          players: [
            {
              username: "",
              userid: "0",
              name: "Hikaru",
              startPosition: "",
              color: "",
              score: "",
              new: "0",
              rating: "0",
              win: "0",
            },
            {
              username: "DaveyB",
              userid: "1161360",
              name: "Dave Brown",
              startPosition: "",
              color: "",
              score: "",
              new: "0",
              rating: "0",
              win: "0",
            },
          ],
        },
        {
          id: "84154136",
          date: "2024-04-27",
          quantity: "1",
          length: "0",
          incomplete: "0",
          nowInStats: "0",
          location: "",
          item: {
            name: "Intrepid",
            objectType: "thing",
            objectId: "302461",
            subtypes: ["boardgame"],
          },
        },
        {
          id: "84037496",
          date: "2024-04-25",
          quantity: "1",
          length: "0",
          incomplete: "0",
          nowInStats: "0",
          location: "Home",
          item: {
            name: "Intrepid",
            objectType: "thing",
            objectId: "302461",
            subtypes: ["boardgame"],
          },
          players: [
            {
              username: "emdrew",
              userid: "931260",
              name: "Andrew Luxton-Reilly",
              startPosition: "",
              color: "",
              score: "",
              new: "1",
              rating: "0",
              win: "0",
            },
          ],
        },
      ],
    };

    expect(result).toEqual(mockPayload);
  });
});

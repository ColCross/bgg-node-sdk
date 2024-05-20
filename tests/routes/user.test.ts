import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { endpoint, user } from "~/routes/user";
import { ParamsUser } from "~/routes/types/params";
import { PayloadUser } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("thread", () => {
  it("should fetch a valid user and ransform it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <user id="1234567" name="exampleuser" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <firstname value="John" />
            <lastname value="Doe" />
            <avatarlink value="N/A" />
            <yearregistered value="2022" />
            <lastlogin value="2024-05-19" />
            <stateorprovince value="Georgia" />
            <country value="United States" />
            <webaddress value="" />
            <xboxaccount value="" />
            <wiiaccount value="" />
            <psnaccount value="" />
            <battlenetaccount value="" />
            <steamaccount value="" />
            <traderating value="0" />
            <buddies total="1" page="1">
                <buddy id="234567" name="example_buddy" />
            </buddies>
            <guilds total="1" page="1">
                <guild id="189" name="Atlanta, GA, USA" />
            </guilds>
            <top domain="boardgame">
                <item rank="1" type="thing" id="169786" name="Scythe" />
            </top>
            <hot domain="boardgame">
                <item rank="1" type="thing" id="226320" name="My Little Scythe" />
            </hot>
        </user>
    `;

    const params: ParamsUser = { name: "exampleuser" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await user(params);

    const mockPayload: PayloadUser = {
      termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      user: {
        id: "1234567",
        name: "exampleuser",
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
        firstName: "John",
        lastName: "Doe",
        avatarLink: "N/A",
        yearRegistered: "2022",
        lastLogin: "2024-05-19",
        stateOrProvince: "Georgia",
        country: "United States",
        webAddress: "",
        xboxAccount: "",
        wiiAccount: "",
        psnAccount: "",
        battlenetAccount: "",
        steamAccount: "",
        tradeRating: "0",
        buddies: {
          total: "1",
          page: "1",
          buddy: [
            {
              id: "234567",
              name: "example_buddy",
            },
          ],
        },
        guilds: {
          total: "1",
          page: "1",
          guild: [
            {
              id: "189",
              name: "Atlanta, GA, USA",
            },
          ],
        },
        hot: {
          domain: "boardgame",
          item: [
            {
              rank: "1",
              type: "thing",
              id: "226320",
              name: "My Little Scythe",
            },
          ],
        },
        top: {
          domain: "boardgame",
          item: [
            {
              rank: "1",
              type: "thing",
              id: "169786",
              name: "Scythe",
            },
          ],
        },
      },
    };

    expect(result).toEqual(mockPayload);
  });

  it("should fetch an invalid user and handle it", async () => {
    const mockApiResponse = `
        <!DOCTYPE html>
        <html lang="en-US">
        
        <head>
            <meta charset="utf-8" />
            <title>404 - Page Not Found</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                @import url("https://use.typekit.net/ddz3tbb.css");
        
                * {
                    box-sizing: border-box;
                }
        
                html,
                body {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    font-family: proxima-nova, Arial, sans-serif;
                    line-height: 1.5;
                    background-color: #3f3a60;
                }
        
                body {
                    display: flex;
                    /* fallback */
                    display: grid;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
        
                .container {
                    padding: 15px;
                    text-align: center;
                }
        
                svg {
                    width: 85%;
                    max-width: 430px;
                    height: auto;
                }
        
                @media (min-width: 600px) {
                    svg {
                        width: 100%;
                    }
                }
        
                h1 {
                    margin: 6% 0 2% 0;
                    font-size: 1.25em;
                    line-height: 1.2;
                    color: #fff;
                }
        
                @media (min-width: 600px) {
                    h1 {
                        font-size: 1.75em;
                    }
                }
        
                p {
                    margin: 0 0 5% 0;
                    color: rgba(255, 255, 255, 0.6);
                }
        
                .btn {
                    display: inline-block;
                    padding: 12px 18px;
                    font-size: 1em;
                    font-weight: 600;
                    line-height: 1;
                    color: #fff;
                    background-color: #da2b6f;
                    text-decoration: none;
                    box-shadow: 2px 2px 0 2px #59122d;
                    transition: background-color 0.2s ease-in-out;
                }
        
                .btn:hover,
                .btn:focus {
                    background-color: #b3235b;
                }
            </style>
        </head>
        
        <body>
            <main class="container">
                <a href="/">
                    <svg viewBox="0 0 432 170" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title-404">
                        <title id="title-404">Error 404</title>
                        <g fill-rule="nonzero" fill="none">
                            <path
                                d="M346.443 95.687h-9.729l33.424-53.785v15.655l-23.695 38.13zm67.737 66.177h-38.042l-7.995-4.004v-22.888h-62.151L298 130.96V98.94l56.51-92.1h55.664l4.006 7.997v78.866h13.777l4.035 7.984v33.285H414.18v26.892zm-6-6v-26.892h17.812V95.687H408.18V8.837h-52.555l-55.633 90.597v29.538h70.146v26.892h38.042z"
                                fill="#59122D" />
                            <path
                                d="M408.18 155.864h-38.042v-26.892h-70.146V99.434l55.633-90.597h52.555v86.85h17.812v33.285H408.18v26.892zm-38.042-60.177V41.902l-33.424 53.785h33.424z"
                                stroke="#8C1C47" stroke-width="4" fill="#DA2B6F" />
                            <path
                                d="M253.39 35.799l3.478 1.633-.715 1.546-4.824 1.325 2.06-4.504zm8.672-9.743l-3.592 7.838-3.498-1.59 3.591-7.837 3.499 1.589zm5.187-11.322l-3.591 7.838-3.499-1.59 3.592-7.837 3.498 1.59zm-7.056-9.648L274 0l-5.658 12.269-3.447-1.53 1.77-3.954-5.137 1.893-1.335-3.592zm-11.72 4.318l8.114-2.989 1.334 3.591-8.114 2.99-1.334-3.592zm-11.721 4.318l8.114-2.989 1.335 3.591-8.115 2.99-1.334-3.592zm-11.72 4.318l8.114-2.989 1.334 3.591-8.114 2.99-1.335-3.592zm-11.721 4.318l8.114-2.989 1.334 3.591-8.114 2.99-1.334-3.592zm-11.721 4.318l8.114-2.989 1.335 3.591-8.115 2.99-1.334-3.592zm-11.72 4.318l8.114-2.989 1.334 3.591-8.114 2.99-1.335-3.592zm-11.721 4.318l8.114-2.989 1.334 3.591-8.114 2.99-1.334-3.592zm-11.72 4.318l8.113-2.989 1.335 3.591-8.115 2.99-1.334-3.592zm-1.514 16.071l-1.06-8.55 3.817-.47 1.059 8.551-3.816.469zm1.53 12.351l-1.06-8.55 3.817-.47 1.059 8.551-3.817.469zm1.53 12.35l-1.06-8.55 3.816-.468 1.06 8.55-3.817.469zm-1.597 7.635l3.645-3.518 2.676 2.75-3.816.469-.438-3.535 3.816-.468.438 3.534-3.645 3.518-2.676-2.75zm-4.66 13.938l-1.769-4.436-.949-2.38 1.847-1.783 2.77-2.674 2.676 2.75-2.77 2.673 1.77 4.437-3.574 1.413zm4.614 11.566l-3.194-8.007 3.574-1.413 3.193 8.007-3.573 1.413zm4.612 11.566l-3.193-8.007 3.574-1.414 3.193 8.008-3.574 1.413zm4.613 11.566l-3.193-8.007 3.573-1.414 3.194 8.007-3.574 1.414zm4.613 11.565l-3.193-8.007 3.573-1.413 3.194 8.007-3.574 1.413zm4.613 11.566l-3.194-8.007 3.574-1.413 3.194 8.007-3.574 1.413zm12.73 6.57l-5.29 1.952-3.523 1.299-1.387-3.477-1.11-2.785 3.573-1.413 1.11 2.785 5.292-1.951 1.335 3.59zm11.72-4.321l-8.114 2.992-1.335-3.591 8.113-2.992 1.335 3.59zm11.718-4.323l-8.113 2.993-1.335-3.591 8.113-2.992 1.335 3.59zm11.72-4.322l-8.114 2.993-1.335-3.591 8.113-2.992 1.336 3.59zm11.719-4.322l-8.114 2.993-1.335-3.591 8.113-2.992 1.336 3.59zm10.581-9.904l-2.382 5.597-.647 1.522-1.558.575-2.388.88-1.336-3.59 2.389-.881 2.382-5.597 3.54 1.494zm4.876-11.458l-3.375 7.932-3.54-1.494 3.375-7.932 3.54 1.494zm4.876-11.458l-3.375 7.932-3.54-1.494 3.375-7.933 3.54 1.495zm4.876-11.459l-3.375 7.933-3.54-1.494 3.375-7.933 3.54 1.494zm-.725-14.745l3.07 2.962 1.892 1.827-1.028 2.417-1.708 4.014-3.54-1.494 1.707-4.014-3.069-2.962 2.676-2.75zm-3.894-6.822l-.576 4.63-1.14-3.221 2.848 2.749-2.676 2.75-2.849-2.75.577-4.63 3.816.472zm1.537-12.35l-1.064 8.55-3.816-.471 1.064-8.55 3.816.471zm1.538-12.35l-1.065 8.55-3.816-.471 1.065-8.55 3.816.471zm1.537-12.35l-1.064 8.55-3.816-.471 1.064-8.55 3.816.471zm-9.873-12.157l5.115-1.428 1.086 3.694-5.185 1.427-1.016-3.693zm6.53 7.886l.741-5.935 3.815.462-.74 5.944-3.816-.471z"
                                fill="#C0C5C8" />
                            <g>
                                <path
                                    d="M49.443 95.687h-9.729l33.424-53.785v15.655l-23.695 38.13zm67.737 66.177H79.138l-7.995-4.004v-22.888H8.992L1 130.96V98.94l56.51-92.1h55.664l4.006 7.997v78.866h13.777l4.035 7.984v33.285H117.18v26.892zm-6-6v-26.892h17.812V95.687H111.18V8.837H58.625L2.992 99.434v29.538h70.146v26.892h38.042z"
                                    fill="#59122D" />
                                <path
                                    d="M111.18 155.864H73.138v-26.892H2.992V99.434L58.625 8.837h52.555v86.85h17.812v33.285H111.18v26.892zM73.138 95.687V41.902L39.714 95.687h33.424z"
                                    stroke="#8C1C47" stroke-width="4" fill="#DA2B6F" />
                            </g>
                        </g>
                    </svg>
                </a>
                <h1>It appears we're missing some bits&hellip;</h1>
                <p>Sorry, the page you're looking for is missing or does not exist.</p>
                <p><a class="btn" href="/" class="btn">Take Me Home</a></p>
            </main>
        </body>
        
        </html>
    `;

    const params: ParamsUser = { name: "invaliduser" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await user(params);

    const mockPayload: PayloadUser = null;

    expect(result).toEqual(mockPayload);
  });
});

import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import { endpoint, thread } from "~/routes/thread";
import { ParamsThread } from "~/routes/types/params";
import { PayloadThread } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("thread", () => {
  it("should fetch a thread with results and transform them", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <thread id="3265741" numarticles="20" link="https://boardgamegeek.com/thread/3265741" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <subject>You can&#039;t say Scythe without sigh</subject>
            <articles>
                <article id="43960575" username="LyallUClarion"
                        link="https://boardgamegeek.com/thread/3265741/article/43960575#43960575"
                        postdate="2024-03-14T15:23:25-05:00"
                        editdate="2024-04-07T15:16:04-05:00"
                        numedits="1">
                    <subject>You can&#039;t say Scythe without sigh</subject>
                    <body>(Using the BBG star rating system: 7/10 - Good, usually willing to play)&lt;br/&gt;&lt;br/&gt;What it is&lt;br/&gt;- Gorgeous - art and components thematic and high quality&lt;br/&gt;- Intriguing -  dieselpunk reimagining of a post-WW1eque world with monstrous mechs &lt;br/&gt;- Engine-builder - gather resources and upgrade your production to outclass your rivals; can you expand and consolidate your war machine faster than the rest? &lt;br/&gt;&lt;br/&gt;What it isn't&lt;br/&gt;- Intuitive - Why can I cross the river at one point but not another? How is the victory thematic if I don't grab factory cards? Isn't that the point?&lt;br/&gt;- A war game - like the actual WW1, it is slow, churning and trapped in a stalemate where battling is an unfortunate mistake rather than the feature of the game &lt;br/&gt;&lt;br/&gt;Liked&lt;br/&gt;- Unique mechs and abilities for each faction&lt;br/&gt;- The concept - the box shows battling mechs in an open dynamic war scene&lt;br/&gt;- Variability - the objective cards, encounters and range of unique factions makes this insanely replayable&lt;br/&gt;&lt;br/&gt;Disliked&lt;br/&gt;- Slow pace&lt;br/&gt;- The execution - &quot;The box shows battling mechs in a open dynamic war scene&quot;... but the game doesn't actually let you do that&lt;br/&gt;- The mine network - you can pop up in any region of the map with no ability to intercept, undermining the race to the centre by forcing the bulk of your army into the rearguard&lt;br/&gt;&lt;br/&gt;Play if&lt;br/&gt;- You like a slow-burning engine builder &lt;br/&gt;- Theme matters more than substance&lt;br/&gt;&lt;br/&gt;Don't play if&lt;br/&gt;- Traditional war gamer - It looks like a war game but doesn't play like one&lt;br/&gt;- Looking for light-hearted fun - it's long and complicated &lt;br/&gt;&lt;br/&gt;Evaluation&lt;br/&gt;- This unique blend of mechanics is its own kind of fun. Build your war engine slowly and relentlessly. It is possible to become an expert at this game by learning its quirks. However, other games do each piece of this puzzle better&lt;br/&gt;&lt;br/&gt;Why missing out on the 10/10&lt;br/&gt;- I wrote four pages of house rules to make the movement dynamic and the battles frequent and tactical. It mostly involved removing unintuitive, needlessly restrictive and unthematic rules. It's overengineering made it inelegant; the ingenious parts made a dumb whole. &lt;br/&gt;&lt;br/&gt;Similar games&lt;br/&gt;- Axis and Allies&lt;br/&gt;- Civilisation&lt;br/&gt;- WIngspan - thematically completely different but same design principles as created by the same designer (see my view of Wingspan)&lt;br/&gt;&lt;br/&gt;Gateway Games&lt;br/&gt;- Risk&lt;br/&gt;&lt;br/&gt;Recommendation&lt;br/&gt;- Watch some playthroughs. If the pace and decisions appeal to you, it is a winner. Just don't buy this for what you think it is. If the art appeals, support the artist and get some prints&lt;br/&gt;&lt;br/&gt;[heading]Thank you for reading!!![/heading]&lt;br/&gt;👍- By thumbing up this post it helps this content go further so please consider helping to share this around the globe. &lt;br/&gt;💬- Comment below to share your thoughts as the discussion is always just as good, and thank you for being a part of it! &lt;br/&gt;💯- If you are interested in other reviews, then check out my &lt;a  href=&quot;https://boardgamegeek.com/geeklist/334563/rions-reviews&quot;   &gt;Rion’s Reviews&lt;/a&gt; geeklist and subscribe so it goes straight to your feed.&lt;br/&gt;🔎 - Still want more? How about see what other &lt;a href=&quot;/user/LyallUClarion/contributions&quot; target=&quot;_blank&quot; class=&quot;postlink&quot; rel=&quot;nofollow noreferrer noopener&quot;&gt;contributions&lt;/a&gt; I have made to BGG including game variants, advice and support on game rules, and more!&lt;br/&gt; &lt;a href=&quot;https://info.flagcounter.com/LmAz&quot; target=&quot;_blank&quot; class=&quot;postlink&quot; rel=&quot;nofollow noreferrer noopener&quot;&gt;&lt;div&gt;&lt;img border=0 src=&quot;https://s11.flagcounter.com/count2/LmAz/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/&quot;&gt;&lt;/div&gt;&lt;/a&gt;</body>
                </article>
                <article id="43963846" username="rkonigsberg"
                        link="https://boardgamegeek.com/thread/3265741/article/43963846#43963846"
                        postdate="2024-03-15T08:41:48-05:00"
                        editdate="2024-03-15T08:41:48-05:00"
                        numedits="0">
                    <subject>Re: You can&#039;t say Scythe without sigh</subject>
                    <body>I'm curious: what are your house rules?</body>
                </article>
            </articles>
        </thread>
    `;

    const params: ParamsThread = { id: "3265741" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await thread(params);

    const mockPayload: PayloadThread = {
      attributes: {
        id: "3265741",
        numArticles: "20",
        link: "https://boardgamegeek.com/thread/3265741",
        termsOfUse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      subject: "You can't say Scythe without sigh",
      articles: [
        {
          id: "43960575",
          username: "LyallUClarion",
          link: "https://boardgamegeek.com/thread/3265741/article/43960575#43960575",
          postDate: "2024-03-14T15:23:25-05:00",
          editDate: "2024-04-07T15:16:04-05:00",
          numEdits: "1",
          body: '(Using the BBG star rating system: 7/10 - Good, usually willing to play)<br/><br/>What it is<br/>- Gorgeous - art and components thematic and high quality<br/>- Intriguing -  dieselpunk reimagining of a post-WW1eque world with monstrous mechs <br/>- Engine-builder - gather resources and upgrade your production to outclass your rivals; can you expand and consolidate your war machine faster than the rest? <br/><br/>What it isn\'t<br/>- Intuitive - Why can I cross the river at one point but not another? How is the victory thematic if I don\'t grab factory cards? Isn\'t that the point?<br/>- A war game - like the actual WW1, it is slow, churning and trapped in a stalemate where battling is an unfortunate mistake rather than the feature of the game <br/><br/>Liked<br/>- Unique mechs and abilities for each faction<br/>- The concept - the box shows battling mechs in an open dynamic war scene<br/>- Variability - the objective cards, encounters and range of unique factions makes this insanely replayable<br/><br/>Disliked<br/>- Slow pace<br/>- The execution - "The box shows battling mechs in a open dynamic war scene"... but the game doesn\'t actually let you do that<br/>- The mine network - you can pop up in any region of the map with no ability to intercept, undermining the race to the centre by forcing the bulk of your army into the rearguard<br/><br/>Play if<br/>- You like a slow-burning engine builder <br/>- Theme matters more than substance<br/><br/>Don\'t play if<br/>- Traditional war gamer - It looks like a war game but doesn\'t play like one<br/>- Looking for light-hearted fun - it\'s long and complicated <br/><br/>Evaluation<br/>- This unique blend of mechanics is its own kind of fun. Build your war engine slowly and relentlessly. It is possible to become an expert at this game by learning its quirks. However, other games do each piece of this puzzle better<br/><br/>Why missing out on the 10/10<br/>- I wrote four pages of house rules to make the movement dynamic and the battles frequent and tactical. It mostly involved removing unintuitive, needlessly restrictive and unthematic rules. It\'s overengineering made it inelegant; the ingenious parts made a dumb whole. <br/><br/>Similar games<br/>- Axis and Allies<br/>- Civilisation<br/>- WIngspan - thematically completely different but same design principles as created by the same designer (see my view of Wingspan)<br/><br/>Gateway Games<br/>- Risk<br/><br/>Recommendation<br/>- Watch some playthroughs. If the pace and decisions appeal to you, it is a winner. Just don\'t buy this for what you think it is. If the art appeals, support the artist and get some prints<br/><br/>[heading]Thank you for reading!!![/heading]<br/>👍- By thumbing up this post it helps this content go further so please consider helping to share this around the globe. <br/>💬- Comment below to share your thoughts as the discussion is always just as good, and thank you for being a part of it! <br/>💯- If you are interested in other reviews, then check out my <a  href="https://boardgamegeek.com/geeklist/334563/rions-reviews"   >Rion’s Reviews</a> geeklist and subscribe so it goes straight to your feed.<br/>🔎 - Still want more? How about see what other <a href="/user/LyallUClarion/contributions" target="_blank" class="postlink" rel="nofollow noreferrer noopener">contributions</a> I have made to BGG including game variants, advice and support on game rules, and more!<br/> <a href="https://info.flagcounter.com/LmAz" target="_blank" class="postlink" rel="nofollow noreferrer noopener"><div><img border=0 src="https://s11.flagcounter.com/count2/LmAz/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"></div></a>',
        },
        {
          id: "43963846",
          username: "rkonigsberg",
          link: "https://boardgamegeek.com/thread/3265741/article/43963846#43963846",
          postDate: "2024-03-15T08:41:48-05:00",
          editDate: "2024-03-15T08:41:48-05:00",
          numEdits: "0",
          body: "I'm curious: what are your house rules?",
        },
      ],
    };

    expect(result).toEqual(mockPayload);
  });

  it("should fetch a thread with a thread not found error and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <error message='Thread Not Found' />
    `;

    const params: ParamsThread = { id: "abc" };

    mock.onGet(endpoint, { params }).replyOnce(200, mockApiResponse);

    const result = await thread(params);

    const mockPayload: PayloadThread = null;

    expect(result).toEqual(mockPayload);
  });
});

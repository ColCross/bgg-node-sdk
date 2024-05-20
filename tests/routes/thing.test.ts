import MockAdapter from "axios-mock-adapter";
import { axios } from "~/lib/axios";

import {
  ParamsTransformed,
  endpoint,
  thing,
  transformParams,
} from "~/routes/thing";
import { ParamsThing } from "~/routes/types/params";
import { PayloadThing } from "~/routes/types/payloads";

const mock = new MockAdapter(axios);

describe("thing", () => {
  it("should make a thing query with all params with results and transform them", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse">
            <item type="boardgame" id="410201">
                <thumbnail>https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__thumb/img/Ic3yRKTjVe26RgDzIdLsKn8Hztk=/fit-in/200x150/filters:strip_icc()/pic7947338.png</thumbnail>
                <image>https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__original/img/MW6S23AwpGGu0Rx05X_aByK0lmA=/0x0/filters:format(png)/pic7947338.png</image>
                <name type="primary" sortindex="1" value="Wyrmspan" />
                <name type="alternate" sortindex="1" value="Na křídlech draků" />
                <name type="alternate" sortindex="1" value="Na skrzydłach smoków" />
                <name type="alternate" sortindex="1" value="Schwingenschlag" />
                <name type="alternate" sortindex="1" value="Змієвир" />
                <name type="alternate" sortindex="1" value="龍翼翱翔" />
                <description>You are an amateur dracologist in the world of Wyrmspan, a place where dragons of all shapes, sizes, and colors roam the skies. Excavate a hidden labyrinth you recently unearthed on your land and entice these beautiful creatures to roost in the sanctuary of your caves.&amp;#10;&amp;#10;During a game of Wyrmspan, you will build a sanctuary for dragons of all shapes and sizes. Your sanctuary begins with 3 excavated spaces&amp;mdash;the leftmost space in your Crimson Cavern, your Golden Grotto, and your Amethyst Abyss. Over the course of the game, you will excavate additional spaces in your sanctuary and entice dragons to live there, chaining together powerful abilities and earning the favor of the Dragon Guild.&amp;#10;&amp;#10;Wyrmspan is inspired by the mechanisms of Wingspan, though its unique elements make Wyrmspan a standalone game (not compatible with Wingspan).&amp;#10;&amp;#10;&amp;mdash;description from the publisher&amp;#10;&amp;#10;</description>
                <yearpublished value="2024" />
                <minplayers value="1" />
                <maxplayers value="5" />
                <poll name="suggested_numplayers" title="User Suggested Number of Players" totalvotes="99">
                    <results numplayers="1">
                        <result value="Best" numvotes="2" />
                        <result value="Recommended" numvotes="50" />
                        <result value="Not Recommended" numvotes="8" />
                    </results>
                    <results numplayers="2">
                        <result value="Best" numvotes="29" />
                        <result value="Recommended" numvotes="51" />
                        <result value="Not Recommended" numvotes="2" />
                    </results>
                    <results numplayers="3">
                        <result value="Best" numvotes="45" />
                        <result value="Recommended" numvotes="31" />
                        <result value="Not Recommended" numvotes="2" />
                    </results>
                    <results numplayers="4">
                        <result value="Best" numvotes="18" />
                        <result value="Recommended" numvotes="31" />
                        <result value="Not Recommended" numvotes="23" />
                    </results>
                    <results numplayers="5">
                        <result value="Best" numvotes="1" />
                        <result value="Recommended" numvotes="16" />
                        <result value="Not Recommended" numvotes="52" />
                    </results>
                    <results numplayers="5+">
                        <result value="Best" numvotes="0" />
                        <result value="Recommended" numvotes="1" />
                        <result value="Not Recommended" numvotes="45" />
                    </results>
                </poll>
                <playingtime value="90" />
                <minplaytime value="90" />
                <maxplaytime value="90" />
                <minage value="14" />
                <poll name="suggested_playerage" title="User Suggested Player Age" totalvotes="20">
                    <results>
                        <result value="2" numvotes="0" />
                        <result value="3" numvotes="0" />
                        <result value="4" numvotes="0" />
                        <result value="5" numvotes="0" />
                        <result value="6" numvotes="0" />
                        <result value="8" numvotes="1" />
                        <result value="10" numvotes="7" />
                        <result value="12" numvotes="8" />
                        <result value="14" numvotes="4" />
                        <result value="16" numvotes="0" />
                        <result value="18" numvotes="0" />
                        <result value="21 and up" numvotes="0" />
                    </results>
                </poll>
                <poll name="language_dependence" title="Language Dependence" totalvotes="3">
                    <results>
                        <result level="1" value="No necessary in-game text" numvotes="0" />
                        <result level="2" value="Some necessary text - easily memorized or small crib sheet" numvotes="1" />
                        <result level="3" value="Moderate in-game text - needs crib sheet or paste ups" numvotes="1" />
                        <result level="4" value="Extensive use of text - massive conversion needed to be playable" numvotes="1" />
                        <result level="5" value="Unplayable in another language" numvotes="0" />
                    </results>
                </poll>
                <link type="boardgamecategory" id="1002" value="Card Game" />
                <link type="boardgamecategory" id="1010" value="Fantasy" />
                <link type="boardgamemechanic" id="2875" value="End Game Bonuses" />
                <link type="boardgamemechanic" id="2040" value="Hand Management" />
                <link type="boardgamemechanic" id="2846" value="Once-Per-Game Abilities" />
                <link type="boardgamemechanic" id="2041" value="Open Drafting" />
                <link type="boardgamemechanic" id="2819" value="Solo / Solitaire Game" />
                <link type="boardgamemechanic" id="2939" value="Track Movement" />
                <link type="boardgamemechanic" id="2828" value="Turn Order: Progressive" />
                <link type="boardgamefamily" id="77906" value="Category: Dized Tutorial" />
                <link type="boardgamefamily" id="7005" value="Creatures: Dragons" />
                <link type="boardgamefamily" id="70948" value="Digital Implementations: Tabletopia" />
                <link type="boardgamefamily" id="58267" value="Game: Wingspan" />
                <link type="boardgamefamily" id="27646" value="Mechanism: Tableau Building" />
                <link type="boardgamefamily" id="78680" value="Misc: Made by Panda" />
                <link type="boardgamefamily" id="72487" value="Organizations: Automa Factory" />
                <link type="boardgamefamily" id="5666" value="Players: Games with Solitaire Rules" />
                <link type="boardgameaccessory" id="405113" value="Wingspan: Golden Eggs" />
                <link type="boardgameaccessory" id="420295" value="Wyrmspan: GGG Insert/Organizer" />
                <link type="boardgameaccessory" id="418055" value="Wyrmspan: Laserox Organizer" />
                <link type="boardgameaccessory" id="413520" value="Wyrmspan: Natural Rubber Playmat" />
                <link type="boardgameaccessory" id="413510" value="Wyrmspan: Upgrade Pack" />
                <link type="boardgameimplementation" id="266192" value="Wingspan" inbound="true"/>
                <link type="boardgamedesigner" id="155573" value="Connie Vogelmann" />
                <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                <link type="boardgamepublisher" id="267" value="999 Games" />
                <link type="boardgamepublisher" id="6194" value="Delta Vision Publishing" />
                <link type="boardgamepublisher" id="40415" value="Divercentro" />
                <link type="boardgamepublisher" id="22380" value="Feuerland Spiele" />
                <link type="boardgamepublisher" id="4785" value="Ghenos Games" />
                <link type="boardgamepublisher" id="42325" value="Grok Games" />
                <link type="boardgamepublisher" id="30677" value="Maldito Games" />
                <link type="boardgamepublisher" id="5400" value="Matagot" />
                <link type="boardgamepublisher" id="7992" value="MINDOK" />
                <link type="boardgamepublisher" id="32395" value="NeoTroy Games" />
                <link type="boardgamepublisher" id="7466" value="Rebel Sp. z o.o." />
                <link type="boardgamepublisher" id="36763" value="Surfin' Meeple China" />
                <link type="boardgamepublisher" id="44209" value="Ігромаг" />
                <videos total="146">
                    <video id="495572" title="If games could talk - Wyrmspan edition " category="humor" language="English" link="http://www.youtube.com/watch?v=M55QtLzzsVY" username="ghosthack" userid="163019" postdate="2024-05-15T16:46:04-05:00" />
                    <video id="495205" title="The Discriminating Gamer: Wyrmspan" category="review" language="English" link="http://www.youtube.com/watch?v=Hlh-Xki77qM" username="discriminatingGamer" userid="806048" postdate="2024-05-13T17:16:21-05:00" />
                    <video id="494979" title="Wyrmspan  (italiano) // MURASAKI NIGHTS IMPRESSIONI" category="other" language="Italian" link="http://www.youtube.com/watch?v=QIUDPDQB5nI" username="Laddiobolocko" userid="3025983" postdate="2024-05-12T10:07:34-05:00" />
                    <video id="494848" title="Review de WYRMSPAN en español" category="review" language="Spanish" link="http://www.youtube.com/watch?v=ezBsC76aaXc" username="Luisjoey" userid="169069" postdate="2024-05-11T08:47:14-05:00" />
                    <video id="494719" title="Je vous explique WYRMSPAN en 10 minutes!" category="instructional" language="French" link="http://www.youtube.com/watch?v=aQx6B7mjiV4" username="NoiramB" userid="2801510" postdate="2024-05-10T09:46:53-05:00" />
                    <video id="494433" title="Schwingenschlag - Regeln und Meinung - Brettspiel Teddy" category="review" language="German" link="http://www.youtube.com/watch?v=HHw0eNEboRc" username="BrettSpielTeddy" userid="2423700" postdate="2024-05-08T12:20:47-05:00" />
                    <video id="494423" title="Unboxing w/3D components" category="unboxing" language="Portuguese" link="http://www.youtube.com/watch?v=PDdooP0lnHI" username="sesifredo" userid="527761" postdate="2024-05-08T11:30:00-05:00" />
                    <video id="494142" title="Wyrmspan Board Game Gameplay | Board Game In A Minute #shorts" category="other" language="English" link="http://www.youtube.com/watch?v=iPxs9AuO0D4" username="jourdo" userid="926699" postdate="2024-05-07T01:00:57-05:00" />
                    <video id="494029" title="Wyrmspan - Reseña &amp; Opinión - ¿De que Va? - ¿MERECE LA PENA?" category="review" language="Spanish" link="http://www.youtube.com/watch?v=fz2ST8fSH4A" username="zakak" userid="2276178" postdate="2024-05-06T03:16:05-05:00" />
                    <video id="493937" title="Wyrmspan  (italiano) // MURASAKI NIGHTS GAMEPLAY" category="session" language="Italian" link="http://www.youtube.com/watch?v=bmB-L2qP644" username="Laddiobolocko" userid="3025983" postdate="2024-05-05T10:07:22-05:00" />
                    <video id="493928" title="Playthrough (Live) | Wyrmspan" category="session" language="English" link="http://www.youtube.com/watch?v=6OI7D91UDM0" username="Sir_Thecos" userid="2032101" postdate="2024-05-05T09:01:48-05:00" />
                    <video id="493682" title="Правила игры, подготовка и летсплей от канала The Meeples" category="session" language="Russian" link="http://www.youtube.com/watch?v=RZ_EagQ7d1E" username="Hint666" userid="3512570" postdate="2024-05-03T10:29:04-05:00" />
                    <video id="493629" title="Opinando sobre WYRMSPAN" category="review" language="Spanish" link="http://www.youtube.com/watch?v=PZVaBqdUK9s" username="rikardus66" userid="2802133" postdate="2024-05-03T00:12:45-05:00" />
                    <video id="493458" title="Jugando Wyrmspan Español Latino" category="session" language="Spanish" link="http://www.youtube.com/watch?v=TgZqBe_LJrI" username="santosreviews" userid="3542758" postdate="2024-05-01T22:21:35-05:00" />
                    <video id="493447" title="Schwingenschlag einfach erklärt: Bereit für Drachenabenteuer? [Regelerklärung - Aufbau - Anleitung]" category="instructional" language="German" link="http://www.youtube.com/watch?v=ANRc8KMPJtU" username="brettspiele_erklaert" userid="3269323" postdate="2024-05-01T17:34:37-05:00" />
                </videos>
                <versions>
                    <item type="boardgameversion" id="696497">
                        <thumbnail>https://cf.geekdo-images.com/iOQM0RTgyN8xwAZ88ylTQw__thumb/img/i9N83I3YReCUNlUPpuI7dhMViKk=/fit-in/200x150/filters:strip_icc()/pic7949049.jpg</thumbnail>
                        <image>https://cf.geekdo-images.com/iOQM0RTgyN8xwAZ88ylTQw__original/img/6T0UkAxLHTKcmSSv04MpIYoK7Qw=/0x0/filters:format(jpeg)/pic7949049.jpg</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Czech edition" />
                        <link type="boardgamepublisher" id="7992" value="MINDOK" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2180" value="Czech" />
                    </item>
                    <item type="boardgameversion" id="696660">
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Divercentro Portuguese edition" />
                        <link type="boardgamepublisher" id="40415" value="Divercentro" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2200" value="Portuguese" />
                    </item>
                    <item type="boardgameversion" id="700555">
                        <thumbnail>https://cf.geekdo-images.com/6wle3E2Mtoa1oYpr_K_4BA__thumb/img/pF4gX436dDGDY3wM33GGiMA7V88=/fit-in/200x150/filters:strip_icc()/pic8003102.png</thumbnail>
                        <image>https://cf.geekdo-images.com/6wle3E2Mtoa1oYpr_K_4BA__original/img/XZPMcWg3cUV6qWF0KW4KX4wLDAo=/0x0/filters:format(png)/pic8003102.png</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Dutch edition" />
                        <link type="boardgamepublisher" id="267" value="999 Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="999-WYR01" />
                        <width value="11.6535" />
                        <length value="11.6535" />
                        <depth value="2.75591" />
                        <weight value="5.29109" />
                        <link type="language" id="2183" value="Dutch" />
                    </item>
                    <item type="boardgameversion" id="695503">
                        <thumbnail>https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__thumb/img/Ic3yRKTjVe26RgDzIdLsKn8Hztk=/fit-in/200x150/filters:strip_icc()/pic7947338.png</thumbnail>
                        <image>https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__original/img/MW6S23AwpGGu0Rx05X_aByK0lmA=/0x0/filters:format(png)/pic7947338.png</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="English edition" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="11.811" />
                        <length value="11.811" />
                        <depth value="2.75591" />
                        <weight value="5.73202" />
                        <link type="language" id="2184" value="English" />
                    </item>
                    <item type="boardgameversion" id="696837">
                        <thumbnail>https://cf.geekdo-images.com/JQgGNPezVapdKdq9Ms4yXQ__thumb/img/ULB_yGr_fGJ4CzKSQhL0VECamLs=/fit-in/200x150/filters:strip_icc()/pic7949112.jpg</thumbnail>
                        <image>https://cf.geekdo-images.com/JQgGNPezVapdKdq9Ms4yXQ__original/img/mf14BhYG182OnZ0SBYKME5-vGUM=/0x0/filters:format(jpeg)/pic7949112.jpg</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="French edition" />
                        <link type="boardgamepublisher" id="5400" value="Matagot" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="11.811" />
                        <length value="11.811" />
                        <depth value="2.75591" />
                        <weight value="5.73202" />
                        <link type="language" id="2187" value="French" />
                    </item>
                    <item type="boardgameversion" id="696483">
                        <thumbnail>https://cf.geekdo-images.com/ZELlvZGaXAaj4RClTGDEZQ__thumb/img/ERfrYUl4fe8JLtcUrzfnNkF6Mlw=/fit-in/200x150/filters:strip_icc()/pic7987176.png</thumbnail>
                        <image>https://cf.geekdo-images.com/ZELlvZGaXAaj4RClTGDEZQ__original/img/7DO3I-E9jMxPIruDh50W_n7MWeQ=/0x0/filters:format(png)/pic7987176.png</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="German edition" />
                        <link type="boardgamepublisher" id="22380" value="Feuerland Spiele" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="11.6535" />
                        <length value="11.6535" />
                        <depth value="2.91339" />
                        <weight value="5.52919" />
                        <link type="language" id="2188" value="German" />
                    </item>
                    <item type="boardgameversion" id="696477">
                        <thumbnail>https://cf.geekdo-images.com/ObHIyXUns_cZ6Il9qgBt3Q__thumb/img/sBS-hPh9_p09LxnFqa58ygTwoes=/fit-in/200x150/filters:strip_icc()/pic7956134.png</thumbnail>
                        <image>https://cf.geekdo-images.com/ObHIyXUns_cZ6Il9qgBt3Q__original/img/rkH5XGI9KkLytA5khixT5p-UgnQ=/0x0/filters:format(png)/pic7956134.png</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Grok Games Portuguese edition" />
                        <link type="boardgamepublisher" id="42325" value="Grok Games" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="11.811" />
                        <length value="11.811" />
                        <depth value="2.75591" />
                        <weight value="5.73202" />
                        <link type="language" id="2200" value="Portuguese" />
                    </item>
                    <item type="boardgameversion" id="704654">
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Hungarian edition" />
                        <link type="boardgamepublisher" id="6194" value="Delta Vision Publishing" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2191" value="Hungarian" />
                    </item>
                    <item type="boardgameversion" id="710629">
                        <thumbnail>https://cf.geekdo-images.com/XUAg84b9BeTpSdWWLCTFAQ__thumb/img/nVwafnhIICMJS-r-Ob0YworuQ7U=/fit-in/200x150/filters:strip_icc()/pic8143320.png</thumbnail>
                        <image>https://cf.geekdo-images.com/XUAg84b9BeTpSdWWLCTFAQ__original/img/zZBkMLWVLEfwM6lwpUyDITOwmyQ=/0x0/filters:format(png)/pic8143320.png</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Italian edition" />
                        <link type="boardgamepublisher" id="4785" value="Ghenos Games" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="GHE273" />
                        <width value="11.811" />
                        <length value="11.811" />
                        <depth value="2.75591" />
                        <weight value="0" />
                        <link type="language" id="2193" value="Italian" />
                    </item>
                    <item type="boardgameversion" id="697463">
                        <thumbnail>https://cf.geekdo-images.com/YGQztBQ_VJDLH795cY6iVA__thumb/img/qx3ponos5ySPrd1NraOn4eyu6hg=/fit-in/200x150/filters:strip_icc()/pic7960111.jpg</thumbnail>
                        <image>https://cf.geekdo-images.com/YGQztBQ_VJDLH795cY6iVA__original/img/XF6xlrQIUJICkKgahCfsft7n7IE=/0x0/filters:format(jpeg)/pic7960111.jpg</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Polish edition" />
                        <link type="boardgamepublisher" id="7466" value="Rebel Sp. z o.o." />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgameartist" id="131233" value="Clémentine Campardou" />
                        <yearpublished value="2024" />
                        <productcode value="STM850" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2199" value="Polish" />
                    </item>
                    <item type="boardgameversion" id="697767">
                        <thumbnail>https://cf.geekdo-images.com/B3SjMAXcJevAxhsT6V_vmw__thumb/img/sBVn4XHr0Jz0MKnuaHtRwVVFt3M=/fit-in/200x150/filters:strip_icc()/pic7963789.jpg</thumbnail>
                        <image>https://cf.geekdo-images.com/B3SjMAXcJevAxhsT6V_vmw__original/img/Q71bmVvyHSSR7zuf2sN6u7y5mxY=/0x0/filters:format(jpeg)/pic7963789.jpg</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Spanish edition" />
                        <link type="boardgamepublisher" id="30677" value="Maldito Games" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2203" value="Spanish" />
                    </item>
                    <item type="boardgameversion" id="710366">
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Traditional Chinese edition" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgamepublisher" id="36763" value="Surfin' Meeple China" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2181" value="Chinese" />
                    </item>
                    <item type="boardgameversion" id="710694">
                        <thumbnail>https://cf.geekdo-images.com/P6O3YYlr1mQ9ZW7N_EgE6Q__thumb/img/k4f-LBYqYgHBrVj66d12CZQTN-8=/fit-in/200x150/filters:strip_icc()/pic8147529.jpg</thumbnail>
                        <image>https://cf.geekdo-images.com/P6O3YYlr1mQ9ZW7N_EgE6Q__original/img/XLKvYVTkCWoAdh7WOCtRYXspNl0=/0x0/filters:format(jpeg)/pic8147529.jpg</image>
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Turkish edition" />
                        <link type="boardgamepublisher" id="32395" value="NeoTroy Games" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="11.811" />
                        <length value="11.811" />
                        <depth value="2.75591" />
                        <weight value="0" />
                        <link type="language" id="2349" value="Turkish" />
                    </item>
                    <item type="boardgameversion" id="702728">
                        <link type="boardgameversion" id="410201" value="Wyrmspan" inbound="true"/>
                        <name type="primary" sortindex="1" value="Ukrainian edition" />
                        <link type="boardgamepublisher" id="23202" value="Stonemaier Games" />
                        <link type="boardgamepublisher" id="44209" value="Ігромаг" />
                        <yearpublished value="2024" />
                        <productcode value="" />
                        <width value="0" />
                        <length value="0" />
                        <depth value="0" />
                        <weight value="0" />
                        <link type="language" id="2665" value="Ukrainian" />
                    </item>
                </versions>
                <comments page="1" totalitems="721">
                    <comment username="1arska" rating="8" value="Great successor for Wingspan that keeps it&apos;s good line action mechanics (cave exploring in Wyrmspan). I really like the way how benefits matters in this game. Especially guild is great addition. Basic card game problems still exist and you might have to be lucky to gain specific cards. But man, I&apos;m hungry to play more with dragons!" />
                    <comment username="1QUrsu" rating="8.6" value="It&apos;s a bit low interaction and it feels a bit on the lucky side if you get the correct pieces to start into the game properly.
        
        Played 4 matches so far with 2 players. The game is gorgeous, the material even without the premium upgrade is great. With a little bit more interaction and reduction of slow starts (refilling the open cards instantly could help, so people would have more options to pick instead of blind picking a lot). I&apos;m sure there was a design decision there to only refill at the end of a round, I just don&apos;t necessarily agree.
        
        Overall a very good game that should be a staple for everyone who can&apos;t get into the bird theme of wingspan." />
                    <comment username="8janek8" rating="N/A" value="3T" />
                    <comment username="aburdiss" rating="9" value="A bit more “thinky” than wingspan, but similar enough if you’ve played it. It’s got a lot of differences that make the experience great overall, but I still like wingspan a bit more (and wingspan Asia!)" />
                    <comment username="Ace_of_Diamonds" rating="9" value="I felt this improved upon wingspan which is a good game to begin with. I felt the engine building come through more with this version. We also saw some big turns chaining a bunch of actions together." />
                    <comment username="Achire" rating="7" value="Played twice at Tantrumcon. First time - table hated it. Second time - table loved it. First - definitely better at smaller player counts and if you hated Wingspan, you&apos;re not going to like it. The really great stuff about Wyrmspan is: (1) all resources are always available (2) shorter downtime (but not short enough to allow for high player counts (3) guilds are super-exciting and do add a bit of interaction (4) caves a fantastic twist. The theming, however, is much weaker in this one, which is going to make it harder to teach to people who&apos;ve never played wingspan. Meat-eaters go on top, gold-hoarders in the middle, and crystal-hoarder on the bottom just doesn&apos;t feel as intuitive as &quot;pelicans eat fish and go in water.&quot; I also don&apos;t know if the hatchlings really feel worthwhile... I&apos;d have to play more to see how I feel about them. So overall, mixed feelings - I enjoyed it and I think more mechanically-inclined people will prefer it over Wingspan, while people who like thematic integration &amp; appreciate ease of teaching will like it a lot less. Also, some people just like the excitement of rolling dice." />
                    <comment username="acolyte" rating="8" value="Liked it better than Wingspan. Combos and engines felt a little more satisfying. Tho, I wish it didn’t have the rondel. That felt like an expansion, and one thing too many. This game without that would be perfect." />
                    <comment username="adamredwoods" rating="N/A" value="It looks like an improved version of Wingspan. try before buy." />
                    <comment username="Addboilingwater" rating="N/A" value="Engine Builder Medium Strategy (4)
        Based On Wingspan, Adding &amp; Adapting New Content. More Involvement &amp; Theme, Adding Complexity. " />
                    <comment username="Addiction2k" rating="8" value="I have to admit I like this better than Wingspan, but not so much better that I need to own both of them and not so much better that I&apos;d get rid of Wingspan (which my family really likes)." />
                    <comment username="adel9591" rating="7" value="It might be slightly better than Wingspan, as it&apos;s a little tighter and has action economy. I dislike the different sized cards and the theme does nothing for me so overall same rating as Wingspan." />
                    <comment username="Adwak1" rating="8" value="Played twice at TantrumCon in Charlotte 2024" />
                    <comment username="Aegir2122" rating="5" value="I don&apos;t love Wingspan, but I enjoy it sometimes. I don&apos;t love Wymspan and I didn&apos;t enjoy playing it. There&apos;s even less player interaction than Wingspan, namely zero except checking other players&apos; victory conditions (And the very occasional cave feature that lets other players do something, we only had two or three in my playthrough), and the Explore action is slower than any of the actions in Wingspan, so you spend a LOT of time just waiting for your turn to come around with nothing interesting to watch/do. Prepping a cave before playing a dragon doesn&apos;t add anything to the game, it just slows your action economy down because now you have double the base actions you have to do before you can place a dragon. (Explore for a cave, excavate, explore for a dragon, entice, and that assumes you already have the resources to entice). Finding ways to work around that is certainly part of the game and I love engine builders, but it doesn&apos;t feel fulfilling here, it&apos;s like they took the engine builder and removed pieces to force you to &apos;fix&apos; it first before you could enjoy the engine builder part. Removing the dice was nice, but the system instead is that you get whatever resources you want, making the different resources entirely pointless. It wouldn&apos;t change the game very much if you just merged all the resources into one. I never felt like I had any trouble getting all the resources I needed. The guild initially seemed like a cool feature, but the rewards felt fairly lackluster most of the time, so it ended up being an &quot;Oh yea and I move up on the guild and get an egg&quot; kind of moment.
        
        Overall just seems like someone took Wingspan and tried to change it for the sake of changing it instead of having a vision of something they wanted to make. I&apos;m sure die-hard Wingspan lovers will love this as well, as it&apos;s basically Wingspan but different, but I don&apos;t see the appeal." />
                    <comment username="afrozenpeach" rating="10" value="My new favorite resource in any game ever. Amethyst crystals. Amazing. I need to upgrade my copy with actual crystals." />
                    <comment username="Againsto" rating="5" value="What fresh hell is this?
        Glad I played this, and I might try a 2p game, but never again with four." />
                    <comment username="agguru" rating="N/A" value="5 player mats and deluxe components
        " />
                    <comment username="agutmann2530" rating="N/A" value="1p" />
                    <comment username="ajie426" rating="7" value="玩法：
        每轮补充6个行动力，把行动力用来自己的回合就结束了。行动力可以用于1、挖掘（挖龙洞，有洞的地方才能给龙住）；2、引导（打出龙卡，住到龙洞里）；3、探索（选择一个洞穴，让冒险家从左到右获得资源）。
        超主观点评：
        1、游戏流程很顺畅，每张卡上面的文字描述也简单清晰。
        2、画风可可爱爱，combo和展翅翱翔一样很爽。
        3、但是非要和鸟比较的话，我还是喜欢鸟多点，鸟带点科普性质，可以阖家欢，龙变成了魔幻背景，受众小了很多。而且这个玩一局的时间比鸟长。感觉2-3人好玩点。" />
                    <comment username="AL3XK4" rating="1" value="worst game ever " />
                    <comment username="alohawild" rating="9" value="Purchased at Barnes and Noble and add-on materials at Puddles Games and Puzzles" />
                    <comment username="AmassGames" rating="N/A" value="https://youtu.be/sDVRxthjrZA" />
                    <comment username="andykim88" rating="N/A" value="Sleeved (Arcane Tinmen &amp; MTL)" />
                    <comment username="Angela888Alpes" rating="10" value="MIPL 8100" />
                    <comment username="Anicka" rating="10" value="2 maty gracza, upgraded resources" />
                    <comment username="anim8r" rating="9" value="Sure, Wingspan &amp; Wrymspan are different games, but are they, really? If I had a few thousand games, I could own both, but if I have 50 games, I ain&apos;t gonna keep both as no way would I say after a play of Wingspan, &quot;Let&apos;s play something different...how about Wyrmspan?&quot; So, I feel most will want to choose, and I would choose this. Mainly cause I like dragons more than birds and I prefer the lack of dice for resources. A few more smaller changes make the game feel like a stronger iteration of Wingspan. 
        Pain points: There is an attempt to bring in some player interaction, but it is minimal at best. The randomness of luck-of-draw is still a thing if that what puts you off about Wingspan, Ark Nova etc (I don&apos;t mind it too much as I feel the distribution is relatively well balanced and you should walk into such games ready to pivot)
        
        My detailed ratings on this &amp; more:
        https://boardgamegeek.com/blogpost/158398/new-me-february-2024" />
                    <comment username="Animepops" rating="10" value="Played at Tokencon 24. Instant favorite and can&apos;t wait to own a copy. Excellent production. It is not just a simple re-skin!" />
                    <comment username="Annabel_Lee" rating="N/A" value="Spielbound pre-order, $60, not paid" />
                    <comment username="AnneliesP" rating="N/A" value="SOS" />
                    <comment username="apaneto28" rating="8" value="Played it an early access copy at a local con. It feels like “wingspan plus”, it changes and adds enough wrinkles to the core gameplay loop that are enjoyable and interesting. I specifically enjoy the variable number of action tokens, the rondel of resources, and the cave then dragon ? build order. It’s a solid game and I can see it having staying power alongside wingspan. However, I would not start with this version with new gamers due to the added layer of complexities." />
                    <comment username="apokai" rating="8" value="Way better than Winspan. Dragons!!" />
                    <comment username="Applin_Sauce" rating="8" value="Definitely need more plays. I really like the mechanics of the game, but I&apos;m also a huge Wingspan fan. However... I&apos;m really not sure I enjoy the action resource (coins) in this game. I really like Wingspan for the limitation it gives everyone, where everyone has an equal number of turns. I also would really like some personal objective cards (or bonus cards), like Wingspan. 
        
        I also dislike the card design (the graphic design). Some of the art is also meh. Once I heard that the original plan was for dinosaurs - I think that just made so much more sense than this final product. 
        
        Despite all of my negative comments, the game overall is good. It has the same essence of Wingspan, same feel of some combos and plays. But I felt like a lot of cards were similar to one another. Needs more plays,." />
                    <comment username="APunktX" rating="10" value="Wingspan but better in every aspect - Solid 10 for me." />
                    <comment username="Aranxv" rating="5" value="it&apos;s only a business move." />
                    <comment username="Aredan1528" rating="8.5" value="Basically if you like Wingspan I can&apos;t see anyone liking this one less it&apos;s either even or slightly better." />
                    <comment username="argonne" rating="10" value="Mode solo exclusivement et c’est réussi, le livre de dragon fourni avec est vraiment un must. Le matériel est incroyable. Super bon gameplay en solo j’adore. Un jeu avec une longue vie…" />
                    <comment username="ArianneH" rating="N/A" value="New in Shrink -- accidentally purchased 2" />
                    <comment username="arildoaim" rating="4" value="Still multiplayer solitaire" />
                    <comment username="Arkeo" rating="8.5" value="Alphaspel" />
                    <comment username="ArkhamHorrorFan" rating="9.5" value="With it&apos;s beautiful artwork and light gameplay, it plays smooth like a dragon gliding over a marvelous landscape." />
                    <comment username="arlettebuss" rating="N/A" value="Sleeved" />
                    <comment username="armigero" rating="N/A" value="game summary complete" />
                    <comment username="arnaud4matagot" rating="9" value="Played for real and the game is really good and very enjoyable." />
                    <comment username="ashurbanipal12" rating="N/A" value="includes upgraded components and 2 rubber player mats" />
                    <comment username="astronaut_nz" rating="8" value="Fun twist on Wingspan. The new mechanics are fun." />
                    <comment username="avasue" rating="N/A" value="1/31/24 purchased " />
                    <comment username="AxeVince" rating="N/A" value="Aurélie OK" />
                    <comment username="Aysix" rating="10" value="I love wingspan and was worried that this would be too much of the same. But it is not. Definitely inspired by wingspan, but it is its own game and I can happily have both in my collection. Artwork is of course stunning. The theme, the hatchlings, the caves and the &quot;go for walkies&quot; mechanism means that this will hit my table more often than wingspan." />
                    <comment username="Azimmer" rating="N/A" value="YLGS" />
                    <comment username="B3rthold" rating="6.8" value="+ artwork und material
        + anspruchsvoll aber nicht komplex
        + einfache Regeln, &quot;kurze&quot; Spieldauer
        - Langzeitspielspaß fraglich" />
                    <comment username="BambooShoot" rating="N/A" value="1–5" />
                    <comment username="BananaGus" rating="8" value="As much as I enjoy Wingspan, I like the refreshing changes and untethering from real world aviary here. A lot of creativity can happen when you can make up mystical worlds rather than having to focus on accurately depicting elements of the real world. 
        
        A nice riff on the Wingspan style game. Well done." />
                    <comment username="BastardCafe" rating="N/A" value="2 New" />
                    <comment username="batcut" rating="N/A" value="Solo." />
                    <comment username="Bateyes" rating="N/A" value="Ich habe:
        - Basisspiel.
        - Upgrade-Pack (Holzkomponenten &amp; Metallmünzen) (VORBESTELLT BEIM STONEMAIER EUROPE SHOP) (Addon).
        
        Es fehlt noch:
        - 5 Playmats, welche die Playerboards ersetzen (BEI FEUERLAND FRAGEN!) (Addon)." />
                    <comment username="baurfamily" rating="8" value="I really enjoy this game, played it a few times and enjoyed them all. For some reason I can’t put my finger on, I probably won’t buy my own copy. I already own Wingspan (a slightly lighter weight game) and Raising Robots (a heavier weight game) and so this is in an awkward spot between the two. If I didn’t own one or the others of this this would be a definite purchase for me." />
                    <comment username="Bayley505" rating="10" value="Bought it because I enjoyed Wingspan.
        Incredibly fun, great for small groups 2-3 players!" />
                    <comment username="bbritt33" rating="8.5" value="I wouldn&apos;t call this reskinned Wingspan. They definitely exist in the same mechanical tree, but Wyrmspan offers new mechanics, deeper competitiveness, and juicier combos. Overall a great game that I could see enjoying for a long time to come. 
        
        That said, Wyrmspan and Wingspan can exist on the same shelf. Wingspan still occupies that &quot;game for after a long day of work,&quot; where Wyrmspan occupies somewhere more cerebral. " />
                    <comment username="bcnevan" rating="6" value="Mechanically, this iteration is much stronger than Wingspan. Everything gameplay-related feels a bit richer, from the decision space, to the tableau building, and the like. The guild space races add a neat bit of interactive tension to the experience. I especially don&apos;t miss the bird house and the resource mechanism of Wingspan. About the only thing this game lacks, in comparison to its predecessor, is the amusing nature of Wingspan&apos;s connection of bird powers to their real world counterparts. There are clear archetypes to the creatures in Wyrmspan, but the fantastical nature of dragons, wyrms, etc., doesn&apos;t quite hit the same spot.
        
        All that said, this is still Wingspan at its core. Those turned off completely by Wingspan, won&apos;t be convinced by this iteration. Those that found some positives in Wingspan, but found it mechanically weak, may have success here. I&apos;m more in that latter camp than the former. At higher player counts, the game still drags. But that&apos;s the nature of this sort of game. Add players, add chunks of play time. For that reason, I&apos;m likely only to play this at 3P or under.
        
        The game, however, does seem to heavily incentivize, and reward, the player that first manages to build out a row completely. They can start spamming that row&apos;s engine earlier, which gains them pretty clear advantages. There are some engine-types that can overcome someone who first finishes a lane, but they don&apos;t show up every game. That does push me away from the game a bit and diminishes my interest in playing it with new-ish players." />
                    <comment username="BeccaKaye6891" rating="N/A" value="5 Player" />
                    <comment username="bestea" rating="3" value="Not worth to buy if You got Wingspan. Art/design is worse." />
                    <comment username="Betbet" rating="8" value="Jeu super, mais seulement déçu par le niveau pitoyable de rangement offert dans la boîte de jeu. Une fois les cartes dans des sleeves, les tonnes de ressources et cartes se promènent dans la boîte. Faire attention quand ont l&apos;ouvre et c&apos;est si seulement elle ferme." />
                    <comment username="Bevr" rating="7" value="Played this game once. This game has fun elements to it, but it&apos;s fairly flawed. I would never give this game a 10 due to those flaws. 
        
        If you dislike games with low player interaction you will deeply dislike this game. Several actions in this game grant you extra turns and managing to minmax this can allow you to play by yourself. You can also manage to &apos;softlock&apos; yourself, making it so entire rounds of the game must be skipped. Clearly the devs realized this, but didn&apos;t think to rework the game&apos;s core system. It leads to zero player interaction sometimes. I disagree with people who compare games like Wingspan to solitaire, but this game is giving that argument credit.
        
        It&apos;s possible that I played this game incorrectly. It&apos;s hard to believe that this game could have so many weird quirks and flaws. Wingspan is much tighter game even with it&apos;s flaws. This game is good and fun, but it&apos;s unfortunately part of a franchise so it&apos;s impossible to not draw comparison to the better game." />
                    <comment username="Big Bad Lex" rating="3" value="Because the board gaming world really needs a reskin of a Frankenstein monster of a stitched together mongrel without a single original idea." />
                    <comment username="Bigf00t159" rating="7" value="Played." />
                    <comment username="bigguglie" rating="N/A" value="Hold: Miniature Market" />
                    <comment username="bjdmx1" rating="10" value="I love this game! I&apos;ve played it 2x and feel I&apos;m going to like this game more than Wingspan. I bought the mats and deluxe resources. Everything was well done and I really enjoy the coins. The artwork is gorgeous, I liked the subtle nods to other famous  dragons. My group who played the with me also all loved the game. We all liked the changes from Wingspan and felt they were meaningful and well balanced. I was nervous this was gonna just be a reskin but ther are meaningful differences." />
                    <comment username="blackdani" rating="10" value="Just doing my part to troll the 1s" />
                    <comment username="Blee087" rating="8" value="Sleeved" />
                    <comment username="blondebunbun" rating="N/A" value="Need to try" />
                    <comment username="BlueRoninRob" rating="9" value="I prefer the real-world subject of Wingspan over the fantastical nature of dragons that is the basis for Wyrmspan.  Set that aside and it seems like Wyrmspan is an improvement on Wingspan in almost every area.
        
        I do kind of miss Wingspans bonus cards that would give each player different objectives.  Now you just have the end-of-round goals and the dragon guild, which are all public information.
        
        In Wingspan I could sometimes feel like the dice just weren&apos;t working in my favor.  No dice here in Wyrmspan.  The card draw is really the only luck element you need to deal with.  Now when I end up low on resources, I know that the only one to blame is me.  Rounds don&apos;t get shorter as you build your engine.
        
        There are many options for squeezing out just one more point at the endgame, including passing and ending your round early.  Practically everything you have at the end of the game contributes to your score so while you will almost certainly feel like you didn&apos;t optimize everything, you won&apos;t feel like you&apos;re being punished for having more resources, dragons, or caves than you could use.
        
        This one will definitely hit the table again." />
                    <comment username="bluesol" rating="5" value="Did not enjoy this nearly as much as Wingspan. Felt like they added even more luck with more random card markets" />
                    <comment username="bneffer" rating="8" value="I enjoyed this more than Wingspan. The theme, the art, the additional mechanisms on the side boards - I liked it all more. THe only thing missing was the realism, but fantasy and dragons are a theme I don&apos;t seem to get tired of." />
                    <comment username="bnordeng" rating="7" value="Wyrmpan is a lot like Wingspan but with dragons. I&apos;ve only played Wingspan once but don&apos;t know enough about it to make a reasonable comparison. Wyrmspan is fine and also a engine-building game where there isn&apos;t a whole lot of interaction.  Interesting game and not amazing." />
                    <comment username="boettler" rating="8" value="Probably 50% different from Wingspan such that it can feel like a new game, but with some similar mechanisms. The Wyrm/Dragon theme is only vaguely part of the gameplay. It could have easily been other topics. This could be a gateway game for people who mainly play D&amp;D to get into board games." />
                    <comment username="bogovski" rating="10" value="Here is a ten, just for the respect to awsome games SM made and to piss of all the negative smartasses who rated it 1 because they don&apos;t like wingspan. I am sure it will be more than solid game." />
                    <comment username="Bondy034" rating="8.5" value="I wasn&apos;t expecting much from this game, as I thought Wingspan was just fine but to my surprise this is a far more interesting game!  The theme is still not particularly deep but the gameplay has been tweaked and tuned, so that there&apos;s lots to think of each turn and less &apos;obvious&apos; decisions.  Definitely a keeper here!" />
                    <comment username="bonnyaclyde" rating="N/A" value="I like this game better than wingspan it seems much more balanced but it is more complex which Im ok with but it&apos;s not near as fitting for nongamers." />
                    <comment username="Bookseller" rating="N/A" value="With Stonemaier upgrade pack." />
                    <comment username="BookWyrMom" rating="N/A" value="First thing that catches my eye on here. ;)" />
                    <comment username="Boolbar" rating="8.5" value="Prefer this to Wingspan, especially the nice easy to use solo mode.  Plus, dragons!" />
                    <comment username="Boombastix" rating="1" value="Boring." />
                    <comment username="Bordspelwereld" rating="7.5" value="bij Heije" />
                    <comment username="boredbeyondbelief" rating="8" value="Not the amazing game Wingspan is, but it has an enjoyable play. Each move makes you feel like you are accomplishing something and progressing forward. It had some really fun timing puzzles. It does feel like you might be able to do too much in it - all players in our game almost filled their boards and one did. And it does get a little crunchy at the end when you are trying to maximize your last couple of moves (falls for the one Wingspan problem that the last turn or two can have you limping to the finish)." />
                    <comment username="Born-of-Ashes" rating="9" value="Fixes a lot of the gripes I have with Wingspan and adds flavor that appeals to me. Activating the rows now costs eggs so the OP combos are much harder to put together, but still at least a few are achievable. Some things that seem small but make a big difference in agency: being able to activate rows when you want instead of just when you play a new animal, having tracks that give boni on every space rather than dead spaces, option to bank actions into future rounds.
        I’m still not a huge fan of the goals since they distract from building a tightly synergizing engine and now there is the guild board for interaction (already plenty of blocking going on in the market)." />
                    <comment username="bponnaluri" rating="7" value="I enjoyed playing Wyrmspan.
        
        I feel like the game did a great job of taking inspiration from Wingspan while adding mechanics that provide a new experience and interesting choices. I feel like the rules were also relatively easy to pick up due to my experience with Wingspan and other Euros.
        
        On the other hand, the game feels like somewhat of an efficiency puzzle where I need to plan multiple moves ahead to optimize results. I prefer games where planning ahead is less important and making tactical mistakes is less consequential." />
                    <comment username="brettspielverein_kuf" rating="N/A" value="BSV" />
                    <comment username="breyfunk" rating="10" value="Amazing game.  This is NOT just Wingspan with a new theme, there are a lot of things going on here that aren’t present in the original game." />
                    <comment username="bryden42" rating="N/A" value="With upgraded components and playmat" />
                    <comment username="Bryteness" rating="10" value="Wyrmspan is a fantastic game! It quickly became one of my favorite games. The mechanics feel smoother than Wingspan in some ways but more complex in others resulting in a very rewarding experience while playing." />
                    <comment username="bs2sjh" rating="9" value="Great game. More interesting than Wingspan and gives lots opportunity for developing strategies. Really beautiful on the table." />
                    <comment username="BubbleheadAmber" rating="7.5" value="PROS:
        - The changes on how players gather different resources are refreshing enough for the game to feel different compared to Wingspan 
        
        CONS:
        - The actions aren&apos;t as intuitive as Wingspan, which makes this game suited for players experienced in Wingspan than as a gateway game
        - Game is even more multiplayer solitaire, as the resource pool (i.e. bird feeder in wingspan) is now spread into a player&apos;s cards and actions instead of via the shared birdfeeder
        
        FINAL THOUGHTS:
        It&apos;s 80% wingspan, with the all of its pros and cons. Perfect for those who love wingspan and are looking for a new take on the engine building system" />
                    <comment username="buckbagr" rating="9" value="After two plays one solo and one 2p it is obvious this will be a game for us.  Wingspan may very well be my favorite game of all time.  So my opinion may reflect this, but Wyrmspan is a very good game that teaches easy and plays pretty fast.  The engine building here can be epic, and almost everything you do gets you something.  Excavate  a cave, get something.  Entice a dragon, get something.  Explore your cave system, get lots of somethings.  We are so impressed by this, and highly recommend it.  The components are great, and I also recommend upgrading these with the upgrade pack." />
                    <comment username="bugnutz" rating="N/A" value="1 to 5 Players" />
                    <comment username="bvongunten" rating="7" value="Great theme, great game ;)" />
                    <comment username="camidon" rating="8" value="Played with friends. Nice twist on Wingspan. Similar, yet feels fresh. Doesn&apos;t just feel like a money-grab knock off. I still greatly prefer the integrated biologic theme of Wingspan with its very refined gameplay.  Yet, this beat my expectations. Good game." />
                    <comment username="cardboardcorner" rating="N/A" value="30A" />
                    <comment username="cardboardcornerlpm" rating="N/A" value="12E" />
                    <comment username="carlcorey" rating="9" value="Temporarily giving it a 9 after one play. It has more depth and more interesting combos than Wingspan, but why was it so easy to fill the tableau?" />
                    <comment username="CarolineBlack" rating="8.2" value="A slightly more complex version of Wingspan. I liked the fresh take although I am not overly enamoured by the theme. The guild track provided a good way out of trouble if you couldn’t get the cards you wanted. I certainly didn’t miss the bird feeder but it’s a tighter game. It has a great sense of escalation with you being able to pull off great combos towards the end of the game." />
                    <comment username="Catyrpelius" rating="7.5" value="Its alright. Its no better or worse then wingspan which I guess is pretty good praise. 
        
        The average gamer doesn&apos;t need both though, my recommendation would be to pick whichever theme you enjoy more. 
        
        I feel like I&apos;m being overly critical of Stonemaier&apos;s games lately but they really been feeling like cash grabs..." />
                </comments>
                <statistics page="1">
                    <ratings >
                        <usersrated value="3520" />
                        <average value="8.1203" />
                        <bayesaverage value="7.03463" />
                        <ranks>
                            <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="424" bayesaverage="7.03463" />
                            <rank type="family" id="5497" name="strategygames" friendlyname="Strategy Game Rank" value="239" bayesaverage="7.18424" />
                            <rank type="family" id="5499" name="familygames" friendlyname="Family Game Rank" value="64" bayesaverage="7.21354" />
                        </ranks>
                        <stddev value="1.49025" />
                        <median value="0" />
                        <owned value="8893" />
                        <trading value="23" />
                        <wanting value="352" />
                        <wishing value="4091" />
                        <numcomments value="719" />
                        <numweights value="128" />
                        <averageweight value="2.7266" />
                    </ratings>
                </statistics>
                <marketplacelistings>
                    <listing>
                        <listdate value="Mon, 19 Feb 2024 12:44:47 +0000" />
                        <price currency="EUR" value="49.00" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3392616" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Mon, 04 Mar 2024 10:10:26 +0000" />
                        <price currency="USD" value="75.00" />
                        <condition value="likenew" />
                        <notes value="This is for a copy of Wyrmspan in excellent condition along with the deluxe upgrade pack (resources and coins) worth $35 by itself&amp;#10;&amp;#10;Buyer pays shipping from 76537. Payment accepted through PayPal's or Venmo. Goods &amp; Services users please add $3.00 to the total payment, so we share costs equally. Shipping will be in the $10-15 range depending on where in CONUS you live.&amp;#10;&amp;#10;Feel free to check some of my other games, as I am happy to offer discounted shipping for multiple games purchased. GM me for questions" />
                        <link href="https://boardgamegeek.com/market/product/3404166" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Mon, 04 Mar 2024 10:12:43 +0000" />
                        <price currency="USD" value="40.00" />
                        <condition value="new" />
                        <notes value="**NOTE: this is not for the game, for the upgrade pack**&amp;#10;Unopened and in excellent condition&amp;#10;&amp;#10;Ships from 76537 zip code. Buyer pays shipping Feel free to GM me for a shipping quote. Shipping will be in the $6-12 range depending on where in CONUS you live.&amp;#10;&amp;#10;Payment accepted through PayPal's or Venmo. Goods &amp; Services users please add $1.50 to the total payment, so we share costs equally.&amp;#10;&amp;#10;Feel free to check some of my other games, as I am happy to offer discounted shipping for multiple games purchased. GM me for questions" />
                        <link href="https://boardgamegeek.com/market/product/3404169" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Sat, 09 Mar 2024 15:35:46 +0000" />
                        <price currency="EUR" value="59.00" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3407935" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Thu, 28 Mar 2024 12:49:19 +0000" />
                        <price currency="EUR" value="64.99" />
                        <condition value="new" />
                        <notes value="Mind that we sell on multiple platforms, and sometimes there can be a stock difference.&amp;#10;Full list https://www.boardgamegeek.com/geekmarket/user/karadoc&amp;#10;Shipping Information&amp;#10;&amp;#10;You pay 1 shipping fee for upto 20kg&amp;#10;&amp;#10;Bank Transfer to BNP Paribas 001-4570423-53&amp;#10;IBAN BE53001457042353 BIC GEBABEBB&amp;#10;Full list https://www.boardgamegeek.com/geekmarket/user/karadoc&amp;#10;Paypal address: paypal@outpost.be pay as friends and family, otherwise add 5% fee's.Bank information for payments form outside Belgium&amp;#10;IBAN BE53001457042353 BIC GEBABEBB" />
                        <link href="https://boardgamegeek.com/market/product/3420799" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Thu, 28 Mar 2024 14:00:50 +0000" />
                        <price currency="EUR" value="52.50" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3420849" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Fri, 29 Mar 2024 12:17:10 +0000" />
                        <price currency="EUR" value="59.00" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3421344" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Sat, 30 Mar 2024 11:43:26 +0000" />
                        <price currency="EUR" value="54.00" />
                        <condition value="new" />
                        <notes value="Game weight: 2.550 kg" />
                        <link href="https://boardgamegeek.com/market/product/3421950" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Sun, 31 Mar 2024 07:04:07 +0000" />
                        <price currency="EUR" value="59.90" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3422442" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Fri, 05 Apr 2024 17:28:40 +0000" />
                        <price currency="EUR" value="60.00" />
                        <condition value="new" />
                        <notes value="Spieleranzahl: 1 bis 5 Spieler&amp;#10;Spieldauer: 90 Minuten&amp;#10;Altersempfehlung: 12+&amp;#10;&amp;#10;Schwingenschlag - Baut euer H&amp;#195;&amp;#182;hlenlabyrinth aus und lockt sch&amp;#195;&amp;#182;ne und m&amp;#195;&amp;#164;chtige Drachen an.&amp;#10;Ihr seid angehende Drachenprofis in der Welt von Schwingenschlag &amp;#226;&amp;#128;&amp;#147; einem Ort, an dem Drachen aller Arten, Gr&amp;#195;&amp;#182;&amp;#195;&amp;#159;en und Farben den Himmel bev&amp;#195;&amp;#182;lkern. Grabt ein verborgenes Labyrinth aus, das ihr k&amp;#195;&amp;#188;rzlich auf eurem Land entdeckt habt, und siedelt diese wundersch&amp;#195;&amp;#182;nen Kreaturen in euren H&amp;#195;&amp;#182;hlen an. Im Verlauf eines Schwingenschlag-Spiels erschafft ihr ein vielf&amp;#195;&amp;#164;ltiges Drachenhabitat.&amp;#10;Ihr beginnt mit 3 ausgegrabenen Feldern &amp;#226;&amp;#128;&amp;#147; dem jeweils ersten Feld von links in eurer Karmesin-Kaverne, eurer Gold-Grotte und eurem Amethyst-Abgrund. Im Spielverlauf kooperiert mit der Drachengilde, grabt ihr weitere Bereiche eures H&amp;#195;&amp;#182;hlensystems aus, und lockt Drachen an, deren m&amp;#195;&amp;#164;chtige F&amp;#195;&amp;#164;higkeiten ihr raffiniert kombinieren k&amp;#195;&amp;#182;nnt.&amp;#10;&amp;#10;Schwingenschlag wurde durch Fl&amp;#195;&amp;#188;gelschlag, ein Spiel von Elizabeth Hargrave, inspiriert und nutzt dieselben grundlegenden Mechaniken. Elisabeth hat an der Entwicklung des Spieles mitgewirkt. Schwingenschlag ist ein wenig komplexer und alle Spielaspekte wurden speziell an die Drachenthematik angepasst.&amp;#10;&amp;#10;Inhalt:&amp;#10;183 Drachenkarten&amp;#10;75 H&amp;#195;&amp;#182;hlenkarten&amp;#10;55 Eier&amp;#10;48 pers&amp;#195;&amp;#182;nliche Marker &amp;#10;45 M&amp;#195;&amp;#188;nzen&amp;#10;25 Fleischmarker&amp;#10;25 Goldmarker&amp;#10;25 Kristallmarker&amp;#10;25 Milchmarker&amp;#10;20 Multiplikatoren&amp;#10;10 (doppelseitige) Spielhilfen&amp;#10;10 (doppelseitige) Zielpl&amp;#195;&amp;#164;ttchen&amp;#10;5 Gildensteine&amp;#10;5 H&amp;#195;&amp;#182;hlentableaus&amp;#10;5 Spielfiguren&amp;#10;4 (doppelseitige) Gildenpl&amp;#195;&amp;#164;ttchen&amp;#10;1 Drachengildenkreis&amp;#10;1 Kartentafel&amp;#10;1 Rundentafel&amp;#10;1 Startmarker&amp;#10;1 Wertungsblock&amp;#10;https://youtu.be/v43GxrwLhWU&amp;#10;&amp;#10;Mit Spielregeln in folgenden Sprachen: DE" />
                        <link href="https://boardgamegeek.com/market/product/3426052" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Tue, 09 Apr 2024 11:34:32 +0000" />
                        <price currency="GBP" value="46.95" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3428574" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Mon, 15 Apr 2024 08:10:28 +0000" />
                        <price currency="EUR" value="61.00" />
                        <condition value="new" />
                        <notes value="Golden Meeple is an online shop since 2015 with attractive prices.&amp;#10;More than 6000 items are listed, half of which are in stock.&amp;#10;Visit our website www.goldenmeeple.be and if you have any questions, send us an email info@goldenmeeple.be&amp;#10;Prices :&amp;#10;All prices are VAT (Belgian 21%) included and shipping costs are not included&amp;#10;For sales outside the EU, reduce the price by 21%.&amp;#10;Payments :&amp;#10;Payment methods are :&amp;#10;Bank transfer (free of charge)&amp;#10;Paypal (+5% fee)&amp;#10;On our website, many payment methods without fees.&amp;#10;Availability:&amp;#10;When we add the item to BoardGameGeek, it is in stock.&amp;#10;As we sell items on different platforms, it is possible that they are out of stock at the time of your order.&amp;#10;If this happens, we will inform you and try to restock it as soon as possible. Please do not hesitate to contact us to enquire about product availability!&amp;#10;Before confirming your order, we will always check the availability of the product.&amp;#10;Delivery :&amp;#10;Belgium Mondial Relay &amp;#226;&amp;#130;&amp;#172;2.99&amp;#10;Belgium Domicile Bpost &amp;#226;&amp;#130;&amp;#172;5.7&amp;#10;France Mondial Relay &amp;#226;&amp;#130;&amp;#172;7.9&amp;#10;France Domicile DPD &amp;#226;&amp;#130;&amp;#172;15&amp;#10;Luxembourg Mondial Relay &amp;#226;&amp;#130;&amp;#172;3.75&amp;#10;Germany Domicile &amp;#226;&amp;#130;&amp;#172;10.2&amp;#10;Spain Domicile &amp;#226;&amp;#130;&amp;#172;11.5&amp;#10;Netherlands Domicile &amp;#226;&amp;#130;&amp;#172;9&amp;#10;Austria, Italy, Portugal Home 15&amp;#226;&amp;#130;&amp;#172;&amp;#10;Switzerland and UK by DPD ask for the cost.&amp;#10;For other destinations, please ask.&amp;#10;Pre-orders and Kickstarter :&amp;#10;Pre-orders and Kickstarter purchases are considered final when paid.&amp;#10;It is possible to cancel a paid pre-order or kickstarter, but an administration fee of 5&amp;#226;&amp;#130;&amp;#172; will be charged per item.&amp;#10;Follow us :&amp;#10;Facebook : https://www.facebook.com/CedGoldenMeeple&amp;#10;Instagram : https://www.instagram.com/goldenmeeple/?hl=fr&amp;#10;Youtube : https://www.youtube.com/@ludicorner/videos" />
                        <link href="https://boardgamegeek.com/market/product/3432921" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Mon, 22 Apr 2024 12:41:10 +0000" />
                        <price currency="EUR" value="60.00" />
                        <condition value="new" />
                        <notes value="Brand new copy of the game, in shrink wrap.&amp;#10;&amp;#10;Shipping to EU would be 20-25 euro, depending on location, and the package should arrive in 7-10 days. Elsewhere &amp;#226;&amp;#128;&amp;#147; please ask!&amp;#10;&amp;#10;Check out my other products for sale as well! If you buy multiple items, I will combine shipping costs. It&amp;#226;&amp;#128;&amp;#153;s much cheaper this way." />
                        <link href="https://boardgamegeek.com/market/product/3438163" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Fri, 26 Apr 2024 11:22:54 +0000" />
                        <price currency="EUR" value="61.99" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3440994" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Sun, 28 Apr 2024 04:27:35 +0000" />
                        <price currency="USD" value="75.00" />
                        <condition value="likenew" />
                        <notes value="Includes resource upgrade pack and one rubber playmat.&amp;#10;buyer pays shipping via Pirateship" />
                        <link href="https://boardgamegeek.com/market/product/3442230" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Tue, 30 Apr 2024 18:44:14 +0000" />
                        <price currency="EUR" value="64.99" />
                        <condition value="new" />
                        <notes value="weight: 2501 grams + packaging" />
                        <link href="https://boardgamegeek.com/market/product/3444089" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Mon, 06 May 2024 10:10:12 +0000" />
                        <price currency="EUR" value="65.00" />
                        <condition value="new" />
                        <notes value="Son" />
                        <link href="https://boardgamegeek.com/market/product/3448353" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Tue, 07 May 2024 17:49:41 +0000" />
                        <price currency="EUR" value="50.20" />
                        <condition value="new" />
                        <notes value="" />
                        <link href="https://boardgamegeek.com/market/product/3449510" title="marketlisting" />
                    </listing>
                    <listing>
                        <listdate value="Wed, 15 May 2024 10:55:54 +0000" />
                        <price currency="EUR" value="64.00" />
                        <condition value="new" />
                        <notes value="PACKAGING- We are trying to reuse packaging material as often as possible. Please be aware that boxes in most cases will be reused or have other branding etc. &amp;#10;&amp;#10;At this moment we only offering goods for supply within the EU and EEA. We ship to LITHUANIA, LATVIA , ESTONIA , FINLAND,  POLAND , SWEDEN, GERMANY, BELGIUM, HUNGARY and other EU countries.&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage In Lithuania takes approximate 1-2 working days&amp;#10;&amp;#10;Postage and packing fee starts from 3.49 &amp;#226;&amp;#130;&amp;#172; applies up to 10kg (33x39x42) using Itella Smartpost, Omniva, DPD or LP Express&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to Latvia .&amp;#10;&amp;#10;Flat postage and packing fee starts from 5.99 &amp;#226;&amp;#130;&amp;#172; up to 10kg (33x39x42) and delivery takes approximate 2-4 working days&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to Estonia.&amp;#10;&amp;#10;Flat postage and packing starts from 5.99 &amp;#226;&amp;#130;&amp;#172; up to 10kg (33x39x42) and delivery takes approximate 3-5 working days&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to Finland.&amp;#10;&amp;#10;Flat postage and packing fee of 6.99 &amp;#226;&amp;#130;&amp;#172; to Finland applies up to 10kg (33x39x42) and delivery takes approximate 3-5 working days&amp;#10;&amp;#10;Parcels sent using Smartpost trackable services to postal boxes or HRX&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to Poland.&amp;#10;&amp;#10;Flat postage and packing fee from 8.99 &amp;#226;&amp;#130;&amp;#172; to Poland applies up to 5kg (33x39x42) and delivery takes approximate 3-5 working days&amp;#10;&amp;#10;Parcels sent using trackable services.&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to Sweden.&amp;#10;&amp;#10;Flat postage and packing fee from 14.99 &amp;#226;&amp;#130;&amp;#172; to Sweden applies up to 5kg (33x39x42) and delivery takes approximate 5-7 working days&amp;#10;&amp;#10;Parcels sent using HRX trackable services to postal boxes.&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to Germany, Denmark, Belgium, Netherlands takes approximate 5-7 working&amp;#10;&amp;#10;Flat postage and packing fee from 8.99 &amp;#226;&amp;#130;&amp;#172; to applies up to 20kg (33x39x42)&amp;#10;&amp;#10;Parcels sent using Itella Smartpost/GLS trackable services.&amp;#10;&amp;#10;Postage to Bulgaria, Greece, Italy, Portugal, Spain takes approximate 5-7 working&amp;#10;&amp;#10;Flat postage and packing fee from 9.99 &amp;#226;&amp;#130;&amp;#172; to applies up to 20kg (33x39x42)&amp;#10;&amp;#10;Parcels sent using Itella Smartpost/GLS trackable services.&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to other EU countries&amp;#10;&amp;#10;Croatia, Slovenia Slovakia, Austria, Czeck Republic, Luxemburg, Hungary , France and delivery takes approximate 5-7 working&amp;#10;&amp;#10;Flat postage and packing fee from 16.99 &amp;#226;&amp;#130;&amp;#172; to applies up to 5kg (33x39x42)&amp;#10;&amp;#10;Parcels sent using Itella Smartpost/GLS trackable services.&amp;#10;&amp;#10;&amp;#226;&amp;#128;&amp;#139;&amp;#10;&amp;#10;Postage to UK&amp;#10;&amp;#10;Delivery takes approximate 5-7 working&amp;#10;&amp;#10;Flat postage and packing fee from 9.99 &amp;#226;&amp;#130;&amp;#172; to applies up to 5kg (33x39x42)&amp;#10;&amp;#10;Parcels sent using trackable services.&amp;#10;&amp;#10;We aim to dispatch all orders within 1 working day. &amp;#10;&amp;#10;If you have specific queries regarding delivery, please email us at info@manohobis.com &amp;#10;&amp;#10;PACKAGING- We are trying to reuse packaging material as often as possible. Please be aware that boxes in most cases will be reused or have other branding etc." />
                        <link href="https://boardgamegeek.com/market/product/3454983" title="marketlisting" />
                    </listing>
                </marketplacelistings>
            </item>
        </items>
    `;

    const params: ParamsThing = {
      id: ["410201"],
      versions: true,
      videos: true,
      stats: true,
      marketplace: true,
      comments: true,
    };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await thing(params);

    // If Prettier formats the JSON, the test will fail due to weird spacing in the XML
    // prettier-ignore
    const mockPayload: PayloadThing = {
        "attributes": {
          "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse"
        },
        "items": [
          {
            "id": "410201",
            "type": "boardgame",
            "thumbnail": "https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__thumb/img/Ic3yRKTjVe26RgDzIdLsKn8Hztk=/fit-in/200x150/filters:strip_icc()/pic7947338.png",
            "image": "https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__original/img/MW6S23AwpGGu0Rx05X_aByK0lmA=/0x0/filters:format(png)/pic7947338.png",
            "names": [
              {
                "type": "primary",
                "sortindex": "1",
                "value": "Wyrmspan"
              },
              {
                "type": "alternate",
                "sortindex": "1",
                "value": "Na křídlech draků"
              },
              {
                "type": "alternate",
                "sortindex": "1",
                "value": "Na skrzydłach smoków"
              },
              {
                "type": "alternate",
                "sortindex": "1",
                "value": "Schwingenschlag"
              },
              {
                "type": "alternate",
                "sortindex": "1",
                "value": "Змієвир"
              },
              {
                "type": "alternate",
                "sortindex": "1",
                "value": "龍翼翱翔"
              }
            ],
            "description": "You are an amateur dracologist in the world of Wyrmspan, a place where dragons of all shapes, sizes, and colors roam the skies. Excavate a hidden labyrinth you recently unearthed on your land and entice these beautiful creatures to roost in the sanctuary of your caves.&#10;&#10;During a game of Wyrmspan, you will build a sanctuary for dragons of all shapes and sizes. Your sanctuary begins with 3 excavated spaces&mdash;the leftmost space in your Crimson Cavern, your Golden Grotto, and your Amethyst Abyss. Over the course of the game, you will excavate additional spaces in your sanctuary and entice dragons to live there, chaining together powerful abilities and earning the favor of the Dragon Guild.&#10;&#10;Wyrmspan is inspired by the mechanisms of Wingspan, though its unique elements make Wyrmspan a standalone game (not compatible with Wingspan).&#10;&#10;&mdash;description from the publisher&#10;&#10;",
            "yearPublished": "2024",
            "minPlayers": "1",
            "maxPlayers": "5",
            "playingTime": "90",
            "minPlayTime": "90",
            "maxPlayTime": "90",
            "minAge": "14",
            "links": [
              {
                "type": "boardgamecategory",
                "id": "1002",
                "value": "Card Game"
              },
              {
                "type": "boardgamecategory",
                "id": "1010",
                "value": "Fantasy"
              },
              {
                "type": "boardgamemechanic",
                "id": "2875",
                "value": "End Game Bonuses"
              },
              {
                "type": "boardgamemechanic",
                "id": "2040",
                "value": "Hand Management"
              },
              {
                "type": "boardgamemechanic",
                "id": "2846",
                "value": "Once-Per-Game Abilities"
              },
              {
                "type": "boardgamemechanic",
                "id": "2041",
                "value": "Open Drafting"
              },
              {
                "type": "boardgamemechanic",
                "id": "2819",
                "value": "Solo / Solitaire Game"
              },
              {
                "type": "boardgamemechanic",
                "id": "2939",
                "value": "Track Movement"
              },
              {
                "type": "boardgamemechanic",
                "id": "2828",
                "value": "Turn Order: Progressive"
              },
              {
                "type": "boardgamefamily",
                "id": "77906",
                "value": "Category: Dized Tutorial"
              },
              {
                "type": "boardgamefamily",
                "id": "7005",
                "value": "Creatures: Dragons"
              },
              {
                "type": "boardgamefamily",
                "id": "70948",
                "value": "Digital Implementations: Tabletopia"
              },
              {
                "type": "boardgamefamily",
                "id": "58267",
                "value": "Game: Wingspan"
              },
              {
                "type": "boardgamefamily",
                "id": "27646",
                "value": "Mechanism: Tableau Building"
              },
              {
                "type": "boardgamefamily",
                "id": "78680",
                "value": "Misc: Made by Panda"
              },
              {
                "type": "boardgamefamily",
                "id": "72487",
                "value": "Organizations: Automa Factory"
              },
              {
                "type": "boardgamefamily",
                "id": "5666",
                "value": "Players: Games with Solitaire Rules"
              },
              {
                "type": "boardgameaccessory",
                "id": "405113",
                "value": "Wingspan: Golden Eggs"
              },
              {
                "type": "boardgameaccessory",
                "id": "420295",
                "value": "Wyrmspan: GGG Insert/Organizer"
              },
              {
                "type": "boardgameaccessory",
                "id": "418055",
                "value": "Wyrmspan: Laserox Organizer"
              },
              {
                "type": "boardgameaccessory",
                "id": "413520",
                "value": "Wyrmspan: Natural Rubber Playmat"
              },
              {
                "type": "boardgameaccessory",
                "id": "413510",
                "value": "Wyrmspan: Upgrade Pack"
              },
              {
                "type": "boardgameimplementation",
                "id": "266192",
                "value": "Wingspan"
              },
              {
                "type": "boardgamedesigner",
                "id": "155573",
                "value": "Connie Vogelmann"
              },
              {
                "type": "boardgameartist",
                "id": "131233",
                "value": "Clémentine Campardou"
              },
              {
                "type": "boardgamepublisher",
                "id": "23202",
                "value": "Stonemaier Games"
              },
              {
                "type": "boardgamepublisher",
                "id": "267",
                "value": "999 Games"
              },
              {
                "type": "boardgamepublisher",
                "id": "6194",
                "value": "Delta Vision Publishing"
              },
              {
                "type": "boardgamepublisher",
                "id": "40415",
                "value": "Divercentro"
              },
              {
                "type": "boardgamepublisher",
                "id": "22380",
                "value": "Feuerland Spiele"
              },
              {
                "type": "boardgamepublisher",
                "id": "4785",
                "value": "Ghenos Games"
              },
              {
                "type": "boardgamepublisher",
                "id": "42325",
                "value": "Grok Games"
              },
              {
                "type": "boardgamepublisher",
                "id": "30677",
                "value": "Maldito Games"
              },
              {
                "type": "boardgamepublisher",
                "id": "5400",
                "value": "Matagot"
              },
              {
                "type": "boardgamepublisher",
                "id": "7992",
                "value": "MINDOK"
              },
              {
                "type": "boardgamepublisher",
                "id": "32395",
                "value": "NeoTroy Games"
              },
              {
                "type": "boardgamepublisher",
                "id": "7466",
                "value": "Rebel Sp. z o.o."
              },
              {
                "type": "boardgamepublisher",
                "id": "36763",
                "value": "Surfin' Meeple China"
              },
              {
                "type": "boardgamepublisher",
                "id": "44209",
                "value": "Ігромаг"
              }
            ],
            "polls": [
              {
                "name": "suggested_numplayers",
                "title": "User Suggested Number of Players",
                "totalvotes": "99",
                "results": [
                  {
                    "numplayers": "1",
                    "result": [
                      {
                        "value": "Best",
                        "numvotes": "2"
                      },
                      {
                        "value": "Recommended",
                        "numvotes": "50"
                      },
                      {
                        "value": "Not Recommended",
                        "numvotes": "8"
                      }
                    ]
                  },
                  {
                    "numplayers": "2",
                    "result": [
                      {
                        "value": "Best",
                        "numvotes": "29"
                      },
                      {
                        "value": "Recommended",
                        "numvotes": "51"
                      },
                      {
                        "value": "Not Recommended",
                        "numvotes": "2"
                      }
                    ]
                  },
                  {
                    "numplayers": "3",
                    "result": [
                      {
                        "value": "Best",
                        "numvotes": "45"
                      },
                      {
                        "value": "Recommended",
                        "numvotes": "31"
                      },
                      {
                        "value": "Not Recommended",
                        "numvotes": "2"
                      }
                    ]
                  },
                  {
                    "numplayers": "4",
                    "result": [
                      {
                        "value": "Best",
                        "numvotes": "18"
                      },
                      {
                        "value": "Recommended",
                        "numvotes": "31"
                      },
                      {
                        "value": "Not Recommended",
                        "numvotes": "23"
                      }
                    ]
                  },
                  {
                    "numplayers": "5",
                    "result": [
                      {
                        "value": "Best",
                        "numvotes": "1"
                      },
                      {
                        "value": "Recommended",
                        "numvotes": "16"
                      },
                      {
                        "value": "Not Recommended",
                        "numvotes": "52"
                      }
                    ]
                  },
                  {
                    "numplayers": "5+",
                    "result": [
                      {
                        "value": "Best",
                        "numvotes": "0"
                      },
                      {
                        "value": "Recommended",
                        "numvotes": "1"
                      },
                      {
                        "value": "Not Recommended",
                        "numvotes": "45"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "suggested_playerage",
                "title": "User Suggested Player Age",
                "totalvotes": "20",
                "results": [
                  {
                    "value": "2",
                    "numvotes": "0"
                  },
                  {
                    "value": "3",
                    "numvotes": "0"
                  },
                  {
                    "value": "4",
                    "numvotes": "0"
                  },
                  {
                    "value": "5",
                    "numvotes": "0"
                  },
                  {
                    "value": "6",
                    "numvotes": "0"
                  },
                  {
                    "value": "8",
                    "numvotes": "1"
                  },
                  {
                    "value": "10",
                    "numvotes": "7"
                  },
                  {
                    "value": "12",
                    "numvotes": "8"
                  },
                  {
                    "value": "14",
                    "numvotes": "4"
                  },
                  {
                    "value": "16",
                    "numvotes": "0"
                  },
                  {
                    "value": "18",
                    "numvotes": "0"
                  },
                  {
                    "value": "21 and up",
                    "numvotes": "0"
                  }
                ]
              },
              {
                "name": "language_dependence",
                "title": "Language Dependence",
                "totalvotes": "3",
                "results": [
                  {
                    "level": "1",
                    "value": "No necessary in-game text",
                    "numvotes": "0"
                  },
                  {
                    "level": "2",
                    "value": "Some necessary text - easily memorized or small crib sheet",
                    "numvotes": "1"
                  },
                  {
                    "level": "3",
                    "value": "Moderate in-game text - needs crib sheet or paste ups",
                    "numvotes": "1"
                  },
                  {
                    "level": "4",
                    "value": "Extensive use of text - massive conversion needed to be playable",
                    "numvotes": "1"
                  },
                  {
                    "level": "5",
                    "value": "Unplayable in another language",
                    "numvotes": "0"
                  }
                ]
              }
            ],
            "comments": {
              "page": "1",
              "total": "721",
              "comment": [
                {
                  "username": "1arska",
                  "rating": "8",
                  "value": "Great successor for Wingspan that keeps it's good line action mechanics (cave exploring in Wyrmspan). I really like the way how benefits matters in this game. Especially guild is great addition. Basic card game problems still exist and you might have to be lucky to gain specific cards. But man, I'm hungry to play more with dragons!"
                },
                {
                  "username": "1QUrsu",
                  "rating": "8.6",
                  "value": "It's a bit low interaction and it feels a bit on the lucky side if you get the correct pieces to start into the game properly.\n        \n        Played 4 matches so far with 2 players. The game is gorgeous, the material even without the premium upgrade is great. With a little bit more interaction and reduction of slow starts (refilling the open cards instantly could help, so people would have more options to pick instead of blind picking a lot). I'm sure there was a design decision there to only refill at the end of a round, I just don't necessarily agree.\n        \n        Overall a very good game that should be a staple for everyone who can't get into the bird theme of wingspan."
                },
                {
                  "username": "8janek8",
                  "rating": "N/A",
                  "value": "3T"
                },
                {
                  "username": "aburdiss",
                  "rating": "9",
                  "value": "A bit more “thinky” than wingspan, but similar enough if you’ve played it. It’s got a lot of differences that make the experience great overall, but I still like wingspan a bit more (and wingspan Asia!)"
                },
                {
                  "username": "Ace_of_Diamonds",
                  "rating": "9",
                  "value": "I felt this improved upon wingspan which is a good game to begin with. I felt the engine building come through more with this version. We also saw some big turns chaining a bunch of actions together."
                },
                {
                  "username": "Achire",
                  "rating": "7",
                  "value": "Played twice at Tantrumcon. First time - table hated it. Second time - table loved it. First - definitely better at smaller player counts and if you hated Wingspan, you're not going to like it. The really great stuff about Wyrmspan is: (1) all resources are always available (2) shorter downtime (but not short enough to allow for high player counts (3) guilds are super-exciting and do add a bit of interaction (4) caves a fantastic twist. The theming, however, is much weaker in this one, which is going to make it harder to teach to people who've never played wingspan. Meat-eaters go on top, gold-hoarders in the middle, and crystal-hoarder on the bottom just doesn't feel as intuitive as \"pelicans eat fish and go in water.\" I also don't know if the hatchlings really feel worthwhile... I'd have to play more to see how I feel about them. So overall, mixed feelings - I enjoyed it and I think more mechanically-inclined people will prefer it over Wingspan, while people who like thematic integration & appreciate ease of teaching will like it a lot less. Also, some people just like the excitement of rolling dice."
                },
                {
                  "username": "acolyte",
                  "rating": "8",
                  "value": "Liked it better than Wingspan. Combos and engines felt a little more satisfying. Tho, I wish it didn’t have the rondel. That felt like an expansion, and one thing too many. This game without that would be perfect."
                },
                {
                  "username": "adamredwoods",
                  "rating": "N/A",
                  "value": "It looks like an improved version of Wingspan. try before buy."
                },
                {
                  "username": "Addboilingwater",
                  "rating": "N/A",
                  "value": "Engine Builder Medium Strategy (4)\n        Based On Wingspan, Adding & Adapting New Content. More Involvement & Theme, Adding Complexity. "
                },
                {
                  "username": "Addiction2k",
                  "rating": "8",
                  "value": "I have to admit I like this better than Wingspan, but not so much better that I need to own both of them and not so much better that I'd get rid of Wingspan (which my family really likes)."
                },
                {
                  "username": "adel9591",
                  "rating": "7",
                  "value": "It might be slightly better than Wingspan, as it's a little tighter and has action economy. I dislike the different sized cards and the theme does nothing for me so overall same rating as Wingspan."
                },
                {
                  "username": "Adwak1",
                  "rating": "8",
                  "value": "Played twice at TantrumCon in Charlotte 2024"
                },
                {
                  "username": "Aegir2122",
                  "rating": "5",
                  "value": "I don't love Wingspan, but I enjoy it sometimes. I don't love Wymspan and I didn't enjoy playing it. There's even less player interaction than Wingspan, namely zero except checking other players' victory conditions (And the very occasional cave feature that lets other players do something, we only had two or three in my playthrough), and the Explore action is slower than any of the actions in Wingspan, so you spend a LOT of time just waiting for your turn to come around with nothing interesting to watch/do. Prepping a cave before playing a dragon doesn't add anything to the game, it just slows your action economy down because now you have double the base actions you have to do before you can place a dragon. (Explore for a cave, excavate, explore for a dragon, entice, and that assumes you already have the resources to entice). Finding ways to work around that is certainly part of the game and I love engine builders, but it doesn't feel fulfilling here, it's like they took the engine builder and removed pieces to force you to 'fix' it first before you could enjoy the engine builder part. Removing the dice was nice, but the system instead is that you get whatever resources you want, making the different resources entirely pointless. It wouldn't change the game very much if you just merged all the resources into one. I never felt like I had any trouble getting all the resources I needed. The guild initially seemed like a cool feature, but the rewards felt fairly lackluster most of the time, so it ended up being an \"Oh yea and I move up on the guild and get an egg\" kind of moment.\n        \n        Overall just seems like someone took Wingspan and tried to change it for the sake of changing it instead of having a vision of something they wanted to make. I'm sure die-hard Wingspan lovers will love this as well, as it's basically Wingspan but different, but I don't see the appeal."
                },
                {
                  "username": "afrozenpeach",
                  "rating": "10",
                  "value": "My new favorite resource in any game ever. Amethyst crystals. Amazing. I need to upgrade my copy with actual crystals."
                },
                {
                  "username": "Againsto",
                  "rating": "5",
                  "value": "What fresh hell is this?\n        Glad I played this, and I might try a 2p game, but never again with four."
                },
                {
                  "username": "agguru",
                  "rating": "N/A",
                  "value": "5 player mats and deluxe components\n        "
                },
                {
                  "username": "agutmann2530",
                  "rating": "N/A",
                  "value": "1p"
                },
                {
                  "username": "ajie426",
                  "rating": "7",
                  "value": "玩法：\n        每轮补充6个行动力，把行动力用来自己的回合就结束了。行动力可以用于1、挖掘（挖龙洞，有洞的地方才能给龙住）；2、引导（打出龙卡，住到龙洞里）；3、探索（选择一个洞穴，让冒险家从左到右获得资源）。\n        超主观点评：\n        1、游戏流程很顺畅，每张卡上面的文字描述也简单清晰。\n        2、画风可可爱爱，combo和展翅翱翔一样很爽。\n        3、但是非要和鸟比较的话，我还是喜欢鸟多点，鸟带点科普性质，可以阖家欢，龙变成了魔幻背景，受众小了很多。而且这个玩一局的时间比鸟长。感觉2-3人好玩点。"
                },
                {
                  "username": "AL3XK4",
                  "rating": "1",
                  "value": "worst game ever "
                },
                {
                  "username": "alohawild",
                  "rating": "9",
                  "value": "Purchased at Barnes and Noble and add-on materials at Puddles Games and Puzzles"
                },
                {
                  "username": "AmassGames",
                  "rating": "N/A",
                  "value": "https://youtu.be/sDVRxthjrZA"
                },
                {
                  "username": "andykim88",
                  "rating": "N/A",
                  "value": "Sleeved (Arcane Tinmen & MTL)"
                },
                {
                  "username": "Angela888Alpes",
                  "rating": "10",
                  "value": "MIPL 8100"
                },
                {
                  "username": "Anicka",
                  "rating": "10",
                  "value": "2 maty gracza, upgraded resources"
                },
                {
                  "username": "anim8r",
                  "rating": "9",
                  "value": "Sure, Wingspan & Wrymspan are different games, but are they, really? If I had a few thousand games, I could own both, but if I have 50 games, I ain't gonna keep both as no way would I say after a play of Wingspan, \"Let's play something different...how about Wyrmspan?\" So, I feel most will want to choose, and I would choose this. Mainly cause I like dragons more than birds and I prefer the lack of dice for resources. A few more smaller changes make the game feel like a stronger iteration of Wingspan. \n        Pain points: There is an attempt to bring in some player interaction, but it is minimal at best. The randomness of luck-of-draw is still a thing if that what puts you off about Wingspan, Ark Nova etc (I don't mind it too much as I feel the distribution is relatively well balanced and you should walk into such games ready to pivot)\n        \n        My detailed ratings on this & more:\n        https://boardgamegeek.com/blogpost/158398/new-me-february-2024"
                },
                {
                  "username": "Animepops",
                  "rating": "10",
                  "value": "Played at Tokencon 24. Instant favorite and can't wait to own a copy. Excellent production. It is not just a simple re-skin!"
                },
                {
                  "username": "Annabel_Lee",
                  "rating": "N/A",
                  "value": "Spielbound pre-order, $60, not paid"
                },
                {
                  "username": "AnneliesP",
                  "rating": "N/A",
                  "value": "SOS"
                },
                {
                  "username": "apaneto28",
                  "rating": "8",
                  "value": "Played it an early access copy at a local con. It feels like “wingspan plus”, it changes and adds enough wrinkles to the core gameplay loop that are enjoyable and interesting. I specifically enjoy the variable number of action tokens, the rondel of resources, and the cave then dragon ? build order. It’s a solid game and I can see it having staying power alongside wingspan. However, I would not start with this version with new gamers due to the added layer of complexities."
                },
                {
                  "username": "apokai",
                  "rating": "8",
                  "value": "Way better than Winspan. Dragons!!"
                },
                {
                  "username": "Applin_Sauce",
                  "rating": "8",
                  "value": "Definitely need more plays. I really like the mechanics of the game, but I'm also a huge Wingspan fan. However... I'm really not sure I enjoy the action resource (coins) in this game. I really like Wingspan for the limitation it gives everyone, where everyone has an equal number of turns. I also would really like some personal objective cards (or bonus cards), like Wingspan. \n        \n        I also dislike the card design (the graphic design). Some of the art is also meh. Once I heard that the original plan was for dinosaurs - I think that just made so much more sense than this final product. \n        \n        Despite all of my negative comments, the game overall is good. It has the same essence of Wingspan, same feel of some combos and plays. But I felt like a lot of cards were similar to one another. Needs more plays,."
                },
                {
                  "username": "APunktX",
                  "rating": "10",
                  "value": "Wingspan but better in every aspect - Solid 10 for me."
                },
                {
                  "username": "Aranxv",
                  "rating": "5",
                  "value": "it's only a business move."
                },
                {
                  "username": "Aredan1528",
                  "rating": "8.5",
                  "value": "Basically if you like Wingspan I can't see anyone liking this one less it's either even or slightly better."
                },
                {
                  "username": "argonne",
                  "rating": "10",
                  "value": "Mode solo exclusivement et c’est réussi, le livre de dragon fourni avec est vraiment un must. Le matériel est incroyable. Super bon gameplay en solo j’adore. Un jeu avec une longue vie…"
                },
                {
                  "username": "ArianneH",
                  "rating": "N/A",
                  "value": "New in Shrink -- accidentally purchased 2"
                },
                {
                  "username": "arildoaim",
                  "rating": "4",
                  "value": "Still multiplayer solitaire"
                },
                {
                  "username": "Arkeo",
                  "rating": "8.5",
                  "value": "Alphaspel"
                },
                {
                  "username": "ArkhamHorrorFan",
                  "rating": "9.5",
                  "value": "With it's beautiful artwork and light gameplay, it plays smooth like a dragon gliding over a marvelous landscape."
                },
                {
                  "username": "arlettebuss",
                  "rating": "N/A",
                  "value": "Sleeved"
                },
                {
                  "username": "armigero",
                  "rating": "N/A",
                  "value": "game summary complete"
                },
                {
                  "username": "arnaud4matagot",
                  "rating": "9",
                  "value": "Played for real and the game is really good and very enjoyable."
                },
                {
                  "username": "ashurbanipal12",
                  "rating": "N/A",
                  "value": "includes upgraded components and 2 rubber player mats"
                },
                {
                  "username": "astronaut_nz",
                  "rating": "8",
                  "value": "Fun twist on Wingspan. The new mechanics are fun."
                },
                {
                  "username": "avasue",
                  "rating": "N/A",
                  "value": "1/31/24 purchased "
                },
                {
                  "username": "AxeVince",
                  "rating": "N/A",
                  "value": "Aurélie OK"
                },
                {
                  "username": "Aysix",
                  "rating": "10",
                  "value": "I love wingspan and was worried that this would be too much of the same. But it is not. Definitely inspired by wingspan, but it is its own game and I can happily have both in my collection. Artwork is of course stunning. The theme, the hatchlings, the caves and the \"go for walkies\" mechanism means that this will hit my table more often than wingspan."
                },
                {
                  "username": "Azimmer",
                  "rating": "N/A",
                  "value": "YLGS"
                },
                {
                  "username": "B3rthold",
                  "rating": "6.8",
                  "value": "+ artwork und material\n        + anspruchsvoll aber nicht komplex\n        + einfache Regeln, \"kurze\" Spieldauer\n        - Langzeitspielspaß fraglich"
                },
                {
                  "username": "BambooShoot",
                  "rating": "N/A",
                  "value": "1–5"
                },
                {
                  "username": "BananaGus",
                  "rating": "8",
                  "value": "As much as I enjoy Wingspan, I like the refreshing changes and untethering from real world aviary here. A lot of creativity can happen when you can make up mystical worlds rather than having to focus on accurately depicting elements of the real world. \n        \n        A nice riff on the Wingspan style game. Well done."
                },
                {
                  "username": "BastardCafe",
                  "rating": "N/A",
                  "value": "2 New"
                },
                {
                  "username": "batcut",
                  "rating": "N/A",
                  "value": "Solo."
                },
                {
                  "username": "Bateyes",
                  "rating": "N/A",
                  "value": "Ich habe:\n        - Basisspiel.\n        - Upgrade-Pack (Holzkomponenten & Metallmünzen) (VORBESTELLT BEIM STONEMAIER EUROPE SHOP) (Addon).\n        \n        Es fehlt noch:\n        - 5 Playmats, welche die Playerboards ersetzen (BEI FEUERLAND FRAGEN!) (Addon)."
                },
                {
                  "username": "baurfamily",
                  "rating": "8",
                  "value": "I really enjoy this game, played it a few times and enjoyed them all. For some reason I can’t put my finger on, I probably won’t buy my own copy. I already own Wingspan (a slightly lighter weight game) and Raising Robots (a heavier weight game) and so this is in an awkward spot between the two. If I didn’t own one or the others of this this would be a definite purchase for me."
                },
                {
                  "username": "Bayley505",
                  "rating": "10",
                  "value": "Bought it because I enjoyed Wingspan.\n        Incredibly fun, great for small groups 2-3 players!"
                },
                {
                  "username": "bbritt33",
                  "rating": "8.5",
                  "value": "I wouldn't call this reskinned Wingspan. They definitely exist in the same mechanical tree, but Wyrmspan offers new mechanics, deeper competitiveness, and juicier combos. Overall a great game that I could see enjoying for a long time to come. \n        \n        That said, Wyrmspan and Wingspan can exist on the same shelf. Wingspan still occupies that \"game for after a long day of work,\" where Wyrmspan occupies somewhere more cerebral. "
                },
                {
                  "username": "bcnevan",
                  "rating": "6",
                  "value": "Mechanically, this iteration is much stronger than Wingspan. Everything gameplay-related feels a bit richer, from the decision space, to the tableau building, and the like. The guild space races add a neat bit of interactive tension to the experience. I especially don't miss the bird house and the resource mechanism of Wingspan. About the only thing this game lacks, in comparison to its predecessor, is the amusing nature of Wingspan's connection of bird powers to their real world counterparts. There are clear archetypes to the creatures in Wyrmspan, but the fantastical nature of dragons, wyrms, etc., doesn't quite hit the same spot.\n        \n        All that said, this is still Wingspan at its core. Those turned off completely by Wingspan, won't be convinced by this iteration. Those that found some positives in Wingspan, but found it mechanically weak, may have success here. I'm more in that latter camp than the former. At higher player counts, the game still drags. But that's the nature of this sort of game. Add players, add chunks of play time. For that reason, I'm likely only to play this at 3P or under.\n        \n        The game, however, does seem to heavily incentivize, and reward, the player that first manages to build out a row completely. They can start spamming that row's engine earlier, which gains them pretty clear advantages. There are some engine-types that can overcome someone who first finishes a lane, but they don't show up every game. That does push me away from the game a bit and diminishes my interest in playing it with new-ish players."
                },
                {
                  "username": "BeccaKaye6891",
                  "rating": "N/A",
                  "value": "5 Player"
                },
                {
                  "username": "bestea",
                  "rating": "3",
                  "value": "Not worth to buy if You got Wingspan. Art/design is worse."
                },
                {
                  "username": "Betbet",
                  "rating": "8",
                  "value": "Jeu super, mais seulement déçu par le niveau pitoyable de rangement offert dans la boîte de jeu. Une fois les cartes dans des sleeves, les tonnes de ressources et cartes se promènent dans la boîte. Faire attention quand ont l'ouvre et c'est si seulement elle ferme."
                },
                {
                  "username": "Bevr",
                  "rating": "7",
                  "value": "Played this game once. This game has fun elements to it, but it's fairly flawed. I would never give this game a 10 due to those flaws. \n        \n        If you dislike games with low player interaction you will deeply dislike this game. Several actions in this game grant you extra turns and managing to minmax this can allow you to play by yourself. You can also manage to 'softlock' yourself, making it so entire rounds of the game must be skipped. Clearly the devs realized this, but didn't think to rework the game's core system. It leads to zero player interaction sometimes. I disagree with people who compare games like Wingspan to solitaire, but this game is giving that argument credit.\n        \n        It's possible that I played this game incorrectly. It's hard to believe that this game could have so many weird quirks and flaws. Wingspan is much tighter game even with it's flaws. This game is good and fun, but it's unfortunately part of a franchise so it's impossible to not draw comparison to the better game."
                },
                {
                  "username": "Big Bad Lex",
                  "rating": "3",
                  "value": "Because the board gaming world really needs a reskin of a Frankenstein monster of a stitched together mongrel without a single original idea."
                },
                {
                  "username": "Bigf00t159",
                  "rating": "7",
                  "value": "Played."
                },
                {
                  "username": "bigguglie",
                  "rating": "N/A",
                  "value": "Hold: Miniature Market"
                },
                {
                  "username": "bjdmx1",
                  "rating": "10",
                  "value": "I love this game! I've played it 2x and feel I'm going to like this game more than Wingspan. I bought the mats and deluxe resources. Everything was well done and I really enjoy the coins. The artwork is gorgeous, I liked the subtle nods to other famous  dragons. My group who played the with me also all loved the game. We all liked the changes from Wingspan and felt they were meaningful and well balanced. I was nervous this was gonna just be a reskin but ther are meaningful differences."
                },
                {
                  "username": "blackdani",
                  "rating": "10",
                  "value": "Just doing my part to troll the 1s"
                },
                {
                  "username": "Blee087",
                  "rating": "8",
                  "value": "Sleeved"
                },
                {
                  "username": "blondebunbun",
                  "rating": "N/A",
                  "value": "Need to try"
                },
                {
                  "username": "BlueRoninRob",
                  "rating": "9",
                  "value": "I prefer the real-world subject of Wingspan over the fantastical nature of dragons that is the basis for Wyrmspan.  Set that aside and it seems like Wyrmspan is an improvement on Wingspan in almost every area.\n        \n        I do kind of miss Wingspans bonus cards that would give each player different objectives.  Now you just have the end-of-round goals and the dragon guild, which are all public information.\n        \n        In Wingspan I could sometimes feel like the dice just weren't working in my favor.  No dice here in Wyrmspan.  The card draw is really the only luck element you need to deal with.  Now when I end up low on resources, I know that the only one to blame is me.  Rounds don't get shorter as you build your engine.\n        \n        There are many options for squeezing out just one more point at the endgame, including passing and ending your round early.  Practically everything you have at the end of the game contributes to your score so while you will almost certainly feel like you didn't optimize everything, you won't feel like you're being punished for having more resources, dragons, or caves than you could use.\n        \n        This one will definitely hit the table again."
                },
                {
                  "username": "bluesol",
                  "rating": "5",
                  "value": "Did not enjoy this nearly as much as Wingspan. Felt like they added even more luck with more random card markets"
                },
                {
                  "username": "bneffer",
                  "rating": "8",
                  "value": "I enjoyed this more than Wingspan. The theme, the art, the additional mechanisms on the side boards - I liked it all more. THe only thing missing was the realism, but fantasy and dragons are a theme I don't seem to get tired of."
                },
                {
                  "username": "bnordeng",
                  "rating": "7",
                  "value": "Wyrmpan is a lot like Wingspan but with dragons. I've only played Wingspan once but don't know enough about it to make a reasonable comparison. Wyrmspan is fine and also a engine-building game where there isn't a whole lot of interaction.  Interesting game and not amazing."
                },
                {
                  "username": "boettler",
                  "rating": "8",
                  "value": "Probably 50% different from Wingspan such that it can feel like a new game, but with some similar mechanisms. The Wyrm/Dragon theme is only vaguely part of the gameplay. It could have easily been other topics. This could be a gateway game for people who mainly play D&D to get into board games."
                },
                {
                  "username": "bogovski",
                  "rating": "10",
                  "value": "Here is a ten, just for the respect to awsome games SM made and to piss of all the negative smartasses who rated it 1 because they don't like wingspan. I am sure it will be more than solid game."
                },
                {
                  "username": "Bondy034",
                  "rating": "8.5",
                  "value": "I wasn't expecting much from this game, as I thought Wingspan was just fine but to my surprise this is a far more interesting game!  The theme is still not particularly deep but the gameplay has been tweaked and tuned, so that there's lots to think of each turn and less 'obvious' decisions.  Definitely a keeper here!"
                },
                {
                  "username": "bonnyaclyde",
                  "rating": "N/A",
                  "value": "I like this game better than wingspan it seems much more balanced but it is more complex which Im ok with but it's not near as fitting for nongamers."
                },
                {
                  "username": "Bookseller",
                  "rating": "N/A",
                  "value": "With Stonemaier upgrade pack."
                },
                {
                  "username": "BookWyrMom",
                  "rating": "N/A",
                  "value": "First thing that catches my eye on here. ;)"
                },
                {
                  "username": "Boolbar",
                  "rating": "8.5",
                  "value": "Prefer this to Wingspan, especially the nice easy to use solo mode.  Plus, dragons!"
                },
                {
                  "username": "Boombastix",
                  "rating": "1",
                  "value": "Boring."
                },
                {
                  "username": "Bordspelwereld",
                  "rating": "7.5",
                  "value": "bij Heije"
                },
                {
                  "username": "boredbeyondbelief",
                  "rating": "8",
                  "value": "Not the amazing game Wingspan is, but it has an enjoyable play. Each move makes you feel like you are accomplishing something and progressing forward. It had some really fun timing puzzles. It does feel like you might be able to do too much in it - all players in our game almost filled their boards and one did. And it does get a little crunchy at the end when you are trying to maximize your last couple of moves (falls for the one Wingspan problem that the last turn or two can have you limping to the finish)."
                },
                {
                  "username": "Born-of-Ashes",
                  "rating": "9",
                  "value": "Fixes a lot of the gripes I have with Wingspan and adds flavor that appeals to me. Activating the rows now costs eggs so the OP combos are much harder to put together, but still at least a few are achievable. Some things that seem small but make a big difference in agency: being able to activate rows when you want instead of just when you play a new animal, having tracks that give boni on every space rather than dead spaces, option to bank actions into future rounds.\n        I’m still not a huge fan of the goals since they distract from building a tightly synergizing engine and now there is the guild board for interaction (already plenty of blocking going on in the market)."
                },
                {
                  "username": "bponnaluri",
                  "rating": "7",
                  "value": "I enjoyed playing Wyrmspan.\n        \n        I feel like the game did a great job of taking inspiration from Wingspan while adding mechanics that provide a new experience and interesting choices. I feel like the rules were also relatively easy to pick up due to my experience with Wingspan and other Euros.\n        \n        On the other hand, the game feels like somewhat of an efficiency puzzle where I need to plan multiple moves ahead to optimize results. I prefer games where planning ahead is less important and making tactical mistakes is less consequential."
                },
                {
                  "username": "brettspielverein_kuf",
                  "rating": "N/A",
                  "value": "BSV"
                },
                {
                  "username": "breyfunk",
                  "rating": "10",
                  "value": "Amazing game.  This is NOT just Wingspan with a new theme, there are a lot of things going on here that aren’t present in the original game."
                },
                {
                  "username": "bryden42",
                  "rating": "N/A",
                  "value": "With upgraded components and playmat"
                },
                {
                  "username": "Bryteness",
                  "rating": "10",
                  "value": "Wyrmspan is a fantastic game! It quickly became one of my favorite games. The mechanics feel smoother than Wingspan in some ways but more complex in others resulting in a very rewarding experience while playing."
                },
                {
                  "username": "bs2sjh",
                  "rating": "9",
                  "value": "Great game. More interesting than Wingspan and gives lots opportunity for developing strategies. Really beautiful on the table."
                },
                {
                  "username": "BubbleheadAmber",
                  "rating": "7.5",
                  "value": "PROS:\n        - The changes on how players gather different resources are refreshing enough for the game to feel different compared to Wingspan \n        \n        CONS:\n        - The actions aren't as intuitive as Wingspan, which makes this game suited for players experienced in Wingspan than as a gateway game\n        - Game is even more multiplayer solitaire, as the resource pool (i.e. bird feeder in wingspan) is now spread into a player's cards and actions instead of via the shared birdfeeder\n        \n        FINAL THOUGHTS:\n        It's 80% wingspan, with the all of its pros and cons. Perfect for those who love wingspan and are looking for a new take on the engine building system"
                },
                {
                  "username": "buckbagr",
                  "rating": "9",
                  "value": "After two plays one solo and one 2p it is obvious this will be a game for us.  Wingspan may very well be my favorite game of all time.  So my opinion may reflect this, but Wyrmspan is a very good game that teaches easy and plays pretty fast.  The engine building here can be epic, and almost everything you do gets you something.  Excavate  a cave, get something.  Entice a dragon, get something.  Explore your cave system, get lots of somethings.  We are so impressed by this, and highly recommend it.  The components are great, and I also recommend upgrading these with the upgrade pack."
                },
                {
                  "username": "bugnutz",
                  "rating": "N/A",
                  "value": "1 to 5 Players"
                },
                {
                  "username": "bvongunten",
                  "rating": "7",
                  "value": "Great theme, great game ;)"
                },
                {
                  "username": "camidon",
                  "rating": "8",
                  "value": "Played with friends. Nice twist on Wingspan. Similar, yet feels fresh. Doesn't just feel like a money-grab knock off. I still greatly prefer the integrated biologic theme of Wingspan with its very refined gameplay.  Yet, this beat my expectations. Good game."
                },
                {
                  "username": "cardboardcorner",
                  "rating": "N/A",
                  "value": "30A"
                },
                {
                  "username": "cardboardcornerlpm",
                  "rating": "N/A",
                  "value": "12E"
                },
                {
                  "username": "carlcorey",
                  "rating": "9",
                  "value": "Temporarily giving it a 9 after one play. It has more depth and more interesting combos than Wingspan, but why was it so easy to fill the tableau?"
                },
                {
                  "username": "CarolineBlack",
                  "rating": "8.2",
                  "value": "A slightly more complex version of Wingspan. I liked the fresh take although I am not overly enamoured by the theme. The guild track provided a good way out of trouble if you couldn’t get the cards you wanted. I certainly didn’t miss the bird feeder but it’s a tighter game. It has a great sense of escalation with you being able to pull off great combos towards the end of the game."
                },
                {
                  "username": "Catyrpelius",
                  "rating": "7.5",
                  "value": "Its alright. Its no better or worse then wingspan which I guess is pretty good praise. \n        \n        The average gamer doesn't need both though, my recommendation would be to pick whichever theme you enjoy more. \n        \n        I feel like I'm being overly critical of Stonemaier's games lately but they really been feeling like cash grabs..."
                }
              ]
            },
            "marketplace": {
              "listings": [
                {
                  "listDate": "Mon, 19 Feb 2024 12:44:47 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "49.00"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3392616",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Mon, 04 Mar 2024 10:10:26 +0000",
                  "price": {
                    "currency": "USD",
                    "value": "75.00"
                  },
                  "condition": "likenew",
                  "notes": "This is for a copy of Wyrmspan in excellent condition along with the deluxe upgrade pack (resources and coins) worth $35 by itself&#10;&#10;Buyer pays shipping from 76537. Payment accepted through PayPal's or Venmo. Goods & Services users please add $3.00 to the total payment, so we share costs equally. Shipping will be in the $10-15 range depending on where in CONUS you live.&#10;&#10;Feel free to check some of my other games, as I am happy to offer discounted shipping for multiple games purchased. GM me for questions",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3404166",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Mon, 04 Mar 2024 10:12:43 +0000",
                  "price": {
                    "currency": "USD",
                    "value": "40.00"
                  },
                  "condition": "new",
                  "notes": "**NOTE: this is not for the game, for the upgrade pack**&#10;Unopened and in excellent condition&#10;&#10;Ships from 76537 zip code. Buyer pays shipping Feel free to GM me for a shipping quote. Shipping will be in the $6-12 range depending on where in CONUS you live.&#10;&#10;Payment accepted through PayPal's or Venmo. Goods & Services users please add $1.50 to the total payment, so we share costs equally.&#10;&#10;Feel free to check some of my other games, as I am happy to offer discounted shipping for multiple games purchased. GM me for questions",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3404169",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Sat, 09 Mar 2024 15:35:46 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "59.00"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3407935",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Thu, 28 Mar 2024 12:49:19 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "64.99"
                  },
                  "condition": "new",
                  "notes": "Mind that we sell on multiple platforms, and sometimes there can be a stock difference.&#10;Full list https://www.boardgamegeek.com/geekmarket/user/karadoc&#10;Shipping Information&#10;&#10;You pay 1 shipping fee for upto 20kg&#10;&#10;Bank Transfer to BNP Paribas 001-4570423-53&#10;IBAN BE53001457042353 BIC GEBABEBB&#10;Full list https://www.boardgamegeek.com/geekmarket/user/karadoc&#10;Paypal address: paypal@outpost.be pay as friends and family, otherwise add 5% fee's.Bank information for payments form outside Belgium&#10;IBAN BE53001457042353 BIC GEBABEBB",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3420799",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Thu, 28 Mar 2024 14:00:50 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "52.50"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3420849",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Fri, 29 Mar 2024 12:17:10 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "59.00"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3421344",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Sat, 30 Mar 2024 11:43:26 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "54.00"
                  },
                  "condition": "new",
                  "notes": "Game weight: 2.550 kg",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3421950",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Sun, 31 Mar 2024 07:04:07 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "59.90"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3422442",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Fri, 05 Apr 2024 17:28:40 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "60.00"
                  },
                  "condition": "new",
                  "notes": "Spieleranzahl: 1 bis 5 Spieler&#10;Spieldauer: 90 Minuten&#10;Altersempfehlung: 12+&#10;&#10;Schwingenschlag - Baut euer H&#195;&#182;hlenlabyrinth aus und lockt sch&#195;&#182;ne und m&#195;&#164;chtige Drachen an.&#10;Ihr seid angehende Drachenprofis in der Welt von Schwingenschlag &#226;&#128;&#147; einem Ort, an dem Drachen aller Arten, Gr&#195;&#182;&#195;&#159;en und Farben den Himmel bev&#195;&#182;lkern. Grabt ein verborgenes Labyrinth aus, das ihr k&#195;&#188;rzlich auf eurem Land entdeckt habt, und siedelt diese wundersch&#195;&#182;nen Kreaturen in euren H&#195;&#182;hlen an. Im Verlauf eines Schwingenschlag-Spiels erschafft ihr ein vielf&#195;&#164;ltiges Drachenhabitat.&#10;Ihr beginnt mit 3 ausgegrabenen Feldern &#226;&#128;&#147; dem jeweils ersten Feld von links in eurer Karmesin-Kaverne, eurer Gold-Grotte und eurem Amethyst-Abgrund. Im Spielverlauf kooperiert mit der Drachengilde, grabt ihr weitere Bereiche eures H&#195;&#182;hlensystems aus, und lockt Drachen an, deren m&#195;&#164;chtige F&#195;&#164;higkeiten ihr raffiniert kombinieren k&#195;&#182;nnt.&#10;&#10;Schwingenschlag wurde durch Fl&#195;&#188;gelschlag, ein Spiel von Elizabeth Hargrave, inspiriert und nutzt dieselben grundlegenden Mechaniken. Elisabeth hat an der Entwicklung des Spieles mitgewirkt. Schwingenschlag ist ein wenig komplexer und alle Spielaspekte wurden speziell an die Drachenthematik angepasst.&#10;&#10;Inhalt:&#10;183 Drachenkarten&#10;75 H&#195;&#182;hlenkarten&#10;55 Eier&#10;48 pers&#195;&#182;nliche Marker &#10;45 M&#195;&#188;nzen&#10;25 Fleischmarker&#10;25 Goldmarker&#10;25 Kristallmarker&#10;25 Milchmarker&#10;20 Multiplikatoren&#10;10 (doppelseitige) Spielhilfen&#10;10 (doppelseitige) Zielpl&#195;&#164;ttchen&#10;5 Gildensteine&#10;5 H&#195;&#182;hlentableaus&#10;5 Spielfiguren&#10;4 (doppelseitige) Gildenpl&#195;&#164;ttchen&#10;1 Drachengildenkreis&#10;1 Kartentafel&#10;1 Rundentafel&#10;1 Startmarker&#10;1 Wertungsblock&#10;https://youtu.be/v43GxrwLhWU&#10;&#10;Mit Spielregeln in folgenden Sprachen: DE",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3426052",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Tue, 09 Apr 2024 11:34:32 +0000",
                  "price": {
                    "currency": "GBP",
                    "value": "46.95"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3428574",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Mon, 15 Apr 2024 08:10:28 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "61.00"
                  },
                  "condition": "new",
                  "notes": "Golden Meeple is an online shop since 2015 with attractive prices.&#10;More than 6000 items are listed, half of which are in stock.&#10;Visit our website www.goldenmeeple.be and if you have any questions, send us an email info@goldenmeeple.be&#10;Prices :&#10;All prices are VAT (Belgian 21%) included and shipping costs are not included&#10;For sales outside the EU, reduce the price by 21%.&#10;Payments :&#10;Payment methods are :&#10;Bank transfer (free of charge)&#10;Paypal (+5% fee)&#10;On our website, many payment methods without fees.&#10;Availability:&#10;When we add the item to BoardGameGeek, it is in stock.&#10;As we sell items on different platforms, it is possible that they are out of stock at the time of your order.&#10;If this happens, we will inform you and try to restock it as soon as possible. Please do not hesitate to contact us to enquire about product availability!&#10;Before confirming your order, we will always check the availability of the product.&#10;Delivery :&#10;Belgium Mondial Relay &#226;&#130;&#172;2.99&#10;Belgium Domicile Bpost &#226;&#130;&#172;5.7&#10;France Mondial Relay &#226;&#130;&#172;7.9&#10;France Domicile DPD &#226;&#130;&#172;15&#10;Luxembourg Mondial Relay &#226;&#130;&#172;3.75&#10;Germany Domicile &#226;&#130;&#172;10.2&#10;Spain Domicile &#226;&#130;&#172;11.5&#10;Netherlands Domicile &#226;&#130;&#172;9&#10;Austria, Italy, Portugal Home 15&#226;&#130;&#172;&#10;Switzerland and UK by DPD ask for the cost.&#10;For other destinations, please ask.&#10;Pre-orders and Kickstarter :&#10;Pre-orders and Kickstarter purchases are considered final when paid.&#10;It is possible to cancel a paid pre-order or kickstarter, but an administration fee of 5&#226;&#130;&#172; will be charged per item.&#10;Follow us :&#10;Facebook : https://www.facebook.com/CedGoldenMeeple&#10;Instagram : https://www.instagram.com/goldenmeeple/?hl=fr&#10;Youtube : https://www.youtube.com/@ludicorner/videos",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3432921",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Mon, 22 Apr 2024 12:41:10 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "60.00"
                  },
                  "condition": "new",
                  "notes": "Brand new copy of the game, in shrink wrap.&#10;&#10;Shipping to EU would be 20-25 euro, depending on location, and the package should arrive in 7-10 days. Elsewhere &#226;&#128;&#147; please ask!&#10;&#10;Check out my other products for sale as well! If you buy multiple items, I will combine shipping costs. It&#226;&#128;&#153;s much cheaper this way.",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3438163",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Fri, 26 Apr 2024 11:22:54 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "61.99"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3440994",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Sun, 28 Apr 2024 04:27:35 +0000",
                  "price": {
                    "currency": "USD",
                    "value": "75.00"
                  },
                  "condition": "likenew",
                  "notes": "Includes resource upgrade pack and one rubber playmat.&#10;buyer pays shipping via Pirateship",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3442230",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Tue, 30 Apr 2024 18:44:14 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "64.99"
                  },
                  "condition": "new",
                  "notes": "weight: 2501 grams + packaging",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3444089",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Mon, 06 May 2024 10:10:12 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "65.00"
                  },
                  "condition": "new",
                  "notes": "Son",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3448353",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Tue, 07 May 2024 17:49:41 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "50.20"
                  },
                  "condition": "new",
                  "notes": "",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3449510",
                    "title": "marketlisting"
                  }
                },
                {
                  "listDate": "Wed, 15 May 2024 10:55:54 +0000",
                  "price": {
                    "currency": "EUR",
                    "value": "64.00"
                  },
                  "condition": "new",
                  "notes": "PACKAGING- We are trying to reuse packaging material as often as possible. Please be aware that boxes in most cases will be reused or have other branding etc. &#10;&#10;At this moment we only offering goods for supply within the EU and EEA. We ship to LITHUANIA, LATVIA , ESTONIA , FINLAND,  POLAND , SWEDEN, GERMANY, BELGIUM, HUNGARY and other EU countries.&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage In Lithuania takes approximate 1-2 working days&#10;&#10;Postage and packing fee starts from 3.49 &#226;&#130;&#172; applies up to 10kg (33x39x42) using Itella Smartpost, Omniva, DPD or LP Express&#10;&#10;&#226;&#128;&#139;&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to Latvia .&#10;&#10;Flat postage and packing fee starts from 5.99 &#226;&#130;&#172; up to 10kg (33x39x42) and delivery takes approximate 2-4 working days&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to Estonia.&#10;&#10;Flat postage and packing starts from 5.99 &#226;&#130;&#172; up to 10kg (33x39x42) and delivery takes approximate 3-5 working days&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to Finland.&#10;&#10;Flat postage and packing fee of 6.99 &#226;&#130;&#172; to Finland applies up to 10kg (33x39x42) and delivery takes approximate 3-5 working days&#10;&#10;Parcels sent using Smartpost trackable services to postal boxes or HRX&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to Poland.&#10;&#10;Flat postage and packing fee from 8.99 &#226;&#130;&#172; to Poland applies up to 5kg (33x39x42) and delivery takes approximate 3-5 working days&#10;&#10;Parcels sent using trackable services.&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to Sweden.&#10;&#10;Flat postage and packing fee from 14.99 &#226;&#130;&#172; to Sweden applies up to 5kg (33x39x42) and delivery takes approximate 5-7 working days&#10;&#10;Parcels sent using HRX trackable services to postal boxes.&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to Germany, Denmark, Belgium, Netherlands takes approximate 5-7 working&#10;&#10;Flat postage and packing fee from 8.99 &#226;&#130;&#172; to applies up to 20kg (33x39x42)&#10;&#10;Parcels sent using Itella Smartpost/GLS trackable services.&#10;&#10;Postage to Bulgaria, Greece, Italy, Portugal, Spain takes approximate 5-7 working&#10;&#10;Flat postage and packing fee from 9.99 &#226;&#130;&#172; to applies up to 20kg (33x39x42)&#10;&#10;Parcels sent using Itella Smartpost/GLS trackable services.&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to other EU countries&#10;&#10;Croatia, Slovenia Slovakia, Austria, Czeck Republic, Luxemburg, Hungary , France and delivery takes approximate 5-7 working&#10;&#10;Flat postage and packing fee from 16.99 &#226;&#130;&#172; to applies up to 5kg (33x39x42)&#10;&#10;Parcels sent using Itella Smartpost/GLS trackable services.&#10;&#10;&#226;&#128;&#139;&#10;&#10;Postage to UK&#10;&#10;Delivery takes approximate 5-7 working&#10;&#10;Flat postage and packing fee from 9.99 &#226;&#130;&#172; to applies up to 5kg (33x39x42)&#10;&#10;Parcels sent using trackable services.&#10;&#10;We aim to dispatch all orders within 1 working day. &#10;&#10;If you have specific queries regarding delivery, please email us at info@manohobis.com &#10;&#10;PACKAGING- We are trying to reuse packaging material as often as possible. Please be aware that boxes in most cases will be reused or have other branding etc.",
                  "link": {
                    "href": "https://boardgamegeek.com/market/product/3454983",
                    "title": "marketlisting"
                  }
                }
              ]
            },
            "statistics": {
              "page": "1",
              "ratings": {
                "usersRated": "3520",
                "average": "8.1203",
                "bayesAverage": "7.03463",
                "ranks": [
                  {
                    "type": "subtype",
                    "id": "1",
                    "name": "boardgame",
                    "friendlyName": "Board Game Rank",
                    "value": "424",
                    "bayesAverage": "7.03463"
                  },
                  {
                    "type": "family",
                    "id": "5497",
                    "name": "strategygames",
                    "friendlyName": "Strategy Game Rank",
                    "value": "239",
                    "bayesAverage": "7.18424"
                  },
                  {
                    "type": "family",
                    "id": "5499",
                    "name": "familygames",
                    "friendlyName": "Family Game Rank",
                    "value": "64",
                    "bayesAverage": "7.21354"
                  }
                ]
              },
              "stdDev": "1.49025",
              "median": "0",
              "owned": "8893",
              "trading": "23",
              "wanting": "352",
              "wishing": "4091",
              "numComments": "719",
              "numWeights": "128",
              "averageWeight": "2.7266"
            },
            "versions": [
              {
                "id": "696497",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/iOQM0RTgyN8xwAZ88ylTQw__thumb/img/i9N83I3YReCUNlUPpuI7dhMViKk=/fit-in/200x150/filters:strip_icc()/pic7949049.jpg",
                "image": "https://cf.geekdo-images.com/iOQM0RTgyN8xwAZ88ylTQw__original/img/6T0UkAxLHTKcmSSv04MpIYoK7Qw=/0x0/filters:format(jpeg)/pic7949049.jpg",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "7992",
                    "value": "MINDOK"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2180",
                    "value": "Czech"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Czech edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              },
              {
                "id": "696660",
                "type": "boardgameversion",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "40415",
                    "value": "Divercentro"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2200",
                    "value": "Portuguese"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Divercentro Portuguese edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              },
              {
                "id": "700555",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/6wle3E2Mtoa1oYpr_K_4BA__thumb/img/pF4gX436dDGDY3wM33GGiMA7V88=/fit-in/200x150/filters:strip_icc()/pic8003102.png",
                "image": "https://cf.geekdo-images.com/6wle3E2Mtoa1oYpr_K_4BA__original/img/XZPMcWg3cUV6qWF0KW4KX4wLDAo=/0x0/filters:format(png)/pic8003102.png",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "267",
                    "value": "999 Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2183",
                    "value": "Dutch"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Dutch edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "999-WYR01",
                "width": "11.6535",
                "length": "11.6535",
                "depth": "2.75591",
                "weight": "5.29109"
              },
              {
                "id": "695503",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__thumb/img/Ic3yRKTjVe26RgDzIdLsKn8Hztk=/fit-in/200x150/filters:strip_icc()/pic7947338.png",
                "image": "https://cf.geekdo-images.com/oXUkkh9uq3zBVWQ8mbgMfQ__original/img/MW6S23AwpGGu0Rx05X_aByK0lmA=/0x0/filters:format(png)/pic7947338.png",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2184",
                    "value": "English"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "English edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "11.811",
                "length": "11.811",
                "depth": "2.75591",
                "weight": "5.73202"
              },
              {
                "id": "696837",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/JQgGNPezVapdKdq9Ms4yXQ__thumb/img/ULB_yGr_fGJ4CzKSQhL0VECamLs=/fit-in/200x150/filters:strip_icc()/pic7949112.jpg",
                "image": "https://cf.geekdo-images.com/JQgGNPezVapdKdq9Ms4yXQ__original/img/mf14BhYG182OnZ0SBYKME5-vGUM=/0x0/filters:format(jpeg)/pic7949112.jpg",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "5400",
                    "value": "Matagot"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2187",
                    "value": "French"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "French edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "11.811",
                "length": "11.811",
                "depth": "2.75591",
                "weight": "5.73202"
              },
              {
                "id": "696483",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/ZELlvZGaXAaj4RClTGDEZQ__thumb/img/ERfrYUl4fe8JLtcUrzfnNkF6Mlw=/fit-in/200x150/filters:strip_icc()/pic7987176.png",
                "image": "https://cf.geekdo-images.com/ZELlvZGaXAaj4RClTGDEZQ__original/img/7DO3I-E9jMxPIruDh50W_n7MWeQ=/0x0/filters:format(png)/pic7987176.png",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "22380",
                    "value": "Feuerland Spiele"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2188",
                    "value": "German"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "German edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "11.6535",
                "length": "11.6535",
                "depth": "2.91339",
                "weight": "5.52919"
              },
              {
                "id": "696477",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/ObHIyXUns_cZ6Il9qgBt3Q__thumb/img/sBS-hPh9_p09LxnFqa58ygTwoes=/fit-in/200x150/filters:strip_icc()/pic7956134.png",
                "image": "https://cf.geekdo-images.com/ObHIyXUns_cZ6Il9qgBt3Q__original/img/rkH5XGI9KkLytA5khixT5p-UgnQ=/0x0/filters:format(png)/pic7956134.png",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "42325",
                    "value": "Grok Games"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2200",
                    "value": "Portuguese"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Grok Games Portuguese edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "11.811",
                "length": "11.811",
                "depth": "2.75591",
                "weight": "5.73202"
              },
              {
                "id": "704654",
                "type": "boardgameversion",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "6194",
                    "value": "Delta Vision Publishing"
                  },
                  {
                    "type": "language",
                    "id": "2191",
                    "value": "Hungarian"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Hungarian edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              },
              {
                "id": "710629",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/XUAg84b9BeTpSdWWLCTFAQ__thumb/img/nVwafnhIICMJS-r-Ob0YworuQ7U=/fit-in/200x150/filters:strip_icc()/pic8143320.png",
                "image": "https://cf.geekdo-images.com/XUAg84b9BeTpSdWWLCTFAQ__original/img/zZBkMLWVLEfwM6lwpUyDITOwmyQ=/0x0/filters:format(png)/pic8143320.png",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "4785",
                    "value": "Ghenos Games"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2193",
                    "value": "Italian"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Italian edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "GHE273",
                "width": "11.811",
                "length": "11.811",
                "depth": "2.75591",
                "weight": "0"
              },
              {
                "id": "697463",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/YGQztBQ_VJDLH795cY6iVA__thumb/img/qx3ponos5ySPrd1NraOn4eyu6hg=/fit-in/200x150/filters:strip_icc()/pic7960111.jpg",
                "image": "https://cf.geekdo-images.com/YGQztBQ_VJDLH795cY6iVA__original/img/XF6xlrQIUJICkKgahCfsft7n7IE=/0x0/filters:format(jpeg)/pic7960111.jpg",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "7466",
                    "value": "Rebel Sp. z o.o."
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgameartist",
                    "id": "131233",
                    "value": "Clémentine Campardou"
                  },
                  {
                    "type": "language",
                    "id": "2199",
                    "value": "Polish"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Polish edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "STM850",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              },
              {
                "id": "697767",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/B3SjMAXcJevAxhsT6V_vmw__thumb/img/sBVn4XHr0Jz0MKnuaHtRwVVFt3M=/fit-in/200x150/filters:strip_icc()/pic7963789.jpg",
                "image": "https://cf.geekdo-images.com/B3SjMAXcJevAxhsT6V_vmw__original/img/Q71bmVvyHSSR7zuf2sN6u7y5mxY=/0x0/filters:format(jpeg)/pic7963789.jpg",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "30677",
                    "value": "Maldito Games"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "language",
                    "id": "2203",
                    "value": "Spanish"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Spanish edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              },
              {
                "id": "710366",
                "type": "boardgameversion",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "36763",
                    "value": "Surfin' Meeple China"
                  },
                  {
                    "type": "language",
                    "id": "2181",
                    "value": "Chinese"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Traditional Chinese edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              },
              {
                "id": "710694",
                "type": "boardgameversion",
                "thumbnail": "https://cf.geekdo-images.com/P6O3YYlr1mQ9ZW7N_EgE6Q__thumb/img/k4f-LBYqYgHBrVj66d12CZQTN-8=/fit-in/200x150/filters:strip_icc()/pic8147529.jpg",
                "image": "https://cf.geekdo-images.com/P6O3YYlr1mQ9ZW7N_EgE6Q__original/img/XLKvYVTkCWoAdh7WOCtRYXspNl0=/0x0/filters:format(jpeg)/pic8147529.jpg",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "32395",
                    "value": "NeoTroy Games"
                  },
                  {
                    "type": "language",
                    "id": "2349",
                    "value": "Turkish"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Turkish edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "11.811",
                "length": "11.811",
                "depth": "2.75591",
                "weight": "0"
              },
              {
                "id": "702728",
                "type": "boardgameversion",
                "links": [
                  {
                    "type": "boardgameversion",
                    "id": "410201",
                    "value": "Wyrmspan"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "23202",
                    "value": "Stonemaier Games"
                  },
                  {
                    "type": "boardgamepublisher",
                    "id": "44209",
                    "value": "Ігромаг"
                  },
                  {
                    "type": "language",
                    "id": "2665",
                    "value": "Ukrainian"
                  }
                ],
                "names": [
                  {
                    "type": "primary",
                    "sortindex": "1",
                    "value": "Ukrainian edition"
                  }
                ],
                "yearPublished": "2024",
                "productCode": "",
                "width": "0",
                "length": "0",
                "depth": "0",
                "weight": "0"
              }
            ],
            "videos": {
              "total": "146",
              "videos": [
                {
                  "id": "495572",
                  "title": "If games could talk - Wyrmspan edition ",
                  "category": "humor",
                  "language": "English",
                  "link": "http://www.youtube.com/watch?v=M55QtLzzsVY",
                  "username": "ghosthack",
                  "userid": "163019",
                  "postdate": "2024-05-15T16:46:04-05:00"
                },
                {
                  "id": "495205",
                  "title": "The Discriminating Gamer: Wyrmspan",
                  "category": "review",
                  "language": "English",
                  "link": "http://www.youtube.com/watch?v=Hlh-Xki77qM",
                  "username": "discriminatingGamer",
                  "userid": "806048",
                  "postdate": "2024-05-13T17:16:21-05:00"
                },
                {
                  "id": "494979",
                  "title": "Wyrmspan  (italiano) // MURASAKI NIGHTS IMPRESSIONI",
                  "category": "other",
                  "language": "Italian",
                  "link": "http://www.youtube.com/watch?v=QIUDPDQB5nI",
                  "username": "Laddiobolocko",
                  "userid": "3025983",
                  "postdate": "2024-05-12T10:07:34-05:00"
                },
                {
                  "id": "494848",
                  "title": "Review de WYRMSPAN en español",
                  "category": "review",
                  "language": "Spanish",
                  "link": "http://www.youtube.com/watch?v=ezBsC76aaXc",
                  "username": "Luisjoey",
                  "userid": "169069",
                  "postdate": "2024-05-11T08:47:14-05:00"
                },
                {
                  "id": "494719",
                  "title": "Je vous explique WYRMSPAN en 10 minutes!",
                  "category": "instructional",
                  "language": "French",
                  "link": "http://www.youtube.com/watch?v=aQx6B7mjiV4",
                  "username": "NoiramB",
                  "userid": "2801510",
                  "postdate": "2024-05-10T09:46:53-05:00"
                },
                {
                  "id": "494433",
                  "title": "Schwingenschlag - Regeln und Meinung - Brettspiel Teddy",
                  "category": "review",
                  "language": "German",
                  "link": "http://www.youtube.com/watch?v=HHw0eNEboRc",
                  "username": "BrettSpielTeddy",
                  "userid": "2423700",
                  "postdate": "2024-05-08T12:20:47-05:00"
                },
                {
                  "id": "494423",
                  "title": "Unboxing w/3D components",
                  "category": "unboxing",
                  "language": "Portuguese",
                  "link": "http://www.youtube.com/watch?v=PDdooP0lnHI",
                  "username": "sesifredo",
                  "userid": "527761",
                  "postdate": "2024-05-08T11:30:00-05:00"
                },
                {
                  "id": "494142",
                  "title": "Wyrmspan Board Game Gameplay | Board Game In A Minute #shorts",
                  "category": "other",
                  "language": "English",
                  "link": "http://www.youtube.com/watch?v=iPxs9AuO0D4",
                  "username": "jourdo",
                  "userid": "926699",
                  "postdate": "2024-05-07T01:00:57-05:00"
                },
                {
                  "id": "494029",
                  "title": "Wyrmspan - Reseña & Opinión - ¿De que Va? - ¿MERECE LA PENA?",
                  "category": "review",
                  "language": "Spanish",
                  "link": "http://www.youtube.com/watch?v=fz2ST8fSH4A",
                  "username": "zakak",
                  "userid": "2276178",
                  "postdate": "2024-05-06T03:16:05-05:00"
                },
                {
                  "id": "493937",
                  "title": "Wyrmspan  (italiano) // MURASAKI NIGHTS GAMEPLAY",
                  "category": "session",
                  "language": "Italian",
                  "link": "http://www.youtube.com/watch?v=bmB-L2qP644",
                  "username": "Laddiobolocko",
                  "userid": "3025983",
                  "postdate": "2024-05-05T10:07:22-05:00"
                },
                {
                  "id": "493928",
                  "title": "Playthrough (Live) | Wyrmspan",
                  "category": "session",
                  "language": "English",
                  "link": "http://www.youtube.com/watch?v=6OI7D91UDM0",
                  "username": "Sir_Thecos",
                  "userid": "2032101",
                  "postdate": "2024-05-05T09:01:48-05:00"
                },
                {
                  "id": "493682",
                  "title": "Правила игры, подготовка и летсплей от канала The Meeples",
                  "category": "session",
                  "language": "Russian",
                  "link": "http://www.youtube.com/watch?v=RZ_EagQ7d1E",
                  "username": "Hint666",
                  "userid": "3512570",
                  "postdate": "2024-05-03T10:29:04-05:00"
                },
                {
                  "id": "493629",
                  "title": "Opinando sobre WYRMSPAN",
                  "category": "review",
                  "language": "Spanish",
                  "link": "http://www.youtube.com/watch?v=PZVaBqdUK9s",
                  "username": "rikardus66",
                  "userid": "2802133",
                  "postdate": "2024-05-03T00:12:45-05:00"
                },
                {
                  "id": "493458",
                  "title": "Jugando Wyrmspan Español Latino",
                  "category": "session",
                  "language": "Spanish",
                  "link": "http://www.youtube.com/watch?v=TgZqBe_LJrI",
                  "username": "santosreviews",
                  "userid": "3542758",
                  "postdate": "2024-05-01T22:21:35-05:00"
                },
                {
                  "id": "493447",
                  "title": "Schwingenschlag einfach erklärt: Bereit für Drachenabenteuer? [Regelerklärung - Aufbau - Anleitung]",
                  "category": "instructional",
                  "language": "German",
                  "link": "http://www.youtube.com/watch?v=ANRc8KMPJtU",
                  "username": "brettspiele_erklaert",
                  "userid": "3269323",
                  "postdate": "2024-05-01T17:34:37-05:00"
                }
              ]
            }
          }
        ]
      };

    expect(result).toEqual(mockPayload);
  });

  it("should make a search query with no results and handle it", async () => {
    const mockApiResponse = `
        <?xml version="1.0" encoding="utf-8"?>
        <items termsofuse="https://boardgamegeek.com/xmlapi/termsofuse"></items>
      `;

    const params: ParamsThing = {
      id: ["12312312"],
    };

    mock
      .onGet(endpoint, { params: transformParams(params) })
      .replyOnce(200, mockApiResponse);

    const result = await thing(params);

    const mockPayload: PayloadThing = {
      attributes: {
        termsofuse: "https://boardgamegeek.com/xmlapi/termsofuse",
      },
      items: [],
    };

    expect(result).toEqual(mockPayload);
  });

  it("should transform raw params", async () => {
    const rawParams: ParamsThing = {
      id: ["12312312"],
      type: ["videogame", "boardgameexpansion"],
    };

    const transformedParams = transformParams(rawParams);

    const expectedParams: ParamsTransformed = {
      id: "12312312",
      type: "videogame,boardgameexpansion",
    };

    expect(transformedParams).toEqual(expectedParams);
  });
});

import bgg, * as types from "~/index";

describe("BGG Exports", () => {
  it("should export all routes correctly", () => {
    expect(bgg).toBeDefined();
    expect(bgg.collection).toBeDefined();
    expect(bgg.family).toBeDefined();
    expect(bgg.forum).toBeDefined();
    expect(bgg.forumList).toBeDefined();
    expect(bgg.guild).toBeDefined();
    expect(bgg.hot).toBeDefined();
    expect(bgg.search).toBeDefined();
    expect(bgg.thing).toBeDefined();
    expect(bgg.thread).toBeDefined();
    expect(bgg.user).toBeDefined();
    expect(bgg.plays.id).toBeDefined();
    expect(bgg.plays.username).toBeDefined();
  });

  it("should export types correctly", () => {
    expect(types).toHaveProperty("ParamTypes");
    expect(types).toHaveProperty("PayloadTypes");
    expect(types).toHaveProperty("ContentTypes");
  });
});

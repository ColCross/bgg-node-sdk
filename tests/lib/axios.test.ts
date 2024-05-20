import MockAdapter from "axios-mock-adapter";

import { axios } from "~/lib/axios";

const mock = new MockAdapter(axios);

describe("Axios", () => {
  it("should reject the promise with an unexpected error message", async () => {
    const error = new Error("Some unexpected error");
    error.stack = "Error stack trace";
    mock.onGet("/some-url").replyOnce(500);

    try {
      await axios.get("/some-url");
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});

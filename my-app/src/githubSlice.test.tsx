import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import githubReducer, {
  fetchGithubUsers,
  clearUsers,
  initialState,
  GithubState,
} from "./app/github/githubSlice";

const mock = new MockAdapter(axios);

describe("githubSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        github: githubReducer.reducer,
      },
    });
  });

  afterEach(() => {
    mock.reset();
  });

  it("should handle initial state", () => {
    expect(
      (store.getState() as { github: typeof initialState }).github
    ).toEqual(initialState);
  });

  it("should fetch users successfully", async () => {
    const users = [
      { avatar_url: "url1", login: "user1", type: "User", score: 1.0 },
      { avatar_url: "url2", login: "user2", type: "User", score: 2.0 },
    ];

    mock
      .onGet("https://api.github.com/search/users?q=test")
      .reply(200, { items: users });

    await store.dispatch(fetchGithubUsers("test") as any);

    const state = (store.getState() as { github: GithubState }).github;

    expect(state.loading).toBe(false);
    expect(state.users).toEqual(users);
    expect(state.error).toBeNull();
  });

  it("should handle fetch users failure", async () => {
    mock.onGet("https://api.github.com/search/users?q=test").reply(404);

    await store.dispatch(fetchGithubUsers("test") as any);

    const state = (store.getState() as { github: GithubState }).github;


    expect(state.loading).toBe(false);
    expect(state.users).toEqual([]);
    expect(state.error).toBe("Request failed with status code 404");
  });

  it("should clear users", () => {
    store.dispatch(clearUsers());
    const state = (store.getState() as { github: GithubState }).github;
    expect(state.users).toEqual([]);
  });
});

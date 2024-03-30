import { render } from "@testing-library/react";
import VoteComponent from "../VoteComponent";

describe("VoteComponent", () => {
  test("renders vote average and count correctly", () => {
    const voteAverage = 7.75;
    const voteCount = 8;
    const { getByText } = render(
      <VoteComponent voteAverage={voteAverage} voteCount={voteCount} />
    );
    expect(getByText("7.75")).toBeInTheDocument();
    expect(getByText("(8 votes)")).toBeInTheDocument();
  });
});

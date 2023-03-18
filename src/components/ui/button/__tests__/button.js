import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "../button";

test("test button component", () => {
  it("render button in StringComponent", () => {
    const tree = render(<Button text="Развернуть"/>);
    expect(tree).toMatchSnapshot();
  })
});

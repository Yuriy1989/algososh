import { fireEvent } from "@testing-library/dom";
import { render, screen,  } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "../button";

const buttonText = "Развернуть";

describe("Snapshot test button component", () => {
  it("button with text", () => {
    const tree = renderer.create(<Button text={buttonText} />).toJSON()
    expect(tree).toMatchSnapshot();
  })

  it("button without text", () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot();
  })

  it("button disabled", () => {
    const tree = renderer.create(<Button disabled/>).toJSON()
    expect(tree).toMatchSnapshot();
  })

  it("button with loading", () => {
    const tree = renderer.create(<Button isLoader={true}/>).toJSON()
    expect(tree).toMatchSnapshot();
  })
});

it("button with event click", () => {
  window.alert = jest.fn();

  render(<Button text="click button" onClick={() => { alert('callback') }} />)
  const button = screen.getByText("click button");
  fireEvent.click(button);
  expect(window.alert).toHaveBeenCalledWith("callback")
})

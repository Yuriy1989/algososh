import { render } from "@testing-library/react";
import { ElementStates } from "../../../../types/element-states";
import { Circle } from "../circle";

const jsxElement = <Circle letter="test" />
const index = 123;

describe("Snapshot test circle component", () => {
  it("circle without letters", () => {
    const circle = render(< Circle />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with letters", () => {
    const circle = render(< Circle letter="test"/>);
    expect(circle).toMatchSnapshot();
  })

  it("circle with head", () => {
    const circle = render(< Circle head="test"/>);
    expect(circle).toMatchSnapshot();
  })

  it("circle with ReactElement in head", () => {
    const circle = render(< Circle head={jsxElement} />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with in tail", () => {
    const circle = render(< Circle tail="test"/>);
    expect(circle).toMatchSnapshot();
  })


  it("circle with ReactElement in tail", () => {
    const circle = render(< Circle tail={jsxElement} />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with index", () => {
    const circle = render(< Circle index={index} />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with props isSmall", () => {
    const circle = render(< Circle isSmall={true} />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with state = default", () => {
    const circle = render(< Circle  state={ElementStates.Default} />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with state = changing", () => {
    const circle = render(< Circle  state={ElementStates.Changing} />);
    expect(circle).toMatchSnapshot();
  })

  it("circle with state = modified", () => {
    const circle = render(< Circle  state={ElementStates.Modified} />);
    expect(circle).toMatchSnapshot();
  })

})

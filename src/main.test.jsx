import { render, screen } from "@testing-library/react";
import { Header } from "./components/Header/Header";

test("Header показывает текст Tasty Pizza", () => {
  render(<Header />);
  const helloWorldElem = screen.getByText(/tasty pizza/i);
  expect(helloWorldElem).toBeInTheDocument();
});

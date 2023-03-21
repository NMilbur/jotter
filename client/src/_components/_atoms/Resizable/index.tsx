import "./index.css";
import { ReactNode } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  children?: ReactNode;
  orientation: "horizontal" | "vertical";
}

const Resizable = ({ children, orientation = "vertical" }: ResizableProps) => {
  let resizableProps: ResizableBoxProps;

  if (orientation === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
    };
  } else {
    resizableProps = {
      height: 500,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;

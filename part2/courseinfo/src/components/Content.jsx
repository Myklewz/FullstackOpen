import Part from "./Part";

const Content = (props) => {
  let content = props.course.parts.map((x, i) => {
    return <Part part={x} key={i} />;
  });
  return <div>{content}</div>;
};

export default Content;

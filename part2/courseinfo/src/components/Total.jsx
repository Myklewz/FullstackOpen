const Total = ({ course }) => {
  const total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return <strong>Total of {total} exercises</strong>;
};

export default Total;

const Notification = ({ message }) => {
  const infoStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message.message === null) {
    return null;
  }

  if (message.type === "info") {
    return (
      <div className="notification" style={infoStyle}>
        {message.message}
      </div>
    );
  } else if (message.type === "error") {
    return (
      <div className="notification" style={errorStyle}>
        {message.message}
      </div>
    );
  }
};

export default Notification;

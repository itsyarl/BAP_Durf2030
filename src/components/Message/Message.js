import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";

const Message = ({ message }) => {
  // console.log(message);
  return useObserver(() => (
    <li>
      {message.messages.map(messageObj => (  
        <p key={messageObj.id}>{messageObj.content}</p>
      ))}
    </li>
  ));
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;

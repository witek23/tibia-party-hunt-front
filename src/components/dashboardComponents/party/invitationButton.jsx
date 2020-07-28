import React from "react";

const InvitationButton = ({ character, onClick }) => {
  let btn = "";
  let text = "";

  const status = character?.invitation?.invStatus || undefined;

  if (!status) {
    btn = "btn btn-success";
    text = "Invite";
  } else if (status === "Pending" || status === "Accepted") {
    btn = "btn btn-danger";
    text = "Revoke";
  } else if (status === "Declined" || status === "Canceled") {
    btn = "btn btn-success";
    text = "Invite";
  }

  return (
    <button className={btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default InvitationButton;

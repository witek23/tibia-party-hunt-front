import React from "react";

const InvitationButton = ({ character, onClick }) => {
  let btn = "";
  let text = "";

  const status = character?.invitation?.invStatus || undefined;

  if (status === "Pending") {
    btn = "btn btn-danger";
    text = "Revoke";
  } else if (status === "Declined" || status === "Canceled" || !status) {
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

import React from "react";

const InvitationButton = ({ character, onClick }) => {
  let btn = "";
  let text = "";

  const characterInvitation = character.invitation;

  if (!characterInvitation.invStatus) {
    btn = "btn btn-success";
    text = "Invite";
  } else if (
    characterInvitation.invStatus === "Pending" ||
    characterInvitation.invStatus === "Accepted"
  ) {
    btn = "btn btn-danger";
    text = "Revoke";
  } else if (
    characterInvitation.invStatus === "Declined" ||
    characterInvitation.invStatus === "Canceled"
  ) {
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

"use client";
import { Cancel, CheckCircle, Delete, Edit, Save } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React from "react";

export const CustomeDeletButton = ({ onClick, disabled }) => {
  return (
    <>
      <Tooltip title="Delete">
        <IconButton onClick={onClick} disabled={disabled}>
          <Delete sx={{ fontSize: 20, color: disabled ? "gray" : "red" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const CustomeEditButton = ({ onClick, disabled }) => {
  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={onClick} disabled={disabled}>
          <Edit sx={{ fontSize: 20, color: disabled ? "gray" : "blue" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const CustomSaveButton = ({ onClick, disabled }) => {
  return (
    <Tooltip title="Save">
      <IconButton onClick={onClick}>
        <Save sx={{ fontSize: 20, color: "green" }} />
      </IconButton>
    </Tooltip>
  );
};

export const CustomAcceptButton = ({ onClick }) => {
  return (
    <>
      <Tooltip title="Approve">
        <IconButton onClick={onClick}>
          <CheckCircle color="success" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const CustomRejectButton = ({ onClick }) => {
  return (
    <>
      <Tooltip title="Reject">
        <IconButton onClick={onClick}>
          <Cancel color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const CustomSpinner = () => {
  return <CircularProgress size={20} color="info" />;
};

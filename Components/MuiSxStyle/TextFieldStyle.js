export const textfield = {
  "& .MuiInputBase-root": {
    height: "2rem",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&:hover fieldset": {
      borderColor: "#1976d2",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #1976d2",
    },
    "&.Mui-disabled": {
      "& fieldset": {
        borderColor: "#d1d1d1 !important", // Set a light gray border when disabled
      },
      "& input": {
        color: "#a0a0a0", // Light gray text for disabled state
      },
    },
    "& input": {
      height: "1rem",
      fontSize: "0.8rem",
      color: "#303030",
    },
    "& textarea": {
      height: "1rem",
      fontSize: "0.8rem",
      color: "#303030",
    },
    "& input:focus": {
      borderColor: "green",
    },
    "& .MuiAutocomplete-option": {
      fontSize: "9px",
    },
  },
};
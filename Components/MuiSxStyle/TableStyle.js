
export const tableHover = (theme) => ({
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    cursor: "pointer",
  },
});

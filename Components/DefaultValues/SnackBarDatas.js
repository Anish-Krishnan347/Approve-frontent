export const successSnackbar = (text, setAction) => {
  setAction((prev) => ({
    ...prev,
    openSnackbar: true,
    snackBarPurpose: "success",
    snackBarData: { severity: "success", text },
  }));
};

export const erroSnackbar = (text,setAction) => {
  setAction((prev) => ({
    ...prev,
    openSnackbar: true,
    snackBarPurpose: "error",
    snackBarData: { severity: "error", text },
  }));
};

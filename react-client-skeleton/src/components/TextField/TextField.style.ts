import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

interface IStylesParams {
  disabled: boolean;
  helperTextColor: string;
}

export const useStyles = ({ disabled, helperTextColor }: IStylesParams) =>
  createStyles({
    textField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "17px",
        backgroundColor: disabled ? "#C3C3C3" : "#fff",
        padding: "0px 12px",

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& input": {
          color: disabled
            ? theme.text.textfield.disabled
            : theme.text.textfield.default,
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
        },

        "& input::placeholder": {
          color: "#73737C",
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          opacity: 1,
        },
      },
      "& .MuiFormHelperText-root": {
        color: helperTextColor,
        fontSize: 13,
        fontWeight: 600,
        fontStyle: "normal",
        lineHeight: "normal",
      },
    },
    fieldContainer: {
      width: "100%",
      direction: "rtl",
    },
    title: {
      color: "#262E3A",
      fontSize: 15,
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "normal",
      marginBottom: "8px",
    },
  });
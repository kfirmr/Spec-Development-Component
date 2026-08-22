export type TButtonVariant = "primary" | "secondary";
export type TMuiVariant = "outlined" | "contained";

export const MUI_VARIANT_BY_BUTTON_VARIANT: Record<
  TButtonVariant,
  TMuiVariant
> = {
  primary: "contained",
  secondary: "outlined",
};

export const STYLE_BY_VARIANT: Record<TButtonVariant, Object> = {
  primary: {
    background:
      "linear-gradient(90deg, rgba(71, 118, 230, 1) 0%, rgba(142, 84, 233, 1) 100%)",
    "&.Mui-disabled": {
      opacity: 0.5,
      color: "white",
    },
    borderRadius: "7px",
  },
  secondary: {
    color: "black",
    border: "1px solid black",
    "&.Mui-disabled": {
      color: "#73737C",
      border: "1px solid #73737C",
    },
    borderRadius: "7px",
  },
};

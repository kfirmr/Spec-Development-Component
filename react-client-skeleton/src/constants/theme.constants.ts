export const theme = {
  background: {
    lightGray: "#F6F8FB",
    purpleGradient:
      "linear-gradient(90deg, rgba(71, 118, 230, 1) 0%, rgba(142, 84, 233, 1) 100%)",
    flippedPurpleGradient:
      "linear-gradient(90deg, rgba(142, 84, 233, 1) 0%, rgba(71, 118, 230, 1) 100%)",
  },
  colors: {
    info: "#262E3A",
    error: "#DE4040",
    white: "#FFFFFF",
    black: "#000000",
    purple: "#5f42ff",
    warning: "#DEA140",
    success: "#5ADE40",
    lightPurple: "#707CDF",
  },
  button: {
    primary: "#707CDF",
    secondary: "#9EA8F1",
  },
  border: {
    primary: "#262E3A",
    natural: "#E5E5EA",
  },
  shadow: {
    default: "#e0e0e0",
    card: "0 2px 12px rgba(0,0,0,0.06)",
    secondary:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  },
  severity: {
    info: "#A5AAB0",
    warning: "#DEA140",
    error: "#DE4040",
  },
  text: {
    textfield: {
      default: "#262E3A",
      disabled: "#73737C",
    },
  },
} as const;
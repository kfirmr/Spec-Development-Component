import { createStyles } from "../../create-styles";
import { theme } from "../../constants/theme.constants";

export const useStyles = () =>
  createStyles({
    container: ({
      disabled,
      textColor,
    }: {
      disabled: boolean;
      textColor: string;
    }) => ({
      gap: 8,
      display: "flex",
      color: textColor,
      alignItems: "center",
      width: "fit-content",
      opacity: disabled ? 0.5 : 1,
      flexDirection: "row" as const,
      WebkitTapHighlightColor: "transparent",
      cursor: disabled ? "default" : "pointer",
    }),
    checkBox: {
      width: 16,
      height: 16,
      minWidth: 16,
      minHeight: 16,
      display: "flex",
      borderRadius: 3,
      alignItems: "center",
      backgroundColor: "#fff",
      boxSizing: "border-box",
      justifyContent: "center",
      boxShadow: theme.shadow.secondary,
    },
  });

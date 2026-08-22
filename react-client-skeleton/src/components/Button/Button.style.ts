import type { CSSProperties } from "react";
import type { SystemStyleObject } from "@mui/system";
import { type TButtonVariant, STYLE_BY_VARIANT } from "./constants/button.constants";

export const useStyles = () => ({
  button: ({
    variant,
    isLoading,
    showOverlay,
  }: {
    isLoading: boolean;
    showOverlay: boolean;
    variant: TButtonVariant;
  }): SystemStyleObject => ({
    position: "relative",
    pointerEvents: isLoading ? "none" : "auto",
    "&::before": showOverlay
      ? {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 1,
        }
      : {},
    ...STYLE_BY_VARIANT[variant],
  }),
  text: {
    visibility: "hidden",
  } as CSSProperties,
  loadingAnimation: {
    width: 90,
    zIndex: 2,
    height: 90,
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  } as CSSProperties,
});

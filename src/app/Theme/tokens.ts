import colors from "./colors";

export const mobileTypography = {
  Heading1: "700 32px/40px Inter_700Bold, sans-serif",
  Heading2: "600 24px/32px Inter_600SemiBold, sans-serif",
  // used for navigation and inbody headers
  Heading3: "600 18px/24px Inter_600SemiBold, sans-serif",
  BodyHighLight: "700 24px/32px Inter_700Bold, sans-serif",
  Body: "400 16px/22px Inter_400Regular, sans-serif",
  BodySmall: "400 14px/20px Inter_400Regular, sans-serif",
  BodyDetails: "400 12px/16px Inter_400Regular, sans-serif",
  Button: "500 16px/22px Inter_500Medium, sans-serif",
  XL: "700 32px/42px Inter_700Bold, sans-serif",
};

export const desktopTypography = {
  Heading1: "700 56px/64px Inter_700Bold, sans-serif", // hero titles
  Heading2: "600 40px/48px Inter_600SemiBold, sans-serif", // section titles
  Heading3: "600 24px/32px Inter_600SemiBold, sans-serif", // subheadings
  BodyHighLight: "700 20px/28px Inter_700Bold, sans-serif", // emphasized text
  Body: "400 18px/28px Inter_400Regular, sans-serif", // standard paragraph
  BodySmall: "400 16px/24px Inter_400Regular, sans-serif", // captions, labels
  BodyDetails: "400 14px/20px Inter_400Regular, sans-serif", // fine print
  Button: "500 18px/24px Inter_500Medium, sans-serif", // larger CTA buttons
  XL: "700 64px/72px Inter_700Bold, sans-serif", // for standout hero headers
};

export const shadow = {
  elevation1: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
  elevation2: "0px 2px 5px 0px rgba(0, 0, 0, 0.2)",
};

export const theme = {
  shadow,
  colors: {
    background: {
      default: colors.orange[100],
      light: "#fff",
      google: "#fff",
      apple: "#000",
      facebook: "#1877F2",
    },

    surface: {
      default: colors.orange[100],
      elevated: "#fff",
      disabled: colors.gray[100],
    },

    text: {
      default: colors.gray[400],
      onDark: "#fff",
      title: colors.orange[800],
      disabled: colors.gray[300],
      google: "#000",
      apple: "#fff",
      facebook: "#fff",
    },

    actionPrimary: {
      default: colors.orange[400],
      disabled: colors.gray[100],
    },

    border: {
      default: colors.gray[200],
      selected: colors.orange[400],
    },

    progressBar: {
      base: colors.orange[200],
      bar: colors.orange[800],
      barLight: colors.orange[400],
    },

    library: { ...colors },

    moodcheck: {
      angry: "#FFF1F2",
      calm: "#ECFDF5",
      happy: "#FFF7ED",
      sad: "#EFF6FF",
    },
  },
  typography: mobileTypography,
};

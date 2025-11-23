// Optimized CSS utilities - giảm repetition và tăng performance
export const textStyles = {
  // Base text styles
  baseText: "text-black font-medium text-center leading-normal",

  // Size variants
  small: "text-[14.976px]",
  medium: "text-[16.848px] leading-[1.45]",
  large: "text-[24.336px]",

  // Font families
  quicksand: "font-quicksand",
  mallong: "font-mallong",
  showcase: "font-showcase",

  // Layout utilities
  flexColCenter: "flex flex-col items-center",
  flexRowBetween: "flex justify-between",
  flexRowAround: "flex justify-around w-full",
  fullWidth: "w-full",

  // Spacing
  py10: "py-10",
  mt10: "mt-10",
  gap3: "gap-3",

  // Positioning
  absolute: "absolute",
  relative: "relative",
  bottom2: "bottom-2",

  // Colors
  textBlack: "text-black",
  textWhite: "text-white",

  // Responsive
  responsiveLeft: "md:left-[45px] left-[26px]",
};

// Combined utility functions for common patterns
export const combineStyles = (...styles: string[]) => styles.join(" ");

// Pre-combined common styles for better performance
export const precomputedStyles = {
  introText: combineStyles(
    textStyles.flexRowBetween,

    textStyles.py10,
    textStyles.fullWidth,
    textStyles.baseText,
    textStyles.medium,
    textStyles.quicksand
  ),

  namesSection: combineStyles(
    textStyles.flexRowAround,
    textStyles.fullWidth,
    textStyles.baseText,
    textStyles.large,
    textStyles.mallong
  ),

  personColumn: combineStyles(
    textStyles.flexColCenter,
    textStyles.gap3,
    "w-1/2"
  ),

  welcomeText: combineStyles(
    textStyles.fullWidth,
    textStyles.baseText,
    textStyles.large,
    textStyles.showcase
  ),

  photoCaption: combineStyles(
    textStyles.absolute,
    textStyles.bottom2,
    textStyles.fullWidth,
    textStyles.textWhite,
    textStyles.small,
    textStyles.baseText,
    textStyles.quicksand
  ),
};

/**
 * styleMixin
 *
 * css 스타일을 쉽게 관리하고 적용하기 위한 유틸리티
 * @returns {styleobject}
 */
export function styleMixin() {
  return {
    /**
     * flex
     *
     * @param direction
     * @param align
     * @param justify
     * @param gap
     * @returns
     */
    flex: (
      direction = "center",
      align = "center",
      justify = "center",
      gap = 0,
    ) => ({
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      gap: typeof gap === "number" ? `${gap}px` : gap,
    }),
  };
}

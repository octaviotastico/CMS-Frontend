const CHANGE_THEME = "change_theme";

const ThemeReducer = (theme = "Theme_03", action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
    default:
      return theme;
  }
};

export const changeTheme = (theme) => ({ type: CHANGE_THEME, theme });

export default ThemeReducer;

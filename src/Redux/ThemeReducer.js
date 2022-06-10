const CHANGE_THEME = "change_theme";

const ThemeReducer = (theme = "Theme_02", action) => {
  switch (action.type) {
    case CHANGE_THEME:
      localStorage.setItem("theme", action.theme);
      return action.theme;
    default:
      return localStorage.getItem("theme") || theme;
  }
};

export const changeTheme = (theme) => ({ type: CHANGE_THEME, theme });

export default ThemeReducer;

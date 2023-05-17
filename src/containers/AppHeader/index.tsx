import { bindActionCreators, Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import classNames from "classnames";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IRootState } from "../../store/models";
import { appHeaderActions } from "./logic/actions";
import { AppTheme } from "./logic/models";
import ThemeSwitch from "../../components/ThemeSwitch";

import "./styles.css";

export interface IApplicationHeaderProps
  extends ConnectedProps<typeof connector> {
  actions: typeof appHeaderActions;
  theme: AppTheme;
}

const AppHeader = ({ actions, theme }: IApplicationHeaderProps) => {
  const isDarkTheme = theme === AppTheme.Dark;

  const handleChange = (event: React.SyntheticEvent, checked: boolean) => {
    actions.setApplicationTheme(checked ? AppTheme.Dark : AppTheme.Light);
  };

  return (
    <div
      className={classNames("app-header", { "is-dark-header": isDarkTheme })}
    >
      <FormGroup>
        <FormControlLabel
          control={<ThemeSwitch sx={{ m: 1 }} defaultChecked />}
          checked={isDarkTheme}
          label="Switch Theme"
          onChange={handleChange}
          slotProps={{
            typography: {
              color: isDarkTheme ? "white" : "black",
            },
          }}
        />
      </FormGroup>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  theme: state.settings.theme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...appHeaderActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppHeader);

import { CircularProgress } from "@material-ui/core";
import classNames from "classnames";

import "./styles.css";

export interface ILoaderProps {
  isFullPage?: boolean;
  isDarkTheme?: boolean;
}

const Loader = (props: ILoaderProps) => {
  const { isFullPage, isDarkTheme } = props;
  return (
    <div
      className={classNames({
        "full-page-loader": isFullPage,
        "is-dark-theme-loader": isDarkTheme,
      })}
    >
      <CircularProgress />
    </div>
  );
};

export default Loader;

import { CircularProgress } from "@material-ui/core";

import "./styles.css";

export interface ILoaderProps {
  isFullPage?: boolean;
}

const Loader: FC<ILoaderProps> = ({ isFullPage }) => (
    <div className={isFullPage ? "full-page-loader" : ""}>
      <CircularProgress />
    </div>
  );

export default Loader;

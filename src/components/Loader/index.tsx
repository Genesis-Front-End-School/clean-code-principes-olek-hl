import { CircularProgress } from "@material-ui/core";

import "./styles.css";

export interface ILoaderProps {
  isFullPage?: boolean;
}

const Loader = (props: ILoaderProps) => {
  // гадаю деструктуризацію пропсів краще робити одразу в аргументі функції
  const { isFullPage } = props;
  return (
    <div className={isFullPage ? "full-page-loader" : ""}>
      <CircularProgress />
    </div>
  );
};

export default Loader;

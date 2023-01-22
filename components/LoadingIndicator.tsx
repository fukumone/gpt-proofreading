import styles from "../styles/Loading.module.scss";

const LoadingIndicator = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingIndicator;

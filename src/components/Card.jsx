import Button from "./Button";
import styles from "./Card.module.css";

export default function Card({
  title,
  money,
  buttonText,
  buttonType,
  handleClick,
  success = true,
}) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>
        {`${title}: `}
         <h3 className={styles.cardTitle}>{title}:</h3>

      <p className={success ? styles.success : styles.failure}
      >
        {`₹{money}`}
      </p>
      </h3>
      <Button handleClick={handleClick} style={buttonType}>
        {buttonText}
      </Button>
    </div>
  );
}
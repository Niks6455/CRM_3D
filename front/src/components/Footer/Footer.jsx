import { useState } from "react";
import styles from "./Footer.module.scss";
import Layout from "../../ui/Layout/Layout";
import { CreateRewiew } from "../../API/API";

function Footer() {
  const [review, setReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    if (review.trim()) {
      setIsSubmitted(true);
      CreateRewiew({review: review})
    }else{
      alert("Введите отзыв")
    }
  };

  return (
    <footer className={styles.footer}>
    <Layout>
    <div className={styles.footerInner}>
        <div>
                <p>Copyright &copy; 2023</p>
            </div>
            <div className={styles.footerInnerRew}>
                <div>
                    <textarea
                            placeholder="Оставьте отзыв"
                            value={review}
                            onChange={handleReviewChange}
                            className={styles.textarea}
                            maxLength={150}
                        />
                </div>
              
                <button onClick={handleSubmit}>Отправить отзыв</button>
                {isSubmitted && <p>Спасибо за ваш отзыв!</p>}
            </div>
        </div>
    </Layout>
   
    </footer>
  );
}

export default Footer;

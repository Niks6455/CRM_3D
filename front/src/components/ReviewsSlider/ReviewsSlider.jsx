import React, { useEffect, useState } from "react";
import styles from "./ReviewsSlider.module.scss";
import { GetAllReviews } from "../../API/API";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ReviewsSlider() {
  const [sliderData, setSliderData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    GetAllReviews().then((res) => {
      if (res?.status === 200 && res?.data.length > 0) {
        setSliderData(res?.data);
        setCurrentIndex(0); // Сбрасываем индекс на первый элемент после загрузки данных
      }
    });
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!sliderData.length) return <p>Загрузка отзывов...</p>;

  console.log(sliderData)
  return (
    <section className={styles.sliderContainer}>
    <div className={styles.sliderContainerInner}>
        <div className={styles.sliderContainerInnerTitle}>
            <p>Отзывы клиентов: </p>
        </div>
        
      <div className={styles.sliderInner}>
        <div className={styles.sliderInnerContent}>
            <button onClick={prevSlide} className={styles.navButton}>
                <ChevronLeft size={24} />
                </button>
                <div className={styles.reviewContent}>
                <p className={styles.reviewText}>
                    "{sliderData[currentIndex]?.review}"
                </p>
                <p className={styles.author}>
                    - {sliderData[currentIndex]?.User?.fio || "Аноним"}
                </p>
                </div>
                <button onClick={nextSlide} className={styles.navButton}>
                <ChevronRight size={24} />
                </button>
        </div>
      </div>
    </div>
        
    </section>
  );
}

export default ReviewsSlider;

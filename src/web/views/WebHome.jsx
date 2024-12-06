import styles from "../../styles/stylesWebHeader.module.css";

export const WebHome = () => {
    return (
        <div
            className={`${styles["ps-block--promotion-header"]} ${styles["bg--cover"]}`}
            style={{
                backgroundImage: "url(http://ecommerce/assets/img/banner/top/header-promotion.jpg)"
            }}
        >
            <div className={styles.container}>
                <div className={styles["ps-block__left"]}>
                    <h3>20%</h3>
                    <figure>
                        <p>Discount</p>
                        <h4>For Books Of March</h4>
                    </figure>
                </div>
                <div className={styles["ps-block__center"]}>
                    <p>
                        Enter Promotion<span>Sale2019</span>
                    </p>
                </div>
                <a className={`${styles["ps-btn"]} ${styles["ps-btn--sm"]}`} href="#">
                    Shop now
                </a>
            </div>
        </div>
    );
};
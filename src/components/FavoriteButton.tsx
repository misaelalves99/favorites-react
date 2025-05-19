// src/components/FavoriteButton.tsx

import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../hooks/useWishlist";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = () => {
  const { wishlist } = useWishlist();

  const count = wishlist.length;

  return (
    <div className={styles.button} title="Favoritos">
      <FaHeart className={styles.icon} />
      {count > 0 && <span className={styles.count}>{count}</span>}
    </div>
  );
};

export default FavoriteButton;

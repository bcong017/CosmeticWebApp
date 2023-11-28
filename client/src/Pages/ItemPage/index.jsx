import { useRef } from "react";
import "./style.css";

function ItemPage({ amount = 4 }) {
  const imgRef = useRef();
  return (
    <div className="item-page-body">
      <div className="item-media-side-detail-block">
        <div className="media">
          <img
            src="https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_358x358_843626_fit_center.jpg"
            alt=""
            ref={imgRef}
          />
          <ul>
            <li>
              <img
                className="variant-item-thumbnail"
                src="https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_80x80_d200c5_fit_center.jpg"
                alt=""
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute("data-realimage");
                }}
                data-realimage="https://media.hcdn.vn/catalog/product/g/o/google-shopping-dau-tay-trang-shu-uemura-lam-sang-da-150ml-1663665269_img_358x358_843626_fit_center.jpg"
              />
            </li>
            <li>
              <img
                className="variant-item-thumbnail"
                src="https://media.hcdn.vn/catalog/product/t/e/tem-phu_100230044-1665741575_img_80x80_d200c5_fit_center.jpg"
                alt=""
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute("data-realimage");
                }}
                data-realimage="https://media.hcdn.vn/catalog/product/t/e/tem-phu_100230044-1665741575_img_358x358_843626_fit_center.jpg"
              />
            </li>
            <li>
              <img
                className="variant-item-thumbnail"
                src="https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-1-1663665270_img_80x80_d200c5_fit_center.jpg"
                alt=""
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute("data-realimage");
                }}
                data-realimage="https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-1-1663665270_img_358x358_843626_fit_center.jpg"
              />
            </li>
            <li>
              <img
                className="variant-item-thumbnail"
                src="https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-2-1663665270_img_80x80_d200c5_fit_center.jpg"
                alt=""
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute("data-realimage");
                }}
                data-realimage="https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-2-1663665270_img_358x358_843626_fit_center.jpg"
              />
            </li>
            <li>
              <img
                className="variant-item-thumbnail"
                src="https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-3-1663665271_img_80x80_d200c5_fit_center.jpg"
                alt=""
                onClick={(e) => {
                  imgRef.current.src = e.target.getAttribute("data-realimage");
                }}
                data-realimage="https://media.hcdn.vn/catalog/product/d/a/dau-tay-trang-shu-uemura-lam-sang-da-150ml-3-1663665271_img_358x358_843626_fit_center.jpg"
              />
            </li>
          </ul>
        </div>
        <div className="item-info">
          <h1 className="item-name-VN">
            Dầu Tẩy Trang Shu Uemura Làm Sạch & Se Lỗ Chân Lông 150ml
          </h1>
          <h2 className="item-name-EN">
            Porefinist Anti-Shine Fresh Cleansing Oil
          </h2>
          <h3 className="price">Giá: 1000 VND</h3>
          <div className="amount-block">
            <label htmlFor="item-amount">Số lượng:</label>
            <select name="item-amount" id="item-amount">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {amount <= 6 && (
              <p className="amount-remaining">Chỉ còn {amount} sản phẩm!</p>
            )}
          </div>
          <button className="add-item-btn">
            Thêm vào giỏ hàng
            <i className="fa-solid fa-cart-shopping cart-icon-in-button"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemPage;

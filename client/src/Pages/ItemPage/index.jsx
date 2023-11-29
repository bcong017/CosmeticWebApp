import { useEffect, useRef, useState } from "react";
import "./style.css";

function ItemPage({ amount = 4 }) {
  const itemDetailTabsRef = useRef();
  const imgRef = useRef();
  const [activeIndex,setActiveIndex] = useState(0);

  useEffect(() => {
    for (let i = 0; i < 5; i++)
    {
      if (i!=activeIndex)
      {
        itemDetailTabsRef.current.childNodes[i].className = 'item-detail-tab'
      }
      else
      {
        itemDetailTabsRef.current.childNodes[i].className = 'item-detail-tab active-color'
      }
    }
  }

  ,[activeIndex])

  
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
            Thêm vào giỏ hàng &nbsp;
            <i className="fa-solid fa-cart-shopping cart-icon-in-button"></i>
          </button>
        </div>
      </div>
      <div className="item-detail">
        <div className="item-detail-tabs" ref={itemDetailTabsRef}>
          <div className="item-detail-tab" data-key='0' onClick={(e) => setActiveIndex(e.target.getAttribute("data-key")) }>Thông tin sản phẩm</div>
          <div className="item-detail-tab" data-key='1' onClick={(e) => setActiveIndex(e.target.getAttribute("data-key")) }>Thông số sản phẩm</div>
          <div className="item-detail-tab" data-key='2' onClick={(e) => setActiveIndex(e.target.getAttribute("data-key")) }>Thành phần sản phẩm</div>
          <div className="item-detail-tab" data-key='3' onClick={(e) => setActiveIndex(e.target.getAttribute("data-key")) }>Hướng dẫn sử dụng</div>
          <div className="item-detail-tab" data-key='4' onClick={(e) => setActiveIndex(e.target.getAttribute("data-key")) }>Đánh giá</div>
        </div>
        <div className="selected-tab-detail-container" >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </div>
      </div>
    </div>
  );
}
export default ItemPage;

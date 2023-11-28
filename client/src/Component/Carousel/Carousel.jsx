import Carousel from "react-multi-carousel";
import Card from "../Card/Card.jsx";
import "./Carousel.css";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function ItemCarousel({title}) {
  return (
    <>
      <div className="item-carousel-container">
        <h1>{title}</h1>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          infinite={true}
          autoPlay={true}
        >
          <Card
            itemName="Sữa rửa mặt"
            imgURL="https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg"
            price="100.000 VND"
          ></Card>
          <Card
            itemName="Sữa rửa mặt"
            imgURL="https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg"
            price="100.000 VND"
          ></Card>
          <Card
            itemName="Sữa rửa mặt"
            imgURL="https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg"
            price="100.000 VND"
          ></Card>
          <Card
            itemName="Sữa rửa mặt"
            imgURL="https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg"
            price="100.000 VND"
          ></Card>
          <Card
            itemName="Sữa rửa mặt"
            imgURL="https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg"
            price="100.000 VND"
          ></Card>
          <Card
            itemName="Sữa rửa mặt"
            imgURL="https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg"
            price="100.000 VND"
          ></Card>
        </Carousel>
      </div>
    </>
  );
}

export default ItemCarousel;

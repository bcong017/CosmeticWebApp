import '../css/Carousel.css'
import { useEffect } from 'react'



function Carousel({title='hello',itemName='Sữa rửa mặt',imgURL='https://media.hcdn.vn/catalog/category/19_3_img_250x250_8e0796_fit_center.jpg',price='100.000 VND'}) { 
    

    return (
        <div className="body-of-carousel">
            <div className="carousel-title-block">
                <span className='carousel-title'>{title}</span>
                <div className="carousel-container">
                    <div className="slider-wrapper">
                    <i id='prev-slide' className="slide-button fa-solid fa-arrow-left"></i>
                        <div className="image-list">
                            <div className='image-with-title-block'>
                                <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-1" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                                <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-2" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                            <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-3" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                            <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-4" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                                <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-5" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                                <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-6" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                                <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-7" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                            <div className='image-with-title-block'>
                                <div className='item-name'><span >{itemName}</span></div>
                                <img className="image-item" src={imgURL} alt="img-8" />
                                <div className='item-name'><span >Giá: {price}</span></div>
                            </div>
                        </div>
                        <i id='next-slide' className="slide-button fa-solid fa-arrow-right"></i>
                    </div>
                    
                    <div className="slider-scrollbar">
                        <div className="scrollbar-track">
                            <div className="scrollbar-thumb"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
    
}



export default Carousel
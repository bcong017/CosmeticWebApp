import './Carousel.css'
import { useEffect } from 'react'



function Carousel({title='hello',itemName='hello',imgURL}) { 
    

    //useEffect(() => {initSlider()},[]);

    return (
        <div className="body-of-carousel">
            <div className="carousel-title-block">
                <span className='carousel-title'>{title}</span>
                <div className="carousel-container">
                    <div className="slider-wrapper">
                    <i id='prev-slide' className="slide-button fa-solid fa-arrow-left"></i>
                        <div className="image-list">
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-1.jpg" alt="img-1" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-2.jpg" alt="img-2" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-3.jpg" alt="img-3" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-4.jpg" alt="img-4" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-5.jpg" alt="img-5" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-6.jpg" alt="img-6" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-7.jpg" alt="img-7" />
                            </div>
                            <div className='image-with-title-block'>
                                <span>{itemName}</span>
                                <img className="image-item" src="../img-8.jpg" alt="img-8" />
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
import React from 'react';
import './hotels.css';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

const Hotels = () => {
    const {products} = useSelector(state => state.product); 
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "transparent", color:"#333333 !important" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "transparent", color:"#333333 !important" }}
            onClick={onClick}
          />
        );
      }
      
    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
    
    return (
        <div  className="hotels">
            <div className="hotel-top">
                    <p>Top Hotels</p>
                    <h2>Sale Off Booking Open Now!</h2>
                    <span>Over 1000 Hotel rooms worldwide sale off. Book Hotel rooms and enjoy your holidays with distinctive experience</span>
            </div>
            <div className="container-hotel">
                <Slider {...settings}>
                    <div className="feature-item1">
                        <div className="item-header1">
                            <a href="/single/1">
                                <img height={250} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                            </a>
                        </div>
                        <div className="item-main1">
                            <div className='feature-item-info1'>
                                <a href="/single/1">
                                    <h2>InterContinental Nha Trang 1</h2>
                                </a>
                                <p>150$ | Per Person</p>
                                <span>Located in the heart of a beautiful coastal city along Vietnam's southern coastline, InterContinental Nha Trang offers the ultimate luxury…</span>
                            </div>
                        </div>
                    </div>
                    <div className="feature-item1">
                        <div className="item-header1">
                            <a href="/single/1">
                                <img height={250} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                            </a>
                        </div>
                        <div className="item-main1">
                            <div className='feature-item-info1'>
                                <a href="/single/1">
                                    <h2>InterContinental Nha Trang 1</h2>
                                </a>
                                <p>150$ | Per Person</p>
                                <span>Located in the heart of a beautiful coastal city along Vietnam's southern coastline, InterContinental Nha Trang offers the ultimate luxury…</span>
                            </div>
                        </div>
                    </div>
                    <div className="feature-item1">
                        <div className="item-header1">
                            <a href="/single/1">
                                <img height={250} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                            </a>
                        </div>
                        <div className="item-main1">
                            <div className='feature-item-info1'>
                                <a href="/single/1">
                                    <h2>InterContinental Nha Trang 1</h2>
                                </a>
                                <p>150$ | Per Person</p>
                                <span>Located in the heart of a beautiful coastal city along Vietnam's southern coastline, InterContinental Nha Trang offers the ultimate luxury…</span>
                            </div>
                        </div>
                    </div>
                    <div className="feature-item1">
                        <div className="item-header1">
                            <a href="/single/1">
                                <img height={250} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                            </a>
                        </div>
                        <div className="item-main1">
                            <div className='feature-item-info1'>
                                <a href="/single/1">
                                    <h2>InterContinental Nha Trang 1</h2>
                                </a>
                                <p>150$ | Per Person</p>
                                <span>Located in the heart of a beautiful coastal city along Vietnam's southern coastline, InterContinental Nha Trang offers the ultimate luxury…</span>
                            </div>
                        </div>
                    </div>
                    <div className="feature-item1">
                        <div className="item-header1">
                            <a href="/single/1">
                                <img height={250} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                            </a>
                        </div>
                        <div className="item-main1">
                            <div className='feature-item-info1'>
                                <a href="/single/1">
                                    <h2>InterContinental Nha Trang 1</h2>
                                </a>
                                <p>150$ | Per Person</p>
                                <span>Located in the heart of a beautiful coastal city along Vietnam's southern coastline, InterContinental Nha Trang offers the ultimate luxury…</span>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className="btn-more">
                    <button>VIEW MORE</button>
                </div>
            </div>
      </div>
    )
};

export default Hotels;

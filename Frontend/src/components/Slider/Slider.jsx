import React from 'react'

const Slider = () => {
  return (
    
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">

        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="slider-1.jpg" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                    <div class="custom-carousel-content">
                        <h1>
                            <span>Best Ecommerce Solutions 1 </span>
                            to Boost your Brand Name &amp; Sales
                        </h1>
                        <p>
                            We offer an industry-driven and successful digital marketing strategy that helps our clients
                            in achieving a strong online presence and maximum company profit.
                        </p>
                        <div>
                            <a href="#" class="btn btn-slider">
                                Get Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="slider-2.jpg" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                    <div class="custom-carousel-content">
                        <h1>
                            <span>Best Ecommerce Solutions 2 </span>
                            to Boost your Brand Name &amp; Sales
                        </h1>
                        <p>
                            We offer an industry-driven and successful digital marketing strategy that helps our clients
                            in achieving a strong online presence and maximum company profit.
                        </p>
                        <div>
                            <a href="#" class="btn btn-slider">
                                Get Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="slider-3.jpg" class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                    <div class="custom-carousel-content">
                        <h1>
                            <span>Best Ecommerce Solutions 3 </span>
                            to Boost your Brand Name &amp; Sales
                        </h1>
                        <p>
                            We offer an industry-driven and successful digital marketing strategy that helps our clients
                            in achieving a strong online presence and maximum company profit.
                        </p>
                        <div>
                            <a href="#" class="btn btn-slider">
                                Get Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
  )
}

export default Slider
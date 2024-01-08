import React, { useEffect, useState } from 'react';
import './destinations.css';
import { useSelector } from 'react-redux';
const Destinations = () => {
    const {categorys} = useSelector(state => state.category);
    const [categorySlice,setCategorySlice] = useState([]); 
    useEffect(()=>{
        setCategorySlice(categorys.slice(0,2)); 
    },[categorys.length])
    return (
        <div className="container-desti">
            <div className="destinations">
                <div className="destination-top">
                    <p>Top Destinations</p>
                    <h2>Explore Top Destinations</h2>
                    <span>Discover outstanding Southeast Asian tours with us !</span>
                </div>
                <div className="destination-tour">
                    <div className="destination-col-5">
                        <a href="/single/1">
                        <div className="destination-img">
                            <img src="https://res.cloudinary.com/dgyolr1sq/image/upload/v1703065366/destination17_ju0iug.jpg" alt="" />
                        </div>
                        <div className="destination-name">
                            <div className='name-tour'>Ha Long</div>
                            <div className="tour-desti">6 Tours</div>
                        </div>
                        <div className="color-overlay"></div>
                        </a>
                    </div>
                    <div className="destination-col-7">
                        <div className="child-col-7">
                            <a href="/single/1">
                            <div className="destination-img">
                                <img src="https://res.cloudinary.com/dgyolr1sq/image/upload/v1703065362/thail_c8yrwp.png" alt="" />
                            </div>
                            <div className="destination-name">
                                <div className='name-tour'>Ha Long</div>
                                <div className="tour-desti">6 Tours</div>
                            </div>
                            <div className="color-overlay"></div>
                            </a>
                        </div>
                        <div className="child-col-7">
                            <a href="/single/1">
                            <div className="destination-img">
                                <img src="https://res.cloudinary.com/dgyolr1sq/image/upload/v1703065358/cam_bxoswq.png" alt="" />
                            </div>
                            <div className="destination-name">
                                <div className='name-tour'>Ha Long</div>
                                <div className="tour-desti">6 Tours</div>
                            </div>
                            <div className="color-overlay"></div>
                            </a>
                        </div>
                        <div className="child-col-7">
                            <a href="/single/1">
                            <div className="destination-img">
                                <img src="https://res.cloudinary.com/dgyolr1sq/image/upload/v1703065355/mi2_kyidf0.png" alt="" />
                            </div>
                            <div className="destination-name">
                                <div className='name-tour'>Ha Long</div>
                                <div className="tour-desti">6 Tours</div>
                            </div>
                            <div className="color-overlay"></div>
                            </a>
                        </div>
                        <div className="child-col-7">
                            <a href="/single/1">
                            <div className="destination-img">
                                <img src="https://res.cloudinary.com/dgyolr1sq/image/upload/v1703065354/ks2_nanhen.png" alt="" />
                            </div>
                            <div className="destination-name">
                                <div className='name-tour'>Ha Long</div>
                                <div className="tour-desti">6 Tours</div>
                            </div>
                            <div className="color-overlay"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Destinations;

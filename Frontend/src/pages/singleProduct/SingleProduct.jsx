import { React, useEffect, useState, useRef } from 'react'
import './singleProduct.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../../store/slice/productSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '../../store/slice/cartSlice';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { createComment, getAllComment } from "../../store/slice/commentSlice"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Slider from "react-slick";
import { feature } from '../../data';


const SingleProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const { isFetching } = useSelector(state => state.product);
  const [listProducts, setListProducts] = useState([]);
  const singleProducts = listProducts?.find(item => item._id === productId);
  const { comments } = useSelector(state => state.comment);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [quantityCart, setQuantityCart] = useState(1);
  const [comment, setComment] = useState("");
  const [size, setSize] = useState(singleProducts && singleProducts.size && singleProducts.size[0]);
  const [color, setColor] = useState(singleProducts && singleProducts.color && singleProducts.color[0]);
  const [indexSize, setIndexSize] = useState(0);


  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products'));
    setListProducts(products)
  }, [])
  const handleQuantityClick = (type) => {
    if (type === "decrement") {
      quantityCart > 1 && setQuantityCart(quantityCart => quantityCart - 1)
    } else {
      setQuantityCart(quantityCart => quantityCart + 1);
    }
  }
  const handleSizeClick = (index, type) => {
    setSize(type)
    setIndexSize(index);
  }

  const handleAddToCart = () => {
    const product = {
      _id: singleProducts._id,
      name: singleProducts.name,
      desc: singleProducts.desc,
      image: singleProducts.image,
      color: singleProducts.color,
      price: singleProducts.price,
      quantity: quantityCart
    }
    dispatch(addToCart(product))
    navigate("/cart")
  }
  const handleComment = () => {
    if (!user) {
      navigate('/login');
    } else {
      const data = {
        userId: user._id,
        content: comment,
        productId
      }
      dispatch(createComment(data));
      navigate(0);
    }
  }
  useEffect(() => {
    dispatch(getAllComment(productId));
    setColor("");
  }, [])
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", color: "#333333 !important" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "transparent", color: "#333333 !important" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const handleSetSize = (index) => {
    setSize(index)
  }
  const handleChangeColor = (e) => {
    setColor(e.target.value);
  }
  const refFeature = useRef();
  const [slice, setSlice] = useState(0);
  const handleArrow = (direction) => {
    if (direction === "right" && slice < 3) {
      refFeature.current.style.transform = `translateX(-${(slice + 1) * 100}vw)`
      setSlice(slice => slice + 1)
    } else {
      refFeature.current.style.transform = `translateX(0vw)`
      setSlice(0)
    }

    if (direction === "left" && slice >= 1) {
      refFeature.current.style.transform = `translateX(-${(slice - 1) * 100}vw)`
      setSlice(slice => slice - 1)
    }
  }

  return (

    <div className="tour-detail">
      <div className="elementor-background-overlay">
        <div className="elementor-background"></div>
      </div>
      <div className="elementor-widget-wrap">
        <div className="header-link">
          <h2>Tour Detail</h2>
          <p> <a href="">Home</a> |<a href="">Hotel</a>  | <span> InterContinental Nha Trang 4 </span></p>
        </div>
      </div>
      <div className="container">
        <div className="item-detail">
          <div className="detail-left">
            <div className="name-tour-detail">
              <h2>InterContinental Nha Trang 4</h2>
            </div>
            <div className="address">
              <p>
                <LocationOnIcon /> 32-34 Tran Phu Street, Khanh Hoa Province, Nha Trang, Vietnam
              </p>
            </div>
            <div className="feature-wraper">
              <Slider {...settings}>
                {feature && feature.map(item => {
                  return (
                    <div className="feature-item">
                      <img height={600} width="100%" src={item.url} alt="" />
                    </div>
                  )
                })}
              </Slider>
            </div>
            <div className="">
              <Slider {...settings2}>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
                <div className="feature-item1">
                  <div className="item-header1">
                    <img height={100} width="100%" src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1703133154/nt3-420x260_btmy7c.jpg' alt="" />
                  </div>
                </div>
              </Slider>
              <div className="detail-desc">
                <h2>Description</h2>
                <p>Located in the heart of a beautiful coastal city along Vietnam's southern coastline, InterContinental Nha Trang offers the ultimate luxury beachside retreat with 277 spacious rooms and suites combined with authentic dining experiences and spa therapies. Sitting on the bay where the blue sea laps the golden sand, you’ll enjoy the perfect blend of renowned InterContinental hospitality and Vietnamese local charm whether it is for a leisure getaway, family vacation or the wedding of your dreams.</p>
              </div>
              <div className="table-check">
                <div className="check-col">Check in: 15:00</div>
                <div className="check-col">Check out: 00:00	</div>
                <div className="check-col">Front desk: +84-258-3887777</div>
                <div className="check-col">Reservations: 01208 52 175	</div>
                <div className="check-col">Currency: USD	</div>
                <div className="check-col">Languages: English, Thai, Vietnamese</div>
              </div>
            </div>
            <div className="policy">
              <div className="policy-col">
                <h3>PET POLICY</h3>
                <p>Pets are not permitted to enter hotel premise. Service animals that provide assistance to individuals with disabilities are not considered pets. Please contact our hotel before arrival for more information and support.</p>
              </div>
              <div className="policy-col">
                <h3>ACCESSIBILITY</h3>
                <p>Almost all areas of the hotel are wheel chair accessble, inlcuding the banquet and conference area, health club and spa, restaurant outlets.</p>
              </div>
              <div className="policy-col">
                <h3>WIFI</h3>
                <p>Standard Rooms, Suites, Business Center and Meeting Convention Space</p>
              </div>
              <div className="policy-col">
                <h3>PARKING</h3>
                <p>Car parking is available Parking Spaces/125 Spaces Valet parking is available Self-Parking</p>
              </div>
              <div className="policy-col">
                <h3>Guestroom Accessibility Details</h3>
                <ul>
                  <li>✔️ Wheelchair Accessible Closets</li>
                  <li>✔️ Furniture can be rearranged for added space</li>
                  <li>✔️ Wheelchair Accessible Rooms & Routes</li>
                  <li>✔️ Bathroom Cord/Button Emergency System</li>
                  <li>✔️ Bedroom Cord/Button Emergency System</li>
                </ul>
              </div>
              <div className="policy-col">
                <h3>Public Area Accessibility Details</h3>
                <ul>
                  <li>✔️ Wheelchair Accessible Closets</li>
                  <li>✔️ Furniture can be rearranged for added space</li>
                  <li>✔️ Wheelchair Accessible Rooms & Routes</li>
                  <li>✔️ Bathroom Cord/Button Emergency System</li>
                  <li>✔️ Bedroom Cord/Button Emergency System</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="detail-right">
            <div className="make-booking">
              <h3>MAKE A BOOKING</h3>
            </div>
            <p>– Code: VF1206</p>
            <p>– Place: 32-34 Tran Phu Street, Khanh Hoa Province, Nha Trang, Vietnam</p>
            <p>– Hotline: 01208 52 175 Days</p>
            <p>– Utilities: true, true, true, true</p>
            <p>– Routine: 0.43 mi (0.69km) from destination</p>
            <div className="form-group">
            <ul>                                                    
                <li class="d-block ">
                    <div class="pt-1">
                        <span class="fw-bold">From:</span><span class="float-end  fw-bold">50.00</span>
                    </div>
                </li>
                <li class="d-block ">
                    <div class="pt-1">
                        <span class="fw-bold">$150.00 x 1 guests:</span><span class="float-end  fw-bold">$150.00</span>
                    </div>
                </li>
                <li class="d-block ">
                    <div class="pt-1">
                        <span class="fw-bold">Booking fee + tax:</span><span class="float-end  fw-bold">$10.00</span>
                    </div>
                </li>
                <li class="d-block ">
                    <div class="pt-1">
                        <span class="fw-bold">Book now & Save:</span><span class="float-end  fw-bold">-$15</span>
                    </div>
                </li>
                <li class="d-block ">
                    <div class="pt-1">
                        <span class="fw-bold">Other fees</span><span class="float-end  fw-bold">Free</span>
                    </div>
                </li>

                <li class="d-block border-t">
                    <div class="pt-1">
                        <span class="fw-bold">Total</span><span class="float-end  fw-bold">$165</span>
                    </div>
                </li>
            </ul>
            </div>
            <div className="form-group-btn">
                <a href="#">INSTANT BOOK</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SingleProduct
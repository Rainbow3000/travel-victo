import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginIcon from '@mui/icons-material/Login';
import './navbar.css'
import { Badge, Button } from '@mui/material'
import {Link} from 'react-router-dom'
import { useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'; 
import MenuSide from '../menuSide/MenuSide';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Navbar = () => {
    const dispatch = useDispatch(); 
    const location = useLocation(); 
    const path = location.pathname.split('/')[1];
    const [menuClick,setMenuClick]  = useState(false)
    const menuRef = useRef(); 
    useEffect(()=>{
        setMenuClick(false); 
    },[path])
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart'));
        const dataUser = JSON.parse(localStorage.getItem('user'));
        if(dataUser){
            
        }
        if (data) {
   
        }
    }, [dispatch])

      
      
        if(menuClick === true){
            menuRef.current.style.transform = "translateX(0%)";
        }
    const handleLogout =()=>{
        alert('Đăng xuất thành công !'); 
    }

  
    return (

<div className='container-nav'>
    <div className='navbar-wrapper'>
    <div className='navbar-left'>
					<div className='navbar-left-logo'>
						<Link to='/'>
							<h1>
								<img
									src='https://res.cloudinary.com/dgyolr1sq/image/upload/v1702892750/Logovictoriatour_w6xuke.jpg'
									alt=''
									className='nav-logo'
								/>
							</h1>
						</Link>
					</div>
				</div>
                <div className='navbar-center'>
					<ul className='nav-list'>
						<li>
							<Link to='/'>Home</Link>
						</li>
                        <li>
							<Link to='/about-us'>About Us</Link>
						</li>
                        <li>
							<Link to='/destination'>Destinations</Link>
						</li>
                        <li>
							<Link to='/travel-list'>TOURS</Link>
						</li>
                        <li>
							<Link to='/hotel'>Hotel</Link>
						</li>
                        <li>
							<Link to='/news'>News</Link>
						</li>
                        <li>
							<Link to='/'>Contact</Link>
						</li>
						
					</ul>
				</div>
                <div className='navbar-right'>
					<div className='navbar-center-input'>
                    <Button className='btn-book-now' variant="contained">Book Now</Button>

					</div>
				</div>
    </div>
    
</div>

   
  )
}

export default Navbar
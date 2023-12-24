import React from 'react'
import { Box ,Typography,List,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AnimationIcon from '@mui/icons-material/Animation';
import {Link} from "react-router-dom"
const Sidebar = () => {
  return (
      <Box sx={{ width: "15%", backgroundColor:'#2874F0',height:"100vh",color:"white",position:'fixed',top:0,left:0}}>
        <Box>
            <Box>
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',':hover':{
                    cursor:'pointer'
                }}}>
                  
                    <Typography variant="h4" sx={{fontWeight:"400",textAlign:'center',padding:5}}>Quản Trị</Typography>
                </Box>
                <nav>
                    <List>


                    <ListItem sx={{':hover':{
                            backgroundColor:'blue'
                        }}}>
                              <ListItemButton>
                                  <ListItemIcon sx={{color:"white"}}><AnimationIcon /></ListItemIcon>
                                  <Link to="/"><ListItemText primary="Tài Khoản" /></Link>
                              </ListItemButton>
                          </ListItem>

                     
                          <ListItem sx={{':hover':{
                            backgroundColor:'blue'
                        }}}>
                              <ListItemButton>
                                  <ListItemIcon sx={{color:"white"}}><AnimationIcon /></ListItemIcon>
                                  <Link to="/product"><ListItemText primary="Sản Phẩm" /></Link>
                              </ListItemButton>
                          </ListItem>

                          <ListItem sx={{':hover':{
                            backgroundColor:'blue'
                        }}}>
                              <ListItemButton>
                                  <ListItemIcon sx={{color:"white"}}><WidgetsIcon /></ListItemIcon>
                                  <Link to="/category"><ListItemText primary="Danh Mục" /></Link>
                              </ListItemButton>
                          </ListItem>

                          <ListItem sx={{':hover':{
                            backgroundColor:'blue'
                        }}}>
                              <ListItemButton>
                                  <ListItemIcon sx={{color:"white"}}><ShoppingBasketIcon /></ListItemIcon>
                                  <Link to="/order"><ListItemText primary="Đơn Hàng" /></Link>
                              </ListItemButton>
                          </ListItem>
                
            
                    </List>
                </nav>
            </Box>
        </Box>
    </Box>
  )
}

export default Sidebar
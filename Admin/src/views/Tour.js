
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "../components/Headers/Header.js";
import { useEffect, useState } from "react";
import {request} from '../http.js'

import uuid from 'react-uuid';
import storage from '../storage'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
import {useNavigate} from 'react-router-dom'
const Tour = () => {
  const [categoryList,setCategoryList] = useState([]); 
  const [showOverlay,setShowOverlay] = useState(false); 
  const [categoryUpdate,setCategoryUpdate] = useState(""); 
  const [previewImage,setPreviewImage] = useState(""); 
  const [name,setName] = useState(""); 
  const [typeForm,setTypeForm] = useState(1); 
  const [id,setId] = useState(null); 
  const [image,setImage] = useState(""); 
  const [tour,setTour] = useState([]); 
  const [category,setCategory] = useState(""); 
  const [desc,setDesc] = useState("")
  const [personNumber,setPersonNumber] = useState(""); 
  const [time,setTime] = useState(""); 
  const [address,setAddress] = useState(""); 
  const  [price,setPrice] = useState(0); 
  const [isSale,setIsSale] = useState(0); 

  const [nameErr,setNameErr] = useState("");
  const [imageErr,setImageErr] = useState("");
  const [categoryErr,setCategoryErr] = useState("");
  const [descErr,setDescErr] = useState("");
  const [personNumberErr,setPersonNumberErr] = useState("");
  const [timeErr,setTimeErr] = useState("");
  const [addressErr,setAddressErr] = useState("");
  const [priceErr,setPriceErr] = useState("");
  const [isSaleErr,setIsSaleErr] = useState("");


  const getTour = async()=>{
    try {
      const response = await request.get('product'); 
      setTour(response.data.data); 
    } catch (error) {
      
    }
  }

  const getCategory = async()=>{
    try {
      const response = await request.get('category'); 
      setCategoryList(response.data.data); 
    } catch (error) {
      
    }
  }

  const handleChooseImage = (event)=>{
    setImageErr("")
    const file = event.target.files[0]; 
          const fileName =  `images/${uuid()}-${file?.name}`; 
          const storageRef = refStorage(storage,fileName); 
          uploadBytes(storageRef,file).then((snapshot)=>{
              getDownloadURL(refStorage(storage,fileName)).then(downloadUrl =>{
                setImage(`${downloadUrl}@-@${fileName}`)    
                setPreviewImage(`${downloadUrl}@-@${fileName}`)                    
              })
          })
}

const handleSubmit = async(e)=>{
  e.preventDefault(); 
  let isErr=  false; 
  if(name.trim() === ""){
    setNameErr("Tour name is required"); 
    isErr = true; 
  }

  if(desc.trim() === ""){
    setDescErr("Description is required")
    isErr = true

  }

  if(isSale.toString().trim() === ""){
    setIsSale("Sale is required")
    isErr = true

  }

  if(isSale.toString().trim() === ""){
    setIsSale("Description is required")
    isErr = true

  }

  if(price.toString().trim() === ""){
    setPriceErr("Price is required")
    isErr = true

  }




  
  if(address.trim() === ""){
    setAddressErr("Address is required")
    isErr = true

  }
  
  if(personNumber.trim() === ""){
    setPersonNumberErr("Person number is required")
    isErr = true

  }
  
  if(time.trim() === ""){
    setTimeErr("Date number is required")
    isErr = true
  }

  if(category.trim() === ""){
    setCategoryErr("Category is required")
    isErr = true

  }
  if(image.trim() === ""){
    setImageErr("Image is required")
    isErr = true
  }

  if(isErr) return; 


  if(typeForm === 1){
    try {
      await request.post('product',{
        image,
        name,
        desc,
        category,
        personNumber,
        time,
        price,
        address,
        isSale
      })
      getTour(); 
      setShowOverlay(false); 
    } catch (error) {
      
    }
  }else {
    try {
      await request.put(`product/${id}`,{
        image,
        name,
        desc,
        category,
        personNumber,
        time,
        price,
        isSale,
        address
      })
      getTour(); 
      setShowOverlay(false); 
    } catch (error) {
      
    }
  }

  setName("");
  setAddress("");
  setPersonNumber("");
  setTime(""); 
  setImage("");
  setCategory("");
  setPrice("")
  setShowOverlay(false); 
  setDesc("")
  setTypeForm(""); 
  setId(""); 
}


const handleRemove = async(id)=>{
  try {
    let text = "Are you sure deleted this tour ?";
    if (window.confirm(text) === true) {    
      await request.delete(`product/${id}`)
      getTour(); 
    }
 
  } catch (error) {
    
  }
}


const handleUpdate = (item)=>{
  setName(item.name);
  setAddress(item.address);
  setPersonNumber(item.personNumber);
  setTime(item.time); 
  setImage(item.image);
  setCategory(item.category);
  setPrice(item.price)
  setShowOverlay(true); 
  setDesc(item.desc)
  setTypeForm(2); 
  setId(item._id); 
}

const navigate = useNavigate(); 

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('user')) === null){
      navigate('/auth/login');
      return; 
  }

    getTour(); 
    getCategory()
  },[])


  return (
    <>
    {
      showOverlay === true && (
        <div className="overlay"> 
          <div className="model">
            <form style={{zIndex:999999999}} onSubmit={handleSubmit}>
              <div style={{position:'absolute',right:20,top:5,fontSize:25,cursor:'pointer'}}>
                <i class="fa-solid fa-xmark" onClick={()=>setShowOverlay(false)}></i>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Tour Name</label><br/>
                <span style={{color:'red'}}>{nameErr}</span>
                <input value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={(e)=> {
                  setNameErr("")
                  setName(e.target.value)}}/>
            
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Description</label><br/>
                <span style={{color:'red'}}>{descErr}</span>
                <input value={desc} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter description" onChange={(e)=> {
                  setDesc(e.target.value)
                  setDescErr("")
                }}/>
            
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Address</label><br/>
                <span style={{color:'red'}}>{addressErr}</span>
                <input value={address} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" onChange={(e)=> {
                  setAddress(e.target.value)
                  setAddressErr("")
                }}/>
            
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Date Number</label><br/>
                <span style={{color:'red'}}>{timeErr}</span>
                
                <input value={time} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter date number" onChange={(e)=> {
                  setTime(e.target.value)
                  setTimeErr("")
                }}/>
            
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Price</label><br/>
                <span style={{color:'red'}}>{priceErr}</span>
                
                <input value={price} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter price" onChange={(e)=> {
                  setPrice(e.target.value)
                  setPriceErr("")
                }}/>
            
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Person Number</label><br/>
                <span style={{color:'red'}}>{personNumberErr}</span>

                <input value={personNumber} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter person number" onChange={(e)=> {
                  setPersonNumber(e.target.value)
                  setPersonNumberErr("")
                }}/>
            
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Is Sale</label><br/>
                <span style={{color:'red'}}>{isSaleErr}</span>

                <input value={isSale} type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter is sale" onChange={(e)=> {
                  setIsSale(e.target.value)
                  setIsSaleErr("")
                }}/>
            
              </div>

              <div class="form-group" style={{display:'flex',flexDirection:'column'}}>
                <label for="exampleInputEmail1">Category</label><br/>
                <span style={{color:'red'}}>{categoryErr}</span>
                
                <select value={category} onChange={(e)=> {
                  setCategory(e.target.value)
                  setCategoryErr("");
                }}  class="form-select" aria-label="Default select example" style={{height:40,border:'1px solid #cad1d7',borderRadius:5}}>
                <option defaultChecked selected value="" disabled>Choose a category</option>
                  {
                    categoryList.length > 0 && categoryList.map(item =>{
                      return (
                        <option selected value={item._id}>{item.name}</option>
                      )
                    })
                  }
                </select>
            
              </div>


             
              <div class="form-group">
                <label for="exampleInputPassword1">Image</label><br/>
                <span style={{color:'red'}}>{imageErr}</span>

                <input type="file" class="form-control" id="exampleInputPassword1" placeholder="Image" onChange={handleChooseImage}/>
                {
                  image.trim() !== "" && (
                    <div>
                      <img width={150} height={150} src={image} alt=""/>
                  </div>
                  )
                }
              </div>
            
             
              <button  type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      )
    }
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
            <CardHeader className="border-0 d-flex" style={{justifyContent:'space-between', width:'100%'}}>
                <h3 className="mb-0">Tour</h3>
                <button className="btn btn-primary" onClick={()=> setShowOverlay(true)}>Create</button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Tour Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Time</th>
                    <th scope="col">Person Number</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Is Sale</th>
                    <th scope="col">Schedule</th>
                    <th scope="col">Action</th>                 
                  </tr>
                </thead>
                <tbody>
                  {
                    tour.length > 0 && tour.map(item =>{
                      return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                             
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                width={60}
                                height={60}
                                alt="..."
                                src={item.image}
                              />
                            </a>
                           
                          </Media>
                        </th>
                        <td>{item.name}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">                         
                            {item.address}
                          </Badge>
                        </td>
                        <td>{item.time}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{item.personNumber}</span>                        
                          </div>
                        </td>
                        <td className="text" style={{textWrap:'wrap'}}>
                            {item.desc.slice(0,55)}
                        </td>
                        <td className="text">
                            {item.price}
                        </td>
                        <td className="text">
                            {item.isSale}
                        </td>
                        <td className="text">
                        <i class="fa-solid fa-eye"></i>
                        </td>
                        <td className="text">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-warning" onClick={()=>handleUpdate(item)}>Update</button>
                                <button onClick={()=>handleRemove(item._id)} className="btn btn-danger">Remove</button>
                              </div>
                        </td>
                      </tr>
                      )
                    })
                  }
                
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
        
      </Container>
    </>
  );
};

export default Tour;

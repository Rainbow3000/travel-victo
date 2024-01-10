
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

import uuid from 'react-uuid';
import storage from '../storage'; 
import {ref as refStorage,uploadBytes, deleteObject , getDownloadURL} from 'firebase/storage'
// core components
import Header from "../components/Headers/Header.js";
import {request} from '../http.js'
import './views.scss'
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
const Category = () => {
  const [category,setCategory] = useState([]); 
  const [showOverlay,setShowOverlay] = useState(false); 
  const [categoryUpdate,setCategoryUpdate] = useState(""); 
  const [previewImage,setPreviewImage] = useState(""); 
  const [name,setName] = useState(""); 
  const [typeForm,setTypeForm] = useState(1); 
  const [id,setId] = useState(""); 
  const [image,setImage] = useState(""); 
  const navigate = useNavigate(); 
  const getCategory = async()=>{
    try {
      const response = await request.get('category'); 
      setCategory(response.data.data); 
    } catch (error) {
      
    }
  }

  const hanleUpdate = (item)=>{   
    setName(item.name); 
    setImage(item.image)
    setShowOverlay(true)
    setTypeForm(2); 
    setId(item._id)
  }


  const handleChooseImage = (event)=>{
    const file = event.target.files[0]; 
          const fileName =  `images/${uuid()}-${file.name}`; 
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

  if(typeForm === 1){
    try {
      await request.post('category',{
        image,
        name
      })
      getCategory(); 
      setShowOverlay(false); 
    } catch (error) {
      
    }
  }else {
    try {
      await request.put(`category/${id}`,{
        image,
        name
      })
      getCategory(); 
      setShowOverlay(false); 
    } catch (error) {
      
    }
  }

}

const handleDelete = async(id)=>{
  try {
    await request.delete(`category/${id}`)
    getCategory(); 
  } catch (error) {
    
  }
}

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('user')) === null){
      navigate('/auth/login');
      return; 
  }

    getCategory(); 
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
                <label for="exampleInputEmail1">Category Name</label>
                <input value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={(e)=> setName(e.target.value)}/>
            
              </div>
             
              <div class="form-group">
                <label for="exampleInputPassword1">Image</label>
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
                <h3 className="mb-0">Category</h3>
                <button className="btn btn-primary" onClick={()=> setShowOverlay(true)}>Create</button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>            
                    <th scope="col">Tour Number</th>
                    <th scope="col">Status</th>
                    <th className="text-right" scope="col">Action</th>
               
                  </tr>
                </thead>
                <tbody>
                  {
                    category.length > 0 && category.map(item =>{
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
                            <Media>
                            
                            </Media>
                          </Media>
                        </th>
                        <td>{item.name}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                           
                            {item.tourNumber}
                          </Badge>
                        </td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                           
                            {item.status}
                          </Badge>
                        </td>
                      
                        <td style={{display:'flex',justifyContent:'flex-end'}}>
                          <div className="d-flex align-items-center">
                            <button className="btn btn-warning" onClick={()=>hanleUpdate(item)}>Update</button>
                            <button className="btn btn-danger" onClick={()=> handleDelete(item._id)}>Remove</button>
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

export default Category;

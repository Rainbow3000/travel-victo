
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
  const Schedule = () => {
    const [showOverlay,setShowOverlay] = useState(false); 
    const [name,setName] = useState(""); 
    const [typeForm,setTypeForm] = useState(1); 
    const [id,setId] = useState(null); 
    const [image,setImage] = useState(""); 
    const [tour,setTour] = useState([]); 
    const [category,setCategory] = useState(""); 
    const [desc,setDesc] = useState("")
    const [personNumber,setPersonNumber] = useState(""); 
    const [time,setTime] = useState(""); 
    const [transportType,setTransportType] = useState(""); 
    const [dateStart,setDateStart] = useState(""); 
    const [dateEnd,setDateEnd] = useState(""); 
    const [price,setPrice] = useState(""); 
    const [product,setProduct] = useState(""); 
    const [schedule,setSchedule] = useState([]); 
    const [hotline,setHotline] = useState(""); 

    const [fromDateErr,setFromDateErr] = useState("")
    const [toDateErr,setToDateErr] = useState("")
    const [hotlineErr,sethotLineErr] = useState("")
    const [tourErr,setTourErr] = useState("")

    
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
      } catch (error) {
        
      }
    }

    
    const getSchedule = async()=>{
        try {
          const response = await request.get('schedule'); 
          setSchedule(response.data.data); 
        } catch (error) {
          
        }
      }
  
  const handleSubmit = async(e)=>{
    e.preventDefault(); 
  

    let isErr = false ; 


    if(dateStart.trim() === ""){
      setFromDateErr("From date is required")
    }

    if(dateEnd.trim() === ""){
      setToDateErr("To date is required")
    }


    if(hotline.trim() === ""){
      sethotLineErr("Hotline is required")
    }


    if(product.trim() === ""){
      setTourErr("Tour is required")
    }



    if(isErr) return; 


    if(typeForm === 1){
      try {
        await request.post('schedule',{
          product,
           hotline,
          dateStart,
          dateEnd,
        
        })
        getSchedule(); 
        setShowOverlay(false); 
      } catch (error) {
        
      }
    }else {
      try {
        await request.put(`schedule/${id}`,{
            product,
            hotline,
           dateStart,
           dateEnd,
        })
        getSchedule(); 
        setShowOverlay(false); 
      } catch (error) {
        
      }
    }

    setProduct("");
    setTransportType("");
    setDateStart(""); 
    setDateEnd("");
    setPrice("");
    setId("") 
  
  }
  const handleUpdate = (item)=>{
    setProduct(item.product);
    setTransportType(item.transportType);
    setDateStart(item.dateStart); 
    setDateEnd(item.dateEnd);
    setPrice(item.price);
    setShowOverlay(true);
    setId(item._id) 
    setTypeForm(2); 
  }
  
  const handleDelete = async(id)=>{
    try {
      let text = "Are you sure deleted this schedule ?";
      if (window.confirm(text) === true) {    
        await request.delete(`schedule/${id}`,)
        getSchedule(); 
      }
    } catch (error) {
        
    }
  }
  
    useEffect(()=>{
      getTour(); 
      getCategory();
      getSchedule(); 
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
                  <label for="exampleInputEmail1">From Date</label><br/>
                  <span style={{color:'red'}}>{fromDateErr}</span>
                  <input value={dateStart} type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter date start" onChange={(e)=> {
                    setDateStart(e.target.value)
                    setFromDateErr("")
                  }}/>
              
                </div>
  
                <div class="form-group">
                  <label for="exampleInputEmail1">To Date</label><br/>
                  <span style={{color:'red'}}>{toDateErr}</span>
                  <input value={dateEnd} type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter date end" onChange={(e)=>{
                     setDateEnd(e.target.value)
                     setToDateErr("")
                  }}/>
              
                </div>
  
                <div class="form-group">
                  <label for="exampleInputEmail1">Hotline</label><br/>
                  <span style={{color:'red'}}>{hotlineErr}</span>
                  <input value={hotline} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter hotline" onChange={(e)=> {
                    setHotline(e.target.value)
                    sethotLineErr(""); 
                  }}/>
              
                </div>
               
              
 
  
                <div class="form-group" style={{display:'flex',flexDirection:'column'}}>
                  <label for="exampleInputEmail1">Choose Tour</label><br/>
                  <span style={{color:'red'}}>{tourErr}</span>
                  <select value={product} onChange={(e)=> {
                    setProduct(e.target.value)
                    setTourErr("")
                  }}  class="form-select" aria-label="Default select example" style={{height:40,border:'1px solid #cad1d7',borderRadius:5}}>
                    <option defaultChecked disabled value="">Choose a tour</option>
                    {
                      tour.length > 0 && tour.map(item =>{
                        return (
                          <option value={item._id}>{item.name}</option>
                        )
                      })
                    }
                  </select>
              
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
                      <th scope="col">Tour Info</th>
                      <th scope="col">From Date</th>
                      <th scope="col">To Date</th>
                      <th scope="col">Hotline</th>
                     
                    
                      <th scope="col">Action</th>                 
                    </tr>
                  </thead>
                  <tbody>
                    {
                      schedule.length > 0 && schedule.map(item =>{
                        return (
                        <tr>
                          <td>
                            <span>{item.product}</span>
                          </td>
                          
                          <td>
                            <Badge color="" className="badge-dot mr-4">                         
                              {item.dateStart}
                            </Badge>
                          </td>
                          <td>{item.dateEnd}</td>
                        
                     
                          <td className="text">
                              {item.hotline}
                          </td>

                         
                          <td className="text">
                              <div className="d-flex align-items-center">
                                  <button className="btn btn-warning" onClick={()=>handleUpdate(item)}>Update</button>
                                  <button onClick={()=>handleDelete(item._id)} className="btn btn-danger">Remove</button>
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
  
  export default Schedule;
  
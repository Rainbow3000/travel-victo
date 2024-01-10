
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
import {useNavigate} from 'react-router-dom'
// core components
import Header from "../components/Headers/Header.js";
import { useEffect, useState } from "react";
import {request} from '../http.js'
const Order = () => {

  const [order,setOrder] = useState([]); 
  const getOrder = async()=>{
    try {
      const response = await request.get('order'); 
      setOrder(response.data.data); 
    } catch (error) {
      
    }
  }

  const handleExportExcel = async()=>{
    try {
      await request.post('/order/exportToExcel',order); 
      alert('Export to excel success !'); 
    } catch (error) {
      
    }
  }

  const handleDelete = async(id)=>{
    try {
      await request.put(`order/${id}`,{
        status:-1
      })
      getOrder(); 
    } catch (error) {
      
    }
  }

  const handleDone = async(id)=>{
    try {
      await request.put(`order/${id}`,{
        status:1
      })
      getOrder(); 
    } catch (error) {
      
    }
  }

  const navigate = useNavigate(); 




  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('user')) === null){
      navigate('/auth/login');
      return; 
  }

    getOrder(); 
  },[])


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
            <CardHeader className="border-0 d-flex" style={{justifyContent:'space-between', width:'100%'}}>
                <h3 className="mb-0">Order</h3>
                <button className="btn btn-primary" onClick={()=> handleExportExcel()}>Export</button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Product</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Total Monney</th>
                    <th scope="col">Total Monney</th>
                    <th scope="col">Pay Type</th>
                    <th scope="col">Note</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>                 
                  </tr>
                </thead>
                <tbody>
                  {
                    order.length > 0 && order.map(item =>{
                      return (
                          <tr>
                            <th scope="row">
                             <span>Email:{item.customer?.email}</span><br/>
                             <span>Name:{item.customer?.name}</span><br/>
                             <span>Phone number:{item.customer?.phoneNumber}</span><br/>
                            </th>
                            <td>
                              <span>Tour Name:{item.product?.name}</span><br/>
                              <span>From date:{item.schedule?.dateStart}</span><br/>
                              <span>To Date:{item.schedule?.dateEnd}</span><br/>
                            </td>
                            <td>{item.schedule.createdAt.split('T')[0]}</td>
                            <td>{item.schedule.dateEnd}</td>
                            <td>$ {item.totalMonney}</td>
                            <td>{item.payType}</td>
                            <td>{item.note}</td>
                            {
                                item.status === 0 && (
                                <td>
                                    <span style={{color:'blue'}}>Pending</span>
                                </td>
                                )
                            }
                              {
                              item.status === 1 && (
                                <td>
                                  <span style={{color:'green'}}>OK</span>
                                </td>
                              )
                            }

{
                              item.status === -1 && (
                                <td>
                                  <span style={{color:'red'}}>Cancel</span>
                                </td>
                              )
                            }
                           
                            <td style={{display:'flex',justifyContent:'flex-end'}}>
                                  <div className="d-flex align-items-center">
                                    <button onClick={()=>handleDone(item._id)} className="btn btn-success">Done</button>
                                    <button onClick={()=>handleDelete(item._id)} className="btn btn-danger">Cancel</button>
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

export default Order;

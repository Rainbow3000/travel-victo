
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
const Order = () => {

  const [order,setOrder] = useState([]); 
  const getOrder = async()=>{
    try {
      const response = await request.get('order'); 
      setOrder(response.data.data); 
    } catch (error) {
      
    }
  }

  useEffect(()=>{
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
                              <Media className="align-items-center">
                                <a
                                  className="avatar rounded-circle mr-3"
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require("../assets/img/theme/angular.jpg")}
                                  />
                                </a>
                                <Media>
                                  <span className="mb-0 text-sm">
                                    Angular Now UI Kit PRO
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>$1,800 USD</td>
                            <td>$1,800 USD</td>
                            <td>$1,800 USD</td>
                            <td>$1,800 USD</td>
                            <td>$1,800 USD</td>
                            <td>$1,800 USD</td>
                            <td style={{display:'flex',justifyContent:'flex-end'}}>
                                  <div className="d-flex align-items-center">
                                    <button className="btn btn-success">Done</button>
                                    <button className="btn btn-danger">Remove</button>
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

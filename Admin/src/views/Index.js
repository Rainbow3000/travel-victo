

import Header from "../components/Headers/Header.js";
import { useState,useEffect } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import {request} from '../http'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [charts,setCharts] = useState(null);  
  const [customer,setCustomer] = useState([]); 
  const [chartData,setChartData] = useState([
    {
      id:1,
      name: 'Jan', 
    },
    {
      id:2,
      name: 'Feb'
    },
    {
      id:3,
      name: 'Mar',
    
    },
    {
      id:4,
      name: 'Apr',
     
    },
    {
      id:5,
      name: 'May',
    
    },
    {
      id:6,
      name: 'Jun',
    },
    {
      id:7,
      name: 'Jul',
    },
    {
      id:8,
      name: 'Aug',
   
    },
    {
      id:9,
      name: 'Sep',
   
    },
    {
      id:10,
      name: 'Oct',
   
   
    },
    {
      id:11,
      name: 'Nov',
    
     
    },
    {
      id:12,
      name: 'Dec',    
    },
  ]
)
  const getCharts = async()=>{
    try {
      const response = await request.get('order/charts'); 
      setCharts(response.data); 
    } catch (error) {
      
    }
  }

  const getCustomer = async()=>{
    try {
      const response = await request.get('/customer'); 
      setCustomer(response.data.data); 
    } catch (error) {
      
    }
  }

  


  useEffect(()=>{
    getCharts(); 
    getCustomer(); 
  },[]); 

  useEffect(()=>{
    const chartFilter = charts?.data.order.filter(item => item._id.year === new Date().getFullYear());
    const newValue = chartData?.map(item => {
        const check = chartFilter?.find(c => c._id.month === item.id)
        if(check !== undefined){
            item.value = check.quantity;
        }else {
          item.value = 0; 
        }
        return item;
    })
    setChartData(newValue); 
   
  },[charts]); 

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-light-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                  
                    <h2 className="text-dark mb-0">Order Per Mon</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                     
                     
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                 
                </LineChart>
        </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Customer List</h3>
                  </div>
                  <div className="col text-right">
                  
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    customer.length > 0 && customer.map(item =>{
                      return (
                        <tr>
                          <th scope="row">{item.email}</th>
                          <td>{item.name}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" /> {item.address}
                          </td>
                          <td>
                              <div className="d-flex align-items-center">
                                  <button className="btn btn-danger">Remove</button>
                                </div>
                          </td>
                        </tr>

                      )
                    })
                  }
                 
                </tbody>
              </Table>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
};

export default Index;

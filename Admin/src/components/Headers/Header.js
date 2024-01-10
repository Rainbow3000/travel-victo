
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import {request} from '../../http'
import { useEffect, useState } from "react";

const Header = () => {
  const [charts,setCharts] = useState(null);  
  const [totalOrder,setTotalOrder] = useState(0); 
  const getCharts = async()=>{
    try {
      const response = await request.get('order/charts'); 
      setTotalOrder(response.data?.data.order.reduce((x,y)=>{
        return x + y.quantity
      },0))
      setCharts(response.data); 
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getCharts(); 
  },[]); 

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tour
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {charts?.data?.product}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Order
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalOrder}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                 
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Monney
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{charts?.data?.total === null ? 0 : charts?.data?.total} $</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fa fa-usd" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          ORDER CANCEL
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{charts?.data?.cancel}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                  
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;

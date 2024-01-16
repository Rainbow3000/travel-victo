
import { useEffect, useState } from "react";
import {request} from '../http'
import {useNavigate} from 'react-router-dom'
import { GrClose } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {


  const [email,setEmail] = useState(""); 
  const [emailRecover,setEmailRecover] = useState(""); 
  const [password,setPassword] = useState(""); 
  const [emailErr,setEmailErr] = useState(""); 
  const [passwordErr,setPasswordErr] = useState(""); 
  const [err,setErr] = useState(""); 
  const [forgetPass,setForgetPass] = useState(false); 
  const navigate = useNavigate(); 



  const handleResetPass = async()=>{
      try {
        if(emailRecover.trim() === ""){
          setErr("Email is required !")
          return; 
        }
        await request.post('/auth/resetPass',{email:emailRecover});
        alert('Your password has been send to your mail.Please check your mail to get new password !')
        setForgetPass(false); 
      } catch (error) {
        setErr(error.response.data.data)
      }
  }



  const handleSubmit = async(e)=>{
    setEmailErr("")
    setPasswordErr("")
    setErr(""); 
    let flag = 0 ; 
    e.preventDefault();
    try {

      if(email.trim() === ""){
        setEmailErr("Email is required"); 
        flag = 1;
      }

      if(password.trim() === ""){
        setPasswordErr("Password is required"); 
        flag = 1;
      }

      if(flag === 1){
        return ;
      }

      const response = await request.post('/auth/login',{
        email,
        password
      }); 
      console.log(response.data.data)
      if(response.data && response.data?.data?.isAdmin === true){
          localStorage.setItem('user',JSON.stringify(response.data)); 
          navigate('/')
      }else {
        setErr("Account is not allowed")
      }
    } catch (error) {  
      setErr(error.response.data.data)
    }
  }

  const handleSetForget = (value)=>{
    setErr(""); 
    setEmailErr("");
    setPasswordErr("");
    setForgetPass(value)
  }

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('user')) !== null){
      navigate('/');
      return; 
  }

  },[])


  return (
    <>
      <Col lg="5" md="7" style={{position:'relative'}}>
        <Card className="bg-secondary shadow border-0">
             {
              forgetPass === true && (
                <div style={{position:'absolute',top:0,left:10,cursor:'pointer',fontSize:35}} onClick={()=>handleSetForget(false)}>
                  <IoIosArrowRoundBack/>
                </div>
              )
             }
        
          <CardBody className="px-lg-5 py-lg-5">
           
            <Form role="form" onSubmit={handleSubmit} style={{position:'relative'}}>
              {
                forgetPass === false ? (
                  <>
                    <span style={{color:'red'}}>{err}</span>
                    <FormGroup className="mb-3">
                      <span style={{color:'red'}}>{emailErr}</span>
                      <InputGroup className="input-group-alternative">
                      
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={email}
                          placeholder="Email"
                          type="email"
                          autoComplete="new-email"
                          onChange={(e)=> {
                            setEmail(e.target.value)
                            setErr("")
                            setEmailErr("")
                            setPasswordErr("")
                          }
                          }
                          
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <span style={{color:'red'}}>{passwordErr}</span>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value= {password}
                          onChange={(e)=> {
                            setPassword(e.target.value)
                            setErr("")
                            setEmailErr("")
                            setPasswordErr("")}}
                          placeholder="Password"
                          type="password"
                          autoComplete="new-password"
                        />
                      </InputGroup>
                    </FormGroup>
                  </>
                ):(
                <FormGroup>
                  <span style={{color:'red'}}>{err}</span>
                  <InputGroup className="input-group-alternative" style={{position:'relative'}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value= {emailRecover}
                      onChange={(e)=> {
                        setErr("")
                        setEmailErr("")
                        setPasswordErr("")
                        setEmailRecover(e.target.value)}}
                      placeholder="Enter email to reset password"
                      type="email"
                      autoComplete="new-password"
                     
                    />
                  
                  </InputGroup>
                </FormGroup>
                )
              }




              <div className="text-left">
                
                
                {
                  forgetPass === false && (
                    <span onClick={()=>handleSetForget(true)} style={{textDecoration:'underline',cursor:'pointer'}} className="text-left">Forget password ?</span>
                  )
                }
                
              </div>
              <div className="text-left">
                {
                  forgetPass === false ? (
                <Button className="my-4" color="primary" type="submit">
                  Login
                </Button>

                  ):(
                    <Button onClick={(e)=> handleResetPass()} className="my-4" color="primary" type="button">
                    Reset
                  </Button>
                  )
                }
              </div>
            </Form>
          </CardBody>
        </Card>
      
      </Col>
    </>
  );
};

export default Login;

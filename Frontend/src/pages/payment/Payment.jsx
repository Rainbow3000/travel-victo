import React, { useState } from 'react';
import './payment.scss';
const Payment = () => {
    const [name,setName] = useState(""); 
    const [email,setEmail] = useState(""); 
    const [phone,setPhone] = useState(""); 
    const [address,setAddress]= useState(""); 
    const [note,setNote] = useState(""); 

    const [nameErr,setNameErr] = useState(""); 
    const [emailErr,setEmailErr] = useState(""); 
    const [phoneErr,setPhoneErr] = useState(""); 
    const [addressErr,setAddressErr]= useState(""); 
    const [noteErr,setNoteErr] = useState(""); 


    const handleSubmit = (e)=>{
        e.preventDefault(); 
        const check = 0; 
        if(name.trim() === ""){
            setNameErr("Name is required")
            check = 1; 
        }

        if(email.trim() === ""){
            setEmailErr("Email is required")
            check = 1; 
        }
        if(phone.trim() === ""){
            setPhoneErr("Phone is required")
            check = 1; 
        }

        if(address.trim() === ""){
            setAddressErr("Address is required")
            check = 1; 
        }

        if(note.trim() === ""){
            setNoteErr("Note is required")
            check = 1; 
        }

        if(check === 1) return; 

        const customer = {
            name,
            email,phone,
            address,
            note
        }

        const order = {

        }

    }

    return (

        <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">ORDER INFO</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-lg-10 col-md-12">
					<div class="wrapper">
						<div class="row no-gutters">
							<div class="col-md-7 d-flex align-items-stretch">
								<div class="contact-wrap w-100 p-md-5 p-4">
							
									<div id="form-message-warning" class="mb-4"></div> 
				      		<div id="form-message-success" class="mb-4">
				           
				      		</div>
									<form method="POST" id="contactForm" name="contactForm" onSubmit={handleSubmit}>
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<input type="text" class="form-control" name="name" id="name" placeholder="Name" onChange={(e)=> setName(e.target.value)}/>
												</div>
											</div>
											<div class="col-md-6"> 
												<div class="form-group">
													<input type="email" class="form-control" name="email" id="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<input type="text" class="form-control" name="subject" id="subject" placeholder="Phone" onChange={(e)=> setPhone(e.target.value)}/>
												</div>

                                                <div class="form-group">
													<input type="text" class="form-control" name="subject" id="subject" placeholder="Address" onChange={(e)=> setAddress(e.target.value)}/>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<textarea name="message" class="form-control" id="message" cols="30" rows="7" placeholder="Message" onChange={(e)=> setNote(e.target.value)}></textarea>
												</div>
											</div>
											<div class="col-md-12" style={{display:'flex'}}>
												<div class="form-group">
													<input type="submit" value="ORDER" class="btn btn-primary"/>
													<div class="submitting"></div>
												</div>
                                                <div class="form-group">
													<input type="submit" value="ORDER WITH PAYPAL" class="btn btn-primary"/>
													<div class="submitting"></div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div className='info-tour-wrapper' class="col-md-5 d-flex align-items-stretch" >
								<div class="info-wrap bg-primary w-100 p-lg-5 p-4">
									<h3  class="mb-4 mt-md-4">Your Tour</h3>




                            <div class="dbox w-100 d-flex align-items-start">
				        		<div class="icon d-flex align-items-center justify-content-center">
				        			<span class="fa fa-map-marker"></span>
				        		</div>
				        		<div class="text pl-3">
					            <p><span >Tour Name:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
					          </div>
				           </div>
 

				        	<div class="dbox w-100 d-flex align-items-start">
				        		<div class="icon d-flex align-items-center justify-content-center">
				        			<span class="fa fa-map-marker"></span>
				        		</div>
				        		<div class="text pl-3">
					            <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
					          </div>
				           </div>
				        	<div class="dbox w-100 d-flex align-items-center">
				        		<div class="icon d-flex align-items-center justify-content-center">
				        			<span class="fa fa-phone"></span>
				        		</div>
				        		<div class="text pl-3">
					            <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
					          </div>
				          </div>
				        	<div class="dbox w-100 d-flex align-items-center">
				        		<div class="icon d-flex align-items-center justify-content-center">
				        			<span class="fa fa-paper-plane"></span>
				        		</div>
				        		<div class="text pl-3">
					            <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
					          </div>
				          </div>
				        	<div class="dbox w-100 d-flex align-items-center">
				        		<div class="icon d-flex align-items-center justify-content-center">
				        			<span class="fa fa-globe"></span>
				        		</div>
				        		<div class="text pl-3">
					            <p><span>Website</span> <a href="#">yoursite.com</a></p>
					          </div>
				          </div>
			          </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    )
};

export default Payment;

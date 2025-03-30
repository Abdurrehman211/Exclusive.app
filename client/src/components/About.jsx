import React from 'react';
import './about.css';
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

import Images from './images/images.jpeg';
import img from './images/image1.jpeg';
import img1 from './images/images2.jpeg';
import head from './images/headphines.png';
import deliver from './images/delivery.png';
import secure from './images/security.png';
import Footer from './Footer';

function About ()
{
    return (
    <>
    <div className='container'> 
        <div className='row'>
        
<div className="col-lg-6 col-md-12 col-sm-12"> 
    <div className='our-story'> 
       <h1> Our Story</h1>  
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br/> Laborum deleniti accusamus obcaecati dolor dicta ab quas cumque<br/>  reiciendis voluptatem, natus magnam soluta nobis harum eaque reprehenderit aliquid m<br/> aiores voluptas vitae?</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique impedit corporis, quaerat dicta quisquam fugit ratione facere placeat deleniti optio atque eos. Similique obcaecati velit ex eum sed iusto nihil?</p>
    </div>
</div>
<div className="col-lg-6 col-md-12 col-sm-12 ">
    <div className='picture'>
        sdjdnsjdsndjsdbkjb
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus illum tempora optio, tenetur ducimus sunt eum culpa sint nemo, ex dolorem repellat eos adipisci officia eaque molestiae rem totam voluptas.</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus atque nobis, sint dolor earum non sunt delectus quidem, necessitatibus commodi quae veritatis voluptatem! Itaque illum illo, debitis deleniti error natus.</p>
    </div>
</div>
</div>
<div className='row mt-5'>
    <div className="  col-lg-3 col-md-12 col-sm-12" > 
        <div className='card1'>
        
        <h3> 10.5k</h3>
        <p> Saller active our site</p>
        </div>
        
    </div>
    <div className="  col-lg-3 col-md-12 col-sm-12" > 
     <div className='card1'> 
        <h3> 33k</h3>
        <p> Monthly product sale</p>
        </div>
       
    </div>
    <div className=" col-lg-3 col-md-12 col-sm-12" > 
        <div className='card1'>

        <h3> 44.5k</h3>
        <p> Custome active on our site</p>
        </div>
        
    </div>
    <div className="  col-lg-3 col-md-12 col-sm-12 "> 
 <div className='card1'>
        <h3> 10k</h3>
        <p> Average gross sale in our sute</p>
        </div>
    
    </div>
    </div>
    <div className='row  row-2  mt-5  ms-5 '>
        <div className='col-lg-4 col-md-12 col-sm-12  ps-5 '>
            <div className='img1 '>
                <img src={Images} alt="images" />
            </div>
            <div className='img-body pt-3 '> 
                <h4> Tom Cruise</h4>
                <p> Founder and chairmain</p>
            </div>
            <div>
            
            <a href='#'> <FaLinkedin size={20} color='black' />  </a>
         <a href='#'>   <FaTwitter size={20} color='black' /> </a> 
          <a href='#'>  <FaFacebook size={20} color='black'  /> </a> 

              
            </div>
        </div>
        <div className='col-lg-4 col-md-12 col-sm-12 ps-5'>
            <div className='img1'>
                <img src={img} alt="image"  style={{ height: '200px', backgroundColor:"red"}}/>
            </div>
            <div className='img-body  pt-3'> 
                <h4 className='ps-4' > Will Smith</h4>
                <p className='ps-4 '> Managing Director</p>
            </div>
            <div className='ps-4'>
             
            <a href='#'> <FaLinkedin size={20} color='black' />  </a>
         <a href='#'>   <FaTwitter size={20} color='black' /> </a> 
          <a href='#'>  <FaFacebook size={20} color='black'  /> </a> 
            </div>
        </div>
        <div className='col-lg-4 col-md-12 col-sm-12 ps-5'>
            <div className='img1'>
                <img src={img1} alt="image" />
            </div>
            <div className='img-body pt-3'> 
                <h4 className='ps-5'> Emma Watson</h4>
                <p className='ps-5'> Product Director</p>
            </div>
            <div className='ps-5'>
           
            <a href='#'> <FaLinkedin size={20} color='black' />  </a>
         <a href='#'>   <FaTwitter size={20} color='black' /> </a> 
          <a href='#'>  <FaFacebook size={20}  color='black' /> </a> 
            </div>
        </div>
    </div>

    <div className='row  row-3 pb-5'>
        <div className='col-lg-3 col-md-12 col-sm-12'>
            <div className='img2' >
                <img src={head} alt=" image" />


            </div>
            <div>      
                
                <h6>  Free And Fast Delivery</h6>
                <p> Free Delivery on order over $100</p>
                </div>
            

        </div>



        <div className='col-lg-3 col-md-12 col-sm-12'>
            <div className='img2' >
                <img src={deliver} alt=" image" />

            </div>


            <div className='icon-body'>
                
            <h6>  Free And Fast Delivery</h6>
            <p> Free Delivery on order over $100</p>
            </div>

        </div>
       




        <div className='col-lg-3 col-md-12 col-sm-12'>
            <div className='img2' >
                <img src={secure} alt=" image" />
                

            </div>
            <div>  
                
            <h6>  Free And Fast Delivery</h6>
            <p> Free Delivery on order over $100</p>
                
                
                
                    </div>
            
           

        </div>
        


    </div>

    

    
   
    





    </div>
<footer>
<Footer/>
    

    </footer>





    </>
    )
}
 export default About;
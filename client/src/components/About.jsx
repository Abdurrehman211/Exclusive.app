import React from 'react';
import './about.css';
import controller from './images/controlller.png';
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
    <div className="  col-lg-3 col-md-12 col-sm-12"> 
 <div className='card1'>
        <h3> 10k</h3>
        <p> Average gross sale in our sute</p>
        </div>
    
    </div>
    </div>
    <div className='row  mt-5 '>
        <div className='col-lg-4 col-md-12 col-sm-12 '>
            <div className='img1'>
                <img src={controller} alt="controller" />
            </div>
            <div className='img-body'> 
                <h6> M huzaifa khan</h6>
                <p> ba,ajanldcnacdk</p>
            </div>
        </div>
        <div className='col-lg-4 col-md-12 col-sm-12'>
            <div className='img1'>
                <img src={controller} alt="controller" />
            </div>
            <div className='img-body'> 
                <h6> M huzaifa khan</h6>
                <p> ba,ajanldcnacdk</p>
            </div>
        </div>
        <div className='col-lg-4 col-md-12 col-sm-12'>
            <div className='img1'>
                <img src={controller} alt="controller" />
            </div>
            <div className='img-body'> 
                <h6> M huzaifa khan</h6>
                <p> ba,ajanldcnacdk</p>
            </div>
        </div>
    </div>
   
    





    </div>
    </>
    )
}
 export default About;
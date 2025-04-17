import React from 'react';
import './wish.css';
import Footer from './Footer';
import Quickview from './images/QuickView.png';
import Bag from './images/bag.png';
import Coat from './images/coat.png';
import controller from './images/controlller.png';
import chair from './images/Chair.png';
import stars from './images/Fivestar.png';




function Wish()
{
    return(
        <>
        <div className='container'>
            <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6'>
                <p id='p1'>Wishlist (4)</p> 
                </div>

               <div className='col-lg-6 col-md-6 col-sm-6 ' >
            <button className='bag' > Move to Bag</button>
            </div> 
            </div>
            <div className='row mt-5'>

                <div className='col-lg-3 col-md-6 col-sm-12'>
                    <div className='wish-card'>
                    <p style={{float:'left', paddingRight:"240px"}}>35%</p>
                    <img src={Quickview} alt="img"id='quickview' />

                    <div className='main-layer'>   
                        <img src={Bag} alt="immg"  style={{ marginLeft:'50px'}} />
                        <button className='dark'> Add to Cart</button>
                        </div> 
                        
                        <div className='card-body' >
                            <p className='ms-4'>Gucci Diffle Bag</p>
                            <div className='pricee ms-4'>
                            <p>$960</p>
                            <del>1120</del>
                            </div>
                        </div>
                        </div>
                        
                        
                    
                </div>




                <div className='col-lg-3 col-md-6 col-sm-12'>
                    <div className='wish-card'>
                     <p style={{float:'left', paddingRight:"240px"}}>35%</p>
                    <img src={Quickview} alt="img" id='quickview' />
                    
                        <div className='main-layer'>
                        
                        <img src={Coat} alt="immg"  style={{ marginLeft:'50px'}} />
                        <button className='dark'> Add to Cart</button>
                        </div>
                        
                        

                        <div className='card-body'>
                            <p className='ms-4'>Gucci Diffle Bag</p>
                            <div className='pricee ms-4'>
                            <p>$960</p>
                            <del>1120</del>
                            </div>
                        </div>
                        </div>
                        
                        
                    
                </div>



                <div className='col-lg-3 col-md-6 col-sm-12'>
                    
                    <div className='wish-card'>
                    <p style={{float:'left', paddingRight:"240px"}}>35%</p>
                    
                    <img src={Quickview} alt="img" id='quickview' />
                        <div className='main-layer'>
                        
                        <img src={chair} alt="immg"  style={{ marginLeft:'50px'}} />
                        <button className='dark'> Add to Cart</button>
                        </div>
                        
                        
                       
                        <div className='card-body' >
                            <p className='ms-4'>Gucci Diffle Bag</p>
                            <div className='pricee ms-4'>
                            <p>$960</p>
                            <del>1120</del>
                            </div>
                        </div>

                        </div>
                        

                       
                        
                        
                    
                </div>



                <div className='col-lg-3 col-md-6 col-sm-12'>
                    <div className='wish-card'>
                     
                    <img src={Quickview} alt="img" id='quickview' />
                    <p style={{float:'left', paddingRight:"240px"}}>35%</p>
                        <div className='main-layer'>
                        
                        <img src={ controller} alt="immg"  style={{ marginLeft:'50px'}} />
                        <button className='dark'> Add to Cart</button>
                        </div>
                        
                       

                        <div className='card-body' >
                            <p className='ms-4'>Gucci Diffle Bag</p>
                            <div className='pricee ms-4'>
                            <p>$960</p>
                            <del>1120</del>
                            </div>
                        </div>
                        </div>
                        
                        
                    
                </div>
            </div>


<div className='row mt-5'>
<div className='col-lg-6 col-md-6 col-sm-6 '> 
    <div className='side-para'>
    <p id='none'> </p>
    <h5>Just For You</h5>
    </div>
</div>

<div className='col-lg-6 col-md-6 col-sm-6'> 
    <button className='see-all'> See All</button>
</div>

</div>



            <div className='row mt-5 mb-5'>

<div className='col-lg-3 col-md-6 col-sm-12'>
    <div className='wish-card'>
    <p style={{float:'left', paddingRight:"240px"}}>35%</p>
    <img src={Quickview} alt="img"id='quickview' />

    <div className='main-layer'>   
        <img src={Bag} alt="immg"  style={{ marginLeft:'50px'}} />
        <button className='dark'> Add to Cart</button>
        </div> 
        
        <div className='card-body' >
            <p className='ms-4'>Gucci Diffle Bag</p>
            <div className='pricee ms-4'>
            <p>$960</p>
            <del>1120</del>
            </div>
            <div className='rating'> 
                <img src={stars} alt="img" id='Stars' />
                <p> (80)</p>
            </div>
        </div>
        </div>
        
        
    
</div>




<div className='col-lg-3 col-md-6 col-sm-12'>
    <div className='wish-card'>
     <p style={{float:'left', paddingRight:"240px"}}>35%</p>
    <img src={Quickview} alt="img" id='quickview' />
    
        <div className='main-layer'>
        
        <img src={Coat} alt="immg" style={{ marginLeft:'50px'}} />
        <button className='dark'> Add to Cart</button>
        </div>
        
        

        <div className='card-body'>
            <p className='ms-4'>Gucci Diffle Bag</p>
            <div className='pricee ms-4'>
            <p>$960</p>
            <del>1120</del>
            </div>
            <div className='rating'> 
                <img src={stars} alt="img" id='Stars' />
                <p> (80)</p>
            </div>
        </div>
        </div>
        
        
    
</div>



<div className='col-lg-3 col-md-6 col-sm-12'>
    
    <div className='wish-card'>
    <p style={{float:'left', paddingRight:"240px"}}>35%</p>
    
    <img src={Quickview} alt="img" id='quickview'  />
        <div className='main-layer'>
        
        <img src={chair} alt="immg"  style={{ marginLeft:'50px'}}/>
        <button className='dark'> Add to Cart</button>
        </div>
        
        
       
        <div className='card-body' >
            <p className='ms-4'>Gucci Diffle Bag</p>
            <div className='pricee ms-4'>
            <p>$960</p>
            <del>1120</del>
            </div>
            <div className='rating'> 
                <img src={stars} alt="img" id='Stars' />
                <p> (80)</p>
            </div>
        </div>

        </div>
        

       
        
        
    
</div>



<div className='col-lg-3 col-md-6 col-sm-12'>
    <div className='wish-card'>
     
    <img src={Quickview} alt="img" id='quickview' />
    <p style={{float:'left', paddingRight:"240px"}}>35%</p>
        <div className='main-layer'>
        
        <img src={ controller} alt="immg" style={{ marginLeft:'50px'}} />
        <button className='dark'> Add to Cart</button>
        </div>
        
       

        <div className='card-body' >
            <p className='ms-4'>Gucci Diffle Bag</p>
            <div className='pricee ms-4'>
            <p>$960</p>
            <del>1120</del>

            </div>
            <div className='rating'> 
                <img src={stars} alt="img" id='Stars' />
                <p> (80)</p>
            </div>
        </div>
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
export default Wish;
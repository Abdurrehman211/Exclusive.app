import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const WatchCarousel = ({ products }) => {
  const navigate = useNavigate();

  // Filter watches from products
  const watches = products.filter(product => 
    product.Category?.toLowerCase().includes('watch') || 
    product.ProductType?.toLowerCase().includes('watch')
  );

  if (watches.length === 0) {
    return (
      <div className="watch-carousel-wrapper">
        <div className="container mt-4 text-center text-white">
          <p>No watches available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watch-carousel-wrapper">
      <Carousel 
        indicators={true} 
        
        pause="hover"
        className="watch-carousel"
      >
        {watches.slice(0, 5).map((watch, index) => (
          <Carousel.Item key={watch._id || index}>
            <div className="watch-slide">
              {/* Left side - Product info */}
           <div className="watch-info">
  <h1 className="main-headline">
    <span className="headline-part1">Timeless</span><br />
    <span className="headline-part2">Precision</span>
    <br />
    <span className="headline-part3">For The Discerning</span>
  </h1>
</div>

              {/* Right side - Product image */}
              <div className="watch-image">
                <img
                  src={watch.ImageURL || 'default-watch-image.jpg'}
                  alt={watch.Name}
                  className="img-fluid watch-img"
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default WatchCarousel;
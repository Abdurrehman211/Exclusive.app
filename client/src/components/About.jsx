import React from "react";
import "./about.css";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import Images from "./images/SideImage.png";
import dollar from "./images/dollar.png";
import customer from "./images/customer.png";
import seller from "./images/sellers.png";
import cash from "./images/cash.png";
import team1 from './images/team1.jpg';
import team2 from './images/team2.jpg';
import team3 from './images/team3.jpg';
import team4 from './images/team4.jpg';
import deliver from "./images/delivery.png";
import secure from "./images/security.png";
import shop from "./images/shoping.jpeg";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

function About() {
  const Location = useLocation();

  console.log(Location);
  return (
    <>
      <section id="Links">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>Home {Location.pathname}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="Hero-About">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12" id="Story">
              <h2>Our Story</h2>
              <p>
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12" id="Story">
              <img
                src={Images}
                alt="Some image of the user shopping | Exclusive site"
                height={"100%"}
                width={"100%"}
              />
            </div>
          </div>
        </div>
      </section>
      <section id="Cards-about">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card1">
                <div className="card-head mb-4">
                  <p className="p">
                    <img
                      src={seller}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>10.5K</h3>
                <p>Active Seller</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card1">
                <div className="card-head mb-4">
                  <p className="p">
                    <img
                      src={cash}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>33K</h3>
                <p>Monthly product sale</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card1">
                <div className="card-head mb-4">
                  <p className="p">
                    <img
                      src={dollar}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>25K</h3>
                <p>Anuual gross sale</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="card1">
                <div className="card-head mb-4">
                  <p className="p">
                    <img
                      src={customer}
                      alt="Some image of the user shopping | Exclusive site"
                    />
                  </p>
                </div>
                <h3>40.5K</h3>
                <p>Customers Active </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="our_team">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card3">
              <div className="card-team">
                <img src={team3} alt="Some image of the user shopping | Exclusive site" width={"90%"} height={"90%"} />
              </div>
              <div className="card-body">
                <h4>
                  CEO
                </h4>
                <h5>
                  Muhammad Hammad
                </h5>
                <div className="social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook color="#3b5998" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter color="#3b5998" />
      </a>
      <a href="mailto:example@mail.com">
        <FaLinkedin color="#3b5998" />
      </a>
                </div>
              </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
   <div className="card3">
              <div className="card-team">
                 <img src={team2} alt="Some image of the user shopping | Exclusive site" width={"90%"} height={"90%"} />
              </div>
              <div className="card-body">
                <h4>
                  Manager
                </h4>
                <h5>
                  Huzaifa Khan Niazi
                </h5>
                  <div className="social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook color="#3b5998" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter color="#3b5998" />
      </a>
      <a href="mailto:example@mail.com">
        <FaLinkedin color="#3b5998" />
      </a>
                </div>
              </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
                 <div className="card3">
              <div className="card-team">
                 <img src={team4} alt="Some image of the user shopping | Exclusive site" width={"90%"} height={"90%"} />
              </div>
              <div className="card-body">
                <h4>
                  Developer
                </h4>
                <h5>
                  Abdurrehman Abid
                </h5>
                  <div className="social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook color="#3b5998" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter color="#3b5998" />
      </a>
      <a href="mailto:example@mail.com">
        <FaLinkedin color="#3b5998" />
      </a>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default About;

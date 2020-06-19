import React, { useState } from "react";
import ImageSlider from "react-image-comparison-slider";
import { Link, NavLink, withRouter } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import ReactCompareImage from 'react-compare-image';
import "./Slider.css";

import img1 from "../homeImages/social2.jpg";
import img2 from "../homeImages/shop.jpg";

export default function Slider() {
  const [posx, setPosx] = useState('650');

  function getCursorPosition(e)
    {
        var posx = 0;
        if (!e) var e = window.event;
        if (e.pageX)     {
            posx = e.pageX- document.documentElement.scrollLeft- document.body.scrollLeft;
        }
        else if (e.clientX || e.clientY)     {
            posx = e.clientX ;
        }
        console.log(posx)
        return setPosx(posx)
      }


      const life = (
        <div className="shop">
        <h1>SERVICE</h1>
          <a
            as={NavLink}
            to="/shop"
            onClick={() => localStorage.setItem('page', 1)}
          >
           <p>welcome to MANO shop</p>
            <Button className="button-shop">SHOP --></Button>
          </a>
        </div>
       
       
      )

      const shop = (
        <div className="life">
        <h1>SERVICE</h1>
            <a
            href="/life"
            onClick={() => localStorage.setItem('page', 1)}
          >  
          <p>welcome to MANO life style</p>
          <Button className="button-life">LIFE STYLE --></Button>
          </a>
        </div>
      )
      const both = (
        <div className="both">
          <div className="service"><h1 className="ser">SER</h1><h1 className="vice">VICE</h1></div>
            <a
            href="/shop"
            onClick={() => localStorage.setItem('page', 1)}
          >  
          {/* <Button className="button-both">LIFE STYLE --></Button> */}
          </a>
          {/* <p>slide to learn more</p> */}
          <button className="button-both"> shop&emsp;&emsp;&emsp;life style</button>

        </div>
      )

      let display;
      if (posx > 750) {
        display = life
      }else if (posx < 550){
        display = shop
      }else{
        display = both
      }

  return (
    <>
    <div className="Slider">
      <div style={{ width: 1440, height: 800 }}>
        {/* <ImageSlider
          image1={img1}
          image2={img2}
          sliderWidth={2}
          sliderColor="#D4AE5C"
          handleColor="#D4AE5C"
          handleBackgroundColor="white"
          sliderInitialPosition="0.5"
          onSlide= {() => {
            getCursorPosition()
          }}
        /> */}
        <ReactCompareImage 
            leftImage={img2} 
            rightImage={img1}
            sliderLineColor="#D4AE5C"
            onSliderPositionChange= {() => {
            getCursorPosition()
          }} />

        </div>
   </div>
        
        {display}
        </>
      
  );

}
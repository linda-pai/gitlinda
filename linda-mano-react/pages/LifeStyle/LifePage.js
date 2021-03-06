import Masonry from 'react-masonry-css'
import React, { useState } from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import './LifePage.css'
import { Container, Button, Nav, Navbar } from 'react-bootstrap'

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
}

function LifePage(props) {
  //   var items = [
  //     { id: 1, name: 'My First Item', courseImg: '/courses/CS008-2.jpg' },
  //     { id: 2, name: 'Another item', courseImg: '/courses/CS011-1.jpg' },
  //     { id: 3, name: 'Third Item', courseImg: '/courses/CS013-3.jpg' },
  //     { id: 4, name: 'Here is the Fourth', courseImg: '/courses/CS005-1.jpg' },
  //     { id: 5, name: 'High Five', courseImg: '/courses/CS016-2.jpg' },
  //   ]

  //   // Convert array to JSX items
  //   items = items.map(function (item) {
  //     return (
  //       <div className="wrap" key={item.id}>
  //         <img className="img" src={item.courseImg}></img>
  //         {item.name}
  //       </div>
  //     )
  //   })

  return (
    <>
      <Container>
        <h3>Find your Mano life style</h3>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-container"
        >
          <div className="outter left">
            <div className="flex">
              <div className="column a">
                <img className="img-life" src="/courses/CS013-3.jpg"/>
                <Button className="btn">留言板--></Button>
              </div>
              <div className="column a">
                
                <img className="img-life" src="https://cdn.pixabay.com/photo/2018/10/08/21/22/bank-3733501__340.jpg" />
                <Button className="btn">抹茶地圖--></Button>
              </div>
            </div>
            <a href="/course">
              <div className="column">
                <img className="img-life" src="/courses/CS008-2.jpg"/>
                <Button className="btn">達人推薦--></Button>
              </div>
            </a>
          </div>

          <div className="outter right">
          <a href="/course">
            <div className="column">
              <img className="img-life" src="/courses/CS005-1.jpg"  />
              <Button className="btn">手作課程--></Button>
            </div>
          </a>
            <div className="flex">
              <div className="column a">
                <img className="img-life" src="https://cdn.pixabay.com/photo/2015/07/16/16/42/sweets-847918__340.jpg"/>
                <Button className="btn">熱門商品--></Button>
              </div>
              <div className="column a">
                <img className="img-life" src="/courses/CS009-4.jpg" />
                <Button className="btn">會員限定--></Button>
              </div>
            </div>
          </div>
        </Masonry>
      </Container>
    </>
  )
}

export default withRouter(LifePage)

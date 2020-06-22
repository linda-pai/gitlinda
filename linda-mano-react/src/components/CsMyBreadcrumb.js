import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  // useEffect(() => {
  //   if (clickParams) {
  //     setShowAll("visible")
  //   }
  //   });
  const pathlist = [
    '/',
    '/course',
    '/cuisine',
    '/clothes',
    '/life',
    '/limit',
    '/new',
    '/anti',
  ]
  const pathnames = ['首頁', '所有課程', '抹の食', '抹の著', '抹の生活', '期間限定', '手摘專屬體驗', '防疫限定']
// /course/new?categoryId=31
// /courseDetail/course/new?courseId=8
  // 先找出對應的中文詞
  let locationPathname = props.location.pathname
  let catUrl = `/${props.match.params.second}/${props.match.params.third}?${props.match.params.fourth}`

  // console.log(`${locationPathname}${courseId}`)
  console.log(props)
  // `/product/xxxx` 轉為 `/product`
   if (locationPathname.includes('/clothes')) locationPathname = '/clothes'
   if (locationPathname.includes('/cuisine')) locationPathname = '/cuisine'
   if (locationPathname.includes('/life')) locationPathname = '/life'
   if (locationPathname.includes('/limit')) locationPathname = '/limit'
   if (locationPathname.includes('/new')) locationPathname = '/new'
   if (locationPathname.includes('/anti')) locationPathname = '/anti'

  const index = pathlist.findIndex((v) => v === locationPathname)

// console.log(locationPathname)


const allcourse = (
  <>
  <ol
   className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li 
          className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
  </>
)

const detail = (
  <>
  <ol 
  className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li 
            className="breadcrumb-item">
          <a 
          href="/course?categoryId=26"
          >所有課程</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
          <a 
          href={catUrl}
          >{pathnames[index]}</a>
          </li>
          <li 
          className="breadcrumb-item active" aria-current="page">
            商品內容
          </li>
        </ol>
     </>
)

const two = (
  <>
  <ol
   className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">首頁</Link>
          </li>
          <li 
            className="breadcrumb-item">
          <a 
          href="/course"
          >所有課程</a>
          </li>
          <li 
          className="breadcrumb-item active" aria-current="page">
            {pathnames[index]}
          </li>
        </ol>
  </>
)


let display;

if(props.location.pathname === "/course"){
      display = allcourse
  }else{
  display = two
}

if(props.match.params.fourth){
  display = detail
}


  return (
    <>
      <nav aria-label="breadcrumb">
      {display}
      </nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)

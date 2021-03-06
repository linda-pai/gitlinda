import React, { Component } from 'react'
import { Modal, Button, Pagination } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Course from '../Course/Course'
import './courses-style.css'
import SearchBar from './SearchBar'
import CsMyBreadcrumb from '../CsMyBreadcrumb'
import $ from 'jquery'

class Courses extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      totalPages: '',
      searchValue: '',
      page: 1,
      mycart: [],
      dataLoading: false,
      show: false,
      productName: '',
      catIds: '',
      catData: [],
      showPage: true,
      detailKey: '',
      sorted: [],
      isOldestFirst: false,
    }
  }

  //加入購物車
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  updateCartToLocalStorage = (value) => {
    // 開啟載入指示
    //setDataLoading(true)

    const currentCart = JSON.parse(localStorage.getItem('coursecart')) || []

    // console.log('currentCart', currentCart)

    const newCart = [...currentCart, value]
    localStorage.setItem('coursecart', JSON.stringify(newCart))

    // console.log('newCart', newCart)
    // 設定資料

    this.setState({
      mycart: newCart,
      productName: value.name,
    })
    this.handleShow()
    //alert('已成功加入購物車')
  }
  //加入購物車 end

  //fetch 種類
  getCatData = async (categoryParentId) => {
    const response = await fetch(
      `http://localhost:3002/cscategory/${categoryParentId}`
    )
    const json = await response.json()
    const category = json.rows

    this.setState({
      catData: category,
    })

    return this.state.catData
  }

  //   getRecursiveCategoryIds = async (categoryId) => {
  //     const output = await this.getCatData(categoryId)

  //     //console.log(output)
  //     if (output.length > 0) {
  //       for (let i = 0; i < output.length; i++) {
  //         await this.setState({
  //           catIds: (this.state.catIds += `,${output[i]['categoryId']}`),
  //         })
  //         await this.getRecursiveCategoryIds(output[i]['categoryId'])
  //       }
  //     }
  // console.log(this.state.catIds)
  //     return this.state.catIds

  //   }

  //fetch 商品
  getItemsData = async () => {
    let currentPage = localStorage.getItem('page') || 1
    const response = await fetch(
      `http://localhost:3002/courses/${this.state.catIds}/${currentPage}`
      //${this.state.catIds}/${currentPage}
    )
    console.log(this.state.catIds)

    const json = await response.json()
    const courses = json.rows
    const allData = json.allData
    const totalPages = json.totalPages
    const totalRows = json.totalRows
    this.setState({
      data: courses,
      totalPages: totalPages,
      totalRows: totalRows,
    })
    // console.log(totalPages)
    console.log(json.allData)
    return this.state.data
  }

  //  getItemsDetail = (event) => {
  //   console.log("detail!!")
  //   console.log(event.target.value);
  //   console.log(event.target);

  //   const value = event.target.value;

  //   this.props.history.push(`/courseDetail?courseId=${value}`)

  // }

  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search)
    let catIdParams = params.get('categoryId')
    if (catIdParams) {
      await this.setState({
        catIds: (this.state.catIds += catIdParams),
      })

      // await this.getRecursiveCategoryIds(catIdParams)
    }

    await this.getItemsData()
  }

  //頁碼
  handleChange = async (value) => {

    let params = new URLSearchParams(this.props.location.search)
    let catIdParams = params.get('categoryId')

    await this.setState({
      page: value,
    })

    localStorage.setItem('page', this.state.page)

    const response = await fetch(
      `http://localhost:3002/courses/${this.state.catIds}/${this.state.page}`
    )
    const json = await response.json()
    const courses = json.rows
    const page = json.page
   


    this.setState({
      data: courses,
      page: page,
     
    })

    this.props.history.push(
      `${this.props.match.url}?categoryId=${catIdParams}&page=${this.state.page}`
    )
    window.scrollTo(0, 0)
  }

  //搜尋input改變
  onChange = async (event) => {
    this.setState({
      searchValue: event.target.value,
    })

    console.log(`"search!" + ${event.target.value}`)
    const response = await fetch('http://localhost:3002/courses')
    const json = await response.json()
    const allData = json.allData

    this.setState({
      data: allData,
      showPage: false,
    })
  }

  priceToggle = (e) => {
 
    const newData = this.state.data
    let sortedData = newData

    if(e.currentTarget.value == "highToLow"){
      sortedData = newData.sort((a, b) => {
        if(a.coursePrice < b.coursePrice) return 1;
        if(a.coursePrice > b.coursePrice) return -1;
      })
      this.setState({
          isOldestFirst: !this.state.isOldestFirst,
        })

    }else{
      sortedData = newData.sort((a, b) => {
        if(a.coursePrice > b.coursePrice) return 1;
        if(a.coursePrice < b.coursePrice) return -1;
    })
  }

    console.log(sortedData)
    this.setState({
      data: sortedData,
    })

    }

  render() {
    const lists = []
    // let active = this.state.page
  
    for (let i = 1; i <= this.state.totalPages; i++) {
      if (i < 10) {
        lists.push(
          <Pagination.Item
            className="course-list-btn"
            key={i}
            value={i}
            onClick={() => {
              this.handleChange(i)
              this.setState({ page: i })
              }}
            active={i === this.state.page}
          >
            0{i}
          </Pagination.Item>
       
        )  
                
      } else {
        lists.push(
          <li
            key={i}
            value={i}
            onClick={() => {
              this.handleChange(i)
              this.setState({ page: i })
              }}
            active={i === this.state.page}
          >
            {i}
          </li>
        )
      }
   }

    const messageModal = (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>產品：{this.state.productName} 已成功加入購物車</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            繼續購物
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const path = this.props.history.location.pathname
              if (path.includes('/mall')) this.props.history.push('/mall/cart')
              else this.props.history.push('/life/cart')
            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    const originResults = (
      <div>
        <p className="results resultsOrigin">
          {this.state.data.length} of {this.state.totalRows} results
        </p>
      </div>
    )

    const count = this.state.data.filter((course) => {
      return (
        course.courseName && course.courseDesc.includes(this.state.searchValue)
      )
    }).length

    const searchResult = (
      <p className="results resultsSearch">搜尋共 {count} 筆符合</p>
    )
    let result
    count !== this.state.data.length
      ? (result = searchResult)
      : (result = originResults)

    const spinner = (
      <>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    )
    return (
      <>
     
      <div className="container-course">
        {messageModal}
       
        <div className="course-tools">
          <CsMyBreadcrumb className="course-bread"/>
            <div className="course-result">
            {result}
            
              <div className="input-container">
                <SearchBar onChange={this.onChange} />
                <select className="sortor" onChange={this.priceToggle}>
                  <option value="highToLow">篩選</option>
                  <option value="highToLow">價格高至低</option>
                  <option value="lowtoHigh">價格低至高</option>
                </select>
              </div></div>
        </div>
        {this.state.data
          .filter((course) => {
            return (
              course.courseName &&
              course.courseDesc.includes(this.state.searchValue)
            )
          })
          .map((course) => (
            <Course
              key={course.courseId}
              courseId={course.courseId}
              linkUrl={course.linkUrl}
              courseImg={course.courseImg}
              courseImg2={course.courseImg2}
              courseName={course.courseName}
              courseDesc={course.courseDesc}
              coursePrice={course.coursePrice}
              courseQty={course.courseQty}
              handleClick={() => {
                this.updateCartToLocalStorage({
                  id: course.courseId,
                  img: course.courseImg,
                  name: course.courseName,
                  amount: 1,
                  price: course.coursePrice,
                })
              }}
              // getDetail={this.getItemsDetail}
            />
          ))}
        <ul
          style={{ visibility: this.state.showPage ? 'visible' : 'hidden' }}
          className="page-lists"
        >
         <Pagination.Prev
         className="list-btn"
                   onClick={() => {
                    this.handleChange(this.state.page - 1)
                  }}
                  disabled= {(this.state.page === 1)?
                  true : false}
                />
          {lists}
          <Pagination.Next
                   onClick={() => {
                    this.handleChange(this.state.page + 1)
                  }}
                  disabled= {(this.state.page === this.state.totalPages)?
                  true : false}
              />
        </ul>
      </div>
      </>
    )
  }
}
export default withRouter(Courses)
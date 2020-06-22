import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'

import Home from './pages/Home'
import About from './pages/About'
import ProductList from './pages/ProductList'
import ItemDetail from './pages/ItemDetail/ItemDetail'

import CourseList from './pages/CourseList/CourseList'
import CourseDetail from './pages/CourseDetail/CourseDetail'

import CartComfirm from "./pages/Cart/CartComfirm"
import CartComfirmChange from "./pages/Cart/CartComfirmChange"
import CartComplete from "./pages/Cart/CartComplete"
import CartPayment from "./pages/Cart/CartPayment"
import Cart from './pages/Cart/Cart'

import Membercenter from './pages/Membercenter'
import Coupon from './pages/Coupon'

import NotFoundPage from './pages/NotFoundPage'

import Login from './pages/login/login'
import MyWelcome from './pages/login/welcome'
import MyRegister from './pages/login/register'
import MyForgetPwd from './pages/login/forgetPwd'
import Faq from './pages/Faq'
import MapPage from './components/Map/MapPage'


import ProtectedRoute from './utils/ProtectedRoute'
var sha1 = require('sha1');


function App(props) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])
  const [confirmpassword, setConfirmpassword] = useState('')

  // 錯誤訊息陣列
  const [loginErrors, setLoginErrors] = useState([])



  // 處理會員登入
  const loginProcess = (loginSuccessCallback) => {
    const errors = []

    // 檢查錯誤

    if (username === '') {
      errors.push('Account is empty')
    } else {
      if (data.length === 0) {
        errors.push('E-mail not exist')
      } else {
        if (sha1(password) !== data[0].pwd) errors.push('Wrong password')
      }
    }

    if (password === '') errors.push('Password is empty')

    if (errors.length > 0) {
      setLoginErrors(errors)
      return
    }

    // 清空錯誤訊息陣列 + 登入
    // 清空錯誤訊息陣列為必要
    setLoginErrors([])

    // 執行成功的callback(來自MemberLogin)
    loginSuccessCallback()
  }

  const logoutProcess = (logoutSuccessCallback) => {
    setName('')
    setUsername('')
    setPassword('')

    // 認証改為false

    // 執行成功的callback(來自MemberLogin)
    logoutSuccessCallback()
  }

  // 處理會員註冊
  const registerProcess = (registerSuccessCallback) => {
    const errors = []
    var matches = username.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    if (name === '') {
      errors.push('Name is empty')
    }
    if (username === '') {
      errors.push('Account is empty')
    } else {
      if (data.length !== 0) {
        errors.push('E-mail is exist')
      } else if (matches === null)
        errors.push("E-mail doesn't match the pattern")
    }

    // if (password === '') errors.push('Password is empty')

    // 檢查錯誤
    if (errors.length > 0) {
      setLoginErrors(errors)
      return
    }
    // 清空錯誤訊息陣列 + 登入
    // 清空錯誤訊息陣列為必要
    setLoginErrors([])
    registerSuccessCallback()
  }

  return (
    <Router>
      <>
        <MyNavbar />
        <MainContent>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/productList/shop/:third?/:fourth?/:fifth?/:sixth?/:page?">
              <ProductList />
            </Route>
            <Route path="/itemDetail/:second?/:third?/:fourth?/:fifth?/:sixth?">
              <ItemDetail />
            </Route>

            <Route path="/course/:second?/:third?/:fourth?/:page?">
              <CourseList />
            </Route>
            <Route path="/courseDetail/:second?/:third?/:fourth?">
              <CourseDetail />
            </Route>

            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/cart/comfirm" exact>
              <CartComfirm />
            </Route>
            <Route path="/cart/comfirm/change">
              <CartComfirmChange />
            </Route>
            <Route path="/cart/complete">
              <CartComplete />
            </Route>
            <Route path="/cart/payment">
              <CartPayment />
            </Route>

            <Route path="/map">
              <MapPage />
            </Route>


            <Route path="/searchtest"></Route>
            <Route path="/login">
              <Login
                username={username}
                setUsername={setUsername}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/welcome">
              <MyWelcome
                logoutProcess={logoutProcess}
              />
            </Route>

            <Route path="/register">
              <MyRegister
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginErrors={loginErrors}
                setConfirmpassword={setConfirmpassword}
                registerProcess={registerProcess}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/forgetpwd">
              <MyForgetPwd
                username={username}
                setUsername={setUsername}
              />
            </Route>


            {/* <ProtectedRoute path="/todoapp">
              <TodoApp todos={todos} setTodos={setTodos} isAuth={auth} />
            </ProtectedRoute> */}
            <Route exact path="/membercenter">
              <Membercenter />
            </Route>
            <Route exact path="/membercenter/coupon">
              <Coupon />
            </Route>

            <Route exact path="/faq">
              <Faq />
            </Route>



            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </MainContent>
        <MyFooter />
      </>
    </Router>
  )
}

export default App

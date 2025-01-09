import { React, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SetCookie from '../../hooks/setCookie';
import RemoveCookie from '../../hooks/removeCookie';

import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';

// import useAuth from '../../hooks/useAuth';
import api from '../../api/api'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


const Home = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState();
  useEffect(() => {
    setErrMsg('');
  }, [])

  useEffect(() => {
    localStorage.removeItem('PID')
    localStorage.removeItem('UID')
    localStorage.removeItem('role')
    localStorage.removeItem('drId')
    RemoveCookie("user")
  })

  // const theme = createTheme();
  // const myFunction = handleSubmit();


  const htmlFile =
    `<!DOCTYPE html>
<html lang="en-US">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- ===============================================-->
    <!--    Favicons-->
    <!-- ===============================================-->
    <link rel="apple-touch-icon" sizes="180x180" href="../../../assets/img/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../../../assets/img/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../../../assets/img/favicons/favicon-16x16.png">
    <link rel="shortcut icon" type="image/x-icon" href="../../../assets/img/favicons/favicon.ico">
    <link rel="manifest" href="../../../assets/img/favicons/manifest.json">
    <!-- <meta name="msapplication-TileImage" content="../../../assets/img/favicons/mstile-150x150.png"> -->
    <meta name="theme-color" content="#ffffff">


    <!-- ===============================================-->
    <!--    Stylesheets-->
    <!-- ===============================================-->
    <link href="../../../assets/theme.css" rel="stylesheet" />

  </head>


  <body>

    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->
    <main class="main" id="top">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
        <div class="container"><a class="navbar-brand" href="/">PAMS</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"> </span></button>
          <div class="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
              <li class="nav-item px-2"><a class="nav-link" aria-current="page" href="#about">About Us</a></li>
              <li class="nav-item px-2"><a class="nav-link" href="#departments">Departments</a></li>
              <li class="nav-item px-2"><a class="nav-link" href="#findUs">Help </a></li>
              <li class="nav-item px-2"><a class="nav-link" href="#contactus">Contact</a></li>
            </ul>
            <a class="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4" href="/login">Sign In</a>
                        <a class="btn btn-sm btn-outline-primary rounded-pill order-1 order-lg-0 ms-lg-4" href="/signup">Create account</a>

          </div>
        </div>
      </nav>
      <section class="py-xxl-10 pb-0" id="home">
        <!-- <div class="bg-holder bg-size" style="background-image:url(../assets/img/gallery/hero-bg.png);background-position:top center;background-size:cover;"> -->
          <div class="bg-holder bg-size" style="background-image:url(../../../assets/img/gallery/hero-bg.png);background-position:top center;background-size:cover;">

        </div>
        <!--/.bg-holder-->

        <div class="container">
          <div class="row min-vh-xl-100 min-vh-xxl-25">
            <div class="col-md-5 col-xl-6 col-xxl-7 order-0 order-md-1 text-end"><img class="pt-7 pt-md-0 w-100" src="../../../assets/img/gallery/hero.png" alt="hero-header" /></div>
            <div class="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center py-6">
              <h1 class="fw-light font-base fs-6 fs-xxl-7">We're <strong>determined </strong>for<br />your&nbsp;<strong>better life.</strong></h1>
              <p class="fs-1 mb-5">You can get the care you need 24/7 – be it online or in <br />person. You will be treated by caring specialist doctors. </p><a class="btn btn-lg btn-primary rounded-pill" href="#!" role="button">Make an Appointment</a>
            </div>
          </div>
        </div>
      </section>
      

      <!-- ============================================-->
      <!-- <section> begin ============================-->
      <section class="py-5" id="departments">

        <div class="container">
          <div class="row">
            <div class="col-12 py-3">
              <div class="bg-holder bg-size" style="background-image:url(../../../assets/img/gallery/bg-departments.png);background-position:top center;background-size:contain;">
              </div>
              <!--/.bg-holder-->

              <h1 class="text-center">OUR DEPARTMENTS</h1>
            </div>
          </div>
        </div>
        <!-- end of .container-->

      </section>
      <!-- <section> close ============================-->
      <!-- ============================================-->




      <!-- ============================================-->
      <!-- <section> begin ============================-->
      <section class="py-0">

        <div class="container">
          <div class="row py-5 align-items-center justify-content-center justify-content-lg-evenly">
            <div class="col-auto col-md-4 col-lg-auto text-xl-start">
              <div class="d-flex flex-column align-items-center">
                <div class="icon-box text-center"><a class="text-decoration-none" href="#!"><img class="mb-3 deparment-icon" src="../../../assets/img/icons/neurology.png" alt="..." /><img class="mb-3 deparment-icon-hover" src="assets/img/icons/neurology.svg" alt="..." />
                    <p class="fs-1 fs-xxl-2 text-center">Neurology</p>
                  </a></div>
              </div>
            </div>
            <div class="col-auto col-md-4 col-lg-auto text-xl-start">
              <div class="d-flex flex-column align-items-center">
                <div class="icon-box text-center"><a class="text-decoration-none" href="#!"><img class="mb-3 deparment-icon" src="../../../assets/img/icons/eye-care.png" alt="..." /><img class="mb-3 deparment-icon-hover" src="assets/img/icons/eye-care.svg" alt="..." />
                    <p class="fs-1 fs-xxl-2 text-center" href="#eyecare">Eye care</p>
                  </a></div>
              </div>
            </div>
            <div class="col-auto col-md-4 col-lg-auto text-xl-start">
              <div class="d-flex flex-column align-items-center">
                <div class="icon-box text-center"><a class="text-decoration-none" href="#!"><img class="mb-3 deparment-icon" src="../../../assets/img/icons/cardiac.png" alt="..." /><img class="mb-3 deparment-icon-hover" src="assets/img/icons/cardiac.svg" alt="..." />
                    <p class="fs-1 fs-xxl-2 text-center">Cardiac care</p>
                  </a></div>
              </div>
            </div>
            <div class="col-auto col-md-4 col-lg-auto text-xl-start">
              <div class="d-flex flex-column align-items-center">
                <div class="icon-box text-center"><a class="text-decoration-none" href="#!"><img class="mb-3 deparment-icon" src="../../../assets/img/icons/heart.png" alt="..." /><img class="mb-3 deparment-icon-hover" src="assets/img/icons/heart.svg" alt="..." />
                    <p class="fs-1 fs-xxl-2 text-center">Heart care</p>
                  </a></div>
              </div>
            </div>
         
          </div>
        </div>
        <!-- end of .container-->

      </section>
      <!-- <section> close ============================-->
      <!-- ============================================-->


      <section class="bg-secondary">
        <div class="bg-holder" style="background-image:url(assets/img/gallery/bg-eye-care.png);background-position:center;background-size:contain; id="eyecare">
        </div>
        <!--/.bg-holder-->

        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-5 col-xxl-6"><img class="img-fluid" src="../../../assets/img/gallery/eye-care.png" alt="..." /></div>
            <div class="col-md-7 col-xxl-6 text-center text-md-start">
              <h2 class="fw-bold text-light mb-4 mt-4 mt-lg-0">Eye Care with Top Professionals<br class="d-none d-sm-block" />and In Budget.</h2>
              <p class="text-light">We've built a healthcare system that puts your needs first.<br class="d-none d-sm-block" />For us, there is nothing more important than the health of <br class="d-none d-sm-block" />you and your loved ones. </p>
              <div class="py-3"><a class="btn btn-lg btn-light rounded-pill" href="#!" role="button">Learn more </a></div>
            </div>
          </div>
        </div>
      </section>


      <!-- ============================================-->
      <!-- <section> begin ============================-->
      <section class="pb-0" id="about">

        <div class="container">
          <div class="row">
            <div class="col-12 py-3">
              <div class="bg-holder bg-size" style="background-image:url(../../../assets/img/gallery/about-us.png);background-position:top center;background-size:contain;">
              </div>
              <!--/.bg-holder-->

              <h1 class="text-center">ABOUT US</h1>
            </div>
          </div>
        </div>
        <!-- end of .container-->

      </section>
      <!-- <section> close ============================-->
      <!-- ============================================-->


      <section class="py-5">
        <div class="bg-holder bg-size" style="background-image:url(../../../assets/img/gallery/about-bg.png);background-position:top center;background-size:contain;">
        </div>
        <!--/.bg-holder-->

        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 order-lg-1 mb-5 mb-lg-0"><img class="fit-cover rounded-circle w-100" src="../../../assets/img/gallery/health-care.png" alt="..." /></div>
            <div class="col-md-6 text-center text-md-start">
              <h2 class="fw-bold mb-4">We are developing a healthcare <br class="d-none d-sm-block" />system around you</h2>
              <p>We think that everyone should have easy access to excellent <br class="d-none d-sm-block" />healthcare. Our aim is to make the procedure as simple as <br class="d-none d-sm-block" />possible for our patients and to offer treatment no matter<br class="d-none d-sm-block" />where they are — in person or at their convenience. </p>
              <div class="py-3">
                <button class="btn btn-lg btn-outline-primary rounded-pill" type="submit">Learn more </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <section class="bg-primary">

        <!-- <section> begin ============================-->
        <section class="py-0 bg-primary" id="contactus">

          <div class="container">
            <div class="row justify-content-md-between justify-content-evenly py-4">
              <div class="col-12 col-sm-8 col-md-6 col-lg-auto text-center text-md-start">
                <p class="fs--1 my-2 fw-bold text-200">All rights Reserved &copy; Astewul, 2025</p>
              </div>
              <div class="col-12 col-sm-8 col-md-6 col-lg-auto text-center text-md-start">
                <p class="fs--1 my-2 fw-bold text-200">Phone:   +251922222122</p>
              </div>
              <div class="col-12 col-sm-8 col-md-6 col-lg-auto text-center text-md-start">
                <p class="fs--1 my-2 fw-bold text-200">Email:   astukaalemu@gmail.com</p>
              </div>
              <div class="col-12 col-sm-8 col-md-6">
              </div>
            </div>
          </div>
          <!-- end of .container-->

        </section>

      </section>
    </main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->




    <!-- ===============================================-->
    <!--    JavaScripts-->
    <!-- ===============================================-->
      <script src="../../../assets/vendors/@popperjs/popper.min.js"></scrip>
    <script src="../../../assets/vendors/bootstrap/bootstrap.min.js"></script>
    <script src="../../../assets/vendors/is/is.min.js"></script>
    <script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
    <script src="../../../assets/vendors/fontawesome/all.min.js"></script>

    <script src="../../../assets/js/theme.js"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&amp;family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100&amp;display=swap" rel="stylesheet">
  </body>

</html>`;
  function myComponent() {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlFile }} />
    );
  }
  return (
    <div>
      {myComponent()}

    </div>
  )
}

export default Home

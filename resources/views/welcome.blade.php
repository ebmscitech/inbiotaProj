<!DOCTYPE html>
<html>

<head>
  <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- Site Metas -->
  <link rel="icon" href="{{asset('/InbiotaHtmlCss/images/fevicon.png')}}" type="image/gif" />
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />

  <title>Inbiota</title>


  <!-- bootstrap core css -->
  <link rel="stylesheet" type="text/css" href="{{asset('/InbiotaHtmlCss/css/bootstrap.css')}}" />

  <!-- fonts style -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">

  <!-- font awesome style -->
  <link href="{{asset('/InbiotaHtmlCss/css/font-awesome.min.css')}}" rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="{{asset('/InbiotaHtmlCss/css/style.css')}}" rel="stylesheet" />
  <!-- responsive style -->
  <link href="{{asset('/InbiotaHtmlCss/css/responsive.css')}}" rel="stylesheet" />

</head>

<body>

  <div class="hero_area">
    @include('partial.nav')
    
    <!-- slider section -->
    <section class="slider_section ">
            <div class="container ">
              <div class="row">
                <div class="col-md-6">
                  <div class="detail-box">
                    <h1>
                      Natural Product Trusted Data Source 
                    </h1>
                    <p> Inbiota is a database software which gathers plants data with compound contained in it. A breaktrough for natural product research using AI to help finding data </p>
                    <div class="btn-box">
                      <a href="/sEngine" class="btn-2">
                        Get Started!
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class=" col-lg-10 mx-auto">
                      <div class="img-box">
                        <img src="{{asset('/InbiotaHtmlCss/images/slider-img.png')}}" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </section>
    <!-- end slider section -->
  </div>

  <!-- about section -->

  <section class="about_section layout_padding-bottom">
    <div class="container  ">
      <div class="row">
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h2>
                About Us
              </h2>
            </div>
            <p>
              Inbiota adalah  </p>
            <a href="/docs">
              Read More
            </a>
          </div>
        </div>
        <div class="col-md-6 ">
          <div class="img-box">
            <img src="{{asset('/InbiotaHtmlCss/images/about-img.png')}}" alt="">
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- end about section -->

  <!-- contact section -->
  <section class="contact_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
        <br>
          Get In Touch
        </h2>
      </div>
      <div class="row">
        <div class="col-md-8 col-lg-6 mx-auto">
          <div class="form_container">
            <form action="">
              <div>
                <input type="text" placeholder="Your Name" />
              </div>
              <div>
                <input type="email" placeholder="Your Email" />
              </div>
              <div>
                <input type="text" placeholder="Your Phone" />
              </div>
              <div>
                <input type="text" class="message-box" placeholder="Message" />
              </div>
              <div class="btn_box ">
                <button>
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end contact section -->

  <!-- server section -->

  <section class="about_section layout_padding-bottom">
    <div class="container ">
      <div class="row">
        <div class="col-md-6">
          <div class="img-box">
              <h1>
                <div class="heading_container">
                    Powered by :
                </div>
                <div>
                    <img src="{{asset('/EBM-Logo.png')}}" alt="">
                </div>
              </h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end server section -->

  @include('partial.footer')

  <!-- jQery -->
  <script src="{{asset('/InbiotaHtmlCss/js/jquery-3.4.1.min.js')}}"></script>
  <!-- bootstrap js -->
  <script src="{{asset('/InbiotaHtmlCss/js/bootstrap.js')}}"></script>
  <!-- custom js -->
  <script src="{{asset('/InbiotaHtmlCss/js/custom.js')}}"></script>


</body>

</html>
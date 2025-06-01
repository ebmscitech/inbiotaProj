<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="{{secure_asset('/InbiotaHtmlCss/images/fevicon.png')}}" type="image/gif" />
  <title>INBIOTA</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{secure_asset('/adminlte/plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Select2 -->
  <link rel="stylesheet" href="{{secure_asset('/adminlte/plugins/select2/css/select2.min.css')}}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{secure_asset('/adminlte/dist/css/adminlte.min.css')}}">

  <style>
    /*header section*/
  .hero_area {
    position: relative;
    background-color: #020230;
    min-height: 0vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
  }

  .sub_page .hero_area {
    min-height: auto;
  }

  .headers_section .container-fluid {
    padding-right: 25px;
    padding-left: 25px;
  }

  .navbar-brand span {
    font-weight: bold;
    color: #ffffff;
    font-size: 24px;
    text-transform: uppercase;
  }

  .custom_nav-container {
    padding: 10px 0;
  }

  .custom_nav-container .navbar-nav .nav-item .nav-link {
    padding: 3px 15px;
    margin: 10px 15px;
    color: #ffffff;
    text-align: center;
    text-transform: uppercase;
  }

  .custom_nav-container .nav_search-btn {
    width: 35px;
    height: 35px;
    padding: 0;
    border: none;
    color: #ffffff;
    margin: 0 20px;
  }

  .custom_nav-container .navbar-toggler {
    outline: none;
  }

  .custom_nav-container .navbar-toggler {
    padding: 0;
    width: 37px;
    height: 42px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .custom_nav-container .navbar-toggler span {
    display: block;
    width: 35px;
    height: 4px;
    background-color: #ffffff;
    margin: 7px 0;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    position: relative;
    border-radius: 5px;
    transition: all 0.3s;
  }

  .custom_nav-container .navbar-toggler span::before, .custom_nav-container .navbar-toggler span::after {
    content: "";
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    top: -10px;
    border-radius: 5px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .custom_nav-container .navbar-toggler span::after {
    top: 10px;
  }

  .custom_nav-container .navbar-toggler[aria-expanded="true"] {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }

  .custom_nav-container .navbar-toggler[aria-expanded="true"] span {
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
  }

  .custom_nav-container .navbar-toggler[aria-expanded="true"] span::before, .custom_nav-container .navbar-toggler[aria-expanded="true"] span::after {
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
    top: 0;
  }

  .custom_nav-container .navbar-toggler[aria-expanded="true"] .s-1 {
    -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
    margin: 0;
    margin-bottom: -4px;
  }

  .custom_nav-container .navbar-toggler[aria-expanded="true"] .s-2 {
    display: none;
  }

  .custom_nav-container .navbar-toggler[aria-expanded="true"] .s-3 {
    -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
    margin: 0;
    margin-top: -4px;
  }

  .custom_nav-container .navbar-toggler[aria-expanded="false"] .s-1,
  .custom_nav-container .navbar-toggler[aria-expanded="false"] .s-2,
  .custom_nav-container .navbar-toggler[aria-expanded="false"] .s-3 {
    -webkit-transform: none;
            transform: none;
  }

  .quote_btn-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }

  .quote_btn-container a {
    color: #ffffff;
    text-transform: uppercase;
  }

  .quote_btn-container a span {
    margin-left: 5px;
  }

  .custom_nav-container .navbar-nav .nav-item .nav-link {
    padding: 3px 15px;
    margin: 10px 15px;
    color: #ffffff;
    text-align: center;
    text-transform: uppercase;
  }

  /*end header section*/
    /* info section */
.info_sections {
  background-color: #020230;
  color: #ffffff;
}

.info_sections h4 {
  font-weight: 600;
  margin-bottom: 20px;
}

.info_sections .info_contact .contact_link_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}

.info_sections .info_contact .contact_link_box a {
  margin: 5px 0;
  color: #ffffff;
}

.info_sections .info_contact .contact_link_box a i {
  margin-right: 5px;
}

.info_sections .info_contact .contact_link_box a:hover {
  color: #ff4646;
}

.info_sections .info_social {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 20px;
}

.info_sections .info_social a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  color: #ffffff;
  border-radius: 100%;
  margin-right: 10px;
  font-size: 24px;
}

.info_sections .info_social a:hover {
  color: #ff4646;
}

.info_sections .info_links {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}

.info_sections .info_links a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  margin-bottom: 15px;
  color: #ffffff;
}

.info_sections .info_links a img {
  margin-right: 10px;
}

.info_sections .info_links a:hover, .info_sections .info_links a.active {
  color: #ff4646;
}

.info_sections form input {
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  width: 100%;
  height: 45px;
  color: #ffffff;
  outline: none;
}

.info_sections form input::-webkit-input-placeholder {
  color: #ffffff;
}

.info_sections form input:-ms-input-placeholder {
  color: #ffffff;
}

.info_sections form input::-ms-input-placeholder {
  color: #ffffff;
}

.info_sections form input::placeholder {
  color: #ffffff;
}

.info_sections form button {
  width: 100%;
  text-align: center;
  display: inline-block;
  padding: 10px 55px;
  background-color: #ff4646;
  color: #ffffff;
  border-radius: 0;
  border: 1px solid #ff4646;
  -webkit-transition: all .3s;
  transition: all .3s;
  margin-top: 15px;
}

.info_sections form button:hover {
  background-color: transparent;
  color: #ff4646;
}

/* end info section */

/* footer section*/
.footer_sections {
  position: relative;
  background-color: #020230;
  text-align: center;
}

.footer_sections p {
  color: #ffffff;
  padding: 20px 0;
  margin: 0;
  border-top: 1px solid #ffffff;
}

.footer_sections p a {
  color: inherit;
}
/*# sourceMappingURL=style.css.map */

.layout_padding2 {
  padding: 75px 0;
}

.layout_padding3 {
  padding: 150px 0;
}

.layout_padding {
  padding: 90px 0;
}
  </style>
</head>

<body>
    @yield('content')


<!-- jQuery -->
<script src="{{secure_asset('/adminlte/plugins/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap 4 -->
<script src="{{secure_asset('/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- Select2 -->
<script src="{{secure_asset('/adminlte/plugins/select2/js/select2.full.min.js')}}"></script>
<!-- AdminLTE App -->
<script src="{{secure_asset('/adminlte/dist/js/adminlte.min.js')}}"></script>
<!-- AdminLTE for demo purposes -->
<script src="{{secure_asset('/adminlte/dist/js/demo.js')}}"></script>

<script>
    $(function () {
      $('.select2').select2()
    });
</script>
</body>
</html>

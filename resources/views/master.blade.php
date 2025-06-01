<!DOCTYPE html>
<html>

<head>
  <!-- Basic -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!-- Mobile Metas -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
  <!-- Site Metas -->
  <link rel="icon" href="{{secure_asset('/InbiotaHtmlCss/images/fevicon.png')}}" type="image/gif" />
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="" />

  <title>INBIOTA</title>


  <!-- bootstrap core css -->
  <link rel="stylesheet" type="text/css" href="{{secure_asset('/InbiotaHtmlCss/css/bootstrap.css')}}" />

  <!-- fonts style -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">

  <!-- font awesome style -->
  <link href="{{secure_asset('/InbiotaHtmlCss/css/font-awesome.min.css')}}" rel="stylesheet" />

  <!-- Custom styles for this template -->
  <link href="{{secure_asset('/InbiotaHtmlCss/css/style.css')}}" rel="stylesheet" />
  <!-- responsive style -->
  <link href="{{secure_asset('/InbiotaHtmlCss/css/responsive.css')}}" rel="stylesheet" />
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">


</head>

<body class="sub_page">

  <div class="hero_area">
    @include('partial.nav')
    @yield('contentX')
  </div>

  @yield('content1')

  @yield('content2')

  @yield('content3')

  @include('partial.footer')

  <!-- jQery -->
  <script type="text/javascript" src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <!-- bootstrap js -->
  <script src="{{secure_asset('/InbiotaHtmlCss/js/bootstrap.js')}}"></script>
  <!-- custom js -->
  <script src="{{secure_asset('/InbiotaHtmlCss/js/custom.js')}}"></script>



</body>

</html>

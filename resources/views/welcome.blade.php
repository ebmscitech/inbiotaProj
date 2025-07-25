@extends('master')

@section('contentX')
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
              <img src="{{secure_asset('/InbiotaHtmlCss/images/slider-img.png')}}" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- end slider section -->
@endsection

@section('content1')
{{-- <section class="about_section layout_padding-bottom">
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
            Inbiota is a database software which gathers plants data with compound contained in it. A breaktrough for natural product research using AI to help finding data</p>
          <a href="/docs">
            Read More
          </a>
        </div>
      </div>
      <div class="col-md-6 ">
        <div class="img-box">
          <img src="{{secure_asset('/InbiotaHtmlCss/images/about-img.png')}}" alt="">
        </div>
      </div>

    </div>
  </div>
</section> --}}
@endsection

@section('content2')
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
          <div class="card-body">
            @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
          <form method="post" action="/sendBForm">
              @csrf
              <input type="text" name="name" placeholder="Your Name" />
              <input type="email" name="senderEmail" placeholder="Your Email" />
              <input type="text" name="phoneNumber" placeholder="Your Phone" />
              <input type="text" name="message" class="message-box" placeholder="Message" />
              <div class="btn_box ">
                <button type="submit" class="btn_box ">
                  SEND
                </button>
              </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection

@section('content3')
<section class="about_section layout_padding-bottom">
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="image-container">
            <h2>
              <div class="heading_container">
                  Powered by :
              </div>
              <br>
              <div>
                  <img src="{{secure_asset('/EBM-Logo.png')}}" alt="" class="image">
                  &nbsp;&nbsp;
                  <img src="{{secure_asset('/logoITB.png')}}" alt="" class="image">
                  &nbsp;&nbsp;
                  <img src="{{secure_asset('/logopui.png')}}" alt="" class="image">
              </div>
            </h2>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection

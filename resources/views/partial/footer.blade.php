<!-- info section -->

<section class="info_section layout_padding2">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="info_contact">
            <h4>
              Address
            </h4>
            <div class="contact_link_box">
              <a href="https://goo.gl/maps/MPP1pVsccLBckJ4a9">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span>
                  Jl Bukit Raya 582, Kp. Sekejulang, Ciumbuleuit, Bandung
                </span>
              </a>
              <a href="tel:082131667685">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call +628131667685
                </span>
              </a>
              <a href="zakiammar8@gmail.com">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  zakiammar8@gmail.com
                </span>
              </a>
            </div>
          </div>
          <div class="info_social">
            <a href="">
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="">
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="">
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="info_link_box">
            <h4>
              Links
            </h4>
            <div class="info_links">
              <a class="active" href="/">
                <img src="{{asset('/InbiotaHtmlCss/images/nav-bullet.png')}}" alt="">
                Home
              </a>
              <a class="" href="/docs">
                <img src="{{asset('/InbiotaHtmlCss/images/nav-bullet.png')}}" alt="">
                Docs
              </a>
              <a class="" href="/contact">
                <img src="{{asset('/InbiotaHtmlCss/images/nav-bullet.png')}}" alt="">
                Contact
              </a>
              <a class="" href="/signin">
                <img src="{{asset('/InbiotaHtmlCss/images/nav-bullet.png')}}" alt="">
                Sign In
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-0">
          <h4>
            Subscribe
          </h4>
          <form action="/subsForm" method="post">
            @csrf
            <input name="subscription" placeholder="Enter email" />
            <button type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- end info section -->


  <!-- footer section -->
  <footer class="footer_section">
    <div class="container">
      <p>
        &copy; <span id="displayYear"></span> All Rights Reserved By
        <a href="/">INBIOTA</a>
      </p>
    </div>
  </footer>
  <!-- footer section -->
@extends('master')

@section('content1')
    <!-- about section -->

  <section class="about_section layout_padding">
    <div class="container  ">
      <div class="row">
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h2>
                About Us
              </h2>
            </div>
            <p>Inbiota is a database software which gathers plants data with compound contained in it. A breaktrough for natural product research using AI to help finding data</p>

            <!-- Hidden content with a unique ID -->
            <div id="more" class="read-more">
                <p>We'll be sharing more updates with you soon. Stay tuned for upcoming announcements and developments!</p>
            </div>

            <!-- "Read More" link -->
            <button class="read-more-button" onclick="toggleReadMore()">Read More</button>
          </div>
        </div>
        <div class="col-md-6 ">
          <div class="img-box">
            <img src="{{secure_asset('/InbiotaHtmlCss/images/about-img.png')}}" alt="">
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- end about section -->
  <script>
    // JavaScript function to toggle the hidden content
    function toggleReadMore() {
        var moreText = document.getElementById("more");
        var buttonText = document.querySelector(".read-more-button");

        if (moreText.style.display === "none") {
            moreText.style.display = "block";
            buttonText.innerHTML = "Read Less";
        } else {
            moreText.style.display = "none";
            buttonText.innerHTML = "Read More";
        }
    }
</script>
@endsection

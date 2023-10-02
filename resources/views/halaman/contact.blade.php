@extends('master')

@section('content1')
    <!-- contact section -->
  <section class="contact_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          Get In Touch
        </h2>
      </div>
      <div class="row">
        <div class="col-md-8 col-lg-6 mx-auto">
          <div class="form_container">
            <form method="post" action="/sendBForm">
              @csrf
              <input type="text" name="name" placeholder="Your Name" />
              <input type="email" name="emailmsg" placeholder="Your Email" />
              <input type="text" name="phone number" placeholder="Your Phone" />
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
  </section>
  <!-- end contact section -->
@endsection
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
  </section>
  <!-- end contact section -->
@endsection
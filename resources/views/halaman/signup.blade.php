@extends('master')

@section('content1')
    <!-- contact section -->
  <section class="contact_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          INBIOTA
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
            <form action="/accSignup" method="post">
              @csrf
              <div>
                <input type="text" name="email" placeholder="Email" />
              </div>
              <div>
                <input type="text" name="password" placeholder="Password" />
              </div>
              <div>
                <input type="text" placeholder="Confirm Password" />
              </div>
              <div class="btn_box " type="submit" >
                <button>
                  Sign Up
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
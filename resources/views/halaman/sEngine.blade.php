@extends('master3')

<!-- header section strats -->
<header class="headers_section hero_area">
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg custom_nav-container ">
      <a href="/" style="text-decoration: none; display: flex; align-items: center;">
        <img src="{{ asset('/INBIOTALogo.png') }}" alt="Logo" style="width: 150px; height: auto; margin-right: 10px;">
      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav  ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="/docs">Docs<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/contact">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Sign In</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>
<!-- end header section -->
@section('content')
 <!-- Content Wrapper. Contains page content -->
  <!-- Main content -->
  <section class="contact_section layout_padding3">
      <div class="container heading_center">
        <h2 class="text-center display-5"> <label>INBIOTA Search Engine</label></h2>
        <br><br>
          <form action="/searchEngine" method="GET">
            @csrf
              <div class="row">
                  <div class="col-md-10 offset-md-1">
                      <div class="row">
                        <div class="col-6">
                          <div class="form-group">
                            <label for="orderBySelect">Search By:</label>
                            <select id="orderBySelect" name="orderBy" class="select2" style="width: 100%;">
                                <option value="plant">Plant</option>
                                <option value="phytochemical">Phytochemical</option>
                                <option value="bioactivities">Bioactivities</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-6">
                          <div id="searchResults">
                          <div class="form-group">
                              <label for="orderAttributes">Attribute Order:</label>
                                <select class="select2" id="orderAttributes" name="attribute" style="width: 100%;">
                                  {{-- <option value="Plant_Name">Plant</option>
                                  <option value="Phytochemical">Phytochemical</option>
                                  <option value="BA_Name">Bioactivities</option> --}}
                                </select>
                          </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                          <div class="input-group input-group-lg">
                              <input type="search" class="form-control form-control-lg" name="search" placeholder="Type your keywords here">
                              <div class="input-group-append">
                                  <button type="submit" class="btn btn-lg btn-default">
                                      <i class="fa fa-search"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  </section>

  <!-- info section -->

<section class="info_sections layout_padding2">
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
  <footer class="footer_sections">
    <div class="container">
      <p>
        &copy; <span id="displayYear"></span> All Rights Reserved By
        <a href="/">INBIOTA</a>
      </p>
    </div>
  </footer>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(document).ready(function() {
    var attributes = {
        plant: [
            { label: "All Attributes"},
            { label: "Local Name", value: "local_name" },
            { label: "English Name", value: "english_name" },
            { label: "Kingdom", value: "kingdom" },
            { label: "Subkingdom", value: "subkingdom" },
            { label: "Infrakingdom", value: "infrakingdom" },
            { label: "Superdivision", value: "superdivision" },
            { label: "Class", value: "class" },
            { label: "Superorder", value: "superorder" },
            { label: "Order", value: "order" },
            { label: "Family", value: "family" },
            { label: "Genus", value: "genus" },
            { label: "Species", value: "species" },
            { label: "Traditional Uses", value: "traditional_uses" },
            { label: "Synonym", value: "synonym" },
            { label: "Bioactivities Related", value: "bioactivities_related" },
            { label: "Phytochemicals Related", value: "phytochemicals_related" }
        ],
        phytochemical: [
            { label: "All Attributes", value: "all_attributes" },
            { label: "Compound Class", value: "compound_class" },
            { label: "Chemical Formula", value: "chemical_formula" },
            { label: "Molecular Mass", value: "molecular_mass" },
            { label: "IUPAC Name", value: "iupac_name" },
            { label: "Synonym", value: "synonym" },
            { label: "Plants Related", value: "plants_related" },
            { label: "Bioactivities Related", value: "bioactivities_related" },
            { label: "CAS Number", value: "cas_number" }
        ],
        bioactivities: [
            { label: "All Attributes", value: "all_attributes" },
            { label: "Details", value: "details" },
            { label: "Plants Related", value: "plants_related" },
            { label: "Phytochemicals Related", value: "phytochemicals_related" }
        ]
    };

    $('#orderBySelect').change(function() {
        var selectedOrderBy = $(this).val();
        var selectedAttributes = attributes[selectedOrderBy];

        $('#orderAttributes').empty();

        $.each(selectedAttributes, function(index, value) {
            $('#orderAttributes').append('<option value="' + value.value + '">' + value.label + '</option>');
        });
    });
});
</script>
  <!-- footer section -->
@endsection

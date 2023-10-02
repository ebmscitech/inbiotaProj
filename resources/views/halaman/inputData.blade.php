@extends('master')

@section('content1')
    <!-- contact section -->
  <section class="contact_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          Input Data
        </h2>
      </div>
      <div class="row">
        <div class="col-md-8 col-lg-6 mx-auto">
          <div class="form_container">
            <form action="/sendPData" method="post">
              @csrf
              <div>
                <input type="text" name="Plant Name" placeholder="Plant Name" />
              </div>
              <div>
                <input type="text" name="Local Name" placeholder="Local Name" />
              </div>
              <div>
                <input type="text" name="English Name" placeholder="English Name" />
              </div>
              <div>
                <input type="text" name="Kingdom" placeholder="Kingdom" />
              </div>
              <div>
                <input type="text" name="Sub-Kingdom" placeholder="Sub-Kingdom" />
              </div>
              <div>
                <input type="text" name="Infrakingdom" placeholder="Infrakingdom" />
              </div>
              <div>
                <input type="text" name="Superdivision" placeholder="Superdivision" />
              </div>
              <div>
                <input type="text" name="Class" placeholder="Class" />
              </div>
              <div>
                <input type="text" name="Superorder" placeholder="Superorder" />
              </div>
              <div>
                <input type="text" name="Order" placeholder="Order" />
              </div>
              <div>
                <input type="text" name="Family" placeholder="Family" />
              </div>
              <div>
                <input type="text" name="Genus" placeholder="Genus" />
              </div>
              <div>
                <input type="text" name="Species" placeholder="Species" />
              </div>
              <div>
                <input type="text" name="Synonym" placeholder="Synonym" />
              </div>
              <div>
                <input type="text" name="CAS Number" placeholder="CAS Number" />
              </div>
              <div>
                <input type="text" name="Chemical Formula" placeholder="Chemical Formula" />
              </div>
              <div>
                <input type="text" name="Molecular Mass" placeholder="Molecular Mass (m/z)" />
              </div>
              <div>
                <input type="text" name="IUPAC Name" placeholder="IUPAC Name" />
              </div>
              <div>
                <input type="text" name="Geographical Distribution" class="message-box" placeholder="Geographycal Distribution" />
              </div>
              <div>
                <input type="text" name="Traditional Uses" class="message-box" placeholder="Traditional Uses" />
              </div>
              <div>
                <input type="text" name="In Silico" class="message-box" placeholder="Bioacttivities In silico" />
              </div>
              <div>
                <input type="text" name="Acute Toxicity" class="message-box" placeholder="Acute Toxicity" />
              </div>
              <div>
                <input type="text" name="Subchronic Toxicity" class="message-box" placeholder="Subchronic Toxicity" />
              </div>
              <div>
                <input type="text" name="Chronic Toxicity" class="message-box" placeholder="Chronic Toxicity" />
              </div>
              <div>
                <input type="text" name="In Vivo" class="message-box" placeholder="Bioacttivities In vivo" />
              </div>
              <div>
                <input type="text" name="In Vitro" class="message-box" placeholder="Bioacttivities In vitro" />
              </div>
              <div>
                <input type="text" name="Clinical Studies" class="message-box" placeholder="Bioacttivities Clinical Studies" />
              </div>
              <div>
                <input type="text" name="Phytochemical" class="message-box" placeholder="Phytochemical" />
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
@endsection
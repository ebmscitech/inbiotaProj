@extends('master2')

@section('title')
Introduction
@endsection

@section('content1')
<section class="content">
<div class="container-fluid">
<h5 class="mb-3">Welcome to INBIOTA Admin Page!</h5>

<div class="row">
  <div class="col-12">
    <!-- Custom Tabs -->
    <div class="card">
      <div class="card-header d-flex p-0">
        <h3 class="card-title p-3">Documentation about Admin Page</h3>
        <ul class="nav nav-pills ml-auto p-2">
          <li class="nav-item"><a class="nav-link active" href="#tab_1" data-toggle="tab">Data Structure</a></li>
          <li class="nav-item"><a class="nav-link" href="#tab_2" data-toggle="tab">Lists Data</a></li>
          <li class="nav-item"><a class="nav-link" href="#tab_3" data-toggle="tab">Message and Subscription</a></li>
        </ul>
      </div><!-- /.card-header -->
      <div class="card-body">
        <div class="tab-content">
          <div class="tab-pane active" id="tab_1">
              Tabel bioaktivitas <br>
              protected $table = 'bioaktivitas'; <br>
              protected $fillable = ['BA_Name','BA_Details','BA_ref']; <br><br> <hr>

              Tabel tanaman <br>
              protected $table = 'tanaman';<br>
              protected $fillable = ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym", "Geographical_Distribution", "Traditional_Uses", "Reference", 'BaTanRelated']; <br><br><hr>

              Tabel senyawa <br>
              protected $table = 'senyawa'; <br>
              protected $fillable = ['Synonym','CAS_Number','Chemical_Formula','Molecular_Mass', 'IUPAC_Name', 'Phytochemical', 'compoundClass', 'Description']; <br> <br> <hr>


              Tiap tabel ada field detail yang bisa diisi <br>
              -bioaktivitas 	==> BA_Detail <br>
              -tanaman	==> BaTanRelated <br>
              -senyawa	==> Description <br>
          </div>
          <!-- /.tab-pane -->
          <div class="tab-pane" id="tab_2">
            The European languages are members of the same family. Their separate existence is a myth.
            For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
            in their grammar, their pronunciation and their most common words. Everyone realizes why a
            new common language would be desirable: one could refuse to pay expensive translators. To
            achieve this, it would be necessary to have uniform grammar, pronunciation and more common
            words. If several languages coalesce, the grammar of the resulting language is more simple
            and regular than that of the individual languages.
          </div>
          <!-- /.tab-pane -->
          <div class="tab-pane" id="tab_3">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </div>
    <!-- ./card -->
    <form action="https://inbiota.id">
      <button class="btn-success mb-8 btn-lg">
        Webpage
      </button>
        <br>
        <br>
    </form>
  </div>
  <!-- /.col -->
</div>
</div>
</section>

<!-- /.row -->
<!-- END CUSTOM TABS -->
@endsection


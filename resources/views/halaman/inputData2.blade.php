@extends('master2')
@section('title')
    Phytochemical Data
@endsection
@section('content1')
<link rel="stylesheet" href="{{asset('/adminlte/plugins/select2/css/select2.min.css')}}">
    <!-- contact section -->
  <section class="content">
    <div class="container-fluid">
      <div class="">
        <div class="">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Input Phytochemical Data</h3>
            </div>
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
            <form action="/zat" method="post">
              @csrf
              <div class="form-group">
                <label for="exampleInputEmail1">Phytochemical</label>
                <input type="text" class="form-control" name="Phytochemical" class="message-box" placeholder="Phytochemical" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Compound Class</label>
                <input type="text" class="form-control" name="compoundClass" placeholder="Compound Class">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">CAS Number</label>
                <input type="text" class="form-control" name="CAS_Number" placeholder="CAS Number" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Chemical Formula</label>
                <input type="text" class="form-control" name="Chemical_Formula" placeholder="Chemical Formula" />
              </div>              
              <div class="form-group">
                <label for="exampleInputEmail1">Molecular Mass</label>
                <input type="text" class="form-control" name="Molecular_Mass" placeholder="Molecular Mass (m/z)" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">IUPAC Name</label>
                <input type="text" class="form-control" name="IUPAC_Name" placeholder="IUPAC Name" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Synonym</label>
                <input type="text" class="form-control" name="SynonymZ" placeholder="Synonym" />
              </div>
              <div class="form-group">
                <label>Plant related:</label>
                <select name="Plant_Name[]" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;">
                  @forelse ($tanaman as $item)
                      <option value="{{$item->id}}">{{$item->Plant_Name}}</option>
                  @empty
                      <option value="">None of Plant Data</option>
                  @endforelse
                </select>
              </div>
              <div class="form-group">
                <label>Bioactivities related:</label>
                <select name="BA_Name[]" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;">
                  @forelse ($Bio as $item)
                      <option value="{{$item->id}}">{{$item->BA_Name}}</option>
                  @empty
                      <option value="">None of Bioactivity Data</option>
                  @endforelse
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea type="text" class="form-control" name="Description" placeholder="Description"></textarea>
              </div>
              <button class="btn btn-primary btn-lg ">
                  SEND
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end contact section -->
  <script>
    $(function () {
      $('.select2').select2()
    });
  </script>
  <script src="{{asset('/adminlte/plugins/select2/js/select2.full.min.js')}}"></script>
@endsection
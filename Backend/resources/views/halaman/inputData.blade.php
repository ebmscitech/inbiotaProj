@extends('master2')
@section('title')
    Plant Data
@endsection
@section('content1')
  <!-- Select2 -->
  <link rel="stylesheet" href="{{asset('/adminlte/plugins/select2/css/select2.min.css')}}">
    <!-- contact section -->
  <section class="content">
    <div class="container-fluid">
      <div class="">
        <div class="">
          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Input Plant Data</h3>
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
            <form action="/tanaman" method="post">
              @csrf
              <div class="form-group">
                <label for="exampleInputEmail1">Plant Name</label>
                <input type="text" class="form-control" name="Plant_Name" placeholder="Plant Name" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Local Name</label>
                <input type="text" class="form-control" name="Local_Name" placeholder="Local Name" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">English Name</label>
                <input type="text" class="form-control" name="English_Name" placeholder="English Name" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Kingdom</label>
                <input type="text" class="form-control" name="Kingdom" placeholder="Kingdom" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">SubKingdom</label>
                <input type="text" class="form-control" name="SubKingdom" placeholder="Sub-Kingdom" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Infrakingdom</label>
                <input type="text" class="form-control" name="Infrakingdom" placeholder="Infrakingdom" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Superdivision</label>
                <input type="text" class="form-control" name="Superdivision" placeholder="Superdivision" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Class</label>
                <input type="text" class="form-control" name="Class" placeholder="Class" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Superorder</label>
                <input type="text" class="form-control" name="Superorder" placeholder="Superorder" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Order</label>
                <input type="text" class="form-control" name="Order" placeholder="Order" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Family</label>
                <input type="text" class="form-control" name="Family" placeholder="Family" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Genus</label>
                <input type="text" class="form-control" name="Genus" placeholder="Genus" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Species</label>
                <input type="text" class="form-control" name="Species" placeholder="Species" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Geographical Distribution</label>
                <input type="text" class="form-control" name="Geographical_Distribution" class="message-box" placeholder="Geographycal Distribution" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Traditional Uses</label>
                <input type="text" class="form-control" name="Traditional_Uses" class="message-box" placeholder="Traditional Uses" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Synonym</label>
                <input type="text" class="form-control" name="Synonym" placeholder="Synonym" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Reference</label>
                <input type="text" class="form-control" name="Reference" placeholder="Reference" />
              </div>
              <div class="form-group">
                <label>Bioactivities related:</label>
                <select name="BA_Name[]" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;">
                  @forelse ($Bio as $item)
                      <option value="{{$item->id}}">{{$item->BA_Name}}</option>
                  @empty
                      <option value="">None of Plant Data</option>
                  @endforelse
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Bioactivity Detail</label>
                <input type="text" class="form-control" name="BaTanRelated" placeholder="Bioactivity Detail" />
              </div>
              <div class="form-group">
                <label>Phytochemical related:</label>
                <select name="Phytochemical[]" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;">
                  @forelse ($zat as $item)
                      <option value="{{$item->id}}">{{$item->Phytochemical}}</option>
                  @empty
                      <option value="">None of Bioactivity Data</option>
                  @endforelse
                </select>
              </div>
              <button class="btn btn-primary btn-lg">
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
<!-- Select2 -->
<script src="{{asset('/adminlte/plugins/select2/js/select2.full.min.js')}}"></script>
@endsection
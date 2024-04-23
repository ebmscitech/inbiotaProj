@extends('master2')
@section('title')
    Plant Data
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
              <h3 class="card-title">Update Plant Data</h3>
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
            <form action="/listDatabase/{{$dataSenyawa->id}}" method="POST">
              @csrf
              @method('PUT')
              <div class="form-group">
                <label>Plant Name</label>
                <input type="text" name="Plant_Name" class="form-control" value="{{$dataSenyawa->Plant_Name ?? 'N/A'}}" placeholder="Plant Name" />
              </div>
              <div class="form-group">
                <label>Local Name</label>
                <input type="text" name="Local_Name" class="form-control" value="{{$dataSenyawa->Local_Name ?? 'N/A'}}" placeholder="Local Name" />
              </div>
              <div class="form-group">
                <label>English Name</label>
                <input type="text" name="English_Name" class="form-control" value="{{$dataSenyawa->English_Name ?? 'N/A'}}" placeholder="English Name" />
              </div>
              <div class="form-group">
                <label>Kingdom</label>
                <input type="text" name="Kingdom" class="form-control" value="{{$dataSenyawa->Kingdom ?? 'N/A'}}" placeholder="Kingdom" />
              </div>
              <div class="form-group">
                <label>SubKingdom</label>
                <input type="text" name="SubKingdom" class="form-control" value="{{$dataSenyawa->SubKingdom ?? 'N/A'}}" placeholder="Sub-Kingdom" />
              </div>
              <div class="form-group">
                <label>Infrakingdom</label>
                <input type="text" name="Infrakingdom" class="form-control" value="{{$dataSenyawa->Infrakingdom ?? 'N/A'}}" placeholder="Infrakingdom" />
              </div>
              <div class="form-group">
                <label>Superdivision</label>
                <input type="text" name="Superdivision" class="form-control" value="{{$dataSenyawa->Superdivision ?? 'N/A'}}" placeholder="Superdivision" />
              </div>
              <div class="form-group">
                <label>Class</label>
                <input type="text" name="Class" class="form-control" value="{{$dataSenyawa->Class ?? 'N/A'}}"  placeholder="Class" />
              </div>
              <div class="form-group">
                <label>Superorder</label>
                <input type="text" name="Superorder" class="form-control" value="{{$dataSenyawa->Superorder ?? 'N/A'}}" placeholder="Superorder" />
              </div>
              <div class="form-group">
                <label>Order</label>
                <input type="text" name="Order" class="form-control" value="{{$dataSenyawa->Order ?? 'N/A'}}" placeholder="Order" />
              </div>
              <div class="form-group">
                <label>Family</label>
                <input type="text" name="Family" class="form-control" value="{{$dataSenyawa->Family ?? 'N/A'}}" placeholder="Family" />
              </div>
              <div class="form-group">
                <label>Genus</label>
                <input type="text" name="Genus" class="form-control" value="{{$dataSenyawa->Genus ?? 'N/A'}}" placeholder="Genus" />
              </div>
              <div class="form-group">
                <label>Species</label>
                <input type="text" name="Species" class="form-control" value="{{$dataSenyawa->Species ?? 'N/A'}}" placeholder="Species" />
              </div>
              <div class="form-group">
                <label>Synonym</label>
                <input type="text" name="Synonym" class="form-control" value="{{$dataSenyawa->Synonym ?? 'N/A'}}" placeholder="Synonym" />
              </div>
              <div class="form-group">
                <label>Geographical Distribution</label>
                <input type="text" name="Geographical_Distribution" class="form-control" value="{{$dataSenyawa->Geographical_Distribution ?? 'N/A'}}" class="message-box" placeholder="Geographycal Distribution" />
              </div>
              <div class="form-group">
                <label>Traditional Uses</label>
                <input type="text" name="Traditional_Uses" class="form-control" value="{{$dataSenyawa->Traditional_Uses ?? 'N/A'}}" placeholder="Traditional Uses" />
              </div>
              <div class="form-group">
                <label>Reference</label>
                <input type="text" name="Reference" class="form-control" value="{{$dataSenyawa->Reference ?? 'N/A'}}" placeholder="Reference" />
              </div>
              <div class="form-group">
                <label>Phytochemical related:</label>
                <select name="Phytochemical[]" class="select2" multiple="multiple" data-placeholder="Any" value="{{$dataSenyawa->Phytochemical ?? 'N/A'}}" style="width: 100%;">
                  @forelse ($zat as $item)
                  @php
                      $selected = in_array($item->id, json_decode($dataSenyawa->Phytochemical, true) ?? []);
                  @endphp
                  @if ($selected)
                      <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Phytochemical }}</option>
                  @else
                      <option value="{{ $item->id }}">{{ $item->Phytochemical }}</option>
                  @endif
                  @empty
                      <option value="">None of Phytochemical Data</option>
                  @endforelse
                </select>
              </div>
              <div class="form-group">
                <label>Bioactivities related:</label>
                <select name="BA_Name[]" class="select2" multiple="multiple" data-placeholder="Any" value="{{$dataSenyawa->BA_Name ?? 'N/A'}}" style="width: 100%;">
                  @forelse ($Bio as $item)
                  @php
                      $selected = in_array($item->id, json_decode($dataSenyawa->BA_Name, true) ?? []);
                  @endphp
                  @if ($selected)
                      <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->BA_Name }}</option>
                  @else
                      <option value="{{ $item->id }}">{{ $item->BA_Name }}</option>
                  @endif
                  @empty
                          <option value="">None of Bioactivity Data</option>
                  @endforelse
                </select>
              </div>
              <div class="form-group">
                <label>Bioactivity Detail</label>
                <input type="text" name="BA_detail" class="form-control" value="{{$dataSenyawa->BA_detail ?? 'N/A'}}" placeholder="Bioactivity Detail" />
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
  <script>
    $(function () {
      $('.select2').select2()
    });
  </script>
  <script src="{{asset('/adminlte/plugins/select2/js/select2.full.min.js')}}"></script>
  <!-- end contact section -->
@endsection
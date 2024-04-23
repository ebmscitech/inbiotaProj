@extends('master2')
@section('title')
    Substance Data
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
              <h3 class="card-title">Update Substance Data</h3>
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
            <form action="/zat/{{$zat->id}}" method="POST">
              @csrf
              @method('PUT')
              <div class="form-group">
                <label for="exampleInputEmail1">Phytochemical</label>
                <input type="text" class="form-control" name="Phytochemical" value="{{$zat->Phytochemical ?? 'N/A'}}"  placeholder="Phytochemical" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Compound Class</label>
                <input type="text" class="form-control" name="compoundClass" value="{{$zat->compoundClass ?? 'N/A'}}" placeholder="Compound Class">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">CAS Number</label>
                <input type="text" class="form-control" name="CAS_Number" value="{{$zat->CAS_Number ?? 'N/A'}}" placeholder="CAS Number" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Chemical Formula</label>
                <input type="text" class="form-control" name="Chemical_Formula" value="{{$zat->Chemical_Formula ?? 'N/A'}}" placeholder="Chemical Formula" />
              </div>              
              <div class="form-group">
                <label for="exampleInputEmail1">Molecular Mass</label>
                <input type="text" class="form-control" name="Molecular_Mass" value="{{$zat->Molecular_Mass ?? 'N/A'}}" placeholder="Molecular Mass (m/z)" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">IUPAC Name</label>
                <input type="text" class="form-control" name="IUPAC_Name" value="{{$zat->IUPAC_Name ?? 'N/A'}}" placeholder="IUPAC Name" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Synonym</label>
                <input type="text" class="form-control" name="SynonymZ" value="{{$zat->SynonymZ ?? 'N/A'}}" placeholder="Synonym" />
              </div>
              <div class="form-group">
                <label>Plant related:</label>
                <select name="Plant_Name[]" class="select2" multiple="multiple" data-placeholder="Any" value="{{$zat->Phytochemical ?? 'N/A'}}" style="width: 100%;">
                    @forelse ($dataSenyawa as $item)
                    @php
                        $selected = in_array($item->id, json_decode($zat->Plant_Name, true) ?? []);
                    @endphp
                    @if ($selected)
                        <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Plant_Name }}</option>
                    @else
                        <option value="{{ $item->id }}">{{ $item->Plant_Name }}</option>
                    @endif
                    
                    @empty
                            <option value="">None of Phytochemical Data</option>
                    @endforelse
                </select>
              </div>
              <div class="form-group">
                <label>Bioactivities related:</label>
                <select name="BA_Name[]" class="select2" multiple="multiple" data-placeholder="Any" value="{{$zat->BA_Name ?? 'N/A'}}" style="width: 100%;">
                    @forelse ($Bio as $item)
                    @php
                        $selected = in_array($item->id, json_decode($zat->BA_Name, true) ?? []);
                    @endphp
                    @if ($selected)
                        <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->BA_Name }}</option>
                    @else
                        <option value="{{ $item->id }}">{{ $item->BA_Name }}</option>
                    @endif
                    @empty
                            <option value="">None of Phytochemical Data</option>
                    @endforelse
                </select>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Description</label>
                <textarea type="text" class="form-control" name="Description" placeholder="Description">{{$zat->Description ?? 'N/A'}}</textarea>
              </div>
              {{-- <div class="form-group">
                <label>Bioactivities related:</label>
                <select name="Plant_Name" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;" value="{{$dataSenyawa->Plant_Name ?? 'N/A'}}">
                  @forelse ($dataSenyawa as $item)
                      <option value="{{$item->id}}">{{$item->Plant_Name}}</option>
                  @empty
                      <option value="">None of Plant Data</option>
                  @endforelse
                </select>
              </div>
              <div class="form-group">
                <label>Phytochemical related:</label>
                <select name="Plant_Name" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;" value="{{$dataSenyawa->Plant_Name ?? 'N/A'}}">
                  @forelse ($dataSenyawa as $item)
                      <option value="{{$item->id}}">{{$item->Plant_Name}}</option>
                  @empty
                      <option value="">None of Plant Data</option>
                  @endforelse
                </select>
              </div> --}}
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
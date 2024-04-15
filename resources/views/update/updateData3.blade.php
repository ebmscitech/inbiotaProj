@extends('master2')
@section('title')
    Bioactivity Data
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
              <h3 class="card-title">Update Bioactivity Data</h3>
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
            <form action="/Bio/{{$Bio->id}}" method="POST">
              @csrf
              @method('PUT')
              <div class="form-group">
                <label for="exampleInputEmail1">Bioactivity Name</label>
                <input type="text" class="form-control" name="BA_Name" value="{{$Bio->BA_Name ?? 'N/A'}}"  placeholder="Bioactivity" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Details</label>
                <input type="text" class="form-control" name="BA_Details" value="{{$Bio->BA_Details ?? 'N/A'}}" placeholder="Details">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Reference</label>
                <input type="text" class="form-control" name="BA_ref" value="{{$Bio->BA_ref ?? 'N/A'}}" placeholder="Reference" />
              </div>
              <div class="form-group">
                <label>Plant related:</label>
                <select name="Plant_Name[]" class="select2" multiple="multiple" data-placeholder="Any" value="{{$Bio->Phytochemical ?? 'N/A'}}" style="width: 100%;">
                 @forelse ($dataSenyawa as $item)
                    @php
                        // Mengecek apakah $item->id ada dalam array yang dihasilkan dari JSON decoding Plant_Name
                        $selected = in_array($item->id, json_decode($Bio->Plant_Name, true) ?? [], true);
                    @endphp
                    @if ($selected)
                    <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>
                        {{ $item->Plant_Name }}
                    </option>
                    @else
                    <option value="{{ $item->id }}" >
                      {{ $item->Plant_Name }}
                  </option>
                    @endif
                @empty
                    <!-- Jika $dataSenyawa kosong, menampilkan opsi default -->
                    <option value="">None of Plant Data</option>
                @endforelse
                </select>
              </div>
              <div class="form-group">
                <label>Phytochemical related:</label>
                <select name="Phytochemical[]" class="select2" multiple="multiple" data-placeholder="Any" value="{{$Bio->Phytochemical ?? 'N/A'}}" style="width: 100%;">
                @forelse ($zat as $item)
                    @php
                        $selected = in_array($item->id, json_decode($Bio->Phytochemical, true) ?? []);
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
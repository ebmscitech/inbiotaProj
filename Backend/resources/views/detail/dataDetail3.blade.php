@extends('master2')
@section('title')
    Bioactivity Detail Data
@endsection
@section('content1')
  <!-- contact section -->
  <section class="content">
    <div class="container-fluid">
      <table class="table table-bordered">
        <!-- First Row (Header Row) with One Column -->
        <tr  style="width: 100%; text-align: center;">
          <td colspan="2"><h2><strong>{{$Bio->BA_Name}}</strong></h2></td>
        </tr>
        <!-- Second Row with Two Columns -->
        <tr>
          <td>Details</td>
          <td>{{$Bio->BA_Details}} </td>
        </tr>
        <tr>
          <td>Reference</td>
          <td>{{$Bio->BA_ref}}</td>
        </tr>
        <tr>
        <td>Plant Related</td>
        <td>
            @forelse ($dataSenyawa as $item)
                @php
                    // Mengecek apakah $item->id ada dalam array yang dihasilkan dari JSON decoding Plant_Name
                    $selected = in_array($item->id, json_decode($Bio->Plant_Name, true) ?? [], true);
                @endphp
                @if ($selected)
                <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>
                    {{ $item->Plant_Name }}
                </option>
                @endif
            @empty
                <!-- Jika $dataSenyawa kosong, menampilkan opsi default -->
                <option value="">None of Plant Data</option>
            @endforelse
        </td>
        </tr>
        <tr>
        <td>Phytochemical Related</td>
        <td>
            @forelse ($zat as $item)
                @php
                    $selected = in_array($item->id, json_decode($Bio->Phytochemical, true) ?? []);
                @endphp
                @if ($selected)
                    <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Phytochemical }}</option>
                @endif
                
            @empty
                    <option value="">None of Phytochemical Data</option>
            @endforelse
        </td>
        </tr>      
        {{-- <tr>
          <td>Structure</td>
          <td><img src="{{asset('imageInput/' . $dataSenyawa->Structure)}}" alt=""></td>
        </tr> --}}
        </table>

      <a href="/Bio" class="btn-2 btn btn-info">Back</a>

      {{-- ["Plant_Name", "Local_Name", "English_Name", "Kingdom", "SubKingdom", "Infrakingdom", "Superdivision", "Class", "Superorder", "Order", "Family", "Genus", "Species", "Synonym", "CAS_Number", "Chemical_Formula", "Molecular_Mass", "IUPAC_Name", "Geographical_Distribution", "Traditional_Uses", "In_Silico", "Acute_Toxicity", "Subchronic_Toxicity", "Chronic_Toxicity", "In_Vivo", "In_Vitro", "Clinical_Studies", "Phytochemical"] --}}
      {{-- <div class="row">
        <div class="col-md-8 col-lg-6 mx-auto">
          <div class="form_container">
            <form action="">
              <div>
                <input type="text" placeholder="Search..." />
              </div>
              <div class="btn_box ">
                <button>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> --}}
    </div>
  </section>
  <!-- end contact section -->
@endsection
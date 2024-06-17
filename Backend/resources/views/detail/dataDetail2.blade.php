@extends('master2')
@section('title')
    Substance Detail Data
@endsection
@section('content1')
  <!-- contact section -->
  <section class="content">
    <div class="container-fluid">
      <table class="table table-bordered">
        <!-- First Row (Header Row) with One Column -->
        <tr  style="width: 100%; text-align: center;">
          <td colspan="2"><h2><strong>{{$zat->Phytochemical}}</strong></h2></td>
        </tr>
        <!-- Second Row with Two Columns -->
        <tr>
          <td>Compound Class</td>
          <td>{{$zat->compoundClass}} </td>
        </tr>
        <tr>
          <td>CAS Number</td>
          <td>{{$zat->CAS_Number}}</td>
        </tr>
        <tr>
          <td>Chemical Formula</td>
          <td>{{$zat->Chemical_Formula}}</td>
        </tr>
        <tr>
          <td>Molecular Mass</td>
          <td>{{$zat->Molecular_Mass}} </td>
        </tr>
        <tr>
          <td>IUPAC Name</td>
          <td>{{$zat->IUPAC_Name}} </td>
        </tr>
        <tr>
          <td>Synonym</td>
          <td>{{$zat->SynonymZ}} </td>
        </tr>
        <tr>
        <td>Plant Related</td>
        <td>
              @forelse ($sbt as $item)
              @php
                  $plantNames = $tanaman->pluck('Plant_Name')->toArray();
                  $selected = in_array($item->tanId, $plantNames);
              @endphp
              @if ($selected)
                  <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Plant_Name }}</option>
              @endif
              @empty
                  <option value="">None of Plant Data</option>
              @endforelse
        </td>
        </tr>
        <td>Bioactivities Related</td>
        <td>
            @forelse ($Bio as $item)
            @php
                $selected = in_array($item->id, json_decode($zat->BA_Name, true) ?? []);
            @endphp
            @if ($selected)
                <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->BA_Name }}</option>
            @endif
            @empty
                    <option value="">None of Phytochemical Data</option>
            @endforelse
        </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{{$zat->Description}} </td>
        </tr>        
        {{-- <tr>
          <td>Structure</td>
          <td><img src="{{asset('imageInput/' . $tanaman->Structure)}}" alt=""></td>
        </tr> --}}
        </table>

      <a href="/zat" class="btn-2 btn btn-info">Back</a>

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
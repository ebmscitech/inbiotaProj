@extends('master2')
@section('title')
    Plant Detail Data
@endsection
@section('content1')
    <!-- contact section -->
    <section class="content">
        <div class="container-fluid">
            <table class="table table-bordered">
                <!-- First Row (Header Row) with One Column -->
                <tr  style="width: 100%; text-align: center;">
                    <td colspan="2"><h2><strong>{{$tanaman->Plant_Name}}</strong></h2></td>
                </tr>
                <!-- Second Row with Two Columns -->
                <tr>
                    <td>English Name</td>
                    <td>{{$tanaman->English_Name}} </td>
                </tr>
                <tr>
                    <td>Local Name</td>
                    <td>{{$tanaman->Local_Name}}</td>
                </tr>
                <tr>
                    <td>Kingdom</td>
                    <td>{{$tanaman->Kingdom}}</td>
                </tr>
                <tr>
                    <td>SubKingdom</td>
                    <td>{{$tanaman->SubKingdom}} </td>
                </tr>
                <tr>
                    <td>Infrakingdom</td>
                    <td>{{$tanaman->Infrakingdom}} </td>
                </tr>
                <tr>
                    <td>Superdivision</td>
                    <td>{{$tanaman->Superdivision}} </td>
                </tr>
                <tr>
                    <td>Class</td>
                    <td>{{$tanaman->Class}} </td>
                </tr>
                <tr>
                    <td>Superorder</td>
                    <td>{{$tanaman->Superorder}} </td>
                </tr>
                <tr>
                    <td>Order</td>
                    <td>{{$tanaman->Order}}</td>
                </tr>
                <tr>
                    <td>Family</td>
                    <td>{{$tanaman->Family}}</td>
                </tr>
                <tr>
                    <td>Genus</td>
                    <td>{{$tanaman->Genus}}</td>
                </tr>
                <tr>
                    <td>Species</td>
                    <td>{{$tanaman->Species}}</td>
                </tr>
                <tr>
                    <td>Synonym</td>
                    <td>{{$tanaman->Synonym}}</td>
                </tr>
                <tr>
                    <td>Geographical Distribution</td>
                    <td>{{$tanaman->Geographical_Distribution}}</td>
                </tr>
                <tr>
                    <td>Traditional Uses</td>
                    <td>{{$tanaman->Traditional_Uses}}</td>
                </tr>
                <tr>
                    <td>Reference</td>
                    <td>{{$tanaman->Reference}}</td>
                </tr>
                <td>Phytochemical Related</td>
                <td>
                    @forelse ($zat as $item)
                        @php
                            $selected = in_array($item->id, json_decode($tanaman->Phytochemical, true) ?? []);
                        @endphp
                        @if ($selected)
                            <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Phytochemical }}</option>
                        @endif
                    @empty
                        <option value="">None of Phytochemical Data</option>
                    @endforelse
                </td>
                </tr>
                <td>Bioactivities Related</td>
                <td>
                    @forelse ($Bio as $item)
                        @php
                            $selected = in_array($item->id, json_decode($tanaman->BA_Name, true) ?? []);
                        @endphp
                        @if ($selected)
                            <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->BA_Name }}</option>
                        @endif
                    @empty
                        <option value="">None of Bioactivity Data</option>
                    @endforelse
                </td>
                </tr>
                <tr>
                    <td>Bioactivity Detail</td>
                    {{-- <td>{{$tanaman->BA_detail}}</td> --}}
                </tr>
                {{-- <tr>
                  <td>Structure</td>
                  <td><img src="{{asset('imageInput/' . $dataSenyawa->Structure)}}" alt=""></td>
                </tr> --}}
            </table>

            <a href="/listDatabase" class="btn-2 btn btn-info">Back</a>

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

@extends('master')
@section('content1')
  <!-- contact section -->
  <section class=" layout_padding">
    <div class="container-fluid">
      <table class="table" style="width:100%">
        <thead>
        <!-- First Row (Header Row) with One Column -->
        <tr  style="width: 100%; text-align: center;">
          <td colspan="2"><h4><strong>{{$dataSenyawa->Plant_Name}}</strong></h4></td>
        </tr>
        </thead>
        <!-- Second Row with Two Columns -->
        <tbody>
        <tr>
          <td>English Name</td>
          <td>{{$dataSenyawa->English_Name}} </td>
        </tr>
        <tr>
          <td>Local Name</td>
          <td>{{$dataSenyawa->Local_Name}}</td>
        </tr>
        <tr>
          <td>Kingdom</td>
          <td>{{$dataSenyawa->Kingdom}}</td>
        </tr>
        <tr>
          <td>SubKingdom</td>
          <td>{{$dataSenyawa->SubKingdom}} </td>
        </tr>
        <tr>
          <td>Infrakingdom</td>
          <td>{{$dataSenyawa->Infrakingdom}} </td>
        </tr>
        <tr>
          <td>Superdivision</td>
          <td>{{$dataSenyawa->Superdivision}} </td>
        </tr>
        <tr>
          <td>Class</td>
          <td>{{$dataSenyawa->Class}} </td>
        </tr>
        <tr>
          <td>Superorder</td>
          <td>{{$dataSenyawa->Superorder}} </td>
        </tr>
        <tr>
          <td>Order</td>
          <td>{{$dataSenyawa->Order}}</td>
        </tr>
        <tr>
          <td>Family</td>
          <td>{{$dataSenyawa->Family}}</td>
        </tr>
        <tr>
          <td>Genus</td>
          <td>{{$dataSenyawa->Genus}}</td>
        </tr>
        <tr>
          <td>Species</td>
          <td>{{$dataSenyawa->Species}}</td>
        </tr>
        <tr>
          <td>Synonym</td>
          <td>{{$dataSenyawa->Synonym}}</td>
        </tr>
        <tr>
          <td>Geographical Distribution</td>
          <td>{{$dataSenyawa->Geographical_Distribution}}</td>
        </tr>
        <tr>
          <td>Traditional Uses</td>
          <td>{{$dataSenyawa->Traditional_Uses}}</td>
        </tr>
        <tr>
        <td>Phytochemical Related</td>
        <td>
            @forelse ($zat as $item)
            @php
                $selected = in_array($item->id, json_decode($dataSenyawa->Phytochemical, true) ?? []);
            @endphp
            @if ($selected)
                <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Phytochemical }}</option>
            @endif
            @empty
                    <option value="">None of Phytochemical Data</option>
            @endforelse
        </td>
        </tr>
        <tr>
        <td>Bioactivities Related</td>
        <td>
            @forelse ($Bio as $item)
            @php
                $selected = in_array($item->id, json_decode($dataSenyawa->BA_Name, true) ?? []);
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
          <td>{{$dataSenyawa->BA_detail}}</td>
        </tr>
        <tr>
            <td>Reference</td>
            <td>{{$dataSenyawa->Reference}}</td>
        </tr>         
        {{-- <tr>
          <td>Structure</td>
          <td><img src="{{asset('imageInput/' . $dataSenyawa->Structure)}}" alt=""></td>
        </tr> --}}
        </tbody>
        </table>
        <br>
        <br>
      <a href="/sEngine" class="btn-2 btn-lg btn-info">Back</a>
</div>
</section>
  <!-- end contact section -->
@endsection
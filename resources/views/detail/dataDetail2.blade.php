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
            @forelse ($tanNames as $id => $name)
                <li> (ID: {{ $id }}) {{ $name }}</li>
            @empty
                <li>Tidak ada data senyawa terkait.</li>
            @endforelse
        </td>
        </td>
        </tr>
        <td>Bioactivities Related</td>
        <td>
            @forelse ($bioNames as $id => $name)
                <li> (ID: {{ $id }}) {{ $name }} </li>
            @empty
                <li>Tidak ada data aktivitas biokimia terkait.</li>
            @endforelse
        </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{{$zat->Description}} </td>
        </tr>        
        </table>

      <a href="/zat" class="btn-2 btn btn-info">Back</a>
      <br>

      
    </div>
  </section>
  <!-- end contact section -->
@endsection
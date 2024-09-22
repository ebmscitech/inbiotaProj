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
            @forelse ($tanNames as $id => $name)
                <li> (ID: {{ $id }}) {{ $name }}</li>
            @empty
                <li>Tidak ada data senyawa terkait.</li>
            @endforelse
        </td>
        </tr>
        <tr>
        <td>Phytochemical Related</td>
        <td>
            @forelse ($senyawaNames as $id => $name)
                <li> (ID: {{ $id }}) {{ $name }}</li>
            @empty
                <li>Tidak ada data senyawa terkait.</li>
            @endforelse
        </td>
        </tr>      
        </table>

      <a href="/Bio" class="btn-2 btn btn-info">Back</a>

    </div>
  </section>
@endsection
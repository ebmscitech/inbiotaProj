@extends('master')
@section('content1')
  <!-- contact section -->
  <section class=" layout_padding">
    <div class="container-fluid">
      <table class="table" style="width:100%">
        <thead>
        <!-- First Row (Header Row) with One Column -->
        <tr  style="width: 100%; text-align: center;">
          <td colspan="2"><h4><strong>{{$tanaman->Plant_Name}}</strong></h4></td>
        </tr>
        </thead>
        <!-- Second Row with Two Columns -->
        <tbody>
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
            <td>Phytochemical Related :</td>
            <td>
                @forelse ($zatNames as $id => $name)
                    <li> {{ $name }}</li>
                @empty
                    <li>Tidak ada data senyawa terkait.</li>
                @endforelse
            </td>
        </tr>
        <tr>
            <td>Bioactivity Related :</td>
            <td>
                @forelse ($bioNames as $id => $name)
                    <li> {{ $name }} </li>
                @empty
                    <li>Tidak ada data aktivitas biokimia terkait.</li>
                @endforelse
            </td>
        </tr>
        <tr>
          <td>Bioactivity Detail</td>
            <td>
                @forelse ($bioDetails as $id => $name)
                    <li> {{ $name }} </li>
                @empty
                    <li>Tidak ada data detail aktivitas biokimia terkait.</li>
                @endforelse
            </td>
        </tr>
        <tr>
            <td>Reference</td>
            <td>{{$tanaman->Reference}}</td>
        </tr>
        {{-- <tr>
          <td>Structure</td>
          <td><img src="{{asset('imageInput/' . $tanaman->Structure)}}" alt=""></td>
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

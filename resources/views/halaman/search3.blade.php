@extends('master')

@section('content1')

<style>
    .highlight {
        background-color: yellowgreen;
        font-weight: bold;
    }
</style>

<section class="contact_section layout_padding">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          INBIOTA
        </h2>
      </div>
@if ($results->count() > 0)
<table class="table" style="width:100%">
    @foreach ($results as $result)
    <thead>
        <tr>
            <th>Attribute</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody>
            <tr>
                <td>Bioactivity Name</td>
                <td>{!! $result->BA_Name !!}</td>
            </tr>
            <tr>
                <td>Details</td>
                <td>{!! $result->BA_Details !!}</td>
            </tr>
            <tr>
                <td>Reference</td>
                <td>{!! $result->BA_ref !!}</td>
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
                <td>Plant Related :</td>
                <td>
                    @forelse ($tanNames as $id => $name)
                        <li> {{ $name }} </li>
                    @empty
                        <li>Tidak ada data aktivitas biokimia terkait.</li>
                    @endforelse
                </td>
            </tr>
            <tr>
                <td><br><br></td>
                <td></td>
            </tr>

    </tbody>
    @endforeach
</table>
    <a href="/sEngine" class=" btn btn-warning container heading_center">Back</a>
@else
    <p>Tidak ada hasil ditemukan.</p>
@endif
</div>
</section>
@endsection

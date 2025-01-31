@extends('master')

@section('content1')

<style>
    .highlight {
        background-color: yellowgreen;
        font-weight: bold;
    }
</style>

<section class=" layout_padding">
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
            <br>
            <tr>
                <td>Plant Name</td>
                <td>{!! $result->Plant_Name !!}</td>
            </tr>
            <tr>
                <td>Local Name</td>
                <td>{!! $result->Local_Name !!}</td>
            </tr>
            <tr>
                <td>English Name</td>
                <td>{!! $result->English_Name !!}</td>
            </tr>
            <tr>
                <td>Species</td>
                <td>{!! $result->Species !!}</td>
            </tr>
            <tr>
                <td>Synonym</td>
                <td>{!! $result->Synonym !!}</td>
            </tr>
            <tr>
                <td>Phytochemical Related</td>
                <td>
                    @forelse ($senyawaNames as $id => $name)
                        <li> {{ $name }}</li>
                    @empty
                        <li>Tidak ada data senyawa terkait.</li>
                    @endforelse
                </td>
            </tr>
            <tr>
                <td>Bioactivities Related</td>
                <td>
                    @forelse ($bioNames as $id => $name)
                        <li> {{ $name }} </li>
                    @empty
                        <li>Tidak ada data aktivitas biokimia terkait.</li>
                    @endforelse
                </td>
            </tr>
            <tr>
                <td>Geographical Distribution</td>
                <td>{!! $result->Geographical_Distribution !!}</td>
            </tr>
            <tr>
                <td>Traditional Uses</td>
                <td>{!! $result->Traditional_Uses !!}</td>
            </tr>
            <tr>
                <td>
                    <br><br>
                </td>
                <td>
                <form action="/searchEngineT/{{$result->id}}" method="POST">
                    <a href="/searchEngineT/{{$result->id}}" class="btn-2 btn btn-info">Detail</a>
                </form>
                <br><br>
                </td>
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

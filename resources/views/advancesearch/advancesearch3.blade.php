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
                @foreach($attributes as $attr)
                @if($attribute == $attr['value'])
                @switch($attr['value'])
                            @case('details')
                                <td>Details</td>
                                <td>{!! $result->BA_Details !!}</td>
                                @break
                            @case('plants_related')
                                <td>Plant Related :</td>
                                <td>
                                    @forelse ($tanaman as $item)
                                    @php
                                        $selected = in_array($item->id, json_decode($result->Plant_Name, true) ?? []);
                                    @endphp
                                    @if ($selected)
                                        <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Plant_Name }}</option>
                                    @endif
                                    @empty
                                            <option value="">None of Plant Data</option>
                                    @endforelse
                                </td>
                                @break
                            @case('phytochemicals_related')
                                <td>Phytochemical Related :</td>
                                <td>
                                    @forelse ($zat as $item)
                                    @php
                                        $selected = in_array($item->id, json_decode($result->Phytochemical, true) ?? []);
                                    @endphp
                                    @if ($selected)
                                        <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->Phytochemical }}</option>
                                    @endif
                                    @empty
                                            <option value="">None of Phytochemical Data</option>
                                    @endforelse
                                </td>
                                @break
                @endswitch
                @endif
                @endforeach
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

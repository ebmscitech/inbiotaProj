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
        <br>
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
                @foreach($attributes as $attr)
                @if($attribute == $attr['value'])
                @switch($attr['value'])
                            @case('local_name')
                            {{-- <h2>{!! $result->Plant_Name!!}</h2> --}}
                                <td>Local Name</td>
                                <td>{!! $result->Local_Name !!}</td>
                                @break
                            @case('english_name')
                                <td>English Name</td>
                                <td>{!! $result->English_Name !!}</td>
                                @break
                            @case('kingdom')
                                <td>Kingdom</td>
                                <td>{!! $result->Kingdom !!}</td>
                                @break
                            @case('subkingdom')
                                <td>SubKingdom</td>
                                <td>{!! $result->SubKingdom !!}</td>
                                @break
                            @case('infrakingdom')
                                <td>Infrakingdom</td>
                                <td>{!! $result->Infrakingdom !!}</td>
                                @break
                            @case('superdivision')
                                <td>Superdivision</td>
                                <td>{!! $result->Superdivision !!}</td>
                                @break
                            @case('class')
                                <td>Class</td>
                                <td>{!! $result->Class !!}</td>
                                @break
                            @case('superorder')
                                <td>Superorder</td>
                                <td>{!! $result->Superorder !!}</td>
                                @break
                            @case('order')
                                <td>Order</td>
                                <td>{!! $result->Order !!}</td>
                                @break
                            @case('family')
                                <td>Family</td>
                                <td>{!! $result->Family !!}</td>
                                @break
                            @case('genus')
                                <td>Genus</td>
                                <td>{!! $result->Genus !!}</td>
                                @break
                            @case('species')
                                <td>Species</td>
                                <td>{!! $result->Species !!}</td>
                                @break
                            @case('traditional_uses')
                                <td>Traditional Uses</td>
                                <td>{!! $result->Traditional_Uses !!}</td>
                                @break
                            @case('synonym')
                                <td>Synonym</td>
                                <td>{!! $result->Synonym !!}</td>
                                @break
                            @case('bioactivities_related')
                                <td>Bioactivities Related</td>
                                <td>
                                    @forelse ($Bio as $item)
                                    @php
                                        $selected = in_array($item->id, json_decode($result->BA_Name, true) ?? []);
                                    @endphp
                                    @if ($selected)
                                        <option value="{{ $item->id }}" {{ $selected ? 'selected' : '' }}>{{ $item->BA_Name }}</option>
                                    @endif
                                    @empty
                                            <option value="">None of Bioactivity Data</option>
                                    @endforelse
                                </td>
                                @break
                            @case('phytochemicals_related')
                                <td>Phytochemical Related</td>
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
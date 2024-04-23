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
                            @case('compound_class')
                                <td>Compound Class</td>
                                <td>{!! $result->compoundClass !!}</td>
                                @break
                            @case('chemical_formula')
                                <td>Chemical Formula</td>
                                <td>{!! $result->Chemical_Formula !!}</td>
                                @break
                            @case('molecular_mass')
                                <td>Molecular Mass</td>
                                <td>{!! $result->Molecular_Mass !!}</td>
                                @break
                            @case('iupac_name')
                                <td>IUPAC Name</td>
                                <td>{!! $result->IUPAC_Name !!}</td>
                                @break
                            @case('synonym')
                                <td>Synonym</td>
                                <td>{!! $result->SynonymZ !!}</td>
                                @break
                            @case('plants_related')
                                <td>Plant Related :</td>
                                <td>
                                    @forelse ($dataSenyawa as $item)
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
                            @case('bioactivities_related')
                                <td>Bioactivity Related :</td>
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
                            @case('cas_number')
                                <td>CAS Number</td>
                                <td>{!! $result->CAS_Number !!}</td>
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
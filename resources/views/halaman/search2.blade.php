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
                <td>Phytochemical</td>
                <td>{!! $result->Phytochemical !!}</td>
            </tr>
            <tr>
                <td>Compound Class</td>
                <td>{!! $result->compoundClass !!}</td>
            </tr>
            <tr>
                <td>CAS Number</td>
                <td>{!! $result->CAS_Number !!}</td>
            </tr>
            <tr>
                <td>Chemical Formula</td>
                <td>{!! $result->Chemical_Formula !!}</td>
            </tr>
            <tr>
                <td>Molecular Mass</td>
                <td>{!! $result->Molecular_Mass !!}</td>
            </tr>
            <tr>
                <td>IUPAC Name</td>
                <td>{!! $result->IUPAC_Name !!}</td>
            </tr>
            <tr>
                <td>Synonym</td>
                <td>{!! $result->SynonymZ !!}</td>
            </tr>
            <tr>
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
            </tr>
            <tr>
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
            </tr>
            <tr>
                <td><br><br></td><td></td>
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

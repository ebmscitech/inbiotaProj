@extends('master2')
@section('title')
    Bioactivity Data
@endsection
@section('content1')
    <link rel="stylesheet" href="{{secure_asset('/adminlte/plugins/select2/css/select2.min.css')}}">
    <!-- contact section -->
    <section class="content">
        <div class="container-fluid">
            <div class="">
                <div class="">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Input Bioactivities Data</h3>
                        </div>
                        <div class="card-body">
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            <form action="/Bio" method="post">
                                @csrf
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Bioactivity Name</label>
                                    <input type="text" name="BA_Name" class="form-control" placeholder="Bioactivity" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Details</label>
                                    <input type="text" name="BA_Details" class="form-control" placeholder="Details" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Reference</label>
                                    <input type="text" name="BA_ref" class="form-control" placeholder="Reference" />
                                </div>
                                <div class="form-group">
                                    <label>Plant related:</label>
                                    <select name="Plant_Name[]" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;">
                                        @forelse ($tanaman as $item)
                                            <option value="{{$item->id}}">{{$item->Plant_Name}}</option>
                                        @empty
                                            <option value="">None of Plant Data</option>
                                        @endforelse
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Phytochemicals related:</label>
                                    <select name="Phytochemical[]" class="select2" multiple="multiple" data-placeholder="Any" style="width: 100%;">
                                        @forelse ($zat as $item)
                                            <option value="{{$item->id}}">{{$item->Phytochemical}}</option>
                                        @empty
                                            <option value="">None of Phytochemical Data</option>
                                        @endforelse
                                    </select>
                                </div>
                                <button class="btn btn-primary btn-lg">
                                    SEND
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script>
        $(function () {
            $('.select2').select2()
        });
    </script>
    <script src="{{secure_asset('/adminlte/plugins/select2/js/select2.full.min.js')}}"></script>
    <!-- end contact section -->
@endsection

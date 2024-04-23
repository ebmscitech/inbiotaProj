@extends('master2')
@section('title')
    List Substance Data
@endsection
@section('content1')
  <!-- contact section -->
  <section class="content">
    <div class="container-fluid">
      <form action="/zat/create">
        <button class="btn btn-success btn-lg">
          Add Data
        </button>
      </form>
      <br>

      <table class="table display" style="width:100%" id="dataTable">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Phytochemical</th>
            <th scope="col">Compound Class</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
         @forelse ($zat as $key => $value)
         <tr>
            <td>{{$key + 1}}</td>
            <td>{{$value ->Phytochemical}}</td>
            <td>{{$value ->compoundClass}}</td>
            <td>
              <form action="/zat/{{$value->id}}" method="POST">
                @csrf
                @method('DELETE')
                <a href="/zat/{{$value->id}}" class="btn-2 btn btn-info">Detail</a>
                <a href="/zat/{{$value->id}}/edit" class="btn-2 btn-warning btn">Edit</a>
                <button type="submit" value="Delete" class="btn-2 btn-danger btn delete-button" >Delete</button>
              </form>
            </td>
          </tr> 
         @empty
          <tr>
            <td></td>
            <td>No Data</td>
          </tr>
         @endforelse
        </tbody>
      </table>
      {{-- <div class="pagination-section">
        @include('pagination', ['paginator' => $dataSenyawa])
      </div> --}}

      {{-- <div class="row">
        <div class="col-md-8 col-lg-6 mx-auto">
          <div class="form_container">
            <form action="">
              <div>
                <input type="text" placeholder="Search..." />
              </div>
              <div class="btn_box ">
                <button>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> --}}
    </div>
  </section>
  <!-- end contact section -->
<script>
  document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const confirmDelete = window.confirm('Are you sure you want to delete this item?');

            if (confirmDelete) {
                const form = this.parentElement;
                form.submit();
            }
        });
    });
});
$(document).ready(function() {
    // Initialize the DataTable on your table element
    let table = $('#dataTable').DataTable({
        // Your DataTable configuration options here
    });
});


</script>

  
@endsection
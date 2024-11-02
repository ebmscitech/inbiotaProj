@extends('master2')
@section('title')
    Subscriber
@endsection
@section('content1')
  <!-- contact section -->
  <section class="content">
    <div class="container-fluid">
      <form action="/indexadmin">
        <button class="btn-2 btn-success mb-2 btn-lg">
          Dashboard
        </button>
      </form>
      <br>

      <table class="table display" id="dataTableSubs">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Subscriber</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
         @forelse ($emailsub as $key => $value)
         <tr>
            <td>{{$key + 1}}</td>
            <td>{{$value ->subscription}}</td>
            <td>
                <form action="/listSubscriber/{{$value->id}}" method="POST">
                  @csrf
                  @method('DELETE')
                  <button type="submit" value="Delete" class="btn-2 btn-danger btn-sm delete-button" >Delete</button>
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
    let table = $('#dataTableSubs').DataTable({
        // Your DataTable configuration options here
    });
});
</script>
  
@endsection
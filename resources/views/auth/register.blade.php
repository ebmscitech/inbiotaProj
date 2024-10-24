@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="row mb-3">
                            <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control @error('completeName') is-invalid @enderror" name="completeName" value="{{ old('completeName') }}" autocomplete="completeName" >

                                @error('completeName')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-md-4 col-form-label text-md-end">Username</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control @error('username') is-invalid @enderror" name="username" value="">
                            </div>
                            @error('username')
                            <strong>{{ $message }}</strong>
                            @enderror
                        </div>

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-md-4 col-form-label text-md-end">Hometown</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control @error('homeTown') is-invalid @enderror" name="homeTown" value="">
                            </div>
                            @error('homeTown')
                            <strong>{{ $message }}</strong>
                            @enderror
                        </div>

                        <div class="row mb-3">
                            <label class="col-md-4 col-form-label text-md-end">Phone Number</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control @error('phoneNo') is-invalid @enderror" name="phoneNo" value="">
                            </div>
                            @error('phoneNo')
                            <strong>{{ $message }}</strong>
                            @enderror
                        </div>

                        <div class="row mb-3">
                            <label class="col-md-4 col-form-label text-md-end">Birth Date</label>

                            <div class="col-md-6">
                                <input type="date" class="form-control @error('birthDate') is-invalid @enderror" name="birthDate" value="">
                            </div>
                            @error('birthDate')
                            <strong>{{ $message }}</strong>
                            @enderror
                        </div>

                        <div class="row mb-3">
                            <label class="col-md-4 col-form-label text-md-end">Address</label>

                            <div class="col-md-6">
                                <textarea type="text" class="form-control @error('address') is-invalid @enderror" name="address" value=""> </textarea>
                            </div>
                            @error('address')
                            <strong>{{ $message }}</strong>
                            @enderror
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

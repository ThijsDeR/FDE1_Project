@extends('common.master')

@section('content')
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-12"> {{-- These divs are needed for proper layout --}}
                    <form method="POST" action="{{ route('names.store') }}">
                        @csrf
                        <div class="card"> {{-- The form is placed inside a Bulma Card component --}}
                            <header class="card-header">
                                <p class="card-header-title"> {{-- The Card header content --}}
                                    Add a new article
                                </p>
                            </header>

                            <div class="card-content">
                                <div class="content">

                                    {{-- Here are all the form fields --}}
{{--                                    <div class="field">--}}
{{--                                        <label class="label">id</label>--}}
{{--                                        <div class="control">--}}
{{--                                            <textarea name="id" class="textarea @error('id') is-danger @enderror"--}}
{{--                                                      type="text" placeholder="id"></textarea>--}}
{{--                                        </div>--}}
{{--                                        @error('id')--}}
{{--                                        <p class="help is-danger">{{ $message }}</p>--}}
{{--                                        @enderror--}}
{{--                                    </div>--}}

                                    <div class="field">
                                        <label class="label">name</label>
                                        <div class="control">
                                            <input name="name" class="input @error('name') is-danger @enderror"
                                                   type="text" placeholder="Your name here...">
                                        </div>
                                        @error('name')
                                        <p class="help is-danger">{{ $message }}</p>
                                        @enderror
                                    </div>


                                </div>
                                <div class="field is-grouped">
                                    {{-- Here are the form buttons: save, reset and cancel --}}
                                    <div class="control">
                                        <button type="submit" class="button is-primary">Save</button>
                                    </div>
                                    <div class="control">
                                        <button type="reset" class="button is-warning">Reset</button>
                                    </div>
                                    <div class="control">
                                        <a type="button" href="/names" class="button is-light">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection



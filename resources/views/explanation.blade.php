@extends('common.master')

@section('head-content')
<link href="{{ asset('css/explanationStyles.css') }}" rel="stylesheet">
@endsection

@section('content')
<div class="container">
  <div class="color-container">
    <div class="text-container">
      <h1>Uitleg</h1>
      <ul>
        <li>Het doel van het spel is dat je zo ver mogelijk komt in het verkeer</li>
        <li>Onderweg kom je meerdere verkeersituaties tegen, die je veilig moet voltooien</li>
        <li>Je moet een zo hoog mogelijk punten te krijgen om upgrades en skins te kopen</li>
      </ul>
      <div class="controls" style="margin-top: 4vh;">
        <h3>Je bestuurt je fiets met de arrow keys en remt met de spatiebalk </h3>
      </div>
      <img id="stamina-booster" style="margin-top: 4vh;" src="./assets/img/objects/frikandelbroodje.png">
      <h3 style="margin-top: 0vh;">Probeer de stamina boosters te verzamelen voor meer stamina</h3>
    </div>
  </div>
</div>
@endsection
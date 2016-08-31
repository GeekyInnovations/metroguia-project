<!DOCTYPE html>
<html>
    <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <link rel="icon" href="/css/images/favicon.png" type="image/png" />
    {!!Html::style('css/stylesheetMV.css')!!}
    <title>MetroGuia</title>
  </head>
  
  <body>
      @yield('content')
  </body>
  {!!Html::script('js/jquery-1.12.4.js')!!}
  {!!Html::script('js/models/map.js')!!}
  {!!Html::script('js/metrovia.js')!!}
  {!!Html::script('js/lugares.js')!!}

</html>

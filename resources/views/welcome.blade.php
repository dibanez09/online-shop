<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Online Shop</title>
    </head>
    <body class="antialiased">
        <div class='container-fluid'>
            <div class='row'>
                <div class='col-xl-12'>
                    <div id='reactjs'>
                        <div id="body" message='{{ $message }}'></div>
                    </div>
                </div>
            </div><br>
        </div>
    </body>
    <script src="{{ mix('js/index.js') }}"></script>
</html>

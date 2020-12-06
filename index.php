<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NewsWorld</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-CuOF+2SnTUfTwSZjCXf01h7uYhfOBuxIhGKPbfEJ3+FqH/s6cIFN9bGr1HmAg4fQ" crossorigin="anonymous">

    <link rel="stylesheet" href="assets/css/index/style.css">

    <script src="https://kit.fontawesome.com/23a0a9f173.js" crossorigin="anonymous"></script>
</head>

<body>

    <!-- <button class="border-primary" id="toggleSettings"><i id="toogleSettingsSettingIcon" class="fas fa-cog"></i></button> -->

    <div id="mainContainer" class="container my-5">
        <div id="config" class="mb-5">
            <h4>Configration: </h4>
            <div class="mx-3">
                <div class="row row-cols-2 mt-3">
                    <div class="col">
                        <label for="country" class="form-label">Country: </label>
                        <select id="country" class="form-select" aria-label="Default select example"></select>
                    </div>
                    <div class="col">
                        <label for="type" class="form-label">News Type: </label>
                        <select id="type" class="form-select" aria-label="Default select example"></select>
                    </div>
                </div>
                <div class="row row-cols-2 mt-3">
                    <!-- <div class="col">
                        <label for="language" class="form-label">Language: </label>
                        <select id="language" class="form-select" aria-label="Default select example"></select>
                    </div> -->
                    <!-- <div class="col">
                        <label for="catagory" class="form-label">Catagory: </label>
                        <select id="catagory" class="form-select" aria-label="Default select example"></select>
                    </div> -->
                </div>
            </div>
        </div>

        <div id="newsFeed" class="row row-cols-2 mt-3">
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-popRpmFF9JQgExhfw5tZT4I9/CI5e2QcuUZPOVXb1m7qUmeR2b50u+YFEYe1wgzy" crossorigin="anonymous"></script>

    <script src="assets/js/extra/countrycodes.js"></script>
    <script src="assets/js/index/script.js"></script>
</body>

</html>
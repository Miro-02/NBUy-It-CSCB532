<?php

// routes/api.php
Route::middleware('auth0.authenticate')->group(function () {
    // Your protected routes here
});
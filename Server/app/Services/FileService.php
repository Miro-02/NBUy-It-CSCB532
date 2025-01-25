<?php

namespace App\Services;

use App\Models\File;

class FileService
{
    public function storeFile($path, $originalName)
    {
        return File::create([
            'path' => $path,
            'original_name' => $originalName,
        ]);
    }

    public function getFile($id)
    {
        return File::findOrFail($id);
    }
}

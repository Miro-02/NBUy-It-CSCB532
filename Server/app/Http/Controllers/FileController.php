<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileRequest;
use App\Http\Resources\FileResource;
use App\Services\FileService;
use Illuminate\Http\Request;

class FileController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function store(FileRequest $request)
    {
        $file = $this->fileService->storeFile(
            $request->file('file')->store('files'),
            $request->file('file')->getClientOriginalName()
        );

        return new FileResource($file);
    }

    public function show($id)
    {
        $file = $this->fileService->getFile($id);

        return new FileResource($file);
    }
}

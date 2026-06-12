<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;

class BranchController extends Controller
{
    public function index()
    {
        return Branch::where('is_active', true)
            ->orderBy('name')
            ->get();
    }
}

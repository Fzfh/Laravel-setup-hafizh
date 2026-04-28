<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shift;

class ScannerController extends Controller
{
    public function scans(){
        $result = Shift::all()->contains('is_active', true);

        return Inertia::render('/Scanner/Scan', compact('result'));
    }
}

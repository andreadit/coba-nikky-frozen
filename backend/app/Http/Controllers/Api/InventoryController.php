<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inventory::with(['product.category', 'branch'])
            ->orderBy('branch_id')
            ->orderBy('product_id')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'branch_id' => ['required', 'exists:branches,id'],
            'stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['required', 'integer', 'min:0'],
            'maximum_stock' => ['nullable', 'integer', 'min:0'],
        ]);

        return Inventory::create($data)->load(['product.category', 'branch']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inventory::with(['product.category', 'branch'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $data = $request->validate([
            'stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['required', 'integer', 'min:0'],
            'maximum_stock' => ['nullable', 'integer', 'min:0'],
        ]);

        $inventory->update($data);

        return $inventory->load(['product.category', 'branch']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Inventory::findOrFail($id)->delete();

        return response()->noContent();
    }
}

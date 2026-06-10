<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with(['category', 'inventories.branch'])
            ->latest()
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'sku' => ['required', 'string', 'max:255', 'unique:products,sku'],
            'name' => ['required', 'string', 'max:255'],
            'unit' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'cost' => ['nullable', 'integer', 'min:0'],
            'expiry_date' => ['nullable', 'date'],
            'image' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        return Product::create($data)->load(['category', 'inventories.branch']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::with(['category', 'inventories.branch'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'sku' => ['required', 'string', 'max:255', Rule::unique('products', 'sku')->ignore($product->id)],
            'name' => ['required', 'string', 'max:255'],
            'unit' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'cost' => ['nullable', 'integer', 'min:0'],
            'expiry_date' => ['nullable', 'date'],
            'image' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $product->update($data);

        return $product->load(['category', 'inventories.branch']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Product::findOrFail($id)->delete();

        return response()->noContent();
    }
}

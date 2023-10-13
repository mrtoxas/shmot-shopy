<?php

namespace App\Http\Controllers;

use App\Models\Landing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LandingController2 extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:landings|min:3|max:50',
            'clone' => 'nullable|string',
        ],
        [
            'name.required' => 'Поле "Назва" обов\'язкове!',
            'name.unique' => 'Сайт с такою назвою вже існує!',
            'name.min' => 'Занадто коротка назва! Мiнiмум 3 символи.',
            'name.max' => 'Занадто довга назва! Максимум 50 символiв.',
        ]);

        try {
            $landing = Landing::create([
                'name' => $request->input('name'),
                'created_by' => Auth::user()->id,
            ]);

            return redirect()->route('landings.index')->with('success', 'Лэндинг успешно создан');
        } catch (Exception $e) {
            return back()->with('error', 'Произошла ошибка при создании лэндинга: ' . $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Landing $landing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Landing $landing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Landing $landing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Landing $landing)
    {
        //
    }
}

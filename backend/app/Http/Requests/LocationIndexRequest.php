<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
            'name' => 'nullable|string|max:255',
            'code' => 'nullable|string|max:10',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }
     public function sanitize()
    {
        $this->merge([
            'name' => trim($this->input('name', '')),
            'code' => strtoupper(trim($this->input('code', ''))),
        ]);
    }

    protected function prepareForValidation()
    {
        $this->sanitize();
    }
}

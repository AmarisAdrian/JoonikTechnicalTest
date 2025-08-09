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

    public function sanitize(): void
    {
        $this->merge([
            'name' => $this->sanitizeString($this->input('name', '')),
            'code' => $this->sanitizeString($this->input('code', '')),
        ]);
    }

    private function sanitizeString(mixed $value): string
    {
        if (is_scalar($value)) {
            return trim((string) $value);
        }
        return '';
    }

    protected function prepareForValidation()
    {
        $this->sanitize();
    }
}

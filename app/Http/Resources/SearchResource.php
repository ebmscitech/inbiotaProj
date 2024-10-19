<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array
    {
        return [
            'BA_Name' => $this['BA_Name'] ?? null,
            'BA_Details' => $this['BA_Details'] ?? null,
            'BA_ref' => $this['BA_ref'] ?? null,
            'bioTan' => $this['bioTan'] ?? null,
            'bioPhy' => $this['bioPhy'] ?? null,
        ];
    }
}

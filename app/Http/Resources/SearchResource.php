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
            'id' => $this['id'] ?? null,
            'BA_Name' => $this['BA_Name'] ?? null,
            'BA_Details' => $this['BA_Details'] ?? null,
            'BA_ref' => $this['BA_ref'] ?? null,
            'bioTan' => is_array($this->resource['bioTan']) ? array_map(function ($item) {
                return [
                    'idTan' => $item['idTan'] ?? null,
                    'Plant_Name' => $item['Plant_Name'] ?? null,
                ];
            }, $this->resource['bioTan']) : null,
            'bioPhy' => is_array($this->resource['bioPhy']) ? array_map(function ($item) {
                return [
                    'idSnyw' => $item['idSnyw'] ?? null,
                    'Phytochemical' => $item['Phytochemical'] ?? null,
                ];
            }, $this->resource['bioPhy']) : null,

        ];
    }
}

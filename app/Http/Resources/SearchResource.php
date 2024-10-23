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
            'bioTan' => [
                'idTan' => $this->bioTan['idTan'] ?? null,
                'Plant_Name' => $this->bioTan['Plant_Name'] ?? null,
            ],
            'bioPhy' => [
                'idPhy' => $this->bioPhy['idPhy'] ?? null,
                'phytochemical' => $this->bioPhy['phytochemical'] ?? null,
            ]
        ];
    }
}

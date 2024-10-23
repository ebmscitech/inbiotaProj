<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class phytochemicalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this['id'] ?? null,
            'Phytochemical' => $this['Phytochemical'] ?? null,
            'compoundClass' => $this['compoundClass'] ?? null,
            'Chemical_Formula' => $this['Chemical_Formula'] ?? null,
            'Molecular_Mass' => $this['Molecular_Mass'] ?? null,
            'IUPAC_Name' => $this['IUPAC_Name'] ?? null,
            'SynonymZ' => $this['SynonymZ'] ?? null,
            'phyTan' => is_array($this->resource['phyTan']) ? array_map(function ($item) {
                return [
                    'idTan' => $item['idTan'] ?? null,
                    'Plant_Name' => $item['Plant_Name'] ?? null,
                ];
            }, $this->resource['phyTan']) : null,

            'phyBio' => is_array($this->resource['phyBio']) ? array_map(function ($item) {
                return [
                    'idBio' => $item['idBio'] ?? null,
                    'BA_Name' => $item['BA_Name'] ?? null,
                ];
            }, $this->resource['phyBio']) : null,
        ];
    }
}

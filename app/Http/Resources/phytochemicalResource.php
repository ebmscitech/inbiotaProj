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
            'Phytochemical' => $this['Phytochemical'] ?? null,
            'compoundClass' => $this['compoundClass'] ?? null,
            'Chemical_Formula' => $this['Chemical_Formula'] ?? null,
            'Molecular_Mass' => $this['Molecular_Mass'] ?? null,
            'IUPAC_Name' => $this['IUPAC_Name'] ?? null,
            'SynonymZ' => $this['SynonymZ'] ?? null,
            'phyTan' => $this ['phyTan'] ?? null,
            'phyBio' => $this ['phyBio'] ?? null,
        ];
    }
}

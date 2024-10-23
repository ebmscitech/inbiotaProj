<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class tanamanResource extends JsonResource
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
            'Plant_Name' => $this['Plant_Name'] ?? null,
            'id' => $this['id'] ?? null,
            'Local_Name' => $this['Local_Name'] ?? null,
            'English_Name' => $this['English_Name'] ?? null,
            'Kingdom' => $this['Kingdom'] ?? null,
            'SubKingdom' => $this['SubKingdom'] ?? null,
            'Infrakingdom' => $this['Infrakingdom'] ?? null,
            'Superdivision' => $this['Superdivision'] ?? null,
            'Class' => $this['Class'] ?? null,
            'Superorder' => $this['Superorder'] ?? null,
            'Order' => $this['Order'] ?? null,
            'Family' => $this['Family'] ?? null,
            'Genus' => $this['Genus'] ?? null,
            'Species' => $this['Species'] ?? null,
            'Synonym' => $this['Synonym'] ?? null,
            'Geographical_Distribution' => $this['Geographical_Distribution'] ?? null,
            'Traditional_Uses' => $this['Traditional_Uses'] ?? null,
            'Reference' => $this['Reference'] ?? null,
            'Phytochemicals' => [
                'id' => $this->Phytochemical['id'] ?? null, // Mengambil ID dari model atau null jika tidak ada
                'phytochemical' => $this->Phytochemical['value'] ?? null, // Mengambil nilai dari model atau null jika tidak ada
            ],
            'Bioactivities' => [
                'id' => $this->BA_Name['id'] ?? null, // Mengambil ID dari model atau null jika tidak ada
                'BA_Name' => $this->BA_Name['value'] ?? null, // Mengambil nilai dari model atau null jika tidak ada
            ],
        ];
    }
}

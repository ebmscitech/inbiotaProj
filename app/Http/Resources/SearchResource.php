<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SearchResource extends JsonResource
{
    //Untuk mode pencarian
    protected $mode;

    public function __construct($resource, $mode = 'field')
    {
        //Call parent constructor
        parent::__construct($resource);
        $this->mode = $mode;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        switch ($this->mode){
            case 'tanamanSearch':
                return [
                    'Plant_Name' => $this->Plant_Name,
                    'Local_Name' => $this->Local_Name,
                    'English_Name' => $this->English_Name,
                    'Kingdom' => $this->Kingdom,
                    'SubKingdom' => $this->SubKingdom,
                    'Infrakingdom' => $this->Infrakingdom,
                    'Superdivision' => $this->Superdivision,
                    'Class' => $this->Class,
                    'Superorder' => $this->Superorder,
                    'Order' => $this->Order,
                    'Family' => $this->Family,
                    'Genus' => $this->Genus,
                    'Species' => $this->Species,
                    'Synonym' => $this->Synonym,
                    'Geographical_Distribution' => $this->Geographical_Distribution,
                    'Traditional_Uses' => $this->Traditional_Uses,
                    'Reference' => $this->Reference,
                    'tanPhy' => $this->Phytochemical,
                    'tanBio' => $this->BA_Name
                ];
            case 'phytoSearch':
                return [
                    'Phytochemical' => $this->phytoName,
                    'compoundClass' => $this->compoundClass,
                    'Chemical_Formula' => $this->Chemical_Formula,
                    'Molecular_Mass' => $this->Molecular_Mass,
                    'IUPAC_Name' => $this->IUPAC_Name,
                    'SynonymZ' => $this->SynonymZ,
                    'phyTan' => $this ->phyTan,
                    'phyBio' => $this ->phyBio,
                ];
            case 'bioSearch':
                return [
                    'BA_Name' => $this->bioName,
                    'BA_Details' => $this->bioDetail,
                    'BA_ref' => $this->bioRef,
                    'bioTan' => $this->bioTan,
                    'bioPhy' => $this->bioPhy,
                ];
        }
        return [
            ''
        ]
    }
}

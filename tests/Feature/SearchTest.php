<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SearchTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testParamSuccess()
    {
        $response = $this->getJson('/api/search/parameter', [
            'parameter' => 'searchBy'
        ]);

        $response->dump();

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    ['result' => 'Bioactivity'],
                    ['result' => 'Plants'],
                    ['result' => 'Substances']
                ]
            ]
        ]);
    }

    public function testParamAttributeBioSuccess(){
        $response = $this->getJson('/api/search/parameter', [
            'parameter' => 'Bioactivity'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    ['result' => 'BA_ref'],
                    ['result' => 'BA_Details'],
                    ['result' => 'Pythochemical'],
                    ['result' => 'Plant_Name'],
                    ['result' => 'All Attributes'],
                ]
            ]
        ]);

    }

    public function testParamAttributePlantSuccess(){
        $response = $this->getJson('/api/search/parameter', [
            'parameter' => 'Plants'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    ['result' => 'Local_Name'],
                    ['result' => 'English_Name'],
                    ['result' => 'Kingdom'],
                    ['result' => 'SubKingdom'],
                    ['result' => 'Infrakingdom'],
                    ['result' => 'Superdivision'],
                    ['result' => 'Class'],
                    ['result' => 'Order'],
                    ['result' => 'Superorder'],
                    ['result' => 'Family'],
                    ['result' => 'Genus'],
                    ['result' => 'Species'],
                    ['result' => 'Synonym'],
                    ['result' => 'Geographical_Distribution'],
                    ['result' => 'Traditional_Uses'],
                    ['result' => 'BaTanRelated'],
                    ['result' => 'BA_Name'],
                    ['result' => 'Pythochemical'],
                    ['result' => 'All Attributes'],
                ]
            ]
        ]);
    }

    public function testParamAttributeSubsSuccess(){
        $response = $this->getJson('/api/search/parameter', [
            'parameter' => 'Substances'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    ['result' => 'Phytochemical'],
                    ['result' => 'compoundClass'],
                    ['result' => 'CAS_Number'],
                    ['result' => 'Chemical_Formula'],
                    ['result' => 'Molecular_Mass'],
                    ['result' => 'IUPAC_Name'],
                    ['result' => 'SynonymZ'],
                    ['result' => 'BA_Name'],
                    ['result' => 'Plant_Name'],
                    ['result' => 'All Attributes'],
                ]
            ]
        ]);
    }

    public function testParamInvalid(){
        $response = $this->getJson('/api/search/parameter', [
            'parameter' => 'testing'
        ]);

        $response->dump();
        $response->assertStatus(403);
        $response->assertJson([
            'errors' => [
                'message' => 'Error: Invalid parameter.'
            ]
        ]);
    }

    public function testSearchResultPlant(){
        $response = $this->getJson('/api/search/search?attribute=All&orderBy=plant&search=0');
        $expectedData =
                [
                    'Plant_Name' => '[value-2]',
                    'id'=>'6',
                    'Local_Name' => '[value-3]',
                    'English_Name' => '[value-4]',
                    'Kingdom' => '[value-5]',
                    'SubKingdom' => '[value-6]',
                    'Infrakingdom' => '[value-7]',
                    'Superdivision' => '[value-8]',
                    'Class' => '[value-9]',
                    'Superorder' => '[value-11]',
                    'Order' => '[value-10]',
                    'Family' => '[value-12]',
                    'Genus' => '[value-13]',
                    'Species' => '[value-14]',
                    'Synonym' => '[value-15]',
                    'Geographical_Distribution' => '[value-16]',
                    'Traditional_Uses' => '[value-17]',
                    'Reference' => '[value-19]',
                    'Phytochemicals' => [[
                        'idSnyw' => 5,
                        'Phytochemicals' => '[value-2]',
                    ]],
                    'Bioactivities' => [[
                        'idBio' => 8,
                        'BA_Name' => 'Anti Helmintics',
                    ]],
        ];

        $response->dump();
        $response->assertJson([
            'data' => [
                $expectedData
            ]
        ]);
        $response->assertStatus(200);
    }

    public function testSearchResultPhytochemical(){
        $response = $this->getJson('/api/search/search?attribute=All&orderBy=phytochemical&search=0');
        $expectedData = [
            'Phytochemical' => '[value-2]',
            'id' => 5,
            'compoundClass' => '[value-3]',
            'Chemical_Formula' => '[value-5]',
            'Molecular_Mass' => 0,
            'IUPAC_Name' => '[value-7]',
            'SynonymZ' => '[value-8]',
            'phyTan' => [
                [
                    'idTan' => 6,
                    'Plant_Name' => '[value-2]',
                ]
            ],
            'phyBio' => [
                [
                    'idBio' => 8,
                    'BA_Name' => 'Anti Helmintics',
                ]
            ],
        ];

        $response->dump();
        $response->assertJson([
            'data' => [
                $expectedData
            ]
        ]);
        $response->assertStatus(200);
    }

    public function testSearchResultBio(){
        $response = $this->getJson('/api/search/search?attribute=All&orderBy=bioactivities&search=h');
        $expectedData =
            [
                'BA_Name' => 'Anti Helmintics',
                'BA_Details' => 'Cacing',
                'BA_ref' => 'hnjoui',
                'id' => '8',
                'bioTan' => [
                    [
                        'idTan' => '6',
                        'Plant_Name' => '[value-2]'
                    ]
                ],
                'bioPhy' => [
                    [
                        'idSnyw' => '5',
                        'Phytochemical' => '[value-2]'
                    ]
                ],
            ];

        $response->dump();
        $response->assertJson([
            'data' => [
                $expectedData
            ]
        ]);
        $response->assertStatus(200);
    }
}

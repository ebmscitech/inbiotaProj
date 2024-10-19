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
        $response = $this->getJson('/api/search/parameters', [
            'parameter' => 'searchBy'
        ]);

        $response->dump();

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    'Bioactivity', 'Plants', 'Substances'
                ]
            ]
        ]);
    }

    public function testParamAttributeBioSuccess(){
        $response = $this->getJson('/api/search/parameters', [
            'parameter' => 'Bioactivity'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    'BA_ref', 'BA_Details', 'Pythochemical', 'Plant_Name', 'All Attributes'
                ]
            ]
        ]);
    }

    public function testParamAttributePlantSuccess(){
        $response = $this->getJson('/api/search/parameters', [
            'parameter' => 'Plants'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    'Local_Name', 'English_Name', 'Kingdom', 'SubKingdom', 'Infrakingdom', 'Superdivision', 'Class', 'Order', 'Superorder', 'Family', 'Genus', 'Species', 'Synonym', 'Geographical_Distribution', 'Traditional_Uses', 'BaTanRelated', 'BA_Name', 'Pythochemical', 'All Attributes'
                ]
            ]
        ]);
    }

    public function testParamAttributeSubsSuccess(){
        $response = $this->getJson('/api/search/parameters', [
            'parameter' => 'Substances'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    'Phytochemical', 'compoundClass', 'CAS_Number', 'Chemical_Formula', 'Molecular_Mass', 'IUPAC_Name', 'SynonymZ', 'BA_Name', 'Plant_Name', 'All Attributes'
                ]
            ]
        ]);
    }

    public function testParamInvalid(){
        $response = $this->getJson('/api/search/parameters', [
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
                    'Phytochemical' => null,
                    'BA_Name' => null,
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
        $expectedData =
            [
                'Phytochemical' => '[value-2]',
                'compoundClass' => '[value-3]',
                'Chemical_Formula' => '[value-5]',
                'Molecular_Mass' => 0,
                'IUPAC_Name' => '[value-7]',
                'SynonymZ' => '[value-8]',
                'phyTan' => [
                    '6' => '[value-2]',
                ],
                'phyBio' => [
                    '8' => 'Anti Helmintics',
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
                'bioTan' => [
                    '6' => '[value-2]'
                ],
                'bioPhy' => [
                    '5' => '[value-2]'
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

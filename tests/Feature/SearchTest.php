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
}

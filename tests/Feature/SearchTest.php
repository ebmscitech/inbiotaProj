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
                    'All Attributes', 'Details', 'References', 'Plant Related', 'Photochemical Related'
                ]
            ]
        ]);
    }

    public function testParamAttributePlantSuccess(){
        $response = $this->getJson('/api/search/parameters', [
            'parameter' => 'Plant'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    'All Attributes', 'Local Name', 'English Name', 'Kingdom', 'Sub Kingdom', 'Infrakingdom', 'Superdivision', 'Class', 'Superorder', 'Order', 'Family', 'Genus', 'Species', 'Traditional Uses', 'Synonym', 'Bioactivity Related', 'Phytochemical Related'
                ]
            ]
        ]);
    }

    public function testParamAttributeSubsSuccess(){
        $response = $this->getJson('/api/search/parameters', [
            'parameter' => 'Phytochemical'
        ]);

        $response->dump();
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'results' => [
                    'All Attributes', 'Compound Class', 'Chemical Formula', 'Molecular Mass', 'IUPAC Name', 'Synonym', 'Plant Related', 'Bioactivitie Related', 'CAS Number'
                ]
            ]
        ]);
    }
}

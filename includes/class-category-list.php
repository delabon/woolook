<?php

namespace Woolook;

class CategoryList{

    private $atts;

    /**
     * Constructor
     *
     * @param array $atts
     */
    function __construct( $atts ){
        $this->atts = $atts; // sanitize this if you are going to use it later
    }

	/**
	 * Get Category List
	 *
	 * @param array $request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_items() {

		$taxonomy = 'product_cat';
        $categoryHierarchy = array();        
        $query_result = get_terms( array(
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
        ) );
        
        $this->sort_terms_hierarchicaly( $query_result, $categoryHierarchy );
        return $this->sort_terms_for_response( $categoryHierarchy, 0 );
	}

    /**
     * Recursively sort an array of taxonomy terms hierarchically. Child categories will be
     * placed under a 'children' member of their parent term.
     * @param Array   $cats     taxonomy term objects to sort
     * @param Array   $into     result array to put them in
     * @param integer $parentId the current parent ID to put them in
     */
    private function sort_terms_hierarchicaly( Array &$cats, Array &$into, $parentId = 0 ){
        foreach ($cats as $i => $cat) {
            if ($cat->parent == $parentId) {
                $into[$cat->term_id] = $cat;
                unset($cats[$i]);
            }
        }

        foreach ($into as $topCat) {
            $topCat->children = array();
            $this->sort_terms_hierarchicaly($cats, $topCat->children, $topCat->term_id);
        }
    }

    /**
     * Recursively sort an array of taxonomy terms hierarchically.
     * @param Array   $cats     taxonomy term objects to sort
     * @param int   $depth     result array to put them in
     */
    private function sort_terms_for_response( $cats, $depth ){

        $response = array();

        foreach ( $cats as $term ) {

            $termArr = $term->to_array();
            $termArr['id'] = $term->term_id;
            $termArr['depth'] = $depth;
            $response[] = $termArr; // added

            if( count( $term->children ) ){
                $response = array_merge( $response, $this->sort_terms_for_response( $term->children, $depth + 1 ) );
            }
        }

        return $response;
    }

}

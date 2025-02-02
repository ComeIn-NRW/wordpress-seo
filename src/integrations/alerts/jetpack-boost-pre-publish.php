<?php

namespace Yoast\WP\SEO\Integrations\Alerts;

use Yoast\WP\SEO\Conditionals\Jetpack_Boost_Not_Premium_Conditional;

/**
 * Jetpack_Boost_Pre_Publish class.
 */
class Jetpack_Boost_Pre_Publish extends Abstract_Dismissable_Alert {

	/**
	 * Holds the alert identifier.
	 *
	 * @var string
	 */
	protected $alert_identifier = 'get-jetpack-boost-pre-publish-notification';

	/**
	 * {@inheritDoc}
	 */
	public static function get_conditionals() {
		return [ Jetpack_Boost_Not_Premium_Conditional::class ];
	}
}

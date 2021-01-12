<?php

namespace Drupal\siddybot\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for siddybot routes.
 */
class SiddybotController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function build() {

    /*
    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!'),
    ];*/

    $build['content'] = [
      '#theme' => 'siddybot_template',
      '#botname' => 'Siddybot'
    ];

    return $build;
  }

}

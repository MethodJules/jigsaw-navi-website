<?php

namespace Drupal\chat_widget\Controller;

use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ChatWidgetController extends ControllerBase {


    public function content() {
        global $base_url;
        $config = $this->config('chat_widget.settings');
        $rasa_bot_url = $config->get('rasa_bot_url');
        //return ['#markup' => 'Chat Widget ...'];
        return [
            '#theme' => 'chat_widget',
            '#body' => 'olll',
            '#attached' => [
                'drupalSettings' => [
                    'baseUrl' => $base_url,
                    'rasaBotUrl' => $rasa_bot_url,
                    'senderId' => $this->randomString(),
                ]
            ],

        ];
    }

    public function log(Request $request) {
        
        $post_data = json_decode($request->getContent(), TRUE);

        Drupal::logger('chat_widget')->notice($post_data['sender']);
        Drupal::logger('chat_widget,')->notice($post_data['message']);
        //dsm($post_data);
        return new JsonResponse($post_data);
    }

    public function randomString($length = 8) {
        $str = "";
        $characters = array_merge(range('A','Z'), range('0','9'));
        $max = count($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $rand = mt_rand(0, $max);
            $str .= $characters[$rand];
        }
        return $str;
    }
}
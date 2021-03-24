<?php

namespace Drupal\chat_widget\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class ChatWidgetForm extends FormBase {

    public function getFormId()
    {
        return 'chat_widget_form';
    }

    public function buildForm(array $form, FormStateInterface $form_state)
    {
        global $base_url;
        $form['#theme'] = 'chat_widget_form';
        $form['#attached']['library'][] = 'chat_widget/chat_widget_form';
        
        $form['user_input'] = [
            '#type' => 'textfield',
            '#title' => '',
            
        ];

        $form['submit'] = [
            '#type' => 'submit',
            '#value' => $this->t('Send'),
        ];

        return $form;
    }

    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        
    }
}
<?php

namespace Drupal\chat_widget\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class ChatWidgetAdministrationForm extends ConfigFormBase {

    protected function getEditableConfigNames()
    {
        return ['chat_widget.settings'];
    }

    public function getFormId()
    {
        return 'chat_widget_administration_form';
    }

    public function buildForm(array $form, FormStateInterface $form_state)
    {
        $config = $this->config('chat_widget.settings');
        $form['chat_widget_administration_form']['rasa_bot_url'] = [
            '#type' => 'textfield',
            '#description' => $this->t('Please insert here the URL of your RASA Bot'),
            '#required' => TRUE,
            '#default_value' => $config->get('rasa_bot_url'),
        ];

        $form['chat_widget_administration_form']['submit'] = [
            '#type' => 'submit',
            '#value' => $this->t('Submit'),
        ];

        return $form;
    }

    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        $this->config('chat_widget.settings')->set('rasa_bot_url', $form_state->getValue('rasa_bot_url'))->save();
    }
}

import React from 'react';
import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import isValidHttpUrl from 'modules/isValidHttpUrl';
import styles from './styles.module.css';

enum FormState {
  New = 'NEW',
  Submitting = 'SUBMITTING',
  Submitted = 'SUBMITTED',
}

type Props = {
  onSubmit: (value: string) => unknown;
};

const ShortenUrlForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [submitState, setSubmitState] = useState(FormState.New);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSubmitState(FormState.New);
    setInputValue(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidHttpUrl(inputValue)) {
      setSubmitState(FormState.Submitted);
      return;
    }
    setSubmitState(FormState.Submitting);
    await onSubmit(inputValue);
    setSubmitState(FormState.Submitted);
  }

  return (
    <Form noValidate onSubmit={handleSubmit} className="w-100">
      <InputGroup size="lg" hasValidation>
        <Form.Control
          type="url"
          name="shorten"
          placeholder="e.g. https://www.google.com"
          value={inputValue}
          onChange={handleChange}
          isInvalid={
            submitState === FormState.Submitted && !isValidHttpUrl(inputValue)
          }
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            type="submit"
            disabled={submitState === FormState.Submitting}
          >
            Shorten
          </Button>
        </InputGroup.Append>
        <Form.Control.Feedback
          className={styles.invalidFeedback}
          type="invalid"
        >
          Please enter a valid http URL
        </Form.Control.Feedback>
      </InputGroup>
    </Form>
  );
};

export default ShortenUrlForm;

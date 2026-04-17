"use client";

import { Button, Form, FormControl } from "react-bootstrap";
import { defaultChoice, QUESTION_TYPES } from "./utils";

export default function QuestionEditor({
  question,
  onChange,
  onCancel,
  onSave,
}: {
  question: any;
  onChange: (question: any) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const setQuestion = (updates: any) => onChange({ ...question, ...updates });

  const updateChoice = (choiceId: string, updates: any) => {
    setQuestion({
      choices: (question.choices || []).map((choice: any) =>
        choice._id === choiceId ? { ...choice, ...updates } : choice
      ),
    });
  };

  const setCorrectChoice = (choiceId: string) => {
    setQuestion({
      choices: (question.choices || []).map((choice: any) => ({
        ...choice,
        correct: choice._id === choiceId,
      })),
    });
  };

  return (
    <div className="border rounded p-3 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Question Editor</h5>
        <Form.Select
          style={{ width: 220 }}
          value={question.type}
          onChange={(e) =>
            setQuestion({
              type: e.target.value,
              choices:
                e.target.value === "MULTIPLE_CHOICE"
                  ? [defaultChoice(0), defaultChoice(1)]
                  : [],
              trueFalseAnswer: true,
              blankAnswers: e.target.value === "FILL_IN_THE_BLANK" ? [""] : [],
            })
          }
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Form.Select>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={question.title}
          onChange={(e) => setQuestion({ title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={question.points}
          onChange={(e) => setQuestion({ points: Number(e.target.value) })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <FormControl
          as="textarea"
          rows={4}
          value={question.questionText}
          onChange={(e) => setQuestion({ questionText: e.target.value })}
        />
      </Form.Group>

      {question.type === "MULTIPLE_CHOICE" && (
        <div className="mb-3">
          <Form.Label>Choices</Form.Label>
          {(question.choices || []).map((choice: any, index: number) => (
            <div key={choice._id} className="d-flex gap-2 align-items-center mb-2">
              <Form.Check
                type="radio"
                name={`correct-${question._id}`}
                checked={Boolean(choice.correct)}
                onChange={() => setCorrectChoice(choice._id)}
              />
              <Form.Control
                value={choice.text}
                placeholder={`Choice ${index + 1}`}
                onChange={(e) => updateChoice(choice._id, { text: e.target.value })}
              />
              <Button
                variant="outline-danger"
                onClick={() =>
                  setQuestion({
                    choices: (question.choices || []).filter(
                      (currentChoice: any) => currentChoice._id !== choice._id
                    ),
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline-secondary"
            onClick={() =>
              setQuestion({
                choices: [...(question.choices || []), defaultChoice(question.choices.length)],
              })
            }
          >
            Add Choice
          </Button>
        </div>
      )}

      {question.type === "TRUE_FALSE" && (
        <div className="mb-3">
          <Form.Label>Correct Answer</Form.Label>
          <div className="d-flex gap-3">
            <Form.Check
              type="radio"
              label="True"
              name={`true-false-${question._id}`}
              checked={Boolean(question.trueFalseAnswer)}
              onChange={() => setQuestion({ trueFalseAnswer: true })}
            />
            <Form.Check
              type="radio"
              label="False"
              name={`true-false-${question._id}`}
              checked={!question.trueFalseAnswer}
              onChange={() => setQuestion({ trueFalseAnswer: false })}
            />
          </div>
        </div>
      )}

      {question.type === "FILL_IN_THE_BLANK" && (
        <div className="mb-3">
          <Form.Label>Accepted Answers</Form.Label>
          {(question.blankAnswers || []).map((answer: string, index: number) => (
            <div key={`${question._id}-blank-${index}`} className="d-flex gap-2 mb-2">
              <Form.Control
                value={answer}
                placeholder={`Answer ${index + 1}`}
                onChange={(e) =>
                  setQuestion({
                    blankAnswers: (question.blankAnswers || []).map(
                      (currentAnswer: string, currentIndex: number) =>
                        currentIndex === index ? e.target.value : currentAnswer
                    ),
                  })
                }
              />
              <Button
                variant="outline-danger"
                onClick={() =>
                  setQuestion({
                    blankAnswers: (question.blankAnswers || []).filter(
                      (_: string, currentIndex: number) => currentIndex !== index
                    ),
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline-secondary"
            onClick={() =>
              setQuestion({
                blankAnswers: [...(question.blankAnswers || []), ""],
              })
            }
          >
            Add Accepted Answer
          </Button>
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save / Update Question
        </Button>
      </div>
    </div>
  );
}

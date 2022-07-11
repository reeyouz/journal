import type { NextPage } from "next";
import { FormEventHandler } from "react";
import { Button, ProtectedIcon } from "../components";
import { useHomeForm } from "../hooks";

const Home: NextPage = () => {
  const { state, onContentChange, createJournalEntry } = useHomeForm();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createJournalEntry();
  };

  const getClassNames = (mode: 1 | 2) => {
    let classNames = ["block"];

    classNames.push(mode === 1 ? "positive" : "negative");

    if (state.isSuccess) {
      classNames.push(mode === 1 ? "animate-expand" : "animate-contract");
    }

    return classNames.join(" ");
  };

  const getWidth = (mode: 1 | 2) => {
    return mode === 1
      ? `${100 - state.content.length / 2}%`
      : `${state.content.length / 2}%`;
  };

  return (
    <form onSubmit={onSubmit} className="journal-form">
      <header>
        <div className={getClassNames(1)} style={{ width: getWidth(1) }}>
          <TextOnly fill="var(--blue)" />
        </div>
        <div className={getClassNames(2)} style={{ width: getWidth(2) }}>
          <TextOnly fill="var(--white)" />
        </div>
      </header>
      <textarea
        disabled={state.isFormDisabled}
        name="content"
        id="content"
        minLength={1}
        maxLength={200}
        value={state.content}
        onChange={onContentChange}
      />
      <Button
        isDisabled={state.isFormDisabled}
        isSuccess={state.isSuccess}
        isError={state.isError}
        isLoading={state.isLoading}
      />
    </form>
  );
};

const TextOnly: NextPage<{ fill: string }> = (props) => {
  return (
    <div className="text-only">
      <span>J</span>
      <ProtectedIcon fill={props.fill} dimension="1em" />
      <span>U</span>
      <span>R</span>
      <span>N</span>
      <span>A</span>
      <span>L</span>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import { FormEventHandler } from "react";
import { Button, ProtectedIcon } from "../components";
import { useHomeForm } from "../hooks";
import styles from "../styles/Home.module.css";

export const Home: NextPage = () => {
  const { state, onContentChange, createJournalEntry } = useHomeForm();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    createJournalEntry();
  };

  return (
    <form onSubmit={onSubmit} className={styles["journal-form"]}>
      <header>
        <div>
          <span>J</span>
          <ProtectedIcon dimension="25px" />
          <span>U</span>
          <span>R</span>
          <span>N</span>
          <span>A</span>
          <span>L</span>
        </div>
        <div>
          <span>{200 - state.content.length}</span>
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

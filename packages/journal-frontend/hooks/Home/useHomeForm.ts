import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { IJournalEntry } from "./journal.types";

const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const LOADING = "LOADING";
const INITIAL = "INITIAL";

type DataFetchingStatus =
  | typeof INITIAL
  | typeof LOADING
  | typeof ERROR
  | typeof SUCCESS;

export function useHomeForm(
  initialContent = "",
  initialDataFetchingStatus: DataFetchingStatus = INITIAL,
  initialFormDisabledState = false
) {
  const [content, setContent] = useState(initialContent);
  const [dataFetchingStatus, setDataFetchingStatus] =
    useState<DataFetchingStatus>(initialDataFetchingStatus);
  const [isFormDisabled, setFormDisabledStatus] = useState(
    initialFormDisabledState
  );

  const createJournalEntry = async () => {
    setFormDisabledStatus(true);
    setDataFetchingStatus(LOADING);

    try {
      await axios.post<void, void, IJournalEntry>(
        "http://localhost:5000/journal-entries",
        {
          content,
          createdOn: new Date(),
        },
        {
          timeout: 5000,
        }
      );
      setDataFetchingStatus(SUCCESS);
    } catch (error) {
      setDataFetchingStatus(ERROR);
    } finally {
      setTimeout(() => {
        setContent(initialContent);
        setDataFetchingStatus(initialDataFetchingStatus);
        setFormDisabledStatus(initialFormDisabledState);
      }, 2000);
    }
  };

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  return {
    state: {
      content,
      isLoading: dataFetchingStatus === LOADING,
      isError: dataFetchingStatus === ERROR,
      isSuccess: dataFetchingStatus === SUCCESS,
      isFormDisabled,
    },
    createJournalEntry,
    onContentChange,
  };
}

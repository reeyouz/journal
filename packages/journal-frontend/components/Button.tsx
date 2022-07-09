import { NextPage } from "next/types";
import { ProtectedIcon } from ".";
import { ErrorIcon, LoadingIcon, SubmitIcon, SuccessIcon } from "./SVG";

interface ButtonProps {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isDisabled?: boolean;
}
export const Button: NextPage<ButtonProps> = (props) => {
  const { isError, isLoading, isSuccess, isDisabled = false } = props;

  return (
    <button disabled={isDisabled}>
      {isError ? (
        <ErrorIcon dimension="30px" />
      ) : isLoading ? (
        <LoadingIcon dimension="30px" />
      ) : isSuccess ? (
        <SuccessIcon dimension="30px" />
      ) : (
        <SubmitIcon dimension="30px" />
      )}
    </button>
  );
};

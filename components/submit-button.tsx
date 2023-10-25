import { FaPaperPlane } from "react-icons/fa";

import { Button } from "@chakra-ui/react";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface SubmitButtonProps {
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant='outline'
      className="font-semibold dark:bg-zinc-300 dark:hover:bg-zinc-100
      transition duration-200 bg-zinc-900 hover:bg-zinc-700 mt-1.5
      text-zinc-100 dark:text-zinc-900 py-6 flex items-center gap-1
      disabled:opacity-75 disabled:hover:bg-zinc-700
      dark:disabled:opacity-40"
      isDisabled={disabled || pending}
    >
      {pending ? (
        <div
          className="h-4 w-4 animate-spin rounded-full 
          border-b-2 border-zinc-100 dark:border-zinc-900"
        />
      ) : (
        <>
          Submit
          <FaPaperPlane 
            size={15}
          />
        </>
      )}
    </Button>
  )
}

export default SubmitButton;
'use client';

import { useState } from "react";

import { FaPaperPlane } from 'react-icons/fa';

import { motion } from 'framer-motion';

import { sendEmail } from "@/actions/send-email";

import { 
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel, 
  Input, 
  Textarea 
} from "@chakra-ui/react";

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const initialState = { values: initialValues };

const Contact = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isSubjectTouched, setIsSubjectTouched] = useState(false);
  const [isMessageTouched, setIsMessageTouched] = useState(false);

  const { values } = state;

  const onNameBlur = ({ target }: { target: any }) => 
  setIsNameTouched((prev) => ({
    ...prev as any,
    [target.name]: true
  }));

  const onEmailBlur = ({ target }: { target: any }) => 
  setIsEmailTouched((prev) => ({
    ...prev as any,
    [target.name]: true
  }));
  
  const onSubjectBlur = ({ target }: { target: any }) => 
  setIsSubjectTouched((prev) => ({
    ...prev as any,
    [target.name]: true
  }));

  const onMessageBlur = ({ target }: { target: any }) => 
  setIsMessageTouched((prev) => ({
    ...prev as any,
    [target.name]: true
  }));

  const handleChange = ({ target }: { target: any }) => 
  setState((prevState) => ({
    ...prevState,
    values: {
      ...prevState.values,
      [target.name]: target.value
    }
  }));

  const onSubmit = async () => {
    setIsLoading(true);
  };

  return (
    <motion.div
      id="contact"
      className="pl-10 max-w-xl lg:pt-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1}}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h1
        className="text-3xl font-bold"
      >
        Get in Touch!
      </h1>

      <h3
        className="pb-3 font-bold text-zinc-500 -mt-0.5"
      >
        We&apos;re eager to hear from you!

      </h3>  

      <form
        className="flex flex-col gap-2"
        action={async FormData => {
          await sendEmail(FormData);
        }}
      >
        <FormControl
          isRequired
          isInvalid={isNameTouched && !values.name}
        >
          <FormLabel>
            Name
          </FormLabel>

          <Input 
            type="text"
            name="name"
            placeholder="What is your Name?"
            errorBorderColor="red.500"
            value={values.name}
            onChange={handleChange}
            onBlur={onNameBlur}
          />

          <FormErrorMessage
            className="flex gap-1"
          >
            <div
              className="hover:text-red-400 transition duration-200"
            >
              This Field is Required
            </div>
            <FormErrorIcon 
              className="hover:text-red-400 transition duration-200"
            /> 
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={isEmailTouched && !values.email}
        >
          <FormLabel>
            Email
          </FormLabel>

          <Input 
            type="email"
            name="email"
            placeholder="What is your Email?"
            value={values.email}
            onChange={handleChange}
            onBlur={onEmailBlur}
          />

          <FormErrorMessage
            className="flex gap-1"
          >
            <div
              className="hover:text-red-400 transition duration-200"
            >
              This Field is Required
            </div>
            <FormErrorIcon 
              className="hover:text-red-400 transition duration-200"
            /> 
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={isSubjectTouched && !values.subject}
        >
          <FormLabel>
            Subject
          </FormLabel>

          <Input 
            type="text"
            name="subject"
            placeholder="Why are you reaching out to us?"
            value={values.subject}
            onChange={handleChange}
            onBlur={onSubjectBlur}
          />

          <FormErrorMessage
            className="flex gap-1"
          >
            <div
              className="hover:text-red-400 transition duration-200"
            >
              This Field is Required
            </div>
            <FormErrorIcon 
              className="hover:text-red-400 transition duration-200"
            /> 
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={isMessageTouched && !values.message}
        >
          <FormLabel>
            Message
          </FormLabel>

          <Textarea 
            name="message"
            placeholder="Share your thoughts with us!"
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={onMessageBlur}
            maxLength={10000}
          />

          <FormErrorMessage
            className="flex gap-1"
          >
            <div
              className="hover:text-red-400 transition duration-200"
            >
              This Field is Required
            </div>
            <FormErrorIcon 
              className="hover:text-red-400 transition duration-200"
            /> 
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          variant='outline'
          className="font-semibold dark:bg-zinc-300 dark:hover:bg-zinc-100
          transition duration-200 bg-zinc-900 hover:bg-zinc-700 mt-1.5
          text-zinc-100 dark:text-zinc-900 py-6 flex items-center gap-1"
          isLoading={isLoading}
          disabled={
            !values.name    ||
            !values.email   ||
            !values.subject ||
            !values.message
          }
        >
          Submit
          <FaPaperPlane 
            size={15}
          />
        </Button>
      </form>
    </motion.div>
  )
}

export default Contact;
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStudent, updateStudent } from "../api/students";
import { fetchSubjects } from "../api/subjects";
import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";

const EditStudent = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingStudent,
    isError: isErrorStudent,
    data: student,
    error: studentError,
  } = useQuery({
    queryKey: ["student"],
    queryFn: () => fetchStudent(params.id),
  });

  const {
    isLoading: isLoadingSubjects,
    isError: isErrorSubjects,
    data: subjectsData,
    error: subjectsError,
  } = useQuery({
    queryKey: ["subjectsData"],
    queryFn: fetchSubjects
  });

  if (isLoadingStudent) return "Loading...";
  if (isErrorStudent) return "An error has occurred: " + studentError.message;

  if (isLoadingSubjects) return "Loading...";
  if (isErrorSubjects)
    return "An error has occurred: " + subjectsError.message;

  return (
    <div className="h-screen w-full grid place-items-center">
      <Formik
        enableReinitialize
        initialValues={{
          name: student.name,
          subject: student.subject.id,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          subject: Yup.number()
            .oneOf(
              subjectsData
                ? subjectsData.map((subject) => subject.id)
                : undefined,
              "Please select a valid subject"
            )
            .required("Subject is required"),
        })}
        onSubmit={(values, actions) => {
          const studentId = params.id;

          const updatedStudent = {
            name: values.name,
            subject: {
              id: values.subject,
            },
          };

          updateStudent(studentId, updatedStudent);
          queryClient.invalidateQueries({ queryKey: ["student"] });

          toast.success("Edited!");

          actions.resetForm({
            values: {
              name: "",
              subject: "",
            },
          });
        }}
      >
        <Card className="">
          <Form className="grid space-y-3">
            <Field
              name="name"
              type="text"
              placeholder="Student"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            ></Field>
            <ErrorMessage
              component="label"
              name="name"
              className="text-red-600"
            />

            <Field
              as="select"
              name="subject"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <option value="">Choose a subject</option>
              {subjectsData.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              component="label"
              name="subject"
              className="text-red-600"
            />

            <div className="grid justify-center">
              <button
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 active:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                type="submit"
              >
                Edit Student
              </button>
              <Link to={"/students"}>
                <button
                  className="focus:outline-none text-white bg-[#ff7400] hover:bg-[#ffa700] active:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  type="submit"
                >
                  Back to Students
                </button>
              </Link>
            </div>
            <Toaster richColors />
          </Form>
        </Card>
      </Formik>
    </div>
  );
};

export default EditStudent;

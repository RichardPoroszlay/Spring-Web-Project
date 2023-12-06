import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSubjects } from "../api/subjects";
import { createStudent } from "../api/students";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

function AddStudent() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["subjectsData"],
    queryFn: fetchSubjects,
  });

  const createStudentMutation = useMutation({
    mutationFn: createStudent,
  });

  const handleAddStudent = (student) => {
    createStudentMutation.mutate({
      ...student,
    });
  };

  if (isPending) return "Loading...";
  if (isError) return "An error has occurred: " + error.message;

  return (
    <div className="h-screen w-full grid place-items-center">
      <Formik
        initialValues={{
          name: "",
          subject: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          subject: Yup.number()
            .oneOf(
              data.map((subject) => subject.id),
              "Please select a valid subject"
            )
            .required("Subject is required"),
        })}
        onSubmit={(values, actions) => {
          const modifiedValues = {
            ...values,
            subject: {
              id: parseInt(values.subject),
            },
          };

          handleAddStudent(modifiedValues);
          actions.resetForm({
            values: {
              name: "",
              subject: "",
            },
          });

          toast.success("Added");
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
              {data.map((subject) => (
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
                className="focus:outline-none text-white font-bold bg-[#0cc] hover:bg-[#00ffb9] rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                type="submit"
              >
                Add Student
              </button>
              <Link to={"/get-students"}>
                <button
                  className="focus:outline-none text-white font-bold bg-[#019191] hover:bg-[#0cc] rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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
}

export default AddStudent;

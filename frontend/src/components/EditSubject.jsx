import React from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSubject, updateSubject } from "../api/subjects";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import { Card } from "flowbite-react";

function EditSubject() {
  const params = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingSubject,
    isError: isErrorSubject,
    data: subject,
    error: subjectError,
  } = useQuery({
    queryKey: ["subject"],
    queryFn: () => fetchSubject(params.id),
  });

  if (isLoadingSubject) return "Loading...";
  if (isErrorSubject) return "An error has occurred: " + subjectError.message;

  return (
    <div className="h-screen w-full grid place-items-center">
      <Formik
        initialValues={{
          name: subject.name,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
        })}
        onSubmit={(values, actions) => {
          updateSubject(params.id, values);
          queryClient.invalidateQueries({ queryKey: ["subject"] });

          actions.resetForm({
            values: {
              name: "",
            },
          });

          toast.success("Edited");
        }}
      >
        <Card>
          <Form className="grid space-y-3">
            <Field
              name="name"
              type="text"
              placeholder="Subject"
              className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            ></Field>
            <ErrorMessage
              component="label"
              name="name"
              className="text-red-600"
            />

            <div className="grid justify-center">
              <button
                className="focus:outline-none text-white font-bold bg-[#0cc] hover:bg-[#00ffb9] rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                type="submit"
              >
                Edit Subject
              </button>

              <Link to={"/get-subjects"}>
                <button
                  className="focus:outline-none text-white font-bold bg-[#019191] hover:bg-[#0cc] rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  type="submit"
                >
                  Back to Subjects
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

export default EditSubject;

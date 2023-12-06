import React from "react";
import { fetchSubject } from "../api/subjects";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "flowbite-react";

function PreviewSubject() {
  const params = useParams();
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
      <Card className=" w-1/5">
        <p className="text-xl">Subject name:</p>
        <span className="text-center">{subject.name}</span>
        <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="grid justify-center">
          <Link to={"/get-subjects"}>
            <button
              className="focus:outline-none text-white font-bold bg-[#019191] hover:bg-[#0cc] rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              type="submit"
            >
              Back to Subjects
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default PreviewSubject;

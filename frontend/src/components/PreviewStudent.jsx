import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchStudent } from "../api/students";
import { Card } from "flowbite-react";

function PreviewStudent() {
  const params = useParams();
  const {
    isLoading: isLoadingStudent,
    isError: isErrorStudent,
    data: student,
    error: studentError,
  } = useQuery({
    queryKey: ["student"],
    queryFn: () => fetchStudent(params.id)
  });

  if (isLoadingStudent) return "Loading...";
  if (isErrorStudent) return "An error has occurred: " + studentError.message;
  return (
    <div className="h-screen w-full grid place-items-center">
      <Card className=" w-1/5">
        <p className="text-xl">Student name:</p>
        <span className="text-center">{student.name}</span>
        <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <p className="text-xl">Subject:</p>
        <span className="text-center">{student.subject.name}</span>
        <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="grid justify-center">
          <Link to={"/students"}>
            <button
              className="focus:outline-none text-white bg-[#ff7400] hover:bg-[#ffa700] active:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              type="submit"
            >
              Back to Students
            </button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default PreviewStudent;

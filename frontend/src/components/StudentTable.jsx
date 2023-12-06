import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { deleteStudent, fetchStudents } from "../api/students";
import { NavLink, Link } from "react-router-dom";

function StudentTable() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const handleDelete = (id) => {
    deleteStudentMutation.mutate(id);
  };

  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + error.message;

  return (
    <div className="m-3">
      <h2 className="text-4xl font-extrabold text-[#0cc] my-5">
        Student Management Page
      </h2>
      <p className="mb-4 text-lg font-normal text-black">
        Manage your students here!
      </p>

      <div className="flex justify-end h-full">
        <NavLink to="/add-student">
          <button
            type="button"
            className="mx-32 focus:outline-none text-white font-bold bg-[#0cc] hover:bg-[#00ffb9] rounded-lg text-sm px-5 py-2.5 my-5"
          >
            Add new Student
          </button>
        </NavLink>
      </div>

      {data && (
        <Table hoverable className="text-center">
          <Table.Head>
            <Table.HeadCell>Student id</Table.HeadCell>
            <Table.HeadCell>Student name</Table.HeadCell>
            <Table.HeadCell>Subject</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((student) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={student.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {student.id}
                </Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.subject.name}</Table.Cell>
                <Table.Cell className="w-1/4">
                  <button
                    type="button"
                    className="focus:outline-none text-white font-bold bg-[#5c0404] hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit-student/${student.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white font-bold bg-[#019191] hover:bg-[#0cc] rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Edit
                    </button>
                  </Link>
                  <Link to={`/student/${student.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white font-bold bg-[#019191] hover:bg-[#0cc] rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Preview
                    </button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default StudentTable;

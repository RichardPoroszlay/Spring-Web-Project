import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { deleteSubject, fetchSubjects } from "../api/subjects";
import { NavLink, Link } from "react-router-dom";

function SubjectTable() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["subjectsData"],
    queryFn: fetchSubjects,
  });

  const deleteSubjectMutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjectsData"] });
    },
  });

  const handleDelete = (id) => {
    deleteSubjectMutation.mutate(id);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="m-3">
      <h2 className="text-4xl font-extrabold dark:text-white my-5">
        Subject CRUD Site
      </h2>
      <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
        Explore, add, modify, or delete subject entries effortlessly. Make your
        changes and see them in action in real-time!
      </p>

      <div className="flex justify-end h-full">
        <NavLink to="/add-subject">
          <button
            type="button"
            className="mx-32 focus:outline-none text-white bg-green-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 dark:focus:ring-yellow-900"
          >
            Add new Subject
          </button>
        </NavLink>
      </div>

      {data && (
        <Table hoverable className="text-center">
          <Table.Head>
            <Table.HeadCell>Subject id</Table.HeadCell>
            <Table.HeadCell>Subject name</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((subject) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={subject.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {subject.id}
                </Table.Cell>
                <Table.Cell>{subject.name}</Table.Cell>
                <Table.Cell className="w-1/4">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit-subject/${subject.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Edit
                    </button>
                  </Link>
                  <Link to={`/subject/${subject.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
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

export default SubjectTable;
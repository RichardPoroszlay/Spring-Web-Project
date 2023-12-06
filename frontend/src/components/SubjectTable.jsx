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
      <h2 className="text-4xl font-extrabold text-[#0cc] my-5">
        Subject Management Page
      </h2>
      <p className="mb-4 text-lg font-normal text-black">
        Manage the subjects here!
      </p>

      <div className="flex justify-end h-full">
        <NavLink to="/add-subject">
          <button
            type="button"
            className="mx-32 focus:outline-none text-white font-bold bg-[#0cc] hover:bg-[#00ffb9] rounded-lg text-sm px-5 py-2.5 my-5"
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
                    className="focus:outline-none text-white font-bold bg-[#5c0404] hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit-subject/${subject.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white font-bold bg-[#019191] hover:bg-[#0cc] rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Edit
                    </button>
                  </Link>
                  <Link to={`/subject/${subject.id}`}>
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

export default SubjectTable;

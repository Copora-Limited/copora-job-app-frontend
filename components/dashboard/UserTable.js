// components/UserTable.js
import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import { useRouter } from "next/router";
import { SearchIcon } from "@/components/Icon"; // Make sure to import your SearchIcon component

const UserTable = ({ users }) => {
  const router = useRouter();

  // State for pagination and search
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 5; // Number of users per page

  // Columns definition
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "index",
        Cell: ({ row }) => <span>{row.index + 1 + pageIndex * pageSize}</span>,
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Application No",
        accessor: "applicationNo",
        Cell: ({ value }) => <span>{value || "N/A"}</span>,
      },
    ],
    [pageIndex]
  );

  // Filter users based on the search input
  const filteredUsers = useMemo(() => {
    if (!search) return users; // Return all users if there's no search input
    return users.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  // Create a paginated version of the filtered data
  const paginatedData = useMemo(() => {
    const startRow = pageIndex * pageSize;
    return filteredUsers.slice(startRow, startRow + pageSize);
  }, [pageIndex, filteredUsers]);

  const data = useMemo(() => paginatedData, [paginatedData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const handleSearch = () => {
    // Placeholder for any additional search handling logic if needed
  };

  return (
    <div className="flex flex-col">
      {/* Search Input */}
      <div className="mb-5 w-full h-[8%] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="border border-[#D0D5DD] md:w-[260px] w-[125px] h-[36px] rounded-[8px] flex items-center gap-3 px-3">
            <SearchIcon />
            <input
              type="search"
              name="search-user"
              id="search-user"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="text-[14px] text-[#667085] placeholder:text-[#667085] w-full h-full outline-0 border-0 rounded-e-[8px]"
              placeholder="Search here..."
            />
          </div>
          {/* <button
            onClick={handleSearch}
            className="bg-[#247A84] rounded-[100px] text-[12px] text-white outline-0 border border-[#247A84] w-[95px] h-[36px]"
          >
            Search
          </button> */}
        </div>
      </div>

      <table
        {...getTableProps()}
        className="min-w-full border border-gray-300 custom-table text-normal"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-b p-2 text-left text-sm"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  router.push(`/admin/list-applicants/${row.original.id}`)
                }
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border-b p-2 text-sm">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={pageIndex === 0}
          className={`px-4 py-2 rounded bg-teal-700 text-white ${
            pageIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-teal-900"
          }`}
        >
          Prev
        </button>
        <span>
          Page {pageIndex + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={pageIndex === totalPages - 1}
          className={`px-4 py-2 rounded bg-teal-700 text-white ${
            pageIndex === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-teal-900"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;

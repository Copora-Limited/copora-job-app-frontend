// components/UserTable.tsx
import { Table, TableProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  applicationNo?: string;
  accountStatus: boolean;
  role: string;
}

interface UserTableProps extends TableProps<User> {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const router = useRouter();
  const columns: ColumnsType<User> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_text, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Application No",
      dataIndex: "applicationNo",
      key: "applicationNo",
      render: (applicationNo) => <span>{applicationNo || "N/A"}</span>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey={(record) => record.id}
      onRow={(data) => {
        return {
          onClick: () => {
            router.push(`/admin/list-applicants/${data.id}`);
          },
        };
      }}
    />
  );
};

export default UserTable;

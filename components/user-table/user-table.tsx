import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteButton from "./delete-button"
import DeleteUserModal from "./delete-modal"
import EditButton from "./edit-button"
import EditUserModal from "./edit-modal"

type User = {
  createdAt: string
  name: string
  avatar: string
  id: string
}

export default async function UserTable() {
  const response = await fetch(
    "https://66b2046a1ca8ad33d4f62740.mockapi.io/api/v1/users"
  )
  const users: User[] = await response.json()

  return (
    <>
      <EditUserModal />
      <DeleteUserModal />
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell className="text-right">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="gap-2 flex items-center">
                <EditButton user={user} />
                <DeleteButton user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

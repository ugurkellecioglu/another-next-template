import { auth } from "@/auth"
import LogoutButton from "@/components/logout-button"
import UserTable from "@/components/user-table/user-table"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  // if (!session) {
  //   redirect("/signin")
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <>
          <UserTable />

          <p className="text-primary-foreground">{JSON.stringify(session)}</p>
          <LogoutButton />
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </main>
  )
}

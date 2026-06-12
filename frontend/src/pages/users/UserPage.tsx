import { useEffect, useState } from "react"
import { getUsers } from "../../services/userService"
import type { AppUser } from "../../types/user"

import {

  UserStats,
  UserToolbar,
  UserTable

} from "../../components/users"

export default function UsersPage() {

  const [search, setSearch] =
    useState("")

  const [users, setUsers] =
    useState<AppUser[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        setUsers(await getUsers())
      } catch (error: any) {
        alert(
          error.response?.data?.message ||
            "Gagal memuat pengguna"
        )
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filtered = users.filter(user =>

    user.name
      .toLowerCase()
      .includes(search.toLowerCase())

  )

  const activeUsers =
    users.filter(
      u => u.status === "active"
    ).length

  return (
    <div className="p-4 lg:p-6 space-y-5">

      <UserStats
        total={users.length}
        active={activeUsers}
      />

      <UserToolbar
        search={search}
        setSearch={setSearch}
      />

      <UserTable
        users={filtered}
      />

      {loading && (
        <div className="bg-white border border-gray-100 rounded-3xl p-5 text-sm text-gray-500">
          Memuat data pengguna...
        </div>
      )}

    </div>
  )
}

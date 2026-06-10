import { useState } from "react"

import { USERS } from "../../data/users"

import {

  UserStats,
  UserToolbar,
  UserTable

} from "../../components/users"

export default function UsersPage() {

  const [search, setSearch] =
    useState("")

  const filtered = USERS.filter(user =>

    user.name
      .toLowerCase()
      .includes(search.toLowerCase())

  )

  const activeUsers =
    USERS.filter(
      u => u.status === "active"
    ).length

  return (
    <div className="p-4 lg:p-6 space-y-5">

      <UserStats
        total={USERS.length}
        active={activeUsers}
      />

      <UserToolbar
        search={search}
        setSearch={setSearch}
      />

      <UserTable
        users={filtered}
      />

    </div>
  )
}
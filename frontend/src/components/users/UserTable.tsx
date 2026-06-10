import UserRoleBadge from "./UserRoleBadge"
import {Avatar} from "../ui/Avatar"
import type { AppUser } from "../../types/user"


interface Props {
  users: AppUser[]
}

export default function UserTable({
  users
}: Props) {

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="bg-gray-50 border-b border-gray-100">

              {[
                "Pengguna",
                "Role",
                "Cabang",
                "Status"
              ].map(header => (

                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs uppercase tracking-wider text-gray-400 font-bold"
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-50">

            {users.map(user => (

              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors"
              >

                {/* USER */}
                <td className="px-4 py-3">

                  <div className="flex items-center gap-3">

                    <Avatar
                    initials={user.initials}
                    size="md"/>

                    <div>

                      <p className="font-bold text-gray-900">

                        {user.name}

                      </p>

                      <p className="text-xs text-gray-400">

                        {user.email}

                      </p>

                    </div>

                  </div>

                </td>

                {/* ROLE */}
                <td className="px-4 py-3">

                  <UserRoleBadge
                    role={user.role}
                  />

                </td>

                {/* BRANCH */}
                <td className="px-4 py-3 text-gray-500">

                  {user.branch}

                </td>

                {/* STATUS */}
                <td className="px-4 py-3">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-bold
                      ${
                        user.status === "active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >

                    {user.status === "active"
                      ? "Aktif"
                      : "Nonaktif"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
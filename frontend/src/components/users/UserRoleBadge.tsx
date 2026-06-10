interface Props {
  role: string
}

export default function UserRoleBadge({
  role
}: Props) {

  const styles = {

    owner:
      "bg-purple-100 text-purple-600",

    admin:
      "bg-blue-100 text-blue-600",

    cashier:
      "bg-emerald-100 text-emerald-600",

    warehouse:
      "bg-orange-100 text-orange-600"

  }

  const labels = {

    owner: "Owner",

    admin: "Admin",

    cashier: "Kasir",

    warehouse: "Gudang"

  }

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-bold
        ${styles[role as keyof typeof styles]}
      `}
    >

      {labels[role as keyof typeof labels]}

    </span>
  )
}
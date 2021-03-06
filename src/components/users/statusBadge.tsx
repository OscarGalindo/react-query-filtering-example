import React from "react";
import {UserStatus} from "../../domain/dto/user";

export const ActiveStatus = () => {
  return <span
    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
}

export const PendingStatus = () => {
  return <span
    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
}

export const BlockedStatus = () => {
  return <span
    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Blocked</span>
}

export const UserRowStatusBadge = ({status}: { status: UserStatus }) => {
  switch (status as any) {
    case "Active":
    case "active":
    case UserStatus.Active:
      return <ActiveStatus/>
    case "Pending":
    case "pending":
    case UserStatus.Pending:
      return <PendingStatus/>
    case "Blocked":
    case "blocked":
    case UserStatus.Blocked:
      return <BlockedStatus/>
  }
}
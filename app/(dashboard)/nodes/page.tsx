import { decode } from "jsonwebtoken";
import {cookies} from "next/headers"
import Button from "../../../components/Button";
import {getPermissionsFromToken, convertRaw} from "../../../lib/permissions";
import CreateNode from "./CreateNode";
"use client";
export default async function Nodes() {
    let token = cookies().get("authorization")
    let permissions = getPermissionsFromToken(token!.value)
    let rawPerms = convertRaw(permissions)
    return (
        <>
        <div className="flex">
        <h1 className="text-3xl dark:text-white font-serif mb-5">
        Nodes
    </h1>
    {rawPerms.includes('create_node') ?
    <CreateNode />
    : ""}
    </div>
    </>
      )
}

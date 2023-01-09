import { decode } from "jsonwebtoken"

export function getPermissionsFromToken(token: string) {
    let tokenData = decode(token) as any;
    let instancePermissions = tokenData!.instancePermissions;
    let nodePermissions = tokenData!.nodePermissions;
    let userPermissions = tokenData!.permissions;
    let fullPermissions = instancePermissions.concat(nodePermissions).concat(userPermissions)
    return fullPermissions;
}

export function convertRaw(permissions: any[]) {
    let rawPerms : string[]= [];
    permissions.forEach(perm => {
        rawPerms.push(perm.permission);
    })
    return rawPerms;
}
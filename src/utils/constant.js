/**
 * 自定义常量
 */

// 客户的状态 => 正常 : 1, 作废 : 2, 删除 : 3
export const CustomerStatusEnum = { Normal: 1, Invalid: 2, Delete: 3 }
// 客户类型 => 成单 : 1, 待分配 : 2, 跟单 : 3
export const CustomerTypeEnum = { Ordered: 1, Pending: 2, Documentary: 3 }
// 审核表待审核的状态 => 待审核 : 1, 已通过 : 2, 已驳回 : 3, 撤回 : 4, 已过期 : 5
export const AuditStatusEnum = { Pending: 1, Approval: 2, Denied: 3, Reback: 4, Expired: 5 }
// 审核表审核的数据类型 => 作废 : 1, 延期 : 2, 重复客户 : 3
export const AuditTypeEnum = { Invalid: 1, Delay: 2, Repeat: 3 }
// 用户的角色状态 => 普通业务员权限 : true, 管理员权限 : false
export const RolePermissions = { OrdinarySalesman: true, AdminiStrators: false }
// 用户权限设置 => 业务员 : 1, 管理员 : 2
export const RoleAuthority = { BusinessManager: 1, CompanyAdminiStrators: 2 }
// 用户权限设置 => 系统日志 : 3, 业务日志 : 4
export const logType = { SystemLog: 3, OperationLog: 4 }
// 成单明细记录中的状态值 => 正常 : 1, 作废 : 2
export const orderStates = { NormalStates: 1, VoidStates: 2 }
// 是否含税含运费 => 0: 不含, 1: 含
export const taxFreight = { NoClude: 0, InClude: 1 }
// 配件类型 => 配件 : 1, 通用 : 2, 电器 : 3
export const partsGenre = { Accessorie: 1, General: 2, Electrical: 3 }
// 跟单状态下的超期状态 => 正常: 1, 即将到期 : 2, 已超期 : 3
export const documentaryState = { Normal: 1, MustExpire: 2, Expired: 3 }

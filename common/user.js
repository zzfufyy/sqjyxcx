

const genderList = [
    '女', '男',
]

const UserRole = {
    // 求职者
    Recruitee: 0,
    // 招聘者
    Recruiter: 1,
    // 社区工作人员
    CommunityPersonel: 2,
}

const userRoleName = [
    '求职者',
    '招聘方',
    '社区工作人员'
];




module.exports = {
    userRoleName: userRoleName,
    UserRole: UserRole,
    genderList: genderList,
}

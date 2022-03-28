const STATUS = {
    NORMAL: 0,
    DELETED: -1,
}

class Salary {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        if (min <= 0 && max <= 0) {
            this.value = '薪资面议';
        } else if (min <= 0 && max > 0) {
            this.value = `${max}以下`;
        } else if (min > 0 && max <= 0) {
            this.value = `${min}以上`;
        } else {
            this.value = `${min} - ${max}`;
        }

    }
}
const salaryList = [
    new Salary(0, 0),
    new Salary(0, 3000),
    new Salary(3000, 5000),
    new Salary(5000, 8000),
    new Salary(8000, 10000),
    new Salary(10000, 0),
];



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
    STATUS: STATUS,
    Salary: Salary,
    salaryList: salaryList,
    userRoleName: userRoleName,
    UserRole: UserRole,
    genderList: genderList,
}
const Api = {
    // recruitee
    userCandidateAdd: '/user-candidate/add',
    userCandidateInfo: '/user-candidate/info',
    userCandidateModify: '/user-candidate/modify',

    // recruiter
    userRecruiterInfo: '/user-recruiter/info',
    userRecruiterAdd: '/user-recruiter/add',


    // user
    userInfo: '/user/info',

    // recruiter-company
    recruiterCompanyInfo: '/recruit-company/info',


    // recruit-job
    recruitJobPagedByDistance: '/recruit-job/paged-by-distance',


    contact: function (value) {
        return getApp().globalData.web_path + value;
    }
};


module.exports = {
    Api: Api,
}






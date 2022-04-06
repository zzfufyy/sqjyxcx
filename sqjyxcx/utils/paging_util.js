const _defaultPageSize = 10;

const createPageData = () => ({
    currentPage: 1,
    pageSize: _defaultPageSize,
});

const createPageMethod = () => ({
    getCurrentPage() {
        return {
            page: this.getCurrentPage,
            rows: this.pageSize,
        }
    }
});

const _initPageInfo = {
    pageNum: 0,
    pageSize: this.pageSize,
    size: 0,
    nextPage: 1,
    hasNextPage: true,
};

class PageConfig {
    constructor(pageSize) {
        this.pageSize = pageSize;
        this.pageInfo = _initPageInfo;
    }

    setNoMoreDataCallback(callback) {
        this.handleNoMoreData = callback;
    }

    reset() {
        this.pageInfo = _initPageInfo;
    }

    handlePageInfo(pageInfo) {
        this.pageInfo = pageInfo;

        // 如果hasNextPage 则不执行后面 setNomoredata
        // if (!pageInfo.hasNextPage && this.handleNoMoreData) {
        //     this.handleNoMoreData();
        // }
        if (!pageInfo.hasNextPage) {
            this.handleNoMoreData();
        }

        return pageInfo.list;
    }


    hasPrevious() {
        return this.pageInfo.hasPreviousPage;
    }

    hasNext() {
        return this.pageInfo.hasNextPage;
    }

    firstPage() {
        return 1;
    }

    isFirst() {
        return currentPage
    }

    lastPage() {
        return this.pageInfo.pages;
    }

    previousPage() {
        return this.pageInfo.prePage;
    }

    currentPage() {
        return this.pageInfo.pageNum;
    }

    nextPage() {
        return this.pageInfo.nextPage;
    }

    /**
     * 把 给定 的 condition 和本 configuere 中存储的分页信息封装成一个 pagingParam 请求对象
     * 即：
     * {
     *     page : {
     *          page: page (传入的 page),
     *          rows: this.pageSize (构造的时候传入的 pageSize)
     *      },
     *     condition: condition (传入的 condition)
     * }
     * 
     */
    buildParam(page, condition) {
        let $this = this;
        return {
            page: {
                page: page,
                rows: $this.pageSize,
            },
            condition: condition,
        };
    }

    buildNextParam(condition) {
        if (!this.hasNext()) {
            console.warn(`没有下一页 ${this.nextPage()}`);
            wx.showToast({
                title: '没有更多数据',
                none:"none"
              })
        } else {
            return this.buildParam(this.nextPage(), condition);
        }

    }
}

module.exports = {
    createPageData: createPageData,
    createPageMethod: createPageMethod,
    PageConfig: PageConfig,
}
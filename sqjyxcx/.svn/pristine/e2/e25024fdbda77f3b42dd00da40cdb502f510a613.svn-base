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

    reset() {
        this.pageInfo = _initPageInfo;
    }

    handlePageInfo(pageInfo) {
        this.pageInfo = pageInfo;
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
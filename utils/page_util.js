
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

module.exports = {
    createPageData: createPageData,
    createPageMethod: createPageMethod,
}
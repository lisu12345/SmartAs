'use strict';

+(function (Namespace) {
  var RC = Namespace.register("Smart.RC");
  var locale = {
    pagination: {
      // Options.jsx
      items_per_page: '/page',
      jump_to: 'Goto',
      page: '',

      // Pager.jsx
      first_page: 'First Page',
      last_page: 'Last Page',

      // Pagination.jsx
      prev_page: 'Previous Page',
      next_page: 'Next Page',
      prev_5: 'Previsous 5 Pages',
      next_5: 'Next 5 Pages'
    },
    table: {
      filterTitle: '筛选',
      filterConfirm: '确定',
      filterReset: '重置',
      emptyText: '暂无数据'
    }
  };
  RC.locale = locale;
})(Smart.Namespace);
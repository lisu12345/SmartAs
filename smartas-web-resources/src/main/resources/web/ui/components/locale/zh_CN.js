'use strict';

+(function (Namespace) {
  var RC = Namespace.register("Smart.RC");
  var locale = {
    pagination: {
      // Options.jsx
      items_per_page: '条/页',
      jump_to: '跳至',
      page: '页',

      // Pager.jsx
      first_page: '第一页',
      last_page: '最后一页',

      // Pagination.jsx
      prev_page: '上一页',
      next_page: '下一页',
      prev_5: '向前 5 页',
      next_5: '向后 5 页'
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
/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of theduberstudy developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import request from '@/router/axios'

const logOperateService = {
  page(query) {
    return request({
      url: '/sys/log-operate/',
      method: 'get',
      params: query
    })
  },

  export(query) {
    return request({
      url: '/sys/log-operate/export',
      method: 'get',
      params: query
    })
  },

  remove(id) {
    return request({
      url: '/sys/log-operate/' + id,
      method: 'delete'
    })
  }
};
export default logOperateService

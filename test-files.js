// 测试用例 - 使用这个文件来测试扩展功能

// 测试1: 基础包名转换
// 输入: require('lodash')
// 期待: const lodash = require('lodash');

// 测试2: 带连字符的包名
// 输入: require('abc-pkl-qtr')
// 期待: const abcPklQtr = require('abc-pkl-qtr');

// 测试3: 作用域包
// 输入: require('@types/node')
// 期待: const typesNode = require('@types/node');

// 测试4: 带点的包名
// 输入: require('lodash.debounce')
// 期待: const lodashDebounce = require('lodash.debounce');

// 测试5: ES6 import
// 输入: import React from 'react'
// 期待: const react = require('react');

// 在下面测试各种情况：

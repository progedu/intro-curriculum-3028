'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '空 白 を 空 白 で 認 識 す る か 実 験',
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// 空白が空白として認識されるか実験
assert(html.includes('空 白 を 空 白 で 認 識 す る か 実 験'));
console.log('テストが正常に完了しました');


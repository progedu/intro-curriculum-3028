'use strict';
const pug = require('pug');
const assert = require('assert');
const assert2 = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '<script>alert(\'test\');</script>',
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));
console.log('エスケープテストが正常に完了しました');

//半角スペースを正確に表示
const html2 = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '半角スペース→ ←を表示',
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest'
});

//半角スペースが正しく表示されるかをテスト
assert2(html2.includes('半角スペース→ ←を表示'));
console.log('半角テストが正常に完了しました');
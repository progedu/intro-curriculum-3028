'use strict';
const jade = require('jade');
const assert = require('assert');

// jade のテンプレートにおける XSS 脆弱性のテスト
const html = jade.renderFile('./views/posts.jade', {
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

// 半角スペースが正しく表示されることのテスト
const html_space = jade.renderFile('./views/posts.jade', {
  posts: [{
    id: 1,
    content: 'space test',
    postedBy: 'guest1',
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.indexOf('&lt;script&gt;alert(\'test\');&lt;/script&gt;') > 0);
// 半角スペースが表示されていることをチェック
assert(html_space.indexOf(' ') > 0);
console.log('テストが正常に完了しました');


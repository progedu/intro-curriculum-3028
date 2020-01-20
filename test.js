'use strict';
const pug = require('pug');
const assert = require('assert');

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

// 半角スペースのテスト
const spaceHtml = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 2,
    content: 'a a',
    postedBy: 'guest1',
    trackingCookie: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));
assert(spaceHtml.includes(' '));
// 半角スペースがそのまま表示されていることをチェック
assert
console.log('テストが正常に完了しました');

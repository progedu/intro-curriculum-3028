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

// pug のテンプレートにおける 半角スペースの変換のテスト
const html2 = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '<script>alert(\'a a\');</script>',
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));
assert(html2.includes('&lt;script&gt;alert(\'a a\');&lt;/script&gt;'));
console.log('テストが正常に完了しました');


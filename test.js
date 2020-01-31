'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '<script>alert(\'test\');</script>' +
      'nnn ed  nico',
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// 半角スペースの投稿閲覧テスト
const html_sp = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: 'nnn ed  nico',
    postedBy: 'guest2',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest2'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));

// 半角スペースを投稿して閲覧できるかをチェック
assert(html_sp.includes('nnn ed  nico'));
console.log('テストが正常に完了しました');
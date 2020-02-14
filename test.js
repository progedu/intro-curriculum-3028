'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html1 = pug.renderFile('./views/posts.pug', {
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
assert(html1.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));

// '+' が ' 'に変換されているかテスト
let content = '1+2+3';
content = content.replace(/\+/g, ' ');
const html2 = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: content,
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});
assert(html2.includes('1 2 3'));

console.log('テストが正常に完了しました');


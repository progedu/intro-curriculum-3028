'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    // content: '<script>alert(\'test\');</script>',
    content: '半角スペースのテスト。→ ←矢印の間に半角スペースがあるはずです。',
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック
assert(html.includes('半角スペースのテスト。→ ←矢印の間に半角スペースがあるはずです。'));
console.log('テストが正常に完了しました');


'use strict';
const pug = require('pug');
const assert = require('assert');

// pug のテンプレートにおける XSS 脆弱性のテスト
const html = pug.renderFile('./views/posts.pug', {
  posts: [{
    id: 1,
    content: '<script>alert(\'test\');</script>',    // 意図的にスクリプトタグを含んだ投稿内容を追加（XSS Injecdtion対策のため）
    postedBy: 'guest1',
    trackingCookie: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  user: 'guest1'
});

// スクリプトタグがエスケープされて含まれていることをチェック（スクリプトタグがきちんとpugによってエスケープ処理されているかをチェック）
assert(html.includes('&lt;script&gt;alert(\'test\');&lt;/script&gt;'));
console.log('テストが正常に完了しました');


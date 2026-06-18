# チャットボット(chatbot) 動作確認ページ

チャットボット(chatbot) スタートアップガイド STEP1 に沿った、ローカル動作確認用のHTMLファイル群です。

## 確認できる設置パターン

| ファイル | パターン | 必要なタグ |
|---|---|---|
| `index.html` | 一覧ページ（ナビ） | — |
| `chat-icon.html` | チャットアイコンを設置する | scriptタグのみ |
| `chat-embed.html` | チャットを埋め込む | scriptタグ + `仕様書記載のiframe-target` |
| `chat-open.html` | チャットを開く（ボタン） | scriptタグ + `仕様書記載のbutton-target` |

## セットアップ

### 1. config.js を作成する

```bash
cp config.example.js config.js
```

`config.js` を開き、実際のスクリプトURLを設定してください：

```js
const CHATBOT_SCRIPT_URL = "スクリプトURLをここに入力";
```

> `config.js` は `.gitignore` に含まれており、リポジトリには公開されません。

### 2. ローカルサーバーで起動

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

ブラウザで `http://localhost:8080` を開いてください。

## 動作確認の流れ

1. 上記のいずれかの方法でページを開く
2. 管理画面でサポートアクションを作成・公開する
3. 対応するページをブラウザで開いて動作を確認する

## 注意事項

- サポートアクションが管理画面で「公開」状態でないとチャットは表示されません
- トラッキングのため、全ページへのscriptタグ設置を推奨（スタートアップガイド記載）
- カスタムCSS・カスタムスクリプトはサポート対象外のため、貴社にて確認が必要

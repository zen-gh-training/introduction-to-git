## ステップ 4: 変更の比較

「元に戻す」方法を理解したところで、実際にゲームを変更しましょう！そしてさらに重要なことに、リポジトリ履歴にコミットする**前に**、Git が何が変更されたかを示す方法を学びましょう。

ファイルの差分を理解することは、作業のレビューやエラーの発見に不可欠です！

### 📖 理論: 差分（Diff）を理解する

Git はシンボルと色を使ってファイルの変更を表示します:

- `+`（緑色）は追加された行を示します
- `-`（赤色）は削除された行を示します

例:

```diff
+ これは追加された行です
- これは削除された行です
```

> [!TIP]
> 以下のコマンドで Git のデフォルトの比較色を変更できます。
>
> ```bash
> git config --global color.diff.old yellow
> git config --global color.diff.new blue
> ```

### 重要な Git コマンドは？

`git diff` コマンドは開発状態間の差分を表示します。

- `git diff` - 作業ディレクトリとステージングエリア間の差分。
- `git diff --staged` - ステージングエリアと前のコミット間の差分。
- `git diff HEAD~1` - 現在のコミットと前のコミット間の差分。

### ⌨️ アクティビティ 1: 差分を表示する（CLI を使用）

ゲームにいくつか変更を加えてから、CLI を使って差分を表示しましょう。

1. `src/index.html` を開きます。

1. `20行目`で、スコアに関する `info-section` エリアを以下の例に置き換えます。

   ```txt
   <div class="info-section">
      <h3>Current Score</h3>
      <div class="score" id="score">0</div>
      <h3>High Score</h3>
      <div class="high-score" id="high-score">0</div>
   </div>
   ```

   これにより3種類の変更がデモされます:

   - `Score` ラベルを `Current Score` に変更
   - `High Score` 情報を追加
   - `status` 情報を削除

1. 作業ディレクトリと最後のコミットの差分を表示します。

   ```bash
   git diff src/index.html
   ```

   <img width="500px" src="https://github.com/user-attachments/assets/f41d6917-1651-4549-bb7b-5441a1832e38"/>

1. 変更をステージングエリアに追加します。

   ```bash
   git add src/index.html
   ```

1. 同じ比較をもう一度実行します。作業ディレクトリがステージングエリアと一致しているため、変更が表示されないことに注目してください。

   ```bash
   git diff src/index.html
   ```

1. ステージングエリアと最後のコミットの差分を表示します。

   ```bash
   git diff --staged src/index.html
   ```

   <img width="500px" src="https://github.com/user-attachments/assets/f6aad38c-56fa-49ed-8209-9fe249c209ff"/>

1. 以下のメッセージで変更をコミットします。

   ```md
   git commit -m "ハイスコア表示要素を追加"
   ```

   <img width="500px" src="https://github.com/user-attachments/assets/8381b943-ca22-4b22-97b5-4520e174fc4c"/>

### ⌨️ アクティビティ 2: 差分を表示する（VS Code を使用）

ゲームにさらに変更を加えてから、VS Code を使って差分を表示しましょう。

1. `src/patterns.js` を開きます。

1. `3行目`で、`Null Pointer` エリアを以下の例に置き換えてパターンを変更します。

   ```txt
   {
     name: "Null Pointer",
     pattern: [
       [0, 1, 1, 1, 0],
       [0, 1, 0, 1, 0],
       [0, 1, 1, 1, 0],
       [0, 0, 1, 0, 0],
       [0, 0, 1, 0, 0],
     ],
   },
   ```

1. **ファイルエクスプローラー** で、ファイル名 `patterns.js` の色が変わり、変更されていることを示す `M` が表示されていることに注目してください。

   <img width="350px" src="https://github.com/user-attachments/assets/93a8f34c-9b16-4783-bc46-81532cdeffdf"/>

1. **ソース管理** タブを開きます。**変更** リストで `patterns.js` ファイルをダブルクリックして、差分（比較）ビューを開きます。

   <img width="350px" src="https://github.com/user-attachments/assets/4dce9e42-caca-4c6e-a6fe-8d83d58cd06d"/><br/>

   <img width="500px" src="https://github.com/user-attachments/assets/4c410689-2a53-462f-9200-79d21bddbf2c"/>

   > 💡 **ヒント**: 比較ビューでリアルタイムにフィードバックを見ながら内容を編集できます！

1. ファイルを**ステージング**エリアに追加します⚠️ まだコミットしないでください！

   現在のファイルがステージングエリアと一致しているため、比較ビューが変更を表示しなくなったことに注目してください。

   <img width="500px" src="https://github.com/user-attachments/assets/b1274ece-2b03-42d2-88e8-9f3aaaa8f2c5"/>

1. **ステージされた変更** リストで `patterns.js` ファイルをダブルクリックして、差分（比較）ビューを開きます。

   コミットの準備のためにステージングエリアがロックされているので、ここでは変更できないことに注目してください。

   <img width="350px" src="https://github.com/user-attachments/assets/da306727-49f1-4f73-9f38-3a0e5d406cef"/><br/>

   <img width="500px" src="https://github.com/user-attachments/assets/de1448eb-d0dd-4ec5-89a2-74fb4aa1cf5f"/>

1. 以下のメッセージで変更をコミットします。

   ```txt
   Null Pointer パターンを簡単に調整
   ```

1. 新しいコミットがリポジトリに追加されたら、Mona がすでにあなたの作業を確認しているはずです。少し待ってコメントを見守ってください。進捗情報と次のステップが表示されます。

<details>
<summary>お困りですか？ 🤷</summary><br/>

- 変更の一覧が1画面より長い場合は、`q` を押してスクロールファイルビューアを終了できます。

</details>

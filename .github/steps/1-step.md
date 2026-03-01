## ステップ 1: Git バージョン管理の紹介

プロジェクトに取り組んでいる中で、バックアップの管理が難しくなってきたことに気づきました。また、メンバーごとに更新の共有方法が異なるため、コラボレーションがとても混乱しています。

少し調べたところ、[Git](https://git-scm.com/) というものを知りました。どうやら、変更の追跡や他の人との共同作業が簡単になるようです。ファイルの命名規則、共有ドライブ、ファイルのメール送信といった古い方法で起こる混乱を解消してくれます。

> [!IMPORTANT]
> この演習では、Git がすでにインストールされた環境での使い方を学びます。
> 演習の手順では、GitHub Codespaces という仮想の環境を利用するためご自身のパソコンに Git をインストールする必要はありませんが、ご自身のパソコンにインストールしたい場合は、環境構成がさまざまなため公式の [Git サイト](https://git-scm.com) のインストールガイドを参照することをお勧めします。

### 📖 理論: バージョン管理とは？

バージョン管理システムは、開発者がコードの変更を管理する際に直面する一般的な問題を解決します。例えば:

- バックアップとリカバリ
- 隔離された実験環境
- 並行開発
- ファイルのロック
- ファイルの重複
- 変更の競合
- チームのコラボレーション

以下のような状況を経験したことがあるなら、Git バージョン管理が気に入るかもしれません！ 😎

- `my-project-final-v2-really3.zip` のようなファイル名でのバージョン管理
- 「いつ動かなくなったんだろう？何も変えてないのに！」（でも変えたのは自分だと分かっている）
- 「ファイルがロックされてる。月曜にあの人が戻るまでコピーで作業しよう。」
- 「v2 が入ってたメールってどれだっけ？先週の水曜のやつかな。」

### 「Git」バージョン管理とは？

Git は [分散型バージョン管理システム](https://en.wikipedia.org/wiki/Distributed_version_control) （※日本語版は[こちら](https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E7%AE%A1%E7%90%86%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0)ですが、元のWikiと若干記述内容が異なります）です。つまり、各開発者がプロジェクト履歴の完全なコピーを持ちます。これは、共有された場所に1つだけコピーがある集中型システムとは異なります。

これにより以下のような利点がもたらされます:

- オフラインでの作業 - ほとんどの操作はローカルで処理されます。
- 堅牢性の向上 - 分散されたコピーがバックアップとして機能します。
- 柔軟なワークフロー - 開発者は独自のプロセスやツールを使用できます。

### Git の使い方は？

Git は開発者のために開発者が作った [オープンソース](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%82%BD%E3%83%BC%E3%82%B9) ツールです。そのため、コミュニティは常にほとんどのニーズをカバーする機能を開発してきました。

例えば、コミュニティは Git をほぼすべての開発ワークフローに統合しています。いくつかの例を紹介します:

- **コマンドラインインターフェース（CLI）** - すべての機能の源である元祖ツール。
- **コードエディタ** - お気に入りのコーディングエディタ/ツールと連携。例:
  - Visual Studio Code
  - JetBrains IDE
  - Xcode
  - Emacs/VIM
- **ホスティングサービス** - 一元化された Git ホスト。Web ブラウザでのオンライン編集も可能。例:
  - GitHub
  - GitLab
  - Gitea
  - Azure DevOps
  - AWS CodeCommit
  - BitBucket
- **デスクトップアプリケーション** - 使いやすいグラフィカルインターフェース。例:
  - GitHub Desktop
  - Sourcetree
  - TortoiseGit
  - GitKraken
  - Git Butler
  - その他多数: https://git-scm.com/tools/guis

### ⌨️ アクティビティ: サンプルプロジェクトを開く

Git の練習を始めるために、まず設定済みの開発環境を開いてサンプルプロジェクトを確認しましょう。

1. 下のボタンを右クリックして、新しいタブで **Codespace の作成** ページを開きます。デフォルト設定を使用してください。

   [![GitHub Codespaces で開く](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

   > 🪧 **注意**: 通常、[GitHub Codespace](https://github.com/features/codespaces) にはリポジトリのコードと必要な設定がすべて自動的に含まれます。今回はゼロから練習できるよう、変更された環境になっています。

1. **Repository** フィールドがオリジナルではなく、自分のコピーであることを確認してから、緑色の **Create Codespace** ボタンをクリックします。

   - ✅ あなたのコピー: `/{{full_repo_name}}`
   - ❌ オリジナル: `/zen-gh-training/introduction-to-git`

1. ブラウザに Visual Studio Code が読み込まれるまで少し待ちます。

1. 左のナビゲーションタブで **ファイルエクスプローラー** を選択してファイルを表示します。`src/index.html` を右クリックして **プレビューを表示** を選択し、サンプルゲームの動作を確認します。

   > ❗️ **警告**: まだ変更を加えないでください！
   > バージョン管理はまだ追加していません！ 😱

   <img width="350px" src="https://github.com/user-attachments/assets/c5f60f24-27fb-4670-ab0a-c00aa723672c"/><br/>

   <img width="500px" src="https://github.com/user-attachments/assets/a20529f3-8e42-464b-8d84-b0880dd14383"/>

> [!TIP]
> ゲームを開いたまま、変更を加えながら何度でも試してみてください！ 🧑‍🚀

### ⌨️ アクティビティ 2: CLI で Git を使う

まずはコマンドラインインターフェース（CLI）で Git を使ってみましょう。これはすべての Git 機能の源であり、最も強力なオプションです。

1. 統合ターミナルがまだ表示されていない場合は、`Ctrl+Shift+P` を押して `View: Toggle Terminal` を検索・選択して開きます。

   <img width="500px" src="https://github.com/user-attachments/assets/4bbf918a-f87c-4875-b7fd-61d8b16a70e1"/>

1. Git がインストールされていることを確認するため、現在インストールされているバージョンを表示します。

   ```bash
   git --version
   ```

   <img width="500px" src="https://github.com/user-attachments/assets/0e09991b-829f-4028-b951-87bc5fa47bfc"/>

1. Git のヘルプドキュメントを表示します。

   ```bash
   git --help
   ```

   <img width="500px" src="https://github.com/user-attachments/assets/c447adf3-9cc1-4106-9a49-f2bf705d396c"/>

### ⌨️ アクティビティ 3: Git のユーザー情報を設定する

ゲームのバージョン管理を始める前に、Git にユーザー情報を設定して、変更の作成者として関連付けられるようにしましょう。

1. 表示名を設定します。

   ⚠️ `First` と `Last` を忘れずに置き換えてください！

   ```bash
   git config --global user.name "First Last"
   ```

1. メールアドレスを設定します。

   ⚠️ `me@example.com` を忘れずに置き換えてください！

   ```bash
   git config --global user.email "me@example.com"
   ```

1. 設定を表示して変更を確認します。

   ```bash
   git config --global --list
   ```

   <img width="500px" src="https://github.com/user-attachments/assets/62688039-3601-4a23-8f61-408210faff0a"/>

1. ユーザー情報の設定が完了したら、Mona がすでにあなたの作業を確認しているはずです。少し待ってコメントを見守ってください。進捗情報と次のステップが表示されます。

> [!TIP]
> 複数のアカウントを持っている場合、プロジェクトごとにユーザー名とメールアドレスを変更できます。**既存の** プロジェクトリポジトリでは、`--global` の代わりに `--local` を使用してください。

<details>
<summary>お困りですか？ 🤷</summary><br/>

- "First Last" と "me@example.com" を実際の情報に置き換えたことを確認してください。

</details>

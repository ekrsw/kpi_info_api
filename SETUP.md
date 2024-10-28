# WSL2の有効化とUbuntuのセットアップ

## WSL2のインストール
1. 管理者権限でコマンドプロンプトを開き、次のコマンドを実行。
```コマンドプロンプト
wsl --install
```
2. LinuxのUbuntuディストリビューションのダウンロードとインストールまでが自動で実行され、OS再起動を要求されます。要求に従いOSを再起動します。
3. OS再起動後、自動でUbuntuのインストールが始まります。完了するとユーザー名とパスワードの設定を求められるので、任意の値を入力します。
   ※ここで設定したパスワードは忘れないようにします。
4. 「x64 マシン用 WSL2 Linux カーネル更新プログラム パッケージ」をダウンロードして実行します。
   * x64 マシン用 WSL2 Linux カーネル更新プログラム パッケージ
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
5. 念の為OSを再起動しておきます。

## WSL2の有効化
管理者権限でコマンドプロンプトを開き、次のコマンドを実行。
```コマンドプロンプト
wsl --set-default-version 2
```

## WSL2用のUbuntuを手動セットアップ
コマンドラインから次のコマンドを実行して、UbuntuのWSL2向けディストリビューションをインストールします。
```コマンドプロンプト
wsl --install -d Ubuntu
```
ダウンロード処理が走るので、しばらく待ちます。
完了すると、WSL1とWSL2が同居した状態になります。
```コマンドプロンプト
C:\WINDOWS\system32>wsl --list -v
  NAME            STATE           VERSION
* Ubuntu-16.04    Stopped         1
  Ubuntu          Stopped         2
```
コマンドラインで単純に「wsl」と打った場合は、「*」がついているデフォルトのディストリビューションが起動します。
次のコマンドを実行して、デフォルトを先ほどインストールしたWSL2モードのUbuntuへ変更しておきます。
```コマンドプロンプト
wsl --set-default Ubuntu
```
最後に、WSL2で利用するディストリビューションを最新化するために、次のコマンドを実行します（この「最新化」はWSL2が対象です）。
```コマンドプロンプト
wsl --update
```
---
# Docker Desktopのインストール
次のURLページの案内（節「ダウンロード」のところ）にしたがって飛んだ先のページから
「Docker Desktop for Windows」をダウンロード・インストールします。
https://docs.docker.jp/docker-for-windows/wsl.html

誤って労働時間が記録されてしまったのを修正したいとき、手で計算するのは大変なので、なんとかするスクリプトです。

## Chrome Extension

```
cd chrome-extension
npm install
npm run build
```

chrome-extension/dist/webext-prod に出来上がるので Chrome Extension 管理画面の Load unpacked でロードする。

## ruby版の使い方
1. ラクローの客観的記録をブラウザからテキストファイルにコピー
2. 実態に合わせてコピーした記録を修正
3. ruby rakuro_calc.rb TEXTFILE

## サンプル
### 入力

```
10:00 ~ 16:59
17:01 ~ 17:11
17:32 ~ 17:41
18:16 ~ 18:51
```

### 出力
```
## 入力
               日中   深夜   翌日深夜
10:00 - 16:59  06:59  00:00  00:00
17:01 - 17:11  00:10  00:00  00:00
17:32 - 17:41  00:09  00:00  00:00
18:16 - 18:51  00:35  00:00  00:00

## 集計結果
始業時間    : 10:00
終業時間    : 18:51
日中        : 07:53
深夜        : 00:00
翌日深夜    : 00:00
労働時間合計: 07:53
休憩時間合計: 00:58
```

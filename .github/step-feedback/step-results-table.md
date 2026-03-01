{%- set all_passed = (results_table | selectattr("passed") | length) == (results_table | length) %}

{%- if all_passed %}

## ステップ {{ step_number }} - 合格 ✅

{%- else %}

## ステップ {{ step_number }} - 未達 ❌

{%- endif %}

{%- if all_passed %}
<img src="https://octodex.github.com/images/inflatocat.png" align="right" height="150px" alt="ステップ合格を示す Inflatocat" />
{%- else %}

<img src="https://octodex.github.com/images/spidertocat.png" align="right" height="100px" alt="ステップ未達を示す Spidertocat" />
一部のチェックが未達です。下の結果を確認して再チャレンジしてください。

バグを見つけて直しましょう！ 🤔
{%- endif %}

| 結果 | 内容 |
| ---- | ---- |

{%- for row in results_table %}
| {% if row.passed -%}✅ - 合格{%- else -%}❌ - 未達{%- endif %} | {{ row.description }} |
{%- endfor %}

{%- if tips and tips.length %}

### ヒント

{%- for tip in tips %}

- {{ tip }}
  {%- endfor %}

{%- endif %}

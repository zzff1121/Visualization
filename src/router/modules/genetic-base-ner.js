import Layout from '@/layout'

const helpInfo = `这里写开发相关的帮助,支持html格式，如:
<div class="section" id="id1">
<h1>命名实体识别<a class="headerlink" href="#id1" title="Permalink to this headline">¶</a></h1>
<p>命名实体识别（NER）是指识别文本中具有特定意义的实体，主要包括人名、地名、机构名、专有名词等。命名实体识别是信息提取、问答系统、句法分析、机器翻译等应用领域的重要基础工具，作为结构化信息提取的重要步骤。</p>
<p>在 BosonNLP NER 中，我们将识别以下类别的实体：</p>
<div class="wy-table-responsive"><table border="1" class="docutils">
<colgroup>
<col width="50%">
<col width="50%">
</colgroup>
<tbody valign="top">
<tr class="row-odd"><td>时间</td>
<td>time</td>
</tr>
<tr class="row-even"><td>地点</td>
<td>location</td>
</tr>
<tr class="row-odd"><td>人名</td>
<td>person_name</td>
</tr>
<tr class="row-even"><td>组织名</td>
<td>org_name</td>
</tr>
<tr class="row-odd"><td>公司名</td>
<td>company_name</td>
</tr>
<tr class="row-even"><td>产品名</td>
<td>product_name</td>
</tr>
<tr class="row-odd"><td>职位</td>
<td>job_title</td>
</tr>
</tbody>
</table></div>
<dl class="docutils">
<dt>URL</dt>
<dd><tt class="docutils literal"><span class="pre">http://api.bosonnlp.com/ner/analysis</span></tt></dd>
<dt>HTTP Method</dt>
<dd><tt class="docutils literal"><span class="pre">POST</span></tt></dd>
<dt>HTTP Header</dt>
<dd><dl class="first last docutils">
<dt><tt class="docutils literal"><span class="pre">Content-Type</span></tt></dt>
<dd><tt class="docutils literal"><span class="pre">application/json</span></tt></dd>
<dt><tt class="docutils literal"><span class="pre">Accept</span></tt></dt>
<dd><tt class="docutils literal"><span class="pre">application/json</span></tt></dd>
<dt><tt class="docutils literal"><span class="pre">X-Token</span></tt></dt>
<dd><tt class="docutils literal"><span class="pre">YOUR_API_TOKEN</span></tt> （需要替换成您自己的 Token）</dd>
</dl>
</dd>
<dt>HTTP query string 参数</dt>
<dd><dl class="first last docutils">
<dt><tt class="docutils literal"><span class="pre">sensitivity</span></tt></dt>
<dd>可选参数，用于调节准确率与召回率之间的平衡，取值为 <tt class="docutils literal"><span class="pre">1</span></tt> （覆盖更多实体）到 <tt class="docutils literal"><span class="pre">5</span></tt> （更准确）之间的整数，默认为 <tt class="docutils literal"><span class="pre">3</span></tt> 。</dd>
</dl>
</dd>
<dt>HTTP 请求 Body</dt>
<dd><p class="first">JSON 格式的需要做命名实体识别的文本或者文本组成的列表。比如：</p>
<p><tt class="docutils literal"><span class="pre">["\u6210\u90fd\u5546\u62a5\u8bb0\u8005</span> <span class="pre">\u59da\u6c38\u5fe0"]</span></tt></p>
<div class="last admonition note">
<p class="first admonition-title">Note</p>
<p class="last">我们限定了一次传入的文章数目不能超过100篇。</p>
</div>
</dd>
<dt>HTTP 返回 Body</dt>
<dd><p class="first">JSON 格式的实体识别引擎返回的结果。</p>
<div class="wy-table-responsive"><table border="1" class="docutils">
<colgroup>
<col width="25%">
<col width="21%">
<col width="54%">
</colgroup>
<tbody valign="top">
<tr class="row-odd"><td>key</td>
<td>type</td>
<td>说明</td>
</tr>
<tr class="row-even"><td>word</td>
<td>list</td>
<td>分词结果</td>
</tr>
<tr class="row-odd"><td>tag</td>
<td>list</td>
<td>词性标注结果</td>
</tr>
<tr class="row-even"><td>entity</td>
<td>list</td>
<td>命名实体结果</td>
</tr>
</tbody>
</table></div>
<p class="last">其中命名实体结果为一个三元组： <tt class="docutils literal"><span class="pre">(s,</span> <span class="pre">t,</span> <span class="pre">entity_type)</span></tt> ，表示 <tt class="docutils literal"><span class="pre">word[s:t]</span></tt> 的内容为类型 <tt class="docutils literal"><span class="pre">entity_type</span></tt> 的实体。</p>
</dd>
</dl>
<hr class="docutils">
</div>`

export default {
  path: '/genetic/base/ner',
  component: Layout,
  name: 'GeneticBaseNer',
  redirect: '/genetic/base/ner/entity',
  meta: {
    title: '命名实体',
    icon: 'fa-codepen'
  },
  children: [
    {
      path: 'entity',
      component: () => import('@/layout/developing'),
      name: 'GeneticBaseNerEntity',
      meta: {
        title: '实体识别',
        icon: 'fa-codepen',
        helpInfo
      }
    },
    {
      path: 'property',
      component: () => import('@/layout/developing'),
      name: 'GeneticBaseNerProperty',
      meta: { title: '实体属性识别', icon: 'fa-codepen' }
    }
  ]
}

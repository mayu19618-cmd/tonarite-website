/* PDFファイルを追加する場合は、下の空欄にURLかファイルパスを記入してください。
例: rules: "pdf/rules-and-about.pdf" / plan: "https://example.org/plan.pdf"
PDFファイルは pdf フォルダに入れてもOKです。 */
const PDF_LINKS = {
  rules: "",  // 団体規約・団体概要（1つのPDF）
  plan: "",   // 事業計画
  report: ""  // 収支報告
};
for (const [key, url] of Object.entries(PDF_LINKS)) {
  const container = document.querySelector(`[data-pdf="${key}"]`);
  if (!container || !url || !/^(https:\/\/|(?:\.\/)?pdf\/)[^\s]+\.pdf(?:[?#].*)?$/i.test(url)) continue;
  const a=document.createElement('a');a.className='disclosure-button';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='PDFを見る・ダウンロード ↗';
  container.replaceChildren(a);
}

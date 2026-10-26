(()=>{
const data=window.TONARITE_ARTICLES||[];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cards=items=>items.map(x=>`<a class="article-card" href="article.html?id=${encodeURIComponent(x.id)}"><img src="${esc(x.image)}" alt="" loading="lazy"><div class="article-card-copy"><span class="article-category">${esc(x.category)}</span><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><span class="article-next">記事を読む ↗</span></div></a>`).join('');
const page=document.body.dataset.page,app=document.getElementById('app');
const warning='<p class="article-demo-note">掲載記事はデザイン確認用のサンプルです。実際の活動報告や支援実績ではありません。</p>';
function paint(){
 const lang=document.getElementById('lang')?.value||'ja';
 const localizedTitle={ja:'活動報告・コラム',en:'News & Stories',es:'Noticias y artículos',zh:'活动报道与专栏'}[lang]||'活動報告・コラム';
 const nav=document.querySelector('.nav-articles');if(nav)nav.textContent=localizedTitle;
 if(page==='index'){const target=document.getElementById('latest-articles');if(target){document.querySelector('.news-heading h2').textContent=localizedTitle;target.innerHTML=cards(data.slice(0,3));}return;}
 if(page==='articles'){app.innerHTML=`<div class="page-title"><h1>${localizedTitle}</h1></div><div class="container article-list"><p class="article-lead">となりての活動や、日々の暮らしを支える取り組みをご紹介します。</p>${warning}<div class="article-filter" aria-label="カテゴリー"><button type="button" data-cat="すべて" class="active">すべて</button>${[...new Set(data.map(x=>x.category))].map(cat=>`<button type="button" data-cat="${esc(cat)}">${esc(cat)}</button>`).join('')}</div><div class="article-grid" id="article-list-cards">${cards(data)}</div></div>`;
 app.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{app.querySelectorAll('[data-cat]').forEach(x=>x.classList.toggle('active',x===b));const cat=b.dataset.cat;app.querySelector('#article-list-cards').innerHTML=cards(cat==='すべて'?data:data.filter(x=>x.category===cat));}));return;
 }
 if(page==='article'){
 const id=new URLSearchParams(location.search).get('id');const item=data.find(x=>x.id===id);
 if(!item){app.innerHTML='<div class="container"><h1>記事が見つかりません</h1><p><a href="articles.html">記事一覧へ戻る</a></p></div>';return;}
 document.title=item.title+' | となりて';app.innerHTML=`<article class="article-detail"><a class="article-back" href="articles.html">← 活動報告・コラムに戻る</a><p class="article-category">${esc(item.category)}</p><h1>${esc(item.title)}</h1><img class="article-feature-image" src="${esc(item.image)}" alt="水彩イラスト"><div class="article-content">${item.body.map(p=>`<p>${esc(p)}</p>`).join('')}</div>${warning}<a class="article-back" href="articles.html">← 記事一覧に戻る</a></article>`;
 }
}
paint();document.getElementById('lang')?.addEventListener('change',paint);
})();
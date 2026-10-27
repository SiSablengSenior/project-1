(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const STORE = 'sisablengsenior-ops-demo-v1';
  const initial = {username:'admin',password:'demo1234',displayName:'Administrator',apiOn:false,apiKey:'',logs:[],history:[]};
  let state = load(); let toastTimer;
  function load(){try{return {...initial,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch{return {...initial}}}
  function save(){localStorage.setItem(STORE,JSON.stringify(state));render()}
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.add('hidden'),3000)}
  function log(action,object,status='DEMO'){state.logs.unshift({time:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),date:new Date().toLocaleDateString('id-ID'),action,object,status});state.logs=state.logs.slice(0,100);save()}
  const controllers=[
    ['Remote verifikasi nopol','Periksa format dan catat simulasi validasi.','⌕','blue-bg','Validasi format'],
    ['Reset data biasa nopol akun perorangan','Alur demo reset data biasa untuk akun perorangan.','↺','lime-bg','Simulasikan'],
    ['Reset data gantung nopol akun perorangan','Alur demo reset data gantung akun perorangan.','↻','yellow-bg','Simulasikan'],
    ['Reset data nopol akun perusahaan','Alur demo reset nopol akun perusahaan.','▤','pink-bg','Simulasikan'],
    ['Buka blokir permanen nopol','Simulasi alur permohonan peninjauan blokir.','⌁','lime-bg','Simulasikan'],
    ['Blokir permanen nopol','Simulasi alur review blokir. Tidak mengubah akun eksternal.','⊘','pink-bg','Simulasikan'],
    ['Hapus akun perorangan','Simulasi alur review penghapusan akun.','⌫','yellow-bg','Simulasikan'],
    ['Hapus akun perusahaan','Simulasi alur review penghapusan perusahaan.','▣','blue-bg','Simulasikan']
  ];
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function renderController(){ $('#controllerGrid').innerHTML=controllers.map((c,i)=>`<article class="controller-card"><span class="quick-icon ${c[3]}">${c[2]}</span><h3>${c[0]}</h3><p>${c[1]}</p><button class="btn btn-light" data-controller="${i}">${c[4]} ↗</button></article>`).join('') }
  function logsHTML(logs){return logs.length?logs.slice(0,8).map(x=>`<div class="log-entry"><span class="log-time">${escapeHtml(x.time)}</span><div><b>${escapeHtml(x.action)}</b><small>${escapeHtml(x.object)} · ${escapeHtml(x.date)}</small></div><span class="log-status">${escapeHtml(x.status)}</span></div>`).join(''):'<div class="empty-state">Belum ada aktivitas. Coba verifikasi demo.</div>'}
  function render(){
    $('#sideApiStatus').textContent=state.apiOn?'ON':'OFF';$('#sideApiStatus').className='status-text '+(state.apiOn?'on':'off');$('#topApiStatus').className='api-pill '+(state.apiOn?'on':'off');$('#topApiStatus').innerHTML=`<i></i> API ${state.apiOn?'ON':'OFF'}`;$('#statApi').textContent=state.apiOn?'ON':'OFF';$('#footerStatus').textContent='API '+(state.apiOn?'ON':'OFF');
    $('#statTotal').textContent=state.logs.length;$('#statValid').textContent=state.logs.filter(x=>x.action.toLowerCase().includes('validasi')||x.action.toLowerCase().includes('verifikasi')).length;$('#statActions').textContent=state.logs.filter(x=>x.action.toLowerCase().includes('simulasi')).length;
    $('#dashboardLogs').innerHTML=logsHTML(state.logs);$('#allLogs').innerHTML=state.logs.length?state.logs.map(x=>`<div class="log-entry"><span class="log-time">${escapeHtml(x.time)}</span><div><b>${escapeHtml(x.action)}</b><small>${escapeHtml(x.object)} · ${escapeHtml(x.date)}</small></div><span class="log-status">${escapeHtml(x.status)}</span></div>`).join(''):'<div class="empty-state">Belum ada aktivitas.</div>';
    $('#sideUser').textContent=state.username;$('#topUser').textContent=state.username;$('#displayName').value=state.displayName;$('#newUsername').value=state.username;$('#apiToggle').checked=state.apiOn;$('#apiKey').value=state.apiKey;
  }
  function showView(name){$$('.view').forEach(v=>v.classList.add('hidden'));$('#view-'+name).classList.remove('hidden');$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===name));const titles={dashboard:'Dashboard',controller:'Data Controller',settings:'Pengaturan',activity:'Aktivitas'};$('#pageTitle').innerHTML=`${titles[name]} <span class="title-star">✳</span>`;if(name==='settings'){$('#profileQuick').blur()};window.scrollTo({top:0,behavior:'smooth'})}
  function enterApp(){ $('#loginScreen').classList.add('hidden');$('#app').classList.remove('hidden');$('#welcomeName').textContent=state.username;$('#welcomeModal').classList.remove('hidden');$('#dateLabel').textContent='OPS / '+new Date().toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();render(); }
  $('#loginForm').addEventListener('submit',e=>{e.preventDefault();const u=$('#username').value.trim();const p=$('#password').value;if(u===state.username&&p===state.password){enterApp();}else toast('Login demo gagal. Periksa username dan password.');});
  $('#continueBtn').addEventListener('click',()=>$('#welcomeModal').classList.add('hidden'));$('#closeWelcome').addEventListener('click',()=>$('#welcomeModal').classList.add('hidden'));
  $('#logoutBtn').addEventListener('click',()=>{ $('#app').classList.add('hidden');$('#loginScreen').classList.remove('hidden');$('#password').value='';toast('Anda keluar dari sesi demo.'); });
  $('#nav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)showView(b.dataset.view)});document.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b&&!b.closest('#nav'))showView(b.dataset.view)});$('#profileQuick').addEventListener('click',()=>showView('settings'));
  $('#plateForm').addEventListener('submit',e=>{e.preventDefault();const plate=$('#plate').value.trim().toUpperCase().replace(/\s+/g,' ');const valid=/^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{1,3}$/.test(plate);$('#verifyResult').className='result-box '+(valid?'success':'');$('#verifyResult').textContent=valid?`Format nopol “${plate}” tampak sesuai pola umum. Ini hanya validasi format lokal, bukan verifikasi database resmi.`:`Format “${plate}” belum cocok dengan pola umum. Periksa kembali input; ini bukan pemeriksaan ke data resmi.`;log('Validasi format nopol',plate,valid?'FORMAT OK':'PERIKSA INPUT');});
  $('#controllerGrid').addEventListener('click',e=>{const b=e.target.closest('[data-controller]');if(!b)return;const plate=$('#plate').value.trim().toUpperCase().replace(/\s+/g,' ');if(!plate){toast('Masukkan nopol pada bagian verifikasi terlebih dahulu.');$('#plate').focus();return;}const c=controllers[Number(b.dataset.controller)];if(!confirm(`Jalankan simulasi “${c[0]}” untuk ${plate}? Tidak ada perubahan ke sistem eksternal.`))return;log('Simulasi: '+c[0],plate,'DEMO ONLY');toast('Simulasi dicatat lokal. Tidak ada tindakan eksternal yang dijalankan.');});
  $('#apiToggle').addEventListener('change',e=>{state.apiOn=e.target.checked;save();toast(`Indikator API ${state.apiOn?'ON (hijau)':'OFF (merah)'}. Ini bukan koneksi API nyata.`)});
  $('#revealKey').addEventListener('click',()=>{$('#apiKey').type=$('#apiKey').type==='password'?'text':'password';$('#revealKey').textContent=$('#apiKey').type==='password'?'Lihat':'Sembunyikan'});
  $('#saveApi').addEventListener('click',()=>{state.apiOn=$('#apiToggle').checked;state.apiKey=$('#apiKey').value;save();log('Simpan pengaturan API demo',state.apiOn?'API ON':'API OFF');toast('Pengaturan demo disimpan di browser ini.');});
  $('#profileForm').addEventListener('submit',e=>{e.preventDefault();const u=$('#newUsername').value.trim();if(!u){toast('Username tidak boleh kosong.');return}state.username=u;state.displayName=$('#displayName').value.trim()||u;if($('#newPassword').value)state.password=$('#newPassword').value;$('#newPassword').value='';save();log('Perbarui profil demo',u);toast('Profil demo disimpan di browser ini.');});
  $('#clearLogs').addEventListener('click',()=>{if(confirm('Hapus seluruh riwayat lokal di browser ini?')){state.logs=[];save();toast('Riwayat lokal dibersihkan.')}});
  renderController();render();
})();

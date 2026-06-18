(function () {
  var SESSION_KEY = 'chatbot_script_url';

  function loadScript(url) {
    var s = document.createElement('script');
    s.src = url;
    document.head.appendChild(s);
  }

  function showModal() {
    var overlay = document.createElement('div');
    overlay.id = 'chatbot-url-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'background:rgba(0,0,0,0.5)',
      'backdrop-filter:blur(8px)', '-webkit-backdrop-filter:blur(8px)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'z-index:99999', 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'
    ].join(';');

    var box = document.createElement('div');
    box.style.cssText = [
      'background:#fff', 'border-radius:12px', 'padding:32px',
      'width:460px', 'max-width:90vw', 'box-shadow:0 8px 32px rgba(0,0,0,0.2)'
    ].join(';');

    box.innerHTML = [
      '<p style="font-size:11px;font-weight:700;color:#888;margin-bottom:8px;letter-spacing:.05em;">CHATBOT SETUP</p>',
      '<h2 style="font-size:18px;margin-bottom:8px;color:#1a1a2e;">スクリプトURLを入力してください</h2>',
      '<p style="font-size:13px;color:#666;margin-bottom:20px;line-height:1.6;">',
        '入力したURLはこのブラウザセッション内にのみ保存されます。<br>',
        'タブを閉じると自動的に削除されます。',
      '</p>',
      '<input id="chatbot-url-input" type="url" placeholder="https://xxxx/xxxx.js"',
        ' style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:8px;',
        'font-size:14px;outline:none;box-sizing:border-box;margin-bottom:8px;" />',
      '<p id="chatbot-url-error" style="font-size:12px;color:#c62828;margin-bottom:12px;min-height:16px;"></p>',
      '<button id="chatbot-url-submit"',
        ' style="width:100%;padding:12px;background:#1a1a2e;color:#fff;border:none;',
        'border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;">',
        '設定して確認する',
      '</button>'
    ].join('');

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    var input = document.getElementById('chatbot-url-input');
    var error = document.getElementById('chatbot-url-error');
    var btn   = document.getElementById('chatbot-url-submit');

    input.focus();

    btn.addEventListener('click', function () {
      var url = input.value.trim();
      if (!url) {
        error.textContent = 'URLを入力してください。';
        return;
      }
      if (!/^https?:\/\/.+/.test(url)) {
        error.textContent = '正しいURL形式で入力してください（https://...）';
        return;
      }
      sessionStorage.setItem(SESSION_KEY, url);
      overlay.remove();
      loadScript(url);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });
  }

  var saved = sessionStorage.getItem(SESSION_KEY);
  if (saved) {
    loadScript(saved);
  } else {
    document.addEventListener('DOMContentLoaded', showModal);
  }
})();

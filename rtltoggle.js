document.addEventListener('DOMContentLoaded', () => {
    const rtlToggle = document.querySelector('.rtl-toggle');
    const html = document.documentElement;

    const savedDir = localStorage.getItem('aurum-dir') || 'ltr';
    html.setAttribute('dir', savedDir);
    updateRtlLabel(savedDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            html.setAttribute('dir', newDir);
            localStorage.setItem('aurum-dir', newDir);
            updateRtlLabel(newDir);
        });
    }

    function updateRtlLabel(dir) {
        if (!rtlToggle) return;
        rtlToggle.innerText = dir === 'ltr' ? 'RTL' : 'LTR';
    }
});

/* leave-tracker.js */

// --- Constants & Keys ---
const STORE_KEY = 'attendance_records_v1';
const EMPLOYEES_KEY = 'employees_dataset_v1';
const THEME_KEY = 'attendance_theme_v1';
const DEFAULT_AVATAR_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5YWE0YjIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItY2lyY2xlIj48cGF0aCBkPSJNMjAgMjF2LTJjMC0yLjItMy42LTMuNS04LTMuNXMtOCAxLjMtOCAzLjV2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg==`;

// --- DOM Elements ---
const leaveAccountFilter = document.getElementById('leaveAccountFilter');
const leaveMonthSelect = document.getElementById('leaveMonthSelect');
const leaveYearSelect = document.getElementById('leaveYearSelect');
const leaveBoard = document.getElementById('leaveBoard');
const backToDashBtn = document.getElementById('backToDashBtn');

// Edit Modal Elements
const editLeaveModal = document.getElementById('editLeaveModal');
const editLeaveAgentName = document.getElementById('editLeaveAgentName');
const editLeaveHireDate = document.getElementById('editLeaveHireDate'); 
const editLeaveMonthDisplay = document.getElementById('editLeaveMonthDisplay');
const existingLeavesList = document.getElementById('existingLeavesList');
const closeEditLeaveModalBtn = document.getElementById('closeEditLeaveModal');
const editLeaveModalBackdrop = document.getElementById('editLeaveModalBackdrop');
const newLeaveDateInput = document.getElementById('newLeaveDate');
const newLeaveTypeSelect = document.getElementById('newLeaveType');
const addLeaveBtn = document.getElementById('addLeaveBtn');

// Settings Elements
const radioRegular = document.querySelector('input[name="empStatus"][value="Regular"]');
const radioProbationary = document.querySelector('input[name="empStatus"][value="Probationary"]');
const regularOptions = document.getElementById('regularOptions');
const probationaryOptions = document.getElementById('probationaryOptions');
const elDeductionSelect = document.getElementById('elDeductionSelect');
const creditsDisplay = document.getElementById('creditsDisplay');

// Global Stats
const totalVlEl = document.getElementById('totalVl');
const totalSlEl = document.getElementById('totalSl');
const totalElEl = document.getElementById('totalEl');
const totalAbsEl = document.getElementById('totalAbs');
const yearHeaderDisplay = document.getElementById('yearHeaderDisplay');
const themeToggleBtn = document.getElementById('theme-toggle');

// --- State ---
let employees = [];
let records = [];
let state = {
    account: '',
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    editingAgent: null
};

// --- Init ---
function init() {
    initTheme();
    loadData();
    setupFilters();
    initHotkeys();
    setupModalListeners();
    renderBoard();
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function loadData() {
    try {
        employees = JSON.parse(localStorage.getItem(EMPLOYEES_KEY) || '[]');
        records = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    } catch (e) { console.error(e); }
}

function saveData() {
    localStorage.setItem(STORE_KEY, JSON.stringify(records));
}

function saveEmployeeData() {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
}
function openPopup(e) {
  e.preventDefault();
  window.open(e.currentTarget.href, 'popupWindow', 'width=500,height=960,scrollbars=yes,resizable=yes');
}

// --- Hotkeys ---
function initHotkeys() {
    document.addEventListener('keydown', (e) => {
        if (e.target.matches('input, select, textarea')) return;
        if (document.body.classList.contains('modal-active')) return;
        if (!e.altKey) return;

        let handled = false;
        switch(e.key) {
            case '1': backToDashBtn.click(); handled = true; break;
            case '`': state.account = ''; leaveAccountFilter.value = ''; renderBoard(); handled = true; break;                
            case 't': themeToggleBtn.click(); handled = true; break;
            case 'ArrowLeft': changeSelectIndex(leaveAccountFilter, -1); state.account = leaveAccountFilter.value; renderBoard(); handled = true; break;
            case 'ArrowRight': changeSelectIndex(leaveAccountFilter, 1); state.account = leaveAccountFilter.value; renderBoard(); handled = true; break;
            case 'ArrowUp': changeSelectIndex(leaveMonthSelect, -1); state.month = parseInt(leaveMonthSelect.value); renderBoard(); handled = true; break;
            case 'ArrowDown': changeSelectIndex(leaveMonthSelect, 1); state.month = parseInt(leaveMonthSelect.value); renderBoard(); handled = true; break;
            case ',': changeSelectIndex(leaveYearSelect, -1); state.year = parseInt(leaveYearSelect.value); renderBoard(); handled = true; break;
            case '.': changeSelectIndex(leaveYearSelect, 1); state.year = parseInt(leaveYearSelect.value); renderBoard(); handled = true; break;
        }
        if (handled) e.preventDefault();
    });
}

function changeSelectIndex(selectParams, direction) {
    const opts = selectParams.options;
    let newIndex = selectParams.selectedIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= opts.length) newIndex = opts.length - 1;
    selectParams.selectedIndex = newIndex;
}

// --- Theme ---
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
}
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-toggle-light').classList.add('hidden');
        document.getElementById('theme-toggle-dark').classList.remove('hidden');
    } else {
        document.body.classList.remove('light-theme');
        document.getElementById('theme-toggle-light').classList.remove('hidden');
        document.getElementById('theme-toggle-dark').classList.add('hidden');
    }
}
themeToggleBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
});

// --- Filters ---
function setupFilters() {
    leaveAccountFilter.innerHTML = '<option value="">-- All Accounts --</option>';
    const accounts = [...new Set(employees.map(e => e.account))].filter(Boolean).sort((a, b) => a.localeCompare(b));
    accounts.forEach(acc => {
        const opt = document.createElement('option');
        opt.value = acc; opt.textContent = acc;
        leaveAccountFilter.appendChild(opt);
    });

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((m, i) => {
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = m;
        if (i === state.month) opt.selected = true;
        leaveMonthSelect.appendChild(opt);
    });

    const currentY = new Date().getFullYear();
    [currentY - 1, currentY, currentY + 1].forEach(y => {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y;
        if (y === state.year) opt.selected = true;
        leaveYearSelect.appendChild(opt);
    });

    leaveAccountFilter.addEventListener('change', (e) => { state.account = e.target.value; renderBoard(); });
    leaveMonthSelect.addEventListener('change', (e) => { state.month = parseInt(e.target.value); renderBoard(); });
    leaveYearSelect.addEventListener('change', (e) => { state.year = parseInt(e.target.value); renderBoard(); });
    backToDashBtn.addEventListener('click', () => window.location.href = 'index.html');

    // Title Click -> Reset to Dashboard
    const appTitle = document.getElementById('appTitle');
    if(appTitle) {
        appTitle.addEventListener('click', () => {
            state.account = '';
            leaveAccountFilter.value = '';
            renderBoard();
        });
    }
}

// --- Logic ---

// Helper: Determine Status based on Hired Date vs Current View Year
function getCalculatedStatus(hireDateStr, viewingYear) {
    if (!hireDateStr) return 'Probationary'; 

    const hireDate = new Date(hireDateStr);
    if (isNaN(hireDate.getTime())) return 'Probationary';

    // Calculate Regularization Date (Hire + 6 Months)
    const regDate = new Date(hireDate);
    regDate.setMonth(regDate.getMonth() + 6);

    // Compare to Jan 1st of the viewing year
    const startOfYear = new Date(viewingYear, 0, 1);

    if (regDate > startOfYear) {
        return 'Probationary';
    } else {
        return 'Regular';
    }
}

function getAgentLeaveStats(agentName) {
    const stats = { vl: 0, sl: 0, el: 0, absent: 0, details: [] };
    const agentRecords = records.filter(r => r.name === agentName);
    
    agentRecords.forEach(r => {
        if (!r.date) return;
        const [m, d, y] = r.date.split('/');
        const recY = parseInt(y) + 2000;
        const recM = parseInt(m) - 1;

        if (recY === state.year && recM === state.month) {
            const st = (r.status || '').toLowerCase();
            if (st === 'vl') stats.vl++;
            else if (st === 'sl') stats.sl++;
            else if (st === 'el') stats.el++;
            else if (st === 'absent') stats.absent++;
            
            if(['vl','sl','el','absent'].includes(st)) {
                stats.details.push({ ...r, dateObj: new Date(recY, recM, d) });
            }
        }
    });
    stats.details.sort((a,b) => a.dateObj - b.dateObj);
    return stats;
}

window.setAccountFilter = function(accountName) {
    const currentValue = leaveAccountFilter.value;
    const newValue = (currentValue === accountName) ? "" : accountName;
    leaveAccountFilter.value = newValue;
    leaveAccountFilter.dispatchEvent(new Event('change'));
}

// --- CALCULATE CREDITS LOGIC ---
function calculateAgentCredits(agentName) {
    const agent = employees.find(e => e.name === agentName);
    
    // UPDATED: If no agent or NO HIRE DATE, return empty to hide section
    if (!agent || !agent.hireDate) return { html: '', text: '' };

    // Get ALL records for current YEAR
    const yearRecords = records.filter(r => {
        if (r.name !== agentName) return false;
        const [m, d, y] = r.date.split('/');
        return (parseInt(y) + 2000) === state.year;
    });

    // Usage Tally
    let usedVL = 0, usedSL = 0, usedEL = 0;
    yearRecords.forEach(r => {
        const s = (r.status || '').toUpperCase();
        if (s === 'VL') usedVL++;
        else if (s === 'SL') usedSL++;
        else if (s === 'EL') usedEL++;
    });

    // Determine status dynamically
    const status = getCalculatedStatus(agent.hireDate, state.year);

    if (status === 'Regular') {
        const deduction = agent.elDeduction || 'LWOP';
        let totalVL = 8;
        let totalSL = 7;

        if (deduction === 'VL') usedVL += usedEL;
        else if (deduction === 'SL') usedSL += usedEL;

        const remVL = totalVL - usedVL;
        const remSL = totalSL - usedSL;

        const str = `Annual Leave Credits &mdash; VL: <b>${remVL}</b> &nbsp;|&nbsp; SL: <b>${remSL}</b>`;
        return { html: str, text: `Annual Leave Credits - VL: ${remVL} | SL: ${remSL}` };

    } else {
        const hireDateStr = agent.hireDate; 
        let accruedMonths = 0;

        if (hireDateStr) {
            const hiredDate = new Date(hireDateStr);
            const today = new Date();
            
            const diffYears = today.getFullYear() - hiredDate.getFullYear();
            const diffMonths = today.getMonth() - hiredDate.getMonth();
            
            let totalMonthsPassed = (diffYears * 12) + diffMonths;
            if (today.getDate() < hiredDate.getDate()) {
                totalMonthsPassed--;
            }
            if (totalMonthsPassed < 0) totalMonthsPassed = 0;
            accruedMonths = totalMonthsPassed;
        }

        const totalAccrued = (accruedMonths * 1.25);
        const totalUsed = usedVL + usedSL + usedEL;
        const remaining = totalAccrued - totalUsed;
        const remDisplay = Math.round(remaining * 100) / 100;

        const str = `Accrued Leave Credits: <b>${remDisplay}</b>`;
        return { html: str, text: `Accrued Leave Credits: ${remDisplay}` };
    }
}

// --- Rendering ---
function renderBoard() {
    yearHeaderDisplay.textContent = `${leaveMonthSelect.options[state.month].text} ${state.year}`;
    
    let filtered = employees;
    if (state.account) filtered = employees.filter(e => e.account === state.account);

    let gVl = 0, gSl = 0, gEl = 0, gAbs = 0;
    const accountsMap = {};

    filtered.forEach(emp => {
        if (!emp.name) return;
        const stats = getAgentLeaveStats(emp.name);
        gVl += stats.vl; gSl += stats.sl; gEl += stats.el; gAbs += stats.absent;
        
        if (!accountsMap[emp.account]) accountsMap[emp.account] = [];
        accountsMap[emp.account].push({ ...emp, stats });
    });

    totalVlEl.textContent = gVl; totalSlEl.textContent = gSl;
    totalElEl.textContent = gEl; totalAbsEl.textContent = gAbs;

    leaveBoard.innerHTML = '';
    
    const isSingleView = !!state.account;

    if (isSingleView) leaveBoard.classList.add('single-view');
    else leaveBoard.classList.remove('single-view');

    const sortedAccs = Object.keys(accountsMap).sort((a, b) => a.localeCompare(b));

    if (sortedAccs.length === 0) {
        leaveBoard.innerHTML = `<div class="empty-state" style="text-align:center;padding:40px;color:var(--muted);">No data.</div>`;
        return;
    }

    sortedAccs.forEach(acc => {
        const agents = accountsMap[acc];
        
        let accVl = 0, accSl = 0, accEl = 0, accAbs = 0;
        agents.forEach(a => {
            accVl += a.stats.vl; accSl += a.stats.sl; accEl += a.stats.el; accAbs += a.stats.absent;
        });

        agents.sort((a,b) => {
            const totA = a.stats.vl + a.stats.sl + a.stats.el + a.stats.absent;
            const totB = b.stats.vl + b.stats.sl + b.stats.el + b.stats.absent;
            if (totB !== totA) return totB - totA;
            return a.name.localeCompare(b.name);
        });

        const previewLimit = 6;
        const visibleAgents = isSingleView ? agents : agents.slice(0, previewLimit);
        
        const agentRows = visibleAgents.map(agent => {
            const s = agent.stats;
            const img = agent.imageUrl || DEFAULT_AVATAR_SVG;
            const role = agent.role || 'No Role';
            const box = (lbl, val, cls) => `<div class="stat-box ${cls} ${val === 0 ? 'is-zero' : ''}"><span>${lbl}</span><b>${val}</b></div>`;
            
            const creditData = calculateAgentCredits(agent.name);
            
            // UPDATED: Only render the credits div if data exists (hire date is set)
            const creditHtml = (isSingleView && creditData.html) 
                ? `<div class="row-credits">${creditData.html}</div>` 
                : ''; 

            return `
                <div class="agent-leave-row" onclick="event.stopPropagation(); openEditLeaveModal('${escapeHtml(agent.name)}')">
                    <img src="${img}" class="row-avatar" onerror="this.src='${DEFAULT_AVATAR_SVG}'">
                    <div class="row-info">
                        <div class="row-text-stack">
                            <div class="row-name">${escapeHtml(agent.name)}</div>
                            <div class="row-role">${escapeHtml(role)}</div>
                        </div>
                        ${creditHtml}
                    </div>
                    <div class="row-stats">
                        ${box('VL', s.vl, 'vl')} ${box('SL', s.sl, 'sl')} ${box('EL', s.el, 'el')} ${box('LWOP', s.absent, 'lwop')}
                    </div>
                </div>`;
        }).join('');

        const footerText = (!isSingleView && agents.length > previewLimit) 
            ? `<div style="text-align:center; font-size:10px; color:var(--muted); padding:5px;">+${agents.length - previewLimit} more (Click to Expand)</div>` 
            : '';

        const headerTitleDisplay = isSingleView 
            ? `${escapeHtml(acc)} <span style='margin-left:10px; font-size:12px; opacity:0.6; font-weight:400;'>✕ Close</span>`
            : `<span>${escapeHtml(acc)}</span>`;

        const cardClickAction = !isSingleView ? `onclick="setAccountFilter('${escapeHtml(acc)}')"` : '';
        const headerClickAction = isSingleView ? `onclick="event.stopPropagation(); setAccountFilter('${escapeHtml(acc)}');"` : ''; 

        const cardHtml = `
            <div class="accountCard" ${cardClickAction}>
                <div class="accountTitle" ${headerClickAction}>
                    ${headerTitleDisplay}
                    <div class="acc-header-stats">
                        <span class="ahs-item ahs-vl">VL:${accVl}</span>
                        <span class="ahs-item ahs-sl">SL:${accSl}</span>
                        <span class="ahs-item ahs-el">EL:${accEl}</span>
                        <span class="ahs-item ahs-abs">Abs:${accAbs}</span>
                    </div>
                </div>
                <div class="agentList">
                    ${agentRows}
                    ${footerText}
                </div>
            </div>
        `;
        leaveBoard.innerHTML += cardHtml;
    });
}

// --- Employee Settings & Modal ---

function setupModalListeners() {
    closeEditLeaveModalBtn.addEventListener('click', closeEditLeaveModal);
    editLeaveModalBackdrop.addEventListener('click', closeEditLeaveModal);

    const radios = document.querySelectorAll('input[name="empStatus"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateModalUI(e.target.value);
            updateEmployeeSettings();
        });
    });

    elDeductionSelect.addEventListener('change', updateEmployeeSettings);
}

function updateModalUI(status) {
    if (status === 'Regular') {
        regularOptions.classList.remove('hidden');
        probationaryOptions.classList.add('hidden');
    } else {
        regularOptions.classList.add('hidden');
        probationaryOptions.classList.remove('hidden');
    }
    updateCreditsDisplayInModal();
}

function updateEmployeeSettings() {
    const agentIndex = employees.findIndex(e => e.name === state.editingAgent);
    if (agentIndex > -1) {
        const isRegular = radioRegular.checked;
        employees[agentIndex].employmentStatus = isRegular ? 'Regular' : 'Probationary';
        employees[agentIndex].elDeduction = elDeductionSelect.value;
        
        saveEmployeeData();
        updateCreditsDisplayInModal();
        renderBoard();
    }
}

function updateCreditsDisplayInModal() {
    const data = calculateAgentCredits(state.editingAgent);
    if(creditsDisplay) creditsDisplay.innerHTML = data.html;
}

window.openEditLeaveModal = function(agentName) {
    state.editingAgent = agentName;
    editLeaveAgentName.textContent = agentName;
    editLeaveMonthDisplay.textContent = leaveMonthSelect.options[state.month].text;
    
    const agent = employees.find(e => e.name === agentName);
    if (agent) {
        const hired = agent.hireDate || 'No Date Set'; 
        const deduction = agent.elDeduction || 'LWOP';
        
        // Auto-select status based on Hire Date
        const computedStatus = getCalculatedStatus(agent.hireDate, state.year);
        
        // Update UI Radios
        if (computedStatus === 'Regular') radioRegular.checked = true;
        else radioProbationary.checked = true;

        updateModalUI(computedStatus);

        // Standard Fields
        editLeaveHireDate.textContent = `Hired: ${hired}`;
        elDeductionSelect.value = deduction;
    }

    renderExistingLeaves();
    editLeaveModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-active');
};

function closeEditLeaveModal() {
    editLeaveModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-active');
    state.editingAgent = null;
}

function renderExistingLeaves() {
    const stats = getAgentLeaveStats(state.editingAgent);
    existingLeavesList.innerHTML = '';
    if (stats.details.length === 0) {
        existingLeavesList.innerHTML = `<div style="color:var(--muted); font-size:11px; text-align:center;">No leaves found for this month.</div>`;
        return;
    }
    stats.details.forEach(rec => {
        const div = document.createElement('div');
        div.className = 'leave-item';
        div.innerHTML = `<span><b>${rec.date}</b> &mdash; ${rec.status}</span><button class="btn btn-sm-del" onclick="deleteLeave('${rec.date}')">Remove</button>`;
        existingLeavesList.appendChild(div);
    });
}

window.deleteLeave = function(dateStr) {
    if (!confirm(`Remove ${dateStr} leave record?`)) return;
    const idx = records.findIndex(r => r.name === state.editingAgent && r.date === dateStr);
    if (idx > -1) {
        records.splice(idx, 1);
        saveData();
        renderExistingLeaves();
        renderBoard();
        updateCreditsDisplayInModal();
    }
};

addLeaveBtn.addEventListener('click', () => {
    const dateVal = newLeaveDateInput.value;
    const typeVal = newLeaveTypeSelect.value;
    if (!dateVal) { alert("Select date."); return; }
    
    const [y, m, d] = dateVal.split('-');
    const formattedDate = `${m}/${d}/${y.slice(-2)}`;
    
    const agent = employees.find(e => e.name === state.editingAgent);
    if (!agent) return;

    const idx = records.findIndex(r => r.name === state.editingAgent && r.date === formattedDate);
    const newRecord = {
        name: agent.name, account: agent.account, role: agent.role,
        status: typeVal, date: formattedDate, timeIn: '', timeOut: '', notes: 'Added via Leave Tracker'
    };

    if (idx > -1) {
        if (!confirm(`Overwrite record for ${formattedDate}?`)) return;
        records[idx] = newRecord;
    } else {
        records.push(newRecord);
    }
    saveData();
    newLeaveDateInput.value = '';
    renderExistingLeaves();
    renderBoard();
    updateCreditsDisplayInModal();
});

// --- Utils ---
function escapeHtml(text) {
    if (!text) return text;
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function updateDateTime() {
    const now = new Date();
    const d = document.getElementById('currentDate');
    const t = document.getElementById('currentTime');
    if(d) d.textContent = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    if(t) t.textContent = now.toLocaleTimeString();
}

init();
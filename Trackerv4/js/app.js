/* app.js - Full Integrated Version */

// --- Constants & Keys ---
const STORE_KEY = 'attendance_records_v1';
const STATUS_KEY = 'last_status_by_user_v1';
const EMPLOYEES_KEY = 'employees_dataset_v1';
const THEME_KEY = 'attendance_theme_v1';
const ACCOUNT_MANAGER_KEY = 'account_manager_name_v1';
const COMPANY_KEY = 'company_name_v1';
const SOS_MODE_KEY = 'sos_mode_enabled_v1';
const ACCOUNT_SETTINGS_KEY = 'account_settings_v1'; // NEW: For Account Schedules

const DEFAULT_AVATAR_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5YWE0YjIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItY2lyY2xlIj48cGF0aCBkPSJNMjAgMjF2LTJjMC0yLjItMy42LTMuNS04LTMuNXMtOCAxLjMtOCAzLjV2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg==`;

let employees = [];

// --- DOM Refs ---
const appContainer = document.querySelector('.app');
const titleBlock = document.querySelector('.titleBlock');
const managerNameDisplay = document.getElementById('managerNameDisplay');
const totalAgentsHeaderCount = document.getElementById('totalAgentsHeaderCount');
const accountFilter = document.getElementById('accountFilter');
const employeeSelect = document.getElementById('employeeSelect');
const statusSelect = document.getElementById('statusSelect');
const attendanceDateInput = document.getElementById('attendanceDate');

// Time Inputs (Global)
const globalTimeIn = document.getElementById('globalTimeIn');
const globalTimeOut = document.getElementById('globalTimeOut');

const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const accountsWrap = document.getElementById('accountsWrap');
const monthlyDetailsView = document.getElementById('monthlyDetailsView');
const currentDateEl = document.getElementById('currentDate');
const currentTimeEl = document.getElementById('currentTime');
const addAccountBtn = document.getElementById('addAccountBtn');
const addAgentBtn = document.getElementById('addAgentBtn');
const searchInput = document.getElementById('searchInput');

// SELECTION BUTTONS
const selectAgentsBtn = document.getElementById('selectAgentsBtn');
const selectAllBtn = document.getElementById('selectAllBtn');
const deleteAgentsBtn = document.getElementById('deleteAgentsBtn');
const accountActionButtons = document.getElementById('accountActionButtons');
const markAllAccountBtn = document.getElementById('markAllAccountBtn');
const removeAccountBtn = document.getElementById('removeAccountBtn');
const editAccountBtn = document.getElementById('editAccountBtn');
const editAgentsBtn = document.getElementById('editAgentsBtn');

// Theme & Stats
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleLightIcon = document.getElementById('theme-toggle-light');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark');
const presentCountEl = document.getElementById('presentCount');
const absentCountEl = document.getElementById('absentCount');
const slElCountEl = document.getElementById('slElCount');
const vlCountEl = document.getElementById('vlCount');
const lateCountEl = document.getElementById('lateCount');
const halfDayCountEl = document.getElementById('halfDayCount');

// Import/Export
const importBtn = document.getElementById('importBtn');
const exportBtn = document.getElementById('exportBtn');
const importFileInput = document.getElementById('importFileInput');
const exportCsvBtn = document.getElementById('exportCsvBtn');

// Modals
const showReadmeBtn = document.getElementById('showReadmeBtn');
const readmeModal = document.getElementById('readmeModal');
const readmeModalBackdrop = document.getElementById('readmeModalBackdrop');
const closeReadmeModalBtn = document.getElementById('closeReadmeModalBtn');

const setManagerBtn = document.getElementById('setManagerBtn');
const managerNameModal = document.getElementById('managerNameModal');
const managerNameModalBackdrop = document.getElementById('managerNameModalBackdrop');
const closeManagerNameModalBtn = document.getElementById('closeManagerNameModal');
const managerNameInput = document.getElementById('managerNameInput');
const confirmManagerNameBtn = document.getElementById('confirmManagerName');
const managerNameMessage = document.getElementById('managerNameMessage');

const setCompanyBtn = document.getElementById('setCompanyBtn');
const companyNameDisplay = document.getElementById('companyNameDisplay');
const companyNameModal = document.getElementById('companyNameModal');
const companyNameModalBackdrop = document.getElementById('companyNameModalBackdrop');
const closeCompanyNameModalBtn = document.getElementById('closeCompanyNameModal');
const companyNameInput = document.getElementById('companyNameInput');
const confirmCompanyNameBtn = document.getElementById('confirmCompanyName');
const companyNameMessage = document.getElementById('companyNameMessage');
const enableSosModeCheckbox = document.getElementById('enableSosMode');

const addAccountModal = document.getElementById('addAccountModal');
const addAccountModalBackdrop = document.getElementById('addAccountModalBackdrop');
const closeAddAccountModalBtn = document.getElementById('closeAddAccountModal');
const newAccountNameInput = document.getElementById('newAccountName');
const confirmAddAccountBtn = document.getElementById('confirmAddAccount');
const addAccountMessage = document.getElementById('addAccountMessage');

const editAccountModal = document.getElementById('editAccountModal');
const editAccountModalBackdrop = document.getElementById('editAccountModalBackdrop');
const closeEditAccountModalBtn = document.getElementById('closeEditAccountModal');
const currentAccountNameDisplay = document.getElementById('currentAccountNameDisplay');
const editAccountNameInput = document.getElementById('editAccountNameInput');
const confirmEditAccountBtn = document.getElementById('confirmEditAccount');
const editAccountMessage = document.getElementById('editAccountMessage');

const addAgentModal = document.getElementById('addAgentModal');
const addAgentModalBackdrop = document.getElementById('addAgentModalBackdrop');
const closeAddAgentModalBtn = document.getElementById('closeAddAgentModal');
const addAgentAccountName = document.getElementById('addAgentAccountName');
const newAgentNameInput = document.getElementById('newAgentName');
const newAgentRoleInput = document.getElementById('newAgentRole');
const confirmAddAgentBtn = document.getElementById('confirmAddAgent');
const addAgentMessage = document.getElementById('addAgentMessage');

const filterStatusBtn = document.getElementById('filterStatusBtn');
const jumpToTodayBtn = document.getElementById('jumpToTodayBtn');

// Combined Agent Info / Edit Modal refs
const agentInfoModal = document.getElementById('agentInfoModal');
const agentInfoModalBackdrop = document.getElementById('agentInfoModalBackdrop');
const closeAgentInfoModalBtn = document.getElementById('closeAgentInfoModal');
const agentInfoModalCard = document.getElementById('agentInfoModalCard');
const agentInfoModalTitle = document.getElementById('agentInfoModalTitle');
const agentInfoDisplayView = document.getElementById('agentInfoDisplayView');
const agentInfoEditView = document.getElementById('agentInfoEditView');
const editAgentInfoBtn = document.getElementById('editAgentInfoBtn');
const agentInfoEditButtons = document.getElementById('agentInfoEditButtons');
const cancelAgentInfoEditBtn = document.getElementById('cancelAgentInfoEditBtn');
const confirmAgentInfoBtn = document.getElementById('confirmAgentInfoBtn');
const agentInfoMessage = document.getElementById('agentInfoMessage');

// Agent Info Display Inputs
const agentInfoImage = document.getElementById('agentInfoImage');
const agentInfoName = document.getElementById('agentInfoName');
const agentInfoAccount = document.getElementById('agentInfoAccount');
const agentInfoRole = document.getElementById('agentInfoRole');
const agentInfoHireDate = document.getElementById('agentInfoHireDate');
const agentInfoBirthday = document.getElementById('agentInfoBirthday');
const agentInfoEmail = document.getElementById('agentInfoEmail');
const agentInfoShiftDisplay = document.getElementById('agentInfoShiftDisplay');

// Agent Daily Record Editing Inputs (Dynamic now)
const agentInfoSelectedDateDisplay = document.getElementById('agentInfoSelectedDateDisplay');
const agentInfoStatusSelect = document.getElementById('agentInfoStatusSelect');
const agentInfoSaveRecordBtn = document.getElementById('agentInfoSaveRecordBtn');
const agentInfoTimeIn = document.getElementById('agentInfoTimeIn');
const agentInfoTimeOut = document.getElementById('agentInfoTimeOut');

// Edit Agent Form Inputs
const editAgentImagePreview = document.getElementById('editAgentImagePreview');
const editAgentImageUpload = document.getElementById('editAgentImageUpload');
const editAgentImageUrlInput = document.getElementById('editAgentImageUrlInput');
const editAgentNameInput = document.getElementById('editAgentNameInput');
const editAgentRoleInput = document.getElementById('editAgentRoleInput');
const editAgentHireDateInput = document.getElementById('editAgentHireDateInput');
const editAgentBirthdayInput = document.getElementById('editAgentBirthdayInput');
const editAgentEmailInput = document.getElementById('editAgentEmailInput');
const editAgentShiftStart = document.getElementById('editAgentShiftStart');
const editAgentShiftEnd = document.getElementById('editAgentShiftEnd');

// Custom Dialog & Export Modals
const customDialogModal = document.getElementById('customDialogModal');
const customDialogTitle = document.getElementById('customDialogTitle');
const customDialogMessage = document.getElementById('customDialogMessage');
const customDialogButtons = document.getElementById('customDialogButtons');

const exportCsvModal = document.getElementById('exportCsvModal');
const exportCsvModalBackdrop = document.getElementById('exportCsvModalBackdrop');
const closeExportCsvModalBtn = document.getElementById('closeExportCsvModalBtn');
const exportCsvModalTitle = document.getElementById('exportCsvModalTitle');
const monthSelect = document.getElementById('monthSelect');
const confirmExportCsvBtn = document.getElementById('confirmExportCsvBtn');
const accountManagerNameInput = document.getElementById('accountManagerName');

const exportJsonModal = document.getElementById('exportJsonModal');
const exportJsonModalBackdrop = document.getElementById('exportJsonModalBackdrop');
const closeExportJsonModalBtn = document.getElementById('closeExportJsonModalBtn');
const confirmExportJsonBtn = document.getElementById('confirmExportJsonBtn');
const accountManagerNameJsonInput = document.getElementById('accountManagerNameJsonInput');

// --- State ---
let detailsViewState = {
  account: null,
  year: new Date().getFullYear(),
  month: new Date().getMonth()
};
let isSelectMode = false;
let selectedAgents = new Set();
let currentStatusFilter = null;

// --- Custom Dialog Logic ---
function showDialog(message, title, buttons) {
  customDialogTitle.textContent = title;
  customDialogMessage.textContent = message;
  customDialogButtons.innerHTML = '';
  document.body.classList.add('modal-active');
  customDialogModal.setAttribute('aria-hidden', 'false');
  return new Promise(resolve => {
    const closeAndResolve = (value) => {
      customDialogModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-active');
      customDialogModal.removeEventListener('click', backdropClickHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
      resolve(value);
    };
    buttons.forEach(buttonInfo => {
      const button = document.createElement('button');
      button.textContent = buttonInfo.text;
      button.className = buttonInfo.class;
      button.addEventListener('click', () => {
        closeAndResolve(buttonInfo.value);
      }, {
        once: true
      });
      customDialogButtons.appendChild(button);
    });
    const backdropClickHandler = (e) => {
      if (e.target === customDialogModal) {
        closeAndResolve(null);
      }
    };
    customDialogModal.addEventListener('click', backdropClickHandler);
    const escapeKeyHandler = (e) => {
      if (e.key === 'Escape') {
        closeAndResolve(null);
      }
    };
    document.addEventListener('keydown', escapeKeyHandler);
  });
}

function customAlert(message, title = 'Alert') {
  return showDialog(message, title, [{
    text: 'OK',
    class: 'btn btn-primary',
    value: true
  }]);
}

function customConfirm(message, title = 'Confirmation') {
  return showDialog(message, title, [{
    text: 'Cancel',
    class: 'btn btn-secondary',
    value: false
  }, {
    text: 'Confirm',
    class: 'btn btn-danger',
    value: true
  }]);
}

// --- Helpers ---
const uniq = arr => [...new Set(arr)];
const dd = n => n.toString().padStart(2, '0');

function formatDateShort(d) {
  if (!d) return '';
  const m = dd(d.getMonth() + 1);
  const day = dd(d.getDate());
  const y = d.getFullYear().toString().slice(-2);
  return `${m}/${day}/${y}`;
}

function getFormattedDateFromPicker() {
  const rawDate = attendanceDateInput.value;
  if (!rawDate) return null;
  const [y, m, d] = rawDate.split('-');
  return `${m}/${d}/${y.slice(-2)}`;
}

function getStatusesForSelectedDate() {
  const targetDate = getFormattedDateFromPicker();
  if (!targetDate) return {};
  const records = loadRecords();
  const dailyStatuses = {};
  const matches = records.filter(r => r.date === targetDate);
  matches.forEach(r => {
    dailyStatuses[r.name] = r.status;
  });
  return dailyStatuses;
}

function populateAccountFilter() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const currentSelection = accountFilter.value;
  const allEmployees = loadEmployees();
  const allAccounts = uniq(allEmployees.map(e => e.account)).filter(Boolean).sort((a, b) => a.localeCompare(b));
  
  const validAccounts = allAccounts.filter(acc => {
    if (!searchTerm) return true;
    const accNameMatch = acc.toLowerCase().includes(searchTerm);
    const hasMatchingAgent = allEmployees.some(e => e.account === acc && e.name && e.name.toLowerCase().includes(searchTerm));
    return accNameMatch || hasMatchingAgent;
  });
  
  const optionsHTML = validAccounts.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join('');
  accountFilter.innerHTML = `<option value="">-- All Accounts --</option>` + optionsHTML;
  
  if (currentSelection && validAccounts.includes(currentSelection)) {
    accountFilter.value = currentSelection;
  } else {
    accountFilter.value = "";
  }
}

function updateDateTime() {
  const now = new Date();
  currentDateEl.textContent = now.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  currentTimeEl.textContent = now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

function escapeHtml(t = "") {
  return t.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function setDatePickerToToday() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  attendanceDateInput.value = `${yyyy}-${mm}-${dd}`;
}
setDatePickerToToday();

function updateTotalAgentsCount() {
    const totalAgents = loadEmployees().filter(e => e.name).length;
    if (totalAgentsHeaderCount) {
      totalAgentsHeaderCount.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87c-.5-.07-1-.13-1.4-.13H16c-.6 0-1.1.06-1.5.11A4 4 0 0 0 12 17v2"/><path d="M15 7a4 4 0 0 0-3-3.87"/></svg>
              ${totalAgents}
          `;
    }
}

const goToLeaveTrackerBtn = document.getElementById('goToLeaveTrackerBtn');
    if (goToLeaveTrackerBtn) {
        goToLeaveTrackerBtn.addEventListener('click', () => {
            window.location.href = 'leave-tracker.html'; // Or whatever your new page is named
        });
    }

// --- Theme Management ---
function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    themeToggleLightIcon.classList.add('hidden');
    themeToggleDarkIcon.classList.remove('hidden');
  } else {
    document.body.classList.remove('light-theme');
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
  }
}

function toggleTheme() {
  const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
}
themeToggleBtn.addEventListener('click', toggleTheme);

// --- Storage Helpers ---
function loadEmployees() {
  try {
    return JSON.parse(localStorage.getItem(EMPLOYEES_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveEmployees(emps) {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(emps));
  employees = emps;
}

function loadRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveRecords(records) {
  localStorage.setItem(STORE_KEY, JSON.stringify(records));
}

function loadStatuses() {
  try {
    return JSON.parse(localStorage.getItem(STATUS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveStatuses(s) {
  localStorage.setItem(STATUS_KEY, JSON.stringify(s));
}

// NEW: Account Settings Loader
function loadAccountSettings() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_SETTINGS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveAccountSettings(settings) {
  localStorage.setItem(ACCOUNT_SETTINGS_KEY, JSON.stringify(settings));
}

// --- LOGIC ENGINE: Schedule Cascade ---
function getEffectiveSchedule(agent) {
    // 1. Check Agent Override
    if (agent.shiftStart && agent.shiftStart.trim() !== "") {
        return { start: agent.shiftStart, end: agent.shiftEnd, type: 'Agent Specific' };
    }
    // 2. Check Account Default
    const accountSettings = loadAccountSettings();
    const accSetting = accountSettings[agent.account];
    if (accSetting && accSetting.shiftStart) {
        return { start: accSetting.shiftStart, end: accSetting.shiftEnd, type: 'Account Default' };
    }
    // 3. None
    return { start: null, end: null, type: 'None' };
}

// --- UI Initialization ---
function initSelectors() {
  employees = loadEmployees();
  populateAccountFilter();
  populateEmployees(accountFilter.value);
  toggleAccountActionButtons();
}

function populateEmployees(account = '') {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let list = employees.filter(e => {
    if (!e.name) return false;
    const matchAccount = account ? e.account === account : true;
    const matchSearch = !searchTerm || e.name.toLowerCase().includes(searchTerm) || e.account.toLowerCase().includes(searchTerm);
    return matchAccount && matchSearch;
  });
  list.sort((a, b) => {
    const accountComparison = a.account.localeCompare(b.account);
    if (accountComparison !== 0) return accountComparison;
    return a.name.localeCompare(b.name);
  });
  if (list.length > 0) {
    employeeSelect.innerHTML = list.map(e => `<option value="${escapeHtml(e.name)}">${escapeHtml(e.name)} — ${escapeHtml(e.account)}</option>`).join('');
    if (list.length === 1 && searchTerm) {
      employeeSelect.value = list[0].name;
    }
  } else {
    employeeSelect.innerHTML = `<option value="">-- No Matches --</option>`;
  }
}

function toggleAccountActionButtons() {
  const isAccountSelected = !!accountFilter.value;
  accountActionButtons.style.display = isAccountSelected ? 'flex' : 'none';
  appContainer.classList.toggle('account-selected', isAccountSelected);
}

// --- Status Styling Helpers ---
function statusClass(s) {
  if (!s || s === 'Offline') return 'ind-offline';
  const low = s.toLowerCase();
  if (low === 'present') return 'ind-present';
  if (low === 'late') return 'ind-late';
  if (low === 'absent') return 'ind-absent';
  if (low === 'sl' || low === 'el') return 'ind-sl';
  if (low === 'vl') return 'ind-vl';
  if (low.includes('half')) return 'ind-half';
  return 'ind-offline';
}

function statusTableCellClass(s) {
  if (!s || s === '' || s === 'Offline') return 'Offline';
  const low = s.toLowerCase();
  if (low === 'present') return 'status-present';
  if (low === 'late') return 'status-late';
  if (low === 'absent') return 'status-absent';
  if (low === 'sl' || low === 'el') return 'status-sl-el';
  if (low === 'vl') return 'status-vl';
  if (low.includes('half')) return 'status-half';
  return 'Offline';
}

function statusLabel(s) {
  return (!s || s === '' || s === 'Offline') ? 'Offline' : s;
}

// --- QUICK MARK AGENT LOGIC (FIXED) ---
window.quickMarkAgent = async function(name, event) {
    event.stopPropagation(); 
    
    const formattedDate = getFormattedDateFromPicker();
    if (!formattedDate) return;
    
    let records = loadRecords();
    const emp = employees.find(e => e.name === name);
    if (!emp) return;

    const existingRecordIndex = records.findIndex(r => r.name === name && r.date === formattedDate);
    const existingRecord = existingRecordIndex > -1 ? records[existingRecordIndex] : null;

    let newStatus = 'Present'; // Default status for quick mark
    let tIn = globalTimeIn ? globalTimeIn.value : '';
    let tOut = globalTimeOut ? globalTimeOut.value : '';

    // If globalTimeIn is empty, use current time
    if (!tIn) {
        const now = new Date();
        tIn = `${dd(now.getHours())}:${dd(now.getMinutes())}`;
    }

    // Toggle logic: If already 'Present', 'Late', or 'Half Day', set to 'Offline'.
    // Otherwise, mark as 'Present' (or 'Late' based on schedule).
    if (existingRecord && ['Present', 'Late', 'Half Day'].includes(existingRecord.status)) {
        newStatus = 'Offline';
        // When setting to offline, clear time-in/out as well.
        tIn = '';
        tOut = '';
    } else {
        // Apply smart status automation for new 'Present' marks
        const schedule = getEffectiveSchedule(emp);
        if (tIn && schedule.start) {
            const [inH, inM] = tIn.split(':').map(Number);
            const [shiftH, shiftM] = schedule.start.split(':').map(Number);
            
            const inTotal = inH * 60 + inM;
            const shiftTotal = shiftH * 60 + shiftM;
            
            const GRACE_PERIOD = 15; // Minutes
            const diff = inTotal - shiftTotal;
            
            if (diff > GRACE_PERIOD) {
                newStatus = 'Late';
            } else {
                newStatus = 'Present';
            }
        }
    }
  
    const updatedRecord = {
        name: name,
        account: emp.account,
        role: emp.role,
        status: newStatus,
        date: formattedDate,
        timeIn: tIn,
        timeOut: tOut,
        notes: existingRecord ? existingRecord.notes : "" // Preserve notes if existing
    };
  
    if (existingRecordIndex > -1) {
      records[existingRecordIndex] = updatedRecord;
    } else {
      records.push(updatedRecord);
    }
  
    saveRecords(records);
    renderDashboard();
    updateStatusCounts();
};

// --- Core Rendering Functions ---
function renderDashboard() {
  const filter = accountFilter.value;
  const currentEmployees = loadEmployees();
  const statuses = getStatusesForSelectedDate(); 
  
  const dateKey = getFormattedDateFromPicker();
  const dailyRecords = loadRecords().filter(r => r.date === dateKey);

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const allAccounts = uniq(currentEmployees.map(e => e.account)).filter(Boolean).sort((a, b) => a.localeCompare(b));
  const visibleAccounts = filter ? allAccounts.filter(a => a === filter) : allAccounts;
  
  if (visibleAccounts.length === 0) {
    accountsWrap.innerHTML = `<div class="empty-state">No accounts found.</div>`;
    return;
  }
  
  const contentHTML = visibleAccounts.map(account => {
    const allAccountAgents = currentEmployees.filter(e => e.account === account && e.name).sort((x, y) => x.name.localeCompare(y.name));
    const totalAgents = allAccountAgents.length;
    const markedCount = allAccountAgents.filter(a => {
      const st = statuses[a.name];
      return st && st !== 'Offline';
    }).length;
    const isAllMarked = totalAgents > 0 && markedCount === totalAgents;
    
    const filteredAgents = allAccountAgents.filter(a => {
      const statusMatch = !currentStatusFilter || (statuses[a.name] || 'Offline') === currentStatusFilter;
      const searchMatch = !searchTerm || a.name.toLowerCase().includes(searchTerm) || a.account.toLowerCase().includes(searchTerm);
      return statusMatch && searchMatch;
    });
    
    if (filteredAgents.length === 0 && searchTerm) return '';
    
    const rows = filteredAgents.map(a => {
      const st = statuses[a.name] || 'Offline';
      const isAgentSelected = selectedAgents.has(a.name);
      const record = dailyRecords.find(r => r.name === a.name);
      const timeIn = record ? record.timeIn : '';
      
      // --- NEW: HIGHLIGHT FIRST LETTER LOGIC ---
      let nameDisplayHtml = escapeHtml(a.name);
      if (isSelectMode && a.name.length > 0) {
          const firstChar = escapeHtml(a.name.charAt(0));
          const rest = escapeHtml(a.name.slice(1));
          nameDisplayHtml = `<span class="shortcut-letter">${firstChar}</span>${rest}`;
      }
      // -----------------------------------------
      
      let rightSideContent = '';

      if (filter) { 
        // SINGLE ACCOUNT VIEW
        const timeDisplay = timeIn ? `<span class="time-stamp-left" style="margin-right: 8px; color: var(--muted); font-family: monospace; font-size: 11px;">${timeIn}</span>` : '';
        rightSideContent = `
            <div style="display:flex; align-items:center; justify-content: flex-end;">
                ${timeDisplay}
                <div class="agentStatus">${escapeHtml(statusLabel(st))}</div>
                ${!isSelectMode ? `
                <button class="quick-mark-btn ${/Mobi|Android/i.test(navigator.userAgent) ? 'mobile-visible' : ''}" 
                        title="Mark Present" 
                        onclick="window.quickMarkAgent('${escapeHtml(a.name)}', event)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>` : ''}
            </div>`;
      } else {
        // DASHBOARD VIEW
        let statusDisplayHtml = '';
        if ((st === 'Present' || st === 'Late') && timeIn) {
             const timeColor = st === 'Late' ? 'var(--late)' : 'var(--success)';
             statusDisplayHtml = `<span class="agentStatus" style="color: ${timeColor}; font-family: monospace; font-weight: 700;">${timeIn}</span>`;
        } else {
             statusDisplayHtml = `<div class="agentStatus">${escapeHtml(statusLabel(st))}</div>`;
        }
        rightSideContent = `
            <div style="display:flex; align-items:center;">
                ${statusDisplayHtml}
                ${!isSelectMode ? `
                <button class="quick-mark-btn ${/Mobi|Android/i.test(navigator.userAgent) ? 'mobile-visible' : ''}" 
                        title="Mark Present" 
                        onclick="window.quickMarkAgent('${escapeHtml(a.name)}', event)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>` : ''} 
            </div>`;
      }

      // Note: We use nameDisplayHtml inside the agentName div now
      return `<div class="agentRow ${isSelectMode ? 'select-mode' : ''}" data-name="${escapeHtml(a.name)}">
                ${isSelectMode ? `<input type="checkbox" class="agent-checkbox" data-name="${escapeHtml(a.name)}" ${isAgentSelected ? 'checked' : ''}>` : ''}
                <div class="agentInfo">
                  <div class="indicator ${statusClass(st)}" aria-hidden="true"></div>
                  <div>
                    <div class="agentName">${nameDisplayHtml}</div>
                    <div class="agentRole">${escapeHtml(a.role || 'No Role')}</div>
                  </div>
                </div>
                ${rightSideContent}
              </div>`;
    }).join('');
    
    const agentListContent = filteredAgents.length > 0 ? rows : `<div class="empty-state-small"></div>`;
    const isSelected = detailsViewState.account === account;
    return `<div class="accountCard ${isSelected ? 'selected-account' : ''}" data-account="${escapeHtml(account)}">
              <div class="accountTitle">
                ${escapeHtml(account)}
                <span class="agent-count-badge ${isAllMarked ? 'status-complete' : ''}">
                    ${markedCount} / ${totalAgents}
                </span>
              </div>
              <div class="agentList">${agentListContent}</div>
            </div>`;
  }).join('');
  
  if (!contentHTML.trim()) {
    accountsWrap.innerHTML = `<div class="empty-state">No results found.</div>`;
  } else {
    accountsWrap.innerHTML = contentHTML;
  }
  updateStatusCounts();
}

function renderMonthlyDetails(account = null) {
  const { year, month } = detailsViewState;
  const accountsToRender = account ? [account] : uniq(loadEmployees().map(e => e.account)).filter(Boolean).sort((a, b) => a.localeCompare(b));
  
  if (accountsToRender.length === 0) {
    monthlyDetailsView.innerHTML = account ? '' : '<div class="empty-state">No accounts to display monthly details for.</div>';
    return;
  }
  
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const monthName = startOfMonth.toLocaleString('default', { month: 'long' });
  
  const storedCompany = localStorage.getItem(COMPANY_KEY) || '';
  const isWeekdaysOnly = localStorage.getItem(SOS_MODE_KEY) === 'true';
  const isSOSCompany = storedCompany.trim().toUpperCase() === 'SOS';
  
  let daysGrid = [];
  let summaryHTML = '';
  
  if (isWeekdaysOnly) {
    daysGrid = getWorkingDays(startOfMonth, endOfMonth);
  } else {
    daysGrid = getAllDaysInMonth(startOfMonth, endOfMonth);
  }
  
  if (isSOSCompany && isWeekdaysOnly) {
    const { cycleName, startDate, endDate } = getCurrentPayCycle(new Date());
    const cycleWorkingDays = getWorkingDays(startDate, endDate);
    summaryHTML = `
            <strong>${monthName} ${year}</strong> &mdash; ${daysGrid.length} working days.<br>
            Current Pay Cycle (${cycleName}): ${formatDateShort(startDate)} - ${formatDateShort(endDate)} (${cycleWorkingDays.length} days).
        `;
  } else if (isWeekdaysOnly) {
    summaryHTML = `<strong>${monthName} ${year}</strong> &mdash; ${daysGrid.length} working days.`;
  } else {
    summaryHTML = `<strong>${monthName} ${year}</strong>`;
  }
  
  const records = loadRecords();
  const allEmployees = loadEmployees();
  let masterSummaryHTML = '';
  if (!account) {
    masterSummaryHTML = `<div class="details-summary global-summary">${summaryHTML}</div>`;
  }
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const allAccountsHTML = accountsToRender.map(currentAccount => {
    const agents = allEmployees.filter(e => {
      const isAccountMatch = e.account === currentAccount && e.name;
      if (!isAccountMatch) return false;
      return !searchTerm || e.name.toLowerCase().includes(searchTerm) || e.account.toLowerCase().includes(searchTerm);
    }).sort((a, b) => a.name.localeCompare(b.name));
    
    if (agents.length === 0 && searchTerm) return '';
    const singleAccountSummaryHTML = account ? `<div class="details-summary">${summaryHTML}</div>` : '';
    
    const headerRow = `<th>Agent</th>` + daysGrid.map(d => {
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const dayClass = isWeekend ? 'weekend-header' : '';
      return `<th class="${dayClass}">${d.getDate()}</th>`;
    }).join('');
    
    const bodyRows = agents.map(agent => {
      const agentRecords = records.filter(r => r.name === agent.name);
      const cells = daysGrid.map(day => {
        const record = agentRecords.find(r => r.date === formatDateShort(day));
        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
        const cellClass = statusTableCellClass(record ? record.status : '-');
        const weekendStyle = (isWeekend && !isWeekdaysOnly) ? 'style="background-color: #333;"' : '';
        return `<td class="${cellClass}" ${weekendStyle}></td>`;
      }).join('');
      return `<tr><td class="agent-name-cell">${escapeHtml(agent.name)}</td>${cells}</tr>`;
    }).join('');
    
    const accountTitle = account ? `<h3>${monthName} ${year} Attendance for ${escapeHtml(currentAccount)}</h3>` : `<h3>${escapeHtml(currentAccount)}</h3>`;
    return `<div class="account-monthly-view">
                <div class="details-header">
                    ${accountTitle}
                    ${account ? `<button id="closeDetailsViewBtn" class="btn btn-secondary btn-sm">Close</button>` : ''}
                </div>
                ${singleAccountSummaryHTML}
                <div class="table-wrapper">
                    <table class="details-table">
                        <thead><tr>${headerRow}</tr></thead>
                        <tbody>${bodyRows.length > 0 ? bodyRows : `<tr><td colspan="${daysGrid.length + 1}">No agents in this account.</td></tr>`}</tbody>
                    </table>
                </div>
            </div>`;
  }).join('');
  
  if (allAccountsHTML.trim() === '' && searchTerm) {
    monthlyDetailsView.innerHTML = `<div class="empty-state">No matches found for "${escapeHtml(searchTerm)}" in Monthly View.</div>`;
  } else {
    monthlyDetailsView.innerHTML = masterSummaryHTML + allAccountsHTML;
  }
}

function getAllDaysInMonth(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function getWorkingDays(startDate, endDate) {
  const dates = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push(new Date(d));
    }
  }
  return dates;
}

function getCurrentPayCycle(today) {
  const day = today.getDate(),
    year = today.getFullYear(),
    month = today.getMonth();
  let cycleName, startDate, endDate;
  if (day >= 1 && day <= 10) {
    cycleName = '1st Cycle';
    startDate = new Date(year, month - 1, 26);
    endDate = new Date(year, month, 10);
  } else if (day >= 11 && day <= 25) {
    cycleName = '2nd Cycle';
    startDate = new Date(year, month, 11);
    endDate = new Date(year, month, 25);
  } else {
    cycleName = '1st Cycle (Next)';
    startDate = new Date(year, month, 26);
    endDate = new Date(year, month + 1, 10);
  }
  return { cycleName, startDate, endDate };
}

// --- SELECTION MODE LOGIC ---
function getVisibleAgents() {
  const filter = accountFilter.value;
  const currentStatus = currentStatusFilter;
  const emps = loadEmployees();
  const statuses = loadStatuses();
  return emps.filter(e => {
    const matchAccount = !filter || e.account === filter;
    const matchStatus = !currentStatus || (statuses[e.name] || 'Offline') === currentStatus;
    return e.name && matchAccount && matchStatus;
  });
}

function updateSelectModeUI() {
  const inSelectMode = isSelectMode;
  selectAgentsBtn.textContent = inSelectMode ? "Cancel" : "Select";
  selectAgentsBtn.classList.toggle("active", inSelectMode);
  const visible = getVisibleAgents();
  const allVisibleAreSelected = visible.length > 0 && visible.every(a => selectedAgents.has(a.name));
  if (selectAllBtn) {
    selectAllBtn.textContent = allVisibleAreSelected ? "Deselect All" : "Select All";
  }
  editAgentsBtn.style.display = inSelectMode && selectedAgents.size === 1 ? 'inline-block' : 'none';
  editAgentsBtn.disabled = !inSelectMode || selectedAgents.size !== 1;
  deleteAgentsBtn.disabled = !inSelectMode || selectedAgents.size === 0;
  renderDashboard();
}

function handleAgentSelection(name, isChecked) {
  isChecked ? selectedAgents.add(name) : selectedAgents.delete(name);
  updateSelectModeUI();
}

// --- Combined Agent Info / Edit Modal Logic (FIXED) ---
function openAgentInfoModal(agentName) {
  const agent = employees.find(e => e.name === agentName);
  if (!agent) return;

  // GET SCHEDULE
  const schedule = getEffectiveSchedule(agent);

  // 1. Populate Basic Info
  agentInfoModal.dataset.originalName = agent.name;
  agentInfoModal.dataset.account = agent.account;
  agentInfoImage.src = agent.imageUrl || DEFAULT_AVATAR_SVG;
  agentInfoImage.onerror = () => { agentInfoImage.src = DEFAULT_AVATAR_SVG; };
  agentInfoName.textContent = agent.name;
  agentInfoAccount.textContent = agent.account;
  agentInfoRole.textContent = agent.role || 'No Role';
  agentInfoHireDate.textContent = agent.hireDate || 'Not set';
  agentInfoBirthday.textContent = agent.birthday || 'Not set';
  agentInfoEmail.textContent = agent.email || 'Not set';
  
  if (agentInfoShiftDisplay) {
      if (schedule.start && schedule.end) {
          agentInfoShiftDisplay.innerHTML = `${schedule.start} - ${schedule.end} <span style='font-size:10px; color:var(--accent); margin-left:5px;'>(${schedule.type})</span>`;
      } else {
          agentInfoShiftDisplay.textContent = 'Not set';
      }
  }

  // 2. Populate Edit Form Inputs
  editAgentImagePreview.src = agent.imageUrl || DEFAULT_AVATAR_SVG;
  editAgentImageUrlInput.value = agent.imageUrl || '';
  editAgentNameInput.value = agent.name;
  editAgentRoleInput.value = agent.role || '';
  editAgentHireDateInput.value = agent.hireDate || '';
  editAgentBirthdayInput.value = agent.birthday || '';
  editAgentEmailInput.value = agent.email || '';
  
  // Populate Shift Inputs
  if (editAgentShiftStart) {
      editAgentShiftStart.value = agent.shiftStart || '';
      if(schedule.type === 'Account Default') editAgentShiftStart.placeholder = `Default: ${schedule.start}`;
  }
  if (editAgentShiftEnd) {
      editAgentShiftEnd.value = agent.shiftEnd || '';
      if(schedule.type === 'Account Default') editAgentShiftEnd.placeholder = `Default: ${schedule.end}`;
  }

  // 3. DAILY RECORD SECTION
  const date = getFormattedDateFromPicker();
  if (agentInfoSelectedDateDisplay) agentInfoSelectedDateDisplay.textContent = date;
  
  const records = loadRecords();
  const record = records.find(r => r.name === agentName && r.date === date);
  
  let currentStatusSelect = document.getElementById('agentInfoStatusSelect');
  let currentTimeIn = document.getElementById('agentInfoTimeIn');
  let currentTimeOut = document.getElementById('agentInfoTimeOut');

  if (currentTimeIn) currentTimeIn.style.color = 'var(--text-primary)';

  if (record) {
      if(currentStatusSelect) currentStatusSelect.value = record.status || 'Offline';
      if(currentTimeIn) currentTimeIn.value = record.timeIn || '';
      if(currentTimeOut) currentTimeOut.value = record.timeOut || '';
  } else {
      if(currentStatusSelect) currentStatusSelect.value = 'Offline';
      if(currentTimeIn) {
          if (schedule.start) {
              currentTimeIn.value = schedule.start;
              currentTimeIn.style.color = 'var(--muted)'; 
          } else {
              currentTimeIn.value = '';
          }
      }
      if(currentTimeOut) currentTimeOut.value = '';
  }

  // 4. SMART STATUS AUTOMATION (Using Effective Schedule)
  if (currentTimeIn) {
      const newTimeIn = currentTimeIn.cloneNode(true);
      currentTimeIn.parentNode.replaceChild(newTimeIn, currentTimeIn);
      currentTimeIn = newTimeIn;
      
      currentTimeIn.addEventListener('focus', function() {
           this.style.color = 'var(--text-primary)';
      }, { once: true });

      currentTimeIn.addEventListener('input', function() {
          this.style.color = 'var(--text-primary)'; 
          const enteredTime = this.value;
          const shiftStart = schedule.start; 
          
          if (!enteredTime || !shiftStart) return;

          const [inH, inM] = enteredTime.split(':').map(Number);
          const [shiftH, shiftM] = shiftStart.split(':').map(Number);
          
          const inTotal = inH * 60 + inM;
          const shiftTotal = shiftH * 60 + shiftM;
          
          const GRACE_PERIOD = 15; 
          const diff = inTotal - shiftTotal;
          
          let newStatus = 'Present';
          if (diff > 240) {
              newStatus = 'Half Day';
          } else if (diff > GRACE_PERIOD) {
              newStatus = 'Late';
          } else {
              newStatus = 'Present';
          }
          
          const liveStatusSelect = document.getElementById('agentInfoStatusSelect');
          if (liveStatusSelect) {
              liveStatusSelect.value = newStatus;
              liveStatusSelect.style.transition = 'background 0.2s';
              liveStatusSelect.style.background = 'rgba(125, 211, 252, 0.2)'; 
              setTimeout(() => { liveStatusSelect.style.background = ''; }, 300);
          }
      });
  }
  if (currentTimeOut) {
      // Clone the element to remove old listeners (prevents duplicate triggers)
      const newTimeOut = currentTimeOut.cloneNode(true);
      currentTimeOut.parentNode.replaceChild(newTimeOut, currentTimeOut);
      currentTimeOut = newTimeOut;

      currentTimeOut.addEventListener('input', function() {
          const liveStatusSelect = document.getElementById('agentInfoStatusSelect');
          
          // Check if a time has been entered
          if (this.value && liveStatusSelect) {
              
              // AUTOMATION: Change status to 'Offline'
              liveStatusSelect.value = 'Offline'; 
              
              // Visual feedback (flashes the dropdown color)
              liveStatusSelect.style.transition = 'background 0.2s';
              liveStatusSelect.style.background = 'rgba(125, 211, 252, 0.2)'; 
              setTimeout(() => { liveStatusSelect.style.background = ''; }, 300);
          }
      });
  }

  if (agentInfoSaveRecordBtn) {
    agentInfoSaveRecordBtn.onclick = () => {
        const saveStatusSelect = document.getElementById('agentInfoStatusSelect');
        const saveTimeIn = document.getElementById('agentInfoTimeIn');
        const saveTimeOut = document.getElementById('agentInfoTimeOut');

        const newStatus = saveStatusSelect.value;
        const newIn = saveTimeIn.value;
        const newOut = saveTimeOut.value;
        
        let currentRecords = loadRecords();
        const idx = currentRecords.findIndex(r => r.name === agentName && r.date === date);
        
        if (idx > -1) {
            currentRecords[idx].status = newStatus;
            currentRecords[idx].timeIn = newIn;
            currentRecords[idx].timeOut = newOut;
        } else {
            currentRecords.push({
                name: agentName,
                account: agent.account,
                role: agent.role,
                status: newStatus,
                date: date,
                timeIn: newIn,
                timeOut: newOut,
                notes: ""
            });
        }
        saveRecords(currentRecords);
        renderDashboard(); 
        updateStatusCounts();
        agentInfoMessage.textContent = "Record updated!";
        setTimeout(() => agentInfoMessage.textContent = "", 2000);
    };
  }

  switchToViewMode(true);
  agentInfoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
}

function closeAgentInfoModal() {
  agentInfoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
  setTimeout(() => switchToViewMode(true), 200);
}

function switchToViewMode(clearMessage = false) {
  agentInfoDisplayView.classList.remove('hidden');
  agentInfoEditView.classList.add('hidden');
  agentInfoModalTitle.textContent = "Agent Information";
  editAgentInfoBtn.classList.remove('hidden');
  agentInfoEditButtons.classList.add('hidden');
  if (clearMessage) {
    agentInfoMessage.textContent = '';
    agentInfoMessage.className = 'modal-message';
  }
}

function switchToEditMode() {
  agentInfoDisplayView.classList.add('hidden');
  agentInfoEditView.classList.remove('hidden');
  agentInfoModalTitle.textContent = "Edit Agent Information";
  editAgentInfoBtn.classList.add('hidden');
  agentInfoEditButtons.classList.remove('hidden');
  agentInfoMessage.textContent = '';
  agentInfoMessage.className = 'modal-message';
}

// --- Other Modal Logic ---
function closeAddAccountModal() {
  addAccountModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
}

function closeEditAccountModal() {
  editAccountModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
}

function closeAddAgentModal() {
  addAgentModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
}

function updateStatusCounts() {
  // Use current date records
  const statuses = getStatusesForSelectedDate();
  let p = 0, l = 0, hd = 0, a = 0, s = 0, v = 0;
  
  Object.values(statuses).forEach(status => {
    const low = (status || '').toLowerCase();
    if (low === 'present') p++;
    else if (low === 'late') l++;
    else if (low === 'half day') hd++;
    else if (low === 'absent') a++;
    else if (low === 'sl' || low === 'el') s++;
    else if (low === 'vl') v++;
  });
  
  presentCountEl.textContent = p; 
  lateCountEl.textContent = l;
  halfDayCountEl.textContent = hd;
  absentCountEl.textContent = a;
  slElCountEl.textContent = s;
  vlCountEl.textContent = v;
}

async function manuallyClearAllStatuses() {
  const formattedDate = getFormattedDateFromPicker();
  if (!formattedDate) return;
  const allEmployees = loadEmployees();
  if (allEmployees.length === 0) return;
  
  let records = loadRecords();
  const originalLength = records.length;
  records = records.filter(r => r.date !== formattedDate);
  if (records.length === originalLength) {
    await customAlert("No records found to clear for this date.", "Info");
    return;
  }
  saveRecords(records);
  renderDashboard();
  updateStatusCounts();
  await customAlert(`Statuses for ${formattedDate} have been reset.`, "Statuses Cleared");
}

// --- README Modal Logic ---
function openReadmeModal() {
  readmeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-active');
}

function closeReadmeModal() {
  readmeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
}

// --- Manager Name Modal Logic ---
function openManagerNameModal() {
  const currentName = localStorage.getItem(ACCOUNT_MANAGER_KEY) || '';
  managerNameInput.value = currentName;
  managerNameMessage.textContent = '';
  managerNameModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
  managerNameInput.focus();
}

function closeManagerNameModal() {
  managerNameModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
}

// --- Company Name Modal Logic ---
function openCompanyNameModal() {
  const currentName = localStorage.getItem(COMPANY_KEY) || 'SOS';
  const isSosEnabled = localStorage.getItem(SOS_MODE_KEY) === 'true';
  companyNameInput.value = currentName;
  if (enableSosModeCheckbox) enableSosModeCheckbox.checked = isSosEnabled;
  companyNameMessage.textContent = '';
  companyNameModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-active');
  companyNameInput.focus();
}

function closeCompanyNameModal() {
  companyNameModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-active');
}

function setCompanyNameDisplay(name) {
  if (name && companyNameDisplay) companyNameDisplay.textContent = `${name}`;
  else if (companyNameDisplay) companyNameDisplay.textContent = '';
}

function setManagerName(name) {
  if (name) managerNameDisplay.textContent = `- ${name}`;
  else managerNameDisplay.textContent = '';
}

// --- CSV Export Modal Logic ---
function openExportCsvModal() {
  const account = accountFilter.value;
  const year = detailsViewState.year;
  const title = account ? `Export CSV for: ${account} - ${year}` : `Export: All Accounts - ${year}`;
  exportCsvModalTitle.textContent = title;
  monthSelect.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const monthName = new Date(year, i).toLocaleString('default', { month: 'long' });
    return `<option value="${i}">${monthName}</option>`;
  }).join('');
  monthSelect.value = detailsViewState.month;
  exportCsvModal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-active');
}

function closeExportCsvModal() {
  exportCsvModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
}

// --- EVENT LISTENERS ---
document.addEventListener("keydown", e => {
  if (e.key !== 'Escape') return;
  // Close active modals on Escape
  const modals = document.querySelectorAll('.modal[aria-hidden="false"]');
  modals.forEach(m => {
      m.setAttribute('aria-hidden', 'true');
  });
  document.body.classList.remove('modal-active');
});

showReadmeBtn.addEventListener('click', openReadmeModal);
closeReadmeModalBtn.addEventListener('click', closeReadmeModal);
readmeModalBackdrop.addEventListener('click', closeReadmeModal);

setManagerBtn.addEventListener('click', openManagerNameModal);
closeManagerNameModalBtn.addEventListener('click', closeManagerNameModal);
managerNameModalBackdrop.addEventListener('click', closeManagerNameModal);
confirmManagerNameBtn.addEventListener('click', () => {
  const name = managerNameInput.value.trim();
  if (!name) {
    managerNameMessage.textContent = 'Name cannot be empty.';
    managerNameMessage.classList.add('error');
    return;
  }
  localStorage.setItem(ACCOUNT_MANAGER_KEY, name);
  setManagerName(name);
  managerNameMessage.textContent = 'Name saved successfully!';
  managerNameMessage.classList.remove('error');
  setTimeout(closeManagerNameModal, 800);
});

titleBlock.addEventListener('click', () => {
  if (accountFilter.value !== '') {
    accountFilter.value = '';
    accountFilter.dispatchEvent(new Event('change'));
  }
});

attendanceDateInput.addEventListener('change', () => {
  const rawDate = attendanceDateInput.value;
  if (rawDate) {
    const [y, m, d] = rawDate.split('-');
    detailsViewState.year = parseInt(y);
    detailsViewState.month = parseInt(m) - 1; 
  }
  renderDashboard();
  updateStatusCounts();
  if (monthlyDetailsView.style.display !== 'none') {
    renderMonthlyDetails(detailsViewState.account);
  }
});

accountFilter.addEventListener('change', () => {
  const selectedAccount = accountFilter.value;
  populateEmployees(selectedAccount);
  isSelectMode = false;
  selectedAgents.clear();
  detailsViewState.account = selectedAccount;
  monthlyDetailsView.style.display = 'block';
  if (selectedAccount) {
    renderMonthlyDetails(selectedAccount);
  } else {
    renderMonthlyDetails();
  }
  toggleAccountActionButtons();
  updateSelectModeUI();
});

document.body.addEventListener('click', (e) => {
  if (e.target.closest('.agentRow')) {
    const agentRow = e.target.closest('.agentRow');
    const name = agentRow.dataset.name;
    if (isSelectMode) {
      const checkbox = agentRow.querySelector('.agent-checkbox');
      if (checkbox && e.target !== checkbox) checkbox.checked = !checkbox.checked;
      handleAgentSelection(name, checkbox.checked);
    } else {
      openAgentInfoModal(name);
    }
  }
  if (e.target.closest('.accountCard') && !e.target.closest('.agentRow')) {
    const accountName = e.target.closest('.accountCard').dataset.account;
    if (accountFilter.value !== accountName) {
      accountFilter.value = accountName;
      accountFilter.dispatchEvent(new Event('change'));
    }
  }
  if (e.target.id === 'closeDetailsViewBtn') {
    accountFilter.value = '';
    accountFilter.dispatchEvent(new Event('change'));
  }
});

// MAIN ADD/MARK BUTTON
addBtn.addEventListener("click", async () => {
  const status = statusSelect.value;
  const formattedDate = getFormattedDateFromPicker();
  
  const tIn = globalTimeIn ? globalTimeIn.value : '';
  const tOut = globalTimeOut ? globalTimeOut.value : '';

  if (!formattedDate) {
    await customAlert("Please select a valid date.", "Date Error");
    return;
  }
  
  let records = loadRecords();
  let changed = false;

  const upsertRecord = (name, acc, role, stat, d, timeIn, timeOut) => { // Added timeIn, timeOut parameters
    const existingIndex = records.findIndex(r => r.name === name && r.date === d);
    if (existingIndex > -1) {
      records[existingIndex] = { 
          ...records[existingIndex], 
          status: stat,
          timeIn: timeIn, // Use passed timeIn
          timeOut: timeOut // Use passed timeOut
      };
    } else {
      records.push({
        name, account: acc, role, status: stat, date: d, 
        timeIn: timeIn, timeOut: timeOut, // Use passed timeIn, timeOut
        notes: ""
      });
    }
  };

  if (isSelectMode && selectedAgents.size > 0) {
    selectedAgents.forEach(name => {
      const emp = employees.find(e => e.name === name);
      if (!emp) return;
      upsertRecord(name, emp.account, emp.role, status, formattedDate, tIn, tOut); // Pass times
      changed = true;
    });
    if (changed) saveRecords(records);
    isSelectMode = false;
    selectedAgents.clear();
    updateSelectModeUI();
    statusSelect.value = 'Present';
    await customAlert(`Marked ${selectedAgents.size} agents as ${status} for ${formattedDate}.`, "Success");
  } else {
    const name = employeeSelect.value;
    if (!name || name === "-- No Agents --") {
      await customAlert("Please select an employee to mark attendance.", "No Employee Selected");
      return;
    }
    const emp = employees.find(e => e.name === name);
    if (!emp) return;
    upsertRecord(name, emp.account, emp.role, status, formattedDate, tIn, tOut); // Pass times
    saveRecords(records);
    statusSelect.value = 'Present';
  }
  
  renderDashboard();
  if (monthlyDetailsView.style.display !== 'none') {
    renderMonthlyDetails(detailsViewState.account);
  }
});

if (setCompanyBtn) {
  setCompanyBtn.addEventListener('click', openCompanyNameModal);
  closeCompanyNameModalBtn.addEventListener('click', closeCompanyNameModal);
  companyNameModalBackdrop.addEventListener('click', closeCompanyNameModal);
  confirmCompanyNameBtn.addEventListener('click', () => {
    const name = companyNameInput.value.trim();
    const isSosEnabled = enableSosModeCheckbox ? enableSosModeCheckbox.checked : false;
    if (!name) return;
    localStorage.setItem(COMPANY_KEY, name);
    localStorage.setItem(SOS_MODE_KEY, isSosEnabled); 
    setCompanyNameDisplay(name);
    renderMonthlyDetails(detailsViewState.account);
    companyNameMessage.textContent = 'Saved!';
  });
}

if (jumpToTodayBtn) {
  jumpToTodayBtn.addEventListener('click', () => {
    setDatePickerToToday();
    const event = new Event('change');
    attendanceDateInput.dispatchEvent(event);
  });
}
if (searchInput) {
  searchInput.addEventListener('input', () => {
    populateAccountFilter();
    populateEmployees(accountFilter.value);
    renderDashboard();
    if (monthlyDetailsView.style.display !== 'none') {
      renderMonthlyDetails(detailsViewState.account);
    }
  });
}

clearBtn.addEventListener("click", async () => {
  const choice = await showDialog(
    "Manage Data Options:", 
    "Data Controls",
    [
        { text: 'Cancel', class: 'btn btn-secondary', value: 'cancel' }, 
        { text: 'Reset Today (Fix Errors)', class: 'btn btn-warning', value: 'clear_statuses' }, 
        { text: 'Factory Reset (Delete All)', class: 'btn btn-danger', value: 'delete_all' }
    ]
  );
  
  switch (choice) {
    case 'clear_statuses':
      const confirmReset = await customConfirm(
        "Are you sure you want to wipe all records for THIS DATE only?", 
        "Reset Today?"
      );
      if(confirmReset) {
          await manuallyClearAllStatuses();
      }
      break;

    case 'delete_all':
      const confirmed = await customConfirm("This will permanently delete all data.", "ARE YOU ABSOLUTELY SURE?");
      if (confirmed) {
        localStorage.clear();
        employees = [];
        selectedAgents.clear();
        isSelectMode = false;
        initSelectors();
        renderDashboard();
        renderMonthlyDetails();
        setTimeout(() => init(), 100);
        await customAlert("All data deleted.", "Data Cleared");
      }
      break;
    case 'cancel': default: return;
  }
});

addAccountBtn.addEventListener("click", () => {
  addAccountModal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-active');
  newAccountNameInput.value = "";
  addAccountMessage.textContent = "";
  newAccountNameInput.focus();
});
closeAddAccountModalBtn.addEventListener("click", closeAddAccountModal);
addAccountModalBackdrop.addEventListener("click", closeAddAccountModal);

confirmAddAccountBtn.addEventListener("click", () => {
  const name = newAccountNameInput.value.trim();
  if (!name) {
    addAccountMessage.textContent = "Account name cannot be empty.";
    addAccountMessage.classList.add("error");
    return;
  }
  let emps = loadEmployees();
  if (uniq(emps.map(e => e.account)).filter(Boolean).some(acc => acc.toLowerCase() === name.toLowerCase())) {
    addAccountMessage.textContent = `Account "${name}" already exists.`;
    addAccountMessage.classList.add("error");
    return;
  }
  saveEmployees([...emps, { account: name }]);
  addAccountMessage.textContent = `Successfully created account "${name}".`;
  addAccountMessage.classList.remove("error");
  initSelectors();
  accountFilter.value = name;
  accountFilter.dispatchEvent(new Event('change'));
  setTimeout(closeAddAccountModal, 800);
});

editAccountBtn.addEventListener("click", async () => {
  const name = accountFilter.value;
  if (!name) {
    await customAlert("Please select an account from the dropdown to edit.", "No Account Selected");
    return;
  }
  // Load Settings
  const settings = loadAccountSettings();
  const accData = settings[name] || {};

  currentAccountNameDisplay.textContent = name;
  editAccountNameInput.value = name;
  
  document.getElementById('editAccountShiftStart').value = accData.shiftStart || '';
  document.getElementById('editAccountShiftEnd').value = accData.shiftEnd || '';

  editAccountModal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-active');
  editAccountMessage.textContent = "";
  editAccountNameInput.focus();
});
closeEditAccountModalBtn.addEventListener("click", closeEditAccountModal);
editAccountModalBackdrop.addEventListener("click", closeEditAccountModal);

confirmEditAccountBtn.addEventListener("click", () => {
  const oldName = accountFilter.value;
  const newName = editAccountNameInput.value.trim();
  const newStart = document.getElementById('editAccountShiftStart').value;
  const newEnd = document.getElementById('editAccountShiftEnd').value;

  if (!oldName) return;
  if (!newName) {
    editAccountMessage.textContent = "New name cannot be empty.";
    editAccountMessage.classList.add("error");
    return;
  }
  
  let emps = loadEmployees();
  if (oldName.toLowerCase() !== newName.toLowerCase()) {
      if (uniq(emps.map(e => e.account)).some(acc => acc.toLowerCase() === newName.toLowerCase())) {
        editAccountMessage.textContent = `Account "${newName}" already exists.`;
        editAccountMessage.classList.add("error");
        return;
      }
  }

  // Save Settings
  const settings = loadAccountSettings();
  if (oldName !== newName) { delete settings[oldName]; }
  settings[newName] = { shiftStart: newStart, shiftEnd: newEnd };
  saveAccountSettings(settings);

  // Update Data
  if (oldName !== newName) {
      saveEmployees(emps.map(e => e.account === oldName ? { ...e, account: newName } : e));
      saveRecords(loadRecords().map(r => r.account === oldName ? { ...r, account: newName } : r));
  }

  editAccountMessage.textContent = `Account updated successfully.`;
  editAccountMessage.classList.remove("error");
  initSelectors();
  accountFilter.value = newName;
  accountFilter.dispatchEvent(new Event('change'));
  setTimeout(closeEditAccountModal, 800);
});

addAgentBtn.addEventListener("click", async () => {
  const account = accountFilter.value;
  if (!account) {
    await customAlert("Please select an account before adding a new agent.", "No Account Selected");
    return;
  }
  addAgentAccountName.textContent = account;
  addAgentModal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-active');
  newAgentNameInput.value = "";
  newAgentRoleInput.value = "";
  addAgentMessage.textContent = "";
  newAgentNameInput.focus();
});
closeAddAgentModalBtn.addEventListener("click", closeAddAgentModal);
addAgentModalBackdrop.addEventListener("click", closeAddAgentModal);

confirmAddAgentBtn.addEventListener("click", () => {
  const name = newAgentNameInput.value.trim(), role = newAgentRoleInput.value.trim(), account = accountFilter.value;
  if (!name) {
    addAgentMessage.textContent = 'Agent name cannot be empty.';
    addAgentMessage.classList.add('error');
    return;
  }
  let emps = loadEmployees();
  if (emps.some(e => e.name?.toLowerCase() === name.toLowerCase())) {
    addAgentMessage.textContent = `Agent "${name}" already exists.`;
    addAgentMessage.classList.add('error');
    return;
  }
  saveEmployees([...emps, { name, account, role: role || 'No Role', imageUrl: '', hireDate: '', birthday: '', email: '' }]);
  const statuses = loadStatuses();
  statuses[name] = 'Offline';
  saveStatuses(statuses);
  addAgentMessage.textContent = `Successfully added agent "${name}".`;
  addAgentMessage.classList.remove('error');
  populateEmployees(account);
  renderDashboard();
  setTimeout(closeAddAgentModal, 800);
});

closeAgentInfoModalBtn.addEventListener('click', closeAgentInfoModal);
agentInfoModalBackdrop.addEventListener('click', closeAgentInfoModal);
editAgentInfoBtn.addEventListener('click', switchToEditMode);
document.getElementById('cancelAgentInfoEditBtn').addEventListener('click', () => {
    document.getElementById('agentInfoModal').setAttribute('aria-hidden', 'true');
    setTimeout(() => switchToViewMode(true), 200);
});

editAgentImageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      editAgentImagePreview.src = e.target.result;
      editAgentImageUrlInput.value = '';
    };
    reader.readAsDataURL(file);
  }
});

editAgentsBtn.addEventListener("click", () => {
  if (selectedAgents.size !== 1) return;
  openAgentInfoModal(Array.from(selectedAgents)[0]);
  switchToEditMode();
});

confirmAgentInfoBtn.addEventListener('click', () => {
  const originalName = agentInfoModal.dataset.originalName;
  const currentAccount = agentInfoModal.dataset.account;
  
  const newName = editAgentNameInput.value.trim();
  const newRole = editAgentRoleInput.value.trim();
  const newHireDate = editAgentHireDateInput.value;
  const newBirthday = editAgentBirthdayInput.value;
  const newEmail = editAgentEmailInput.value.trim();
  const newShiftStart = editAgentShiftStart ? editAgentShiftStart.value : '';
  const newShiftEnd = editAgentShiftEnd ? editAgentShiftEnd.value : '';
  
  let newImageUrl = editAgentImageUrlInput.value.trim();
  if (editAgentImagePreview.src.startsWith('data:image/')) newImageUrl = editAgentImagePreview.src;
  else if (!editAgentImageUrlInput.value && editAgentImagePreview.src && editAgentImagePreview.src !== window.location.href) {
    newImageUrl = editAgentImagePreview.src;
  } else if (!editAgentImageUrlInput.value) {
    newImageUrl = '';
  }
  
  if (!newName) {
    agentInfoMessage.textContent = 'Agent name cannot be empty.';
    agentInfoMessage.classList.add('error');
    return;
  }
  let emps = loadEmployees();
  if (newName.toLowerCase() !== originalName.toLowerCase() && emps.some(e => e.name?.toLowerCase() === newName.toLowerCase())) {
    agentInfoMessage.textContent = `Agent "${newName}" already exists.`;
    agentInfoMessage.classList.add('error');
    return;
  }

  const updatedEmps = emps.map(e => (e.name === originalName && e.account === currentAccount) ? {
    ...e, 
    name: newName, 
    role: newRole, 
    imageUrl: newImageUrl, 
    hireDate: newHireDate, 
    birthday: newBirthday, 
    email: newEmail,
    shiftStart: newShiftStart,
    shiftEnd: newShiftEnd
  } : e);
  
  saveEmployees(updatedEmps);
  
  if (newName !== originalName) {
    const records = loadRecords().map(r => r.name === originalName ? { ...r, name: newName } : r);
    saveRecords(records);
    let statuses = loadStatuses();
    if (statuses[originalName]) {
      statuses[newName] = statuses[originalName];
      delete statuses[originalName];
      saveStatuses(statuses);
    }
  }

  agentInfoName.textContent = newName;
  agentInfoRole.textContent = newRole || 'No Role';
  agentInfoImage.src = newImageUrl || DEFAULT_AVATAR_SVG;
  agentInfoModal.dataset.originalName = newName;
  agentInfoMessage.textContent = `Saved!`;
  agentInfoMessage.classList.remove('error');
  
  isSelectMode = false;
  selectedAgents.clear();
  initSelectors();
  renderDashboard();
  if (monthlyDetailsView.style.display !== 'none') {
    renderMonthlyDetails(detailsViewState.account);
  }

  setTimeout(() => {
    document.getElementById('agentInfoModal').setAttribute('aria-hidden', 'true');
    switchToViewMode(true); 
    agentInfoMessage.textContent = '';
  }, 500);
});

selectAgentsBtn.addEventListener("click", () => {
  isSelectMode = !isSelectMode;
  if (!isSelectMode) selectedAgents.clear();
  updateSelectModeUI();
});

if (selectAllBtn) {
  selectAllBtn.addEventListener("click", () => {
    const visibleAgents = getVisibleAgents();
    if (visibleAgents.length === 0) return;
    const allAreSelected = visibleAgents.every(a => selectedAgents.has(a.name));
    if (allAreSelected) {
      visibleAgents.forEach(a => selectedAgents.delete(a.name));
    } else {
      visibleAgents.forEach(a => selectedAgents.add(a.name));
      isSelectMode = true;
    }
    updateSelectModeUI();
  });
}

filterStatusBtn.addEventListener("click", () => {
  currentStatusFilter = currentStatusFilter ? null : statusSelect.value;
  isSelectMode = false;
  selectedAgents.clear();
  updateSelectModeUI();
});

deleteAgentsBtn.addEventListener("click", async () => {
  if (selectedAgents.size === 0) return;
  const confirmed = await customConfirm(`Delete ${selectedAgents.size} agent(s)?`, "Confirm Deletion");
  if (!confirmed) return;
  const toDelete = new Set(selectedAgents);
  saveEmployees(loadEmployees().filter(e => !toDelete.has(e.name)));
  saveRecords(loadRecords().filter(r => !toDelete.has(r.name)));
  let statuses = loadStatuses();
  toDelete.forEach(name => delete statuses[name]);
  saveStatuses(statuses);
  await customAlert(`Deleted ${selectedAgents.size} agent(s).`, "Deletion Successful");
  isSelectMode = false;
  selectedAgents.clear();
  initSelectors();
  renderDashboard();
});

removeAccountBtn.addEventListener("click", async () => {
  const account = accountFilter.value;
  if (!account) return;
  const confirmed = await customConfirm(`Remove account "${account}" and all agents?`, "Confirm Account Removal");
  if (!confirmed) return;
  const agentsInAccount = new Set(loadEmployees().filter(e => e.account === account).map(e => e.name));
  saveEmployees(loadEmployees().filter(e => e.account !== account));
  saveRecords(loadRecords().filter(r => r.account !== account));
  let statuses = loadStatuses();
  agentsInAccount.forEach(name => delete statuses[name]);
  saveStatuses(statuses);
  await customAlert(`Account Removed.`, "Success");
  accountFilter.value = "";
  accountFilter.dispatchEvent(new Event('change'));
});

if (markAllAccountBtn) {
  markAllAccountBtn.addEventListener('click', async () => {
    const account = accountFilter.value;
    const status = statusSelect.value;
    if (!account) {
      await customAlert("Please select an account first.", "No Account Selected");
      return;
    }
    const formattedDate = getFormattedDateFromPicker();
    if (!formattedDate) {
      await customAlert("Please select a valid date.", "Date Error");
      return;
    }
    const allEmployees = loadEmployees();
    const accountAgents = allEmployees.filter(e => e.account === account && e.name);
    if (accountAgents.length === 0) {
      await customAlert("This account has no agents to mark.", "Empty Account");
      return;
    }
    const confirmed = await customConfirm(`Mark ALL ${accountAgents.length} agents in "${account}" as ${status.toUpperCase()}?`, "Confirm Bulk Action");
    if (!confirmed) return;
    let records = loadRecords();
    const tIn = globalTimeIn ? globalTimeIn.value : '';
    const tOut = globalTimeOut ? globalTimeOut.value : '';

    accountAgents.forEach(agent => {
      const existingIndex = records.findIndex(r => r.name === agent.name && r.date === formattedDate);
      if (existingIndex > -1) {
        records[existingIndex].status = status;
        records[existingIndex].timeIn = tIn;
        records[existingIndex].timeOut = tOut;
      } else {
        records.push({
          name: agent.name, account: account, role: agent.role, status: status, date: formattedDate,
          timeIn: tIn, timeOut: tOut, notes: "Bulk marked"
        });
      }
    });
    saveRecords(records);
    renderDashboard();
    if (monthlyDetailsView.style.display !== 'none') {
      renderMonthlyDetails(detailsViewState.account);
    }
    statusSelect.value = 'Present';
    await customAlert(`Marked ${accountAgents.length} agents.`, "Success");
  });
}
const endDayBtn = document.getElementById('endDayBtn');

if (endDayBtn) {
    endDayBtn.addEventListener('click', async () => {
        const currentPickerDate = attendanceDateInput.value;
        if (!currentPickerDate) return;
        const [y, m, d] = currentPickerDate.split('-');
        const displayDate = `${m}/${d}/${y.slice(-2)}`;
        const confirmed = await customConfirm(
            `End the day for ${displayDate}?\nThis will jump to tomorrow.`, 
            "End Day & Save"
        );
        if (confirmed) {
            const dateObj = new Date(currentPickerDate);
            dateObj.setDate(dateObj.getDate() + 1);
            const nextY = dateObj.getFullYear();
            const nextM = String(dateObj.getMonth() + 1).padStart(2, '0');
            const nextD = String(dateObj.getDate()).padStart(2, '0');
            attendanceDateInput.value = `${nextY}-${nextM}-${nextD}`;
            attendanceDateInput.dispatchEvent(new Event('change'));
            await customAlert(`Ready for ${nextM}/${nextD}/${nextY.toString().slice(-2)}.`, "Day Ended");
        }
    });
}

// --- Import / Export Logic ---
exportBtn.addEventListener('click', () => {
  exportJsonModal.setAttribute("aria-hidden", "false");
  document.body.classList.add('modal-active');
  accountManagerNameJsonInput.value = '';
  accountManagerNameJsonInput.focus();
});
closeExportJsonModalBtn.addEventListener('click', () => {
  exportJsonModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
});
exportJsonModalBackdrop.addEventListener('click', () => {
  exportJsonModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
});
confirmExportJsonBtn.addEventListener('click', async () => {
  const managerName = accountManagerNameJsonInput.value.trim();
  const dataToExport = {
    accountManager: managerName,
    employees: loadEmployees(),
    records: loadRecords(),
    statuses: loadStatuses(),
    accountSettings: loadAccountSettings()
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
  const dateStamp = new Date().toISOString().split('T')[0];
  const managerNameForFile = managerName.replace(/ /g, '_');
  const filename = managerName ? `${managerNameForFile}_attendance_backup_${dateStamp}.json` : `attendance_backup_${dateStamp}.json`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  exportJsonModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove('modal-active');
  await customAlert("Backup download started!", "Export Complete");
});

importBtn.addEventListener('click', () => {
  importFileInput.click();
});
importFileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      if (!importedData.employees || !importedData.records || !importedData.statuses) {
        throw new Error("Invalid JSON structure.");
      }
      const confirmed = await customConfirm("Overwrite all existing data with this file?", "Overwrite Data?");
      if (confirmed) {
        saveEmployees(importedData.employees);
        saveRecords(importedData.records);
        saveStatuses(importedData.statuses);
        if(importedData.accountSettings) saveAccountSettings(importedData.accountSettings);
        if (importedData.accountManager) {
          localStorage.setItem(ACCOUNT_MANAGER_KEY, importedData.accountManager);
        }
        accountFilter.value = "";
        isSelectMode = false;
        selectedAgents.clear();
        init();
        await customAlert("Data imported successfully!", "Import Complete");
      }
    } catch (error) {
      await customAlert(`Error importing file: ${error.message}`, "Import Error");
    } finally {
      importFileInput.value = '';
    }
  };
  reader.readAsText(file);
});

exportCsvBtn.addEventListener('click', openExportCsvModal);
closeExportCsvModalBtn.addEventListener('click', closeExportCsvModal);
exportCsvModalBackdrop.addEventListener('click', closeExportCsvModal);

function formatCsvCell(content) {
  const str = String(content);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    const escapedStr = str.replace(/"/g, '""');
    return `"${escapedStr}"`;
  }
  return str;
}

confirmExportCsvBtn.addEventListener('click', async () => {
  try {
    const selectedAccount = accountFilter.value;
    const year = detailsViewState.year;
    const month = parseInt(monthSelect.value, 10);
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
    const managerName = accountManagerNameInput.value.trim();
    const allEmployees = loadEmployees();
    const allRecords = loadRecords();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const isWeekdaysOnly = localStorage.getItem(SOS_MODE_KEY) === 'true';
    let workingDays;
    if (isWeekdaysOnly) {
      workingDays = getWorkingDays(startOfMonth, endOfMonth);
    } else {
      workingDays = getAllDaysInMonth(startOfMonth, endOfMonth);
    }
    const header = ['Agent Name', ...workingDays.map(d => d.getDate())].map(formatCsvCell).join(',');
    let csvContent = '';
    let downloadFilename = '';
    if (managerName) {
      csvContent += `${formatCsvCell("Account Manager:")},${formatCsvCell(managerName)}\n\n`;
    }
    if (selectedAccount) {
      downloadFilename = `attendance_${selectedAccount.replace(/ /g, '_')}_${monthName}_${year}.csv`;
      const agents = allEmployees.filter(e => e.account === selectedAccount && e.name).sort((a, b) => a.name.localeCompare(b.name));
      const rows = agents.map(agent => {
        const agentRecords = allRecords.filter(r => r.name === agent.name);
        const statusCells = workingDays.map(day => {
          const record = agentRecords.find(r => r.date === formatDateShort(day));
          return record ? record.status : '-';
        });
        return [agent.name, ...statusCells].map(formatCsvCell).join(',');
      });
      csvContent += [header, ...rows].join('\n');
    } else {
      downloadFilename = `attendance_All-Accounts_${monthName}_${year}.csv`;
      const allAccounts = uniq(allEmployees.map(e => e.account)).filter(Boolean).sort();
      const csvBlocks = [];
      allAccounts.forEach(account => {
        csvBlocks.push(formatCsvCell(account));
        csvBlocks.push(header);
        const agentsInAccount = allEmployees.filter(e => e.account === account && e.name).sort((a, b) => a.name.localeCompare(b.name));
        if (agentsInAccount.length > 0) {
          const agentRows = agentsInAccount.map(agent => {
            const agentRecords = allRecords.filter(r => r.name === agent.name);
            const statusCells = workingDays.map(day => {
              const record = agentRecords.find(r => r.date === formatDateShort(day));
              return record ? record.status : '-';
            });
            return [agent.name, ...statusCells].map(formatCsvCell).join(',');
          });
          csvBlocks.push(...agentRows);
        } else {
          csvBlocks.push("No agents in this account.");
        }
        csvBlocks.push('');
      });
      csvContent += csvBlocks.join('\n');
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = downloadFilename;
    link.click();
    closeExportCsvModal();
    await customAlert(`Download started for ${monthName}.`, "Export Success");
  } catch (error) {
    await customAlert(`Failed to generate report.`, "Export Failed");
  }
});

function init() {
  initTheme();
  const savedManagerName = localStorage.getItem(ACCOUNT_MANAGER_KEY);
  if (savedManagerName) {
    setManagerName(savedManagerName);
  } else {
    setTimeout(openManagerNameModal, 200);
  }
  const savedCompanyName = localStorage.getItem(COMPANY_KEY);
  if (savedCompanyName) {
    setCompanyNameDisplay(savedCompanyName);
  } else {
    setCompanyNameDisplay('');
  }
  initSelectors();
  renderDashboard();
  renderMonthlyDetails();
  monthlyDetailsView.style.display = 'block';
  const statuses = loadStatuses();
  let changed = false;
  loadEmployees().forEach(emp => {
    if (emp.name && !statuses[emp.name]) {
      statuses[emp.name] = 'Offline';
      changed = true;
    }
  });
  if (changed) saveStatuses(statuses);
  updateStatusCounts();
  updateTotalAgentsCount();
};
init();

function openPopup(e) {
  e.preventDefault();
  window.open(e.currentTarget.href, 'popupWindow', 'width=500,height=960,scrollbars=yes,resizable=yes');
}

// --- EXCEL EXPORT LOGIC ---
const confirmExportExcelBtn = document.getElementById('confirmExportExcelBtn');
if (confirmExportExcelBtn) {
  confirmExportExcelBtn.addEventListener('click', async () => {
    const originalText = confirmExportExcelBtn.textContent;
    confirmExportExcelBtn.textContent = "Generating...";
    confirmExportExcelBtn.disabled = true;
    try {
      await generateStyledExcel();
      closeExportCsvModal();
    } catch (error) {
      console.error(error);
      await customAlert("Failed to generate Excel file: " + error.message, "Export Error");
    } finally {
      confirmExportExcelBtn.textContent = originalText;
      confirmExportExcelBtn.disabled = false;
    }
  });
}

async function generateStyledExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Attendance Report');
  const selectedAccount = accountFilter.value;
  const year = detailsViewState.year;
  const monthIndex = parseInt(monthSelect.value, 10);
  const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });
  const managerName = document.getElementById('accountManagerName').value.trim();
  const startOfMonth = new Date(year, monthIndex, 1);
  const endOfMonth = new Date(year, monthIndex + 1, 0);
  const isWeekdaysOnly = localStorage.getItem(SOS_MODE_KEY) === 'true';
  let workingDays;
  if (isWeekdaysOnly) {
    workingDays = getWorkingDays(startOfMonth, endOfMonth);
  } else {
    workingDays = getAllDaysInMonth(startOfMonth, endOfMonth);
  }
  
  const styles = {
    headerParams: {
      font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0b1116' } } 
    },
    accountHeader: {
      font: { bold: true, color: { argb: 'FF000000' }, size: 12 },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7dd3fc' } }
    },
    present: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF16a34a' } }, 
    absent: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFef4444' } }, 
    sl_el: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFf59e0b' } }, 
    vl: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3b82f6' } }, 
    late: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFeab308' } }, 
    half: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFa855f7' } }, 
    border: {
      top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }
    }
  };
  
  sheet.addRow([`ATTENDANCE REPORT`]);
  sheet.addRow([`Period: ${monthName} ${year}`]);
  if (managerName) sheet.addRow([`Manager: ${managerName}`]);
  sheet.addRow([]);
  sheet.getCell('A1').font = { size: 16, bold: true };
  sheet.getCell('A2').font = { size: 12, bold: true };
  
  const columns = [{ header: 'Agent Name', key: 'name', width: 25 }, { header: 'Role', key: 'role', width: 15 }];
  workingDays.forEach(d => {
    columns.push({ header: `${d.getDate()}`, key: `day_${d.getDate()}`, width: 4.5 });
  });
  columns.push({ header: 'P', key: 'total_p', width: 6 });
  columns.push({ header: 'A', key: 'total_a', width: 6 });
  sheet.columns = columns;
  
  const headerRow = sheet.getRow(5);
  headerRow.values = columns.map(c => c.header);
  headerRow.eachCell((cell) => {
    cell.font = styles.headerParams.font;
    cell.fill = styles.headerParams.fill;
    cell.alignment = { horizontal: 'center' };
    cell.border = styles.border;
  });
  
  const allEmployees = loadEmployees();
  const allRecords = loadRecords();
  const accountsToExport = selectedAccount ? [selectedAccount] : uniq(allEmployees.map(e => e.account)).filter(Boolean).sort();
  let currentRowIndex = 6;
  
  accountsToExport.forEach(acc => {
    const accRow = sheet.addRow([acc.toUpperCase()]);
    sheet.mergeCells(`A${currentRowIndex}:${sheet.getColumn(columns.length).letter}${currentRowIndex}`);
    accRow.getCell(1).font = styles.accountHeader.font;
    accRow.getCell(1).fill = styles.accountHeader.fill;
    accRow.getCell(1).alignment = { horizontal: 'left' };
    accRow.getCell(1).border = styles.border;
    currentRowIndex++;
    
    const agents = allEmployees.filter(e => e.account === acc && e.name).sort((a, b) => a.name.localeCompare(b.name));
    if (agents.length === 0) {
      sheet.addRow(["No agents in this account"]);
      currentRowIndex++;
    } else {
      agents.forEach(agent => {
        const rowData = { name: agent.name, role: agent.role || '' };
        let pCount = 0;
        let aCount = 0;
        workingDays.forEach(d => {
          const dateKey = formatDateShort(d);
          const record = allRecords.find(r => r.name === agent.name && r.date === dateKey);
          const status = record ? (record.status || '') : '';
          const lowStatus = status.toLowerCase();
          
          let code = '';
          if (lowStatus === 'present') { code = 'P'; pCount++; }
          else if (lowStatus === 'late') { code = 'L-T'; pCount++; } 
          else if (lowStatus === 'absent') { code = 'A'; aCount++; }
          else if (lowStatus === 'sl' || lowStatus === 'el') { code = 'L'; }
          else if (lowStatus === 'vl') { code = 'V'; }
          else if (lowStatus.includes('half')) { code = 'HD'; }
          
          rowData[`day_${d.getDate()}`] = code;
        });
        rowData.total_p = pCount;
        rowData.total_a = aCount;
        const newRow = sheet.addRow(rowData);
        
        newRow.getCell(1).border = styles.border;
        newRow.getCell(1).alignment = { horizontal: 'left' };
        newRow.getCell(2).border = styles.border;
        newRow.getCell(2).font = { italic: true, color: { argb: 'FF555555' } };
        
        workingDays.forEach(d => {
          const cell = newRow.getCell(`day_${d.getDate()}`);
          const val = cell.value;
          cell.border = styles.border;
          cell.alignment = { horizontal: 'center' };
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          
          if (val === 'P') cell.fill = styles.present;
          else if (val === 'L-T') { cell.fill = styles.late; cell.font = { color: { argb: 'FF000000' } }; }
          else if (val === 'A') cell.fill = styles.absent;
          else if (val === 'L') { cell.fill = styles.sl_el; cell.font = { color: { argb: 'FF000000' } }; }
          else if (val === 'HD') { cell.fill = styles.half; }
          else if (val === 'V') cell.fill = styles.vl;
          else cell.value = '';
        });
        
        const pCell = newRow.getCell('total_p');
        pCell.font = { color: { argb: 'FF16a34a' }, bold: true };
        pCell.alignment = { horizontal: 'center' };
        pCell.border = styles.border;
        
        const aCell = newRow.getCell('total_a');
        aCell.font = { color: { argb: 'FFef4444' }, bold: true };
        aCell.alignment = { horizontal: 'center' };
        aCell.border = styles.border;
        currentRowIndex++;
      });
    }
  });
  
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filenamePart = selectedAccount ? selectedAccount.replace(/ /g, '_') : "All_Accounts";
  const filename = `Attendance_${filenamePart}_${monthName}_${year}.xlsx`;
  saveAs(blob, filename);
  await customAlert("Excel report generated successfully!", "Export Complete");
}
// --- LOGIC: Break & Compliance Calculator ---
window.calcLog = function(type) {
    const startEl = document.getElementById(`log${type}Start`);
    const endEl = document.getElementById(`log${type}End`);
    const resEl = document.getElementById(`res${type}`);

    if (!startEl.value || !endEl.value) {
        resEl.textContent = "-";
        resEl.className = "log-result";
        return;
    }

    // Convert to minutes
    const [sH, sM] = startEl.value.split(':').map(Number);
    const [eH, eM] = endEl.value.split(':').map(Number);
    
    let startMins = sH * 60 + sM;
    let endMins = eH * 60 + eM;

    // Handle overnight (cross-midnight) logic
    if (endMins < startMins) {
        endMins += 1440; // Add 24 hours
    }

    const duration = endMins - startMins;
    
    // Define Thresholds
    let limit = 15; // Default 15m for B1, B2
    if (type === 'Lunch') limit = 60;
    if (type === 'PB') limit = 10;

    // Determine Result
    if (duration > limit) {
        const excess = duration - limit;
        resEl.innerHTML = `OB <span style='font-size:9px; opacity:0.8; margin-left:2px;'>+${excess}m</span>`;
        resEl.className = "log-result res-ob";
    } else {
        resEl.textContent = `${duration}m OK`;
        resEl.className = "log-result res-ok";
    }
};

// --- NAVIGATION & HOTKEY ENGINE ---

window.navigateSelect = function(id, direction) {
    const select = document.getElementById(id);
    if (!select || select.options.length === 0) return;
    const newIndex = select.selectedIndex + direction;
    if (newIndex >= 0 && newIndex < select.options.length) {
        select.selectedIndex = newIndex;
        select.dispatchEvent(new Event('change'));
        select.style.borderColor = 'var(--accent)';
        setTimeout(() => select.style.borderColor = '', 200);
    }
};

window.navigateDate = function(days) {
    const input = document.getElementById('attendanceDate');
    if (!input.value) return;
    const parts = input.value.split('-');
    const current = new Date(parts[0], parts[1] - 1, parts[2]); 
    current.setDate(current.getDate() + days);
    const y = current.getFullYear();
    const m = String(current.getMonth() + 1).padStart(2, '0');
    const d = String(current.getDate()).padStart(2, '0');
    input.value = `${y}-${m}-${d}`;
    input.dispatchEvent(new Event('change'));
    input.style.borderColor = 'var(--accent)';
    setTimeout(() => input.style.borderColor = '', 200);
};


// COMPREHENSIVE KEY LISTENER (With Robust Cycling & Auto-Scroll)
document.addEventListener('keydown', (e) => {
    // 1. IGNORE TYPING (except Alt combos)
    const isTyping = (e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && e.target.type !== 'date') || e.target.tagName === 'TEXTAREA';
    if (isTyping && !e.altKey) return;

    // 2. DETECT CONTEXT
    const isModalOpen = document.body.classList.contains('modal-active');
    const isAgentInfoModalOpen = agentInfoModal.getAttribute('aria-hidden') === 'false'; // More specific check
    const isEditMode = isAgentInfoModalOpen && !document.getElementById('agentInfoEditView').classList.contains('hidden');
    const isAccountSelected = accountFilter.value !== "";

    // --- ROBUST NAME SELECTION LOGIC ---
    if (isSelectMode && e.altKey && e.shiftKey && e.key.length === 1 && /[a-z]/i.test(e.key)) {
        const char = e.key.toLowerCase();
        
        // 1. Find visible agents starting with this letter
        const visible = getVisibleAgents();
        let matches = visible.filter(a => a.name.toLowerCase().startsWith(char));
        
        // 2. Sort them A-Z to ensure cycling is predictable
        matches.sort((a, b) => a.name.localeCompare(b.name));
        
        if (matches.length > 0) {
            e.preventDefault(); 
            
            // 3. Check who is currently selected within this specific match group
            const currentlySelectedMatchIndex = matches.findIndex(a => selectedAgents.has(a.name));
            
            let agentToScrollTo = null;

            if (currentlySelectedMatchIndex === -1) {
                // START: None selected -> Select the first match
                handleAgentSelection(matches[0].name, true);
                agentToScrollTo = matches[0].name;
            } else {
                // CYCLE: Deselect current
                handleAgentSelection(matches[currentlySelectedMatchIndex].name, false);
                
                const nextIndex = (currentlySelectedMatchIndex + 1) % (matches.length + 1); // +1 for "none selected" state

                if (nextIndex < matches.length) {
                    // Select the next agent
                    handleAgentSelection(matches[nextIndex].name, true);
                    agentToScrollTo = matches[nextIndex].name;
                } else {
                    // All deselected, loop back to "none selected" state
                    // No agentToScrollTo needed as no one is selected
                }
            }
            
            renderDashboard(); 

            // 4. AUTO-SCROLL to the newly selected agent
            if (agentToScrollTo) {
                const row = document.querySelector(`.agentRow[data-name="${escapeHtml(agentToScrollTo)}"]`);
                if (row) {
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Optional: quick visual flash on the row
                    row.style.transition = 'background 0.2s';
                    row.style.background = 'rgba(125, 211, 252, 0.2)';
                    setTimeout(() => row.style.background = '', 400);
                }
            }
            return; 
        }
    }
    // --------------------------------------------------------

    const setStatus = (val) => {
        if(isModalOpen) {
            const modalSelect = document.getElementById('agentInfoStatusSelect');
            if(modalSelect) {
                modalSelect.value = val;
                modalSelect.style.background = 'var(--accent)';
                setTimeout(()=> modalSelect.style.background = '', 200);
            }
        } else {
            statusSelect.value = val;
            statusSelect.dispatchEvent(new Event('change'));
            statusSelect.style.borderColor = 'var(--accent)';
            setTimeout(()=> statusSelect.style.borderColor = '', 200);
        }
    };

    if (e.altKey) {
        // --- 1. PRIORITY COMMANDS ---
        if (e.shiftKey && e.key.toLowerCase() === 'd') {
            e.preventDefault(); document.getElementById('endDayBtn').click(); return;
        }

        // --- 2. STATUS KEYS ---
        switch(e.key.toLowerCase()) {
            case 'p': e.preventDefault(); setStatus('Present'); return;
            case 'z': e.preventDefault(); setStatus('Absent'); return; // Changed 'a' to 'z' for absent
            case 'h': e.preventDefault(); setStatus('Half Day'); return;
            case 'l': 
                if (e.shiftKey) { e.preventDefault(); setStatus('EL'); return; }
                e.preventDefault(); setStatus('Late'); return;
            case 's': 
                if (e.shiftKey) { e.preventDefault(); setStatus('SL'); return; }
                if (isModalOpen) {
                    if (isEditMode) { e.preventDefault(); document.getElementById('confirmAgentInfoBtn').click(); return;}
                    return; 
                }
                if (isAccountSelected) { e.preventDefault(); document.getElementById('selectAgentsBtn').click(); return; }
                return; 
            case 'v': e.preventDefault(); setStatus('VL'); return;
            case 'e':
                if (isModalOpen) {
                    if (isEditMode) { e.preventDefault(); document.getElementById('editAgentEmailInput').focus(); return; }
                    e.preventDefault(); document.getElementById('editAgentInfoBtn').click(); return;
                }
                // Robust check: Only trigger Edit Agent if Exactly One is selected
                if (selectedAgents.size === 1) {
                    e.preventDefault(); document.getElementById('editAgentsBtn').click(); return;
                }
                if (isAccountSelected) { e.preventDefault(); document.getElementById('editAccountBtn').click(); return; }
                e.preventDefault(); setStatus('EL'); 
                return;
            case 'x': e.preventDefault(); setStatus('Offline'); return;
        }
        
        // Hotkey 'a' for Add Agent/Account (after status keys)
        if (e.key.toLowerCase() === 'a') {
            e.preventDefault();
            if (isAgentInfoModalOpen && isEditMode && document.getElementById('editAgentNameInput') === document.activeElement) {
                // If in agent edit mode and name input is focused, 'a' should type. This is caught by isTyping.
                // If not focused, but in agent edit mode, let's not make it do anything globally.
                return; 
            }
            if (isAccountSelected && !isModalOpen) { 
                document.getElementById('addAgentBtn').click(); return; 
            }
            if (!isAccountSelected && !isModalOpen) { 
                document.getElementById('addAccountBtn').click(); return; 
            }
        }


        // --- 3. NAVIGATION ---
        switch(e.key) {
            case 'ArrowLeft': e.preventDefault(); navigateSelect('accountFilter', -1); return;
            case 'ArrowRight': e.preventDefault(); navigateSelect('accountFilter', 1); return;
            case 'ArrowUp': e.preventDefault(); navigateSelect('employeeSelect', -1); return;
            case 'ArrowDown': e.preventDefault(); navigateSelect('employeeSelect', 1); return;
            case ',': case '<': e.preventDefault(); navigateDate(-1); return;
            case '.': case '>': e.preventDefault(); navigateDate(1); return;
        }

        // --- 4. GLOBAL COMMANDS ---
        switch(e.key.toLowerCase()) {
            case '1': e.preventDefault(); document.getElementById('setCompanyBtn').click(); return;
            case '2': e.preventDefault(); document.getElementById('setManagerBtn').click(); return;
            case '3': e.preventDefault(); document.getElementById('showReadmeBtn').click(); return;
            case '4': e.preventDefault(); document.getElementById('goToLeaveTrackerBtn').click(); return;
            case 'q': e.preventDefault(); document.getElementById('exportCsvBtn').click(); return;
            case 'w': e.preventDefault(); document.getElementById('importBtn').click(); return;
            case 'r': e.preventDefault(); document.getElementById('exportBtn').click(); return;
            case 't': e.preventDefault(); document.getElementById('theme-toggle').click(); return;
            case 'c': 
                e.preventDefault(); 
                if(isModalOpen) { document.getElementById('cancelAgentInfoEditBtn').click(); }
                else { document.getElementById('clearBtn').click(); }
                return;
            case 'f': e.preventDefault(); document.getElementById('filterStatusBtn').click(); return;
        }

        // --- 5. ACCOUNT CONTEXT SPECIFIC ---
        if (isAccountSelected && !isModalOpen) {
             switch(e.key.toLowerCase()) {
                 case 'm': e.preventDefault(); document.getElementById('markAllAccountBtn').click(); return;
                 case 'd': e.preventDefault(); document.getElementById('deleteAgentsBtn').click(); return;
                 case 'Delete': e.preventDefault(); document.getElementById('removeAccountBtn').click(); return;
             }
             if (e.shiftKey && e.key.toLowerCase() === 'a') {
                 e.preventDefault(); document.getElementById('selectAllBtn').click(); return;
             }
        }

        // --- 6. MODAL CONTEXT SPECIFIC ---
        if (isModalOpen) {
            if (e.key.toLowerCase() === 'r') {
                e.preventDefault();
                if(isEditMode) { document.getElementById('editAgentRoleInput').focus(); }
                else { document.getElementById('agentInfoSaveRecordBtn').click(); }
                return;
            }
            if (isEditMode) {
                switch(e.key.toLowerCase()) {
                    case 's': 
                         if(e.shiftKey) { e.preventDefault(); document.getElementById('editAgentShiftStart').focus(); return; }
                         break; 
                    case 'h': e.preventDefault(); document.getElementById('editAgentHireDateInput').focus(); return;
                    case 'b': e.preventDefault(); document.getElementById('editAgentBirthdayInput').focus(); return;
                    case 'i': e.preventDefault(); document.getElementById('editAgentImageUpload').click(); return;
                }
            }
        }
    }
});